import { pgTable, text, serial, timestamp, integer, unique } from "drizzle-orm/pg-core";

export const savedPropertiesTable = pgTable(
  "saved_properties",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    propertyId: integer("property_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [unique().on(t.userId, t.propertyId)],
);

export type SavedProperty = typeof savedPropertiesTable.$inferSelect;
