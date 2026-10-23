#!/usr/bin/env bash
# Probe the Figma MCP server from the shell.
#
# Usage:
#   figma-mcp.sh <tool> <json-args>
#   figma-mcp.sh get_metadata '{"fileKey":"cbE2B9pmg3rSWNuvT2qcfd"}'
#   figma-mcp.sh get_design_context '{"fileKey":"...","nodeId":"5:6"}'
#
# Remote server (https://mcp.figma.com/mcp) needs the OAuth token that
# opencode stores in ~/.local/share/opencode/mcp-auth.json. The desktop server
# (http://127.0.0.1:3845/mcp) needs no token but only works while a Figma
# design or FigJam file is the active tab.
set -euo pipefail

TOOL="${1:?usage: figma-mcp.sh <tool> <json-args>}"
ARGS="${2-}"
[ -z "$ARGS" ] && ARGS='{}'
AUTH_FILE="${FIGMA_MCP_AUTH:-$HOME/.local/share/opencode/mcp-auth.json}"

TOKEN=""
if [ -f "$AUTH_FILE" ]; then
  TOKEN=$(python3 -c 'import json,sys;print(json.load(open(sys.argv[1]))["figma"]["tokens"]["accessToken"])' "$AUTH_FILE" 2>/dev/null || true)
fi

if [ -n "$TOKEN" ]; then
  URL="https://mcp.figma.com/mcp"
  H=(-H "Authorization: Bearer $TOKEN")
else
  URL="http://127.0.0.1:3845/mcp"
  H=()
fi
H+=(-H "Content-Type: application/json" -H "Accept: application/json, text/event-stream")

curl -s "${H[@]}" -X POST "$URL" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"figma-mcp.sh","version":"1"}}}' >/dev/null
curl -s "${H[@]}" -X POST "$URL" -d '{"jsonrpc":"2.0","method":"notifications/initialized"}' >/dev/null

curl -s "${H[@]}" -X POST "$URL" \
  -d "{\"jsonrpc\":\"2.0\",\"id\":2,\"method\":\"tools/call\",\"params\":{\"name\":\"$TOOL\",\"arguments\":$ARGS}}" \
| python3 -c '
import sys, json, re
raw = sys.stdin.read()
m = re.search(r"data: (.*)", raw)
if not m:
    print(raw); sys.exit(0)
try:
    d = json.loads(m.group(1))
except Exception:
    print(raw); sys.exit(0)
r = d.get("result", d)
if isinstance(r, dict) and "content" in r:
    for c in r["content"]:
        print(c.get("text", ""))
    if r.get("isError"):
        sys.exit(1)
else:
    print(json.dumps(r, indent=2))
'
