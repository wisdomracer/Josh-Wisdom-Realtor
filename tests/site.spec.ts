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
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary");
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

test("every rendered internal link points to a declared public route or a real section", async ({ page }) => {
  const discovered = new Map<string, Set<string>>();

  for (const route of publicRoutes) {
    await page.goto(route, { waitUntil: "domcontentloaded" });
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

test("phone and email actions use real protocols", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator(`a[href="${phoneHref}"]`).first()).toBeVisible();
  await expect(page.locator(`a[href="${emailHref}"]`).first()).toBeVisible();
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
