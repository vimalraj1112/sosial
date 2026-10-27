/**
 * Section crops for visual comparison.
 * Usage: node scripts/crops.mjs [width] [label]
 * Requires the production server on localhost:3000.
 */
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const CHROME_CANDIDATES = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
];
const executablePath = CHROME_CANDIDATES.find((candidate) => fs.existsSync(candidate));
if (!executablePath) throw new Error("Chrome not found");

const width = Number(process.argv[2] ?? 1440);
const label = process.argv[3] ?? `crop-${width}`;
const base = process.env.QA_BASE ?? "http://localhost:3000";
const outDir = path.resolve(process.env.QA_OUT ?? path.join(process.env.TEMP ?? ".", "sosial-qa"));
fs.mkdirSync(outDir, { recursive: true });

const headings = [
  "Attention is",
  "A small studio",
  "Everything you need",
  "Fewer promises",
  "Three ways in",
  "A portfolio built",
  "The work, up close",
  "How the work comes",
  "Generic traffic",
  "A process that removes",
  "Senior people",
  "What it feels like",
  "Thinking we would",
  "Things worth asking",
  "Tell us what you want",
];

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--hide-scrollbars", "--disable-gpu", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
await page.setViewport({ width, height: width < 600 ? 844 : 1000, deviceScaleFactor: 1 });
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await page.goto(base, { waitUntil: "load", timeout: 60000 });
await page.evaluate(() => document.fonts.ready).catch(() => {});
await page.addStyleTag({
  content: `
    header { visibility: hidden !important; }
    a[href="#main"], .skip-link { display: none !important; }
  `,
});
await new Promise((resolve) => setTimeout(resolve, 1200));

// Scroll through once so every reveal has settled.
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
await new Promise((resolve) => setTimeout(resolve, 350));

let index = 0;
const hero = await page.$("main > section");
if (hero) {
  await hero.screenshot({ path: path.join(outDir, `${label}-00-hero.png`) });
  console.log(`${path.join(outDir, `${label}-00-hero.png`)} :: hero`);
}
for (const heading of headings) {
  const handle = await page.evaluateHandle((needle) => {
    const sections = Array.from(document.querySelectorAll("main section, main > div"));
    for (const section of sections) {
      const h2 = section.querySelector("h2");
      if (h2?.textContent?.includes(needle)) return section;
    }
    return null;
  }, heading);
  const element = handle.asElement();
  if (!element) {
    console.log(`MISS ${heading}`);
    continue;
  }
  index += 1;
  const file = path.join(outDir, `${label}-${String(index).padStart(2, "0")}.png`);
  await element.screenshot({ path: file });
  const name = (await element.evaluate((el) => el.querySelector("h2")?.textContent?.replace(/\s+/g, " ").slice(0, 80))) ?? "";
  console.log(`${file} :: ${name}`);
}

// Header + footer crops.
const header = await page.$("header");
if (header) await header.screenshot({ path: path.join(outDir, `${label}-header.png`) });
const footer = await page.$("footer");
if (footer) await footer.screenshot({ path: path.join(outDir, `${label}-footer.png`) });

await browser.close();
