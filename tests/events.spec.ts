import { expect, test } from "@playwright/test";
import { eventsFixture, provideEventsFixture } from "./events-fixture";

test("events page loads current records and its filters are functional", async ({ page }) => {
  const requestCount = await provideEventsFixture(page);
  await page.goto("/the-woodlands-events", { waitUntil: "networkidle" });

  const image = page.locator('main img[src="/images/the-woodlands-pavilion-night.jpg"]');
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute("alt", "The Cynthia Woods Mitchell Pavilion illuminated blue during the Star-Spangled Salute");
  await expect(image).toHaveAttribute("width", "1920");
  await expect(image).toHaveAttribute("height", "1275");
  await expect(page.locator('main a[href="https://commons.wikimedia.org/wiki/File:Pavilion_Blue.jpg"]').filter({ visible: true })).toContainText("Ted Washington");
  await expect(page.locator('meta[property="og:image"][content="https://joshwisdomrealtor.com/images/the-woodlands-pavilion-night.jpg"]')).toHaveCount(1);
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

  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
  );
  expect(structuredData.primaryImageOfPage.contentUrl).toBe("https://joshwisdomrealtor.com/images/the-woodlands-pavilion-night.jpg");
  expect(structuredData.primaryImageOfPage.license).toBe("https://creativecommons.org/licenses/by-sa/4.0/");
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
