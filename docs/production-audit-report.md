# Production site audit — July 14, 2026

## Outcome

The production project was audited and upgraded on `codex/production-audit`. The work has not been deployed. The real Vite production build compiles and passed all 81 Playwright checks.

## Dead and misleading destinations removed

The navigation, footer, calls to action, and sitemap no longer advertise unfinished tools or empty destinations. These former routes now render an intentional `noindex` not-found page:

- `/featured-listings`
- `/recently-sold`
- `/map-search`
- `/property-alerts`
- `/affordability-calculator`
- `/seller-net-sheet`
- `/video-library`
- `/instagram-feed`
- `/google-reviews`
- `/newsletter`
- `/market-updates`
- the former `*-homes-for-sale` URLs that had no inventory

The useful neighborhood content was retained under honest community URLs for Carlton Woods, East Shore, and Creekside Park. A shared route manifest now drives the app and sitemap so future navigation and crawlable URLs stay aligned.

## Lead delivery

- Added server-side validation, normalization, bot trap, rate limiting, request timeout, and stable submission IDs.
- A lead is shown as successful only after both the database write and notification webhook succeed.
- Failed submissions preserve the visitor's data and safely retry with the same idempotency key.
- Concurrent notification attempts are atomically claimed to prevent duplicate delivery.
- Added first-touch campaign, referral, landing-page, device, and click-ID attribution.
- Added an idempotent PostgreSQL migration and deployment instructions.

## Automatically updated events

- Replaced the hard-coded June event arrays and misleading `AUTO` label with a real `/api/events` feed.
- Uses the official Visit The Woodlands RSS calendar and direct publisher URLs.
- Refreshes server-side every 15 minutes, deduplicates records, excludes expired dates, and serves the last successful cache if the publisher is temporarily unavailable.
- Refreshes in the browser every 15 minutes and when a visitor returns to the tab.
- Shows the last update time and honest live, cached, loading, and unavailable states.
- Added working All, Today, This Weekend, and Pavilion filters.

## Quality, SEO, and security

- Added route-level canonical, Open Graph, Twitter, and robots metadata.
- Generated `sitemap.xml` from the public route manifest and corrected the canonical domain.
- Added analytics events for page views, primary calls to action, phone/email clicks, form starts, errors, successes, and failures. GTM/GA IDs remain deployment configuration rather than invented values.
- Added a skip link, accessible status messages, contrast corrections, and mobile form-flow fixes.
- Replaced the runtime third-party hero image with a licensed local asset and documented attribution.
- Split production JavaScript into bounded route/vendor chunks; the largest chunk is approximately 344 KB uncompressed / 112 KB gzip.
- Added production CORS restrictions, payload limits, security headers, safe error responses, and removed the unused MCP file-access endpoint.
- Upgraded vulnerable authentication, database, proxy, and transitive dependencies. `pnpm audit --prod` reports zero known vulnerabilities.

## Verification performed

- `corepack pnpm install --frozen-lockfile`
- `corepack pnpm run build`
- `corepack pnpm audit --prod` — zero known vulnerabilities
- `corepack pnpm exec playwright test` — 81 passed

The browser suite validates all 32 declared public routes, all rendered same-origin links and anchors, canonical/social metadata, images, desktop/mobile navigation, retired-route behavior, 320–1920 px overflow, mobile form/footer flow, lead success and retry behavior, and serious/critical automated accessibility findings.

## Required before deployment

1. Configure `DATABASE_URL`, `LEAD_NOTIFICATION_WEBHOOK_URL`, and `NODE_ENV=production`.
2. Configure `VITE_GTM_ID` or `VITE_GA_MEASUREMENT_ID` if production analytics collection is wanted.
3. Run `corepack pnpm --filter @workspace/db migrate:leads` against the production database.
4. Deploy the web and API builds.
5. With Josh's approval, submit one real test inquiry and confirm the browser success state, database row, and notification receipt.

## Known deployment-level limitations

- The current SPA can render a useful `noindex` not-found page, but the hosting layer must be configured to return a true HTTP 404 for unknown URLs. Vite preview returns the SPA shell with HTTP 200.
- Notification delivery cannot be proven end-to-end without the production database and private webhook destination.
- Analytics events are implemented but will not leave the browser until a real GTM or GA4 identifier is configured.
- Event accuracy ultimately depends on the official Visit The Woodlands publisher feed; the page links every record back to that publisher for confirmation.
- Google Fonts remain an external runtime dependency; a strict Content Security Policy was not added because the final analytics and hosting origins are not yet known.
