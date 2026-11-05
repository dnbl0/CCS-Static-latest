#!/usr/bin/env python3
"""Sends one email through Azure Communication Services Email (standard library only, so it runs on the bare VM).

    notify-email.py "Subject" < body.txt          send (reads /opt/ccs-deploy/alert.env, or the file in $CCS_ALERT_ENV)
    notify-email.py --wait "Subject" < body.txt   the same, then wait until Azure says it was sent (used by setup-alerts.sh)
    notify-email.py --print-signature             (tests) read {key,payload,date,host,path} as JSON, print the signature pieces

alert.env holds ACS_ENDPOINT (https://<name>.<region>.communication.azure.com), ACS_KEY (the resource's access key), ALERT_FROM
(DoNotReply@<random>.azurecomm.net) and ALERT_TO (one or more addresses, comma separated). It is readable by its owner only.
The exit status is 0 when Azure accepted the message, 1 otherwise; callers must not let a failed alert stop their own work.
"""
import base64
import email.utils
import hashlib
import hmac
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = "api-version=2023-03-31"


def sign(key_b64, payload, date, host, path):
    """The pieces of Azure's HMAC-SHA256 request signing: body hash, signature, and the Authorization header value."""
    content_hash = base64.b64encode(hashlib.sha256(payload.encode()).digest()).decode()
    string_to_sign = f"POST\n{path}\n{date};{host};{content_hash}"
    signature = base64.b64encode(hmac.new(base64.b64decode(key_b64), string_to_sign.encode(), hashlib.sha256).digest()).decode()
    return {
        "contentHash": content_hash,
        "signature": signature,
        "authorization": f"HMAC-SHA256 SignedHeaders=x-ms-date;host;x-ms-content-sha256&Signature={signature}",
    }


def load_env(path):
    env = {}
    with open(path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                env[k.strip()] = v.strip()
    return env


def call(env, method, url, payload=None):
    """One signed request; returns (status, headers, body)."""
    parsed = urllib.parse.urlparse(url)
    path = parsed.path + ("?" + parsed.query if parsed.query else "")
    body = payload or ""
    date = email.utils.formatdate(usegmt=True)
    s = sign(env["ACS_KEY"], body, date, parsed.netloc, path) if method == "POST" else None
    headers = {"x-ms-date": date, "Content-Type": "application/json"}
    if method == "POST":
        headers["x-ms-content-sha256"] = s["contentHash"]
        headers["Authorization"] = s["authorization"]
    else:  # GET: the same scheme, with the method in the string to sign
        content_hash = base64.b64encode(hashlib.sha256(b"").digest()).decode()
        sts = f"GET\n{path}\n{date};{parsed.netloc};{content_hash}"
        sig = base64.b64encode(hmac.new(base64.b64decode(env["ACS_KEY"]), sts.encode(), hashlib.sha256).digest()).decode()
        headers["x-ms-content-sha256"] = content_hash
        headers["Authorization"] = f"HMAC-SHA256 SignedHeaders=x-ms-date;host;x-ms-content-sha256&Signature={sig}"
    req = urllib.request.Request(url, data=body.encode() if method == "POST" else None, method=method, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, r.headers, r.read().decode()
    except urllib.error.HTTPError as e:
        return e.code, e.headers, e.read().decode()


def send(env, subject, text, wait=False):
    payload = json.dumps({
        "senderAddress": env["ALERT_FROM"],
        "recipients": {"to": [{"address": a.strip()} for a in env["ALERT_TO"].split(",") if a.strip()]},
        "content": {"subject": subject, "plainText": text},
    })
    status, headers, body = call(env, "POST", env["ACS_ENDPOINT"].rstrip("/") + "/emails:send?" + API, payload)
    if status != 202:
        sys.stderr.write(f"Azure did not accept the email: HTTP {status} {body[:300]}\n")
        return False
    if not wait:
        return True
    op = headers.get("Operation-Location")
    for _ in range(30):
        time.sleep(2)
        st, _, b = call(env, "GET", op)
        state = (json.loads(b).get("status") if st == 200 else None) or ""
        if state.lower() == "succeeded":
            return True
        if state.lower() in ("failed", "canceled"):
            sys.stderr.write(f"Azure could not send the email: {b[:300]}\n")
            return False
    sys.stderr.write("Timed out waiting for Azure to send the email\n")
    return False


def main(argv):
    if argv[:1] == ["--print-signature"]:
        d = json.load(sys.stdin)
        print(json.dumps(sign(d["key"], d["payload"], d["date"], d["host"], d["path"])))
        return 0
    wait = argv[:1] == ["--wait"]
    args = argv[1:] if wait else argv
    if not args:
        sys.stderr.write(__doc__)
        return 1
    try:
        env = load_env(os.environ.get("CCS_ALERT_ENV", "/opt/ccs-deploy/alert.env"))
        return 0 if send(env, args[0], sys.stdin.read(), wait) else 1
    except Exception as e:  # an alert must never break the caller
        sys.stderr.write(f"alert failed: {e}\n")
        return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
