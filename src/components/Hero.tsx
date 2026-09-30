"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { asset } from "@/lib/basePath";
import { hero } from "@/content/site";
import { EASE, Logo, Type } from "./fx";

/** One slice of the real LÉONCAPRI wordmark, sliding in from the right inside its own mask. */
function Word({ part, delay, className }: { part: "leon" | "ca" | "pri"; delay: number; className: string }) {
  return (
    <span className={`absolute block overflow-hidden ${className}`}>
      <motion.span
        className="block text-accent"
        initial={{ x: "70%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.3, ease: EASE, delay }}
      >
        <Logo part={part} label="" className="w-full" />
      </motion.span>
    </span>
  );
}

function Ticks({ delay }: { delay: number }) {
  const [on, setOn] = useState(0);
  useEffect(() => {
    let i = 0;
    let iv: ReturnType<typeof setInterval>;
    const t = setTimeout(() => {
      iv = setInterval(() => {
        i = (i + 1) % 9;
        setOn(i);
      }, 420);
    }, delay * 1000);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, [delay]);
  return (
    <span className="ticks mt-1.5">
      {Array.from({ length: 8 }, (_, k) => (
        <i key={k} className={k < on ? "on" : ""} />
      ))}
    </span>
  );
}

/** `word={false}` (/v2) drops the giant LÉON / CA / PRI; everything else is identical. */
export function Hero({ word = true }: { word?: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const { scrollYProgress: p } = useScroll({ target: wrap, offset: ["start start", "end start"] });

  // Everything but the photo lifts away fast; the photo dims; "explore" rises.
  const liftY = useTransform(p, [0, 0.6], ["0vh", "-70vh"]);
  const liftO = useTransform(p, [0, 0.35], [1, 0]);
  const imgO = useTransform(p, [0, 0.7], [1, 0.3]);
  const imgS = useTransform(p, [0, 1], [1, 1.12]);
  const exY = useTransform(p, [0.05, 0.9], ["45vh", "-5vh"]);
  const exO = useTransform(p, [0.05, 0.4, 0.9], [0, 0.16, 0.05]);

  // Belmeré, dusk to night: play the tail of the clip once, hold on the lit tower.
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
    <div ref={wrap} id="top" className="relative h-[150vh]">
      <section className="sticky top-0 h-[100svh] min-h-[640px] overflow-hidden bg-bg">
        <motion.div
          className="absolute inset-y-0 right-0 w-full md:w-[68%]"
          style={{ opacity: imgO, scale: imgS }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          <video
            ref={vid}
            className="h-full w-full object-cover object-[22%_50%]"
            src={asset("/video/belmere.mp4")}
            poster={asset("/img/belmere-night.jpg")}
            muted
            playsInline
            preload="auto"
            aria-label="Belmeré, Wollongong — LÉONCAPRI campaign"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#050609_0%,rgba(5,6,9,0.55)_28%,rgba(5,6,9,0)_60%),linear-gradient(0deg,rgba(5,6,9,0.7),rgba(5,6,9,0)_40%)]" />
        </motion.div>

        {/* "explore" ghost word rising behind everything. */}
        <motion.p
          aria-hidden
          style={{ y: exY, opacity: exO }}
          className="pointer-events-none absolute inset-x-0 top-0 text-center text-[24vw] font-semibold lowercase leading-none tracking-[-0.06em] text-white"
        >
          explore
        </motion.p>

        <motion.div style={{ y: liftY, opacity: liftO }} className="absolute inset-0">
          {/* Giant stacked wordmark (v1 only; v2 keeps a hidden h1 for SEO). */}
          {word ? (
          <h1 aria-label="LÉONCAPRI">
            {/* Slice widths share one cap height: LÉON 2.62×, CA 1.35×, PRI 1.27× of it. */}
            <Word part="leon" delay={0.35} className="left-[3vw] top-[27svh] w-[78.6vw] md:top-[12vh] md:w-[52.4vw]" />
            <Word part="ca" delay={0.5} className="left-[30vw] top-[45svh] w-[40.5vw] md:left-[40vw] md:top-[45vh] md:w-[27vw]" />
            <Word part="pri" delay={0.65} className="right-[6vw] top-[61svh] w-[38vw] md:top-auto md:bottom-[3vh] md:right-[6vw] md:w-[25.4vw]" />
          </h1>
          ) : (
            <h1 className="sr-only">LÉONCAPRI</h1>
          )}

          {/* Top-right statement, typed. */}
          <div className="absolute right-4 top-[62px] text-right md:right-6 md:top-[100px]">
            <p className="d2 text-[22px] md:text-[clamp(28px,3.4vw,52px)]">
              <Type className="block text-accent" text={hero.lines[0]} delay={0.9} />
              <Type className="block text-[#8a8d92]" text={hero.lines[1]} delay={1.35} />
              <Type className="block text-[0.72em] text-[#8a8d92]" text={hero.lines[2]} delay={1.8} />
            </p>
            <div className="mt-2 inline-flex items-stretch gap-3 text-left">
              <motion.span className="w-[5px] origin-top bg-accent" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 2.1 }} />
              <span>
                <Type className="d2 block text-[15px] text-accent md:text-[22px]" text={hero.name} delay={2.2} />
                <Type className="block text-[9px] font-semibold uppercase text-fg-2 md:text-[11px]" text={hero.role} delay={2.5} />
              </span>
            </div>
          </div>

          {/* What the footage is: his work, not stock. */}
          <p className="mono absolute bottom-4 right-4 hidden text-fg-2 md:block">
            <span className="text-fg">Belmeré, Wollongong</span> — campaign by LÉONCAPRI
          </p>

          {/* Four phase columns. */}
          <div className="px absolute inset-x-0 top-[39%] hidden h-[28%] grid-cols-4 md:grid">
            {hero.phases.map((ph, i) => (
              <motion.div
                key={ph.n}
                className="relative flex flex-col justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 + i * 0.12 }}
              >
                <span className="text-[11px] font-semibold">{ph.n}</span>
                <motion.span
                  className="absolute left-0 top-6 bottom-8 w-px origin-top bg-white/25"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1.2, ease: EASE, delay: 1.3 + i * 0.12 }}
                />
                <span className="mono pl-0.5 text-fg-3">
                  {ph.a}/<span className="text-accent">{ph.b}</span>
                  <Ticks delay={1.8 + i * 0.3} />
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom-left index + list. */}
          <div className="px absolute bottom-6 left-0 flex gap-6 md:bottom-[9vh] md:gap-24">
            <p className="text-[10px] font-semibold leading-tight md:text-[11px]">
              <Type text={hero.idx} delay={1.4} className="mono block" />
              <Type text={hero.year} delay={1.6} className="block text-[14px] text-accent md:text-[16px]" />
            </p>
            <div className="flex gap-3">
              <motion.span className="w-[5px] origin-top bg-white/20" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 1.5 }} />
              <ul className="d2 text-[14px] leading-[1.12] text-fg-2 md:text-[21px]">
                {hero.list.map((l, i) => (
                  <li key={l}>
                    <Type text={l} delay={1.6 + i * 0.25} speed={22} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
