import fs from "node:fs";
import puppeteer from "puppeteer-core";

const out = "C:/Users/HP/AppData/Local/Temp/sosial-ref";
fs.mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.goto("https://www.digitalacademy360.com/digital-marketing-classes", {
  waitUntil: "domcontentloaded",
  timeout: 90000,
});
await new Promise((r) => setTimeout(r, 6000));
await page.keyboard.press("Escape").catch(() => {});
await new Promise((r) => setTimeout(r, 800));

const data = await page.evaluate(() => {
  const pick = (el) => {
    if (!el) return null;
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName,
      cls: String(el.className).slice(0, 90),
      text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 70),
      font: `${s.fontWeight} ${s.fontSize}/${s.lineHeight} ${s.fontFamily}`,
      ls: s.letterSpacing,
      color: s.color,
      bg: s.backgroundColor,
      radius: s.borderRadius,
      border: `${s.borderWidth} ${s.borderStyle} ${s.borderColor}`,
      shadow: s.boxShadow,
      padding: s.padding,
      width: Math.round(r.width),
      height: Math.round(r.height),
    };
  };

  const headings = [...document.querySelectorAll("h1,h2,h3,h4")]
    .filter((el) => el.getBoundingClientRect().height > 0)
    .slice(0, 12)
    .map(pick);

  const buttons = [...document.querySelectorAll("a,button")]
    .filter((el) => {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return r.width > 60 && r.height > 30 && r.height < 110 && s.backgroundColor !== "rgba(0, 0, 0, 0)";
    })
    .slice(0, 18)
    .map(pick);

  const cards = [...document.querySelectorAll("div,article,section")]
    .filter((el) => {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return (
        r.width > 180 &&
        r.width < 700 &&
        r.height > 120 &&
        r.height < 900 &&
        (s.boxShadow !== "none" || parseFloat(s.borderRadius) > 0) &&
        s.backgroundColor !== "rgba(0, 0, 0, 0)"
      );
    })
    .slice(0, 16)
    .map(pick);

  const shadows = {};
  for (const el of document.querySelectorAll("*")) {
    const s = getComputedStyle(el);
    if (s.boxShadow !== "none") shadows[s.boxShadow] = (shadows[s.boxShadow] || 0) + 1;
  }

  const fonts = {};
  for (const el of document.querySelectorAll("h1,h2,h3,p,a,button,span")) {
    const s = getComputedStyle(el);
    const key = `${s.fontFamily} | ${s.fontWeight}`;
    fonts[key] = (fonts[key] || 0) + 1;
  }

  return {
    body: pick(document.body),
    fonts,
    headings,
    buttons,
    cards,
    shadows: Object.entries(shadows)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 14),
  };
});

fs.writeFileSync(`${out}/styles.json`, JSON.stringify(data, null, 2));
console.log(JSON.stringify(data, null, 2).slice(0, 12000));

await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: `${out}/ref-1440-top.png` });

for (let i = 1; i <= 3; i++) {
  await page.evaluate((n) => window.scrollTo(0, window.innerHeight * n), i);
  await new Promise((r) => setTimeout(r, 700));
  await page.screenshot({ path: `${out}/ref-1440-${i}.png` });
}

await page.setViewport({ width: 390, height: 844 });
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 900));
await page.screenshot({ path: `${out}/ref-390-top.png` });
await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2));
await new Promise((r) => setTimeout(r, 700));
await page.screenshot({ path: `${out}/ref-390-mid.png` });

console.log("saved to", out);
await browser.close();
