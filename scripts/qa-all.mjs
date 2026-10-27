/**
 * Full-route smoke test: status, console errors, internal links and responsive
 * overflow at the five launch widths. Temporary QA helper.
 *
 * Usage: node scripts/qa-all.mjs
 */
import fs from "node:fs";
import puppeteer from "puppeteer-core";

const candidates = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
];
const executablePath = candidates.find((p) => fs.existsSync(p));
if (!executablePath) throw new Error("Chrome not found");

const base = "http://localhost:3000";

const serviceSlugs = [
  "social-media",
  "performance-marketing",
  "branding",
  "web-design",
  "local-visibility",
  "brand-production",
  "indoor-production",
  "outdoor-production",
];

const workSlugs = [
  "northwind",
  "halcyon",
  "tessellate",
  "orbit",
  "fieldnote",
  "kite",
  "verdant",
];

const insightSlugs = [
  "attention-audit",
  "seo-is-a-product-problem",
  "creative-testing-system",
  "one-clear-idea",
  "first-frame-strategy",
  "reporting-that-changes-decisions",
];

const routes = [
  "/",
  "/about",
  "/services",
  ...serviceSlugs.map((slug) => `/services/${slug}`),
  "/work",
  ...workSlugs.map((slug) => `/work/${slug}`),
  "/insights",
  ...insightSlugs.map((slug) => `/insights/${slug}`),
  "/contact",
  "/testimonials",
  "/privacy",
  "/terms",
  "/sitemap.xml",
  "/robots.txt",
];

const widths = [375, 390, 768, 1280, 1440];

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--hide-scrollbars", "--disable-gpu", "--force-device-scale-factor=1"],
});

const page = await browser.newPage();
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);

const failures = [];
const overflows = [];
const badResponses = [];
const consoleErrors = [];
const links = new Set();

page.on("response", (response) => {
  const status = response.status();
  if (status >= 400) badResponses.push({ status, url: response.url() });
});
page.on("console", (message) => {
  if (message.type() === "error") consoleErrors.push(message.text());
});

for (const route of routes) {
  for (const width of widths) {
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    let response;
    const target = route.endsWith(".xml") || route.endsWith(".txt")
      ? `${base}${route}`
      : `${base}${route}${route.includes("?") ? "&" : "?"}intro=0`;
    try {
      response = await page.goto(target, { waitUntil: "load", timeout: 60000 });
    } catch (error) {
      failures.push({ route, width, error: String(error).slice(0, 200) });
      continue;
    }
    await page.evaluate(() => document.fonts.ready).catch(() => {});
    await new Promise((resolve) => setTimeout(resolve, 80));
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)).catch(() => {});
    await new Promise((resolve) => setTimeout(resolve, 120));
    await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});

    const status = response?.status() ?? 0;
    if (route.endsWith(".xml") || route.endsWith(".txt")) {
      if (status >= 400) failures.push({ route, width, status });
      continue;
    }
    if (status >= 400) failures.push({ route, width, status });

    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      height: document.body.scrollHeight,
    }));
    if (metrics.scrollWidth > metrics.innerWidth + 1) {
      overflows.push({ route, width, ...metrics });
    }

    if (width === 1280) {
      const hrefs = await page.$$eval("a[href]", (anchors) =>
        anchors
          .map((anchor) => anchor.getAttribute("href"))
          .filter((href) => href && href.startsWith("/") && !href.startsWith("//")),
      );
      hrefs.forEach((href) => {
        const clean = href.split("#")[0].split("?")[0];
        if (clean) links.add(clean);
      });
    }
  }
  console.log(`checked ${route}`);
}

const linkStatuses = await page.evaluate(async (hrefs) => {
  const output = [];
  for (const href of hrefs) {
    try {
      const response = await fetch(href, { method: "GET", redirect: "manual" });
      output.push({ href, status: response.status });
    } catch (error) {
      output.push({ href, status: 0, error: String(error).slice(0, 100) });
    }
  }
  return output;
}, Array.from(links).sort());

const brokenLinks = linkStatuses.filter((item) => item.status >= 400 || item.status === 0);
const uniqueConsoleErrors = [...new Set(consoleErrors)];
const uniqueBadResponses = [
  ...new Map(badResponses.map((item) => [`${item.status}:${item.url}`, item])).values(),
];

console.log("\n--- summary ---");
console.log(JSON.stringify({
  routes: routes.length,
  widths,
  failures,
  overflows,
  brokenLinks,
  uniqueConsoleErrors,
  uniqueBadResponses,
  checkedLinks: linkStatuses.length,
}, null, 2));

await browser.close();
