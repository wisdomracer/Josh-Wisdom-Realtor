# Workspace

## Overview

pnpm workspace monorepo using TypeScript. The main app is **Josh Wisdom — Realtor** marketing and lead-generation website serving The Woodlands, Tomball, and Greater Houston. It is SEO-first, presentation-first, fully public (no authentication), and captures real leads via a contact/valuation form. Strict compliance: no fabricated listings, reviews, awards, or MLS data; fair-housing-neutral copy; placeholder contact details until the client provides real ones.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite (artifacts/propflow), Tailwind CSS v4, Wouter routing, react-helmet-async for SEO meta

## Artifacts

- **propflow** (react-vite) — Main public realtor web app at `/`
- **api-server** — Express backend at `/api` (also hosts the dev-only MCP server at `/mcp`)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Database Schema

- **leads** — contact / home-valuation form submissions (name, email, phone, message, and context fields)

## Features

- SEO-optimized public marketing pages (home, about, service areas, buyers, sellers, valuation, contact, etc.)
- Lead capture form → `POST /api/leads` (via generated `useCreateLead` hook)
- Structured data (JSON-LD), robots.txt, sitemap.xml for search visibility
- No authentication — the entire site is public

## MCP Dev Server (development only)

The api-server hosts a Model Context Protocol server at `/mcp` so an external AI client (e.g. Codex) can read/write workspace files over the web.

- **Dev-only**: mounted only when `NODE_ENV !== "production"`; never exists in the deployed app.
- **Auth**: bearer token from the `MCP_AUTH_TOKEN` secret. Use the same value in the client config.
- **URL**: `https://$REPLIT_DEV_DOMAIN/mcp` — reachable only while the workspace is running.
- **Tools**: list_directory, read_file, write_file, create_directory, delete_path, move_path, search_files.
- **Safety**: path resolution is symlink-aware and confined to the workspace root.

## User preferences

- Prefers a self-hosted in-Repl MCP server for external AI file editing over GitHub sync.

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
