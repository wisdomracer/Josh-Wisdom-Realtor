import { Router, type IRouter } from "express";
import { eq, and } from "drizzle-orm";
import {
  db,
  userProfilesTable,
  savedPropertiesTable,
  propertiesTable,
} from "@workspace/db";
import { requireAuth } from "../middlewares/requireAuth";
import { UpsertProfileBody } from "@workspace/api-zod";
import type { Request } from "express";

const router: IRouter = Router();

router.get("/users/profile", requireAuth, async (req, res): Promise<void> => {
  const userId = (req as Request & { userId: string }).userId;

  const [profile] = await db
    .select()
    .from(userProfilesTable)
    .where(eq(userProfilesTable.userId, userId));

  if (!profile) {
    res.status(404).json({ error: "Profile not found" });
    return;
  }

  res.json(formatProfile(profile));
});

router.post("/users/profile", requireAuth, async (req, res): Promise<void> => {
  const userId = (req as Request & { userId: string }).userId;

  const parsed = UpsertProfileBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [existing] = await db
    .select()
    .from(userProfilesTable)
    .where(eq(userProfilesTable.userId, userId));

  let profile;
  if (existing) {
    const [updated] = await db
      .update(userProfilesTable)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(userProfilesTable.userId, userId))
      .returning();
    profile = updated;
  } else {
    const [created] = await db
      .insert(userProfilesTable)
      .values({ ...parsed.data, userId })
      .returning();
    profile = created;
  }

  res.json(formatProfile(profile!));
});

router.get("/users/saved-properties", requireAuth, async (req, res): Promise<void> => {
  const userId = (req as Request & { userId: string }).userId;

  const savedRows = await db
    .select({ property: propertiesTable })
    .from(savedPropertiesTable)
    .innerJoin(
      propertiesTable,
      eq(savedPropertiesTable.propertyId, propertiesTable.id),
    )
    .where(eq(savedPropertiesTable.userId, userId));

  res.json(savedRows.map((r) => formatProperty(r.property)));
});

router.post("/users/saved-properties/:propertyId", requireAuth, async (req, res): Promise<void> => {
  const userId = (req as Request & { userId: string }).userId;
  const rawId = Array.isArray(req.params.propertyId)
    ? req.params.propertyId[0]
    : req.params.propertyId;
  const propertyId = parseInt(rawId!, 10);

  try {
    await db
      .insert(savedPropertiesTable)
      .values({ userId, propertyId })
      .onConflictDoNothing();
    res.json({ success: true });
  } catch {
    res.status(400).json({ error: "Could not save property" });
  }
});

router.delete("/users/saved-properties/:propertyId", requireAuth, async (req, res): Promise<void> => {
  const userId = (req as Request & { userId: string }).userId;
  const rawId = Array.isArray(req.params.propertyId)
    ? req.params.propertyId[0]
    : req.params.propertyId;
  const propertyId = parseInt(rawId!, 10);

  await db
    .delete(savedPropertiesTable)
    .where(
      and(
        eq(savedPropertiesTable.userId, userId),
        eq(savedPropertiesTable.propertyId, propertyId),
      ),
    );

  res.sendStatus(204);
});

function formatProfile(p: typeof userProfilesTable.$inferSelect) {
  return {
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

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
