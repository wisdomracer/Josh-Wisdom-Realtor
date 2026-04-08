# Workspace

## Overview

pnpm workspace monorepo using TypeScript. PropFlow — a property intelligence platform similar to PropStream, with membership plans, and listings for foreclosures, tax-delinquent, and code violation properties.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Auth**: Clerk (whitelabel)
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite (artifacts/propflow), Tailwind CSS, Wouter routing

## Artifacts

- **propflow** (react-vite) — Main web app at `/`
- **api-server** — Express backend at `/api`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

## Database Schema

- **properties** — foreclosure, tax_delinquent, code_violation listings with full address, financial, and type-specific fields
- **membership_plans** — Basic ($29.99), Pro ($79.99), Elite ($179.99) plans with feature gates
- **user_memberships** — user-to-plan subscriptions with billing cycle and expiry
- **user_profiles** — user profile data including role (user | admin)
- **saved_properties** — user bookmarks / saved property listings

## Features

- Public landing page with value proposition and CTAs
- Clerk authentication (sign in / sign up)
- Dashboard with property stats and recent listings
- Filterable property search (by type, status, city, state, price)
- Property detail page with type-specific info
- Membership plan selection and subscription
- Saved/bookmarked properties
- Admin tools for creating/editing listings (role-gated)
- User profile management

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
