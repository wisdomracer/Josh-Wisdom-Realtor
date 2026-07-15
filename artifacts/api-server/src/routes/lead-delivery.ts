export const notificationLeaseMs = 15_000;
const maximumAttributionAgeMs = 365 * 24 * 60 * 60 * 1_000;
const maximumClockSkewMs = 5 * 60 * 1_000;

export function isNotificationLeaseExpired(
  status: string,
  attemptedAt: Date | null,
  now = Date.now(),
) {
  if (status !== "sending") return false;
  if (!attemptedAt) return true;
  return now - attemptedAt.valueOf() >= notificationLeaseMs;
}

export function normalizeFirstTouchAt(
  value: Date | null | undefined,
  receivedAt: Date,
) {
  if (!value || Number.isNaN(value.valueOf())) return null;

  const age = receivedAt.valueOf() - value.valueOf();
  if (age < -maximumClockSkewMs || age > maximumAttributionAgeMs) return null;
  return value;
}

export function isSameSubmission(
  existing: { name: string; email: string; leadType: string },
  incoming: { name: string; email: string; leadType: string },
) {
  return (
    existing.name === incoming.name &&
    existing.email === incoming.email &&
    existing.leadType === incoming.leadType
  );
}
