#!/usr/bin/env bash
# Deploys the web app and Solr into an existing Azure Container Apps environment (no VM, no Microsoft.Network
# registration, no storage mount). Images must already be in the registry (run the "Push images to Azure Container
# Registry" workflow first). Solr's index lives on the container's disk, so it is empty after any restart and must be
# re-indexed (rails collections:index). Nothing is printed that is secret; run after `az login`.
#
#   SUBSCRIPTION=<id> RG=<resource group> ACR=<registry name> PG=<postgres server> ENVNAME=<env> infra/azure/containerapps.sh
set -euo pipefail

: "${SUBSCRIPTION:?set SUBSCRIPTION}"
: "${RG:?set RG}"
: "${ACR:?set ACR (registry name, e.g. ccsacr80e9cc)}"
: "${PG:?set PG (Postgres server name, e.g. ccs-pg-80e9cc)}"
: "${ENVNAME:?set ENVNAME (existing Container Apps environment)}"
TAG="${TAG:-latest}"

az account set --subscription "$SUBSCRIPTION"
az extension add --name containerapp --upgrade --only-show-errors

ACR_USER="$(az acr credential show -n "$ACR" --query username -o tsv)"
ACR_PASS="$(az acr credential show -n "$ACR" --query 'passwords[0].value' -o tsv)"
REG="$ACR.azurecr.io"

# Postgres: set a fresh admin password (the one from creation was never shown) and keep it in a Container App secret.
PGPASS="$(openssl rand -hex 24)"
az postgres flexible-server update -n "$PG" -g "$RG" --admin-password "$PGPASS" -o none
SECRET_KEY_BASE="$(openssl rand -hex 64)"

# Solr: reachable only from inside the environment (internal ingress). The image's security.json has a password nobody
# knows, so it is removed at start and the internal ingress is the access control.
if az containerapp show -n ccs-solr -g "$RG" -o none 2>/dev/null; then
  az containerapp update -n ccs-solr -g "$RG" --image "$REG/ccs-solr:$TAG" -o none
else
  az containerapp create -n ccs-solr -g "$RG" --environment "$ENVNAME" \
    --image "$REG/ccs-solr:$TAG" --registry-server "$REG" --registry-username "$ACR_USER" --registry-password "$ACR_PASS" \
    --ingress internal --target-port 8983 --transport http --min-replicas 1 --max-replicas 1 --cpu 1 --memory 2Gi \
    --command bash --args "-c,rm -f /opt/solr/server/solr/security.json; exec solr-precreate blacklight-core /opt/solr/server/solr/configsets/blacklight-conf" \
    -o none
fi

if az containerapp show -n ccs-web -g "$RG" -o none 2>/dev/null; then
  az containerapp secret set -n ccs-web -g "$RG" --secrets pgpass="$PGPASS" secretkey="$SECRET_KEY_BASE" -o none
  az containerapp update -n ccs-web -g "$RG" --image "$REG/ccs-web:$TAG" -o none
else
  az containerapp create -n ccs-web -g "$RG" --environment "$ENVNAME" \
    --image "$REG/ccs-web:$TAG" --registry-server "$REG" --registry-username "$ACR_USER" --registry-password "$ACR_PASS" \
    --ingress external --target-port 3000 --min-replicas 1 --max-replicas 1 --cpu 1 --memory 2Gi \
    --secrets pgpass="$PGPASS" secretkey="$SECRET_KEY_BASE" \
    --env-vars RAILS_ENV=production RAILS_ASSUME_SSL=true RAILS_FORCE_SSL=true \
      POSTGRES_HOST="$PG.postgres.database.azure.com" POSTGRES_DB=ead_ccs POSTGRES_USER=ead_ccs PGSSLMODE=require \
      POSTGRES_PASSWORD=secretref:pgpass SECRET_KEY_BASE=secretref:secretkey \
      SOLR_URL=http://ccs-solr/solr/blacklight-core -o none
fi

FQDN="$(az containerapp show -n ccs-web -g "$RG" --query properties.configuration.ingress.fqdn -o tsv)"
az containerapp update -n ccs-web -g "$RG" --set-env-vars RAILS_HOSTS="$FQDN" -o none
echo "Deployed. Site: https://$FQDN"
echo "The search index is empty until the collection CSV files are loaded (rails collections:index)."
