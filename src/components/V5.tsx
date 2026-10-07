"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Lenis from "lenis";
import { asset } from "@/lib/basePath";
import { site } from "@/content/site";
import { Book, EASE, Img, Logo } from "./fx";

/*
 * v5 — rebuilt on the knownby.studio structure: white ground, warm
 * brown-black ink, a medium grotesk for headings, a small serif for
 * captions and nav, hairline-divided sections, quiet fade-ups.
 * Copy is LÉONCAPRI's own unless marked NEW.
 */

const INK = "#291c10";

/* ── small parts ─────────────────────────────────────────────────────── */

function Fade({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Underlined text link with the ↗ arrow, Known By style. */
function Arrow({ children, href, book = false, className = "" }: { children: React.ReactNode; href?: string; book?: boolean; className?: string }) {
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
        ↗
      </span>
    </>
  );
  const cls = `group inline-flex items-center gap-1.5 border-b border-current/40 pb-0.5 transition-colors hover:border-current ${className}`;
  if (book) return <Book className={cls}>{inner}</Book>;
  return (
    <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noopener" className={cls}>
      {inner}
    </a>
  );
}

function H2({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`v5-h text-[50px] md:text-[clamp(56px,5.6vw,80px)] ${className}`}>{children}</h2>;
}

/* ── smooth scroll ───────────────────────────────────────────────────
 * The "keeps gliding after you stop" feel on knownby.studio is Lenis
 * (v1.2.3, same as theirs): wheel input is eased, so the page settles over
 * ~1s instead of stopping dead. Anchor links glide too. Skipped for
 * reduced motion; touch keeps native momentum (Lenis default). */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -60 } });
    return () => lenis.destroy();
  }, []);
  return null;
}

/* ── header ──────────────────────────────────────────────────────────── */

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
];

export function Header5() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > window.innerHeight - 80);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid ? "border-b border-black/10 bg-white text-[#291c10]" : "text-white"}`}
    >
      <div className="v5-px grid h-[60px] grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <a href="#top" aria-label="LÉONCAPRI — top">
          <Logo className="w-[118px] md:w-[140px]" />
        </a>
        <nav className="v5-serif hidden items-center gap-6 text-[15px] md:flex" aria-label="Sections">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="transition-opacity hover:opacity-60">
              {n.label}
            </a>
          ))}
        </nav>
        <Book className="v5-serif justify-self-end text-[15px] transition-opacity hover:opacity-60">Book a call ↗</Book>
      </div>
    </header>
  );
}

/* ── hero: showreel of his projects ──────────────────────────────────── */

const SLIDES = [
  { src: "/img/coast-ext-2400.webp", name: "Coast", place: "North Wollongong", pos: "40% 55%" },
  { src: "/img/coast-sunset-2400.webp", name: "Coast", place: "North Wollongong", pos: "60% 50%" },
  { src: "/img/belmere-day.jpg", name: "Belmeré", place: "Wollongong", pos: "30% 50%" },
  { src: "/img/luna-sand-2400.webp", name: "Luna", place: "Huskisson", pos: "50% 50%" },
];
const HOLD = 5200;

export function Hero5() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), HOLD);
    return () => clearInterval(t);
  }, []);
  const s = SLIDES[i];

  return (
    <section id="top" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-[#291c10] text-white">
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        >
          <motion.img
            src={asset(s.src)}
            alt={`${s.name}, ${s.place} — by LÉONCAPRI`}
            className="h-full w-full object-cover"
            style={{ objectPosition: s.pos }}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: HOLD / 1000 + 1.4, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0)_22%,rgba(0,0,0,0)_62%,rgba(0,0,0,0.42)_100%)]" />

      {/* Project name, centred, changes with the slide. */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={s.name + i}
            className="v5-serif text-[clamp(40px,7vw,104px)] uppercase tracking-[0.06em]"
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {s.name}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="v5-px absolute inset-x-0 bottom-5 flex items-end justify-between gap-6 md:bottom-6">
        <p className="v5-serif text-[14px] leading-[1.3] md:text-[16px]">
          Shape the story. Sell the vision.
          <br />
          Branding, Design &amp; Marketing Studio
          <br />
          New South Wales, Australia
        </p>
        <div className="text-right">
          <p className="v5-serif text-[14px] md:text-[16px]">
            {s.name} — {s.place}
          </p>
          <div className="mt-2 flex justify-end gap-1.5" aria-hidden>
            {SLIDES.map((_, k) => (
              <span key={k} className="relative h-[2px] w-8 overflow-hidden bg-white/35">
                {k === i && (
                  <motion.span
                    key={i}
                    className="absolute inset-y-0 left-0 bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: HOLD / 1000, ease: "linear" }}
                  />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── intro ───────────────────────────────────────────────────────────── */

export function Intro5() {
  return (
    <section className="v5-px pb-20 pt-24 md:pb-28 md:pt-32">
      <Fade>
        <H2>
          Enduring. Artisanal.
          <br />
          Magnetic.
        </H2>
      </Fade>
      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
        <Fade className="md:col-span-5" delay={0.1}>
          <p className="text-[17px] leading-[1.35] md:text-[18px]">
            A visionary design studio cultivating in the disciplines of branding, design &amp; marketing for the property world and beyond. Building iconic brands,
            experiences, and high-performing results.
          </p>
          <div className="mt-6 text-[17px] md:text-[18px]">
            <Arrow book>Book a call</Arrow>
          </div>
        </Fade>
        <Fade className="md:col-span-7" delay={0.2}>
          <div className="overflow-hidden">
            <Img slug="coast-brochure" alt="Coast marketing brochure — by LÉONCAPRI" sizes="(min-width: 768px) 58vw, 100vw" className="aspect-[4/3] w-full object-cover" />
          </div>
          <p className="v5-serif mt-2 text-[14px] opacity-70">Coast — marketing brochure</p>
        </Fade>
      </div>
    </section>
  );
}

/* ── our work: one draggable strip of every project ──────────────────── */

const WORK = [
  { slug: "luna", name: "Luna", note: "Huskisson · Brand direction & campaign", ar: 1600 / 1132 },
  { slug: "belmere", name: "Belmeré", note: "Wollongong · Complete design & marketing campaign", ar: 1600 / 1134 },
  { slug: "coast", name: "Coast", note: "North Wollongong · Brand identity & custom typeface", ar: 1600 / 1133 },
  { slug: "air", name: "Air", ar: 16 / 9 },
  { slug: "otto", name: "Otto", ar: 16 / 9 },
  { slug: "silk", name: "Silk", ar: 16 / 9 },
  { slug: "knightsbridge", name: "Knightsbridge", ar: 16 / 9 },
  { slug: "mara", name: "Mára", ar: 16 / 9 },
  { slug: "paloma", name: "Paloma", ar: 16 / 9 },
  { slug: "raya", name: "Raya", ar: 16 / 9 },
  { slug: "noir", name: "Noir", ar: 16 / 9 },
  { slug: "oasis", name: "Oasis", ar: 16 / 9 },
  { slug: "natura", name: "Natura", ar: 16 / 9 },
  { slug: "svt", name: "South Village Thirroul", ar: 16 / 9 },
  { slug: "mind", name: "MIND", ar: 2 },
];

const SPEED = 32; // px per second — slow, continuous drift

/**
 * "Our work": an endless, slowly drifting strip. Two copies of the list sit
 * side by side and the track is translated (GPU transform, sub-pixel smooth)
 * by an offset that wraps at one copy's width, so the loop never jumps.
 * Hover eases it to a stop; drag (mouse or touch) and the arrows move it.
 */
export function Work5() {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const set = useRef<HTMLDivElement>(null);
  const st = useRef({ offset: 0, speed: SPEED, target: SPEED, dragging: false, lastX: 0, tween: null as null | { from: number; to: number; t0: number } });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = st.current;
    if (reduced) s.speed = s.target = 0;
    let raf = 0;
    let last = performance.now();
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (viewport.current) io.observe(viewport.current);

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const w = set.current?.offsetWidth ?? 0;
      if (w && visible) {
        // Ease the speed toward its target (hover stop / resume feels soft).
        s.speed += (s.target - s.speed) * Math.min(1, dt * 3);
        if (s.tween) {
          if (s.tween.t0 < 0) s.tween.t0 = now;
          const k = Math.min(1, (now - s.tween.t0) / 700);
          const e = 1 - Math.pow(1 - k, 3);
          s.offset = s.tween.from + (s.tween.to - s.tween.from) * e;
          if (k >= 1) s.tween = null;
        } else if (!s.dragging) {
          s.offset += s.speed * dt;
        }
        const x = ((s.offset % w) + w) % w;
        if (track.current) track.current.style.transform = `translate3d(${-x}px,0,0)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const s = st.current;
    const step = (viewport.current?.clientWidth ?? 800) * 0.6;
    s.tween = { from: s.offset, to: s.offset + dir * step, t0: -1 }; // stamped by the frame loop
  };

  return (
    <section id="work" className="scroll-mt-16 border-t border-black/10 pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="v5-px flex flex-wrap items-end justify-between gap-6">
        <Fade>
          <H2>Our work</H2>
          <p className="mt-6 max-w-[620px] text-[17px] leading-[1.35] md:text-[18px]">
            Brands thrive when vision and collaboration align. We partner with the right people and companies to craft enduring relationships and build award-winning
            brands.
          </p>
        </Fade>
        <div className="flex gap-2">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => nudge(d)}
              aria-label={d < 0 ? "Previous projects" : "Next projects"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-black/20 text-[18px] transition-colors hover:bg-[#291c10] hover:text-white"
            >
              {d < 0 ? "←" : "→"}
            </button>
          ))}
        </div>
      </div>

      <Fade delay={0.1}>
        <div
          ref={viewport}
          className="mt-10 cursor-grab touch-pan-y select-none overflow-hidden pb-4 active:cursor-grabbing md:mt-14"
          onPointerEnter={(e) => e.pointerType === "mouse" && (st.current.target = 0)}
          onPointerLeave={() => {
            st.current.target = SPEED;
            st.current.dragging = false;
          }}
          onPointerDown={(e) => {
            st.current.dragging = true;
            st.current.tween = null;
            st.current.lastX = e.clientX;
            (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            const s = st.current;
            if (!s.dragging) return;
            s.offset -= e.clientX - s.lastX;
            s.lastX = e.clientX;
          }}
          onPointerUp={(e) => {
            st.current.dragging = false;
            if (e.pointerType !== "mouse") st.current.target = SPEED;
          }}
          onPointerCancel={() => {
            st.current.dragging = false;
            st.current.target = SPEED;
          }}
        >
          <div ref={track} className="flex w-max will-change-transform">
            {[0, 1].map((copy) => (
              <div key={copy} ref={copy === 0 ? set : undefined} className="flex gap-3 pr-3 md:gap-5 md:pr-5" aria-hidden={copy === 1}>
                {WORK.map((w) => (
                  <figure key={w.slug} className="group shrink-0">
                    <div className="w-[208px] overflow-hidden bg-[#f1eee9] md:w-[400px]" style={{ aspectRatio: "3 / 2" }}>
                      <Img
                        slug={w.slug}
                        alt={copy === 0 ? `${w.name} — by LÉONCAPRI` : ""}
                        sizes="40vw"
                        className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <figcaption className="v5-serif mt-2.5 whitespace-nowrap text-[14px] md:mt-3 md:text-[16px]">{w.name}</figcaption>
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Fade>
    </section>
  );
}

/* ── services ────────────────────────────────────────────────────────── */

const SERVICES = [
  { t: "Brand Identity", d: "Place naming, strategic brand positioning, brand style guides, art & creative direction." },
  { t: "Print Design", d: "Brochures, floor plans, agent flip books, finishes boards, information memorandums." },
  { t: "Digital Design & Production", d: "Web design & development, social media campaigns, lead generation, CGI renders and animations." },
  { t: "Environmental & Experiential", d: "Signage, hoarding, wayfinding, property display suites, billboards and sales display flags." },
];

export function Services5() {
  return (
    <section id="services" className="v5-px scroll-mt-16 border-t border-black/10 pb-20 pt-16 md:pb-28 md:pt-24">
      <Fade>
        <H2>
          Design with purpose.
          <br />
          Strategy with emotion.
        </H2>
      </Fade>
      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12">
        <Fade className="md:col-span-4" delay={0.1}>
          <div className="overflow-hidden">
            <Img slug="luna-tote" alt="Luna tote — by LÉONCAPRI" sizes="(min-width: 768px) 33vw, 100vw" className="aspect-[4/5] w-full object-cover" />
          </div>
        </Fade>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 md:col-span-8">
          {SERVICES.map((s, i) => (
            <Fade key={s.t} delay={0.1 + i * 0.08} className="border-t border-black/15 pt-4">
              <h3 className="v5-h text-[26px] md:text-[30px]">{s.t}</h3>
              <p className="mt-3 max-w-[340px] text-[15px] leading-[1.4] opacity-80">{s.d}</p>
              <div className="mt-4 text-[15px]">
                <Arrow book>Enquire</Arrow>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── quote ───────────────────────────────────────────────────────────── */

export function Quote5() {
  return (
    <section className="v5-px border-t border-black/10 py-20 md:py-28">
      <Fade className="mx-auto max-w-[860px] text-center">
        <p className="text-[clamp(22px,2.4vw,34px)] leading-[1.25] tracking-[-0.01em]">
          “Every project is approached with authenticity and intent, crafted to inspire connection, drive value, and leave a lasting impression.”
        </p>
        <p className="v5-serif mt-6 text-[15px]">
          {site.founder}
          <br />
          <span className="opacity-60">Founder, LÉONCAPRI</span>
        </p>
      </Fade>
    </section>
  );
}

/* ── about Izaac ─────────────────────────────────────────────────────── */

export function About5() {
  return (
    <section id="about" className="v5-px scroll-mt-16 border-t border-black/10 pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <Fade>
            <H2>{site.founder}</H2>
            <p className="v5-serif mt-4 text-[16px] opacity-70">{site.role}</p>
          </Fade>
          <Fade delay={0.1} className="mt-10 max-w-[560px] space-y-5 text-[17px] leading-[1.4] md:text-[18px]">
            <p>
              Guided by over two decades of design and property development experience, Director Izaac brings a rare synergy between creative direction and
              development acumen. Every project is approached with authenticity and intent, crafted to inspire connection, drive value, and leave a lasting impression.
            </p>
            <p className="opacity-70">
              Established in 2022, LEONCAPRI is a multi-disciplinary design practice specialising in Design, Branding, Marketing, and Experience Design, shaping
              brands, stories and strategies across the property industry and beyond.
            </p>
            <div className="pt-2">
              <Arrow book>Book a call with Izaac</Arrow>
            </div>
          </Fade>
        </div>
        <Fade className="md:col-span-5 md:col-start-8" delay={0.15}>
          {/* PLACEHOLDER — Izaac's portrait. */}
          <div className="relative flex aspect-[4/5] items-end bg-[linear-gradient(160deg,#ece7df,#d9d1c5)] p-5">
            <p className="v5-serif text-[14px] opacity-60">Portrait — {site.founder}</p>
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ── contact ─────────────────────────────────────────────────────────── */

const INTEREST = ["Brand Identity", "Print Design", "Digital", "Experiential", "Not sure yet"];

export function Contact5() {
  const [picked, setPicked] = useState<string[]>([]);
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = [
      `Name: ${f.get("first")} ${f.get("last")}`,
      `Business: ${f.get("business")}`,
      `Email: ${f.get("email")}`,
      `Phone: ${f.get("phone")}`,
      `Project location: ${f.get("location")}`,
      `Interested in: ${picked.join(", ") || "—"}`,
      "",
      `${f.get("message")}`,
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}&body=${encodeURIComponent(body)}`;
  };
  const field = "w-full border-b border-black/20 bg-transparent py-2 text-[15px] outline-none transition-colors placeholder:text-black/35 focus:border-[#291c10]";

  return (
    <section id="book" className="v5-px scroll-mt-16 border-t border-black/10 pb-24 pt-16 md:pb-32 md:pt-24">
      <Fade>
        <H2>
          Ready to break ground?
          <br />
          Let’s work together.
        </H2>
      </Fade>
      <div className="mt-12 grid gap-14 md:mt-16 md:grid-cols-12">
        <Fade className="md:col-span-5" delay={0.1}>
          <div className="max-w-[420px] space-y-4 text-[16px] leading-[1.4]">
            {/* NEW — booking language. */}
            <p>We’re excited to collaborate on your next project. Izaac works closely on every engagement, so the studio takes on a select number of projects at a time.</p>
            <p className="opacity-70">Book a 45-minute call to pick a convenient time, or send an enquiry and Izaac will be in touch.</p>
          </div>
          <Book className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#291c10] px-5 py-2.5 text-[15px] transition-colors hover:bg-[#291c10] hover:text-white">
            Book a call ↗
          </Book>
          <div className="mt-7 flex flex-col items-start gap-2 text-[15px]">
            <Arrow href={`mailto:${site.email}?subject=Enquiry`}>{site.email}</Arrow>
            <Arrow href={site.phoneHref}>{site.phone}</Arrow>
          </div>
          <div className="mt-10 hidden max-w-[420px] overflow-hidden md:block">
            <Img slug="belmere-print" alt="Belmeré marketing brochure — by LÉONCAPRI" sizes="420px" className="aspect-[1600/1132] w-full object-cover" />
          </div>
        </Fade>

        <Fade className="md:col-span-6 md:col-start-7" delay={0.15}>
          <form onSubmit={submit} className="v5-serif grid grid-cols-2 gap-x-6 gap-y-6 text-[14px]">
            {[
              ["first", "First name", "First name", 1],
              ["last", "Last name", "Last name", 1],
              ["business", "Business name", "Your business name", 2],
              ["email", "Email address", "email@company.com", 2],
              ["phone", "Phone number", "Phone", 1],
              ["location", "Project location", "Suburb, State", 1],
            ].map(([n, l, ph, span]) => (
              <label key={n as string} className={span === 2 ? "col-span-2" : "col-span-2 sm:col-span-1"}>
                <span>{l}</span>
                <input name={n as string} type={n === "email" ? "email" : "text"} required={n === "email" || n === "first"} placeholder={ph as string} className={`${field} mt-1 font-sans`} />
              </label>
            ))}
            <fieldset className="col-span-2">
              <legend>What services are you interested in? Pick as many as you’d like.</legend>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3 font-sans text-[14px]">
                {INTEREST.map((s) => {
                  const on = picked.includes(s);
                  return (
                    <label key={s} className="inline-flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={on}
                        onChange={() => setPicked((p) => (on ? p.filter((x) => x !== s) : [...p, s]))}
                      />
                      <span className={`flex h-4 w-4 items-center justify-center rounded-[3px] border ${on ? "border-[#291c10] bg-[#291c10] text-white" : "border-black/30"} text-[10px] peer-focus-visible:outline peer-focus-visible:outline-2`}>
                        {on ? "✓" : ""}
                      </span>
                      {s}
                    </label>
                  );
                })}
              </div>
            </fieldset>
            <label className="col-span-2">
              <span>Tell us about your project, add any info you think will be helpful.</span>
              <textarea name="message" rows={4} placeholder="Share your message here…" className={`${field} mt-1 resize-y font-sans`} />
            </label>
            <div className="col-span-2">
              <button type="submit" className="group inline-flex items-center gap-1.5 border-b border-current/40 pb-0.5 font-sans text-[15px] transition-colors hover:border-current">
                Submit <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
              </button>
            </div>
          </form>
        </Fade>
      </div>
    </section>
  );
}

/* ── footer ──────────────────────────────────────────────────────────── */

function SydneyTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-AU", { timeZone: "Australia/Sydney", weekday: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
        .format(new Date())
        .replace(",", "");
    const tick = () => setT(fmt());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 30000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  return <span suppressHydrationWarning>{t}</span>;
}

export function Footer5() {
  const cols = [
    { h: "Pages", items: [["Home", "#top"], ["Work", "#work"], ["Services", "#services"], ["About", "#about"], ["Book a call", "#book"]] },
    { h: "Services", items: SERVICES.map((s) => [s.t, "#services"]) },
    { h: "Studio", items: [[site.location.replace(".", ""), ""], [site.email, `mailto:${site.email}`], [site.phone, site.phoneHref]] },
    { h: "Follow us", items: [["Instagram", site.instagram]] },
  ];
  return (
    <footer className="v5-px bg-[#291c10] pb-6 pt-16 text-white md:pt-20">
      <div className="grid gap-10 border-t border-white/15 pt-8 sm:grid-cols-2 md:grid-cols-4">
        {cols.map((c) => (
          <div key={c.h}>
            <p className="text-[15px]">{c.h}</p>
            <ul className="v5-serif mt-4 space-y-1.5 text-[14px] text-white/85">
              {c.items.map(([l, href]) => (
                <li key={l}>
                  {href ? (
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="transition-opacity hover:opacity-60">
                      {l}
                    </a>
                  ) : (
                    l
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-20 flex items-end justify-between gap-6 border-t border-white/15 pt-6 md:mt-28">
        <Logo className="w-[200px] md:w-[300px]" />
        <p className="v5-serif text-[14px] text-white/80">
          <SydneyTime />
        </p>
      </div>
      <p className="v5-serif mt-6 text-[12px] text-white/50">© {new Date().getFullYear()} LÉONCAPRI</p>
    </footer>
  );
}

export { INK };
