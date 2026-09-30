"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { hero } from "@/content/site";
import { EASE, Img, Type, WorkTag } from "./fx";

/**
 * v3 hero: light. Coast, North Wollongong (the white building, the old car
 * by the COAST sign) in full colour, ink type on soft white fades. Same
 * typed lines and scroll choreography as v1/v2; the list sits bottom-right
 * so it never covers the car or the sign, and the phase columns are left out
 * because they would cut through the building.
 */
export function HeroCoast() {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: wrap, offset: ["start start", "end start"] });

  const liftY = useTransform(p, [0, 0.6], ["0vh", "-70vh"]);
  const liftO = useTransform(p, [0, 0.35], [1, 0]);
  const imgO = useTransform(p, [0, 0.7], [1, 0.45]);
  const imgS = useTransform(p, [0, 1], [1.04, 1.14]);
  const exY = useTransform(p, [0.05, 0.9], ["45vh", "-5vh"]);
  const exO = useTransform(p, [0.05, 0.4, 0.9], [0, 0.12, 0.04]);

  return (
    <div ref={wrap} id="top" className="relative h-[150vh]">
      <section className="sticky top-0 h-[100svh] min-h-[640px] overflow-hidden bg-paper text-ink">
        <motion.div
          className="absolute inset-0"
          style={{ opacity: imgO, scale: imgS }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <Img
            slug="coast-ext"
            alt="Coast, North Wollongong — brand by LÉONCAPRI"
            eager
            className="h-full w-full object-cover object-[36%_55%] md:object-[40%_55%]"
          />
          {/* Soft paper fades where the type sits: top band, right side, bottom-right corner. */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(243,243,243,0.8)_0%,rgba(243,243,243,0)_28%),radial-gradient(60%_55%_at_100%_18%,rgba(243,243,243,0.9),rgba(243,243,243,0)_70%),radial-gradient(55%_45%_at_100%_100%,rgba(243,243,243,0.92),rgba(243,243,243,0)_70%)]" />
        </motion.div>

        <motion.p
          aria-hidden
          style={{ y: exY, opacity: exO }}
          className="pointer-events-none absolute inset-x-0 top-0 text-center text-[24vw] font-semibold lowercase leading-none tracking-[-0.06em] text-ink"
        >
          explore
        </motion.p>

        <motion.div style={{ y: liftY, opacity: liftO }} className="absolute inset-0">
          <h1 className="sr-only">LÉONCAPRI</h1>

          {/* What the image is: his work, not stock. */}
          <motion.div
            className="absolute left-4 top-[64px] md:left-6 md:top-[76px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <WorkTag tone="dark">Coast, North Wollongong — brand by LÉONCAPRI</WorkTag>
          </motion.div>

          {/* Top-right statement, typed. */}
          <div className="absolute right-4 top-[96px] text-right md:right-6 md:top-[100px]">
            <p className="d2 text-[22px] md:text-[clamp(28px,3.4vw,52px)]">
              <Type className="block text-ink" text={hero.lines[0]} delay={0.9} />
              <Type className="block text-[#6b6f75]" text={hero.lines[1]} delay={1.35} />
              <Type className="block text-[0.72em] text-[#6b6f75]" text={hero.lines[2]} delay={1.8} />
            </p>
            <div className="mt-2 inline-flex items-stretch gap-3 text-left">
              <motion.span className="w-[5px] origin-top bg-ink" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 2.1 }} />
              <span>
                <Type className="d2 block text-[15px] text-ink md:text-[22px]" text={hero.name} delay={2.2} />
                <Type className="block text-[9px] font-semibold uppercase text-[#4a4e53] md:text-[11px]" text={hero.role} delay={2.5} />
              </span>
            </div>
          </div>

          {/* Index + list: bottom-right on desktop, under the headline on phones — never over the car or the sign. */}
          <div className="absolute right-4 top-[300px] flex flex-row-reverse gap-6 text-right md:bottom-[7vh] md:right-6 md:top-auto md:gap-16">
            <p className="text-[10px] font-semibold leading-tight md:text-[11px]">
              <Type text={hero.idx} delay={1.4} className="mono block" />
              <Type text={hero.year} delay={1.6} className="block text-[14px] md:text-[16px]" />
            </p>
            <div className="flex flex-row-reverse gap-3">
              <motion.span className="w-[5px] origin-top bg-ink/25" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 1.5 }} />
              <ul className="d2 text-[14px] leading-[1.12] text-ink md:text-[21px]">
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
