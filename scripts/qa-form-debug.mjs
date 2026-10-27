import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.goto("http://localhost:3000/", { waitUntil: "load" });
await page.waitForFunction(() => !document.querySelector("[data-splash]"), { timeout: 8000 });
await new Promise((r) => setTimeout(r, 500));

const info = await page.evaluate(() => {
  const el = document.querySelector("#enquiry input[name='name']");
  const rect = el.getBoundingClientRect();
  const atPoint = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
  return {
    inert: document.getElementById("site-content").inert,
    rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
    atPoint: atPoint ? `${atPoint.tagName}.${atPoint.className}` : null,
    active: document.activeElement?.tagName,
    scrollY: window.scrollY,
  };
});
console.log("info", info);

await page.click("#enquiry input[name='name']");
console.log(
  "after click",
  await page.evaluate(() => ({
    active: document.activeElement?.tagName + "#" + document.activeElement?.id,
    value: document.querySelector("#enquiry input[name='name']").value,
  })),
);

await page.focus("#enquiry input[name='name']");
await page.keyboard.type("QA Browser Test");
console.log(
  "after focus+type",
  await page.evaluate(() => ({
    active: document.activeElement?.tagName + "#" + document.activeElement?.id,
    value: document.querySelector("#enquiry input[name='name']").value,
  })),
);

await browser.close();
