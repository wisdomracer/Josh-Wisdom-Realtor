import { expect, test, type Page } from "@playwright/test";
import { publicRoutes, retiredPlaceholderRoutes } from "../artifacts/propflow/src/config/routes";
import { absoluteUrl, emailHref, phoneHref } from "../artifacts/propflow/src/config/site";
import { provideEventsFixture } from "./events-fixture";

function watchPageErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("response", (response) => {
    const url = new URL(response.url());
    if (["127.0.0.1", "localhost"].includes(url.hostname) && response.status() >= 400) {
      errors.push(`response: ${response.status()} ${url.pathname}`);
    }
  });
  page.on("requestfailed", (request) => {
    const url = new URL(request.url());
    if (["127.0.0.1", "localhost"].includes(url.hostname)) errors.push(`requestfailed: ${url.pathname}`);
  });
  return errors;
}

for (const route of publicRoutes) {
  test(`${route} renders as a complete, canonical page`, async ({ page }) => {
    if (route === "/the-woodlands-events") await provideEventsFixture(page);
    const errors = watchPageErrors(page);
    const response = await page.goto(route, { waitUntil: "networkidle" });

    expect(response?.status()).toBe(200);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("title")).toHaveCount(1);
    expect((await page.title()).trim()).not.toBe("");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", absoluteUrl(route));
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", absoluteUrl(route));
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", absoluteUrl("/og-image.png"));
    await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute("content", "1200");
    await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute("content", "630");
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute("content", /Josh Wisdom Realtor/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", absoluteUrl("/og-image.png"));
    await expect(page.locator("[data-static-social]")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /page not found/i })).toHaveCount(0);

    const emptySections = await page.locator("main section").evaluateAll((sections) =>
      sections.filter((section) => !(section.textContent ?? "").trim() && !section.querySelector("img, video, form")).length,
    );
    expect(emptySections).toBe(0);

    const unnamedButtons = await page.getByRole("button").evaluateAll((buttons) =>
      buttons.filter((button) => !(button.getAttribute("aria-label") || button.textContent || "").trim()).length,
    );
    expect(unnamedButtons).toBe(0);
    const bodyText = await page.locator("body").innerText();
    expect(bodyText).not.toMatch(/`n|Â|â€|Ã|�/);
    expect(bodyText).not.toMatch(/IDX-ready|once (?:approved )?.*is connected|coming soon|placeholder/i);
    const brokenImages = await page.locator("img").evaluateAll((images) => images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.getAttribute("src")));
    expect(brokenImages).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("raw entrypoint provides a complete social preview to non-JavaScript crawlers", async ({ request }) => {
  const response = await request.get("/");
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain('<meta data-static-social property="og:image" content="https://joshwisdomrealtor.com/og-image.png"');
  expect(html).toContain('<meta data-static-social name="twitter:card" content="summary_large_image"');
  expect(html).toContain("Private Real Estate Advisory");

  const image = await request.get("/og-image.png");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  expect((await image.body()).byteLength).toBeGreaterThan(100_000);
});

test("every rendered internal link points to a declared public route or a real section", async ({ page }) => {
  await provideEventsFixture(page);
  const discovered = new Map<string, Set<string>>();

  for (const route of publicRoutes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toBeVisible();
    const hrefs = await page.locator("a[href]").evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.getAttribute("href") ?? ""),
    );

    for (const href of hrefs) {
      expect(href, `${route} contains an empty or placeholder link`).not.toMatch(/^$|^#$|^javascript:/i);
      const url = new URL(href, page.url());
      if (url.origin !== new URL(page.url()).origin) continue;

      const path = url.pathname.replace(/\/$/, "") || "/";
      if (url.hash) {
        const targetId = decodeURIComponent(url.hash.slice(1)).replaceAll('"', '\\"');
        const target = page.locator(`[id="${targetId}"]`);
        if (path === route) await expect(target, `${route} links to missing section ${href}`).toHaveCount(1);
      }

      if (!discovered.has(path)) discovered.set(path, new Set());
      discovered.get(path)?.add(route);
    }
  }

  const declared = new Set<string>(publicRoutes);
  const missing = [...discovered].filter(([path]) => !declared.has(path));
  expect(missing, `Undeclared internal links: ${missing.map(([path, sources]) => `${path} from ${[...sources].join(", ")}`).join("; ")}`).toEqual([]);
});

test("mobile lead forms remain in document flow before the footer", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of publicRoutes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const forms = page.locator("main form");
    if (await forms.count() === 0) continue;
    const footerBox = await page.locator("footer").boundingBox();
    expect(footerBox, `${route} footer must be rendered`).not.toBeNull();
    for (const form of await forms.all()) {
      const formBox = await form.boundingBox();
      expect(formBox, `${route} form must be rendered`).not.toBeNull();
      expect(formBox!.y + formBox!.height, `${route} form is overlapped by the footer`).toBeLessThanOrEqual(footerBox!.y);
    }
  }
});

test("desktop and mobile primary navigation work", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Sell" }).click();
  await expect(page).toHaveURL(/\/sell$/);

  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "Home Value" }).click();
  await expect(page).toHaveURL(/\/home-valuation$/);
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
});

test("luxury-facing brand language preserves listing-agent SEO", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Private real estate advisory.");
  await expect(page.locator("main")).toContainText("The Woodlands");

  await page.goto("/the-woodlands-listing-agent");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Private seller representation in The Woodlands.");
  await expect(page).toHaveTitle("The Woodlands Listing Agent | Josh Wisdom Realtor");

  for (const [route, heading] of [
    ["/about", "Clear judgment. Considered execution. Direct guidance."],
    ["/buy", "Buy with a clear brief, not more noise."],
    ["/luxury-homes", "Exceptional homes require disciplined representation."],
    ["/relocation", "Choose the area around the life you will live."],
    ["/communities", "The address is only the beginning of the comparison."],
    ["/contact", "Begin with the property, the timing, and the decision."],
    ["/home-valuation", "Know the position before choosing the price."],
  ] as const) {
    await page.goto(route);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);
  }

  await page.goto("/about");
  await expect(page.locator("main")).not.toContainText("trusted neighbor");
  await expect(page.locator("main")).not.toContainText("long-time resident");
});

test("premium service pages remain composed on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const route of ["/about", "/buy", "/sell", "/luxury-homes", "/relocation", "/communities", "/communities/the-woodlands", "/communities/tomball", "/communities/greater-houston", "/contact", "/home-valuation"]) {
    await page.goto(route);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `${route} has horizontal overflow`).toBeLessThanOrEqual(1);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  }
});

test("SEO landing pages use intent-aware consultation funnels", async ({ page }) => {
  await page.goto("/the-woodlands-listing-agent");
  await expect(page.getByRole("heading", { name: "Questions sellers ask." })).toBeVisible();
  await expect(page.getByLabel("Property Address")).toBeVisible();
  await expect(page.getByLabel("Desired Area / Neighborhood")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Request Private Valuation" })).toBeVisible();

  await page.goto("/the-woodlands-realtor");
  await expect(page.getByRole("heading", { name: "Questions to clarify early." })).toBeVisible();
  await expect(page.getByLabel("Desired Area / Neighborhood")).toBeVisible();
  await expect(page.getByLabel("Property Address")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Request Local Consultation" })).toBeVisible();

  await page.goto("/the-woodlands-luxury-homes");
  await expect(page.getByLabel("Property Address")).toBeVisible();
  await expect(page.getByRole("button", { name: "Request Private Consultation" })).toBeVisible();
});

test("local landing pages use place-specific, attributed photography", async ({ page }) => {
  for (const [route, src, creditUrl] of [
    ["/magnolia-realtor", "/images/magnolia-historic-depot.jpg", "https://commons.wikimedia.org/wiki/File:Magnolia_Historic_Depot.jpg"],
    ["/spring-realtor", "/images/spring-old-town.jpg", "https://commons.wikimedia.org/wiki/File:Old_Town_Spring_Wiki_5.jpg"],
    ["/conroe-realtor", "/images/lake-conroe-sunset.jpg", "https://commons.wikimedia.org/wiki/File:Lake_Conroe_on_July_4th.jpg"],
  ] as const) {
    await page.goto(route);
    await expect(page.locator(`main img[src="${src}"]`)).toBeVisible();
    await expect(page.locator(`main a[href="${creditUrl}"]`)).toBeVisible();
  }
});

test("luxury service page uses licensed editorial architecture without implying a listing", async ({ page }) => {
  await page.goto("/luxury-homes", { waitUntil: "networkidle" });
  const image = page.locator('main img[src="/images/luxury-architecture-dusk.jpg"]');
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute("alt", "Contemporary residence illuminated at dusk");
  await expect(image).toHaveAttribute("width", "1600");
  await expect(image).toHaveAttribute("height", "1067");
  await expect(page.locator('main a[href="https://www.pexels.com/photo/exterior-of-a-modern-villa-13752348/"]')).toContainText("Editorial architecture");
  await expect(page.locator("main")).not.toContainText(/our listing|recently sold/i);
});

test("seller service page presents a complete pre-market plan without fabricated proof", async ({ page }) => {
  await page.goto("/sell", { waitUntil: "networkidle" });
  const image = page.locator('main img[src="/images/seller-presentation-interior.jpg"]');
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute("alt", "Prepared contemporary living and dining space");
  await expect(image).toHaveAttribute("width", "1600");
  await expect(image).toHaveAttribute("height", "1067");
  await expect(page.locator('main a[href="https://www.pexels.com/photo/elegant-living-room-interior-5883721/"]')).toContainText("Editorial interior");
  await expect(page.locator("#seller-consultation form")).toBeVisible();
  await expect(page.locator('main a[href="/blog/how-to-price-a-home-in-the-woodlands"]')).toBeVisible();
  await expect(page.locator("main")).not.toContainText(/our listing|recently sold|number one agent/i);
});

test("phone and email actions use real protocols", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator(`a[href="${phoneHref}"]`).first()).toBeVisible();
  await expect(page.locator(`a[href="${emailHref}"]`).first()).toBeVisible();
});

test("mobile pages select responsive WebP photography with intrinsic dimensions", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const [route, expectedWidth] of [
    ["/", 1200],
    ["/sell", 1600],
    ["/luxury-homes", 1600],
    ["/relocation", 1920],
    ["/communities/the-woodlands", 1920],
    ["/magnolia-realtor", 1920],
  ] as const) {
    await page.goto(route, { waitUntil: "networkidle" });
    const image = page.locator("main picture img").first();
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("width", String(expectedWidth));
    await expect(image).toHaveAttribute("height", /\d+/);
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).currentSrc)).toMatch(/-\d+\.webp$/);
  }
});

test("retired placeholder routes are not rendered as tools", async ({ page }) => {
  for (const route of retiredPlaceholderRoutes) {
    await page.goto(route);
    await expect(page.getByRole("heading", { name: /page not found/i })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
  }
});

for (const viewport of [
  { width: 320, height: 700 },
  { width: 375, height: 812 },
  { width: 430, height: 932 },
  { width: 768, height: 1024 },
  { width: 1366, height: 768 },
  { width: 1920, height: 1080 },
]) {
  test(`homepage has no horizontal overflow at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
}
