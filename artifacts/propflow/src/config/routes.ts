export const coreRoutes = [
  "/",
  "/about",
  "/buy",
  "/sell",
  "/home-valuation",
  "/relocation",
  "/communities",
  "/communities/the-woodlands",
  "/communities/tomball",
  "/communities/greater-houston",
  "/luxury-homes",
  "/the-woodlands-events",
  "/blog",
  "/privacy-policy",
  "/terms",
  "/contact",
] as const;

export const seoRoutes = [
  "/the-woodlands-listing-agent",
  "/the-woodlands-realtor",
  "/the-woodlands-luxury-homes",
  "/communities/carlton-woods",
  "/communities/east-shore",
  "/communities/creekside-park",
  "/magnolia-realtor",
  "/spring-realtor",
  "/conroe-realtor",
  "/shenandoah-realtor",
  "/selling-a-home-in-the-woodlands",
] as const;

export const blogRoutes = [
  "/blog/how-to-price-a-home-in-the-woodlands",
  "/blog/what-carlton-woods-buyers-compare",
  "/blog/selling-near-the-woodlands-waterway",
  "/blog/creekside-park-seller-checklist",
] as const;

export const toolRoutes = ["/mortgage-estimate"] as const;

export const publicRoutes = [...coreRoutes, ...seoRoutes, ...blogRoutes, ...toolRoutes] as const;

export const retiredPlaceholderRoutes = [
  "/market-updates",
  "/carlton-woods-homes-for-sale",
  "/east-shore-homes-for-sale",
  "/creekside-park-homes-for-sale",
  "/featured-listings",
  "/recently-sold",
  "/map-search",
  "/property-alerts",
  "/affordability-calculator",
  "/seller-net-sheet",
  "/video-library",
  "/instagram-feed",
  "/google-reviews",
  "/newsletter",
] as const;
