import { readFile } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const publicDirectory = path.resolve(import.meta.dirname, "../artifacts/propflow/public");
const source = await readFile(path.join(publicDirectory, "favicon.svg"), "utf8");
const sourceUrl = `data:image/svg+xml;base64,${Buffer.from(source).toString("base64")}`;
const outputs = [
  { name: "apple-touch-icon.png", size: 180 },
  { name: "brand-icon-192.png", size: 192 },
  { name: "brand-icon-512.png", size: 512 },
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  for (const output of outputs) {
    await page.setViewportSize({ width: output.size, height: output.size });
    await page.setContent(`<!doctype html><style>html,body,img{width:100%;height:100%;margin:0;display:block;background:#050505}</style><img src="${sourceUrl}" alt="">`);
    await page.locator("img").evaluate(async (image) => {
      if (!(image instanceof HTMLImageElement)) throw new Error("Brand icon did not render");
      await image.decode();
    });
    await page.screenshot({ path: path.join(publicDirectory, output.name) });
  }
} finally {
  await browser.close();
}
