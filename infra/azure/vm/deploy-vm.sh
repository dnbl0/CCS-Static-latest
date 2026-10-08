#!/usr/bin/env bash
# Creates one Azure VM that runs the whole app with Docker (see docker-compose.yml). Run in Azure Cloud Shell.
# Nothing here prints secrets; the app's passwords are generated on the VM and stay there.
#
#   SUBSCRIPTION=<id> RG=<existing resource group> infra/azure/vm/deploy-vm.sh
set -euo pipefail
: "${SUBSCRIPTION:?}" ; : "${RG:?}"
BRANCH="${BRANCH:-main}"
LOCATION="${LOCATION:-$(az group show -n "$RG" --subscription "$SUBSCRIPTION" --query location -o tsv)}"
VM="${VM:-ccs-vm}"
LABEL="${LABEL:-ccs-$(printf '%s' "$SUBSCRIPTION" | cut -c1-6)}"
DOMAIN="$LABEL.$LOCATION.cloudapp.azure.com"
az account set --subscription "$SUBSCRIPTION"

CI="$(mktemp)"
sed "s#__DOMAIN__#$DOMAIN#; s#__BRANCH__#$BRANCH#" "$(dirname "$0")/cloud-init.yaml" > "$CI"

for SIZE in ${VM_SIZES:-Standard_B2ps_v2 Standard_B2pls_v2 Standard_B2s Standard_B2als_v2 Standard_B2as_v2 Standard_D2s_v3}; do
  echo "Trying VM size $SIZE ..."
  # Arm sizes (the "p" in Standard_B2ps_v2) need the arm64 image; the Docker images used here are multi-arch
  IMAGE=Ubuntu2404
  [[ $SIZE =~ ^Standard_[A-Za-z]+[0-9]+p ]] && IMAGE=Canonical:ubuntu-24_04-lts:server-arm64:latest
  if az vm create -g "$RG" -n "$VM" -l "$LOCATION" --image "$IMAGE" --size "$SIZE" --admin-username azureuser \
       --generate-ssh-keys --public-ip-sku Standard --public-ip-address-dns-name "$LABEL" --custom-data "$CI" -o none; then
    az vm open-port -g "$RG" -n "$VM" --port 80,443 --priority 900 -o none
    echo
    echo "VM created. The app builds for about 10-15 minutes, then is live at: https://$DOMAIN"
    exit 0
  fi
done
echo "Could not create a VM in $LOCATION with any of the tried sizes." >&2
exit 1
