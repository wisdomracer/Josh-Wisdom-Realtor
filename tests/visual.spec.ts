import { expect, test } from "@playwright/test";
import { provideEventsFixture } from "./events-fixture";

test("capture verified desktop homepage for visual QA", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.screenshot({ path: "output/visual/home-desktop.png", fullPage: true });
});

for (const [route, filename] of [
  ["/about", "about-desktop.png"],
  ["/buy", "buy-desktop.png"],
  ["/sell", "sell-desktop.png"],
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
  ["/the-woodlands-events", "events-desktop.png"],
] as const) {
  test(`capture verified ${route} page for visual QA`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    if (route === "/the-woodlands-events") await provideEventsFixture(page);
    await page.goto(route, { waitUntil: "networkidle" });
    await page.screenshot({ path: `output/visual/${filename}`, fullPage: true });
  });
}

test("mobile valuation flow keeps the complete form before the footer", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/home-valuation", { waitUntil: "networkidle" });
  await expect(page.locator('img[src="/images/valuation-property-interior.jpg"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "The details around the number matter." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "A number is not a launch strategy." })).toBeVisible();
  await expect(page.locator("form")).toBeVisible();
  const formBox = await page.locator("form").boundingBox();
  const footerBox = await page.locator("footer").boundingBox();
  expect(formBox).not.toBeNull();
  expect(footerBox).not.toBeNull();
  expect(formBox!.y + formBox!.height).toBeLessThanOrEqual(footerBox!.y);
  await page.screenshot({ path: "output/visual/valuation-mobile.png", fullPage: true });
});

test("mobile luxury journey keeps its editorial image and consultation in one composed flow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/luxury-homes", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator('img[src="/images/luxury-architecture-dusk.jpg"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Begin with the property and your priorities." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Request Private Consultation" }).last()).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "output/visual/luxury-mobile.png", fullPage: true });
});

test("mobile buyer journey keeps its decision brief and consultation in one composed flow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/buy", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator('img[src="/images/buyer-brief-interior.jpg"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Begin with the decision the property must solve." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Request Buyer Consultation" })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "output/visual/buy-mobile.png", fullPage: true });
});

test("mobile relocation journey keeps its move brief and consultation in one composed flow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/relocation", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator('img[src="/images/houston-skyline.jpg"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Begin with the week the move must support." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Request Relocation Consultation" })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "output/visual/relocation-mobile.png", fullPage: true });
});

test("mobile About journey keeps professional facts and representation paths composed", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/about", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Private real estate advisory." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Choose the conversation that matches the decision." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Request Consultation" })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "output/visual/about-mobile.png", fullPage: true });
});

test("mobile contact journey keeps direct access, advisory paths, and the full form in one flow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contact", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Choose how to begin." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Choose the conversation that matches the decision." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Request Consultation" })).toBeVisible();
  const formBox = await page.locator("#private-consultation form").boundingBox();
  const footerBox = await page.locator("footer").boundingBox();
  expect(formBox).not.toBeNull();
  expect(footerBox).not.toBeNull();
  expect(formBox!.y + formBox!.height).toBeLessThanOrEqual(footerBox!.y);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "output/visual/contact-mobile.png", fullPage: true });
});

test("mobile seller journey keeps its plan and consultation in one composed flow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/sell", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator('img[src="/images/seller-presentation-interior.jpg"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Discuss the property before deciding the next move." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Request Seller Consultation" })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "output/visual/sell-mobile.png", fullPage: true });
});

test("mobile Woodlands listing page keeps private representation and consultation in one flow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/the-woodlands-listing-agent", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Private seller representation in The Woodlands.");
  await expect(page.getByRole("button", { name: "Request Seller Consultation" })).toBeVisible();
  await expect(page.getByRole("link", { name: "View Seller Strategy" })).toHaveAttribute("href", "/sell");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "output/visual/listing-agent-mobile.png", fullPage: true });
});

test("confirmed valuation request presents a composed next step", async ({ page }) => {
  await page.route("**/api/leads", (route) => route.fulfill({
    status: 201,
    contentType: "application/json",
    body: JSON.stringify({ id: 1, notificationStatus: "sent", createdAt: new Date().toISOString() }),
  }));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/home-valuation", { waitUntil: "networkidle" });
  await page.getByLabel("Full Name *").fill("Test Visitor");
  await page.getByLabel("Email Address *").fill("visitor@example.com");
  await page.getByLabel("Phone Number *").fill("8325550100");
  await page.getByRole("button", { name: "Request Private Valuation" }).click();
  const confirmation = page.getByRole("status");
  await expect(page.getByRole("heading", { name: "Request received." })).toBeVisible();
  await expect.poll(async () => (await confirmation.boundingBox())?.width ?? 0).toBeGreaterThan(400);
  await page.screenshot({ path: "output/visual/valuation-confirmed-desktop.png", fullPage: true });
});
