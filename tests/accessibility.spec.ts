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
