#!/usr/bin/env bash
# Creates (or updates) the Azure resources for the Blacklight app on Azure Container Apps.
# Idempotent and safe to re-run. Run after `az login`; it stores no secrets.
#
#   SUBSCRIPTION=<id> infra/azure/deploy.sh [image-tag]
set -euo pipefail

: "${SUBSCRIPTION:?set SUBSCRIPTION to the Azure subscription id}"
LOCATION="${LOCATION:-australiaeast}"
RG="${RG:-ccs-rg}"
SUFFIX="${SUFFIX:-$(printf '%s' "$SUBSCRIPTION" | cut -c1-6)}"
ACR="${ACR:-ccsacr${SUFFIX//-/}}"
ENVNAME="${ENVNAME:-ccs-env}"
PG="${PG:-ccs-pg-${SUFFIX}}"
STORAGE="${STORAGE:-ccsstore${SUFFIX//-/}}"
TAG="${1:-latest}"

az account set --subscription "$SUBSCRIPTION"
az extension add --name containerapp --upgrade --only-show-errors

az group show -n "$RG" -o none 2>/dev/null || az group create -n "$RG" -l "$LOCATION" -o none
az acr show -n "$ACR" -g "$RG" -o none 2>/dev/null || az acr create -n "$ACR" -g "$RG" --sku Basic -o none
az containerapp env show -n "$ENVNAME" -g "$RG" -o none 2>/dev/null || az containerapp env create -n "$ENVNAME" -g "$RG" -l "$LOCATION" -o none

# --- Postgres (Burstable) ---
if ! az postgres flexible-server show -n "$PG" -g "$RG" -o none 2>/dev/null; then
  PGPASS="$(openssl rand -base64 24 | tr -d '/+=')"
  az postgres flexible-server create -n "$PG" -g "$RG" -l "$LOCATION" --tier Burstable --sku-name Standard_B1ms \
    --version 17 --admin-user ead_ccs --admin-password "$PGPASS" --public-access 0.0.0.0 --yes -o none
  az postgres flexible-server db create -g "$RG" -s "$PG" -n ead_ccs -o none
  echo "Postgres created. The admin password was generated and not shown; set a known one with:"
  echo "  az postgres flexible-server update -n $PG -g $RG --admin-password <new> and store it as the ccs-web secret."
fi

# --- Solr storage (Azure Files) ---
az storage account show -n "$STORAGE" -g "$RG" -o none 2>/dev/null || az storage account create -n "$STORAGE" -g "$RG" -l "$LOCATION" --sku Standard_LRS -o none
SKEY="$(az storage account keys list -n "$STORAGE" -g "$RG" --query '[0].value' -o tsv)"
az storage share-rm create --storage-account "$STORAGE" -g "$RG" -n solr-data -o none
az containerapp env storage set -n "$ENVNAME" -g "$RG" --storage-name solr-data --azure-file-account-name "$STORAGE" \
  --azure-file-account-key "$SKEY" --azure-file-share-name solr-data --access-mode ReadWrite -o none

echo "Foundation ready. Container apps (ccs-solr, ccs-web) are created by .github/workflows/azure-deploy.yml"
echo "once images exist in $ACR.azurecr.io; see infra/azure/README.md."
