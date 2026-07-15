import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";

const imageDirectory = path.resolve(import.meta.dirname, "../artifacts/propflow/public/images");
const sources = [
  { name: "the-woodlands-waterway", widths: [600, 1200] },
  { name: "the-woodlands-waterway-lifestyle", widths: [960, 1920] },
  { name: "tomball-griffin-house", widths: [960, 1920] },
  { name: "houston-skyline", widths: [960, 1920] },
  { name: "magnolia-historic-depot", widths: [960, 1920] },
  { name: "spring-old-town", widths: [960, 1920] },
  { name: "lake-conroe-sunset", widths: [960, 1920] },
];

await mkdir(imageDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  for (const source of sources) {
    const sourcePath = path.join(imageDirectory, `${source.name}.jpg`);
    await page.goto(pathToFileURL(sourcePath).href);

    for (const width of source.widths) {
      const dataUrl = await page.evaluate(async ({ width }) => {
        const image = document.querySelector("img");
        if (!(image instanceof HTMLImageElement)) throw new Error("Source image did not load");
        await image.decode();
        const height = Math.round((image.naturalHeight / image.naturalWidth) * width);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d", { alpha: false });
        if (!context) throw new Error("Canvas context is unavailable");
        context.drawImage(image, 0, 0, width, height);
        return canvas.toDataURL("image/webp", 0.82);
      }, { width });

      const outputPath = path.join(imageDirectory, `${source.name}-${width}.webp`);
      await writeFile(outputPath, Buffer.from(dataUrl.split(",")[1], "base64"));
    }
  }
} finally {
  await browser.close();
}
