#!/usr/bin/env bash
# Runs on the VM (from cloud-init). Generates secrets once into .env (root-only, never printed) and starts the stack.
set -euo pipefail
cd "$(dirname "$0")"
: "${DOMAIN:?DOMAIN must be set}"

if [ ! -f .env ]; then
  umask 077
  {
    echo "DOMAIN=$DOMAIN"
    echo "POSTGRES_PASSWORD=$(openssl rand -hex 24)"
    echo "SECRET_KEY_BASE=$(openssl rand -hex 64)"
    echo "SOLR_PASSWORD=$(openssl rand -hex 24)"
  } > .env
fi
set -a; . ./.env; set +a

# Solr basic-auth file: user "solr", hash = base64(sha256(sha256(salt+password))) base64(salt)
python3 - <<'PY' > security.json
import base64, hashlib, json, os
pw, salt = os.environ["SOLR_PASSWORD"].encode(), os.urandom(32)
h = hashlib.sha256(hashlib.sha256(salt + pw).digest()).digest()
cred = "%s %s" % (base64.b64encode(h).decode(), base64.b64encode(salt).decode())
print(json.dumps({
  "authentication": {"blockUnknown": True, "class": "solr.BasicAuthPlugin", "credentials": {"solr": cred}, "forwardCredentials": False},
  "authorization": {"class": "solr.RuleBasedAuthorizationPlugin", "permissions": [{"name": "security-edit", "role": "admin"}], "user-role": {"solr": "admin"}},
}))
PY

docker compose up -d --build
