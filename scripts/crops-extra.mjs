/**
 * Extra section crops (header, success story, mid CTA, footer, final form).
 * Usage: node scripts/crops-extra.mjs [width] [label]
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

const width = Number(process.argv[2] ?? 1440);
const label = process.argv[3] ?? `extra-${width}`;
const outDir = path.resolve(process.env.QA_OUT ?? path.join(process.env.TEMP ?? ".", "sosial-qa"));
fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--hide-scrollbars", "--disable-gpu", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
await page.setViewport({ width, height: width < 600 ? 844 : 1000, deviceScaleFactor: 1 });
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await page.goto("http://localhost:3000", { waitUntil: "load", timeout: 60000 });
await page.evaluate(() => document.fonts.ready).catch(() => {});
await new Promise((r) => setTimeout(r, 1200));

await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0;
    const step = () => {
      y += window.innerHeight * 0.85;
      window.scrollTo(0, y);
      if (y < document.body.scrollHeight) setTimeout(step, 70);
      else setTimeout(resolve, 500);
    };
    step();
  });
});
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 350));

await page.screenshot({
  path: path.join(outDir, `${label}-top.png`),
  clip: { x: 0, y: 0, width, height: width < 600 ? 180 : 200 },
});
console.log(path.join(outDir, `${label}-top.png`));

async function snap(name, selector, byText) {
  const handle = await page.evaluateHandle(
    ({ selector, byText }) => {
      if (selector) return document.querySelector(selector);
      return (
        Array.from(document.querySelectorAll("main section")).find((section) =>
          section.textContent?.includes(byText),
        ) ?? null
      );
    },
    { selector: selector ?? null, byText: byText ?? null },
  );
  const element = handle.asElement();
  if (!element) {
    console.log(`MISS ${name}`);
    return;
  }
  const file = path.join(outDir, `${label}-${name}.png`);
  await element.screenshot({ path: file });
  console.log(file);
}

await snap("header", "header");
await snap("success", null, "Success stories");
await snap("midcta", null, "Not sure where to start?");
await snap("contact", null, "Tell us what you want to");
await snap("footer", "footer");

await browser.close();
