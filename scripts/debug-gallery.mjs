import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844 });
await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await page.goto("http://localhost:3000/", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 1200));

const read = () =>
  page.evaluate(() => {
    const el = document.querySelector(".no-scrollbar");
    return { scrollLeft: el.scrollLeft, firstLeft: el.firstElementChild.getBoundingClientRect().left };
  });

console.log("rest", await read());

await page.evaluate(() => {
  const el = document.querySelector(".no-scrollbar");
  el?.scrollIntoView({ block: "center" });
});
await new Promise((r) => setTimeout(r, 600));
console.log("scrolled to gallery", await read());
await page.screenshot({ path: "C:/Users/HP/AppData/Local/Temp/sosial-qa/gallery-viewport.png" });

await page.screenshot({ path: "C:/Users/HP/AppData/Local/Temp/sosial-qa/gallery-full.png", fullPage: true });
console.log("after fullPage", await read());

await browser.close();
