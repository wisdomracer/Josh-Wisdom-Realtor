import { expect, test } from "@playwright/test";
import { provideEventsFixture } from "./events-fixture";

type AnalyticsRecord = Record<string, unknown>;

async function resetAnalytics(page: import("@playwright/test").Page) {
  await page.evaluate(() => { window.dataLayer = []; });
}

async function analyticsEvents(page: import("@playwright/test").Page, event: string) {
  return page.evaluate((name) => (window.dataLayer ?? []).filter((record) => record.event === name), event) as Promise<AnalyticsRecord[]>;
}

test("consultation links are tracked automatically with destination and placement", async ({ page }) => {
  await page.goto("/about");
  await resetAnalytics(page);
  await page.getByRole("link", { name: "Request a Private Consultation" }).click();
  await expect(page).toHaveURL(/\/contact$/);

  expect(await analyticsEvents(page, "click_primary_cta")).toContainEqual(expect.objectContaining({
    path: "/about",
    destination: "/contact",
    label: "Request a Private Consultation",
    placement: "main",
  }));
});

test("phone, email, SMS, and outbound resources use privacy-conscious analytics", async ({ page }) => {
  await provideEventsFixture(page);
  await page.goto("/the-woodlands-events");
  await page.evaluate(() => document.addEventListener("click", (event) => event.preventDefault(), true));
  await resetAnalytics(page);

  await page.getByRole("link", { name: "Visit The Woodlands Events" }).click();
  expect(await analyticsEvents(page, "click_outbound_resource")).toContainEqual(expect.objectContaining({
    path: "/the-woodlands-events",
    destination_host: "www.visitthewoodlands.com",
    placement: "main",
  }));

  await page.locator('a[href^="tel:"]').first().click();
  await page.locator('a[href^="mailto:"]').first().click();
  expect(await analyticsEvents(page, "click_phone")).toContainEqual(expect.objectContaining({ path: "/the-woodlands-events" }));
  expect(await analyticsEvents(page, "click_email")).toContainEqual(expect.objectContaining({ path: "/the-woodlands-events" }));
});
