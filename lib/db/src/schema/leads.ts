import { pgTable, text, serial, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const leadTypeEnum = pgEnum("lead_type", [
  "general",
  "buying",
  "selling",
  "valuation",
  "relocation",
  "consultation",
  "luxury",
  "new_construction",
]);

export const leadsTable = pgTable("leads", {
  id: serial("id").primaryKey(),
  submissionId: text("submission_id").notNull().unique(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message"),
  leadType: leadTypeEnum("lead_type").notNull(),
  area: text("area"),
  propertyAddress: text("property_address"),
  landingPageUrl: text("landing_page_url"),
  currentPageUrl: text("current_page_url"),
  referrer: text("referrer"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmTerm: text("utm_term"),
  utmContent: text("utm_content"),
  gclid: text("gclid"),
  gbraid: text("gbraid"),
  wbraid: text("wbraid"),
  fbclid: text("fbclid"),
  deviceCategory: text("device_category"),
  firstTouchAt: timestamp("first_touch_at", { withTimezone: true }),
  submittedAt: timestamp("submitted_at", { withTimezone: true }).notNull(),
  notificationStatus: text("notification_status").notNull().default("pending"),
  notifiedAt: timestamp("notified_at", { withTimezone: true }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leadsTable, {
  email: z.string().email(),
  name: z.string().min(1),
});

export type Lead = typeof leadsTable.$inferSelect;
export type InsertLead = typeof leadsTable.$inferInsert;
