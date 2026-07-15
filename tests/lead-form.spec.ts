import { expect, test } from "@playwright/test";

const lead = {
  name: "Test Visitor",
  email: "visitor@example.com",
  phone: "8325550100",
  address: "1 Test Lane, The Woodlands, TX",
};

async function fillValuationForm(page: import("@playwright/test").Page) {
  await page.getByLabel("Full Name *").fill(lead.name);
  await page.getByLabel("Email Address *").fill(lead.email);
  await page.getByLabel("Phone Number *").fill(lead.phone);
  await page.getByLabel("Property Address").fill(lead.address);
}

test("lead form reports success only after a confirmed API response", async ({ page }) => {
  let requestBody: Record<string, unknown> | undefined;
  await page.route("**/api/leads", async (route) => {
    requestBody = route.request().postDataJSON();
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ id: 1, ...requestBody, notificationStatus: "sent", createdAt: new Date().toISOString() }),
    });
  });

  await page.goto("/home-valuation?utm_source=playwright&utm_campaign=form-test&gclid=test-click");
  await fillValuationForm(page);
  await page.getByRole("button", { name: "Request Private Valuation" }).click();

  await expect(page.getByRole("heading", { name: "Request received." })).toBeVisible();
  await expect(page.getByRole("status")).toBeFocused();
  await expect(page.getByRole("link", { name: "Call Josh", exact: true })).toHaveAttribute("href", "tel:+18329818920");
  await expect(page.getByRole("link", { name: "Text Josh", exact: true })).toHaveAttribute("href", "sms:+18329818920");
  expect(await page.evaluate(() => window.dataLayer?.filter((record) => record.event === "lead_submission_success"))).toContainEqual(expect.objectContaining({
    lead_type: "valuation",
    path: "/home-valuation",
  }));
  await page.evaluate(() => document.addEventListener("click", (event) => event.preventDefault(), true));
  await page.getByRole("link", { name: "Text Josh", exact: true }).click();
  expect(await page.evaluate(() => window.dataLayer?.filter((record) => record.event === "click_sms"))).toContainEqual(expect.objectContaining({
    path: "/home-valuation",
    placement: "main",
  }));
  expect(requestBody).toMatchObject({
    name: lead.name,
    email: lead.email,
    phone: "(832) 555-0100",
    propertyAddress: lead.address,
    leadType: "valuation",
    utmSource: "playwright",
    utmCampaign: "form-test",
    gclid: "test-click",
    company: null,
    deviceCategory: "desktop",
  });
  expect(requestBody?.submissionId).toMatch(/^[0-9a-f-]{36}$/i);
  expect(requestBody?.submittedAt).toEqual(expect.any(String));
});

test("lead form preserves data and reuses its idempotency key after delivery failure", async ({ page }) => {
  const bodies: Array<Record<string, unknown>> = [];
  let attempts = 0;
  await page.route("**/api/leads", async (route) => {
    bodies.push(route.request().postDataJSON());
    attempts += 1;
    await route.fulfill(attempts === 1
      ? { status: 503, contentType: "application/json", body: JSON.stringify({ error: "Delivery delayed" }) }
      : { status: 201, contentType: "application/json", body: JSON.stringify({ id: 1, notificationStatus: "sent", createdAt: new Date().toISOString() }) });
  });

  await page.goto("/home-valuation");
  await fillValuationForm(page);
  const submit = page.getByRole("button", { name: "Request Private Valuation" });
  await submit.click();

  await expect(page.getByRole("status")).toContainText("Not confirmed");
  await expect(page.getByLabel("Full Name *")).toHaveValue(lead.name);
  await submit.click();
  await expect(page.getByRole("heading", { name: "Request received." })).toBeVisible();
  expect(bodies).toHaveLength(2);
  expect(bodies[1].submissionId).toBe(bodies[0].submissionId);
});

test("seller validation blocks incomplete requests before the API call", async ({ page }) => {
  let requests = 0;
  await page.route("**/api/leads", async (route) => {
    requests += 1;
    await route.abort();
  });

  await page.goto("/home-valuation");
  await page.getByRole("button", { name: "Request Private Valuation" }).click();
  await expect(page.getByText("Name is required")).toBeVisible();
  await expect(page.getByText("Invalid email address")).toBeVisible();
  await expect(page.getByText("Phone number is required for private seller consultations")).toBeVisible();
  expect(requests).toBe(0);
});
