/**
 * Viewport screenshots at controlled scroll positions (no element focus).
 * Usage: node scripts/viewport-shot.mjs [width] [label]
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

const width = Number(process.argv[2] ?? 390);
const label = process.argv[3] ?? `viewport-${width}`;
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
      else setTimeout(resolve, 400);
    };
    step();
  });
});

async function snapAt(name, needle) {
  const top = await page.evaluate((needle) => {
    const sections = Array.from(document.querySelectorAll("main section"));
    const el = sections.find((section) => section.textContent?.includes(needle));
    if (!el) return null;
    return el.getBoundingClientRect().top + window.scrollY;
  }, needle);
  if (top == null) {
    console.log(`MISS ${name}`);
    return;
  }
  await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 24)), top);
  await new Promise((r) => setTimeout(r, 450));
  const file = path.join(outDir, `${label}-${name}.png`);
  await page.screenshot({ path: file });
  console.log(file);
}

await snapAt("team", "Senior people, not an");
await snapAt("contact", "Tell us what you want to");
await snapAt("footer", "Let’s build something worth");

await browser.close();
