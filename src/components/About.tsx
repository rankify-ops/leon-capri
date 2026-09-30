"use client";

import { motion } from "motion/react";
import { asset } from "@/lib/basePath";
import { about, footer, nav, site } from "@/content/site";
import { Book, EASE, Rise, ScrollText } from "./fx";

/** Portrait placeholder with the template's horizontal slice glitch. */
function Portrait() {
  const slices = [
    { top: "38%", h: "5%", d: "0s" },
    { top: "46%", h: "3%", d: "0.2s" },
    { top: "52%", h: "4%", d: "0.1s" },
  ];
  const bg = "radial-gradient(80% 60% at 55% 35%, #33363b, #0b0c0e 70%)";
  return (
    <div className="slices relative aspect-[4/5] w-full" style={{ background: bg }}>
      {/* PLACEHOLDER — Izaac's portrait. */}
      {slices.map((s, i) => (
        <span key={i} className="s" style={{ top: s.top, height: s.h, background: bg, backgroundSize: "100% 2000%", animationDelay: s.d }} />
      ))}
      <p className="mono absolute bottom-3 left-3 text-fg-3">Portrait — {site.founder}</p>
    </div>
  );
}

const SOCIALS = [
  { href: site.instagram, label: "Instagram", d: "M4 1h8a3 3 0 013 3v8a3 3 0 01-3 3H4a3 3 0 01-3-3V4a3 3 0 013-3zm4 4a3 3 0 100 6 3 3 0 000-6zm4.5-1.2a.8.8 0 100 1.6.8.8 0 000-1.6z" },
  { href: `mailto:${site.email}?subject=Enquiry`, label: "Email", d: "M1 3h14v10H1zM1 3l7 6 7-6" },
  { href: site.phoneHref, label: "Phone", d: "M4 1l2 4-2 1a8 8 0 004 4l1-2 4 2-1 3C6 14 2 10 1 4z" },
];

export function About() {
  return (
    <section className="px relative z-10 bg-bg pb-20 pt-20 md:pt-28">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr_1fr] lg:gap-8">
        <div>
          <h2 className="d text-[clamp(90px,10vw,170px)] leading-[0.8] text-grey">
            <Rise>{about.big}</Rise>
          </h2>
          <p className="d2 mt-3 text-[clamp(28px,2.6vw,42px)] text-accent">
            <Rise delay={0.1}>{about.name}</Rise>
          </p>
          <div className="mt-2 h-[3px] bg-white/25" />
          <p className="mono mt-3 text-fg-2">{about.mono}</p>
          <p className="mt-8 text-[22px] italic tracking-[-0.03em] text-fg-2">{site.founder}</p>
          <p className="mt-1 text-[11px] font-semibold">{about.sign}</p>
        </div>
        <div className="lg:pt-6">
          <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE }}>
            <Portrait />
          </motion.div>
        </div>
        <ScrollText className="d2 text-[clamp(26px,2.4vw,40px)] leading-[1]" parts={[[about.right, false]]} offset={["start 0.9", "end 0.55"]} />
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr_1fr] lg:gap-8">
        <div className="lg:order-2">
          <ScrollText className="d2 text-[clamp(26px,2.4vw,40px)] leading-[1]" parts={about.mid} dim="rgba(243,243,243,0.2)" color="#8a8d92" accent="#f3f3f3" />
          <p className="mt-4 text-[12px] font-semibold text-fg-2">
            {about.midSub[0]}
            <br />
            {about.midSub[1]}
          </p>
          <div className="mt-5 h-[3px] bg-white/25" />
          <p className="mt-6 text-[10px] font-semibold uppercase text-fg-3">Contact</p>
          <div className="mt-3 flex gap-4">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener" aria-label={s.label} className="text-fg transition-opacity hover:opacity-50">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
        <div className="lg:order-1 lg:self-end">
          <p className="text-[clamp(20px,1.7vw,26px)] font-medium leading-[1.2] tracking-[-0.02em]">{about.quote}</p>
          <p className="mt-3 text-[10px] italic text-fg-2">{about.quoteBy}</p>
        </div>
        <div className="lg:order-3 lg:self-end">
          <p className="text-[10px] font-semibold uppercase text-fg-3">Things I do</p>
          <div className="mt-2 flex gap-3">
            <span className="w-[4px] bg-white/25" />
            <ul className="text-[12px] font-bold uppercase leading-[1.25]">
              {about.things.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <Book className="cta mt-6 text-[14px]">Book a Call ▸▸</Book>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 bg-accent text-ink">
      <div className="stripes h-14 text-ink/25" />
      <div className="px pt-4">
        <Book className="block">
          <motion.span
            className="block whitespace-nowrap text-[19.4vw] font-bold leading-[0.9] tracking-[-0.065em]"
            initial={{ y: "30%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
          >
            {footer.big}
          </motion.span>
        </Book>
        <div className="mt-3 grid gap-8 border-y border-ink/60 py-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex gap-3">
            <span className="w-[5px] bg-ink" />
            <div>
              <a href={site.phoneHref} className="block text-[18px] font-semibold hover:underline">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}?subject=Enquiry`} className="text-[12px] font-semibold hover:underline">
                {site.email}
              </a>
            </div>
          </div>
          <div>
            <p className="text-[14px] font-bold uppercase">{site.founder}</p>
            <p className="mono mt-2">
              {footer.studio.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
          </div>
          <ul className="text-[12px] font-bold uppercase leading-[1.35]">
            <li>
              <a href="#top" className="hover:underline">
                Home
              </a>
            </li>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:underline">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <Book className="hover:underline">Book a Call</Book>
            </li>
          </ul>
          <ul className="text-[12px] font-bold uppercase leading-[1.35]">
            <li>
              <a href={site.instagram} target="_blank" rel="noopener" className="hover:underline">
                Instagram
              </a>
            </li>
            <li>
              <a href={site.url} target="_blank" rel="noopener" className="hover:underline">
                leoncapri.com
              </a>
            </li>
          </ul>
        </div>
        <motion.p
          className="d overflow-hidden whitespace-nowrap pt-4 text-[16.4vw] leading-[0.8]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          {footer.word}
        </motion.p>
        <div className="mt-4 flex items-center justify-between border-t border-ink/60 py-3 text-[10px] font-semibold">
          <span>© {new Date().getFullYear()} LÉONCAPRI. All work, all rights.</span>
          <a href="#top" aria-label="Back to top" className="text-[14px]">
            ↑
          </a>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/img/wordmark.png")} alt="" className="h-3 w-auto" />
        </div>
      </div>
    </footer>
  );
}
