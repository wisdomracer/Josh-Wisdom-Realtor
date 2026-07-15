import { expect, test } from "@playwright/test";
import { provideEventsFixture } from "./events-fixture";

test("capture verified desktop homepage for visual QA", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.screenshot({ path: "output/visual/home-desktop.png", fullPage: true });
});

test("mobile homepage keeps the local hero, seller proof, and private valuation composed", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "Private real estate advisory." })).toBeVisible();
  const heroImage = page.locator('img[src="/images/homepage-wooded-residence.jpg"]');
  await expect(heroImage).toBeVisible();
  await expect(page.getByText("Seller-first", { exact: true })).toBeVisible();
  await expect(page.locator("main form")).toBeVisible();
  const imageBox = await heroImage.boundingBox();
  const proofBox = await page.locator("main section").nth(1).boundingBox();
  expect(imageBox).not.toBeNull();
  expect(proofBox).not.toBeNull();
  expect(imageBox!.y + imageBox!.height).toBeLessThanOrEqual(proofBox!.y + 1);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "output/visual/home-mobile.png", fullPage: true });
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
  ["/communities/carlton-woods", "carlton-woods-desktop.png"],
  ["/communities/east-shore", "east-shore-desktop.png"],
  ["/communities/creekside-park", "creekside-park-desktop.png"],
  ["/blog", "insights-desktop.png"],
  ["/blog/how-to-price-a-home-in-the-woodlands", "pricing-article-desktop.png"],
  ["/contact", "contact-desktop.png"],
  ["/home-valuation", "valuation-desktop.png"],
  ["/the-woodlands-listing-agent", "listing-agent-desktop.png"],
  ["/the-woodlands-realtor", "woodlands-realtor-desktop.png"],
  ["/the-woodlands-luxury-homes", "woodlands-luxury-desktop.png"],
  ["/magnolia-realtor", "magnolia-realtor-desktop.png"],
  ["/spring-realtor", "spring-realtor-desktop.png"],
  ["/conroe-realtor", "conroe-realtor-desktop.png"],
  ["/mortgage-estimate", "mortgage-estimate-desktop.png"],
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

test("mobile mortgage planning keeps the complete estimate and buyer brief composed", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/mortgage-estimate", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "Estimate the payment. Then test the property." })).toBeVisible();
  await expect(page.locator('img[src="/images/buyer-brief-interior.jpg"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Build the complete monthly picture." })).toBeVisible();
  await expect(page.getByRole("complementary", { name: "Mortgage estimate results" })).toBeVisible();
  await expect(page.locator("#payment-brief form")).toBeVisible();
  await expect(page.getByRole("button", { name: "Request Buyer Consultation" })).toBeVisible();
  const formBox = await page.locator("#payment-brief form").boundingBox();
  const footerBox = await page.locator("footer").boundingBox();
  expect(formBox).not.toBeNull();
  expect(footerBox).not.toBeNull();
  expect(formBox!.y + formBox!.height).toBeLessThanOrEqual(footerBox!.y);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "output/visual/mortgage-estimate-mobile.png", fullPage: true });
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

test("mobile events brief keeps the Pavilion hero and live calendar composed", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await provideEventsFixture(page);
  await page.goto("/the-woodlands-events", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "The local brief, automatically refreshed." })).toBeVisible();
  await expect(page.locator('img[src="/images/the-woodlands-pavilion-night.jpg"]')).toBeVisible();
  await expect(page.getByText("Connected to Visit The Woodlands", { exact: false })).toBeVisible();
  await expect(page.getByTestId("live-events-list")).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "output/visual/events-mobile.png", fullPage: true });
});

test("mobile communities hub keeps market imagery, comparison, and focused guides composed", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/communities", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator('img[src="/images/the-woodlands-waterway-lifestyle.jpg"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Different markets answer different briefs." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Continue the regional comparison." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Request an Area Consultation" })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "output/visual/communities-mobile.png", fullPage: true });
});

test("mobile Woodlands community guide keeps village context, diligence, and the area brief composed", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/communities/the-woodlands", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "The Woodlands" })).toBeVisible();
  await expect(page.locator('img[src="/images/the-woodlands-waterway-lifestyle.jpg"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Begin broad. Compare by section." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Confirm what the mailing address does not tell you." })).toBeVisible();
  await expect(page.locator("#area-consultation form")).toBeVisible();
  const formBox = await page.locator("#area-consultation form").boundingBox();
  const footerBox = await page.locator("footer").boundingBox();
  expect(formBox).not.toBeNull();
  expect(footerBox).not.toBeNull();
  expect(formBox!.y + formBox!.height).toBeLessThanOrEqual(footerBox!.y);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "output/visual/woodlands-community-mobile.png", fullPage: true });
});

test("mobile Tomball guide keeps property context, land diligence, and the area brief composed", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/communities/tomball", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "Tomball" })).toBeVisible();
  await expect(page.locator('img[src="/images/tomball-griffin-house.jpg"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "A Tomball search can begin in very different places." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Confirm what “Tomball” does not answer." })).toBeVisible();
  await expect(page.locator("#tomball-consultation form")).toBeVisible();
  const formBox = await page.locator("#tomball-consultation form").boundingBox();
  const footerBox = await page.locator("footer").boundingBox();
  expect(formBox).not.toBeNull();
  expect(footerBox).not.toBeNull();
  expect(formBox!.y + formBox!.height).toBeLessThanOrEqual(footerBox!.y);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "output/visual/tomball-mobile.png", fullPage: true });
});

test("mobile Greater Houston guide keeps regional comparison and consultation in one flow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/communities/greater-houston", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "Greater Houston" })).toBeVisible();
  await expect(page.locator('img[src="/images/houston-skyline.jpg"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Different settings answer different briefs." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "The route begins at the front door." })).toBeVisible();
  await expect(page.locator("#greater-houston-consultation form")).toBeVisible();
  const formBox = await page.locator("#greater-houston-consultation form").boundingBox();
  const footerBox = await page.locator("footer").boundingBox();
  expect(formBox).not.toBeNull();
  expect(footerBox).not.toBeNull();
  expect(formBox!.y + formBox!.height).toBeLessThanOrEqual(footerBox!.y);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "output/visual/greater-houston-mobile.png", fullPage: true });
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
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Private listing representation in The Woodlands.");
  await expect(page.getByRole("button", { name: "Request Seller Consultation" })).toBeVisible();
  await expect(page.getByRole("link", { name: "View Seller Strategy" })).toHaveAttribute("href", "/sell");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "output/visual/listing-agent-mobile.png", fullPage: true });
});

test("mobile Woodlands neighborhood guides keep distinct imagery and consultation composed", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [route, src, filename] of [
    ["/communities/carlton-woods", "/images/luxury-architecture-dusk.jpg", "carlton-woods-mobile.png"],
    ["/communities/east-shore", "/images/the-woodlands-waterway.jpg", "east-shore-mobile.png"],
    ["/communities/creekside-park", "/images/creekside-wooded-residence.jpg", "creekside-park-mobile.png"],
  ] as const) {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator(`img[src="${src}"]`)).toBeVisible();
    await expect(page.locator("#private-consultation form")).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${route} has horizontal overflow`).toBeLessThanOrEqual(1);
    await page.screenshot({ path: `output/visual/${filename}`, fullPage: true });
  }
});

test("mobile local advisory page keeps its decision brief and consultation in one flow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/magnolia-realtor", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "More land changes more than the view." })).toBeVisible();
  await expect(page.locator('img[src="/images/magnolia-historic-depot.jpg"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Build the shortlist before scheduling the tour." })).toBeVisible();
  await expect(page.locator("#private-consultation form")).toBeVisible();
  const formBox = await page.locator("#private-consultation form").boundingBox();
  const footerBox = await page.locator("footer").boundingBox();
  expect(formBox).not.toBeNull();
  expect(footerBox).not.toBeNull();
  expect(formBox!.y + formBox!.height).toBeLessThanOrEqual(footerBox!.y);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "output/visual/magnolia-realtor-mobile.png", fullPage: true });
});

test("mobile seller insight keeps article navigation, related decisions, and consultation composed", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/blog/how-to-price-a-home-in-the-woodlands", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "How to price a Woodlands home without surrendering the strategy" })).toBeVisible();
  await expect(page.locator('img[src="/images/valuation-property-interior.jpg"]')).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Article sections" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Continue with the property, service, or local context." })).toBeVisible();
  await expect(page.locator("#article-consultation form")).toBeVisible();
  const formBox = await page.locator("#article-consultation form").boundingBox();
  const footerBox = await page.locator("footer").boundingBox();
  expect(formBox).not.toBeNull();
  expect(footerBox).not.toBeNull();
  expect(formBox!.y + formBox!.height).toBeLessThanOrEqual(footerBox!.y);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await page.screenshot({ path: "output/visual/pricing-article-mobile.png", fullPage: true });
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
