import { expect, test, type Page } from "@playwright/test";
import { publicRoutes, retiredPlaceholderRoutes } from "../artifacts/propflow/src/config/routes";
import { absoluteUrl, emailHref, phoneHref, textHref } from "../artifacts/propflow/src/config/site";
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
  const homeHero = page.locator('main img[src="/images/the-woodlands-waterway-lifestyle.jpg"]');
  await expect(homeHero).toBeVisible();
  await expect(homeHero).toHaveAttribute("alt", "A great blue heron beside paddleboards on The Woodlands Waterway");
  await expect(homeHero).toHaveAttribute("width", "1920");
  await expect(homeHero).toHaveAttribute("height", "1280");
  await expect(page.locator('main a[href="https://commons.wikimedia.org/wiki/File:Great_Blue_Heron,_Woodlands_Waterway.jpg"]')).toContainText("Philcomanforterie");
  await expect(page.locator("main")).toHaveText(/Seller-first[\s\S]*Local focus[\s\S]*Private guidance/);

  await page.goto("/the-woodlands-listing-agent");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Private listing representation in The Woodlands.");
  await expect(page).toHaveTitle("The Woodlands Listing Agent | Josh Wisdom Realtor");
  await expect(page.locator("main")).not.toContainText("The Woodlands Listing Agent");
  const listingImage = page.locator('main img[src="/images/listing-representation-exterior.jpg"]');
  await expect(listingImage).toBeVisible();
  await expect(listingImage).toHaveAttribute("alt", "Contemporary residence with a private landscaped yard and mature trees");
  await expect(listingImage).toHaveAttribute("width", "1600");
  await expect(listingImage).toHaveAttribute("height", "1068");
  await expect(page.locator('main a[href="https://www.pexels.com/photo/modern-house-exterior-7587880/"]')).toContainText("Max Vakhtbovych");
  await expect(page.getByRole("link", { name: "View Seller Strategy" })).toHaveAttribute("href", "/sell");
  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
  );
  expect(structuredData["@graph"].map((entry: { "@type": string }) => entry["@type"]))
    .toEqual(["Service", "FAQPage"]);

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
  await expect(page.getByRole("button", { name: "Request Seller Consultation" })).toBeVisible();
  await expect(page.locator('a[href="#private-consultation"]')).toBeVisible();

  await page.goto("/the-woodlands-realtor");
  await expect(page.getByRole("heading", { name: "Questions to clarify early." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Build the shortlist before scheduling the tour." })).toBeVisible();
  await expect(page.getByLabel("Desired Area / Neighborhood")).toBeVisible();
  await expect(page.getByLabel("Property Address")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Request Local Consultation" })).toBeVisible();
  await expect(page.locator('a[href="#private-consultation"]')).toBeVisible();

  await page.goto("/the-woodlands-luxury-homes");
  await expect(page.getByRole("heading", { name: "Position the property before controlling the exposure." })).toBeVisible();
  await expect(page.getByLabel("Property Address")).toBeVisible();
  await expect(page.getByRole("button", { name: "Request Private Consultation" })).toBeVisible();
  await expect(page.locator('a[href="#private-consultation"]')).toBeVisible();
});

test("shared local landing pages keep the private brief and consultation on the page", async ({ page }) => {
  for (const [route, briefHeading, buttonName] of [
    ["/magnolia-realtor", "Build the shortlist before scheduling the tour.", "Request Local Consultation"],
    ["/communities/carlton-woods", "Position the property before controlling the exposure.", "Request Private Consultation"],
    ["/communities/east-shore", "Define the position before the market defines it for you.", "Request Private Valuation"],
  ] as const) {
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: briefHeading })).toBeVisible();
    await expect(page.locator('main a[href="#private-consultation"]')).toBeVisible();
    await expect(page.locator("#private-consultation form")).toBeVisible();
    await expect(page.getByRole("button", { name: buttonName })).toBeVisible();
    for (const href of route === "/magnolia-realtor"
      ? ["/communities", "/buy", "/relocation"]
      : ["/home-valuation", "/sell", "/luxury-homes"]) {
      await expect(page.locator(`main a[href="${href}"]`).first()).toBeVisible();
    }
  }
});

test("local landing pages use place-specific, attributed photography", async ({ page }) => {
  for (const [route, src, creditUrl] of [
    ["/communities/carlton-woods", "/images/luxury-architecture-dusk.jpg", "https://www.pexels.com/photo/exterior-of-a-modern-villa-13752348/"],
    ["/communities/east-shore", "/images/the-woodlands-waterway.jpg", "https://commons.wikimedia.org/wiki/File:The_Woodlands_Waterway_(5050352741).jpg"],
    ["/communities/creekside-park", "/images/creekside-wooded-residence.jpg", "https://www.pexels.com/photo/modern-suburban-home-surrounded-by-tall-trees-36777840/"],
    ["/magnolia-realtor", "/images/magnolia-historic-depot.jpg", "https://commons.wikimedia.org/wiki/File:Magnolia_Historic_Depot.jpg"],
    ["/spring-realtor", "/images/spring-old-town.jpg", "https://commons.wikimedia.org/wiki/File:Old_Town_Spring_Wiki_5.jpg"],
    ["/conroe-realtor", "/images/lake-conroe-sunset.jpg", "https://commons.wikimedia.org/wiki/File:Lake_Conroe_on_July_4th.jpg"],
  ] as const) {
    await page.goto(route);
    await expect(page.locator(`main img[src="${src}"]`)).toBeVisible();
    await expect(page.locator(`main a[href="${creditUrl}"]`)).toBeVisible();
  }
});

test("Insights index presents attributed editorial briefs instead of text-only cards", async ({ page }) => {
  await page.goto("/blog", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Read for the decision ahead.");
  const hero = page.locator('main img[src="/images/the-woodlands-waterway-lifestyle.jpg"]').first();
  await expect(hero).toBeVisible();
  await expect(hero).toHaveAttribute("width", "1920");
  await expect(page.locator('main a[href="https://commons.wikimedia.org/wiki/File:Great_Blue_Heron,_Woodlands_Waterway.jpg"]').first()).toBeVisible();
  await expect(page.locator('main img[src="/images/valuation-property-interior.jpg"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Useful before the conversation becomes urgent." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Useful guidance does not need manufactured authority." })).toBeVisible();
  for (const slug of [
    "how-to-price-a-home-in-the-woodlands",
    "what-carlton-woods-buyers-compare",
    "selling-near-the-woodlands-waterway",
    "creekside-park-seller-checklist",
  ]) {
    await expect(page.locator(`main a[href="/blog/${slug}"]`).first()).toBeVisible();
  }
  for (const href of ["/home-valuation", "/sell"]) {
    await expect(page.locator(`main a[href="${href}"]`).first()).toBeVisible();
  }
  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
  );
  expect(structuredData["@graph"].map((entry: { "@type": string }) => entry["@type"]))
    .toEqual(["CollectionPage", "ItemList"]);
  await expect(page.locator("main")).not.toContainText(/top producer|number one agent|guaranteed result|best realtor/i);
});

test("seller article provides a complete reading and consultation journey", async ({ page }) => {
  await page.goto("/blog/how-to-price-a-home-in-the-woodlands", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("How to price a Woodlands home without surrendering the strategy");
  await expect.poll(async () => (await page.locator("main article > header").boundingBox())?.height ?? 0).toBeGreaterThan(650);
  const image = page.locator('main img[src="/images/valuation-property-interior.jpg"]');
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute("width", "1920");
  await expect(image).toHaveAttribute("height", "1280");
  await expect(page.locator('main a[href="https://www.pexels.com/photo/luxury-modern-kitchen-and-living-room-interior-design-32025967/"]')).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Article sections" }).getByRole("link")).toHaveCount(4);
  await expect(page.getByRole("heading", { name: "Separate closed evidence from current pressure" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Continue with the property, service, or local context." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "The next useful brief." })).toBeVisible();
  for (const href of ["/home-valuation", "/sell", "/communities/the-woodlands", "/blog"]) {
    await expect(page.locator(`main a[href="${href}"]`).first()).toBeVisible();
  }
  await expect(page.locator("#article-consultation form")).toBeVisible();
  await expect(page.getByLabel("Property Address")).toBeVisible();
  await expect(page.getByRole("button", { name: "Request Seller Consultation" })).toBeVisible();
  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
  );
  expect(structuredData["@graph"].map((entry: { "@type": string }) => entry["@type"]))
    .toEqual(["Article", "BreadcrumbList"]);
  await expect(page.locator("main")).not.toContainText(/guaranteed price|guaranteed sale|number one agent|recent listing/i);
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

test("buyer service page presents a complete decision brief without implying a listing", async ({ page }) => {
  await page.goto("/buy", { waitUntil: "networkidle" });
  const image = page.locator('main img[src="/images/buyer-brief-interior.jpg"]');
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute("alt", "Spacious contemporary interior with a curved staircase");
  await expect(image).toHaveAttribute("width", "1600");
  await expect(image).toHaveAttribute("height", "1068");
  await expect(page.locator('main a[href="https://www.pexels.com/photo/interior-of-modern-house-with-staircase-5997959/"]')).toContainText("Max Vakhtbovych");
  await expect(page.locator("#buyer-consultation form")).toBeVisible();
  await expect(page.locator('main a[href="/communities/the-woodlands"]')).toBeVisible();
  await expect(page.locator("main")).not.toContainText(/our listing|recently sold|exclusive inventory/i);
});

test("relocation service page turns a broad move into a focused private brief", async ({ page }) => {
  await page.goto("/relocation", { waitUntil: "networkidle" });
  const image = page.locator('main img[src="/images/houston-skyline.jpg"]');
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute("alt", "The downtown Houston skyline viewed across Buffalo Bayou");
  await expect(image).toHaveAttribute("width", "1920");
  await expect(image).toHaveAttribute("height", "960");
  await expect(page.locator('main a[href="https://commons.wikimedia.org/wiki/File:Downtown_Houston,_TX_Skyline_-_2018.jpg"]')).toBeVisible();
  await expect(page.locator("#relocation-consultation form")).toBeVisible();
  await expect(page.locator('main a[href="/communities/greater-houston"]')).toBeVisible();
  await expect(page.locator("main")).not.toContainText(/guaranteed commute|best schools|perfect neighborhood/i);
});

test("community hub turns place names into a cautious regional comparison", async ({ page }) => {
  await page.goto("/communities", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { name: "Begin broad. Compare precisely." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Different markets answer different briefs." })).toBeVisible();
  await expect(page.getByRole("table")).toBeVisible();
  for (const href of [
    "/communities/the-woodlands",
    "/communities/tomball",
    "/communities/greater-houston",
    "/magnolia-realtor",
    "/spring-realtor",
    "/conroe-realtor",
    "/shenandoah-realtor",
    "/relocation",
    "/contact",
  ]) {
    await expect(page.locator(`main a[href="${href}"]`).first()).toBeVisible();
  }
  for (const src of [
    "/images/the-woodlands-waterway-lifestyle.jpg",
    "/images/tomball-griffin-house.jpg",
    "/images/houston-skyline.jpg",
  ]) {
    const image = page.locator(`main img[src="${src}"]`);
    await expect(image).toBeVisible();
    await expect(image).toHaveAttribute("width", "1920");
    await expect(image).toHaveAttribute("height", /\d+/);
  }
  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
  );
  expect(structuredData["@type"]).toBe("CollectionPage");
  expect(structuredData.mainEntity["@type"]).toBe("ItemList");
  expect(structuredData.mainEntity.itemListElement).toHaveLength(3);
  await expect(page.locator("main")).not.toContainText(/best neighborhood|top schools|guaranteed commute|perfect community/i);
});

test("Woodlands guide separates village references from real destination guides", async ({ page }) => {
  await page.goto("/communities/the-woodlands", { waitUntil: "networkidle" });
  const image = page.locator('main img[src="/images/the-woodlands-waterway-lifestyle.jpg"]');
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute("alt", "A great blue heron beside paddleboards on The Woodlands Waterway");
  await expect(image).toHaveAttribute("width", "1920");
  await expect(image).toHaveAttribute("height", "1280");
  await expect(page.locator('main a[href="https://commons.wikimedia.org/wiki/File:Great_Blue_Heron,_Woodlands_Waterway.jpg"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Some briefs sit outside a simple village comparison." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Confirm what the mailing address does not tell you." })).toBeVisible();
  for (const href of [
    "/communities/carlton-woods",
    "/communities/east-shore",
    "/communities/creekside-park",
    "/the-woodlands-events",
    "/relocation",
    "/buy",
    "/the-woodlands-listing-agent",
  ]) {
    await expect(page.locator(`main a[href="${href}"]`).first()).toBeVisible();
  }
  await expect(page.getByRole("link", { name: "Alden Bridge" })).toHaveCount(0);
  expect(await page.getByRole("heading", { name: "Town Center", exact: true }).evaluate((element) => element.closest("a"))).toBeNull();
  await expect(page.locator("#area-consultation form")).toBeVisible();
  await expect(page.getByLabel("Desired Area / Neighborhood")).toBeVisible();
  await expect(page.getByRole("button", { name: "Request Area Consultation" })).toBeVisible();
  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
  );
  expect(structuredData["@graph"].map((entry: { "@type": string }) => entry["@type"]))
    .toEqual(["WebPage", "FAQPage"]);
  await expect(page.locator("main")).not.toContainText(/guaranteed commute|perfect village|guaranteed appreciation/i);
});

test("Tomball guide distinguishes the mailing city from property-level ownership context", async ({ page }) => {
  await page.goto("/communities/tomball", { waitUntil: "networkidle" });
  const image = page.locator('main img[src="/images/tomball-griffin-house.jpg"]');
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute("alt", "The historic Griffin House beneath mature trees in Tomball, Texas");
  await expect(image).toHaveAttribute("width", "1920");
  await expect(image).toHaveAttribute("height", "1440");
  await expect(page.locator('main a[href="https://commons.wikimedia.org/wiki/File:Griffin_House_-_Flickr_-_pinemikey.jpg"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Confirm what “Tomball” does not answer." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "More space changes the inspection brief." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Distance is not the daily experience." })).toBeVisible();
  for (const href of [
    "/communities/the-woodlands",
    "/magnolia-realtor",
    "/spring-realtor",
    "/communities/greater-houston",
    "/home-valuation",
    "/sell",
  ]) {
    await expect(page.locator(`main a[href="${href}"]`).first()).toBeVisible();
  }
  await expect(page.locator("#tomball-consultation form")).toBeVisible();
  await expect(page.getByLabel("Desired Area / Neighborhood")).toBeVisible();
  await expect(page.getByRole("button", { name: "Request Tomball Consultation" })).toBeVisible();
  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
  );
  expect(structuredData["@graph"].map((entry: { "@type": string }) => entry["@type"]))
    .toEqual(["WebPage", "FAQPage"]);
  await expect(page.locator("main")).not.toContainText(/guaranteed commute|best acreage|guaranteed appreciation|perfect property/i);
});

test("Greater Houston guide turns a broad region into a property and route brief", async ({ page }) => {
  await page.goto("/communities/greater-houston", { waitUntil: "networkidle" });
  const image = page.locator('main img[src="/images/houston-skyline.jpg"]');
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute("alt", "The downtown Houston skyline viewed across Buffalo Bayou");
  await expect(image).toHaveAttribute("width", "1920");
  await expect(image).toHaveAttribute("height", "960");
  await expect(page.locator('main a[href="https://commons.wikimedia.org/wiki/File:Downtown_Houston,_TX_Skyline_-_2018.jpg"]')).toBeVisible();
  await expect(page.getByRole("heading", { name: "Narrow the region by consequences, not zip codes." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Different settings answer different briefs." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "The route begins at the front door." })).toBeVisible();
  await expect(page.getByRole("heading", { name: "The setting changes the diligence." })).toBeVisible();
  await expect(page.getByRole("table")).toBeVisible();
  for (const href of [
    "/communities/the-woodlands",
    "/communities/tomball",
    "/magnolia-realtor",
    "/spring-realtor",
    "/conroe-realtor",
    "/shenandoah-realtor",
    "/home-valuation",
    "/sell",
  ]) {
    await expect(page.locator(`main a[href="${href}"]`).first()).toBeVisible();
  }
  await expect(page.locator("#greater-houston-consultation form")).toBeVisible();
  await expect(page.getByLabel("Desired Area / Neighborhood")).toBeVisible();
  await expect(page.getByRole("button", { name: "Request Regional Consultation" })).toBeVisible();
  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
  );
  expect(structuredData["@graph"].map((entry: { "@type": string }) => entry["@type"]))
    .toEqual(["WebPage", "FAQPage"]);
  await expect(page.locator("main")).not.toContainText(/guaranteed commute|best suburb|top school|guaranteed appreciation|perfect community/i);
});

test("about page builds credibility from verifiable professional facts rather than fabricated proof", async ({ page }) => {
  await page.goto("/about", { waitUntil: "networkidle" });
  await expect(page.locator("main")).toContainText("VIP Realty");
  await expect(page.locator("main")).toContainText("The Woodlands & North Houston");
  await expect(page.locator(`main a[href="${phoneHref}"]`)).toBeVisible();
  for (const href of ["/sell", "/buy", "/luxury-homes", "/relocation"]) {
    await expect(page.locator(`main a[href="${href}"]`)).toBeVisible();
  }
  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
  );
  expect(structuredData["@type"]).toBe("RealEstateAgent");
  expect(structuredData.memberOf.name).toBe("VIP Realty");
  await expect(page.locator("main")).not.toContainText(/top producer|award-winning|years of experience|millions sold|number one agent/i);
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

test("private home value review distinguishes evidence from an automated estimate", async ({ page }) => {
  await page.goto("/home-valuation", { waitUntil: "networkidle" });
  const image = page.locator('main img[src="/images/valuation-property-interior.jpg"]');
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute("alt", "Contemporary open-plan kitchen, dining, and living interior");
  await expect(image).toHaveAttribute("width", "1920");
  await expect(image).toHaveAttribute("height", "1280");
  await expect(page.locator('main a[href="https://www.pexels.com/photo/luxury-modern-kitchen-and-living-room-interior-design-32025967/"]')).toContainText("Editorial interior");
  await expect(page.getByRole("heading", { name: "A number is not a launch strategy." })).toBeVisible();
  await expect(page.locator("#valuation-form form")).toBeVisible();
  await expect(page.locator('main a[href="/sell"]').first()).toBeVisible();
  await expect(page.locator("main")).toContainText("It is not a licensed appraisal");
  await expect(page.locator("main")).not.toContainText(/instant offer|guaranteed value|cash offer|our listing|recently sold/i);
  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
  );
  expect(structuredData["@graph"].map((entry: { "@type": string }) => entry["@type"]))
    .toEqual(["Service", "FAQPage"]);
});

test("mortgage estimator models a complete housing payment and resets example inputs", async ({ page }) => {
  await page.goto("/mortgage-estimate", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Estimate the payment. Then test the property.");

  const image = page.locator('main img[src="/images/buyer-brief-interior.jpg"]');
  await expect(image).toBeVisible();
  await expect(image).toHaveAttribute("width", "1600");
  await expect(image).toHaveAttribute("height", "1068");
  await expect(page.locator('main a[href="https://www.pexels.com/photo/interior-of-modern-house-with-staircase-5997959/"]')).toContainText("Max Vakhtbovych");

  for (const heading of [
    "Build the complete monthly picture.",
    "A payment estimate is only as good as the property inputs.",
    "Replace the scenario with the Loan Estimate.",
    "Bring the scenario back to the actual property.",
  ]) {
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  }

  await expect(page.getByRole("link", { name: /CFPB Loan Estimate Explainer/i })).toHaveAttribute("href", "https://www.consumerfinance.gov/owning-a-home/loan-estimate/");
  await expect(page.getByRole("link", { name: /Compare Loan Estimates with CFPB guidance/i })).toHaveAttribute("href", "https://www.consumerfinance.gov/owning-a-home/compare/compare-loan-estimates/");

  const inputs: Array<[string, string]> = [
    ["Purchase price", "500000"],
    ["Down payment", "100000"],
    ["Example interest rate", "0"],
    ["Loan term", "30"],
    ["Property tax rate", "0"],
    ["Annual homeowner insurance", "0"],
    ["Annual supplemental insurance", "0"],
    ["Monthly mortgage insurance", "0"],
    ["Monthly HOA or association dues", "0"],
    ["Other monthly assessments", "0"],
    ["Monthly ownership reserve", "0"],
    ["Estimated closing costs", "0"],
    ["Estimated prepaids and initial escrow", "0"],
    ["Credits and deposits already paid", "0"],
  ];
  for (const [label, value] of inputs) await page.getByLabel(label).fill(value);

  const results = page.getByRole("complementary", { name: "Mortgage estimate results" });
  await expect(results).toContainText("$1,111");
  await expect(results.getByText("$400,000", { exact: true })).toBeVisible();
  await expect(results.getByText("$100,000", { exact: true })).toBeVisible();

  await page.getByLabel("Monthly HOA or association dues").fill("200");
  await expect(results.getByText("$1,311", { exact: true }).first()).toBeVisible();

  await page.getByRole("button", { name: "Reset Example Inputs" }).click();
  await expect(page.getByLabel("Purchase price")).toHaveValue("750000");
  await expect(page.getByLabel("Example interest rate")).toHaveValue("6.5");

  await expect(page.locator("#payment-brief form")).toBeVisible();
  await expect(page.getByLabel("Property Address")).toBeVisible();
  await expect(page.getByLabel("Desired Area / Neighborhood")).toBeVisible();
  await expect(page.getByRole("button", { name: "Request Buyer Consultation" })).toBeVisible();

  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
  );
  expect(structuredData["@graph"].map((entry: { "@type": string }) => entry["@type"]))
    .toEqual(["WebApplication", "FAQPage"]);
  await expect(page.locator("main")).not.toContainText(/current mortgage rate|guaranteed approval|this is a lender quote/i);
});

test("phone and email actions use real protocols", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator(`a[href="${phoneHref}"]`).first()).toBeVisible();
  await expect(page.locator(`a[href="${emailHref}"]`).first()).toBeVisible();
});

test("contact page routes private conversations without turning the form into a seller-only intake", async ({ page }) => {
  await page.goto("/contact", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Begin with the property, the timing, and the decision.");
  await expect(page.locator(`main a[href="${phoneHref}"]`).first()).toBeVisible();
  await expect(page.locator(`main a[href="${emailHref}"]`).first()).toBeVisible();
  await expect(page.locator(`main a[href="${textHref}"]`).first()).toBeVisible();
  for (const href of ["/sell", "/buy", "/luxury-homes", "/relocation"]) {
    await expect(page.locator(`main a[href="${href}"]`)).toBeVisible();
  }
  await expect(page.locator("#private-consultation form")).toBeVisible();
  await expect(page.getByLabel("Phone Number")).toBeVisible();
  await expect(page.getByLabel("Phone Number *")).toHaveCount(0);
  await expect(page.locator("#private-consultation")).toContainText("Private inquiries are reviewed personally.");
  await expect(page.locator("#private-consultation")).not.toContainText("Private seller requests");
  const structuredData = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent()) ?? "{}",
  );
  expect(structuredData["@type"]).toBe("ContactPage");
  expect(structuredData.mainEntity["@type"]).toBe("RealEstateAgent");
  expect(structuredData.mainEntity.telephone).toBe("+18329818920");
});

test("mobile pages select responsive WebP photography with intrinsic dimensions", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const [route, expectedWidth] of [
    ["/", 1920],
    ["/buy", 1600],
    ["/sell", 1600],
    ["/luxury-homes", 1600],
    ["/relocation", 1920],
    ["/home-valuation", 1920],
    ["/communities", 1920],
    ["/communities/the-woodlands", 1920],
    ["/communities/tomball", 1920],
    ["/communities/greater-houston", 1920],
    ["/blog", 1920],
    ["/blog/how-to-price-a-home-in-the-woodlands", 1920],
    ["/magnolia-realtor", 1920],
    ["/mortgage-estimate", 1600],
    ["/the-woodlands-listing-agent", 1600],
    ["/communities/carlton-woods", 1600],
    ["/communities/east-shore", 1200],
    ["/communities/creekside-park", 1600],
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
