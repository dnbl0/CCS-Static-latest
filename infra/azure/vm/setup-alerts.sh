#!/usr/bin/env bash
# One-time set-up (safe to run again) of the VM's alert emails: when an automatic update fails and is rolled back, auto-deploy.sh emails you.
# Run from your laptop with the Azure CLI signed in:
#
#   SUBSCRIPTION=<id> ALERT_TO=you@example.org infra/azure/vm/setup-alerts.sh
#
# Optional: RG (ccs-web-rg), VM (ccs-vm), SSH_KEY (~/.ssh/ccs-vm); ALERT_TO can be several addresses, comma separated.
# What it does: creates the Azure email resources (alerts.json: an Azure Communication Services Email resource with an Azure-provided sender
# address), puts the resource's access key and the addresses in /opt/ccs-deploy/alert.env on the VM (readable by its owner only; the key is
# never printed or stored anywhere else), installs notify-email.py there, and sends a test email, waiting until Azure says it was sent.
# Check the junk folder if the test does not arrive: the sender is a new Azure address.
set -euo pipefail
: "${SUBSCRIPTION:?Set SUBSCRIPTION to the Azure subscription id}"
: "${ALERT_TO:?Set ALERT_TO to the address(es) that should get the alerts}"
RG="${RG:-ccs-web-rg}"; VM="${VM:-ccs-vm}"; SSH_KEY="${SSH_KEY:-$HOME/.ssh/ccs-vm}"
HERE="$(cd "$(dirname "$0")" && pwd)"
RES="/subscriptions/$SUBSCRIPTION/resourceGroups/$RG/providers/Microsoft.Communication/communicationServices/ccs-comms"

echo "1. email resources in Azure"
SENDER_DOMAIN="$(az deployment group create --subscription "$SUBSCRIPTION" -g "$RG" -n ccs-vm-alerts --template-file "$HERE/alerts.json" --query properties.outputs.senderDomain.value -o tsv)"
HOST="$(az rest --method get --url "https://management.azure.com$RES?api-version=2025-09-01" --query properties.hostName -o tsv)"
KEY="$(az rest --method post --url "https://management.azure.com$RES/listKeys?api-version=2025-09-01" --query primaryKey -o tsv)"
[ -n "$SENDER_DOMAIN" ] && [ -n "$HOST" ] && [ -n "$KEY" ] || { echo "could not read the email resource details" >&2; exit 1; }

IP="$(az vm show -d --subscription "$SUBSCRIPTION" -g "$RG" -n "$VM" --query publicIps -o tsv)"
SSH=(ssh -i "$SSH_KEY" -o StrictHostKeyChecking=accept-new -o ConnectTimeout=20 "azureuser@$IP")

echo "2. the sender and its settings on the VM"
scp -q -i "$SSH_KEY" "$HERE/notify-email.py" "azureuser@$IP:/opt/ccs-deploy/notify-email.py"
"${SSH[@]}" 'chmod +x /opt/ccs-deploy/notify-email.py; umask 077; cat > /opt/ccs-deploy/alert.env' <<ENVFILE
ACS_ENDPOINT=https://$HOST
ACS_KEY=$KEY
ALERT_FROM=DoNotReply@$SENDER_DOMAIN
ALERT_TO=$ALERT_TO
ENVFILE

echo "3. a test email to $ALERT_TO"
"${SSH[@]}" 'python3 /opt/ccs-deploy/notify-email.py --wait "[CCS site] TEST: alert emails are set up" ' <<< "This is a test from the CCS server. If you can read this, you will get an email like it when an automatic update fails and is rolled back."
echo "   sent: Azure reports the email as delivered to its mail system. Look in the inbox (and the junk folder)."
