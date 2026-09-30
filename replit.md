# Local Connect

Local Connect helps Harrisonburg businesses find and respond to active donation and volunteer needs from local nonprofits.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/local-connect/src/App.tsx` — single-page board, filtering, cards, and modal flows
- `artifacts/local-connect/src/data/requests.ts` — local seed data for the Harrisonburg request feed
- `artifacts/local-connect/src/index.css` — app theme, responsive layout, and motion
- `artifacts/local-connect/.replit-artifact/artifact.toml` — artifact routing and preview configuration

## Architecture decisions

- The first version is intentionally frontend-only: requests are local seed data and contact actions go directly to nonprofit email and phone links.
- No authentication is required; the board is optimized for quick scanning and immediate coordination.
- The app is served at the root preview path so it opens directly as the primary product.

## Product

- Search active requests by nonprofit, title, or keywords.
- Filter by category, logistics, and same-day urgency.
- Open complete request details and contact nonprofits without an account.
- View clear empty states and responsive layouts on mobile and desktop.

## User preferences

No additional preferences recorded.

## Gotchas

- The app does not use the API server or database; update `src/data/requests.ts` for new board entries.
- Keep the artifact workflow running through `artifacts/local-connect: web` so `PORT` and `BASE_PATH` are supplied correctly.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
