# Workflows in this folder

GitHub only runs workflows from a repository's root `.github/`. These files are for when `ead-ccs-test` is the root of its
own repository (the organisation's `ead-ccs` repository, which builds and deploys the image with the
`unimelb-enterprise-apps` actions and its secrets). In the combined repository they do not run; its checks are
`.github/workflows/ci.yml` and `rails-ci.yml` at the top level. Keep them in step: if a check is added there, add it here.
Do not delete `deploy.yaml` without confirming how the app is deployed.
