#!/usr/bin/env bash
# One-time set-up (safe to run again) of the site watcher: an Azure Logic App that checks the live site every 5 minutes and emails you if it is
# down (site-watch.json explains the rules: quiet 00:00-06:15 Melbourne time, a re-check before alerting, at most twice an hour). It needs the alert
# email resources from setup-alerts.sh first. Run from your laptop with the Azure CLI signed in:
#
#   SUBSCRIPTION=<id> ALERT_TO=you@example.org infra/azure/vm/setup-site-watch.sh
#
# Optional: RG (ccs-web-rg), SITE_URL (the address people use). Look at it: Azure portal > Logic Apps > ccs-site-watch > Runs history.
# Pause it: disable the Logic App (portal), or `az rest --method post --url https://management.azure.com/subscriptions/<id>/resourceGroups/<rg>/providers/Microsoft.Logic/workflows/ccs-site-watch/disable?api-version=2019-05-01`.
set -euo pipefail
: "${SUBSCRIPTION:?Set SUBSCRIPTION to the Azure subscription id}"
: "${ALERT_TO:?Set ALERT_TO to the address that should get the alerts}"
RG="${RG:-ccs-web-rg}"
HERE="$(cd "$(dirname "$0")" && pwd)"
RES="/subscriptions/$SUBSCRIPTION/resourceGroups/$RG/providers/Microsoft.Communication/communicationServices/ccs-comms"

SENDER_DOMAIN="$(az deployment group show --subscription "$SUBSCRIPTION" -g "$RG" -n ccs-vm-alerts --query properties.outputs.senderDomain.value -o tsv)"
HOST="$(az rest --method get --url "https://management.azure.com$RES?api-version=2025-09-01" --query properties.hostName -o tsv)"
[ -n "$SENDER_DOMAIN" ] && [ -n "$HOST" ] || { echo "run setup-alerts.sh first (the email resources are missing)" >&2; exit 1; }

PARAMS=(alertTo="$ALERT_TO" senderAddress="DoNotReply@$SENDER_DOMAIN" acsHost="$HOST")
[ -z "${SITE_URL:-}" ] || PARAMS+=(siteUrl="$SITE_URL")
az deployment group create --subscription "$SUBSCRIPTION" -g "$RG" -n ccs-site-watch --template-file "$HERE/site-watch.json" --parameters "${PARAMS[@]}" \
  --query "{state:properties.provisioningState}" -o tsv
echo "The watcher is on. It checks every 5 minutes; you get an email only if the site is down (never during 00:00-06:15 Melbourne time)."
