import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--hide-scrollbars"],
});
const page = await browser.newPage();
const pending = new Set();
page.on("request", (req) => pending.add(req.url()));
page.on("requestfinished", (req) => pending.delete(req.url()));
page.on("requestfailed", (req) => {
  pending.delete(req.url());
  console.log("FAILED", req.url(), req.failure()?.errorText);
});
await page.setViewport({ width: 1440, height: 900 });
const started = Date.now();
try {
  await page.goto("http://localhost:3000/", { waitUntil: "load", timeout: 30000 });
  console.log("loaded in", Date.now() - started, "ms");
} catch (error) {
  console.log("goto error", error.message);
}
await new Promise((r) => setTimeout(r, 3000));
console.log("pending requests:", [...pending]);
console.log("title", await page.title());
await page.screenshot({ path: "C:/Users/HP/AppData/Local/Temp/sosial-qa/prod-check.png" });
await browser.close();
