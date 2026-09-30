/*
 * Copy is verbatim from leoncapri.com (home, about, services, contact,
 * work-highlights) unless marked NEW — those lines were written for this
 * booking page and need Izaac's sign-off.
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

export const hero = {
  line1: "Shape the story.",
  line2: "Sell the vision.",
  kicker: "Enduring. Artisanal. Magnetic.",
  // NEW — hero sub-line (the studio line itself runs in full just below).
  sub: "Branding, design & marketing for the property world — by appointment with founder Izaac Trpeski.",
  intro:
    "A visionary design studio cultivating in the disciplines of branding, design & marketing for the property world and beyond. Building iconic brands, experiences, and high-performing results.",
};

// NEW — top bar + booking language (Tom's brief: booked out, elevated, not cocky).
export const booking = {
  bar: "Now scheduling initial discussions · Limited engagements each season",
  kicker: "By appointment",
  title: ["A considered conversation,", "held in advance."],
  body: [
    "Izaac works closely on every engagement, so the studio accepts only a select number of projects at a time — and the calendar is often committed well ahead.",
    "If a development is on your horizon, an early conversation is the most graceful place to begin.",
  ],
  cta: "Reserve an initial discussion",
};

export const facts = [
  { k: "Established", v: "2022" },
  { k: "Experience", v: "Over two decades" },
  { k: "Practice", v: "Multi-disciplinary" },
  { k: "Reach", v: "National & International" },
];

export const featured = [
  {
    slug: "luna",
    name: "Luna",
    place: "Huskisson",
    url: "https://lunahuskisson.com.au/",
    host: "lunahuskisson.com.au",
    body: "Luna is Huskisson’s benchmark of pure luxury and beachside living. A premium collection of just 15 curated residences designed in honour of Huskisson’s unique clean and pristine surroundings. A design focus on aesthetic opulence, the brand direction highlights all the beauty inside and out.",
    main: "luna",
    side: ["luna-tote", "luna-phone"],
  },
  {
    slug: "belmere",
    name: "Belmeré",
    place: "Wollongong",
    url: "https://belmerewollongong.com.au/",
    host: "belmerewollongong.com.au",
    body: "BELMERÉ — Wollongong’s newest landmark in modern city living. Rising 17 levels above the vibrant CBD, BELMERÉ offers over 80 impressive architecturally crafted residences designed for those who seek the perfect balance of urban convenience, coastal lifestyle, and contemporary sophistication. LÉONCAPRI crafted a complete design and marketing campaign for the Belmeré development.",
    main: "video",
    side: ["belmere-brochure"],
  },
  {
    slug: "coast",
    name: "Coast",
    place: "North Wollongong",
    url: "https://coastwollongong.com.au/",
    host: "coastwollongong.com.au",
    body: "Inspired by the dramatic Amalfi Coast-like escarpment where the steep mountains meet the sea, Coast is a series of 12 exceptional PRD designed residences with lush gardens by DSB Landscape Architects. The custom hand-crafted ‘COAST’ font draws light to the curves on each level. The circular logo device incorporates topography patterns and pays homage to the local Dharawal nation.",
    main: "coast",
    side: ["coast-phone", "coast-laptop"],
  },
] as const;

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

export const archiveLine =
  "Brands thrive when vision and collaboration align. We partner with the right people and companies to craft enduring relationships and build award-winning brands.";

export const founder = {
  bio: "Guided by over two decades of design and property development experience, Director Izaac brings a rare synergy between creative direction and development acumen. Every project is approached with authenticity and intent, crafted to inspire connection, drive value, and leave a lasting impression.",
  studio:
    "Established in 2022, LEONCAPRI is a multi-disciplinary design practice specialising in Design, Branding, Marketing, and Experience Design, shaping brands, stories and strategies across the property industry and beyond.",
  motto: ["Design with purpose.", "Strategy with emotion.", "Stories that sell."],
};

export const disciplines = [
  {
    name: "Brand Identity",
    items: ["Place Naming", "Strategic Brand Positioning", "Brand Style Guides", "Art & Creative Direction", "Illustration", "Copywriting", "Artist Collaboration", "IP Name Registration"],
  },
  {
    name: "Print Design",
    items: ["Brochures", "Floor Plans", "Floor Plates", "Agent Flip Books", "Finishes Boards", "Marketing Flyers", "Stationery", "Invitations", "Information Memorandums", "Books", "Packaging", "Collateral Systems", "Editorial", "Press Ads", "Print Setup"],
  },
  {
    name: "Digital Design & Production",
    items: ["Web Design & Development", "UX/UI Design", "Social Media Campaigns", "Lead Generation", "Content Creation", "EDM (Electronic Direct Mail to databases)", "Web Banners", "E-Books", "PDF Brochures", "Digital Floor Plans", "Digital Floor Plates", "CGI Renders", "Aerial & Drone Photography", "Architectural Photography", "Lifestyle Photography", "Corporate Headshots", "Video Production Collaboration", "Campaign Video Creative Direction", "CGI Renditions", "CGI Animations", "AI Applications & Implementation"],
  },
  {
    name: "Environmental & Experiential",
    items: ["Signage", "Hoarding", "Wayfinding", "Wallpaper + Murals", "Apparel + Merchandise", "Property Display Suites", "Aframes, Billboards, Sales Display Flags", "Experiential", "and more..."],
  },
];

export const audience =
  "We work with Property Developers, Real Estate Agencies, Architects and other consultants.";

export const name = {
  leon: "LÉON: the mind — artistic, powerful, visionary.",
  capri: "CAPRI: the soul — sophisticated, elegant, evocative.",
  close: "The fusion of power and poise, LÉONCAPRI© is a marriage of strength and style, and intellect and instinct.",
};
