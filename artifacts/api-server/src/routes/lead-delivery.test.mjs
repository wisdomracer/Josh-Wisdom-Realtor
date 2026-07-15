import assert from "node:assert/strict";
import test from "node:test";
import {
  isNotificationLeaseExpired,
  isSameSubmission,
  normalizeFirstTouchAt,
  notificationLeaseMs,
} from "./lead-delivery.ts";

test("only an interrupted sending lease can expire", () => {
  const now = Date.UTC(2026, 6, 14, 12);

  assert.equal(isNotificationLeaseExpired("pending", null, now), false);
  assert.equal(isNotificationLeaseExpired("sending", null, now), true);
  assert.equal(
    isNotificationLeaseExpired(
      "sending",
      new Date(now - notificationLeaseMs + 1),
      now,
    ),
    false,
  );
  assert.equal(
    isNotificationLeaseExpired(
      "sending",
      new Date(now - notificationLeaseMs),
      now,
    ),
    true,
  );
});

test("first-touch attribution accepts plausible dates and discards poisoned dates", () => {
  const receivedAt = new Date("2026-07-14T12:00:00.000Z");
  const recent = new Date("2026-07-01T12:00:00.000Z");

  assert.equal(normalizeFirstTouchAt(recent, receivedAt), recent);
  assert.equal(
    normalizeFirstTouchAt(new Date("2027-07-14T12:00:00.000Z"), receivedAt),
    null,
  );
  assert.equal(
    normalizeFirstTouchAt(new Date("2024-07-14T12:00:00.000Z"), receivedAt),
    null,
  );
});

test("an idempotency key cannot be reused for a different person or request", () => {
  const original = {
    name: "Jordan Lee",
    email: "jordan@example.com",
    leadType: "selling",
  };

  assert.equal(isSameSubmission(original, { ...original }), true);
  assert.equal(
    isSameSubmission(original, { ...original, email: "other@example.com" }),
    false,
  );
  assert.equal(
    isSameSubmission(original, { ...original, leadType: "buying" }),
    false,
  );
});
