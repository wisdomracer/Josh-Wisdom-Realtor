import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { publicRoutes } from "../artifacts/propflow/src/config/routes";
import { provideEventsFixture } from "./events-fixture";

for (const route of publicRoutes) {
  test(`${route} has no serious or critical automated accessibility violations`, async ({ page }) => {
    if (route === "/the-woodlands-events") await provideEventsFixture(page);
    await page.goto(route, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");
    expect(blocking, blocking.map((violation) => `${violation.id}: ${violation.help}`).join("\n")).toEqual([]);
  });
}

test("confirmed valuation state has no serious or critical automated accessibility violations", async ({ page }) => {
  await page.route("**/api/leads", (route) => route.fulfill({
    status: 201,
    contentType: "application/json",
    body: JSON.stringify({ id: 1, notificationStatus: "sent", createdAt: new Date().toISOString() }),
  }));
  await page.goto("/home-valuation", { waitUntil: "networkidle" });
  await page.getByLabel("Full Name *").fill("Test Visitor");
  await page.getByLabel("Email Address *").fill("visitor@example.com");
  await page.getByLabel("Phone Number *").fill("8325550100");
  await page.getByRole("button", { name: "Request Private Valuation" }).click();
  await expect(page.getByRole("heading", { name: "Request received." })).toBeVisible();
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");
  expect(blocking, blocking.map((violation) => `${violation.id}: ${violation.help}`).join("\n")).toEqual([]);
});
