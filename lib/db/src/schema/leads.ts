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
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message"),
  leadType: leadTypeEnum("lead_type").notNull(),
  area: text("area"),
  propertyAddress: text("property_address"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertLeadSchema = createInsertSchema(leadsTable, {
  email: z.string().email(),
  name: z.string().min(1),
});

export type Lead = typeof leadsTable.$inferSelect;
export type InsertLead = typeof leadsTable.$inferInsert;
