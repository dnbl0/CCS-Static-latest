#!/usr/bin/env bash
# One-time set-up (safe to run again) of automatic deploys: the VM checks org main every 5 minutes and updates itself (auto-deploy.sh).
# Run it from your laptop with the Azure CLI and gh signed in (gh needs admin on the repository, to add a deploy key):
#
#   SUBSCRIPTION=<id> infra/azure/vm/setup-auto-deploy.sh
#
# Optional: RG (ccs-web-rg), VM (ccs-vm), SSH_KEY (~/.ssh/ccs-vm), REPO (Enterprise-Services-Group/CCS-2026-MVP), and SEED_SHA, the commit
# of org main the VM is running now (so the first check does not redeploy the same thing; without it the first check deploys main).
#
# What it does: makes /opt/ccs-deploy on the VM; creates a deploy key there (the private half never leaves the VM) and registers the public
# half with GitHub as READ-ONLY; makes a partial clone; installs auto-deploy.sh and a cron entry (/etc/cron.d/ccs-auto-deploy).
set -euo pipefail
: "${SUBSCRIPTION:?Set SUBSCRIPTION to the Azure subscription id}"
RG="${RG:-ccs-web-rg}"; VM="${VM:-ccs-vm}"; SSH_KEY="${SSH_KEY:-$HOME/.ssh/ccs-vm}"
REPO="${REPO:-Enterprise-Services-Group/CCS-2026-MVP}"; SEED_SHA="${SEED_SHA:-}"
HERE="$(cd "$(dirname "$0")" && pwd)"
TITLE="$VM auto-deploy"

IP="$(az vm show -d --subscription "$SUBSCRIPTION" -g "$RG" -n "$VM" --query publicIps -o tsv)"
SSH=(ssh -i "$SSH_KEY" -o StrictHostKeyChecking=accept-new -o ConnectTimeout=20 "azureuser@$IP")
GIT_SSH="ssh -i /opt/ccs-deploy/deploy_key -o IdentitiesOnly=yes -o UserKnownHostsFile=/opt/ccs-deploy/known_hosts -o StrictHostKeyChecking=accept-new"

echo "1. folder, git and the deploy key on the VM"
"${SSH[@]}" 'sudo mkdir -p /opt/ccs-deploy && sudo chown azureuser:azureuser /opt/ccs-deploy
  command -v git >/dev/null || sudo apt-get install -y -qq git >/dev/null
  [ -f /opt/ccs-deploy/deploy_key ] || ssh-keygen -q -t ed25519 -N "" -C "ccs-vm auto-deploy" -f /opt/ccs-deploy/deploy_key'
PUB="$("${SSH[@]}" 'cat /opt/ccs-deploy/deploy_key.pub')"

echo "2. register the public key with GitHub (read-only)"
if gh api "repos/$REPO/keys" --jq '.[].title' | grep -qxF "$TITLE"; then
  echo "   already registered"
else
  gh api -X POST "repos/$REPO/keys" -f title="$TITLE" -f key="$PUB" -F read_only=true --jq '"   added deploy key \(.id), read_only=\(.read_only)"'
fi

echo "3. partial clone on the VM"
"${SSH[@]}" "export GIT_SSH_COMMAND='$GIT_SSH'; [ -d /opt/ccs-deploy/repo/.git ] || git clone -q --filter=blob:none --no-checkout --depth 1 --branch main git@github.com:$REPO.git /opt/ccs-deploy/repo && echo '   cloned'"

echo "4. the script, the starting point and the cron entry"
scp -q -i "$SSH_KEY" "$HERE/auto-deploy.sh" "azureuser@$IP:/opt/ccs-deploy/auto-deploy.sh"
"${SSH[@]}" 'chmod +x /opt/ccs-deploy/auto-deploy.sh'
if [ -n "$SEED_SHA" ]; then
  "${SSH[@]}" "export GIT_SSH_COMMAND='$GIT_SSH'; cd /opt/ccs-deploy/repo && git fetch -q --depth 1 --filter=blob:none origin $SEED_SHA && git rev-parse FETCH_HEAD:ead-ccs-test FETCH_HEAD:infra/azure/vm | sha1sum | cut -d' ' -f1 > /opt/ccs-deploy/deployed-tree && echo $SEED_SHA > /opt/ccs-deploy/deployed-sha && echo '   starting point: $SEED_SHA'"
fi
"${SSH[@]}" "printf 'SHELL=/bin/bash\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\n*/5 * * * * azureuser /opt/ccs-deploy/auto-deploy.sh\n' | sudo tee /etc/cron.d/ccs-auto-deploy >/dev/null && sudo chmod 644 /etc/cron.d/ccs-auto-deploy && echo '   cron entry installed (every 5 minutes)'"
echo "Done. Look at it: ssh -i $SSH_KEY azureuser@$IP 'tail -20 /opt/ccs-deploy/auto-deploy.log; cat /opt/ccs-deploy/deployed-sha'"
