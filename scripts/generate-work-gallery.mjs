/**
 * Generates the project-detail artwork used on /work/[slug].
 *
 * These are original, hand-composed SVG mockups - not AI images and not stock
 * photography. They are intentionally illustrative, and every image carries a
 * visible CONCEPT label so it can never be mistaken for approved client work.
 *
 * Run: node scripts/generate-work-gallery.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "assets", "images");
fs.mkdirSync(OUT, { recursive: true });

const C = {
  ink: "#14141C",
  ink2: "#1C1C26",
  ink3: "#373743",
  paper: "#F6F5F9",
  paper2: "#EFE6FE",
  paper3: "#DED8EA",
  card: "#FFFFFF",
  coral: "#8221FC",
  coralSoft: "#B58CFD",
  violet: "#B58CFD",
  charcoal: "#1C1C26",
  white: "#FFFFFF",
};

const sans = "Arial, Helvetica, sans-serif";
const serif = "Georgia, 'Times New Roman', serif";

function grain(id = "grain") {
  return `<filter id="${id}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.55"/></feComponentTransfer>
    </filter>`;
}

function grainLayer(w, h, id = "grain", opacity = 0.07) {
  return `<rect width="${w}" height="${h}" filter="url(#${id})" opacity="${opacity}" style="mix-blend-mode:overlay"/>`;
}

function frame(w, h, fg, label = "SOSIAL / CONCEPT") {
  const pad = Math.round(Math.min(w, h) * 0.035);
  const tick = Math.round(Math.min(w, h) * 0.018);
  const lx = pad + tick + 14;
  const ly = pad + tick + 18;
  return `<g fill="none" stroke="${fg}" stroke-opacity="0.24" stroke-width="1.2">
      <rect x="${pad}" y="${pad}" width="${w - pad * 2}" height="${h - pad * 2}"/>
      <path d="M${pad} ${pad + tick} V${pad} H${pad + tick}"/>
      <path d="M${w - pad - tick} ${pad} H${w - pad} V${pad + tick}"/>
      <path d="M${w - pad} ${h - pad - tick} V${h - pad} H${w - pad - tick}"/>
      <path d="M${pad + tick} ${h - pad} H${pad} V${h - pad - tick}"/>
    </g>
    ${textEl(lx, ly, label, {
      size: Math.round(Math.min(w, h) * 0.014),
      fill: fg,
      opacity: 0.5,
      spacing: Math.round(Math.min(w, h) * 0.004),
    })}`;
}

function vertLabel(w, h, fg, text) {
  const s = Math.round(Math.min(w, h) * 0.013);
  return `<text transform="translate(${w - Math.round(w * 0.046)} ${h - Math.round(h * 0.06)}) rotate(-90)" text-anchor="end" fill="${fg}" opacity="0.42" font-family="${sans}" font-size="${s}" letter-spacing="${s * 0.22}">${text}</text>`;
}

function grid(w, h, color, cols = 12, opacity = 0.06) {
  const step = w / cols;
  let lines = "";
  for (let i = 1; i < cols; i++) {
    lines += `<line x1="${i * step}" y1="0" x2="${i * step}" y2="${h}"/>`;
  }
  const rows = Math.round(cols * (h / w));
  const rstep = h / rows;
  for (let i = 1; i < rows; i++) {
    lines += `<line x1="0" y1="${i * rstep}" x2="${w}" y2="${i * rstep}"/>`;
  }
  return `<g stroke="${color}" stroke-opacity="${opacity}" stroke-width="1">${lines}</g>`;
}

function textEl(x, y, content, opts = {}) {
  const {
    size = 24,
    fill = C.ink,
    opacity = 1,
    spacing = 0,
    weight = 400,
    font = sans,
    anchor = "start",
  } = opts;
  return `<text x="${x}" y="${y}" fill="${fill}" opacity="${opacity}" font-family="${font}" font-size="${size}" font-weight="${weight}" letter-spacing="${spacing}" text-anchor="${anchor}">${content}</text>`;
}

function rule(x1, y1, x2, y2, color = C.ink, opacity = 0.25, width = 1) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-opacity="${opacity}" stroke-width="${width}"/>`;
}

function copyLines(x, y, width, count, color = C.ink, opacity = 0.2, gap = 16) {
  return Array.from({ length: count })
    .map(
      (_, i) =>
        `<rect x="${x}" y="${y + i * gap}" width="${width * (0.68 + ((i * 17) % 30) / 100)}" height="3" rx="1.5" fill="${color}" opacity="${Math.max(0.06, opacity - i * 0.012)}"/>`,
    )
    .join("");
}

function svgDoc(w, h, body, { grainId = "grain", grainOpacity = 0.06 } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  <defs>${grain(grainId)}</defs>
  ${body}
  ${grainLayer(w, h, grainId, grainOpacity)}
</svg>`;
}

function browserFrame({
  x,
  y,
  w,
  h,
  bg = C.paper,
  chrome = C.paper3,
  fg = C.ink,
  url = "concept.studio",
  accent = C.coral,
  children,
}) {
  const bar = 54;
  return `<g>
    <rect x="${x + 10}" y="${y + 14}" width="${w}" height="${h}" rx="18" fill="${C.ink}" opacity="0.16"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${bg}" stroke="${C.ink}" stroke-opacity="0.18"/>
    <path d="M${x} ${y + 18} Q${x} ${y} ${x + 18} ${y} H${x + w - 18} Q${x + w} ${y} ${x + w} ${y + 18} V${y + bar} H${x} Z" fill="${chrome}"/>
    <circle cx="${x + 24}" cy="${y + 27}" r="5" fill="${accent}"/>
    <circle cx="${x + 42}" cy="${y + 27}" r="5" fill="${fg}" opacity="0.22"/>
    <circle cx="${x + 60}" cy="${y + 27}" r="5" fill="${fg}" opacity="0.22"/>
    <rect x="${x + 94}" y="${y + 15}" width="${w * 0.42}" height="24" rx="12" fill="${bg}" opacity="0.7"/>
    ${textEl(x + 108, y + 32, url, { size: 13, opacity: 0.42, spacing: 0.6 })}
    ${children}
  </g>`;
}

function northwindBoard() {
  const w = 1600;
  const h = 1200;
  const bg = C.paper;
  const fg = C.ink;
  const waves = [
    { y: 0.43, amp: 0.075, color: C.coral, width: 104, op: 0.96 },
    { y: 0.55, amp: 0.1, color: C.ink, width: 132, op: 0.92 },
    { y: 0.68, amp: 0.08, color: C.violet, width: 94, op: 0.8 },
    { y: 0.79, amp: 0.05, color: C.ink, width: 48, op: 0.42 },
  ];
  const paths = waves
    .map(
      (band, i) =>
        `<path d="M-40 ${h * band.y} C ${w * 0.2} ${h * (band.y - band.amp)}, ${w * 0.34} ${h * (band.y + band.amp)}, ${w * 0.55} ${h * band.y} S ${w * 0.85} ${h * (band.y - band.amp)}, ${w + 40} ${h * (band.y + band.amp * 0.2)}" fill="none" stroke="${band.color}" stroke-opacity="${band.op}" stroke-width="${band.width}" stroke-linecap="round"/>`,
    )
    .join("");

  const swatches = [C.coral, C.ink, C.violet, C.paper2]
    .map(
      (color, i) =>
        `<g transform="translate(${1080 + i * 95} 1018)">
          <rect width="76" height="76" rx="8" fill="${color}" stroke="${C.ink}" stroke-opacity="${color === C.ink ? 0.2 : 0.16}"/>
          ${textEl(0, 98, `0${i + 1}`, { size: 12, opacity: 0.42, spacing: 1.5 })}
        </g>`,
    )
    .join("");

  return svgDoc(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${bg}"/>
     ${grid(w, h, fg, 12, 0.045)}
     <rect x="0" y="0" width="${w * 0.34}" height="${h}" fill="${fg}" opacity="0.035"/>
     <circle cx="${w * 0.86}" cy="${h * 0.18}" r="${h * 0.15}" fill="${C.coral}" opacity="0.9"/>
     <circle cx="${w * 0.86}" cy="${h * 0.18}" r="${h * 0.085}" fill="${bg}" opacity="0.9"/>
     ${textEl(110, 154, "NORTHWIND", { size: 152, weight: 700, spacing: 3 })}
     ${textEl(116, 202, "ATHLETIC / IDENTITY SYSTEM", { size: 22, opacity: 0.5, spacing: 5.4 })}
     ${textEl(116, 284, "MOVE EARNED,", { size: 52, weight: 700, fill: C.coral, spacing: 1.5 })}
     ${textEl(116, 340, "NOT BOUGHT.", { size: 52, weight: 700, spacing: 1.5 })}
     ${paths}
     <rect x="1050" y="430" width="420" height="300" fill="${bg}" opacity="0.78"/>
     ${textEl(1078, 474, "THE IDEA", { size: 14, opacity: 0.4, spacing: 2.4 })}
     ${textEl(1078, 514, "One mark.", { size: 36, weight: 700 })}
     ${textEl(1078, 556, "Every surface.", { size: 36, weight: 700, fill: C.coral })}
     ${copyLines(1078, 596, 330, 5, C.ink, 0.26, 18)}
     ${rule(108, 930, 940, 930, C.ink, 0.25, 1.4)}
     ${textEl(108, 974, "01 / STRATEGY", { size: 14, opacity: 0.45, spacing: 2.2 })}
     ${textEl(348, 974, "02 / IDENTITY", { size: 14, opacity: 0.45, spacing: 2.2 })}
     ${textEl(620, 974, "03 / PACKAGING", { size: 14, opacity: 0.45, spacing: 2.2 })}
     ${textEl(108, 1040, "A single structural idea, built to survive", { size: 30, weight: 700 })}
     ${textEl(108, 1080, "from a shoebox to a six-second ad.", { size: 30, weight: 700 })}
     ${swatches}
     ${textEl(1080, 1160, "PALETTE / FOUR FIXED TONES", { size: 12, opacity: 0.4, spacing: 1.8 })}
     ${frame(w, h, fg, "CONCEPT / NORTHWIND / IDENTITY 01")}
     ${vertLabel(w, h, fg, "BRAND SYSTEM / 2026")}`,
  );
}

function northwindCampaign() {
  const w = 1600;
  const h = 1200;
  const bg = C.charcoal;
  const fg = C.paper;
  const posters = [
    { x: 132, y: 268, fill: C.paper, ink: C.ink, accent: C.coral, label: "SS26 / MOVE", wave: C.ink },
    { x: 560, y: 220, fill: C.coral, ink: C.ink, accent: C.paper, label: "SS26 / EARN", wave: C.ink },
    { x: 988, y: 292, fill: C.ink2, ink: C.paper, accent: C.coral, label: "SS26 / REPEAT", wave: C.violet },
  ];
  const posterMarkup = posters
    .map(
      (p, i) => `<g transform="translate(${p.x} ${p.y})">
        <rect x="10" y="14" width="390" height="660" rx="3" fill="${C.ink}" opacity="0.55"/>
        <rect width="390" height="660" fill="${p.fill}"/>
        <path d="M-20 250 C 80 180, 170 320, 260 238 S 360 180, 420 244" fill="none" stroke="${p.wave}" stroke-opacity="0.9" stroke-width="${i === 1 ? 62 : 48}" stroke-linecap="round"/>
        <path d="M-20 310 C 90 250, 180 376, 290 296 S 380 250, 430 300" fill="none" stroke="${p.accent}" stroke-opacity="0.9" stroke-width="18" stroke-linecap="round"/>
        <circle cx="300" cy="136" r="62" fill="${p.accent}" opacity="0.9"/>
        <circle cx="300" cy="136" r="34" fill="${p.fill}"/>
        ${textEl(28, 48, "NORTHWIND", { size: 25, weight: 700, spacing: 2.4, fill: p.ink })}
        ${textEl(28, 70, "ATHLETIC / SS26", { size: 10, spacing: 2, fill: p.ink, opacity: 0.55 })}
        ${textEl(28, 540, p.label, { size: 31, weight: 700, fill: p.ink, spacing: 0.5 })}
        ${textEl(28, 578, "TRAIN / RECOVER / REPEAT", { size: 11, fill: p.ink, opacity: 0.55, spacing: 1.6 })}
        ${rule(28, 610, 362, 610, p.ink, 0.28, 1)}
        ${textEl(28, 638, "CAMPAIGN CONCEPT / 0" + (i + 1), { size: 10, fill: p.ink, opacity: 0.45, spacing: 1.2 })}
      </g>`,
    )
    .join("");

  return svgDoc(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${bg}"/>
     ${grid(w, h, fg, 12, 0.04)}
     <circle cx="1440" cy="140" r="220" fill="${C.coral}" opacity="0.08"/>
     ${textEl(132, 116, "NORTHWIND / CAMPAIGN SYSTEM", { size: 17, fill: C.paper, opacity: 0.52, spacing: 3.2 })}
     ${textEl(132, 176, "ONE IDEA.", { size: 66, weight: 700, fill: C.paper })}
     ${textEl(132, 238, "THREE FORMATS.", { size: 66, weight: 700, fill: C.coral })}
     ${textEl(1210, 120, "CONCEPT / 03", { size: 13, fill: C.paper, opacity: 0.4, spacing: 2 })}
     ${posterMarkup}
     ${rule(132, 1014, 1468, 1014, C.paper, 0.16, 1)}
     ${textEl(132, 1052, "Poster system / print + social cutdowns", { size: 17, fill: C.paper, opacity: 0.55 })}
     ${textEl(132, 1082, "The wave mark stays fixed; the crop, colour and headline change with the format.", { size: 13, fill: C.paper, opacity: 0.32 })}
     ${frame(w, h, fg, "CONCEPT / NORTHWIND / CAMPAIGN 02")}
     ${vertLabel(w, h, fg, "PRINT / SOCIAL / RETAIL")}`,
  );
}

function halcyonFeed() {
  const w = 1600;
  const h = 1200;
  const bg = C.paper2;
  const fg = C.ink;
  const tile = 312;
  const gap = 18;
  const startX = 152;
  const startY = 306;
  const palette = [C.paper, C.ink, C.coral, C.paper2, C.violet, C.paper, C.ink, C.coralSoft, C.paper2];
  const tiles = palette
    .map((color, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = startX + col * (tile + gap);
      const y = startY + row * (tile + gap);
      const dark = color === C.ink || color === C.violet || color === C.coral;
      const ink = dark ? C.paper : C.ink;
      const accent = dark ? C.coralSoft : C.coral;
      const label = ["BARRIER", "TEXTURE", "RENEWAL", "SPF / 01", "WATER", "PROOF", "NIGHT", "LIGHT", "RITUAL"][i];
      const art =
        i % 4 === 0
          ? `<circle cx="${x + tile / 2}" cy="${y + tile * 0.44}" r="${tile * 0.22}" fill="none" stroke="${ink}" stroke-width="2" opacity="0.55"/><circle cx="${x + tile / 2}" cy="${y + tile * 0.44}" r="${tile * 0.1}" fill="${accent}"/>`
          : i % 4 === 1
            ? `<path d="M${x + 34} ${y + 220} C ${x + 100} ${y + 40}, ${x + 190} ${y + 286}, ${x + 278} ${y + 100}" fill="none" stroke="${ink}" stroke-opacity="0.55" stroke-width="2"/><path d="M${x + 34} ${y + 250} C ${x + 110} ${y + 100}, ${x + 210} ${y + 310}, ${x + 278} ${y + 150}" fill="none" stroke="${accent}" stroke-opacity="0.9" stroke-width="7"/>`
            : i % 4 === 2
              ? `<rect x="${x + 86}" y="${y + 76}" width="${tile - 172}" height="${tile - 152}" fill="none" stroke="${ink}" stroke-opacity="0.4"/><circle cx="${x + tile / 2}" cy="${y + tile / 2}" r="${tile * 0.15}" fill="${accent}"/>`
              : `<path d="M${x + 46} ${y + 218} Q ${x + tile / 2} ${y + 58} ${x + tile - 46} ${y + 218}" fill="none" stroke="${ink}" stroke-opacity="0.42" stroke-width="1.5"/><path d="M${x + 92} ${y + 218} Q ${x + tile / 2} ${y + 116} ${x + tile - 92} ${y + 218}" fill="none" stroke="${accent}" stroke-opacity="0.75" stroke-width="1.5"/>`;
      return `<g>
        <rect x="${x}" y="${y}" width="${tile}" height="${tile}" fill="${color}"/>
        ${art}
        ${textEl(x + 20, y + 30, `0${i + 1} / ${label}`, { size: 9, fill: ink, opacity: 0.58, spacing: 1.5 })}
        ${textEl(x + 20, y + tile - 22, "HALCYON / SKIN", { size: 9, fill: ink, opacity: 0.4, spacing: 1.2 })}
      </g>`;
    })
    .join("");

  return svgDoc(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${bg}"/>
     ${grid(w, h, fg, 12, 0.035)}
     <rect x="0" y="0" width="${w}" height="212" fill="${C.paper}" opacity="0.72"/>
     <circle cx="142" cy="112" r="48" fill="${C.ink}"/>
     ${textEl(142, 122, "H", { size: 44, fill: C.coral, weight: 700, anchor: "middle" })}
     ${textEl(216, 92, "HALCYON / SKIN", { size: 22, weight: 700, spacing: 1.6 })}
     ${textEl(216, 122, "Clinical, not cold.", { size: 14, opacity: 0.5 })}
     ${textEl(216, 150, "FEED SYSTEM / CONCEPT", { size: 10, opacity: 0.35, spacing: 1.6 })}
     <rect x="1220" y="78" width="210" height="52" rx="26" fill="${C.coral}"/>
     ${textEl(1325, 111, "FOLLOW THE WORK", { size: 10, fill: C.ink, weight: 700, spacing: 1.5, anchor: "middle" })}
     ${textEl(1230, 44, "01 / SOCIAL", { size: 12, opacity: 0.38, spacing: 2.2 })}
     ${tiles}
     ${rule(152, 1052, 1448, 1052, fg, 0.2, 1)}
     ${textEl(152, 1094, "One ingredient. One claim. One proof point.", { size: 27, weight: 700 })}
     ${textEl(152, 1126, "A repeatable feed system that teaches before it sells.", { size: 13, opacity: 0.48 })}
     ${frame(w, h, fg, "CONCEPT / HALCYON / FEED 01")}
     ${vertLabel(w, h, fg, "SOCIAL CONTENT SYSTEM")}`,
  );
}

function halcyonStories() {
  const w = 1600;
  const h = 1200;
  const bg = C.ink;
  const fg = C.paper;
  const stories = [
    { x: 148, y: 214, rot: -3, fill: C.paper, ink: C.ink, accent: C.coral, label: "01 / BARRIER", title: "THE SKIN YOU LIVE IN" },
    { x: 588, y: 256, rot: 0, fill: C.coral, ink: C.ink, accent: C.paper, label: "02 / HYDRATION", title: "WATER, HELD BETTER" },
    { x: 1028, y: 214, rot: 3, fill: C.ink2, ink: C.paper, accent: C.coralSoft, label: "03 / RENEWAL", title: "A SLOWER CELL TURN" },
  ];
  const cards = stories
    .map(
      (s, i) => `<g transform="rotate(${s.rot} ${s.x + 190} ${s.y + 340})">
        <rect x="${s.x + 8}" y="${s.y + 12}" width="380" height="684" rx="26" fill="${C.ink}" opacity="0.55"/>
        <rect x="${s.x}" y="${s.y}" width="380" height="684" rx="24" fill="${s.fill}" stroke="${s.ink}" stroke-opacity="0.15"/>
        ${textEl(s.x + 26, s.y + 38, "HALCYON", { size: 13, weight: 700, fill: s.ink, spacing: 2 })}
        ${textEl(s.x + 354, s.y + 38, "01 / 03", { size: 10, fill: s.ink, opacity: 0.45, anchor: "end", spacing: 1.4 })}
        <circle cx="${s.x + 190}" cy="${s.y + 258}" r="${112 - i * 10}" fill="none" stroke="${s.ink}" stroke-opacity="0.25" stroke-width="1.4"/>
        <circle cx="${s.x + 190}" cy="${s.y + 258}" r="${70 - i * 6}" fill="none" stroke="${s.accent}" stroke-opacity="0.8" stroke-width="1.4"/>
        <circle cx="${s.x + 190}" cy="${s.y + 258}" r="${24 - i * 4}" fill="${s.accent}"/>
        <path d="M${s.x + 40} ${s.y + 382} Q ${s.x + 190} ${s.y + 320} ${s.x + 340} ${s.y + 382}" fill="none" stroke="${s.ink}" stroke-opacity="0.22" stroke-width="1"/>
        ${textEl(s.x + 28, s.y + 436, s.label, { size: 10, fill: s.ink, opacity: 0.5, spacing: 1.8 })}
        ${textEl(s.x + 28, s.y + 478, s.title.split(" ").slice(0, 2).join(" "), { size: 27, weight: 700, fill: s.ink })}
        ${textEl(s.x + 28, s.y + 512, s.title.split(" ").slice(2).join(" "), { size: 27, weight: 700, fill: s.ink })}
        ${copyLines(s.x + 28, s.y + 544, 260, 3, s.ink, 0.25, 15)}
        ${textEl(s.x + 28, s.y + 634, "SWIPE TO READ", { size: 9, fill: s.ink, opacity: 0.45, spacing: 1.5 })}
        ${textEl(s.x + 320, s.y + 634, "↗", { size: 18, fill: s.accent })}
      </g>`,
    )
    .join("");

  return svgDoc(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${bg}"/>
     ${grid(w, h, fg, 12, 0.04)}
     <circle cx="1380" cy="156" r="260" fill="${C.coral}" opacity="0.07"/>
     ${textEl(148, 100, "HALCYON / STORY SYSTEM", { size: 15, fill: C.paper, opacity: 0.45, spacing: 2.6 })}
     ${textEl(148, 164, "SOUND OFF.", { size: 58, weight: 700 })}
     ${textEl(148, 218, "STILL CLEAR.", { size: 58, weight: 700, fill: C.coral })}
     ${textEl(1200, 100, "CONCEPT / 03 FRAMES", { size: 11, fill: C.paper, opacity: 0.32, spacing: 2 })}
     ${cards}
     ${rule(148, 1014, 1452, 1014, C.paper, 0.16, 1)}
     ${textEl(148, 1054, "Every story earns attention in the first frame.", { size: 24, weight: 700 })}
     ${textEl(148, 1084, "Ingredient callouts, product texture and one clear takeaway.", { size: 13, fill: C.paper, opacity: 0.45 })}
     ${frame(w, h, fg, "CONCEPT / HALCYON / STORY 02")}
     ${vertLabel(w, h, fg, "SOCIAL / VIDEO / STORY")}`,
  );
}

function tessellateDesktop() {
  const w = 1600;
  const h = 1200;
  const bg = C.paper2;
  const fg = C.ink;
  const bx = 92;
  const by = 164;
  const bw = 1416;
  const bh = 960;
  const site = `<g>
    <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="${C.paper}"/>
    ${textEl(bx + 54, by + 112, "TESSELLATE", { size: 24, weight: 700, spacing: 2.4 })}
    ${textEl(bx + 640, by + 110, "WORK", { size: 11, opacity: 0.45, spacing: 1.8 })}
    ${textEl(bx + 730, by + 110, "STUDIO", { size: 11, opacity: 0.45, spacing: 1.8 })}
    ${textEl(bx + 832, by + 110, "CONTACT", { size: 11, opacity: 0.45, spacing: 1.8 })}
    <circle cx="${bx + bw - 64}" cy="${by + 104}" r="9" fill="${C.coral}"/>
    ${rule(bx + 54, by + 140, bx + bw - 54, by + 140, C.ink, 0.16, 1)}
    ${textEl(bx + 54, by + 256, "STONE /", { size: 94, weight: 700, spacing: -2 })}
    ${textEl(bx + 54, by + 348, "LIGHT /", { size: 94, weight: 700, spacing: -2, fill: C.violet })}
    ${textEl(bx + 54, by + 440, "SPACE.", { size: 94, weight: 700, spacing: -2 })}
    ${textEl(bx + 800, by + 278, "A practice built around the", { size: 15, opacity: 0.48 })}
    ${textEl(bx + 800, by + 302, "quiet structure of a place.", { size: 15, opacity: 0.48 })}
    <rect x="${bx + 800}" y="${by + 334}" width="148" height="38" rx="19" fill="${C.ink}"/>
    ${textEl(bx + 874, by + 358, "VIEW PROJECTS", { size: 9, fill: C.paper, spacing: 1.4, anchor: "middle" })}
    ${rule(bx + 54, by + 490, bx + bw - 54, by + 490, C.ink, 0.14, 1)}
    <g>
      <rect x="${bx + 54}" y="${by + 530}" width="396" height="288" fill="${C.paper2}"/>
      <rect x="${bx + 88}" y="${by + 568}" width="120" height="216" fill="${C.ink}" opacity="0.9"/>
      <rect x="${bx + 228}" y="${by + 646}" width="170" height="138" fill="${C.coral}"/>
      <path d="M${bx + 88} ${by + 568} L${bx + 208} ${by + 568} L${bx + 208} ${by + 700} L${bx + 88} ${by + 700} Z" fill="none" stroke="${C.paper}" stroke-opacity="0.5"/>
      ${textEl(bx + 54, by + 850, "HOUSE / NO. 04", { size: 11, opacity: 0.48, spacing: 1.4 })}
    </g>
    <g>
      <rect x="${bx + 484}" y="${by + 530}" width="396" height="288" fill="${C.paper3}"/>
      <path d="M${bx + 518} ${by + 796} V${by + 648} Q${bx + 682} ${by + 548} ${bx + 846} ${by + 648} V${by + 796} Z" fill="${C.ink}" opacity="0.9"/>
      <circle cx="${bx + 682}" cy="${by + 694}" r="42" fill="${C.paper}"/>
      ${textEl(bx + 484, by + 850, "PAVILION / NO. 11", { size: 11, opacity: 0.48, spacing: 1.4 })}
    </g>
    <g>
      <rect x="${bx + 914}" y="${by + 530}" width="448" height="288" fill="${C.ink}"/>
      <rect x="${bx + 952}" y="${by + 568}" width="372" height="212" fill="none" stroke="${C.paper}" stroke-opacity="0.2"/>
      <path d="M${bx + 952} ${by + 780} L${bx + 1090} ${by + 620} L${bx + 1180} ${by + 716} L${bx + 1324} ${by + 580}" fill="none" stroke="${C.coral}" stroke-width="3"/>
      <circle cx="${bx + 1180}" cy="${by + 716}" r="7" fill="${C.coral}"/>
      ${textEl(bx + 914, by + 850, "COMPETITION / NO. 02", { size: 11, fill: C.paper, opacity: 0.5, spacing: 1.4 })}
    </g>
    ${textEl(bx + 54, by + 920, "SELECTED PROJECTS / 2026", { size: 10, opacity: 0.35, spacing: 1.8 })}
    ${textEl(bx + bw - 54, by + 920, "01 / 06", { size: 10, opacity: 0.35, spacing: 1.5, anchor: "end" })}
  </g>`;

  return svgDoc(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${bg}"/>
     ${grid(w, h, fg, 12, 0.04)}
     <circle cx="1440" cy="190" r="190" fill="${C.violet}" opacity="0.08"/>
     ${browserFrame({
       x: bx,
       y: by,
       w: bw,
       h: bh,
       bg: C.paper,
       chrome: C.paper3,
       fg,
       url: "tessellate.studio / work",
       accent: C.coral,
       children: site,
     })}
     ${textEl(92, 108, "TESSELLATE / DIGITAL HOME", { size: 14, opacity: 0.45, spacing: 2.4 })}
     ${textEl(1500, 108, "CONCEPT / WEB 01", { size: 10, opacity: 0.35, spacing: 1.8, anchor: "end" })}
     ${textEl(92, 1168, "The work takes the screen. The interface steps back.", { size: 18, weight: 700 })}
     ${frame(w, h, fg, "CONCEPT / TESSELLATE / DESKTOP")}`,
  );
}

function tessellateResponsive() {
  const w = 1600;
  const h = 1200;
  const bg = C.paper;
  const fg = C.ink;
  const phone1 = `<g transform="translate(122 196) rotate(-2 180 380)">
    <rect x="8" y="12" width="360" height="748" rx="38" fill="${C.ink}" opacity="0.16"/>
    <rect width="360" height="748" rx="34" fill="${C.ink2}" stroke="${C.ink}" stroke-opacity="0.2"/>
    <rect x="14" y="14" width="332" height="720" rx="24" fill="${C.ink}"/>
    <rect x="132" y="26" width="96" height="18" rx="9" fill="${C.paper}" opacity="0.2"/>
    ${textEl(40, 92, "TESS", { size: 20, weight: 700, fill: C.paper, spacing: 1.6 })}
    ${textEl(288, 92, "MENU", { size: 8, fill: C.paper, opacity: 0.5, spacing: 1.2, anchor: "end" })}
    ${textEl(40, 184, "A PRACTICE", { size: 38, weight: 700, fill: C.paper, spacing: -0.6 })}
    ${textEl(40, 228, "OF QUIET", { size: 38, weight: 700, fill: C.paper, spacing: -0.6 })}
    ${textEl(40, 272, "STRUCTURES.", { size: 38, weight: 700, fill: C.coral, spacing: -0.6 })}
    <rect x="40" y="324" width="280" height="222" fill="${C.paper3}"/>
    <rect x="70" y="362" width="112" height="150" fill="${C.ink}" opacity="0.9"/>
    <rect x="194" y="422" width="96" height="90" fill="${C.coral}"/>
    ${textEl(40, 586, "HOUSE / 04", { size: 9, fill: C.paper, opacity: 0.4, spacing: 1.2 })}
    ${rule(40, 614, 320, 614, C.paper, 0.14, 1)}
    ${textEl(40, 652, "SELECTED PROJECTS", { size: 9, fill: C.paper, opacity: 0.45, spacing: 1.4 })}
    ${copyLines(40, 676, 260, 3, C.paper, 0.2, 16)}
  </g>`;

  const phone2 = `<g transform="translate(560 248) rotate(2 180 380)">
    <rect x="8" y="12" width="360" height="748" rx="38" fill="${C.ink}" opacity="0.16"/>
    <rect width="360" height="748" rx="34" fill="${C.paper}" stroke="${C.ink}" stroke-opacity="0.2"/>
    <rect x="14" y="14" width="332" height="720" rx="24" fill="${C.paper}"/>
    <rect x="132" y="26" width="96" height="18" rx="9" fill="${C.ink}" opacity="0.12"/>
    ${textEl(40, 94, "TESS / PROJECT", { size: 10, opacity: 0.45, spacing: 1.4 })}
    ${textEl(40, 170, "PAVILION", { size: 40, weight: 700, spacing: -0.5 })}
    ${textEl(40, 216, "IN THE PINES", { size: 40, weight: 700, fill: C.violet, spacing: -0.5 })}
    <rect x="40" y="268" width="280" height="252" fill="${C.paper2}"/>
    <path d="M70 500 V352 Q180 282 290 352 V500 Z" fill="${C.ink}" opacity="0.92"/>
    <circle cx="180" cy="390" r="36" fill="${C.paper}"/>
    ${copyLines(40, 570, 280, 3, C.ink, 0.3, 17)}
    ${rule(40, 646, 320, 646, C.ink, 0.16, 1)}
    ${textEl(40, 688, "NEXT / COMPETITION", { size: 9, opacity: 0.4, spacing: 1.4 })}
    ${textEl(40, 716, "A courtyard with no centre.", { size: 14, weight: 700 })}
  </g>`;

  const tablet = `<g transform="translate(1030 236)">
    <rect x="10" y="14" width="448" height="670" rx="22" fill="${C.ink}" opacity="0.14"/>
    <rect width="448" height="670" rx="20" fill="${C.paper2}" stroke="${C.ink}" stroke-opacity="0.16"/>
    <rect x="18" y="18" width="412" height="634" fill="${C.paper}"/>
    ${textEl(42, 70, "TESSELLATE", { size: 16, weight: 700, spacing: 1.8 })}
    ${textEl(300, 70, "WORK / STUDIO", { size: 8, opacity: 0.42, spacing: 1.2 })}
    ${rule(42, 96, 406, 96, C.ink, 0.16, 1)}
    ${textEl(42, 168, "THE WORK", { size: 38, weight: 700 })}
    ${textEl(42, 210, "IS THE ARGUMENT.", { size: 38, weight: 700, fill: C.coral })}
    <rect x="42" y="252" width="172" height="226" fill="${C.paper2}"/>
    <path d="M64 454 V330 Q128 274 192 330 V454 Z" fill="${C.ink}" opacity="0.9"/>
    <rect x="232" y="252" width="174" height="108" fill="${C.violet}" opacity="0.8"/>
    <rect x="232" y="378" width="174" height="100" fill="${C.paper3}"/>
    <circle cx="319" cy="428" r="28" fill="${C.coral}"/>
    ${copyLines(42, 516, 340, 4, C.ink, 0.26, 18)}
    ${rule(42, 600, 406, 600, C.ink, 0.16, 1)}
    ${textEl(42, 630, "SELECTED / 06", { size: 8, opacity: 0.35, spacing: 1.2 })}
  </g>`;

  return svgDoc(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${bg}"/>
     ${grid(w, h, fg, 12, 0.035)}
     <circle cx="1320" cy="1000" r="240" fill="${C.violet}" opacity="0.06"/>
     ${textEl(122, 104, "TESSELLATE / RESPONSIVE SYSTEM", { size: 14, opacity: 0.45, spacing: 2.2 })}
     ${textEl(1478, 104, "CONCEPT / WEB 02", { size: 10, opacity: 0.35, spacing: 1.7, anchor: "end" })}
     ${phone1}
     ${phone2}
     ${tablet}
     ${textEl(122, 1058, "Same discipline, every screen.", { size: 30, weight: 700 })}
     ${textEl(122, 1094, "Project templates that stay calm as the viewport changes.", { size: 14, opacity: 0.48 })}
     ${frame(w, h, fg, "CONCEPT / TESSELLATE / RESPONSIVE")}
     ${vertLabel(w, h, fg, "MOBILE / TABLET / DESKTOP")}`,
  );
}

function orbitAds() {
  const w = 1600;
  const h = 1200;
  const bg = C.ink2;
  const fg = C.paper;
  const cards = [
    { x: 106, fill: C.paper, ink: C.ink, accent: C.coral, kicker: "01 / SPEED", title1: "MOVE", title2: "FASTER.", body: "Business banking that keeps up with the week you actually had.", cta: "OPEN AN ACCOUNT" },
    { x: 580, fill: C.coral, ink: C.ink, accent: C.paper, kicker: "02 / CLARITY", title1: "NO", title2: "SURPRISES.", body: "Clear pricing. A real person on the line. No theatre.", cta: "SEE THE TERMS" },
    { x: 1054, fill: C.ink, ink: C.paper, accent: C.coral, kicker: "03 / SUPPORT", title1: "A REAL", title2: "PERSON.", body: "Support that answers before lunch, not after the weekend.", cta: "TALK TO US" },
  ];
  const ads = cards
    .map(
      (card, i) => `<g transform="translate(${card.x} 286)">
        <rect x="10" y="14" width="420" height="590" rx="18" fill="${C.ink}" opacity="0.5"/>
        <rect width="420" height="590" rx="16" fill="${card.fill}" stroke="${C.ink}" stroke-opacity="0.15"/>
        ${textEl(30, 44, card.kicker, { size: 9, fill: card.ink, opacity: 0.55, spacing: 1.6 })}
        ${textEl(390, 44, "CONCEPT", { size: 8, fill: card.ink, opacity: 0.35, spacing: 1.4, anchor: "end" })}
        <circle cx="334" cy="134" r="74" fill="${card.accent}" opacity="${i === 1 ? 0.9 : 0.95}"/>
        <circle cx="334" cy="134" r="42" fill="${card.fill}"/>
        ${textEl(30, 224, card.title1, { size: 62, weight: 700, fill: card.ink, spacing: -1.5 })}
        ${textEl(30, 292, card.title2, { size: 62, weight: 700, fill: i === 1 ? C.ink : card.accent, spacing: -1.5 })}
        <rect x="30" y="334" width="290" height="3" fill="${card.ink}" opacity="0.22"/>
        ${textEl(30, 376, card.body.slice(0, 31), { size: 15, fill: card.ink, opacity: 0.62 })}
        ${textEl(30, 402, card.body.slice(31, 62), { size: 15, fill: card.ink, opacity: 0.62 })}
        ${textEl(30, 428, card.body.slice(62), { size: 15, fill: card.ink, opacity: 0.62 })}
        <rect x="30" y="504" width="206" height="44" rx="22" fill="${card.ink}"/>
        ${textEl(133, 531, card.cta, { size: 9, fill: card.fill, spacing: 1.4, anchor: "middle", weight: 700 })}
        ${textEl(30, 574, "ORBIT / BUSINESS BANKING", { size: 8, fill: card.ink, opacity: 0.4, spacing: 1.2 })}
      </g>`,
    )
    .join("");

  return svgDoc(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${bg}"/>
     ${grid(w, h, fg, 12, 0.04)}
     <circle cx="1400" cy="190" r="250" fill="${C.coral}" opacity="0.06"/>
     ${textEl(106, 104, "ORBIT / ACQUISITION CREATIVE", { size: 14, fill: C.paper, opacity: 0.48, spacing: 2.4 })}
     ${textEl(106, 172, "THREE ARGUMENTS.", { size: 56, weight: 700, fill: C.paper })}
     ${textEl(106, 228, "NOT THREE COLOURS.", { size: 56, weight: 700, fill: C.coral })}
     ${textEl(1494, 104, "CONCEPT / ADS 01", { size: 10, fill: C.paper, opacity: 0.35, spacing: 1.8, anchor: "end" })}
     ${ads}
     ${rule(106, 936, 1494, 936, C.paper, 0.16, 1)}
     ${textEl(106, 978, "Proposition tests, not decoration.", { size: 27, weight: 700 })}
     ${textEl(106, 1010, "Each route makes a distinct, honest argument about what the product is for.", { size: 13, fill: C.paper, opacity: 0.45 })}
     ${textEl(106, 1080, "No live campaign, spend or performance data is represented.", { size: 10, fill: C.paper, opacity: 0.3, spacing: 0.6 })}
     ${frame(w, h, fg, "CONCEPT / ORBIT / CREATIVE 01")}
     ${vertLabel(w, h, fg, "PAID SOCIAL / SEARCH")}`,
  );
}

function orbitMeasurement() {
  const w = 1600;
  const h = 1200;
  const bg = C.ink;
  const fg = C.paper;
  const stages = [
    { label: "REACH", detail: "Who saw the argument", x: 128 },
    { label: "INTENT", detail: "Who explored the offer", x: 478 },
    { label: "QUALIFIED", detail: "Who fits the model", x: 828 },
    { label: "APPLICATION", detail: "Who starts the process", x: 1178 },
  ];
  const stageMarkup = stages
    .map(
      (stage, i) => `<g>
        <rect x="${stage.x}" y="432" width="286" height="168" rx="14" fill="${C.paper}" opacity="0.045" stroke="${C.paper}" stroke-opacity="0.14"/>
        ${textEl(stage.x + 22, 470, `0${i + 1}`, { size: 10, fill: C.coral, opacity: 0.9, spacing: 1.4 })}
        ${textEl(stage.x + 22, 516, stage.label, { size: 20, weight: 700, fill: C.paper, spacing: 0.4 })}
        ${textEl(stage.x + 22, 548, stage.detail, { size: 11, fill: C.paper, opacity: 0.42 })}
        <rect x="${stage.x + 22}" y="568" width="220" height="3" rx="1.5" fill="${C.paper}" opacity="0.12"/>
        <rect x="${stage.x + 22}" y="568" width="${72 + i * 28}" height="3" rx="1.5" fill="${i === 2 ? C.coral : C.paper}" opacity="${i === 2 ? 0.9 : 0.32}"/>
      </g>`,
    )
    .join("");
  const arrows = stages
    .slice(0, 3)
    .map(
      (stage) => `<g>
        <line x1="${stage.x + 286 + 8}" y1="516" x2="${stage.x + 342}" y2="516" stroke="${C.paper}" stroke-opacity="0.2" stroke-dasharray="4 6"/>
        <path d="M${stage.x + 342} 516 l-9 -5 v10 z" fill="${C.paper}" opacity="0.3"/>
      </g>`,
    )
    .join("");

  return svgDoc(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${bg}"/>
     ${grid(w, h, fg, 12, 0.04)}
     <circle cx="1370" cy="190" r="280" fill="${C.coral}" opacity="0.05"/>
     ${textEl(128, 104, "ORBIT / MEASUREMENT PLAN", { size: 14, fill: C.paper, opacity: 0.48, spacing: 2.4 })}
     ${textEl(128, 174, "MEASURE THE", { size: 58, weight: 700, fill: C.paper })}
     ${textEl(128, 232, "DECISION.", { size: 58, weight: 700, fill: C.coral })}
     ${textEl(1490, 104, "CONCEPT / PLAN 02", { size: 10, fill: C.paper, opacity: 0.35, spacing: 1.8, anchor: "end" })}
     ${stageMarkup}
     ${arrows}
     <rect x="128" y="650" width="1336" height="248" rx="18" fill="${C.paper}" opacity="0.045" stroke="${C.paper}" stroke-opacity="0.12"/>
     ${textEl(160, 696, "PRIMARY MEASURE", { size: 10, fill: C.coral, opacity: 0.9, spacing: 1.8 })}
     ${textEl(160, 746, "Qualified application", { size: 36, weight: 700, fill: C.paper })}
     ${textEl(160, 788, "A form fill only counts when it matches the agreed qualification criteria.", { size: 14, fill: C.paper, opacity: 0.48 })}
     ${rule(160, 818, 1432, 818, C.paper, 0.13, 1)}
     ${textEl(160, 856, "OWNER / SALES + MEDIA", { size: 10, fill: C.paper, opacity: 0.4, spacing: 1.4 })}
     ${textEl(640, 856, "CADENCE / WEEKLY", { size: 10, fill: C.paper, opacity: 0.4, spacing: 1.4 })}
     ${textEl(1120, 856, "SOURCE / CRM", { size: 10, fill: C.paper, opacity: 0.4, spacing: 1.4 })}
     ${textEl(128, 950, "A measurement framework is not a result.", { size: 25, weight: 700 })}
     ${textEl(128, 984, "No performance figures, spend or client data are represented here.", { size: 13, fill: C.paper, opacity: 0.42 })}
     ${frame(w, h, fg, "CONCEPT / ORBIT / MEASUREMENT")}
     ${vertLabel(w, h, fg, "TRACKING / REPORTING / DECISIONS")}`,
  );
}

function fieldnoteSpread() {
  const w = 1600;
  const h = 1200;
  const bg = C.paper2;
  const fg = C.ink;
  const spreadX = 104;
  const spreadY = 128;
  const spreadW = 1392;
  const spreadH = 900;
  const pageW = spreadW / 2;

  return svgDoc(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${bg}"/>
     ${grid(w, h, fg, 12, 0.035)}
     ${textEl(104, 90, "FIELDNOTE / EDITORIAL SPREAD", { size: 14, opacity: 0.45, spacing: 2.2 })}
     ${textEl(1496, 90, "CONCEPT / PRINT 01", { size: 10, opacity: 0.35, spacing: 1.8, anchor: "end" })}
     <rect x="${spreadX + 12}" y="${spreadY + 16}" width="${spreadW}" height="${spreadH}" fill="${C.ink}" opacity="0.14"/>
     <rect x="${spreadX}" y="${spreadY}" width="${spreadW}" height="${spreadH}" fill="${C.paper}"/>
     <line x1="${spreadX + pageW}" y1="${spreadY}" x2="${spreadX + pageW}" y2="${spreadY + spreadH}" stroke="${C.ink}" stroke-opacity="0.16"/>
     <g>
       ${textEl(spreadX + 54, spreadY + 58, "FIELDNOTE", { size: 18, weight: 700, spacing: 2.4 })}
       ${textEl(spreadX + 54, spreadY + 82, "ISSUE 04 / LAND & CRAFT", { size: 9, opacity: 0.4, spacing: 1.5 })}
       ${rule(spreadX + 54, spreadY + 112, spreadX + pageW - 54, spreadY + 112, C.ink, 0.16, 1)}
       ${textEl(spreadX + 54, spreadY + 218, "The long", { size: 78, font: serif, spacing: -1.4 })}
       ${textEl(spreadX + 54, spreadY + 292, "way home", { size: 78, font: serif, spacing: -1.4, fill: C.coral })}
       ${textEl(spreadX + 54, spreadY + 350, "A study of return, repair and the", { size: 15, opacity: 0.55 })}
       ${textEl(spreadX + 54, spreadY + 374, "things we choose to keep.", { size: 15, opacity: 0.55 })}
       ${copyLines(spreadX + 54, spreadY + 426, 514, 5, C.ink, 0.26, 20)}
       ${textEl(spreadX + 54, spreadY + 552, "WORDS / M. ELLIS", { size: 8, opacity: 0.4, spacing: 1.3 })}
       ${copyLines(spreadX + 54, spreadY + 590, 514, 8, C.ink, 0.2, 18)}
       ${textEl(spreadX + 54, spreadY + 800, "12", { size: 13, opacity: 0.4, spacing: 1 })}
       ${textEl(spreadX + pageW - 54, spreadY + 800, "FIELDNOTE / 04", { size: 8, opacity: 0.3, spacing: 1.3, anchor: "end" })}
     </g>
     <g>
       <rect x="${spreadX + pageW}" y="${spreadY}" width="${pageW}" height="${spreadH}" fill="${C.paper2}"/>
       <circle cx="${spreadX + pageW + pageW * 0.5}" cy="${spreadY + spreadH * 0.4}" r="${pageW * 0.3}" fill="${C.ink}"/>
       <circle cx="${spreadX + pageW + pageW * 0.5}" cy="${spreadY + spreadH * 0.4}" r="${pageW * 0.22}" fill="${C.coral}"/>
       <circle cx="${spreadX + pageW + pageW * 0.5}" cy="${spreadY + spreadH * 0.4}" r="${pageW * 0.12}" fill="${C.paper}"/>
       <path d="M${spreadX + pageW + 54} ${spreadY + 620} H${spreadX + spreadW - 54}" stroke="${C.ink}" stroke-opacity="0.18"/>
       ${textEl(spreadX + pageW + 54, spreadY + 664, "A return, not a retreat.", { size: 25, font: serif })}
       ${textEl(spreadX + pageW + 54, spreadY + 704, "NOTES FROM THE COAST / 2026", { size: 9, opacity: 0.4, spacing: 1.4 })}
       ${copyLines(spreadX + pageW + 54, spreadY + 746, 420, 4, C.ink, 0.2, 18)}
     </g>
     ${textEl(104, 1104, "A quieter reading experience, built to survive print.", { size: 26, weight: 700 })}
     ${textEl(104, 1138, "Typography, measure and pacing carry the identity.", { size: 13, opacity: 0.45 })}
     ${frame(w, h, fg, "CONCEPT / FIELDNOTE / EDITORIAL")}
     ${vertLabel(w, h, fg, "PRINT / DIGITAL / SUBSCRIBE")}`,
  );
}

function fieldnoteJournal() {
  const w = 1600;
  const h = 1200;
  const bg = C.paper2;
  const fg = C.ink;
  const px = 112;
  const py = 148;
  const pw = 1376;
  const ph = 900;
  const rows = [
    { n: "01", title: "The long way home", cat: "LAND" },
    { n: "02", title: "What the tide leaves", cat: "COAST" },
    { n: "03", title: "A chair made to be repaired", cat: "CRAFT" },
    { n: "04", title: "Notes on a slower room", cat: "INTERIORS" },
  ];
  const list = rows
    .map(
      (row, i) => `<g>
        ${rule(54, 338 + i * 102, 850, 338 + i * 102, C.ink, 0.14, 1)}
        ${textEl(54, 372 + i * 102, row.n, { size: 11, opacity: 0.38, spacing: 1.2 })}
        ${textEl(104, 374 + i * 102, row.title, { size: i === 0 ? 30 : 26, font: serif, weight: i === 0 ? 700 : 400 })}
        ${textEl(780, 372 + i * 102, row.cat, { size: 8, opacity: 0.38, spacing: 1.2, anchor: "end" })}
      </g>`,
    )
    .join("");

  return svgDoc(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${bg}"/>
     ${grid(w, h, fg, 12, 0.035)}
     ${textEl(px, 96, "FIELDNOTE / DIGITAL JOURNAL", { size: 14, opacity: 0.45, spacing: 2.2 })}
     ${textEl(1488, 96, "CONCEPT / DIGITAL 02", { size: 10, opacity: 0.35, spacing: 1.8, anchor: "end" })}
     <rect x="${px + 12}" y="${py + 16}" width="${pw}" height="${ph}" fill="${C.ink}" opacity="0.14"/>
     <rect x="${px}" y="${py}" width="${pw}" height="${ph}" fill="${C.paper}"/>
     ${textEl(px + 54, py + 62, "FIELDNOTE", { size: 21, weight: 700, spacing: 2.8 })}
     ${textEl(px + 54, py + 92, "LAND / CRAFT / THE THINGS WE KEEP", { size: 9, opacity: 0.4, spacing: 1.5 })}
     ${textEl(px + 700, py + 86, "JOURNAL", { size: 9, opacity: 0.42, spacing: 1.4 })}
     ${textEl(px + 810, py + 86, "FIELD NOTES", { size: 9, opacity: 0.42, spacing: 1.4 })}
     ${textEl(px + 934, py + 86, "ABOUT", { size: 9, opacity: 0.42, spacing: 1.4 })}
     <rect x="${px + 1110}" y="${py + 60}" width="160" height="40" rx="20" fill="${C.coral}"/>
     ${textEl(px + 1190, py + 85, "SUBSCRIBE", { size: 8, fill: C.ink, spacing: 1.4, weight: 700, anchor: "middle" })}
     ${rule(px + 54, py + 132, px + pw - 54, py + 132, C.ink, 0.16, 1)}
     ${textEl(px + 54, py + 218, "A slower kind", { size: 50, font: serif })}
     ${textEl(px + 54, py + 270, "of attention.", { size: 50, font: serif, fill: C.coral })}
     ${textEl(px + 54, py + 312, "AN INDEPENDENT JOURNAL ABOUT LAND, CRAFT AND THE ART OF PAYING ATTENTION.", { size: 8, opacity: 0.38, spacing: 1.2 })}
     ${list}
     ${rule(px + 54, py + 770, px + 850, py + 770, C.ink, 0.16, 1)}
     ${textEl(px + 54, py + 806, "READ THE JOURNAL", { size: 9, opacity: 0.4, spacing: 1.4 })}
     <g transform="translate(${px + 912} ${py + 196})">
       <rect width="400" height="560" fill="${C.paper2}"/>
       <rect x="24" y="24" width="352" height="250" fill="${C.ink}"/>
       <circle cx="200" cy="148" r="86" fill="none" stroke="${C.coral}" stroke-width="2"/>
       <circle cx="200" cy="148" r="48" fill="${C.coral}"/>
       ${textEl(24, 318, "BECOME A MEMBER", { size: 9, fill: C.ink, opacity: 0.45, spacing: 1.4 })}
       ${textEl(24, 364, "Four issues a year.", { size: 25, font: serif })}
       ${textEl(24, 396, "No noise. No daily email.", { size: 25, font: serif, fill: C.coral })}
       ${copyLines(24, 436, 310, 3, C.ink, 0.23, 17)}
       <rect x="24" y="500" width="150" height="38" rx="19" fill="${C.ink}"/>
       ${textEl(99, 524, "JOIN THE LIST", { size: 8, fill: C.paper, spacing: 1.2, anchor: "middle" })}
     </g>
     ${frame(w, h, fg, "CONCEPT / FIELDNOTE / JOURNAL")}
     ${vertLabel(w, h, fg, "EDITORIAL IDENTITY / PRODUCT")}`,
  );
}

function kiteHomepage() {
  const w = 1600;
  const h = 1200;
  const bg = C.charcoal;
  const fg = C.paper;
  const bx = 96;
  const by = 156;
  const bw = 1408;
  const bh = 952;
  const site = `<g>
    <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="${C.ink}"/>
    <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="url(#kiteGlow)" opacity="0.8"/>
    ${textEl(bx + 54, by + 104, "KITE & CO.", { size: 22, weight: 700, spacing: 2.4, fill: C.paper })}
    ${textEl(bx + 740, by + 102, "SERVICES", { size: 9, fill: C.paper, opacity: 0.45, spacing: 1.4 })}
    ${textEl(bx + 850, by + 102, "WORK", { size: 9, fill: C.paper, opacity: 0.45, spacing: 1.4 })}
    ${textEl(bx + 930, by + 102, "INSIGHTS", { size: 9, fill: C.paper, opacity: 0.45, spacing: 1.4 })}
    <rect x="${bx + 1100}" y="${by + 74}" width="230" height="50" rx="25" fill="${C.coral}"/>
    ${textEl(bx + 1215, by + 105, "BOOK AN INTRO", { size: 9, fill: C.ink, weight: 700, spacing: 1.2, anchor: "middle" })}
    ${rule(bx + 54, by + 140, bx + bw - 54, by + 140, C.paper, 0.12, 1)}
    ${textEl(bx + 54, by + 270, "MAKE", { size: 98, weight: 700, fill: C.paper, spacing: -2.5 })}
    ${textEl(bx + 54, by + 366, "COMPLEXITY", { size: 98, weight: 700, fill: C.paper, spacing: -2.5 })}
    ${textEl(bx + 54, by + 462, "FEEL SIMPLE.", { size: 98, weight: 700, fill: C.coral, spacing: -2.5 })}
    ${textEl(bx + 54, by + 524, "Strategy, design and search for consultancies that have outgrown their website.", { size: 15, fill: C.paper, opacity: 0.48 })}
    <rect x="${bx + 54}" y="${by + 560}" width="184" height="48" rx="24" fill="${C.paper}"/>
    ${textEl(bx + 146, by + 590, "SEE THE WORK", { size: 9, fill: C.ink, spacing: 1.3, weight: 700, anchor: "middle" })}
    ${rule(bx + 54, by + 662, bx + bw - 54, by + 662, C.paper, 0.12, 1)}
    <g transform="translate(${bx + 54} ${by + 708})">
      ${["BRAND", "WEB", "SEARCH"].map((label, i) => `<g transform="translate(${i * 300} 0)">
        <rect width="260" height="152" rx="12" fill="${C.paper}" opacity="0.045" stroke="${C.paper}" stroke-opacity="0.1"/>
        ${textEl(22, 32, `0${i + 1}`, { size: 9, fill: C.coral, opacity: 0.9, spacing: 1.2 })}
        ${textEl(22, 76, label, { size: 22, weight: 700, fill: C.paper })}
        ${copyLines(22, 100, 190, 2, C.paper, 0.2, 15)}
        ${textEl(22, 136, "EXPLORE ↗", { size: 8, fill: C.paper, opacity: 0.45, spacing: 1.2 })}
      </g>`).join("")}
    </g>
    ${textEl(bx + bw - 54, by + 900, "01 / 04", { size: 10, fill: C.paper, opacity: 0.35, spacing: 1.2, anchor: "end" })}
  </g>`;

  return svgDoc(
    w,
    h,
    `<defs>
      <radialGradient id="kiteGlow" cx="50%" cy="0%" r="75%">
        <stop offset="0%" stop-color="${C.coral}" stop-opacity="0.12"/>
        <stop offset="60%" stop-color="${C.coral}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="${bg}"/>
    ${grid(w, h, fg, 12, 0.04)}
    ${browserFrame({
      x: bx,
      y: by,
      w: bw,
      h: bh,
      bg: C.ink,
      chrome: C.ink2,
      fg: C.paper,
      url: "kiteandco.studio",
      accent: C.coral,
      children: site,
    })}
    ${textEl(96, 108, "KITE & CO. / HOMEPAGE", { size: 14, fill: C.paper, opacity: 0.45, spacing: 2.4 })}
    ${textEl(1504, 108, "CONCEPT / WEB 01", { size: 10, fill: C.paper, opacity: 0.32, spacing: 1.8, anchor: "end" })}
    ${textEl(96, 1168, "The offer is clear before the first call.", { size: 24, weight: 700 })}
    ${frame(w, h, fg, "CONCEPT / KITE / HOMEPAGE")}
    ${vertLabel(w, h, fg, "SERVICE-LED WEBSITE")}`,
  );
}

function kiteTemplates() {
  const w = 1600;
  const h = 1200;
  const bg = C.paper2;
  const fg = C.ink;
  const left = { x: 92, y: 174, w: 674, h: 882 };
  const right = { x: 834, y: 174, w: 674, h: 882 };
  const leftContent = `<g>
    <rect x="${left.x}" y="${left.y}" width="${left.w}" height="${left.h}" fill="${C.paper}"/>
    ${textEl(left.x + 42, left.y + 62, "KITE & CO.", { size: 17, weight: 700, spacing: 2.2 })}
    ${textEl(left.x + 480, left.y + 60, "SERVICES / 01", { size: 8, opacity: 0.4, spacing: 1.3, anchor: "end" })}
    ${rule(left.x + 42, left.y + 92, left.x + left.w - 42, left.y + 92, C.ink, 0.16, 1)}
    ${textEl(left.x + 42, left.y + 170, "PERFORMANCE,", { size: 44, weight: 700, spacing: -1.2 })}
    ${textEl(left.x + 42, left.y + 218, "WITHOUT THE", { size: 44, weight: 700, spacing: -1.2 })}
    ${textEl(left.x + 42, left.y + 266, "THEATRE.", { size: 44, weight: 700, fill: C.coral, spacing: -1.2 })}
    ${textEl(left.x + 42, left.y + 320, "Paid media built around your economics, not the platform's incentives.", { size: 13, opacity: 0.5 })}
    ${rule(left.x + 42, left.y + 360, left.x + left.w - 42, left.y + 360, C.ink, 0.14, 1)}
    ${textEl(left.x + 42, left.y + 396, "WHAT WE DO", { size: 8, opacity: 0.4, spacing: 1.4 })}
    ${["Account architecture", "Creative testing engine", "Conversion tracking", "Weekly decisions"].map((item, i) => `<g>
      ${textEl(left.x + 42, left.y + 438 + i * 40, `0${i + 1}`, { size: 9, fill: C.coral, spacing: 1.1 })}
      ${textEl(left.x + 92, left.y + 438 + i * 40, item, { size: 17, weight: 700 })}
      ${rule(left.x + 42, left.y + 454 + i * 40, left.x + left.w - 42, left.y + 454 + i * 40, C.ink, 0.09, 1)}
    </g>`).join("")}
    <rect x="${left.x + 42}" y="${left.y + 640}" width="240" height="50" rx="25" fill="${C.ink}"/>
    ${textEl(left.x + 162, left.y + 671, "EXPLORE THE SERVICE", { size: 8, fill: C.paper, spacing: 1.2, anchor: "middle" })}
    ${textEl(left.x + 42, left.y + 820, "KITE / SERVICE TEMPLATE", { size: 8, opacity: 0.3, spacing: 1.3 })}
  </g>`;
  const rightContent = `<g>
    <rect x="${right.x}" y="${right.y}" width="${right.w}" height="${right.h}" fill="${C.paper}"/>
    ${textEl(right.x + 42, right.y + 62, "INSIGHT / 08", { size: 8, opacity: 0.4, spacing: 1.4 })}
    ${textEl(right.x + 42, right.y + 108, "The quiet cost of a vague offer.", { size: 29, font: serif })}
    ${textEl(right.x + 42, right.y + 140, "STRATEGY / 6 MIN READ", { size: 8, opacity: 0.35, spacing: 1.2 })}
    <rect x="${right.x + 42}" y="${right.y + 174}" width="${right.w - 84}" height="230" fill="${C.paper2}"/>
    <circle cx="${right.x + 260}" cy="${right.y + 286}" r="86" fill="${C.ink}"/>
    <circle cx="${right.x + 260}" cy="${right.y + 286}" r="48" fill="${C.coral}"/>
    ${copyLines(right.x + 42, right.y + 448, 500, 7, C.ink, 0.25, 19)}
    ${textEl(right.x + 42, right.y + 600, "THE POINT", { size: 8, opacity: 0.4, spacing: 1.4 })}
    ${textEl(right.x + 42, right.y + 638, "If the offer needs a call to explain,", { size: 18, weight: 700 })}
    ${textEl(right.x + 42, right.y + 664, "the page has not done its job.", { size: 18, weight: 700, fill: C.coral })}
    ${copyLines(right.x + 42, right.y + 700, 500, 4, C.ink, 0.2, 18)}
    <rect x="${right.x + 42}" y="${right.y + 796}" width="176" height="38" rx="19" fill="none" stroke="${C.ink}" stroke-opacity="0.3"/>
    ${textEl(right.x + 130, right.y + 820, "READ THE NOTE", { size: 8, spacing: 1.2, anchor: "middle" })}
    ${textEl(right.x + right.w - 42, right.y + 820, "KITE / INSIGHT TEMPLATE", { size: 8, opacity: 0.3, spacing: 1.2, anchor: "end" })}
  </g>`;

  return svgDoc(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${bg}"/>
     ${grid(w, h, fg, 12, 0.035)}
     ${textEl(92, 112, "KITE & CO. / TEMPLATE SYSTEM", { size: 14, opacity: 0.45, spacing: 2.2 })}
     ${textEl(1508, 112, "CONCEPT / WEB 02", { size: 10, opacity: 0.35, spacing: 1.8, anchor: "end" })}
     <rect x="${left.x + 10}" y="${left.y + 14}" width="${left.w}" height="${left.h}" fill="${C.ink}" opacity="0.12"/>
     <rect x="${right.x + 10}" y="${right.y + 14}" width="${right.w}" height="${right.h}" fill="${C.ink}" opacity="0.12"/>
     ${leftContent}
     ${rightContent}
     ${textEl(92, 1110, "Service and insight pages that do the explaining.", { size: 26, weight: 700 })}
     ${textEl(92, 1142, "One system, two jobs: clarify the offer and earn the search visit.", { size: 13, opacity: 0.45 })}
     ${frame(w, h, fg, "CONCEPT / KITE / TEMPLATES")}
     ${vertLabel(w, h, fg, "SERVICE / INSIGHT / CMS")}`,
  );
}

function verdantCluster() {
  const w = 1600;
  const h = 1200;
  const bg = C.paper;
  const fg = C.ink;
  const cx = 660;
  const cy = 574;
  const nodes = [
    { x: 330, y: 330, label: "LIGHTING", kind: "CONTENT" },
    { x: 900, y: 270, label: "STORAGE", kind: "CONTENT" },
    { x: 1120, y: 520, label: "MATERIALS", kind: "PRODUCT" },
    { x: 1020, y: 800, label: "SMALL SPACES", kind: "DECISION" },
    { x: 620, y: 900, label: "COLOUR", kind: "CONTENT" },
    { x: 288, y: 730, label: "RUGS", kind: "PRODUCT" },
    { x: 250, y: 520, label: "RITUALS", kind: "DECISION" },
  ];
  const nodeMarkup = nodes
    .map(
      (node) => `<g>
        <line x1="${cx}" y1="${cy}" x2="${node.x}" y2="${node.y}" stroke="${node.kind === "DECISION" ? C.coral : C.ink}" stroke-opacity="0.22" stroke-width="1.2"/>
        <circle cx="${node.x}" cy="${node.y}" r="${node.kind === "DECISION" ? 11 : 7}" fill="${node.kind === "DECISION" ? C.coral : node.kind === "PRODUCT" ? C.violet : C.ink}" opacity="${node.kind === "PRODUCT" ? 0.8 : 0.9}"/>
        ${textEl(node.x, node.y - 24, node.label, { size: 11, weight: 700, spacing: 1.2, anchor: "middle" })}
        ${textEl(node.x, node.y + 34, node.kind, { size: 7, opacity: 0.35, spacing: 1.2, anchor: "middle" })}
      </g>`,
    )
    .join("");

  return svgDoc(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${bg}"/>
     ${grid(w, h, fg, 12, 0.04)}
     <circle cx="660" cy="574" r="386" fill="none" stroke="${C.ink}" stroke-opacity="0.08"/>
     <circle cx="660" cy="574" r="286" fill="none" stroke="${C.ink}" stroke-opacity="0.08"/>
     <circle cx="660" cy="574" r="186" fill="none" stroke="${C.ink}" stroke-opacity="0.08"/>
     ${nodeMarkup}
     <rect x="${cx - 160}" y="${cy - 66}" width="320" height="132" rx="16" fill="${C.ink}"/>
     ${textEl(cx, cy - 18, "FURNISHING", { size: 28, weight: 700, fill: C.paper, anchor: "middle", spacing: -0.6 })}
     ${textEl(cx, cy + 16, "A HOME", { size: 28, weight: 700, fill: C.coral, anchor: "middle", spacing: -0.6 })}
     ${textEl(cx, cy + 46, "THE DECISION MAP", { size: 7, fill: C.paper, opacity: 0.4, anchor: "middle", spacing: 1.4 })}
     ${textEl(1160, 108, "VERDANT / SEARCH ARCHITECTURE", { size: 18, weight: 700, spacing: 1.4 })}
     ${textEl(1160, 144, "A topic system built around moments of decision,", { size: 13, opacity: 0.48 })}
     ${textEl(1160, 166, "not a list of product categories.", { size: 13, opacity: 0.48 })}
     ${rule(1160, 222, 1452, 222, C.ink, 0.2, 1)}
     <g transform="translate(1160 258)">
       ${[
         { color: C.coral, label: "DECISION" },
         { color: C.ink, label: "CONTENT" },
         { color: C.violet, label: "PRODUCT" },
       ].map((item, i) => `<g transform="translate(0 ${i * 34})">
         <circle cx="6" cy="-5" r="5" fill="${item.color}"/>
         ${textEl(24, 0, item.label, { size: 9, opacity: 0.5, spacing: 1.2 })}
       </g>`).join("")}
     </g>
     ${textEl(1160, 410, "06", { size: 82, weight: 700, fill: C.coral, spacing: -2 })}
     ${textEl(1160, 448, "CLUSTERS", { size: 10, opacity: 0.4, spacing: 2 })}
     ${textEl(1160, 508, "No ranking claims.", { size: 18, weight: 700 })}
     ${textEl(1160, 538, "A structure for useful content,", { size: 13, opacity: 0.45 })}
     ${textEl(1160, 560, "not a promise of performance.", { size: 13, opacity: 0.45 })}
     ${textEl(1160, 680, "SEARCH / CONTENT / COMMERCE", { size: 8, opacity: 0.3, spacing: 1.4 })}
     ${textEl(96, 1100, "Be present before the product decision.", { size: 28, weight: 700 })}
     ${textEl(96, 1134, "A useful map of the questions people ask on the way to a room they love.", { size: 13, opacity: 0.45 })}
     ${frame(w, h, fg, "CONCEPT / VERDANT / CLUSTERS")}
     ${vertLabel(w, h, fg, "SEO / EDITORIAL / COMMERCE")}`,
  );
}

function verdantArticle() {
  const w = 1600;
  const h = 1200;
  const bg = C.paper2;
  const fg = C.ink;
  const px = 104;
  const py = 148;
  const pw = 1392;
  const ph = 900;
  return svgDoc(
    w,
    h,
    `<rect width="${w}" height="${h}" fill="${bg}"/>
     ${grid(w, h, fg, 12, 0.035)}
     ${textEl(104, 108, "VERDANT / EDITORIAL TO COMMERCE", { size: 14, opacity: 0.45, spacing: 2.2 })}
     ${textEl(1496, 108, "CONCEPT / SEO 02", { size: 10, opacity: 0.35, spacing: 1.8, anchor: "end" })}
     <rect x="${px + 12}" y="${py + 16}" width="${pw}" height="${ph}" fill="${C.ink}" opacity="0.14"/>
     <rect x="${px}" y="${py}" width="${pw}" height="${ph}" fill="${C.paper}"/>
     ${textEl(px + 48, py + 58, "VERDANT", { size: 21, weight: 700, spacing: 3 })}
     ${textEl(px + 48, py + 84, "HOME / CONSIDERED", { size: 8, opacity: 0.38, spacing: 1.3 })}
     ${textEl(px + 600, py + 78, "JOURNAL", { size: 8, opacity: 0.38, spacing: 1.3 })}
     ${textEl(px + 690, py + 78, "SHOP", { size: 8, opacity: 0.38, spacing: 1.3 })}
     ${textEl(px + 750, py + 78, "ABOUT", { size: 8, opacity: 0.38, spacing: 1.3 })}
     ${rule(px + 48, py + 112, px + pw - 48, py + 112, C.ink, 0.16, 1)}
     ${textEl(px + 48, py + 174, "JOURNAL / ROOMS", { size: 8, opacity: 0.35, spacing: 1.3 })}
     ${textEl(px + 48, py + 252, "How to make a small", { size: 38, font: serif })}
     ${textEl(px + 48, py + 296, "room feel considered.", { size: 38, font: serif, fill: C.coral })}
     ${textEl(px + 48, py + 334, "6 MIN READ / INTERIORS", { size: 8, opacity: 0.35, spacing: 1.2 })}
     <rect x="${px + 48}" y="${py + 366}" width="700" height="260" fill="${C.paper2}"/>
     <rect x="${px + 86}" y="${py + 402}" width="240" height="188" fill="${C.ink}" opacity="0.9"/>
     <circle cx="${px + 440}" cy="${py + 492}" r="88" fill="none" stroke="${C.coral}" stroke-width="2"/>
     <circle cx="${px + 440}" cy="${py + 492}" r="44" fill="${C.coral}"/>
     ${copyLines(px + 48, py + 672, 690, 5, C.ink, 0.24, 20)}
     ${textEl(px + 48, py + 808, "THE SHORT VERSION", { size: 8, opacity: 0.4, spacing: 1.4 })}
     ${textEl(px + 48, py + 846, "Start with one decision, not a shopping list.", { size: 18, weight: 700 })}
     ${rule(px + 48, py + 900, px + 748, py + 900, C.ink, 0.16, 1)}
     ${textEl(px + 48, py + 932, "READ THE FULL NOTE", { size: 8, opacity: 0.4, spacing: 1.3 })}
     <g transform="translate(${px + 830} ${py + 184})">
       <text x="0" y="0" fill="${C.ink}" opacity="0.4" font-family="${sans}" font-size="8" letter-spacing="1.4">IN THIS ROOM</text>
       ${[
         { name: "LINEN SHADE", tone: C.coral, label: "LAMP / 01" },
         { name: "OAK STOOL", tone: C.paper3, label: "SEAT / 02" },
         { name: "WOOL RUG", tone: C.violet, label: "FLOOR / 03" },
       ].map((product, i) => `<g transform="translate(0 ${42 + i * 202})">
         <rect width="470" height="174" fill="${C.paper2}"/>
         <rect x="18" y="22" width="130" height="130" fill="${product.tone}" opacity="0.9"/>
         <circle cx="83" cy="87" r="34" fill="${C.paper}" opacity="0.8"/>
         ${textEl(174, 54, product.name, { size: 18, weight: 700 })}
         ${textEl(174, 78, product.label, { size: 8, opacity: 0.35, spacing: 1.2 })}
         ${textEl(174, 120, "CONTEXTUAL PRODUCT", { size: 8, fill: C.coral, spacing: 1.2 })}
         ${textEl(174, 144, "SHOP THE ROOM", { size: 8, opacity: 0.4, spacing: 1.1 })}
       </g>`).join("")}
     </g>
     ${frame(w, h, fg, "CONCEPT / VERDANT / ARTICLE")}
     ${vertLabel(w, h, fg, "EDITORIAL / SEARCH / PRODUCT")}`,
  );
}

const assets = [
  { file: "work-northwind-gallery-1.svg", render: northwindBoard },
  { file: "work-northwind-gallery-2.svg", render: northwindCampaign },
  { file: "work-halcyon-gallery-1.svg", render: halcyonFeed },
  { file: "work-halcyon-gallery-2.svg", render: halcyonStories },
  { file: "work-tessellate-gallery-1.svg", render: tessellateDesktop },
  { file: "work-tessellate-gallery-2.svg", render: tessellateResponsive },
  { file: "work-orbit-gallery-1.svg", render: orbitAds },
  { file: "work-orbit-gallery-2.svg", render: orbitMeasurement },
  { file: "work-fieldnote-gallery-1.svg", render: fieldnoteSpread },
  { file: "work-fieldnote-gallery-2.svg", render: fieldnoteJournal },
  { file: "work-kite-gallery-1.svg", render: kiteHomepage },
  { file: "work-kite-gallery-2.svg", render: kiteTemplates },
  { file: "work-verdant-gallery-1.svg", render: verdantCluster },
  { file: "work-verdant-gallery-2.svg", render: verdantArticle },
];

for (const asset of assets) {
  fs.writeFileSync(path.join(OUT, asset.file), asset.render());
}

console.log(`Generated ${assets.length} project-detail images in public/assets/images`);
