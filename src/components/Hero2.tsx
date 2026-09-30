"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { asset } from "@/lib/basePath";
import { hero } from "@/content/site";
import { EASE, Type } from "./fx";
import { Ticks } from "./Hero";

/** Giant word sliding in from the right inside its own mask (in-flow version). */
function Word({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="block overflow-hidden pt-[0.14em]">
      <motion.span
        className="d block text-accent"
        initial={{ x: "60%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.3, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * v2 hero: nothing sits on the photo. The footage lives in its own inset
 * frame on the right; every word of the hero is on the black to its left.
 */
export function Hero2() {
  const wrap = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const { scrollYProgress: p } = useScroll({ target: wrap, offset: ["start start", "end start"] });

  const liftY = useTransform(p, [0, 0.6], ["0vh", "-50vh"]);
  const liftO = useTransform(p, [0, 0.35], [1, 0]);
  const imgO = useTransform(p, [0, 0.8], [1, 0.35]);
  const imgS = useTransform(p, [0, 1], [1, 1.1]);
  const exY = useTransform(p, [0.05, 0.9], ["40vh", "-5vh"]);
  const exO = useTransform(p, [0.05, 0.4, 0.9], [0, 0.16, 0.05]);

  // Belmeré, dusk to night: play the tail once and hold on the lit tower.
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    const start = () => {
      v.currentTime = 1.8;
      v.play().catch(() => {});
    };
    if (v.readyState >= 1) start();
    else v.addEventListener("loadedmetadata", start, { once: true });
  }, []);

  return (
    <div ref={wrap} id="top" className="relative pb-[20vh] md:h-[150vh] md:pb-0">
      <section className="flex flex-col gap-4 bg-bg px-4 pb-4 pt-[64px] md:sticky md:top-0 md:grid md:h-[100svh] md:min-h-[680px] md:grid-cols-[1fr_44%] md:gap-6 md:px-6 md:pt-[76px] md:pb-6">
        {/* Photo frame — no type on it. */}
        <motion.div
          className="relative h-[46svh] overflow-hidden bg-bg-2 md:order-2 md:h-auto"
          initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.5, ease: EASE, delay: 0.1 }}
        >
          <motion.video
            ref={vid}
            style={{ opacity: imgO, scale: imgS }}
            className="h-full w-full object-cover object-[28%_50%]"
            src={asset("/video/belmere.mp4")}
            poster={asset("/img/belmere-night.jpg")}
            muted
            playsInline
            preload="auto"
            aria-label="Belmeré, Wollongong — LÉONCAPRI campaign"
          />
        </motion.div>

        {/* All hero type, on the black. */}
        <div className="relative overflow-hidden md:order-1">
          <motion.p
            aria-hidden
            style={{ y: exY, opacity: exO }}
            className="pointer-events-none absolute inset-x-0 top-0 hidden text-[15vw] font-semibold lowercase leading-none tracking-[-0.06em] text-white md:block"
          >
            explore
          </motion.p>

          <motion.div style={{ y: liftY, opacity: liftO }} className="relative flex h-full flex-col justify-between gap-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <p className="d2 text-[26px] md:text-[clamp(26px,2.9vw,46px)]">
                <Type className="block" text={hero.lines[0]} delay={0.9} />
                <Type className="block text-[#8a8d92]" text={hero.lines[1]} delay={1.35} />
                <Type className="block text-[0.72em] text-[#8a8d92]" text={hero.lines[2]} delay={1.8} />
              </p>
              <div className="inline-flex items-stretch gap-3 md:mt-2">
                <motion.span className="w-[5px] origin-top bg-accent" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 2.1 }} />
                <span>
                  <Type className="d2 block text-[16px] text-accent md:text-[20px]" text={hero.name} delay={2.2} />
                  <Type className="block text-[9px] font-semibold uppercase text-fg-2 md:text-[11px]" text={hero.role} delay={2.5} />
                </span>
              </div>
            </div>

            <h1 aria-label="LÉONCAPRI" className="text-[25vw] md:text-[12.6vw]">
              <Word delay={0.35}>{hero.word[0]}</Word>
              <Word delay={0.5}>{hero.word[1] + hero.word[2]}</Word>
            </h1>

            <div>
              <div className="hidden grid-cols-4 gap-4 border-t border-white/15 pt-3 md:grid">
                {hero.phases.map((ph, i) => (
                  <motion.div
                    key={ph.n}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 1.2 + i * 0.12 }}
                  >
                    <span className="text-[11px] font-semibold">{ph.n}</span>
                    <span className="mono mt-1 block text-fg-3">
                      {ph.a}/<span className="text-accent">{ph.b}</span>
                      <Ticks delay={1.8 + i * 0.3} />
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 flex gap-6 md:mt-8 md:gap-16">
                <p className="text-[10px] font-semibold leading-tight md:text-[11px]">
                  <Type text={hero.idx} delay={1.4} className="mono block" />
                  <Type text={hero.year} delay={1.6} className="block text-[14px] text-accent md:text-[16px]" />
                </p>
                <div className="flex gap-3">
                  <motion.span className="w-[5px] origin-top bg-white/20" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 1.5 }} />
                  <ul className="d2 text-[15px] leading-[1.12] text-fg-2 md:text-[clamp(15px,1.4vw,21px)]">
                    {hero.list.map((l, i) => (
                      <li key={l}>
                        <Type text={l} delay={1.6 + i * 0.25} speed={22} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
