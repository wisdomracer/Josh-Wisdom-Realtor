import { Router, type IRouter } from "express";
import { eq, and, gte, lte, desc, count, sql } from "drizzle-orm";
import { db, propertiesTable } from "@workspace/db";
import { requireAuth } from "../middlewares/requireAuth";
import { getAuth } from "@clerk/express";
import {
  CreatePropertyBody,
  GetPropertyParams,
  UpdatePropertyBody,
  UpdatePropertyParams,
  DeletePropertyParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/properties/stats/summary", async (req, res): Promise<void> => {
  const [
    totalResult,
    foreclosuresResult,
    taxDelinquentResult,
    codeViolationsResult,
    activeResult,
    pendingResult,
    soldResult,
  ] = await Promise.all([
    db.select({ count: count() }).from(propertiesTable),
    db
      .select({ count: count() })
      .from(propertiesTable)
      .where(eq(propertiesTable.type, "foreclosure")),
    db
      .select({ count: count() })
      .from(propertiesTable)
      .where(eq(propertiesTable.type, "tax_delinquent")),
    db
      .select({ count: count() })
      .from(propertiesTable)
      .where(eq(propertiesTable.type, "code_violation")),
    db
      .select({ count: count() })
      .from(propertiesTable)
      .where(eq(propertiesTable.status, "active")),
    db
      .select({ count: count() })
      .from(propertiesTable)
      .where(eq(propertiesTable.status, "pending")),
    db
      .select({ count: count() })
      .from(propertiesTable)
      .where(eq(propertiesTable.status, "sold")),
  ]);

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const newThisWeekResult = await db
    .select({ count: count() })
    .from(propertiesTable)
    .where(gte(propertiesTable.createdAt, oneWeekAgo));

  res.json({
    total: Number(totalResult[0]?.count ?? 0),
    foreclosures: Number(foreclosuresResult[0]?.count ?? 0),
    taxDelinquent: Number(taxDelinquentResult[0]?.count ?? 0),
    codeViolations: Number(codeViolationsResult[0]?.count ?? 0),
    active: Number(activeResult[0]?.count ?? 0),
    pending: Number(pendingResult[0]?.count ?? 0),
    sold: Number(soldResult[0]?.count ?? 0),
    newThisWeek: Number(newThisWeekResult[0]?.count ?? 0),
  });
});

router.get("/properties/recent", async (_req, res): Promise<void> => {
  const properties = await db
    .select()
    .from(propertiesTable)
    .orderBy(desc(propertiesTable.createdAt))
    .limit(10);

  res.json(properties.map(formatProperty));
});

router.get("/properties", async (req, res): Promise<void> => {
  const { type, state, city, status, minPrice, maxPrice, page, limit } =
    req.query as Record<string, string>;

  const pageNum = parseInt(page ?? "1", 10);
  const limitNum = parseInt(limit ?? "20", 10);
  const offset = (pageNum - 1) * limitNum;

  const conditions = [];
  if (type) conditions.push(eq(propertiesTable.type, type as "foreclosure" | "tax_delinquent" | "code_violation"));
  if (state) conditions.push(eq(propertiesTable.state, state));
  if (city) conditions.push(eq(propertiesTable.city, city));
  if (status) conditions.push(eq(propertiesTable.status, status as "active" | "pending" | "sold" | "removed"));
  if (minPrice) conditions.push(gte(propertiesTable.price, minPrice));
  if (maxPrice) conditions.push(lte(propertiesTable.price, maxPrice));

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [properties, totalResult] = await Promise.all([
    db
      .select()
      .from(propertiesTable)
      .where(where)
      .orderBy(desc(propertiesTable.createdAt))
      .limit(limitNum)
      .offset(offset),
    db.select({ count: count() }).from(propertiesTable).where(where),
  ]);

  const total = Number(totalResult[0]?.count ?? 0);
  res.json({
    properties: properties.map(formatProperty),
    total,
    page: pageNum,
    limit: limitNum,
    totalPages: Math.ceil(total / limitNum),
  });
});

router.post("/properties", requireAuth, async (req, res): Promise<void> => {
  const parsed = CreatePropertyBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const auth = getAuth(req);
  const userId = auth?.userId;

  const [property] = await db
    .insert(propertiesTable)
    .values({
      ...parsed.data,
      postedByUserId: userId ?? undefined,
    })
    .returning();

  res.status(201).json(formatProperty(property!));
});

router.get("/properties/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw!, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const [property] = await db
    .select()
    .from(propertiesTable)
    .where(eq(propertiesTable.id, id));

  if (!property) {
    res.status(404).json({ error: "Property not found" });
    return;
  }

  res.json(formatProperty(property));
});

router.patch("/properties/:id", requireAuth, async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(rawId!, 10);

  const parsed = UpdatePropertyBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [property] = await db
    .update(propertiesTable)
    .set(parsed.data)
    .where(eq(propertiesTable.id, id))
    .returning();

  if (!property) {
    res.status(404).json({ error: "Property not found" });
    return;
  }

  res.json(formatProperty(property));
});

router.delete("/properties/:id", requireAuth, async (req, res): Promise<void> => {
  const rawId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(rawId!, 10);

  const [property] = await db
    .delete(propertiesTable)
    .where(eq(propertiesTable.id, id))
    .returning();

  if (!property) {
    res.status(404).json({ error: "Property not found" });
    return;
  }

  res.sendStatus(204);
});

function formatProperty(p: typeof propertiesTable.$inferSelect) {
  return {
    ...p,
    price: p.price != null ? Number(p.price) : null,
    estimatedValue: p.estimatedValue != null ? Number(p.estimatedValue) : null,
    baths: p.baths != null ? Number(p.baths) : null,
    lotSize: p.lotSize != null ? Number(p.lotSize) : null,
    taxAmount: p.taxAmount != null ? Number(p.taxAmount) : null,
    latitude: p.latitude != null ? Number(p.latitude) : null,
    longitude: p.longitude != null ? Number(p.longitude) : null,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

export default router;
