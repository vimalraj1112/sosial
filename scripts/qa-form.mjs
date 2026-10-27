import fs from "node:fs";
import puppeteer from "puppeteer-core";

const dir = ".data/enquiries";
const before = fs.existsSync(dir) ? fs.readdirSync(dir).length : 0;

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
page.on("console", (m) => {
  if (m.type() === "error" && !m.location()?.url?.includes("_rsc=")) {
    console.log("console error:", m.text());
  }
});
await page.goto("http://localhost:3000/", { waitUntil: "load" });
// The splash mounts after hydration; wait for it to exist before waiting for it
// to leave, otherwise the removal check can pass before the intro ever appears.
await page.waitForSelector("[data-splash]", { timeout: 4000 }).catch(() => {});
await page.waitForFunction(() => !document.querySelector("[data-splash]"), { timeout: 8000 }).catch(() => {});

await page.evaluate(() => document.getElementById("enquiry")?.scrollIntoView({ block: "center" }));
await new Promise((r) => setTimeout(r, 400));

// Use semantic selectors instead of React-generated ids.
const fields = await page.$$("#enquiry input, #enquiry select, #enquiry textarea");
console.log("fields", fields.length);

const name = await page.$("#enquiry input[autocomplete='name']");
const email = await page.$("#enquiry input[autocomplete='email']");
const service = await page.$("#enquiry select");
const message = await page.$("#enquiry textarea");
const consent = await page.$("#enquiry input[type='checkbox']");
const submit = await page.$("#enquiry button[type='submit']");

if (!name || !email || !service || !message || !consent || !submit) {
  throw new Error("form fields not found");
}

await name.type("QA Browser Test");
await email.type("qa.browser@example.com");
await service.select(await page.evaluate(() => {
  const el = document.querySelector("#enquiry select");
  return el.options[1].value;
}));
await message.type("Browser end-to-end check: we need a focused SEO and content engagement for a B2B service business.");
await consent.click();
await submit.click();

await page.waitForFunction(
  () => document.body.innerText.includes("Enquiry received"),
  { timeout: 15000 },
).catch(() => {});
await new Promise((r) => setTimeout(r, 800));

const state = await page.evaluate(() => ({
  success: document.body.innerText.includes("Enquiry received"),
  failure: document.querySelector("[role='alert']")?.textContent?.trim() ?? null,
}));
console.log(state);

const after = fs.existsSync(dir) ? fs.readdirSync(dir).length : 0;
console.log("files before", before, "after", after);
await page.screenshot({ path: "C:/Users/HP/AppData/Local/Temp/sosial-qa/form-success.png" });
await browser.close();
