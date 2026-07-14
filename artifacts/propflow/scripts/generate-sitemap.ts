import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { publicRoutes } from "../src/config/routes";
import { absoluteUrl } from "../src/config/site";

const priorityByRoute = new Map<string, string>([
  ["/", "1.0"],
  ["/home-valuation", "0.95"],
  ["/sell", "0.9"],
  ["/the-woodlands-listing-agent", "0.9"],
  ["/selling-a-home-in-the-woodlands", "0.9"],
]);

const urls = publicRoutes.map((route) => {
  const priority = priorityByRoute.get(route) ?? (route.startsWith("/blog/") ? "0.7" : "0.8");
  return `  <url><loc>${absoluteUrl(route)}</loc><priority>${priority}</priority></url>`;
});

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  "</urlset>",
  "",
].join("\n");

writeFileSync(resolve(import.meta.dirname, "../public/sitemap.xml"), sitemap, "utf8");
