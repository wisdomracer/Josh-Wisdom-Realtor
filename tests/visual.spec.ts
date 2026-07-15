import { expect, test } from "@playwright/test";

test("capture verified desktop homepage for visual QA", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.screenshot({ path: "output/visual/home-desktop.png", fullPage: true });
});

for (const [route, filename] of [
  ["/about", "about-desktop.png"],
  ["/buy", "buy-desktop.png"],
  ["/luxury-homes", "luxury-desktop.png"],
  ["/relocation", "relocation-desktop.png"],
  ["/communities", "communities-desktop.png"],
  ["/communities/the-woodlands", "woodlands-desktop.png"],
  ["/communities/tomball", "tomball-desktop.png"],
  ["/communities/greater-houston", "greater-houston-desktop.png"],
  ["/contact", "contact-desktop.png"],
  ["/home-valuation", "valuation-desktop.png"],
  ["/the-woodlands-listing-agent", "listing-agent-desktop.png"],
  ["/the-woodlands-realtor", "woodlands-realtor-desktop.png"],
  ["/the-woodlands-luxury-homes", "woodlands-luxury-desktop.png"],
  ["/spring-realtor", "spring-realtor-desktop.png"],
  ["/conroe-realtor", "conroe-realtor-desktop.png"],
] as const) {
  test(`capture verified ${route} page for visual QA`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(route, { waitUntil: "networkidle" });
    await page.screenshot({ path: `output/visual/${filename}`, fullPage: true });
  });
}

test("mobile valuation flow keeps the complete form before the footer", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/home-valuation", { waitUntil: "networkidle" });
  await expect(page.locator("form")).toBeVisible();
  const formBox = await page.locator("form").boundingBox();
  const footerBox = await page.locator("footer").boundingBox();
  expect(formBox).not.toBeNull();
  expect(footerBox).not.toBeNull();
  expect(formBox!.y + formBox!.height).toBeLessThanOrEqual(footerBox!.y);
  await page.screenshot({ path: "output/visual/valuation-mobile.png", fullPage: true });
});
