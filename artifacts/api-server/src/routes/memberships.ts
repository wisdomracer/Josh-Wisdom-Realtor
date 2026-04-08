import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, membershipPlansTable, userMembershipsTable } from "@workspace/db";
import { requireAuth } from "../middlewares/requireAuth";
import { SubscribeToPlanBody } from "@workspace/api-zod";
import type { Request } from "express";

const router: IRouter = Router();

router.get("/memberships", async (_req, res): Promise<void> => {
  const plans = await db
    .select()
    .from(membershipPlansTable)
    .orderBy(membershipPlansTable.id);

  res.json(plans.map(formatPlan));
});

router.get("/memberships/my", requireAuth, async (req, res): Promise<void> => {
  const userId = (req as Request & { userId: string }).userId;

  const [membership] = await db
    .select()
    .from(userMembershipsTable)
    .where(eq(userMembershipsTable.userId, userId));

  if (!membership) {
    res.status(404).json({ error: "No active membership" });
    return;
  }

  const [plan] = await db
    .select()
    .from(membershipPlansTable)
    .where(eq(membershipPlansTable.id, membership.planId));

  if (!plan) {
    res.status(404).json({ error: "Plan not found" });
    return;
  }

  res.json(formatMembership(membership, plan));
});

router.post("/memberships/subscribe", requireAuth, async (req, res): Promise<void> => {
  const userId = (req as Request & { userId: string }).userId;

  const parsed = SubscribeToPlanBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { planId, billingCycle } = parsed.data;

  const [plan] = await db
    .select()
    .from(membershipPlansTable)
    .where(eq(membershipPlansTable.id, planId));

  if (!plan) {
    res.status(400).json({ error: "Plan not found" });
    return;
  }

  const expiresAt = new Date();
  if (billingCycle === "yearly") {
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);
  } else {
    expiresAt.setMonth(expiresAt.getMonth() + 1);
  }

  const [existing] = await db
    .select()
    .from(userMembershipsTable)
    .where(eq(userMembershipsTable.userId, userId));

  let membership;
  if (existing) {
    const [updated] = await db
      .update(userMembershipsTable)
      .set({ planId, billingCycle, status: "active", expiresAt, startedAt: new Date() })
      .where(eq(userMembershipsTable.userId, userId))
      .returning();
    membership = updated;
  } else {
    const [created] = await db
      .insert(userMembershipsTable)
      .values({ userId, planId, billingCycle, status: "active", expiresAt })
      .returning();
    membership = created;
  }

  res.status(201).json(formatMembership(membership!, plan));
});

function formatPlan(p: typeof membershipPlansTable.$inferSelect) {
  return {
    ...p,
    priceMonthly: Number(p.priceMonthly),
    priceYearly: p.priceYearly != null ? Number(p.priceYearly) : null,
    features: p.features ?? [],
  };
}

function formatMembership(
  m: typeof userMembershipsTable.$inferSelect,
  plan: typeof membershipPlansTable.$inferSelect,
) {
  return {
    ...m,
    plan: formatPlan(plan),
    startedAt: m.startedAt.toISOString(),
    expiresAt: m.expiresAt?.toISOString() ?? null,
    createdAt: m.createdAt.toISOString(),
  };
}

export default router;
