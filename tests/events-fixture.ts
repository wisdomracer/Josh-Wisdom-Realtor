import type { Page } from "@playwright/test";

function centralDateKey(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function addDays(dateKey: string, days: number): string {
  const date = new Date(`${dateKey}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

const today = centralDateKey();

export const eventsFixture = {
  events: [
    {
      id: "https://www.visitthewoodlands.com/event/entwined-exhibition/2881/",
      title: "Entwined Exhibition",
      url: "https://www.visitthewoodlands.com/event/entwined-exhibition/2881/",
      date: today,
      categories: ["Arts & Culture"],
      summary: "A current exhibition from The Woodlands Arts Council.",
    },
    {
      id: "https://www.visitthewoodlands.com/event/flatland-cavalry/2915/",
      title: "Flatland Cavalry",
      url: "https://www.visitthewoodlands.com/event/flatland-cavalry/2915/",
      date: addDays(today, 4),
      categories: ["Pavilion Events", "Live Music & Nightlife"],
      summary: "A live Pavilion event.",
    },
  ],
  fetchedAt: new Date().toISOString(),
  expiresAt: Date.now() + 15 * 60 * 1000,
  source: "Visit The Woodlands",
};

export async function provideEventsFixture(page: Page, fixture: typeof eventsFixture & { stale?: boolean } = eventsFixture) {
  let requests = 0;
  await page.route("**/api/events", (route) => {
    requests += 1;
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(fixture) });
  });
  return () => requests;
}
