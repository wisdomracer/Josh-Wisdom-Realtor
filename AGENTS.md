# Permanent project guardrails

- Do not make mockups or placeholder previews and present them as the actual site.
- Only describe or preview the real app after verifying it is running from the real project.
- If preview access is blocked, say it is blocked and stop. Do not create a substitute unless the user explicitly requests a mockup.
- Close any PowerShell processes started by Codex when the task is complete. Do not leave background PowerShell sessions running.

## Protected connection and environment files

Codex must never modify any of the following, even to fix builds, dependencies, routing, deployment, or MCP connectivity:

- The root `package.json` `packageManager` field.
- Any file under `artifacts/api-server/src/mcp/`.
- `artifacts/api-server/src/routes/mcp.ts`.

Treat these paths as read-only. If a requested task appears to require changing one of them, stop and ask the user to make the change through Replit instead.
