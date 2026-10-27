/**
 * Responsive overflow + height check at the target widths.
 * Usage: node scripts/qa-widths.mjs
 */
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const candidates = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
];
const executablePath = candidates.find((p) => fs.existsSync(p));
if (!executablePath) throw new Error("Chrome not found");

const outDir = path.resolve(process.env.QA_OUT ?? path.join(process.env.TEMP ?? ".", "sosial-qa"));
fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--hide-scrollbars", "--disable-gpu", "--force-device-scale-factor=1"],
});

for (const width of [375, 390, 768, 1280, 1440]) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto("http://localhost:3000", { waitUntil: "load", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready).catch(() => {});
  await new Promise((r) => setTimeout(r, 1100));
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight * 0.85;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 45);
        else setTimeout(resolve, 300);
      };
      step();
    });
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 250));

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    return {
      scrollWidth: doc.scrollWidth,
      innerWidth: window.innerWidth,
      height: document.body.scrollHeight,
      overflow: doc.scrollWidth > window.innerWidth + 1,
    };
  });
  console.log(`${width}: ${JSON.stringify(metrics)}`);
  await page.screenshot({
    path: path.join(outDir, `width-${width}-top.png`),
    clip: { x: 0, y: 0, width, height: 900 },
  });
  await page.close();
}

await browser.close();
