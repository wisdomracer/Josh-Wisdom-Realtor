import {
  pgTable,
  text,
  serial,
  timestamp,
  integer,
  numeric,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const propertyTypeEnum = pgEnum("property_type", [
  "foreclosure",
  "tax_delinquent",
  "code_violation",
]);

export const propertyStatusEnum = pgEnum("property_status", [
  "active",
  "pending",
  "sold",
  "removed",
]);

export const propertiesTable = pgTable("properties", {
  id: serial("id").primaryKey(),
  type: propertyTypeEnum("type").notNull(),
  status: propertyStatusEnum("status").notNull().default("active"),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),
  county: text("county"),
  price: numeric("price", { precision: 12, scale: 2 }),
  estimatedValue: numeric("estimated_value", { precision: 12, scale: 2 }),
  beds: integer("beds"),
  baths: numeric("baths", { precision: 4, scale: 1 }),
  sqft: integer("sqft"),
  yearBuilt: integer("year_built"),
  lotSize: numeric("lot_size", { precision: 10, scale: 2 }),
  description: text("description"),
  imageUrl: text("image_url"),
  auctionDate: text("auction_date"),
  taxAmount: numeric("tax_amount", { precision: 12, scale: 2 }),
  violationCode: text("violation_code"),
  violationDescription: text("violation_description"),
  latitude: numeric("latitude", { precision: 10, scale: 7 }),
  longitude: numeric("longitude", { precision: 10, scale: 7 }),
  postedByUserId: text("posted_by_user_id"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const insertPropertySchema = createInsertSchema(propertiesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof propertiesTable.$inferSelect;
