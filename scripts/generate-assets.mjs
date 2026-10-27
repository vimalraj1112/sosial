/**
 * Generates the temporary SOSIAL image library.
 *
 * These are ORIGINAL, hand-composed vector artworks - not AI images and not
 * stock photography. They are intentionally abstract so the preview looks
 * art-directed while making it obvious that real photography is still to come.
 *
 * Every file is listed in CLIENT_ASSETS.md with its replacement spec.
 *
 * Run: npm run assets:images
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
  coral: "#8221FC",
  coralSoft: "#B58CFD",
  violet: "#B58CFD",
  charcoal: "#1C1C26",
};

const sans = "Arial, Helvetica, sans-serif";

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

function frame(w, h, fg, label = "SOSIAL") {
  const pad = Math.round(Math.min(w, h) * 0.035);
  const tick = Math.round(Math.min(w, h) * 0.018);
  const lx = pad + tick + 14;
  const ly = pad + tick + 18;
  return `<g fill="none" stroke="${fg}" stroke-opacity="0.28" stroke-width="1.2">
      <rect x="${pad}" y="${pad}" width="${w - pad * 2}" height="${h - pad * 2}"/>
      <path d="M${pad} ${pad + tick} V${pad} H${pad + tick}"/>
      <path d="M${w - pad - tick} ${pad} H${w - pad} V${pad + tick}"/>
      <path d="M${w - pad} ${h - pad - tick} V${h - pad} H${w - pad - tick}"/>
      <path d="M${pad + tick} ${h - pad} H${pad} V${h - pad - tick}"/>
    </g>
    <text x="${lx}" y="${ly}" fill="${fg}" opacity="0.6" font-family="${sans}" font-size="${Math.round(Math.min(w, h) * 0.016)}" letter-spacing="${Math.round(Math.min(w, h) * 0.006)}">${label}</text>`;
}

function vertLabel(w, h, fg, text) {
  const s = Math.round(Math.min(w, h) * 0.014);
  return `<text transform="translate(${w - Math.round(w * 0.05)} ${h - Math.round(h * 0.06)}) rotate(-90)" text-anchor="end" fill="${fg}" opacity="0.55" font-family="${sans}" font-size="${s}" letter-spacing="${s * 0.24}">${text}</text>`;
}

function grid(w, h, color, cols = 12, opacity = 0.07) {
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

function svgDoc(w, h, body, { grainId = "grain", grainOpacity = 0.07 } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  <defs>${grain(grainId)}</defs>
  ${body}
  ${grainLayer(w, h, grainId, grainOpacity)}
</svg>`;
}

/* ------------------------------------------------------------------ */
/* Compositions                                                        */
/* ------------------------------------------------------------------ */

const compositions = {
  orbital({ w, h, bg = C.ink, fg = C.paper, accent = C.coral, label = "SOSIAL / ILLUSTRATIVE", scale = 1 }) {
    const cx = w * 0.76;
    const cy = h * 0.32;
    const r = Math.min(w, h) * 0.52 * scale;
    let rings = "";
    for (let i = 0; i < 4; i++) {
      rings += `<circle cx="${cx}" cy="${cy}" r="${r - i * r * 0.13}" fill="none" stroke="${fg}" stroke-opacity="${0.1 + i * 0.045}" stroke-width="1.3"/>`;
    }
    return svgDoc(
      w,
      h,
      `<rect width="${w}" height="${h}" fill="${bg}"/>
       ${grid(w, h, fg, 12, 0.06)}
       <circle cx="${w * 0.18}" cy="${h * 0.16}" r="${Math.min(w, h) * 0.17}" fill="${fg}" opacity="0.06"/>
       ${rings}
       <circle cx="${cx}" cy="${cy}" r="${r * 0.34}" fill="none" stroke="${accent}" stroke-width="${Math.min(w, h) * 0.016}" stroke-dasharray="${r * 0.05} ${r * 0.09}" transform="rotate(-24 ${cx} ${cy})"/>
       <circle cx="${cx}" cy="${cy}" r="${Math.min(w, h) * 0.055}" fill="${accent}"/>
       <path d="M0 ${h * 0.82} C ${w * 0.3} ${h * 0.66}, ${w * 0.5} ${h * 0.98}, ${w} ${h * 0.74}" fill="none" stroke="${fg}" stroke-opacity="0.35" stroke-width="1.4"/>
       <path d="M0 ${h * 0.89} C ${w * 0.28} ${h * 0.75}, ${w * 0.62} ${h * 1.02}, ${w} ${h * 0.83}" fill="none" stroke="${fg}" stroke-opacity="0.16" stroke-width="1.2"/>
       ${frame(w, h, fg, label)}
       ${vertLabel(w, h, fg, "CREATIVE STUDIO")}`,
    );
  },

  aperture({ w, h, bg = C.paper, fg = C.ink, accent = C.coral, label = "SOSIAL / ILLUSTRATIVE" }) {
    const cx = w * 0.5;
    const cy = h * 0.48;
    const max = Math.min(w, h) * 0.44;
    let paths = "";
    for (let i = 0; i < 5; i++) {
      const r = max - i * (max * 0.11);
      const off = i * max * 0.06;
      paths += `<path d="M ${cx - r + off} ${cy} a ${r} ${r} 0 0 1 ${r * 2} 0" fill="none" stroke="${i === 2 ? accent : fg}" stroke-opacity="${i === 2 ? 0.95 : 0.32}" stroke-width="${i === 2 ? Math.min(w, h) * 0.012 : 1.6}" transform="rotate(${i * 14} ${cx} ${cy})"/>`;
    }
    return svgDoc(
      w,
      h,
      `<rect width="${w}" height="${h}" fill="${bg}"/>
       ${grid(w, h, fg, 10, 0.05)}
       <rect x="${w * 0.08}" y="${h * 0.1}" width="${w * 0.3}" height="${h * 0.34}" fill="${fg}" opacity="0.9"/>
       <circle cx="${w * 0.06}" cy="${h * 0.86}" r="${Math.min(w, h) * 0.22}" fill="${accent}" opacity="0.9"/>
       <circle cx="${w * 0.9}" cy="${h * 0.12}" r="${Math.min(w, h) * 0.13}" fill="none" stroke="${fg}" stroke-width="1.4" stroke-opacity="0.5"/>
       ${paths}
       ${frame(w, h, fg, label)}`,
    );
  },

  waves({ w, h, bg = C.paper, fg = C.ink, accent = C.coral, label = "SOSIAL / ILLUSTRATIVE" }) {
    const bands = [
      { y: 0.34, amp: 0.1, color: accent, op: 0.95 },
      { y: 0.5, amp: 0.12, color: fg, op: 0.9 },
      { y: 0.66, amp: 0.09, color: C.violet, op: 0.75 },
      { y: 0.8, amp: 0.07, color: fg, op: 0.55 },
    ];
    const paths = bands
      .map(
        (b) =>
          `<path d="M0 ${h * b.y} C ${w * 0.22} ${h * (b.y - b.amp)}, ${w * 0.34} ${h * (b.y + b.amp)}, ${w * 0.55} ${h * b.y} S ${w * 0.86} ${h * (b.y - b.amp)}, ${w} ${h * (b.y + b.amp * 0.3)}" fill="none" stroke="${b.color}" stroke-opacity="${b.op}" stroke-width="${Math.min(w, h) * (0.055 + 0.03 * bands.indexOf(b))}" stroke-linecap="round"/>`,
      )
      .join("");
    return svgDoc(
      w,
      h,
      `<rect width="${w}" height="${h}" fill="${bg}"/>
       ${grid(w, h, fg, 8, 0.05)}
       <rect x="${w * 0.62}" y="0" width="${w * 0.38}" height="${h}" fill="${fg}" opacity="0.055"/>
       <circle cx="${w * 0.82}" cy="${h * 0.18}" r="${Math.min(w, h) * 0.08}" fill="${accent}"/>
       ${paths}
       ${frame(w, h, fg, label)}
       ${vertLabel(w, h, fg, "BRAND SYSTEMS")}`,
    );
  },

  tiles({ w, h, bg = C.paper2, fg = C.ink, accent = C.coral, label = "SOSIAL / ILLUSTRATIVE" }) {
    const cols = 4;
    const rows = 5;
    const pad = Math.min(w, h) * 0.11;
    const cw = (w - pad * 2) / cols;
    const ch = (h - pad * 2) / rows;
    const fills = [
      [C.ink, 0, 1, 1, 1],
      [C.paper, 1, 0, 1, 2],
      [accent, 2, 2, 1, 2],
      [C.ink, 3, 0, 1, 1],
      [C.paper3, 0, 3, 2, 1],
      [C.violet, 1, 3, 1, 2],
    ];
    let out = "";
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        out += `<rect x="${pad + c * cw}" y="${pad + r * ch}" width="${cw}" height="${ch}" fill="${fg}" opacity="0.06" stroke="${bg}" stroke-width="6"/>`;
      }
    }
    for (const [fill, c, r, ww, hh] of fills) {
      out += `<rect x="${pad + c * cw}" y="${pad + r * ch}" width="${cw * ww}" height="${ch * hh}" fill="${fill}" stroke="${bg}" stroke-width="6"/>`;
    }
    out += `<circle cx="${pad + cw * 2.5}" cy="${pad + ch * 0.5}" r="${Math.min(cw, ch) * 0.24}" fill="${C.paper}"/>`;
    out += `<circle cx="${pad + cw * 0.5}" cy="${pad + ch * 2.5}" r="${Math.min(cw, ch) * 0.3}" fill="none" stroke="${C.paper}" stroke-width="2"/>`;
    return svgDoc(
      w,
      h,
      `<rect width="${w}" height="${h}" fill="${bg}"/>
       ${out}
       ${frame(w, h, fg, label)}`,
    );
  },

  editorial({ w, h, bg = C.paper, fg = C.ink, accent = C.coral, label = "SOSIAL / ILLUSTRATIVE", variant = 0 }) {
    const lines = Array.from({ length: 7 })
      .map((_, i) => `<rect x="${w * 0.1}" y="${h * (0.66 + i * 0.032)}" width="${w * (0.3 + (i % 3) * 0.09)}" height="${Math.max(2, h * 0.008)}" fill="${fg}" opacity="${0.45 - i * 0.04}"/>`)
      .join("");
    const art = `<rect x="0" y="0" width="${w * 0.46}" height="${h}" fill="${fg}" opacity="0.055"/>
       <circle cx="${w * 0.72}" cy="${h * 0.38}" r="${Math.min(w, h) * 0.29}" fill="${fg}"/>
       <circle cx="${w * 0.72}" cy="${h * 0.38}" r="${Math.min(w, h) * 0.2}" fill="${bg}"/>
       <circle cx="${w * 0.72}" cy="${h * 0.38}" r="${Math.min(w, h) * 0.11}" fill="${accent}"/>
       <path d="M${w * 0.1} ${h * 0.16} H ${w * 0.4}" stroke="${accent}" stroke-width="${h * 0.012}"/>
       ${lines}`;
    return svgDoc(
      w,
      h,
      `<rect width="${w}" height="${h}" fill="${bg}"/>
       ${variant === 1 ? `<g transform="translate(${w} 0) scale(-1 1)">${art}</g>` : art}
       ${variant === 2 ? `<rect x="${w * 0.52}" y="${h * 0.08}" width="${w * 0.34}" height="${w * 0.34}" fill="none" stroke="${fg}" stroke-opacity="0.4" stroke-width="1.5"/><path d="M${w * 0.52} ${h * 0.55} A ${w * 0.17} ${w * 0.17} 0 0 1 ${w * 0.86} ${h * 0.55}" fill="none" stroke="${accent}" stroke-width="${h * 0.01}"/>` : ""}
       ${frame(w, h, fg, label)}`,
    );
  },

  dashboard({ w, h, bg = C.ink, fg = C.paper, accent = C.coral, label = "SOSIAL / ANALYTICS" }) {
    const pad = w * 0.06;
    const top = h * 0.1;
    const sideW = w * 0.15;
    const panelX = pad + sideW + w * 0.02;
    const panelW = w - panelX - pad;
    const kpis = [0, 1, 2].map((i) => {
      const x = panelX + i * (panelW / 3);
      const bw = panelW / 3 - w * 0.015;
      return `<g>
        <rect x="${x}" y="${top + h * 0.06}" width="${bw}" height="${h * 0.17}" rx="8" fill="${fg}" opacity="0.055" stroke="${fg}" stroke-opacity="0.12"/>
        <rect x="${x + w * 0.018}" y="${top + h * 0.1}" width="${bw * 0.28}" height="${h * 0.012}" fill="${fg}" opacity="0.5"/>
        <rect x="${x + w * 0.018}" y="${top + h * 0.14}" width="${bw * 0.46}" height="${h * 0.03}" fill="${fg}" opacity="0.9"/>
        <path d="M${x + w * 0.018} ${top + h * 0.2} l ${bw * 0.08} -${h * 0.012} l ${bw * 0.08} ${h * 0.02} l ${bw * 0.1} -${h * 0.03} l ${bw * 0.1} ${h * 0.01}" fill="none" stroke="${i === 1 ? accent : fg}" stroke-opacity="0.85" stroke-width="2"/>
      </g>`;
    });
    const bars = Array.from({ length: 11 })
      .map((_, i) => {
        const bh = h * (0.06 + ((i * 37) % 10) * 0.012);
        return `<rect x="${panelX + w * 0.03 + i * (panelW * 0.028)}" y="${top + h * 0.48 + h * 0.2 - bh}" width="${panelW * 0.016}" height="${bh}" rx="2" fill="${i === 7 ? accent : fg}" opacity="${i === 7 ? 1 : 0.45}"/>`;
      })
      .join("");
    const line = Array.from({ length: 30 })
      .map((_, i) => {
        const x = panelX + w * 0.52 + i * (panelW * 0.014);
        const y = top + h * 0.25 + Math.sin(i * 0.55) * h * 0.035 + (i % 5) * h * 0.004;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
    return svgDoc(
      w,
      h,
      `<rect width="${w}" height="${h}" fill="${bg}"/>
       <rect x="${pad}" y="${top}" width="${sideW}" height="${h - top - h * 0.08}" rx="10" fill="${fg}" opacity="0.04"/>
       <circle cx="${pad + sideW / 2}" cy="${top + h * 0.07}" r="${w * 0.018}" fill="${accent}"/>
       ${Array.from({ length: 6 })
         .map((_, i) => `<rect x="${pad + w * 0.025}" y="${top + h * (0.16 + i * 0.06)}" width="${sideW - w * 0.05}" height="${h * 0.012}" rx="6" fill="${fg}" opacity="${i === 1 ? 0.75 : 0.25}"/>`)
         .join("")}
       ${kpis.join("")}
       <rect x="${panelX}" y="${top + h * 0.28}" width="${panelW * 0.46}" height="${h * 0.36}" rx="10" fill="${fg}" opacity="0.04" stroke="${fg}" stroke-opacity="0.1"/>
       ${bars}
       <rect x="${panelX + panelW * 0.5}" y="${top + h * 0.28}" width="${panelW * 0.5}" height="${h * 0.36}" rx="10" fill="${fg}" opacity="0.04" stroke="${fg}" stroke-opacity="0.1"/>
       <path d="${line}" fill="none" stroke="${accent}" stroke-width="${h * 0.004}" stroke-linecap="round"/>
       <path d="${line} L ${panelX + panelW - w * 0.01} ${top + h * 0.64} L ${panelX + panelW * 0.52} ${top + h * 0.64} Z" fill="${accent}" opacity="0.12"/>
       <rect x="${panelX}" y="${top + h * 0.69}" width="${panelW}" height="${h * 0.1}" rx="8" fill="${fg}" opacity="0.03"/>
       ${Array.from({ length: 5 })
         .map((_, i) => `<rect x="${panelX + w * 0.02 + i * (panelW * 0.05)}" y="${top + h * 0.715}" width="${panelW * 0.035}" height="${h * 0.05}" fill="${fg}" opacity="${0.12 + i * 0.04}"/>`)
         .join("")}
       ${frame(w, h, fg, label)}`,
    );
  },

  social({ w, h, bg = C.paper2, fg = C.ink, accent = C.coral, label = "SOSIAL / CAMPAIGN" }) {
    const cardW = w * 0.46;
    const cardH = h * 0.62;
    const cards = [
      { x: w * 0.1, y: h * 0.2, rot: -7, fill: fg, accentFill: accent },
      { x: w * 0.28, y: h * 0.14, rot: 0, fill: C.paper, accentFill: C.violet },
      { x: w * 0.48, y: h * 0.22, rot: 6, fill: accent, accentFill: fg },
    ];
    const body = cards
      .map(
        (c, i) => `<g transform="rotate(${c.rot} ${c.x + cardW / 2} ${c.y + cardH / 2})">
          <rect x="${c.x}" y="${c.y}" width="${cardW}" height="${cardH}" rx="16" fill="${c.fill}" stroke="${C.ink}" stroke-opacity="0.25"/>
          <rect x="${c.x + cardW * 0.07}" y="${c.y + cardH * 0.07}" width="${cardW * 0.86}" height="${cardH * 0.42}" rx="8" fill="${i === 2 ? C.ink : c.accentFill}" opacity="${i === 1 ? 0.18 : 0.9}"/>
          <circle cx="${c.x + cardW * 0.5}" cy="${c.y + cardH * 0.28}" r="${cardW * 0.13}" fill="none" stroke="${i === 2 ? C.paper : c.accentFill}" stroke-width="${cardW * 0.02}"/>
          <circle cx="${c.x + cardW * 0.5}" cy="${c.y + cardH * 0.28}" r="${cardW * 0.045}" fill="${c.accentFill === C.ink ? C.paper : c.accentFill}"/>
          <circle cx="${c.x + cardW * 0.14}" cy="${c.y + cardH * 0.58}" r="${cardW * 0.05}" fill="${c.accentFill}"/>
          <rect x="${c.x + cardW * 0.23}" y="${c.y + cardH * 0.545}" width="${cardW * 0.3}" height="${h * 0.012}" fill="${C.ink}" opacity="0.5"/>
          <rect x="${c.x + cardW * 0.23}" y="${c.y + cardH * 0.585}" width="${cardW * 0.2}" height="${h * 0.009}" fill="${C.ink}" opacity="0.25"/>
          ${Array.from({ length: 3 })
            .map((_, l) => `<rect x="${c.x + cardW * 0.08}" y="${c.y + cardH * (0.68 + l * 0.07)}" width="${cardW * (0.74 - l * 0.12)}" height="${h * 0.008}" fill="${C.ink}" opacity="${0.18 - l * 0.04}"/>`)
            .join("")}
        </g>`,
      )
      .join("");
    return svgDoc(
      w,
      h,
      `<rect width="${w}" height="${h}" fill="${bg}"/>
       ${grid(w, h, fg, 12, 0.05)}
       <circle cx="${w * 0.86}" cy="${h * 0.12}" r="${w * 0.14}" fill="${accent}" opacity="0.85"/>
       <path d="M${w * 0.08} ${h * 0.9} H ${w * 0.92}" stroke="${fg}" stroke-opacity="0.3"/>
       ${body}
       ${frame(w, h, fg, label)}`,
    );
  },

  site({ w, h, bg = C.ink2, fg = C.paper, accent = C.coral, label = "SOSIAL / WEB" }) {
    const bx = w * 0.08;
    const by = h * 0.12;
    const bw = w * 0.84;
    const bh = h * 0.76;
    return svgDoc(
      w,
      h,
      `<rect width="${w}" height="${h}" fill="${bg}"/>
       ${grid(w, h, fg, 10, 0.04)}
       <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="14" fill="${C.paper}"/>
       <rect x="${bx}" y="${by}" width="${bw}" height="${bh * 0.07}" rx="14" fill="${C.paper3}"/>
       <circle cx="${bx + bw * 0.03}" cy="${by + bh * 0.035}" r="${bh * 0.012}" fill="${C.coral}"/>
       <circle cx="${bx + bw * 0.055}" cy="${by + bh * 0.035}" r="${bh * 0.012}" fill="${C.ink}" opacity="0.25"/>
       <circle cx="${bx + bw * 0.08}" cy="${by + bh * 0.035}" r="${bh * 0.012}" fill="${C.ink}" opacity="0.25"/>
       <rect x="${bx + bw * 0.04}" y="${by + bh * 0.16}" width="${bw * 0.14}" height="${bh * 0.02}" fill="${C.ink}"/>
       <rect x="${bx + bw * 0.7}" y="${by + bh * 0.155}" width="${bw * 0.08}" height="${bh * 0.02}" fill="${C.ink}" opacity="0.35"/>
       <rect x="${bx + bw * 0.84}" y="${by + bh * 0.15}" width="${bw * 0.1}" height="${bh * 0.035}" rx="10" fill="${C.coral}"/>
       <rect x="${bx + bw * 0.04}" y="${by + bh * 0.28}" width="${bw * 0.46}" height="${bh * 0.1}" fill="${C.ink}"/>
       <rect x="${bx + bw * 0.04}" y="${by + bh * 0.4}" width="${bw * 0.4}" height="${bh * 0.1}" fill="${C.ink}"/>
       <rect x="${bx + bw * 0.04}" y="${by + bh * 0.55}" width="${bw * 0.26}" height="${bh * 0.012}" fill="${C.ink}" opacity="0.35"/>
       <rect x="${bx + bw * 0.04}" y="${by + bh * 0.59}" width="${bw * 0.22}" height="${bh * 0.012}" fill="${C.ink}" opacity="0.2"/>
       <rect x="${bx + bw * 0.04}" y="${by + bh * 0.67}" width="${bw * 0.12}" height="${bh * 0.05}" rx="24" fill="${C.ink}"/>
       <rect x="${bx + bw * 0.58}" y="${by + bh * 0.26}" width="${bw * 0.36}" height="${bh * 0.46}" rx="10" fill="${C.violet}" opacity="0.85"/>
       <circle cx="${bx + bw * 0.76}" cy="${by + bh * 0.44}" r="${bh * 0.1}" fill="${C.paper}" opacity="0.9"/>
       <circle cx="${bx + bw * 0.76}" cy="${by + bh * 0.44}" r="${bh * 0.045}" fill="${C.coral}"/>
       <path d="M${bx + bw * 0.58} ${by + bh * 0.72} H ${bx + bw * 0.94}" stroke="${C.paper}" stroke-opacity="0.4"/>
       ${frame(w, h, fg, label)}`,
    );
  },

  radar({ w, h, bg = C.paper, fg = C.ink, accent = C.coral, label = "SOSIAL / STUDIO" }) {
    const cx = w * 0.5;
    const cy = h * 0.46;
    const max = Math.min(w, h) * 0.4;
    const rings = [0.25, 0.5, 0.75, 1]
      .map((r) => `<circle cx="${cx}" cy="${cy}" r="${max * r}" fill="none" stroke="${fg}" stroke-opacity="0.22"/>`)
      .join("");
    const spokes = Array.from({ length: 12 })
      .map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(a) * max}" y2="${cy + Math.sin(a) * max}" stroke="${fg}" stroke-opacity="0.08"/>`;
      })
      .join("");
    return svgDoc(
      w,
      h,
      `<rect width="${w}" height="${h}" fill="${bg}"/>
       <rect x="0" y="${h * 0.72}" width="${w}" height="${h * 0.28}" fill="${fg}" opacity="0.06"/>
       ${rings}${spokes}
       <circle cx="${cx + max * 0.42}" cy="${cy - max * 0.3}" r="${max * 0.05}" fill="${accent}"/>
       <circle cx="${cx - max * 0.55}" cy="${cy + max * 0.4}" r="${max * 0.028}" fill="${fg}"/>
       <circle cx="${cx + max * 0.18}" cy="${cy + max * 0.48}" r="${max * 0.02}" fill="${accent}"/>
       <path d="M${cx} ${cy} L ${cx + max * 0.42} ${cy - max * 0.3}" stroke="${accent}" stroke-width="2"/>
       <path d="M${cx} ${cy} L ${cx - max * 0.55} ${cy + max * 0.4}" stroke="${fg}" stroke-opacity="0.35" stroke-width="1.5"/>
       <circle cx="${cx}" cy="${cy}" r="${max * 0.055}" fill="${fg}"/>
       ${frame(w, h, fg, label)}`,
    );
  },

  portrait({ w, h, bg, fg, accent, initials, label = "" }) {
    return svgDoc(
      w,
      h,
      `<rect width="${w}" height="${h}" fill="${bg}"/>
       <circle cx="${w * 0.5}" cy="${h * 0.42}" r="${w * 0.22}" fill="${fg}" opacity="0.14"/>
       <circle cx="${w * 0.5}" cy="${h * 0.42}" r="${w * 0.16}" fill="none" stroke="${fg}" stroke-opacity="0.35"/>
       <path d="M${w * 0.18} ${h * 0.92} C ${w * 0.24} ${h * 0.62}, ${w * 0.76} ${h * 0.62}, ${w * 0.82} ${h * 0.92}" fill="${fg}" opacity="0.14"/>
       <circle cx="${w * 0.78}" cy="${h * 0.2}" r="${w * 0.035}" fill="${accent}"/>
       <text x="${w * 0.5}" y="${h * 0.46}" text-anchor="middle" font-family="${sans}" font-weight="700" font-size="${w * 0.15}" fill="${fg}" opacity="0.65" letter-spacing="${w * 0.01}">${initials}</text>
       ${label ? `<text x="${w * 0.5}" y="${h * 0.94}" text-anchor="middle" font-family="${sans}" font-size="${w * 0.028}" letter-spacing="${w * 0.006}" fill="${fg}" opacity="0.5">${label}</text>` : ""}
       ${frame(w, h, fg, "SOSIAL")}`,
      { grainOpacity: 0.05 },
    );
  },
};

/* ------------------------------------------------------------------ */
/* The library                                                         */
/* ------------------------------------------------------------------ */

const assets = [
  // Hero / brand
  { file: "hero-frame.svg", w: 1920, h: 1080, type: "orbital", opts: { bg: C.ink, fg: C.paper, accent: C.coral, label: "SOSIAL / SHOWREEL 2026" } },
  { file: "hero-visual.svg", w: 1600, h: 1000, type: "aperture", opts: { bg: C.ink2, fg: C.paper, accent: C.coral } },
  { file: "studio.svg", w: 1200, h: 1500, type: "editorial", opts: { bg: C.paper, fg: C.ink, accent: C.coral, label: "SOSIAL / STUDIO", variant: 1 } },
  { file: "contact.svg", w: 1200, h: 1500, type: "radar", opts: { bg: C.paper2, fg: C.ink, accent: C.coral } },

  // Capability visuals
  { file: "seo-analytics.svg", w: 1600, h: 1000, type: "dashboard", opts: {} },
  { file: "social-campaign.svg", w: 1200, h: 1500, type: "social", opts: {} },
  { file: "branding-system.svg", w: 1200, h: 1500, type: "waves", opts: { bg: C.paper, fg: C.ink, accent: C.coral, label: "SOSIAL / BRANDING" } },
  { file: "web-experience.svg", w: 1600, h: 1000, type: "site", opts: {} },
  { file: "strategy-work.svg", w: 1600, h: 1000, type: "tiles", opts: { bg: C.paper2, fg: C.ink, accent: C.coral } },
  { file: "content-system.svg", w: 1200, h: 1500, type: "editorial", opts: { bg: C.ink, fg: C.paper, accent: C.coral, label: "SOSIAL / CONTENT", variant: 2 } },
  { file: "video-frame.svg", w: 1600, h: 1000, type: "orbital", opts: { bg: C.ink, fg: C.paper, accent: C.coral, label: "SOSIAL / FILM", scale: 0.8 } },

  // Portfolio
  { file: "work-northwind.svg", w: 1600, h: 1200, type: "waves", opts: { bg: C.paper, fg: C.ink, accent: C.coral, label: "CONCEPT / NORTHWIND" } },
  { file: "work-halcyon.svg", w: 1200, h: 1500, type: "aperture", opts: { bg: C.ink2, fg: C.paper, accent: C.coral, label: "CONCEPT / HALCYON" } },
  { file: "work-tessellate.svg", w: 1600, h: 1000, type: "tiles", opts: { bg: C.paper2, fg: C.ink, accent: C.violet, label: "CONCEPT / TESSELLATE" } },
  { file: "work-orbit.svg", w: 1600, h: 1200, type: "orbital", opts: { bg: C.ink, fg: C.paper, accent: C.coral, label: "CONCEPT / ORBIT" } },
  { file: "work-fieldnote.svg", w: 1200, h: 1500, type: "editorial", opts: { bg: C.paper, fg: C.ink, accent: C.coral, label: "CONCEPT / FIELDNOTE" } },
  { file: "work-kite.svg", w: 1600, h: 1000, type: "site", opts: { bg: C.charcoal, fg: C.paper, accent: C.coral, label: "CONCEPT / KITE" } },
  { file: "work-verdant.svg", w: 1600, h: 1200, type: "radar", opts: { bg: C.paper2, fg: C.ink, accent: C.coral, label: "CONCEPT / VERDANT" } },

  // Insights
  { file: "insight-strategy.svg", w: 1200, h: 900, type: "tiles", opts: { bg: C.paper2, fg: C.ink, accent: C.coral, label: "INSIGHT / STRATEGY" } },
  { file: "insight-seo.svg", w: 1200, h: 900, type: "dashboard", opts: { label: "INSIGHT / SEARCH" } },
  { file: "insight-creative.svg", w: 1200, h: 900, type: "waves", opts: { bg: C.paper, fg: C.ink, accent: C.violet, label: "INSIGHT / CREATIVE" } },
  { file: "insight-brand.svg", w: 1200, h: 900, type: "editorial", opts: { bg: C.ink, fg: C.paper, accent: C.coral, label: "INSIGHT / BRAND" } },
  { file: "insight-video.svg", w: 1200, h: 900, type: "orbital", opts: { label: "INSIGHT / FILM", scale: 0.75 } },
  { file: "insight-measurement.svg", w: 1200, h: 900, type: "radar", opts: { bg: C.paper, fg: C.ink, accent: C.violet, label: "INSIGHT / DATA" } },

  // Team + testimonial placeholders
  { file: "team-1.svg", w: 800, h: 800, type: "portrait", opts: { bg: C.ink, fg: C.paper, accent: C.coral, initials: "SL" } },
  { file: "team-2.svg", w: 800, h: 800, type: "portrait", opts: { bg: C.paper2, fg: C.ink, accent: C.coral, initials: "CD" } },
  { file: "team-3.svg", w: 800, h: 800, type: "portrait", opts: { bg: C.ink2, fg: C.paper, accent: C.violet, initials: "PL" } },
  { file: "team-4.svg", w: 800, h: 800, type: "portrait", opts: { bg: C.paper3, fg: C.ink, accent: C.coral, initials: "DL" } },
  { file: "testimonial-1.svg", w: 800, h: 800, type: "portrait", opts: { bg: C.paper, fg: C.ink, accent: C.coral, initials: "PN", label: "SAMPLE TESTIMONIAL" } },
  { file: "testimonial-2.svg", w: 800, h: 800, type: "portrait", opts: { bg: C.ink, fg: C.paper, accent: C.coral, initials: "TM", label: "SAMPLE TESTIMONIAL" } },
  { file: "testimonial-3.svg", w: 800, h: 800, type: "portrait", opts: { bg: C.paper2, fg: C.ink, accent: C.violet, initials: "RB", label: "SAMPLE TESTIMONIAL" } },
];

for (const asset of assets) {
  const fn = compositions[asset.type];
  if (!fn) throw new Error("Unknown composition: " + asset.type);
  const content = fn({ w: asset.w, h: asset.h, ...asset.opts });
  fs.writeFileSync(path.join(OUT, asset.file), content);
}

console.log(`Generated ${assets.length} images in public/assets/images`);

// Social preview card (1200x630), rasterised separately by scripts/rasterize.ps1
const og = svgDoc(
  1200,
  630,
  `<rect width="1200" height="630" fill="${C.ink}"/>
   ${grid(1200, 630, C.paper, 12, 0.05)}
   <circle cx="1010" cy="140" r="250" fill="none" stroke="${C.paper}" stroke-opacity="0.18" stroke-width="1.5"/>
   <circle cx="1010" cy="140" r="180" fill="none" stroke="${C.paper}" stroke-opacity="0.12" stroke-width="1.5"/>
   <circle cx="1010" cy="140" r="90" fill="none" stroke="${C.coral}" stroke-width="10"/>
   <image href="../brand/sosial-logo-reversed.png" x="90" y="86" width="380" height="126" preserveAspectRatio="xMinYMin meet"/>
   <text x="94" y="330" fill="${C.paper}" font-family="${sans}" font-weight="700" font-size="66">One studio for the whole story.</text>
   <text x="96" y="388" fill="${C.paper}" opacity="0.62" font-family="${sans}" font-size="28">Marketing, creative and production, working as one.</text>
   <rect x="96" y="444" width="86" height="6" fill="${C.coral}"/>
   <text x="96" y="520" fill="${C.paper}" opacity="0.45" font-family="${sans}" font-size="20" letter-spacing="4">DIGITAL / CREATIVE / PRODUCTION</text>
   ${grainLayer(1200, 630, "grain", 0.08)}`,
);
fs.writeFileSync(path.join(OUT, "og.svg"), og);
console.log("Generated og.svg");

