import { expect, test } from "@playwright/test";
import { provideEventsFixture } from "./events-fixture";

test("events page loads current records and its filters are functional", async ({ page }) => {
  await provideEventsFixture(page);
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
});
