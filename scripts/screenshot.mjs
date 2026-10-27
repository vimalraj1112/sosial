/**
 * Headless visual + console QA.
 * Usage: node scripts/screenshot.mjs [path] [label]
 * Requires the dev or production server running on localhost:3000.
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

const route = process.argv[2] ?? "/";
const label = process.argv[3] ?? "home";
const base = process.env.QA_BASE ?? "http://localhost:3000";
const outDir = path.resolve(process.env.QA_OUT ?? path.join(process.env.TEMP ?? ".", "sosial-qa"));
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "tablet", width: 820, height: 1100 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--hide-scrollbars", "--disable-gpu", "--force-device-scale-factor=1"],
});

const problems = [];

for (const vp of viewports) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
  // Full-page captures scroll faster than the reveal transitions. Emulating
  // reduced motion renders the final state immediately (and checks that path).
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);

  page.on("console", (message) => {
    if (message.type() !== "error") return;
    // Prefetches for routes not built yet 404 by design in this preview.
    if (message.location()?.url?.includes("_rsc=")) return;
    problems.push(`[${vp.name}] console: ${message.text()}`);
  });
  page.on("pageerror", (error) => problems.push(`[${vp.name}] pageerror: ${error.message}`));
  page.on("requestfailed", (request) => {
    const url = request.url();
    // Route prefetches for pages still in the build may be cancelled; not a defect.
    if (!url.startsWith("data:") && !url.includes("_rsc=")) {
      problems.push(`[${vp.name}] request failed: ${url}`);
    }
  });
  page.on("response", (response) => {
    // 404 prefetches are expected until every route exists; ignore them here.
    if (response.status() >= 400 && !response.url().includes("_rsc=")) {
      problems.push(`[${vp.name}] ${response.status()} ${response.url()}`);
    }
  });

  const url = `${base}${route}`;
  // "load" is used instead of "networkidle2": Next.js keeps route prefetches
  // open, so the network never reaches idle even on a healthy page.
  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready).catch(() => {});

  // Let the splash intro finish and scroll-reveal animations settle.
  await new Promise((resolve) => setTimeout(resolve, 3600));
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight * 0.85;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 80);
        else {
          window.scrollTo(0, 0);
          setTimeout(resolve, 500);
        }
      };
      step();
    });
  });
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Full-page capture can re-snap horizontal rails; reset them so screenshots
  // show the resting state a visitor sees on load.
  await page.evaluate(() => {
    for (const el of Array.from(document.querySelectorAll("*"))) {
      if (el.scrollLeft !== 0) el.scrollLeft = 0;
    }
  });

  const file = path.join(outDir, `${label}-${vp.name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log(`${file}`);

  const metrics = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    height: document.body.scrollHeight,
    overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
  }));
  if (metrics.overflow) problems.push(`[${vp.name}] horizontal overflow: ${metrics.width}px`);

  await page.close();
}

await browser.close();

if (problems.length) {
  console.log("\nPROBLEMS");
  for (const problem of [...new Set(problems)]) console.log(`- ${problem}`);
} else {
  console.log("\nNo console errors, failed requests or horizontal overflow detected.");
}
