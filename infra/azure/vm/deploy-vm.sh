#!/usr/bin/env bash
# Creates one Azure VM that runs the whole app with Docker (see docker-compose.yml): Caddy (HTTPS) -> Rails -> Solr + Postgres.
# Run it from a clone of this repository, with the Azure CLI signed in. Nothing here prints secrets; the app's passwords are
# generated on the VM (/opt/ccs/infra/azure/vm/.env, root only).
#
#   SUBSCRIPTION=<id> infra/azure/vm/deploy-vm.sh
#
# Optional: RG (default ccs-web-rg, created if missing), LOCATION (default newzealandnorth), SIZE (default Standard_B2s_v2: 2 vCPU,
# 8 GB), VM (default ccs-vm), LABEL (the first part of the address; default ccs-web-<first 6 characters of the subscription id>),
# SSH_KEY (default ~/.ssh/ccs-vm; created if missing).
#
# Notes from the first real run (2026-11-04):
# - Azure for Students subscriptions only allow some regions (a policy): Korea Central, New Zealand North, Malaysia West, Indonesia
#   Central, East Asia. Australia East was refused. Check with `az policy assignment list` if a create fails with RequestDisallowedByAzure.
# - The repository is private, so the VM does not clone it: this script sends the tracked files with `git archive`. Send tracked files
#   only: the tracked, empty folder ead-ccs-test/app/assets/builds must exist, or the stylesheet's Bootstrap layer is missing.
# - To update the app later, run this script again: it reuses the VM and rebuilds (the secrets in .env are kept).
set -euo pipefail
: "${SUBSCRIPTION:?Set SUBSCRIPTION to the Azure subscription id}"
RG="${RG:-ccs-web-rg}"
LOCATION="${LOCATION:-newzealandnorth}"
SIZE="${SIZE:-Standard_B2s_v2}"
VM="${VM:-ccs-vm}"
LABEL="${LABEL:-ccs-web-$(printf '%s' "$SUBSCRIPTION" | cut -c1-6)}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/ccs-vm}"
DOMAIN="$LABEL.$LOCATION.cloudapp.azure.com"
HERE="$(cd "$(dirname "$0")" && pwd)"
REPO="$(git -C "$HERE" rev-parse --show-toplevel)"

[ -f "$SSH_KEY" ] || ssh-keygen -q -t ed25519 -N "" -C "ccs-vm" -f "$SSH_KEY"
chmod 600 "$SSH_KEY"
az account set --subscription "$SUBSCRIPTION"
az group show -n "$RG" -o none 2>/dev/null || az group create -n "$RG" -l "$LOCATION" -o none

if ! az vm show -g "$RG" -n "$VM" -o none 2>/dev/null; then
  for p in Microsoft.Compute Microsoft.Network Microsoft.Storage; do az provider register -n "$p" --wait -o none; done
  echo "Creating $VM ($SIZE) in $LOCATION ..."
  az vm create -g "$RG" -n "$VM" -l "$LOCATION" --image Canonical:ubuntu-24_04-lts:server:latest --size "$SIZE" --admin-username azureuser \
    --ssh-key-values "$SSH_KEY.pub" --public-ip-sku Standard --public-ip-address-dns-name "$LABEL" --custom-data "$HERE/cloud-init.yaml" \
    --os-disk-size-gb 32 --storage-sku StandardSSD_LRS -o none
  az vm open-port -g "$RG" -n "$VM" --port 80,443 --priority 900 -o none
fi
IP="$(az vm show -d -g "$RG" -n "$VM" --query publicIps -o tsv)"
SSH=(ssh -i "$SSH_KEY" -o StrictHostKeyChecking=accept-new -o ConnectTimeout=15 "azureuser@$IP")

echo "Waiting for the VM's first-boot setup (Docker, swap) ..."
for _ in $(seq 1 60); do "${SSH[@]}" 'test -f /var/lib/cloud/ccs-ready' 2>/dev/null && break; sleep 10; done

echo "Sending the source (tracked files only) ..."
git -C "$REPO" archive HEAD ead-ccs-test infra/azure/vm | "${SSH[@]}" 'mkdir -p /opt/ccs && tar xf - -C /opt/ccs'

echo "Building and starting the app (about 10-15 minutes the first time) ..."
"${SSH[@]}" "cd /opt/ccs/infra/azure/vm && chmod +x bootstrap.sh && sudo DOMAIN=$DOMAIN ./bootstrap.sh"
echo
echo "Live at: https://$DOMAIN  (the search index fills in a few minutes after the first start)"
