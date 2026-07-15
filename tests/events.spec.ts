import { expect, test } from "@playwright/test";
import { eventsFixture, provideEventsFixture } from "./events-fixture";

test("events page loads current records and its filters are functional", async ({ page }) => {
  const requestCount = await provideEventsFixture(page);
  await page.goto("/the-woodlands-events", { waitUntil: "networkidle" });

  await expect(page.getByText("Connected to Visit The Woodlands", { exact: false })).toBeVisible();
  await expect(page.getByTestId("live-events-list").getByRole("link")).toHaveCount(2);
  await expect(page.getByRole("heading", { name: "Entwined Exhibition" })).toBeVisible();

  await page.getByRole("button", { name: "Today", exact: true }).click();
  await expect(page.getByTestId("live-events-list").getByRole("link")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Entwined Exhibition" })).toBeVisible();

  await page.getByRole("button", { name: "Pavilion", exact: true }).click();
  await expect(page.getByTestId("live-events-list").getByRole("link")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "Flatland Cavalry" })).toBeVisible();

  await page.getByRole("button", { name: "Refresh calendar" }).click();
  await expect.poll(requestCount).toBeGreaterThan(1);
});

test("stale calendar responses never display past events", async ({ page }) => {
  const today = eventsFixture.events[0].date;
  const past = new Date(`${today}T12:00:00Z`);
  past.setUTCDate(past.getUTCDate() - 1);
  await provideEventsFixture(page, {
    ...eventsFixture,
    stale: true,
    events: [
      { ...eventsFixture.events[0], id: "past-event", title: "Expired Event", date: past.toISOString().slice(0, 10) },
      eventsFixture.events[0],
    ],
  });

  await page.goto("/the-woodlands-events", { waitUntil: "networkidle" });
  await expect(page.getByText("Showing the last successful update", { exact: false })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Expired Event" })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Entwined Exhibition" })).toBeVisible();
});
