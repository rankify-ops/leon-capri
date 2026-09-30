/*
 * Structure mirrors vertical.framer.media section for section. Copy is
 * verbatim from leoncapri.com (home, about, services, contact,
 * work-highlights) unless marked NEW — those need Izaac's sign-off.
 */

export const site = {
  name: "LÉONCAPRI",
  url: "https://www.leoncapri.com",
  founder: "Izaac Trpeski",
  role: "Founder / Creative Director",
  phone: "+61 418 227 172",
  phoneHref: "tel:+61418227172",
  email: "izaac@leoncapri.com",
  instagram: "https://www.instagram.com/leoncapri.studio",
  calLink: "leoncapri/45min",
  calUrl: "https://cal.com/leoncapri/45min",
  location: "Based in New South Wales, Australia.",
  reach: "Consulting nationally and internationally.",
};

export const nav = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
];

export const hero = {
  word: ["LÉON", "CA", "PRI"],
  lines: ["Shape the story.", "Sell the vision.", "Stories that sell."],
  name: "Izaac Trpeski",
  role: "Founder/Creative Director",
  phases: [
    { n: "001", a: "Brand", b: "Identity" },
    { n: "002", a: "Print", b: "Design" },
    { n: "003", a: "Digital", b: "Production" },
    { n: "004", a: "Experiential", b: "Design" },
  ],
  idx: "IDX/LC",
  year: "2022",
  // "We work with…" (their og:description)
  list: ["Property Developers", "Real Estate Agencies", "Architects", "Financiers & Planners", "And Other Consultants"],
};

export const statement = {
  big: "Enduring. Artisanal. Magnetic. A visionary design studio cultivating in the disciplines of branding, design & marketing for the property world and beyond.",
  big2: "Building iconic brands, experiences, and high-performing results.",
  accent: "Design with purpose.",
  small: ["Strategy with emotion.", "Stories that sell.", "Shaping brands, stories and strategies across the property industry and beyond."],
};

export const scatterHead = {
  k: "Selected work — (08)",
  t: "Brands by LÉONCAPRI",
  sub: "Every piece on this page is LÉONCAPRI client work — naming, identity, print, digital and campaign.",
};

// Scattered gallery — real LÉONCAPRI brands.
export const scatter = [
  { slug: "luna", cap: "Luna — Huskisson", x: 64, w: 30, speed: 0.35, top: 2 },
  { slug: "noir", cap: "Noir", x: 14, w: 28, speed: 0.15, top: 8 },
  { slug: "otto", cap: "Otto", x: 1, w: 22, speed: 0.55, top: 26 },
  { slug: "coast-ext", cap: "Coast — North Wollongong", x: 40, w: 26, speed: 0.25, top: 32 },
  { slug: "silk", cap: "Silk", x: 74, w: 24, speed: 0.45, top: 46 },
  { slug: "mara", cap: "Mára", x: 18, w: 26, speed: 0.3, top: 56 },
  { slug: "raya", cap: "Raya", x: 1, w: 24, speed: 0.6, top: 78 },
  { slug: "knightsbridge", cap: "Knightsbridge", x: 56, w: 30, speed: 0.2, top: 72 },
];

export const name = {
  tag: "Name",
  rev: "Léon — Capri",
  big: ["The fusion", "of power", "and poise"],
  title: ["Strength", "and style"],
  cat1: { k: "LÉON — 1.0", v: "LÉON: the mind — artistic, powerful, visionary. Bold creativity, timeless intellect, and innovation grounded in craft." },
  cat2: { k: "CAPRI — 2.0", v: "CAPRI: the soul — sophisticated, elegant, evocative. Design that is not just functional but experiential and emotive." },
  overlay: "A modern creative atelier that balances discipline with imagination, and strategy with beauty.",
};

export const settle = {
  tag: "We collaborate with",
  h: ["Brands thrive when", "vision aligns."],
  sub: ["We partner with the right people and companies", "to craft enduring relationships."],
  src: "Source — LÉONCAPRI",
  modules: [
    { k: "Module — A.1", t: "Development, Finance & Legal", v: "Property Developers, Private Lenders / Financiers, Brokers, Valuers, Property Accountants, Property Lawyers, Conveyancers, Insurance, Strata Management." },
    { k: "Module — A.2", t: "Strategy, Planning & Approvals", v: "Town Planners, Project Managers, Quantity Surveyors, Surveyors, Engineers, Heritage and Sustainability Consultants." },
    { k: "Module — A.3", t: "Design & Engineering", v: "Architects, Interior Designers / Interior Architects, Landscape Architects, Facade, Services and Fire Engineers, Acousticians." },
    { k: "Module — A.4", t: "Construction & Delivery", v: "Builders, All Building Trade Companies, Trade & Material Suppliers, Certifiers / Building Surveyors, OHS Consultants." },
  ],
};

export const luna = {
  title: ["Luna", "Huskisson"],
  study: "Case study 01 / 03",
  sel: "Brand direction & campaign by LÉONCAPRI",
  imgTag: "Luna — LÉONCAPRI",
  bar: ["Pure luxury.", "Beachside living."],
  body: "Luna is Huskisson’s benchmark of pure luxury and beachside living. A premium collection of just 15 curated residences designed in honour of Huskisson’s unique clean and pristine surroundings.",
  tag: "[Huskisson]",
  url: "https://lunahuskisson.com.au/",
  thumbs: ["cut-luna-tote", "cut-luna-phone", "cut-luna-book"],
};

export const services = {
  big: "LÉONCAPRI",
  sub: ["Shaping brands, stories", "and strategies for property."],
  bar: ["Studio — est. 2022", "Services"],
  rows: [
    { k: "Mod — I/LC", t: "Brand Identity", parts: [["Place naming", true], [", strategic brand positioning, brand style guides, ", false], ["art & creative direction", true], [", illustration, copywriting, artist collaboration and IP name registration.", false]] },
    { k: "Mod — II/LC", t: "Print Design", parts: [["Brochures, floor plans", true], [", floor plates, ", false], ["agent flip books", true], [", finishes boards, invitations, information memorandums, books, packaging and editorial.", false]] },
    { k: "Mod — III/LC", t: "Digital Design & Production", parts: [["Web design & development", true], [", UX/UI, social media campaigns, lead generation, EDM, ", false], ["CGI renders and animations", true], [", aerial, architectural and lifestyle photography.", false]] },
    { k: "Mod — IV/LC", t: "Environmental & Experiential", parts: [["Signage, hoarding", true], [" and wayfinding, wallpaper and murals, apparel and merchandise, ", false], ["property display suites", true], [", billboards and sales display flags.", false]] },
    { k: "Mod — V/LC", t: "AI Applications", parts: [["AI applications & implementation", true], [", campaign video creative direction, video production collaboration and ", false], ["corporate headshots", true], [".", false]] },
  ] as { k: string; t: string; parts: [string, boolean][] }[],
};

export const belmere = {
  side: ["Wollongong", "17 Levels", "80+ Residences", "CBD"],
  tag: "Case study 02 / 03 — Complete design & marketing campaign by LÉONCAPRI",
  small: "Wollongong’s newest",
  big: "Belmeré",
  body: "BELMERÉ — Wollongong’s newest landmark in modern city living. Rising 17 levels above the vibrant CBD.",
  overlay: ["City living.", "Elevated."],
  mono: "Over 80 impressive architecturally crafted residences designed for those who seek the perfect balance of urban convenience, coastal lifestyle, and contemporary sophistication.",
  h2: ["A complete design and", "marketing campaign."],
  mono2: ["LÉONCAPRI crafted the", "complete campaign."],
  bottom: ["Rising 17 levels.", "Above the vibrant CBD."],
  url: "https://belmerewollongong.com.au/",
};

export const sprezz = {
  left: "“LÉON” draws from both the lion — a universal emblem of strength, leadership, and courage — and Leonardo da Vinci, symbolizing genius, invention, and artistic mastery.",
  leftStrong: "Bold creativity, timeless intellect.",
  right: "“CAPRI” evokes the famous Italian island — synonymous with beauty, culture, and refined luxury. It suggests an elevated aesthetic, where design is experiential and emotive.",
  rightStrong: "Effortless elegance.",
  word: "sprezzatura",
  sign: "Izaac Trpeski",
  cols: [
    { t: "Design", v: "Every project is approached with authenticity and intent, crafted to inspire connection." },
    { t: "Strategy", v: "A rare synergy between creative direction and development acumen. Outcomes that are visually compelling and commercially enduring." },
    { t: "Story", v: "Building iconic brands, experiences, and high-performing results for the property world and beyond." },
  ],
};

export const quote = {
  text: "“Every project is approached with authenticity and intent, crafted to inspire connection, drive value, and leave a lasting impression” — Izaac",
  // NEW — booking language.
  cta: "Book a call with Izaac Trpeski",
  ctaSub: "An initial discussion about your development. 45 minutes on Google Meet.",
  note: "Izaac works closely on every engagement, so the studio accepts only a select number of projects at a time — and the calendar is often committed well ahead.",
  meta: ["45 minutes", "Google Meet"],
};

export const coast = {
  title: "Coast",
  tag: "Case study 03 / 03 — Brand identity & custom typeface by LÉONCAPRI",
  body: "Inspired by the dramatic Amalfi Coast-like escarpment where the steep mountains meet the sea, Coast is a series of 12 exceptional PRD designed residences.",
  small: ["North Wollongong", "12 Residences"],
  link: "coastwollongong.com.au",
  url: "https://coastwollongong.com.au/",
  concept: ["Brand", "Identity"],
  crumbs: ["Concept", "Coastal"],
  conceptBody: "Lush gardens by DSB Landscape Architects. Homes awash with stunning marble surfaces. The custom hand-crafted ‘COAST’ font draws light to the curves on each level.",
  years: ["12", "PRD"],
  trace: "Topography",
  code: "COAST",
  list: ["Custom typeface", "Circular logo device", "Place branding", "Marketing campaign"],
  tagline: "The circular logo device incorporates topography patterns and pays homage to the local Dharawal nation.",
};

export const about = {
  big: "I’m",
  name: "Izaac Trpeski",
  mono: "Founder / Creative Director. Two decades of design and property development.",
  sign: "Independent creative director",
  right: "Guided by over two decades of design and property development experience, Izaac brings a rare synergy between creative direction and development acumen.",
  mid: [["I shape ", false], ["brands", true], [", ", false], ["stories", true], [" and ", false], ["strategies", true], [".", false]] as [string, boolean][],
  midSub: ["Every project starts with a conversation.", "The best ones start early."],
  quote: "“Design with purpose. Strategy with emotion. Stories that sell.”",
  quoteBy: "— LÉONCAPRI",
  things: ["Place naming", "Brand identity", "Brochures & flip books", "Web design", "CGI & photography", "Signage & hoarding", "Display suites", "Campaign direction"],
};

export const footer = {
  big: "Book a Call",
  studio: ["Consulting nationally", "and internationally.", "Based in New South Wales,", "Australia."],
  word: "LÉONCAPRI",
};

/* ── v4 ─────────────────────────────────────────────────────────────── */

export const facts = [
  { k: "Established", v: "2022" },
  { k: "Experience", v: "Over two decades" },
  { k: "Practice", v: "Multi-disciplinary" },
  { k: "Reach", v: "National & International" },
];

// Case studies (their work-highlights pages).
export const featured = [
  { slug: "luna", name: "Luna", place: "Huskisson — 15 residences", url: "https://lunahuskisson.com.au/", host: "lunahuskisson.com.au" },
  { slug: "belmere", name: "Belmeré", place: "Wollongong — 17 levels, 80+ residences", url: "https://belmerewollongong.com.au/", host: "belmerewollongong.com.au" },
  { slug: "coast", name: "Coast", place: "North Wollongong — 12 residences", url: "https://coastwollongong.com.au/", host: "coastwollongong.com.au" },
];

// Every other brand on their Work page.
export const archive = [
  { slug: "air", name: "Air" },
  { slug: "otto", name: "Otto" },
  { slug: "silk", name: "Silk" },
  { slug: "knightsbridge", name: "Knightsbridge" },
  { slug: "mara", name: "Mára" },
  { slug: "paloma", name: "Paloma" },
  { slug: "raya", name: "Raya" },
  { slug: "noir", name: "Noir" },
  { slug: "oasis", name: "Oasis" },
  { slug: "natura", name: "Natura" },
  { slug: "svt", name: "South Village Thirroul" },
  { slug: "mind", name: "MIND" },
];
