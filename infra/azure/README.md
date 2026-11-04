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

## One VM (`infra/azure/vm/`): what runs the site now
`infra/azure/vm/deploy-vm.sh` creates a single Ubuntu VM that runs Caddy (automatic HTTPS), Rails, Solr and Postgres with Docker
Compose. Run it from a clone with the Azure CLI signed in: `SUBSCRIPTION=<id> infra/azure/vm/deploy-vm.sh`. It sends the tracked files
to the VM (the repository is private, so the VM cannot clone it), generates the passwords on the VM, builds the images (about 10-15
minutes) and the app fills its own Solr index on first start (`AUTO_INDEX`). Student subscriptions only allow some regions (the
script defaults to New Zealand North); see the notes at the top of the script. Running it again updates the app.

### An `azurecontainerapps.io` address in front of the VM
Some networks (the University's, a VPN) refuse a new `*.cloudapp.azure.com` address with `ERR_SSL_PROTOCOL_ERROR`, while an
`*.azurecontainerapps.io` address works. A small Container App (Caddy, 0.25 vCPU) in front of the VM gives that address; the proxy
connects to the VM from inside Azure, so the visitor's network only ever sees the trusted domain. How it was set up (2026-11-04):

1. `az containerapp env create -g ccs-web-rg -n ccs-env -l newzealandnorth --logs-destination none` (needs `Microsoft.App` and
   `Microsoft.OperationalInsights` registered). This makes an **Express** environment. In Express: no revision suffix, and only a
   changed **image string** starts a new replica (use a different tag, e.g. `caddy:2.10-alpine` instead of `caddy:2`).
2. `az containerapp create -g ccs-web-rg -n ccs-web --environment ccs-env --image docker.io/library/caddy:2.10-alpine --command caddy
   --target-port 8080 --ingress external --cpu 0.25 --memory 0.5Gi --min-replicas 1 --max-replicas 1`, then set the arguments with
   `az containerapp update --yaml` (the CLI's `--args` turns a list into one comma-joined string and the container crash-loops):
   `args: [reverse-proxy, --from, ":8080", --to, "https://<VM address>"]`. Do **not** add `--change-host-header`: the visitor's address must
   reach the VM as the Host header, or the app writes links to the VM's own address.
3. On the VM add `EXTRA_HOSTS=<app>.<env>.<region>.azurecontainerapps.io` to `/opt/ccs/infra/azure/vm/.env` (root only), then
   `sudo docker compose up -d web caddy`. The app then allows that host (`RAILS_HOSTS`) and the VM's Caddy answers it
   (the second block in the `Caddyfile`).

Address now: https://ccs-web.nicebay-19f9959b.newzealandnorth.azurecontainerapps.io (about US$5-10 a month extra).

## Container Apps without storage mounts (`containerapps.sh`)
On Azure for Students "Express" environments there are no storage mounts, so Solr's index lives on the container disk and
the web app re-fills it on start (`AUTO_INDEX=true`). Solr runs `--user-managed` with a generated password; the web app
reaches it over its https address with the password held in a secret. Pin `TAG` to a commit SHA: a changed tag is what
makes Azure start a new replica. See the header of `containerapps.sh` for details.

## Redeploying a merged change (the live `ccs-web`)
1. Merge to `org` main and wait for the **Push images to Azure Container Registry** workflow: it pushes `ccs-web:<commit SHA>`.
2. `az containerapp update -n ccs-web -g <rg> --image <registry>.azurecr.io/ccs-web:<commit SHA>`. Do not pass `--revision-suffix` (Express
   environments reject it) and do not use the `latest` tag (a replica keeps a cached image; only a changed image string restarts it).
3. The app restarts and Solr is empty until the web app re-indexes the bundled CSVs (`AUTO_INDEX=true`, about two minutes): search shows
   "0 results" meanwhile. Wait until `/catalog?q=map` returns results, then check `/`, `/help` and the stock record pages.
4. Only `ccs-web` and `ccs-solr` are ours; leave any other app in the resource group alone. Passwords stay in Azure secrets.

