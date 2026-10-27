/**
 * Menu/dropdown state screenshots.
 * Usage: node scripts/qa-menus.mjs
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

// Desktop services dropdown
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto("http://localhost:3000", { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready).catch(() => {});
  await new Promise((r) => setTimeout(r, 900));
  const button = await page.$("header button[aria-expanded]");
  if (button) await button.click();
  await new Promise((r) => setTimeout(r, 450));
  await page.screenshot({ path: path.join(outDir, "menu-desktop.png"), clip: { x: 0, y: 0, width: 1440, height: 720 } });
  console.log(path.join(outDir, "menu-desktop.png"));
  await page.close();
}

// Mobile menu
{
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.goto("http://localhost:3000", { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready).catch(() => {});
  await new Promise((r) => setTimeout(r, 900));
  const button = await page.$("button[aria-label='Open menu']");
  if (button) await button.click();
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, "menu-mobile.png") });
  console.log(path.join(outDir, "menu-mobile.png"));
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  console.log("mobile overflow", overflow);
  await page.close();
}

await browser.close();
