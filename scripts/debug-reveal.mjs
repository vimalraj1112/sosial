import fs from "node:fs";
import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ["--hide-scrollbars"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
page.on("console", (m) => console.log("console:", m.type(), m.text()));
page.on("pageerror", (e) => console.log("pageerror:", e.message));
await page.goto("http://localhost:3000/", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 3500));

// Scroll to the services section.
await page.evaluate(() => {
  const el = document.querySelector("#services");
  el?.scrollIntoView({ behavior: "instant", block: "center" });
});
await new Promise((r) => setTimeout(r, 1500));

const info = await page.evaluate(() => {
  const section = document.querySelector("#services");
  const grid = section?.querySelector(".grid");
  const first = grid?.firstElementChild;
  const style = first ? getComputedStyle(first) : null;
  return {
    sectionTop: section?.getBoundingClientRect().top,
    gridChildren: grid?.children.length,
    firstTag: first?.tagName,
    firstOpacity: style?.opacity,
    firstTransform: style?.transform,
    firstHeight: first?.getBoundingClientRect().height,
    innerHTML: first ? first.innerHTML.slice(0, 400) : null,
    htmlHasText: section?.textContent?.slice(0, 200),
  };
});
console.log(JSON.stringify(info, null, 2));
await page.screenshot({ path: "C:/Users/HP/AppData/Local/Temp/sosial-qa/services-live.png" });
await browser.close();
