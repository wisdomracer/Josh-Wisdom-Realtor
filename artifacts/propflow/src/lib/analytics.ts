export type AnalyticsEvent =
  | "page_view"
  | "view_home_valuation"
  | "start_lead_form"
  | "lead_form_validation_error"
  | "lead_submission_success"
  | "lead_submission_failure"
  | "click_phone"
  | "click_email"
  | "click_primary_cta"
  | "view_community"
  | "view_seller_service"
  | "view_blog_post";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

export function initializeAnalytics() {
  if (initialized) return;
  initialized = true;

  const gtmId = import.meta.env.VITE_GTM_ID?.trim();
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
  window.dataLayer = window.dataLayer ?? [];

  if (gtmId && /^GTM-[A-Z0-9]+$/i.test(gtmId)) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`);
    return;
  }

  if (measurementId && /^G-[A-Z0-9]+$/i.test(measurementId)) {
    window.gtag = (...args: unknown[]) => window.dataLayer?.push({ gtag: args });
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { send_page_view: false });
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`);
  }
}

function loadScript(src: string) {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

export function trackEvent(event: AnalyticsEvent, parameters: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...parameters });
}
