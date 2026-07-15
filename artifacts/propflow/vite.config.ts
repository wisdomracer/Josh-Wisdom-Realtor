import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { readFile } from "node:fs/promises";
import { Buffer } from "node:buffer";
import type { Plugin } from "vite";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { routeMetadataForPath, type RouteMetadata } from "./src/config/route-metadata";
import { siteConfig } from "./src/config/site";

const rawPort = process.env.PORT ?? "4173";

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH ?? "/";
const apiProxyTarget = process.env.API_PROXY_TARGET;
const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function replaceStaticMeta(html: string, attribute: "name" | "property", key: string, value: string): string {
  const pattern = new RegExp(`<meta data-static-social ${attribute}="${key}" content="[^"]*" \\/>`);
  return html.replace(pattern, `<meta data-static-social ${attribute}="${key}" content="${escapeHtml(value)}" />`);
}

function renderRouteDocument(template: string, pathname: string, metadata: RouteMetadata): string {
  const canonical = new URL(pathname, siteConfig.url).toString();
  let html = template.replace(
    /<title data-static-social>[\s\S]*?<\/title>/,
    `<title data-static-social>${escapeHtml(metadata.title)}</title>`,
  );
  html = replaceStaticMeta(html, "name", "description", metadata.description);
  html = replaceStaticMeta(html, "property", "og:title", metadata.title);
  html = replaceStaticMeta(html, "property", "og:description", metadata.description);
  html = replaceStaticMeta(html, "property", "og:url", canonical);
  html = replaceStaticMeta(html, "property", "og:image", new URL(metadata.image.src, siteConfig.url).toString());
  html = replaceStaticMeta(html, "property", "og:image:width", String(metadata.image.width));
  html = replaceStaticMeta(html, "property", "og:image:height", String(metadata.image.height));
  html = replaceStaticMeta(html, "property", "og:image:alt", metadata.image.alt);
  html = replaceStaticMeta(html, "name", "twitter:title", metadata.title);
  html = replaceStaticMeta(html, "name", "twitter:description", metadata.description);
  html = replaceStaticMeta(html, "name", "twitter:image", new URL(metadata.image.src, siteConfig.url).toString());
  html = replaceStaticMeta(html, "name", "twitter:image:alt", metadata.image.alt);
  return html.replace(
    '    <script>document.querySelectorAll("[data-static-social]").forEach((element) => element.remove());</script>',
    `    <link data-static-social rel="canonical" href="${escapeHtml(canonical)}" />\n    <script>document.querySelectorAll("[data-static-social]").forEach((element) => element.remove());</script>`,
  );
}

function routeMetadataPreviewPlugin(): Plugin {
  let templatePromise: Promise<string> | undefined;
  return {
    name: "route-metadata-preview",
    configurePreviewServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== "GET") return next();
        const requestUrl = new URL(req.url ?? "/", "http://localhost");
        const metadata = routeMetadataForPath(decodeURIComponent(requestUrl.pathname));
        if (!metadata) return next();
        const accept = String(req.headers.accept ?? "");
        if (accept && !accept.includes("text/html") && !accept.includes("*/*")) return next();

        try {
          templatePromise ??= readFile(path.resolve(import.meta.dirname, "dist/public/index.html"), "utf8");
          const document = renderRouteDocument(await templatePromise, requestUrl.pathname, metadata);
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.setHeader("Content-Length", String(Buffer.byteLength(document)));
          res.setHeader("Cache-Control", "no-cache");
          for (const [name, value] of Object.entries(securityHeaders)) res.setHeader(name, value);
          res.end(document);
        } catch (error) {
          server.config.logger.error(`Unable to render route metadata for ${requestUrl.pathname}: ${String(error)}`);
          next(error);
        }
      });
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    routeMetadataPreviewPlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, ".."),
            }),
          ),
          await import("@replit/vite-plugin-dev-banner").then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/react(?:-dom)?|scheduler|wouter|react-helmet/.test(id)) return "framework";
          if (/react-hook-form|hookform|zod/.test(id)) return "forms";
          if (/@radix-ui|lucide-react/.test(id)) return "ui";
          if (/@tanstack/.test(id)) return "query";
        },
      },
    },
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    headers: securityHeaders,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    headers: securityHeaders,
    proxy: apiProxyTarget ? { "/api": { target: apiProxyTarget, changeOrigin: true } } : undefined,
  },
});
