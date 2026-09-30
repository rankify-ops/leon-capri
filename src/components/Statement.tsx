"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { scatter, statement } from "@/content/site";
import { Img, Rise } from "./fx";

/** Photo + manifesto block that grows from small to full size as it rises into view. */
export function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "start 0.12"] });
  const scale = useTransform(p, [0, 1], [0.52, 1]);
  const y = useTransform(p, [0, 1], ["18vh", "0vh"]);
  const words = statement.big.split(" ");
  const SPLIT = words.length;

  return (
    <section id="about" className="relative z-10 -mt-[20vh] bg-bg pb-10 pt-[18vh]">
      <motion.div ref={ref} style={{ scale, y }} className="px mx-auto max-w-[1180px] origin-top">
        <div className="grid grid-cols-[38%_1fr] gap-3 md:grid-cols-[250px_1fr]">
          <div className="aspect-[3/4] overflow-hidden bg-bg-2">
            <Img slug="insight" alt="Insight — brand by LÉONCAPRI" className="bw h-full w-full object-cover" sizes="300px" />
          </div>
          <p className="d2 text-[clamp(20px,3.3vw,46px)] leading-[1] text-fg-2">{words.slice(0, SPLIT).join(" ")}</p>
        </div>
        <p className="d2 mt-3 text-[clamp(20px,3.3vw,46px)] leading-[1] text-fg-2">{statement.big2}</p>

        <div className="mt-10 md:mt-14">
          <p className="d2 text-[clamp(26px,3.3vw,48px)] text-accent">
            <Rise>{statement.accent}</Rise>
          </p>
          <div className="d2 mt-3 text-[13px] leading-[1.15] md:text-[18px]">
            {statement.small.map((s, i) => (
              <Rise key={s} delay={0.08 * (i + 1)}>
                {s}
              </Rise>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Floater({ s, i }: { s: (typeof scatter)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(p, [0, 1], [`${s.speed * 55}vh`, `${-s.speed * 55}vh`]);
  const scale = useTransform(p, [0, 0.55], [0.72, 1.06]);
  return (
    <motion.figure
      ref={ref}
      style={{ left: `${s.x}%`, top: `${s.top}%`, width: `${s.w}%`, y, scale }}
      className="bw-hover absolute min-w-[108px] origin-bottom"
    >
      <div className="aspect-[3/4] overflow-hidden bg-bg-2">
        <Img slug={s.slug} alt={s.cap} className="bw h-full w-full object-cover" sizes="20vw" />
      </div>
      <figcaption className="mono mt-2 text-[9px] text-fg-2 md:text-[10px]">
        {s.cap} <span className="text-fg-3">({String(i + 1).padStart(2, "0")})</span>
      </figcaption>
    </motion.figure>
  );
}

/** Portfolio pieces scattered across the dark, each drifting at its own speed. */
export function Scatter() {
  return (
    <section id="work" className="relative h-[200vh] overflow-hidden bg-bg md:h-[220vh]">
      {scatter.map((s, i) => (
        <Floater key={s.slug} s={s} i={i} />
      ))}
    </section>
  );
}
