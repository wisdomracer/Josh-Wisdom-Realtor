import {
  pgTable,
  text,
  serial,
  timestamp,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const membershipStatusEnum = pgEnum("membership_status", [
  "active",
  "cancelled",
  "expired",
]);

export const billingCycleEnum = pgEnum("billing_cycle", [
  "monthly",
  "yearly",
]);

export const userMembershipsTable = pgTable("user_memberships", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  planId: integer("plan_id").notNull(),
  status: membershipStatusEnum("status").notNull().default("active"),
  billingCycle: billingCycleEnum("billing_cycle").notNull(),
  startedAt: timestamp("started_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const insertUserMembershipSchema = createInsertSchema(
  userMembershipsTable,
).omit({ id: true, createdAt: true });
export type InsertUserMembership = z.infer<typeof insertUserMembershipSchema>;
export type UserMembership = typeof userMembershipsTable.$inferSelect;
