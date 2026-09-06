/**
 * Generates the placeholder editorial plates used across the site.
 * These are stylised, palette-matched illustrations meant to be replaced
 * with the Herald's own photography. Run: node scripts/generate-art.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";

const OUT = "public/images";
mkdirSync(OUT, { recursive: true });

const W = 1600;
const H = 900;

const ink = "#14110F";
const cream = "#FAF7F0";
const herald = "#1B4D3E";
const heraldLight = "#2F6B57";
const cherry = "#8E2A2A";
const harvest = "#B8862F";
const harvestLight = "#D8AC55";

const defs = (id, top, bottom) => `
  <defs>
    <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${top}"/>
      <stop offset="100%" stop-color="${bottom}"/>
    </linearGradient>
    <pattern id="halftone-${id}" width="6" height="6" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="0.85" fill="${ink}" opacity="0.16"/>
      <circle cx="4.5" cy="4.5" r="0.85" fill="${ink}" opacity="0.16"/>
    </pattern>
    <linearGradient id="vig-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${ink}" stop-opacity="0.18"/>
      <stop offset="45%" stop-color="${ink}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${ink}" stop-opacity="0.26"/>
    </linearGradient>
  </defs>`;

const grain = (id) =>
  `<rect width="${W}" height="${H}" fill="url(#halftone-${id})"/><rect width="${W}" height="${H}" fill="url(#vig-${id})"/>`;

const wrap = (id, top, bottom, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">${defs(
    id,
    top,
    bottom,
  )}<rect width="${W}" height="${H}" fill="url(#sky-${id})"/>${body}${grain(id)}</svg>`;

/** Rows of trees receding toward a horizon. */
function orchard({ id, top, bottom, ground, trunk, canopy, fruit }) {
  const horizon = 430;
  let body = `<rect y="${horizon}" width="${W}" height="${H - horizon}" fill="${ground}"/>`;
  // Furrow lines converging on a vanishing point
  for (let i = -8; i <= 8; i++) {
    const x = W / 2 + i * 190;
    body += `<path d="M ${W / 2} ${horizon} L ${x} ${H}" stroke="${ink}" stroke-opacity="0.12" stroke-width="2" fill="none"/>`;
  }
  // Tree rows, larger toward the foreground
  const rows = [
    { y: horizon + 20, s: 0.34, n: 11, o: 0.55 },
    { y: horizon + 90, s: 0.55, n: 8, o: 0.72 },
    { y: horizon + 200, s: 0.85, n: 6, o: 0.88 },
    { y: horizon + 350, s: 1.25, n: 4, o: 1 },
  ];
  for (const row of rows) {
    for (let i = 0; i < row.n; i++) {
      const x = ((i + 0.5) / row.n) * W + (row.s > 0.8 ? -60 : 0);
      const th = 120 * row.s;
      const cr = 82 * row.s;
      body += `<g opacity="${row.o}">
        <rect x="${x - 6 * row.s}" y="${row.y - th}" width="${12 * row.s}" height="${th}" fill="${trunk}"/>
        <ellipse cx="${x}" cy="${row.y - th}" rx="${cr * 1.15}" ry="${cr}" fill="${canopy}"/>
        <ellipse cx="${x - cr * 0.4}" cy="${row.y - th - cr * 0.35}" rx="${cr * 0.62}" ry="${cr * 0.55}" fill="${canopy}" opacity="0.75"/>`;
      if (fruit && row.s > 0.5) {
        for (let f = 0; f < Math.round(9 * row.s); f++) {
          const fx = x + (Math.sin(f * 12.9898 + i) * cr * 0.9);
          const fy = row.y - th + Math.cos(f * 78.233 + i) * cr * 0.7;
          body += `<circle cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" r="${(5 * row.s).toFixed(1)}" fill="${fruit}"/>`;
        }
      }
      body += `</g>`;
    }
  }
  return wrap(id, top, bottom, body);
}

/** Storefront row along a two lane road. */
function mainStreet() {
  const id = "street";
  const horizon = 560;
  let body = `<rect y="${horizon}" width="${W}" height="${H - horizon}" fill="#4A443C"/>`;
  body += `<rect y="${horizon}" width="${W}" height="14" fill="${ink}" opacity="0.25"/>`;
  for (let i = 0; i < 9; i++) {
    body += `<rect x="${90 + i * 180}" y="${horizon + 150}" width="90" height="9" fill="${cream}" opacity="0.5"/>`;
  }
  const shops = [
    { w: 210, h: 300, c: "#6E5B4A", awn: cherry },
    { w: 170, h: 250, c: "#7A6754", awn: herald },
    { w: 240, h: 340, c: "#5F5044", awn: harvest },
    { w: 190, h: 275, c: "#71604E", awn: cherry },
    { w: 220, h: 315, c: "#665648", awn: herald },
    { w: 180, h: 260, c: "#7D6A56", awn: harvest },
    { w: 230, h: 330, c: "#5B4D41", awn: cherry },
    { w: 200, h: 285, c: "#75634F", awn: herald },
  ];
  let x = -40;
  for (const s of shops) {
    const y = horizon - s.h;
    body += `<g>
      <rect x="${x}" y="${y}" width="${s.w}" height="${s.h}" fill="${s.c}"/>
      <rect x="${x}" y="${y}" width="${s.w}" height="16" fill="${ink}" opacity="0.35"/>
      <rect x="${x + 10}" y="${y + 40}" width="${s.w - 20}" height="46" fill="${ink}" opacity="0.22"/>
      <path d="M ${x} ${horizon - 120} h ${s.w} l -18 44 h ${-(s.w - 36)} Z" fill="${s.awn}" opacity="0.9"/>
      <rect x="${x + 16}" y="${horizon - 62}" width="${s.w - 32}" height="62" fill="${harvestLight}" opacity="0.35"/>
      <rect x="${x + s.w / 2 - 22}" y="${horizon - 62}" width="44" height="62" fill="${ink}" opacity="0.4"/>
    </g>`;
    x += s.w + 6;
  }
  // Utility poles
  for (const px of [300, 780, 1260]) {
    body += `<rect x="${px}" y="${horizon - 420}" width="10" height="420" fill="${ink}" opacity="0.5"/>
      <rect x="${px - 46}" y="${horizon - 400}" width="102" height="8" fill="${ink}" opacity="0.5"/>`;
  }
  return wrap(id, "#E8DCC4", "#C9B594", body);
}

/** Night stadium with light standards. */
function stadium() {
  const id = "stadium";
  const horizon = 640;
  let body = `<rect y="${horizon}" width="${W}" height="${H - horizon}" fill="${herald}"/>`;
  for (let i = 0; i <= 10; i++) {
    body += `<rect x="${i * 160}" y="${horizon}" width="3" height="${H - horizon}" fill="${cream}" opacity="0.28"/>`;
  }
  body += `<rect y="${horizon + 130}" width="${W}" height="4" fill="${cream}" opacity="0.4"/>`;
  // Light standards with glow
  for (const lx of [220, 700, 1180]) {
    body += `<g>
      <path d="M ${lx} 210 L ${lx - 260} ${horizon + 40} L ${lx + 260} ${horizon + 40} Z" fill="${harvestLight}" opacity="0.13"/>
      <rect x="${lx - 5}" y="150" width="10" height="${horizon - 150}" fill="${ink}" opacity="0.75"/>
      <rect x="${lx - 70}" y="120" width="140" height="46" rx="4" fill="${ink}" opacity="0.85"/>`;
    for (let b = 0; b < 4; b++) {
      body += `<circle cx="${lx - 48 + b * 32}" cy="143" r="12" fill="${harvestLight}"/>`;
    }
    body += `</g>`;
  }
  // Crowd silhouette
  let crowd = "";
  for (let i = 0; i < 90; i++) {
    const cx = (i * 18.4) % W;
    const cy = horizon - 18 - ((i * 37) % 26);
    crowd += `<circle cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" r="11" fill="${ink}" opacity="0.72"/>`;
  }
  body += `<rect y="${horizon - 70}" width="${W}" height="70" fill="${ink}" opacity="0.62"/>${crowd}`;
  return wrap(id, "#1B2430", "#33414C", body);
}

/** Irrigation canal cutting between fields. */
function canal() {
  const id = "canal";
  const horizon = 380;
  let body = `<rect y="${horizon}" width="${W}" height="${H - horizon}" fill="#7F8A5C"/>`;
  body += `<path d="M 690 ${horizon} L 830 ${horizon} L 1180 ${H} L 260 ${H} Z" fill="${heraldLight}"/>`;
  body += `<path d="M 700 ${horizon} L 820 ${horizon} L 1130 ${H} L 320 ${H} Z" fill="#3F7F91"/>`;
  for (let i = 0; i < 12; i++) {
    const t = i / 12;
    const y = horizon + t * (H - horizon);
    const half = 60 + t * 380;
    body += `<rect x="${760 - half * 0.9}" y="${y}" width="${half * 1.8}" height="3" fill="${cream}" opacity="${(0.10 + t * 0.14).toFixed(2)}"/>`;
  }
  // Field furrows on both banks
  for (let i = 0; i < 26; i++) {
    body += `<path d="M ${755 - i * 6} ${horizon} L ${-200 - i * 90} ${H}" stroke="${ink}" stroke-opacity="0.09" stroke-width="3" fill="none"/>`;
    body += `<path d="M ${765 + i * 6} ${horizon} L ${1800 + i * 90} ${H}" stroke="${ink}" stroke-opacity="0.09" stroke-width="3" fill="none"/>`;
  }
  body += `<rect y="${horizon - 6}" width="${W}" height="6" fill="${ink}" opacity="0.28"/>`;
  return wrap(id, "#DCE4EA", "#AFC2B4", body);
}

/** Fair midway at dusk. */
function fair() {
  const id = "fair";
  const horizon = 700;
  let body = `<rect y="${horizon}" width="${W}" height="${H - horizon}" fill="#453A2E"/>`;
  // Ferris wheel
  const cx = 1120;
  const cy = 400;
  const r = 240;
  body += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${ink}" stroke-opacity="0.7" stroke-width="8"/>`;
  body += `<circle cx="${cx}" cy="${cy}" r="${r * 0.62}" fill="none" stroke="${ink}" stroke-opacity="0.45" stroke-width="5"/>`;
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r;
    body += `<line x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${ink}" stroke-opacity="0.5" stroke-width="4"/>`;
    body += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="16" fill="${i % 3 === 0 ? harvestLight : i % 3 === 1 ? cherry : cream}" opacity="0.92"/>`;
  }
  body += `<path d="M ${cx - 90} ${horizon} L ${cx} ${cy} L ${cx + 90} ${horizon} Z" fill="${ink}" opacity="0.65"/>`;
  // Tents
  let tx = 60;
  for (let i = 0; i < 5; i++) {
    const tw = 210;
    body += `<path d="M ${tx} ${horizon} L ${tx + tw / 2} ${horizon - 150} L ${tx + tw} ${horizon} Z" fill="${i % 2 ? cherry : cream}" opacity="0.85"/>
      <rect x="${tx}" y="${horizon - 10}" width="${tw}" height="10" fill="${ink}" opacity="0.4"/>`;
    tx += tw + 24;
  }
  // String lights
  body += `<path d="M 0 210 Q 400 300 800 210 T 1600 240" fill="none" stroke="${ink}" stroke-opacity="0.4" stroke-width="3"/>`;
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const x = t * W;
    const y = 210 + Math.sin(t * Math.PI * 2) * 44 + t * 24;
    body += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="7" fill="${harvestLight}" opacity="0.9"/>`;
  }
  return wrap(id, "#2B2233", "#7A4A3C", body);
}

/** Fire crew silhouette against dry hills. */
function fire() {
  const id = "fire";
  const horizon = 620;
  let body = `<path d="M 0 ${horizon} Q 300 ${horizon - 90} 640 ${horizon - 30} T 1600 ${horizon - 70} L 1600 ${H} L 0 ${H} Z" fill="#8A7A4E"/>`;
  body += `<path d="M 0 ${horizon + 90} Q 420 ${horizon + 30} 900 ${horizon + 110} T 1600 ${horizon + 60} L 1600 ${H} L 0 ${H} Z" fill="#6B5C39"/>`;
  // Engine
  body += `<g>
    <rect x="980" y="${horizon - 30}" width="420" height="130" rx="8" fill="${cherry}"/>
    <rect x="1250" y="${horizon - 96}" width="150" height="80" rx="8" fill="${cherry}"/>
    <rect x="1268" y="${horizon - 80}" width="112" height="46" fill="${ink}" opacity="0.45"/>
    <rect x="980" y="${horizon + 22}" width="420" height="16" fill="${ink}" opacity="0.3"/>
    <circle cx="1070" cy="${horizon + 100}" r="42" fill="${ink}"/>
    <circle cx="1310" cy="${horizon + 100}" r="42" fill="${ink}"/>
    <rect x="1010" y="${horizon - 132}" width="66" height="20" rx="4" fill="${harvestLight}"/>
  </g>`;
  // Crew
  for (const px of [420, 500, 590]) {
    body += `<g fill="${ink}" opacity="0.85">
      <circle cx="${px}" cy="${horizon - 92}" r="20"/>
      <rect x="${px - 22}" y="${horizon - 70}" width="44" height="76" rx="10"/>
      <rect x="${px - 20}" y="${horizon + 4}" width="16" height="60"/>
      <rect x="${px + 4}" y="${horizon + 4}" width="16" height="60"/>
    </g>`;
  }
  // Smoke
  body += `<g fill="${cream}" opacity="0.16">
    <ellipse cx="300" cy="240" rx="260" ry="120"/>
    <ellipse cx="560" cy="180" rx="200" ry="96"/>
    <ellipse cx="140" cy="180" rx="170" ry="86"/>
  </g>`;
  return wrap(id, "#C9A87C", "#E3CFA6", body);
}

/** Classroom interior for school coverage. */
function classroom() {
  const id = "class";
  const floor = 640;
  let body = `<rect y="${floor}" width="${W}" height="${H - floor}" fill="#8C7454"/>`;
  body += `<rect width="${W}" height="${floor}" fill="#D9D2C2"/>`;
  // Windows
  for (let i = 0; i < 3; i++) {
    const x = 1000 + i * 200;
    body += `<rect x="${x}" y="120" width="150" height="300" fill="${heraldLight}" opacity="0.5"/>
      <rect x="${x}" y="120" width="150" height="300" fill="none" stroke="${ink}" stroke-opacity="0.4" stroke-width="6"/>
      <line x1="${x}" y1="270" x2="${x + 150}" y2="270" stroke="${ink}" stroke-opacity="0.4" stroke-width="6"/>`;
  }
  // Chalkboard
  body += `<rect x="120" y="150" width="640" height="280" fill="${herald}"/>
    <rect x="120" y="150" width="640" height="280" fill="none" stroke="#7A6242" stroke-width="16"/>
    <rect x="170" y="220" width="380" height="8" fill="${cream}" opacity="0.35"/>
    <rect x="170" y="260" width="500" height="8" fill="${cream}" opacity="0.28"/>
    <rect x="170" y="300" width="300" height="8" fill="${cream}" opacity="0.28"/>`;
  // Desks in rows
  const rows = [
    { y: floor - 20, s: 1.15, n: 5 },
    { y: floor - 110, s: 0.92, n: 6 },
    { y: floor - 180, s: 0.74, n: 7 },
  ];
  for (const row of rows) {
    for (let i = 0; i < row.n; i++) {
      const x = ((i + 0.5) / row.n) * W;
      const w = 150 * row.s;
      const h = 16 * row.s;
      body += `<g opacity="${0.55 + row.s * 0.35}">
        <rect x="${x - w / 2}" y="${row.y - h}" width="${w}" height="${h}" rx="3" fill="#5F4A33"/>
        <rect x="${x - w / 2 + 10}" y="${row.y}" width="${10 * row.s}" height="${60 * row.s}" fill="${ink}" opacity="0.55"/>
        <rect x="${x + w / 2 - 20}" y="${row.y}" width="${10 * row.s}" height="${60 * row.s}" fill="${ink}" opacity="0.55"/>
        <rect x="${x - w / 2 + 26}" y="${row.y - h - 42 * row.s}" width="${44 * row.s}" height="${42 * row.s}" rx="6" fill="${ink}" opacity="0.28"/>
      </g>`;
    }
  }
  return wrap(id, "#EFE9DA", "#CFC6B2", body);
}

const files = {
  "cherry-harvest.svg": orchard({
    id: "cherry",
    top: "#F3DCC4",
    bottom: "#E0B98C",
    ground: "#8E7B4F",
    trunk: "#5A4330",
    canopy: "#3F6B48",
    fruit: cherry,
  }),
  "walnut-orchard.svg": orchard({
    id: "walnut",
    top: "#DDE6E2",
    bottom: "#B7C7BC",
    ground: "#7E7A55",
    trunk: "#4E4033",
    canopy: herald,
    fruit: null,
  }),
  "main-street.svg": mainStreet(),
  "football.svg": stadium(),
  "canal.svg": canal(),
  "fair.svg": fair(),
  "fire.svg": fire(),
  "school-board.svg": classroom(),
};

for (const [name, svg] of Object.entries(files)) {
  writeFileSync(`${OUT}/${name}`, svg.replace(/\n\s+/g, " ").trim());
  console.log("wrote", name);
}
