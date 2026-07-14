import { useEffect } from "react";
import { useLocation } from "wouter";
import { initializeAnalytics, trackEvent } from "@/lib/analytics";

export function Analytics() {
  const [location] = useLocation();

  useEffect(() => initializeAnalytics(), []);

  useEffect(() => {
    trackEvent("page_view", { path: location });
    if (location === "/home-valuation") trackEvent("view_home_valuation", { path: location });
    if (location.startsWith("/communities/") || /homes-for-sale|realtor$/.test(location)) trackEvent("view_community", { path: location });
    if (location === "/sell" || location.includes("listing-agent") || location.includes("selling-a-home")) trackEvent("view_seller_service", { path: location });
    if (location.startsWith("/blog/")) trackEvent("view_blog_post", { path: location });
  }, [location]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) trackEvent("click_phone", { path: window.location.pathname });
      if (href.startsWith("mailto:")) trackEvent("click_email", { path: window.location.pathname });
      if (link.hasAttribute("data-primary-cta")) trackEvent("click_primary_cta", { path: window.location.pathname, destination: href });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
