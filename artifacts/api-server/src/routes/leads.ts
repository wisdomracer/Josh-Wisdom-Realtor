import { Router, type IRouter } from "express";
import { db, leadsTable } from "@workspace/db";
import { CreateLeadBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/leads", async (req, res): Promise<void> => {
  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.issues });
    return;
  }

  const { name, email, phone, message, leadType, area, propertyAddress } =
    parsed.data;

  const [lead] = await db
    .insert(leadsTable)
    .values({
      name,
      email,
      phone: phone ?? null,
      message: message ?? null,
      leadType,
      area: area ?? null,
      propertyAddress: propertyAddress ?? null,
    })
    .returning();

  req.log.info({ leadId: lead.id, leadType: lead.leadType }, "lead captured");

  res.status(201).json({
    ...lead,
    createdAt: lead.createdAt.toISOString(),
  });
});

export default router;
