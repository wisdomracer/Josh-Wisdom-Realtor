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
      const path = window.location.pathname;
      const placement = getPlacement(link);

      if (href.startsWith("tel:")) {
        trackEvent("click_phone", { path, placement });
        return;
      }
      if (href.startsWith("mailto:")) {
        trackEvent("click_email", { path, placement });
        return;
      }
      if (href.startsWith("sms:")) {
        trackEvent("click_sms", { path, placement });
        return;
      }

      const destination = new URL(href, window.location.origin);
      const label = (link.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 80);
      const isLocalConversion = destination.origin === window.location.origin
        && ["/contact", "/home-valuation"].includes(destination.pathname);

      if (link.hasAttribute("data-primary-cta") || isLocalConversion) {
        trackEvent("click_primary_cta", { path, destination: destination.pathname, label, placement });
      } else if (["http:", "https:"].includes(destination.protocol) && destination.origin !== window.location.origin) {
        trackEvent("click_outbound_resource", { path, destination_host: destination.hostname, label, placement });
      }
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}

function getPlacement(link: Element) {
  if (link.closest("header")) return "header";
  if (link.closest("footer")) return "footer";
  if (link.closest("aside")) return "aside";
  return "main";
}
