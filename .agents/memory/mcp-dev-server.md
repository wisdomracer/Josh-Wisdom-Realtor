---
name: MCP dev file-edit server
description: Design + constraints of the dev-only /mcp endpoint that lets an external AI edit workspace files
---

A dev-only MCP (Model Context Protocol) server is folded into the existing
`api-server` artifact (not a new artifact) and exposed at the top-level `/mcp`
path (NOT under `/api`). It lets an external AI client (e.g. Codex) read/write
workspace files over the web.

**Why folded into api-server:** there is no generic Node artifact type in
`createArtifact`, and manually registering a new artifact's proxy paths is
risky. Reusing the already-registered api-server service/workflow and just
adding `/mcp` to its `artifact.toml` `paths` is far simpler and safer.

Key design points:
- Mounted in `app.ts` ONLY when `NODE_ENV !== "production"` so it never exists
  in the deployed app.
- Auth: bearer token from `MCP_AUTH_TOKEN` secret (constant-time SHA-256 +
  `timingSafeEqual`); 503 if unset, 401 on mismatch. Request the secret from
  the user so they choose it and reuse the same value in the client config.
- Mounted BEFORE the global `express.json()`; the mcp router has its own
  `express.json({ limit: "50mb" })` for large file payloads.
- Stateless transport: new `Server` + `StreamableHTTPServerTransport({
  sessionIdGenerator: undefined })` per POST, cleaned up on `res.close`.
- Client URL is `https://$REPLIT_DEV_DOMAIN/mcp`, only reachable while the
  workspace is running (dev domain is not a deployment).

**Path safety must be symlink-aware (critical).** `resolveSafe` does a lexical
`path.resolve` + prefix check to block `../` traversal, AND canonicalizes the
nearest existing ancestor with `fs.realpathSync`, verifying it stays under the
real workspace root. A lexical-only check is insufficient: an in-workspace
symlink pointing outside the tree would otherwise allow read/write escape on a
file-write-capable endpoint.
