---
name: Codex protected connection files
description: Permanent read-only guardrails that prevent Codex from breaking the Replit environment or its MCP connection
---

Codex has broad workspace write access, so the files that control the package-manager environment and MCP connection must remain protected.

Codex must never modify:

- The root `package.json` `packageManager` field.
- Any file under `artifacts/api-server/src/mcp/`.
- `artifacts/api-server/src/routes/mcp.ts`.

These locations are read-only for Codex. This restriction applies even when diagnosing or fixing builds, dependency installation, routing, deployment, or MCP connectivity. If work appears to require a protected change, Codex must stop and ask the user to make it through Replit.
