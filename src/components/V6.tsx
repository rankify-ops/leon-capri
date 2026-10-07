"use client";

import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { Cut, Img, ScrollText } from "./fx";
import { Arrow, Fade, H2, SERVICES } from "./V5";

/*
 * v6 — v5's Known By structure, plus the features Tom liked from earlier
 * versions: scroll-lit words and the letter-by-letter quote (Vertical), the
 * floating cut-out mockups, cool layered shadows, case-study labels, the
 * huge real wordmark, typed hero caption, text-roll nav and a frosted header.
 */

const INK = "#291c10";
const DIM = "rgba(41,28,16,0.16)";

/** Intro: the studio paragraph lights up word by word as it scrolls past. */
export function Intro6() {
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
        <div className="md:col-span-6">
          <ScrollText
            className="v5-h text-[26px] leading-[1.12] md:text-[clamp(28px,2.6vw,40px)]"
            parts={[["A visionary design studio cultivating in the disciplines of branding, design & marketing for the property world and beyond. ", false], ["Building iconic brands, experiences, and high-performing results.", true]]}
            dim={DIM}
            color={INK}
            accent={INK}
            offset={["start 0.85", "end 0.5"]}
          />
          <div className="mt-8 text-[17px] md:text-[18px]">
            <Arrow book>Book a call</Arrow>
          </div>
        </div>
        <Fade className="md:col-span-6" delay={0.15}>
          <div className="v6-lift overflow-hidden">
            <Img slug="coast-brochure" alt="Coast marketing brochure — by LÉONCAPRI" sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover" />
          </div>
          <p className="v5-serif mt-3 text-[14px] opacity-70">Coast — marketing brochure</p>
        </Fade>
      </div>
    </section>
  );
}

// Cut-outs on one floor, each drifting with the pointer by its depth.
const STAGE = [
  { slug: "cut-coast-laptop", alt: "Coast website on a laptop", l: 0, w: 62, b: 4, depth: 10 },
  { slug: "cut-coast-phone", alt: "Coast campaign on a phone", l: 54, w: 19, b: 2, depth: 24 },
  { slug: "cut-luna-tote", alt: "Luna tote bag", l: 74, w: 26, b: 6, depth: 16 },
  { slug: "cut-luna-book", alt: "Luna agent flip book", l: 6, w: 70, b: -2, depth: 6, front: true },
];

function Stage() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    const imgs = Array.from(el.querySelectorAll<HTMLElement>("[data-depth]"));
    let raf = 0;
    const on = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        imgs.forEach((im) => {
          const d = Number(im.dataset.depth);
          im.style.transform = `translate3d(${x * -d}px, ${y * -d * 0.6}px, 0)`;
        });
      });
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => {
      window.removeEventListener("pointermove", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={ref} className="relative aspect-[4/5] w-full bg-[linear-gradient(180deg,#f6f3ee,#ece6dd)]">
      {STAGE.map((s, i) => (
        <div key={s.slug} className={`absolute ${s.front ? "z-10" : ""}`} style={{ left: `${s.l}%`, width: `${s.w}%`, bottom: `${18 + s.b + (s.front ? 0 : 22) - i * 2}%` }}>
          <div data-depth={s.depth} className="transition-transform duration-[900ms] ease-out">
            <Cut slug={s.slug} alt={s.alt} className="v6-drop w-full" />
          </div>
        </div>
      ))}
      <p className="v5-serif absolute bottom-4 left-4 text-[13px] opacity-60">Coast &amp; Luna — campaign pieces</p>
    </div>
  );
}

/** Services, with the floating cut-out mockups beside them. */
export function Services6() {
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
        <Fade className="md:col-span-5" delay={0.1}>
          <Stage />
        </Fade>
        <div className="grid content-start gap-x-8 gap-y-10 sm:grid-cols-2 md:col-span-7">
          {SERVICES.map((s, i) => (
            <Fade key={s.t} delay={0.1 + i * 0.08} className="border-t border-black/15 pt-4">
              <p className="v5-serif text-[13px] opacity-50">0{i + 1}</p>
              <h3 className="v5-h mt-2 text-[26px] md:text-[30px]">{s.t}</h3>
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

/** Quote that fills in letter by letter as you scroll. */
export function Quote6() {
  return (
    <section className="v5-px border-t border-black/10 py-24 md:py-36">
      <div className="mx-auto max-w-[1000px] text-center">
        <ScrollText
          by="char"
          className="v5-h text-[clamp(28px,3.4vw,52px)] leading-[1.1]"
          parts={[["“Every project is approached with authenticity and intent, crafted to inspire connection, drive value, and leave a lasting impression.”", false]]}
          dim={DIM}
          color={INK}
          offset={["start 0.85", "end 0.45"]}
        />
        <Fade className="v5-serif mt-8 text-[15px]">
          {site.founder}
          <br />
          <span className="opacity-60">Founder, LÉONCAPRI</span>
        </Fade>
      </div>
    </section>
  );
}
