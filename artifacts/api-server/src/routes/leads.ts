import { Router, type IRouter } from "express";
import { and, eq, isNull } from "drizzle-orm";
import { db, leadsTable } from "@workspace/db";
import { CreateLeadBody } from "@workspace/api-zod";
import {
  isNotificationLeaseExpired,
  isSameSubmission,
  normalizeFirstTouchAt,
} from "./lead-delivery";

const router: IRouter = Router();
const sellerLeadTypes = new Set([
  "selling",
  "valuation",
  "consultation",
  "luxury",
]);
const rateLimitWindowMs = 10 * 60 * 1000;
const maxRequestsPerWindow = 5;
const requestTimes = new Map<string, number[]>();

function trim(value: string | null | undefined, maxLength: number) {
  const normalized = value?.trim().slice(0, maxLength);
  return normalized || null;
}

function isRateLimited(key: string) {
  if (requestTimes.size > 10_000) requestTimes.clear();
  const cutoff = Date.now() - rateLimitWindowMs;
  const recent = (requestTimes.get(key) ?? []).filter(
    (timestamp) => timestamp > cutoff,
  );
  recent.push(Date.now());
  requestTimes.set(key, recent);
  return recent.length > maxRequestsPerWindow;
}

async function loadLead(id: number) {
  const [lead] = await db
    .select()
    .from(leadsTable)
    .where(eq(leadsTable.id, id))
    .limit(1);
  return lead;
}

async function waitForConcurrentDelivery(lead: typeof leadsTable.$inferSelect) {
  let latest = lead;
  for (
    let attempt = 0;
    attempt < 4 && latest.notificationStatus === "sending";
    attempt += 1
  ) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    latest = (await loadLead(lead.id)) ?? latest;
  }
  return latest;
}

async function notifyJosh(lead: typeof leadsTable.$inferSelect) {
  const webhookUrl = process.env.LEAD_NOTIFICATION_WEBHOOK_URL;

  if (!webhookUrl) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("LEAD_NOTIFICATION_WEBHOOK_URL is not configured");
    }
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      event: "new_real_estate_lead",
      lead: {
        id: lead.id,
        submissionId: lead.submissionId,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        message: lead.message,
        leadType: lead.leadType,
        area: lead.area,
        propertyAddress: lead.propertyAddress,
        landingPageUrl: lead.landingPageUrl,
        currentPageUrl: lead.currentPageUrl,
        referrer: lead.referrer,
        utmSource: lead.utmSource,
        utmMedium: lead.utmMedium,
        utmCampaign: lead.utmCampaign,
        utmTerm: lead.utmTerm,
        utmContent: lead.utmContent,
        gclid: lead.gclid,
        gbraid: lead.gbraid,
        wbraid: lead.wbraid,
        fbclid: lead.fbclid,
        deviceCategory: lead.deviceCategory,
        firstTouchAt: lead.firstTouchAt?.toISOString() ?? null,
        submittedAt: lead.submittedAt.toISOString(),
      },
    }),
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    throw new Error(`Lead notification failed with HTTP ${response.status}`);
  }
}

router.post("/leads", async (req, res): Promise<void> => {
  const parsed = CreateLeadBody.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ error: "Invalid input", details: parsed.error.issues });
    return;
  }

  if (parsed.data.company?.trim()) {
    req.log.warn(
      { submissionId: parsed.data.submissionId },
      "lead rejected by honeypot",
    );
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  const name = trim(parsed.data.name, 120);
  const email = trim(parsed.data.email, 254)?.toLowerCase();
  const phone = trim(parsed.data.phone, 40);
  const phoneDigits = phone?.replace(/\D/g, "") ?? "";

  if (
    !name ||
    name.length < 2 ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    res
      .status(400)
      .json({ error: "Name and a valid email address are required." });
    return;
  }

  if (sellerLeadTypes.has(parsed.data.leadType) && phoneDigits.length < 10) {
    res
      .status(400)
      .json({ error: "A valid phone number is required for seller requests." });
    return;
  }

  const receivedAt = new Date();
  const firstTouchAt = normalizeFirstTouchAt(
    parsed.data.firstTouchAt,
    receivedAt,
  );

  let [lead] = await db
    .select()
    .from(leadsTable)
    .where(eq(leadsTable.submissionId, parsed.data.submissionId))
    .limit(1);

  if (
    lead &&
    !isSameSubmission(lead, { name, email, leadType: parsed.data.leadType })
  ) {
    req.log.warn(
      { submissionId: parsed.data.submissionId },
      "lead idempotency key reused with different data",
    );
    res
      .status(409)
      .json({ error: "This submission identifier has already been used." });
    return;
  }

  // A retry for a lead already saved in PostgreSQL must always be allowed to
  // finish delivery. Only genuinely new inquiries consume the abuse budget.
  if (!lead) {
    const clientKey = req.ip || req.socket.remoteAddress || "unknown";
    if (isRateLimited(clientKey)) {
      res.setHeader("Retry-After", Math.ceil(rateLimitWindowMs / 1000));
      res
        .status(429)
        .json({ error: "Too many requests. Please wait before trying again." });
      return;
    }
  }

  const [inserted] = await db
    .insert(leadsTable)
    .values({
      submissionId: parsed.data.submissionId,
      name,
      email,
      phone,
      message: trim(parsed.data.message, 4_000),
      leadType: parsed.data.leadType,
      area: trim(parsed.data.area, 200),
      propertyAddress: trim(parsed.data.propertyAddress, 300),
      landingPageUrl: trim(parsed.data.landingPageUrl, 2_000),
      currentPageUrl: trim(parsed.data.currentPageUrl, 2_000),
      referrer: trim(parsed.data.referrer, 2_000),
      utmSource: trim(parsed.data.utmSource, 300),
      utmMedium: trim(parsed.data.utmMedium, 300),
      utmCampaign: trim(parsed.data.utmCampaign, 300),
      utmTerm: trim(parsed.data.utmTerm, 300),
      utmContent: trim(parsed.data.utmContent, 300),
      gclid: trim(parsed.data.gclid, 500),
      gbraid: trim(parsed.data.gbraid, 500),
      wbraid: trim(parsed.data.wbraid, 500),
      fbclid: trim(parsed.data.fbclid, 500),
      deviceCategory: parsed.data.deviceCategory ?? null,
      firstTouchAt,
      submittedAt: receivedAt,
    })
    .onConflictDoNothing({ target: leadsTable.submissionId })
    .returning();

  if (inserted) {
    lead = inserted;
  } else if (!lead) {
    [lead] = await db
      .select()
      .from(leadsTable)
      .where(eq(leadsTable.submissionId, parsed.data.submissionId))
      .limit(1);
  }

  if (!lead) {
    throw new Error("Lead could not be loaded after persistence");
  }

  if (
    !isSameSubmission(lead, { name, email, leadType: parsed.data.leadType })
  ) {
    req.log.warn(
      { submissionId: parsed.data.submissionId },
      "concurrent lead idempotency conflict",
    );
    res
      .status(409)
      .json({ error: "This submission identifier has already been used." });
    return;
  }

  if (lead.notificationStatus !== "sent") {
    if (
      lead.notificationStatus === "sending" &&
      !isNotificationLeaseExpired(lead.notificationStatus, lead.notifiedAt)
    ) {
      lead = await waitForConcurrentDelivery(lead);
      if (lead.notificationStatus === "sent") {
        req.log.info(
          { leadId: lead.id, leadType: lead.leadType },
          "concurrent lead delivery completed",
        );
      } else if (
        !isNotificationLeaseExpired(lead.notificationStatus, lead.notifiedAt)
      ) {
        res
          .status(409)
          .json({
            error:
              "This request is still being delivered. Please retry in a moment.",
          });
        return;
      }
    }

    if (lead.notificationStatus !== "sent") {
      const attemptStartedAt = new Date();
      const ownershipCondition =
        lead.notificationStatus === "sending"
          ? lead.notifiedAt
            ? eq(leadsTable.notifiedAt, lead.notifiedAt)
            : isNull(leadsTable.notifiedAt)
          : eq(leadsTable.notificationStatus, lead.notificationStatus);

      const [claimedLead] = await db
        .update(leadsTable)
        .set({ notificationStatus: "sending", notifiedAt: attemptStartedAt })
        .where(
          and(
            eq(leadsTable.id, lead.id),
            eq(leadsTable.notificationStatus, lead.notificationStatus),
            ownershipCondition,
          ),
        )
        .returning();

      if (!claimedLead) {
        const concurrentLead = await waitForConcurrentDelivery(lead);

        if (concurrentLead.notificationStatus !== "sent") {
          res
            .status(409)
            .json({
              error:
                "This request is still being delivered. Please retry in a moment.",
            });
          return;
        }
        Object.assign(lead, concurrentLead);
      } else {
        Object.assign(lead, claimedLead);
        try {
          await notifyJosh(lead);
          const [notifiedLead] = await db
            .update(leadsTable)
            .set({ notificationStatus: "sent", notifiedAt: new Date() })
            .where(
              and(
                eq(leadsTable.id, lead.id),
                eq(leadsTable.notificationStatus, "sending"),
                eq(leadsTable.notifiedAt, attemptStartedAt),
              ),
            )
            .returning();
          if (!notifiedLead)
            throw new Error(
              "Lead notification lease was lost before confirmation",
            );
          Object.assign(lead, notifiedLead);
        } catch (error) {
          await db
            .update(leadsTable)
            .set({ notificationStatus: "failed", notifiedAt: null })
            .where(
              and(
                eq(leadsTable.id, lead.id),
                eq(leadsTable.notificationStatus, "sending"),
                eq(leadsTable.notifiedAt, attemptStartedAt),
              ),
            );
          req.log.error(
            { err: error, leadId: lead.id },
            "lead persisted but notification failed",
          );
          res
            .status(503)
            .json({
              error:
                "Your request was saved, but delivery is delayed. Please retry or call Josh directly.",
            });
          return;
        }
      }
    }
  }

  req.log.info(
    { leadId: lead.id, leadType: lead.leadType },
    "lead persisted and notified",
  );
  res.status(201).json({
    submissionId: lead.submissionId,
    notificationStatus: lead.notificationStatus,
    notifiedAt: lead.notifiedAt?.toISOString() ?? null,
    receivedAt: lead.submittedAt.toISOString(),
  });
});

export default router;
