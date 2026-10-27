import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const page = await browser.newPage();
page.on("response", (r) => { if (r.status() >= 400) console.log(r.status(), r.url()); });
page.on("console", (m) => { if (m.type() === "error") console.log("console:", m.text(), m.location()); });
await page.goto("http://localhost:3000/", { waitUntil: "load" });
await new Promise(r => setTimeout(r, 4000));
await browser.close();
