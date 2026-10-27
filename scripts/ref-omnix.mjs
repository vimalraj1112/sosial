import fs from "node:fs";
import puppeteer from "puppeteer-core";

const out = "C:/Users/HP/AppData/Local/Temp/sosial-ref";
fs.mkdirSync(out, { recursive: true });
const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--hide-scrollbars", "--disable-gpu"],
});

const analyze = () => {
  const pick = (el) => {
    if (!el) return null;
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName,
      cls: String(el.className).slice(0, 110),
      text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80),
      font: `${s.fontWeight} ${s.fontSize}/${s.lineHeight} ${s.fontFamily}`,
      ls: s.letterSpacing,
      color: s.color,
      bg: s.backgroundColor,
      radius: s.borderRadius,
      border: `${s.borderWidth} ${s.borderStyle} ${s.borderColor}`,
      shadow: s.boxShadow,
      padding: s.padding,
      gap: s.gap,
      width: Math.round(r.width),
      height: Math.round(r.height),
    };
  };
  const headings = [...document.querySelectorAll("h1,h2,h3,h4")]
    .filter((el) => el.getBoundingClientRect().height > 0)
    .slice(0, 16)
    .map(pick);
  const buttons = [...document.querySelectorAll("a,button")]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 70 && r.height > 30 && r.height < 110;
    })
    .slice(0, 30)
    .map(pick);
  const cards = [...document.querySelectorAll("article,li,div,a")]
    .filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 280 && r.width < 800 && r.height > 260 && r.height < 1000;
    })
    .slice(0, 20)
    .map(pick);
  return { body: pick(document.body), headings, buttons, cards };
};

// Work page desktop
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await page.goto("https://omnixstudio.co/work", { waitUntil: "networkidle2", timeout: 120000 });
  await new Promise((r) => setTimeout(r, 5000));
  await page.keyboard.press("Escape").catch(() => {});
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: `${out}/omnix-work-1440-top.png` });
  await page.screenshot({ path: `${out}/omnix-work-1440-full.png`, fullPage: true });
  const info = await page.evaluate(analyze);
  fs.writeFileSync(`${out}/omnix-work-styles.json`, JSON.stringify(info, null, 2));
  console.log(JSON.stringify(info, null, 2).slice(0, 12000));

  const sections = await page.evaluate(() =>
    [...document.querySelectorAll("section")]
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { cls: String(el.className).slice(0, 90), top: Math.round(r.top + scrollY), h: Math.round(r.height), text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 90) };
      })
      .filter((s) => s.h > 100),
  );
  console.log("work sections", JSON.stringify(sections, null, 2));
  fs.writeFileSync(`${out}/omnix-work-sections.json`, JSON.stringify(sections, null, 2));

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: `${out}/omnix-work-390-top.png` });
  await page.screenshot({ path: `${out}/omnix-work-390-full.png`, fullPage: true });
  await page.close();
}

// Home bottom desktop + mobile
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto("https://omnixstudio.co/", { waitUntil: "networkidle2", timeout: 120000 });
  await new Promise((r) => setTimeout(r, 5000));
  await page.keyboard.press("Escape").catch(() => {});
  const sections = await page.evaluate(() =>
    [...document.querySelectorAll("section,footer")].map((el) => {
      const r = el.getBoundingClientRect();
      return { tag: el.tagName, cls: String(el.className).slice(0, 80), top: Math.round(r.top + scrollY), h: Math.round(r.height), text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 100) };
    }),
  );
  fs.writeFileSync(`${out}/omnix-home-sections.json`, JSON.stringify(sections, null, 2));
  const footerTop = await page.evaluate(() => {
    const f = document.querySelector("footer");
    return f ? Math.round(f.getBoundingClientRect().top + scrollY) : null;
  });
  console.log("footerTop", footerTop);
  if (footerTop) {
    await page.evaluate((y) => window.scrollTo(0, y - 500), footerTop);
    await new Promise((r) => setTimeout(r, 1200));
    await page.screenshot({ path: `${out}/omnix-home-cta-footer-1440.png` });
    const info = await page.evaluate(analyze);
    fs.writeFileSync(`${out}/omnix-home-footer-styles.json`, JSON.stringify(info, null, 2));
    console.log("FOOTER STYLES", JSON.stringify(info, null, 2).slice(0, 9000));
  }

  const contact = await page.evaluate(() => {
    const headings = [...document.querySelectorAll("h2")];
    const el = headings.find((h) => (h.textContent || "").toLowerCase().includes("ready to build"));
    return el ? Math.round(el.getBoundingClientRect().top + scrollY) : null;
  });
  if (contact) {
    await page.evaluate((y) => window.scrollTo(0, y - 180), contact);
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: `${out}/omnix-home-contact-1440.png` });
  }

  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: `${out}/omnix-home-footer-390.png` });
  await page.close();
}

await browser.close();
console.log("saved", out);
