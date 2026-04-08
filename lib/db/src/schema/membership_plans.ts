import {
  pgTable,
  text,
  serial,
  timestamp,
  integer,
  numeric,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const membershipPlansTable = pgTable("membership_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  priceMonthly: numeric("price_monthly", { precision: 8, scale: 2 }).notNull(),
  priceYearly: numeric("price_yearly", { precision: 8, scale: 2 }),
  features: text("features").array().notNull().default([]),
  maxSearches: integer("max_searches"),
  maxSavedProperties: integer("max_saved_properties"),
  hasForeclosures: boolean("has_foreclosures").notNull().default(false),
  hasTaxDelinquent: boolean("has_tax_delinquent").notNull().default(false),
  hasCodeViolations: boolean("has_code_violations").notNull().default(false),
  isPopular: boolean("is_popular").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertMembershipPlanSchema = createInsertSchema(
  membershipPlansTable,
).omit({ id: true, createdAt: true });
export type InsertMembershipPlan = z.infer<typeof insertMembershipPlanSchema>;
export type MembershipPlan = typeof membershipPlansTable.$inferSelect;
