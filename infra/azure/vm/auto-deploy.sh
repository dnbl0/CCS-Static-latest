#!/usr/bin/env bash
# Runs ON the VM every 5 minutes (cron, set up by setup-auto-deploy.sh). If org main has changed something the VM runs
# (the ead-ccs-test and infra/azure/vm folders), it fetches that version with a read-only deploy key, rebuilds the app, and checks
# the site answers and still has its records. If not, it puts the previous version back and does not try that same version again.
# A merge that only touches other folders (docs, the static site) changes nothing here. If the VM was switched off when a merge
# happened, the first run after it starts catches up.
#
# State is in /opt/ccs-deploy: repo/ (partial clone), deploy_key, deployed-sha, deployed-tree, failed-sha, failed-tree, auto-deploy.log.
# Look at it:   ssh ... 'tail -20 /opt/ccs-deploy/auto-deploy.log; cat /opt/ccs-deploy/deployed-sha'
# Pause it:     ssh ... 'sudo mv /etc/cron.d/ccs-auto-deploy /etc/cron.d/ccs-auto-deploy.off'   (move it back to resume)
# Alerts:      when an update fails (and is rolled back) it emails the address in /opt/ccs-deploy/alert.env (set up by setup-alerts.sh).
# Test hooks:   AUTO_DEPLOY_DRY_RUN=1 (say what it would do), AUTO_DEPLOY_FORCE_FAIL=1 (treat the health check as failed, to try the rollback),
#               AUTO_DEPLOY_TEST_ALERT=1 (send a sample alert email and stop; touches nothing else)
set -uo pipefail

STATE="${CCS_DEPLOY_STATE:-/opt/ccs-deploy}"
APP="${CCS_APP_DIR:-/opt/ccs}"
LOG="$STATE/auto-deploy.log"
mkdir -p "$STATE"
exec 9>"$STATE/lock"
flock -n 9 || exit 0   # a run is already going

log() { echo "$(date -u +%FT%TZ) $*" >> "$LOG"; }

# Email a person when an update fails. Never lets a failed alert affect the deploy. alert "subject" "what happened"
alert() {
  [ -f "$STATE/alert.env" ] && [ -f "$STATE/notify-email.py" ] || { log "no alert email set up (setup-alerts.sh)"; return 0; }
  {
    echo "$2"; echo
    echo "The site: https://${DOMAIN:-(address not read)}"
    echo "Look at it: ssh in as azureuser and read /opt/ccs-deploy/auto-deploy.log"
    echo; echo "Last lines of that log:"
    grep -E '^20[0-9-]+T' "$LOG" | tail -8
  } | python3 "$STATE/notify-email.py" "$1" >> "$LOG" 2>&1 && log "alert email sent: $1" || log "alert email could not be sent"
}
if [ -n "${AUTO_DEPLOY_TEST_ALERT:-}" ]; then
  DOMAIN="$(sudo grep '^DOMAIN=' "$APP/infra/azure/vm/.env" | cut -d= -f2)"
  alert "[CCS site] TEST: this is a sample alert, nothing is wrong" "This is a test of the alert email from the CCS server's automatic updater. Nothing failed and nothing was changed."
  exit 0
fi

export GIT_SSH_COMMAND="ssh -i $STATE/deploy_key -o IdentitiesOnly=yes -o UserKnownHostsFile=$STATE/known_hosts -o StrictHostKeyChecking=accept-new -o ConnectTimeout=20"
cd "$STATE/repo" || { log "no clone in $STATE/repo (run setup-auto-deploy.sh)"; exit 1; }
git fetch -q --depth 1 --filter=blob:none origin main 2>>"$LOG" || { log "fetch failed (GitHub unreachable?)"; exit 0; }
NEW="$(git rev-parse FETCH_HEAD)"
# What the VM runs is the content of these two folders: compare that, not the commit
TREE="$(git rev-parse "FETCH_HEAD:ead-ccs-test" "FETCH_HEAD:infra/azure/vm" | sha1sum | cut -d' ' -f1)"

if [ "$TREE" = "$(cat "$STATE/deployed-tree" 2>/dev/null)" ]; then echo "$NEW" > "$STATE/deployed-sha"; exit 0; fi
if [ "$TREE" = "$(cat "$STATE/failed-tree" 2>/dev/null)" ]; then exit 0; fi   # already tried and rolled back
CHANGE="$(git log -1 --format=%s FETCH_HEAD 2>/dev/null)"
log "new version ${NEW:0:7}: deploying ($CHANGE)"
if [ -n "${AUTO_DEPLOY_DRY_RUN:-}" ]; then log "dry run: would deploy ${NEW:0:7}, stopping here"; exit 0; fi

DOMAIN="$(sudo grep '^DOMAIN=' "$APP/infra/azure/vm/.env" | cut -d= -f2)"
[ -n "$DOMAIN" ] || { log "no DOMAIN in $APP/infra/azure/vm/.env: stopping"; exit 1; }

# Keep what is running now, so it can be put back
sudo rm -rf "$APP-prev" && sudo cp -a "$APP" "$APP-prev"
for image in vm-web vm-solr; do sudo docker image inspect "$image:latest" >/dev/null 2>&1 && sudo docker tag "$image:latest" "$image:previous"; done

# Put the new files in place (the same tracked files deploy-vm.sh sends), then build and start
git archive FETCH_HEAD ead-ccs-test infra/azure/vm 2>>"$LOG" | tar x -C "$APP" 2>>"$LOG"
mkdir -p "$APP/ead-ccs-test/app/assets/builds"
chmod +x "$APP/infra/azure/vm/bootstrap.sh"
( cd "$APP/infra/azure/vm" && sudo DOMAIN="$DOMAIN" ./bootstrap.sh ) >> "$LOG" 2>&1
RC=$?

# Healthy = the app answers and the search has its records
healthy() {
  local code count
  code="$(curl -sk -m 20 -o /dev/null -w '%{http_code}' --resolve "$DOMAIN:443:127.0.0.1" "https://$DOMAIN/up")" || return 1
  [ "$code" = 200 ] || return 1
  count="$(curl -sk -m 40 --resolve "$DOMAIN:443:127.0.0.1" "https://$DOMAIN/catalog.json?per_page=1&q=&search_field=all_fields&any_assets=1" \
    | python3 -c 'import sys,json; print(json.load(sys.stdin)["meta"]["pages"]["total_count"])' 2>/dev/null)" || return 1
  [ "${count:-0}" -gt 10000 ]
}
OK=0
if [ "$RC" -eq 0 ] && [ -z "${AUTO_DEPLOY_FORCE_FAIL:-}" ]; then
  for _ in $(seq 1 48); do healthy && { OK=1; break; }; sleep 10; done   # up to 8 minutes for Rails (and Solr) to come up
fi

if [ "$OK" -eq 1 ]; then
  echo "$TREE" > "$STATE/deployed-tree"; echo "$NEW" > "$STATE/deployed-sha"
  sudo rm -rf "$APP-prev"
  cp "$APP/infra/azure/vm/auto-deploy.sh" "$STATE/auto-deploy.sh.new" 2>/dev/null && chmod +x "$STATE/auto-deploy.sh.new" && mv "$STATE/auto-deploy.sh.new" "$STATE/auto-deploy.sh"   # pick up the new version of this script for next time
  cp "$APP/infra/azure/vm/notify-email.py" "$STATE/notify-email.py.new" 2>/dev/null && mv "$STATE/notify-email.py.new" "$STATE/notify-email.py"
  log "deployed ${NEW:0:7}: the site is healthy"
else
  log "FAILED ${NEW:0:7} (build exit $RC${AUTO_DEPLOY_FORCE_FAIL:+, forced failure}): putting the previous version back"
  sudo cp -a "$APP-prev/." "$APP/"
  for image in vm-web vm-solr; do sudo docker image inspect "$image:previous" >/dev/null 2>&1 && sudo docker tag "$image:previous" "$image:latest"; done
  ( cd "$APP/infra/azure/vm" && sudo docker compose up -d --no-build ) >> "$LOG" 2>&1
  echo "$TREE" > "$STATE/failed-tree"; echo "$NEW" > "$STATE/failed-sha"
  for _ in $(seq 1 24); do
    healthy && {
      log "rolled back: the site is healthy again"
      alert "[CCS site] An automatic update failed and was rolled back" "The change \"$CHANGE\" (${NEW:0:7}) was merged but could not be put live: it failed its health check, so the server put the previous version back. The site is working and is on the previous version. That version will not be tried again; the next merge will be."
      exit 1
    }
    sleep 10
  done
  log "ROLLBACK DID NOT RESTORE THE SITE: needs a person (see docker compose logs)"
  alert "[CCS site] URGENT: an update failed and the site may be down" "The change \"$CHANGE\" (${NEW:0:7}) failed its health check and putting the previous version back did not bring the site back. The site may be down. A person needs to look at the server now."
  exit 1
fi
