# Reaching Figma from the shell and the agent

## The two servers

Both are configured in the **global** opencode config, `/Users/nobled/.config/opencode/opencode.jsonc`.
This repo has no project-level opencode config, so the settings live outside the repo.

```jsonc
"figma": {
  "type": "remote",
  "url": "https://mcp.figma.com/mcp",
  "enabled": true,
  "timeout": 60000,
  "oauth": { "scope": "mcp:connect", "redirectUri": "http://127.0.0.1:19876/callback" }
},
"figma-desktop": {
  "type": "remote",
  "url": "http://127.0.0.1:3845/mcp",
  "enabled": true,
  "timeout": 60000
}
```

`redirectUri` must end in exactly `/callback`. Figma's dynamic client registration rejects
`/mcp/oauth/callback` (opencode's default) with `invalid_redirect_uri`, and the
`opencode mcp auth figma` flow then hangs on "Starting OAuth flow".

The token lives in `~/.local/share/opencode/mcp-auth.json` (mode 600), under
`figma.tokens.accessToken` / `figma.tokens.refreshToken`. It is scoped `mcp:connect`
only, which means **the Figma REST API returns empty responses for this account** —
every read and write goes through MCP.

Opencode reads its config once at start-up. A new server appears in the session only
after a restart, so check `opencode mcp list` from a shell rather than expecting the
tool in the current session.

## Which server to use

| | `figma` (remote) | `figma-desktop` |
|---|---|---|
| Needs OAuth | yes | no |
| Needs the Figma app | no | yes, with the target file as the **active tab** |
| Reaches any file | yes, pass `fileKey` | only the open tab |
| Write tools | yes, needs a Full seat | no |
| Reads the whole file | yes | limited to the open file |

Prefer the remote server for anything that must be reproducible. Use the desktop server
only when you need the local app's state.

When the desktop server reports `Failed to get tools`, the active tab is not a design or
FigJam file. Open one with `open -a Figma "<design url>"`.

## Files

| File | fileKey |
|---|---|
| CCS Component Library | `cbE2B9pmg3rSWNuvT2qcfd` |
| 2026 MVP user stories | `efuChltynfWhqmgSd2jtG1` |

A Figma URL is `https://www.figma.com/:file_type/:file_key/:file_name?node-id=:id`.
The `t=` query parameter is an undocumented share-attribution token; ignore it. A `node-id`
uses hyphens in the URL (`node-id=1-2`) and colons in the API (`1:2`).

There is no query parameter that pins a file to the server. The file is chosen at
tool-call time by the `fileKey` argument.

## Calling a tool without an MCP client

`scripts/figma-mcp.sh` in this skill calls any tool over raw JSON-RPC, using the stored
OAuth token. It falls back to the desktop server when no token is present.

```bash
scripts/figma-mcp.sh whoami '{}'
scripts/figma-mcp.sh get_metadata '{"fileKey":"cbE2B9pmg3rSWNuvT2qcfd","nodeId":"5:6"}'
```

Responses arrive as Server-Sent Events, so the script extracts the `data:` line before
parsing JSON. Use it to check facts without spending a turn on the MCP client.

## Tools worth knowing

| Need | Tool |
|---|---|
| Page and node inventory | `get_metadata` (no `nodeId` gives the top-level page list) |
| Structure and styling of a node | `get_design_context` (load `figma-design-to-code` first) |
| Look at a node | `get_screenshot` (PNG only, one node per call) |
| Read variables | `get_variable_defs` |
| Edit the file | `use_figma` (load `figma-use` first — mandatory) |
| Find library components | `search_design_system` (remote only) |
| Account and seat | `whoami` |

## Rate limits

The account `dean.noble@unimelb.edu.au` holds a **Full seat on The University of Melbourne
(Organization tier)**, so the MCP budget is **200 calls a day and 15 a minute**, plus a
20-a-month allowance on the View seat of the personal starter team.

Rate-limited calls are the ones that read data. `whoami`, `create_new_file` and
`add_code_connect_map` are exempt. Batch work: one script that loops every page beats
one call per page, and a `use_figma` script that throws leaves nothing behind.

## Gotchas

- `get_metadata` on a page returns the page's immediate children, not the whole tree.
- `get_metadata` without a `nodeId` returns the file's top-level pages; an invalid
  `nodeId` returns an error whose body lists the valid pages.
- `use_figma` cannot edit a library file. Read it with `get_metadata`, copy what is needed
  into the CCS file, then edit the copy.
- Thumbnails from `get_screenshot` can be stale immediately after an edit. Use
  `node.screenshot()` inside `use_figma` to confirm.
