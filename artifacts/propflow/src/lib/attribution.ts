const storageKey = "jwr_first_touch_attribution";

export type LeadAttribution = {
  landingPageUrl: string | null;
  currentPageUrl: string | null;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmTerm: string | null;
  utmContent: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  fbclid: string | null;
  firstTouchAt: string | null;
  deviceCategory: "mobile" | "tablet" | "desktop";
};

function value(params: URLSearchParams, key: string) {
  return params.get(key)?.trim().slice(0, 500) || null;
}

function currentDeviceCategory(): LeadAttribution["deviceCategory"] {
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1100) return "tablet";
  return "desktop";
}

export function getLeadAttribution(): LeadAttribution {
  const params = new URLSearchParams(window.location.search);
  const now = new Date().toISOString();
  let firstTouch: Omit<LeadAttribution, "currentPageUrl" | "deviceCategory"> | null = null;

  try {
    firstTouch = JSON.parse(window.localStorage.getItem(storageKey) ?? "null");
  } catch {
    firstTouch = null;
  }

  if (!firstTouch) {
    firstTouch = {
      landingPageUrl: window.location.href.slice(0, 2_000),
      referrer: document.referrer.slice(0, 2_000) || null,
      utmSource: value(params, "utm_source"),
      utmMedium: value(params, "utm_medium"),
      utmCampaign: value(params, "utm_campaign"),
      utmTerm: value(params, "utm_term"),
      utmContent: value(params, "utm_content"),
      gclid: value(params, "gclid"),
      gbraid: value(params, "gbraid"),
      wbraid: value(params, "wbraid"),
      fbclid: value(params, "fbclid"),
      firstTouchAt: now,
    };

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(firstTouch));
    } catch {
      // Attribution is useful but must never block a lead submission.
    }
  }

  return {
    ...firstTouch,
    currentPageUrl: window.location.href.slice(0, 2_000),
    deviceCategory: currentDeviceCategory(),
  };
}
