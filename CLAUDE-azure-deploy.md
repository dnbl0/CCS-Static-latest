## Azure deployment

This app deploys to Azure Container Apps on DJ Mulholland's Azure for Students subscription.
You have Contributor access to one resource group only. Don't try to read or change anything outside it.

### Fixed values

| Item | Value |
|---|---|
| Azure user | `dean.noble@unimelb.edu.au` |
| Tenant | `0e5bf3cf-1ff4-46b7-9176-52c538c22a4d` (The University of Melbourne) |
| Subscription | `80e9ccaf-5eec-4c82-87aa-29855e980e20` (Azure for Students) |
| Resource group | `ccs-service-experience-app` (already exists) |
| Region | `australiaeast` |
| Container registry | `ccsprototype` (shared with DJ's app, in resource group `ccs-prototype`) |
| Image | `ccsprototype.azurecr.io/service-experience` |
| Container Apps environment | `ccs-service-exp-env` |
| Container app | `ccs-service-experience-app` |

### Rules

- Run every `az` command against the `ccs-service-experience-app` resource group. Never create resource groups or touch other resource groups.
- The container registry `ccsprototype` is shared with DJ's live app, which uses the `ccs` repository.
  - Push and pull only the `service-experience` repository. Before every push, check that the image name is `ccsprototype.azurecr.io/service-experience`.
  - Never push to, retag, or delete anything in the `ccs` repository.
  - Never run `az acr delete`, `az acr repository delete`, `az acr update`, or `az acr credential renew`. These affect DJ's app.
  - Don't create a registry. DJ provides the registry credentials.
- Azure for Students blocks service principals and ACR Tasks. Don't use `az ad sp create`, `az acr build`, `az containerapp up`, or GitHub Actions `azure/login`.
  - GitHub Actions only builds and pushes the image, using the registry admin credentials.
  - You deploy each new image manually with `az containerapp update`.
- The subscription uses shared, limited credit (about AU$62 as of 2026-09-17). Use `--min-replicas 0` and `--max-replicas 1`. Ask before creating any other billable resource.
- Never commit registry credentials, `RAILS_MASTER_KEY`, `SECRET_KEY_BASE` or other secrets. Store them as GitHub repository secrets or container app secrets.
- Role assignment commands need `--scope`. This CLI version rejects `--resource-group` alone.
- Deletions can't be undone. Confirm with the user before running any `az ... delete` command.

### One-time setup

1. Sign in, and select the subscription:

   ```bash
   az login --tenant 0e5bf3cf-1ff4-46b7-9176-52c538c22a4d
   az account set --subscription 80e9ccaf-5eec-4c82-87aa-29855e980e20
   ```

2. Register the resource providers. If you get a permissions error, ask DJ to register them.

   ```bash
   az provider register --namespace Microsoft.ContainerRegistry
   az provider register --namespace Microsoft.App
   az provider register --namespace Microsoft.OperationalInsights
   ```

3. Get the `ccsprototype` registry credentials from DJ, and add them as the GitHub repository secrets `ACR_USERNAME` and `ACR_PASSWORD`. You don't have access to read them yourself. Don't write them to any file.

4. Create the Container Apps environment:

   ```bash
   az containerapp env create --name ccs-service-exp-env --resource-group ccs-service-experience-app --location australiaeast
   ```

5. Create the container app with a placeholder image.
   - Set `--target-port` to the port the app listens on inside the container. Use a port above 1024, such as 8080, because a non-root container can't bind to port 80.
   - Add `--env-vars` for the app's runtime settings. Use `--secrets` for secret values, and reference them from `--env-vars` as `NAME=secretref:<secret-name>`.

   ```bash
   az containerapp create --name ccs-service-experience-app --resource-group ccs-service-experience-app --environment ccs-service-exp-env --image mcr.microsoft.com/k8se/quickstart:latest --target-port 8080 --ingress external --cpu 1 --memory 2Gi --min-replicas 0 --max-replicas 1 --registry-server ccsprototype.azurecr.io --registry-username <acr-username> --registry-password <acr-password>
   ```

6. Add the GitHub Actions workflow in `.github/workflows/deploy-azure.yml`:

   ```yaml
   name: Build and Push to Azure Container Registry

   on:
     push:
       branches: [main]
     workflow_dispatch:

   env:
     REGISTRY: ccsprototype.azurecr.io
     IMAGE_NAME: service-experience

   jobs:
     build-and-push:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: docker/login-action@v3
           with:
             registry: ${{ env.REGISTRY }}
             username: ${{ secrets.ACR_USERNAME }}
             password: ${{ secrets.ACR_PASSWORD }}
         - uses: docker/build-push-action@v6
           with:
             context: .
             push: true
             tags: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }},${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:latest
             platforms: linux/amd64
   ```

   The repository needs a `Dockerfile` at its root. Build for `linux/amd64`, even on Apple silicon.

### Deploy a new version

1. Push to `main`, then wait for the GitHub Actions run to succeed:

   ```bash
   gh run watch
   ```

2. Deploy the image. The revision suffix forces a new revision, even when the tag is still `latest`.

   ```bash
   az containerapp update --name ccs-service-experience-app --resource-group ccs-service-experience-app --image ccsprototype.azurecr.io/service-experience:latest --revision-suffix $(git rev-parse --short HEAD)
   ```

3. Check the deployment:

   ```bash
   az containerapp revision list --name ccs-service-experience-app --resource-group ccs-service-experience-app --query "[].{name:name,active:properties.active,health:properties.healthState,running:properties.runningState}" -o table
   az containerapp show --name ccs-service-experience-app --resource-group ccs-service-experience-app --query "properties.configuration.ingress.fqdn" -o tsv
   ```

4. Open `https://<fqdn>` and confirm the app loads. The first request after the app scales to zero takes several seconds.

### Troubleshooting

| Symptom | Action |
|---|---|
| Revision is unhealthy or keeps restarting | Read the logs with `az containerapp logs show --name ccs-service-experience-app --resource-group ccs-service-experience-app --tail 100`. |
| `bind: permission denied` | The app is listening on port 80. Change it to 8080, and match `--target-port`. |
| Container runs out of memory | Reduce worker or thread counts in the app. Don't raise `--memory` above `2Gi` without asking. |
| `unauthorized` when pushing or pulling | Ask DJ whether the `ccsprototype` credentials changed. Update the GitHub secrets, then run `az containerapp registry set --name ccs-service-experience-app --resource-group ccs-service-experience-app --server ccsprototype.azurecr.io --username <acr-username> --password <acr-password>`. |
| `AuthorizationFailed` | The command is outside `ccs-service-experience-app`, or it needs a permission that only DJ has. Ask DJ. |
| Refresh token expired | Run `az login --tenant 0e5bf3cf-1ff4-46b7-9176-52c538c22a4d` again. |
