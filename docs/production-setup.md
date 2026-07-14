# Production setup

The lead endpoint does not acknowledge a new inquiry until the database write and notification webhook both succeed.

Required deployment secrets:

- `DATABASE_URL`: PostgreSQL connection string.
- `LEAD_NOTIFICATION_WEBHOOK_URL`: private HTTPS endpoint that immediately delivers the `new_real_estate_lead` JSON payload to Josh's monitored CRM, email, or SMS automation.
- `NODE_ENV=production`: enables strict notification and origin behavior.
- `CORS_ORIGINS`: optional comma-separated additional production origins.
- `VITE_GTM_ID`: optional Google Tag Manager container ID. If GTM is not used, configure `VITE_GA_MEASUREMENT_ID` with the production GA4 measurement ID instead. Never deploy the example value.

Before deploying the API schema change, run:

```sh
corepack pnpm --filter @workspace/db migrate:leads
```

The migration is transactional and idempotent. It preserves existing leads, adds stable submission IDs and attribution fields, and backfills required timestamps.

After deployment, submit a real test lead with Josh's approval and verify all three records: the browser success state, the PostgreSQL row with `notification_status = 'sent'`, and receipt in the monitored destination. Do not treat a browser-only test as proof of delivery.
