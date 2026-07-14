ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "submission_id" text;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "landing_page_url" text;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "current_page_url" text;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "referrer" text;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "utm_source" text;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "utm_medium" text;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "utm_campaign" text;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "utm_term" text;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "utm_content" text;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "gclid" text;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "gbraid" text;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "wbraid" text;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "fbclid" text;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "device_category" text;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "first_touch_at" timestamptz;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "submitted_at" timestamptz;
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "notification_status" text DEFAULT 'pending';
ALTER TABLE "leads" ADD COLUMN IF NOT EXISTS "notified_at" timestamptz;

UPDATE "leads" SET "submission_id" = 'legacy-' || "id"::text WHERE "submission_id" IS NULL;
UPDATE "leads" SET "submitted_at" = "created_at" AT TIME ZONE 'UTC' WHERE "submitted_at" IS NULL;
UPDATE "leads" SET "notification_status" = 'pending' WHERE "notification_status" IS NULL;

ALTER TABLE "leads" ALTER COLUMN "submission_id" SET NOT NULL;
ALTER TABLE "leads" ALTER COLUMN "submitted_at" SET NOT NULL;
ALTER TABLE "leads" ALTER COLUMN "notification_status" SET DEFAULT 'pending';
ALTER TABLE "leads" ALTER COLUMN "notification_status" SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS "leads_submission_id_unique" ON "leads" ("submission_id");
