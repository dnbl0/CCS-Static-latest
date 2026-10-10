# Azure Container Apps deployment

Nothing here has been run. Everything is manual-trigger and creates nothing until you run it.

Layout: `ccs-web` (Rails, public HTTPS) -> `ccs-solr` (internal, Azure Files at `/var/solr`) and Azure Database for
PostgreSQL (Burstable). Images live in Azure Container Registry.

## One-time setup
1. `SUBSCRIPTION=<id> infra/azure/deploy.sh` creates the resource group, registry, Container Apps environment,
   Postgres and the Azure Files share. It does not show the generated Postgres password: reset it with `az postgres flexible-server update --admin-password` and save it as the `ccs-web` secret.
2. Give GitHub OIDC access: create an Entra app registration with a federated credential for this repo, grant it
   `Contributor` on the resource group and `AcrPush` on the registry, then set repository variables
   `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID`, `AZURE_ACR_NAME`, `AZURE_RESOURCE_GROUP`,
   `AZURE_CONTAINERAPPS_ENV`. No passwords are stored in GitHub.
3. Run the **Deploy to Azure Container Apps** workflow once. Then create `ccs-web` with external ingress on port 3000,
   env `RAILS_ASSUME_SSL=true`, `RAILS_FORCE_SSL=true`, `RAILS_HOSTS=<app>.azurecontainerapps.io`, `POSTGRES_HOST`,
   `POSTGRES_DB=ead_ccs`, `POSTGRES_USER=ead_ccs`, and secrets `POSTGRES_PASSWORD`, `SECRET_KEY_BASE`, `SOLR_URL`
   (set these in the Azure portal or with `az containerapp secret set`, not in git).
4. Mount the `solr-data` share at `/var/solr` on `ccs-solr` (portal: Volumes), then index:
   `az containerapp exec -n ccs-web -g <rg> --command "bundle exec rails collections:index"`
   (needs the CSV exports, which are not committed).

The image's default command still runs `db:prepare` on boot, as for the existing cluster. To run migrations separately
on Azure, override the `ccs-web` command to `bundle exec rails server -b 0.0.0.0` and run `rails db:prepare` as a
Container Apps job.

## Simpler alternative: one VM (`infra/azure/vm/`)
The Container Apps route above needs a standard environment, and student subscriptions allow only one per region.
`infra/azure/vm/deploy-vm.sh` instead creates a single Ubuntu VM that runs Caddy (automatic HTTPS), Rails, Solr and
Postgres with Docker Compose. Passwords are generated on the VM (`/opt/ccs/infra/azure/vm/.env`, root only).
Run it in Cloud Shell: `SUBSCRIPTION=<id> RG=<group> BRANCH=<branch> infra/azure/vm/deploy-vm.sh`.

## Container Apps without storage mounts (`containerapps.sh`)
On Azure for Students "Express" environments there are no storage mounts, so Solr's index lives on the container disk and
the web app re-fills it on start (`AUTO_INDEX=true`). Solr runs `--user-managed` with a generated password; the web app
reaches it over its https address with the password held in a secret. Pin `TAG` to a commit SHA: a changed tag is what
makes Azure start a new replica. See the header of `containerapps.sh` for details.
