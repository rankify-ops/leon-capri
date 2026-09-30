"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { name, settle } from "@/content/site";
import { BlurWords, EASE, Img, Rise, WorkTag } from "./fx";

/** Pinned photo on the left; grey panel and a second photo scroll past on the right. */
export function NameGrid() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const panelY = useTransform(p, [0, 1], ["30%", "0%"]);

  return (
    <section ref={ref} className="relative z-10 bg-bg md:grid md:grid-cols-[52%_48%]">
      <div className="relative h-[100svh] md:sticky md:top-0">
        <Img slug="luna-sand" alt="Luna — Huskisson" className="bw h-full w-full object-cover" sizes="52vw" />
        <WorkTag className="absolute right-4 top-20 md:right-6">Luna, Huskisson — LÉONCAPRI</WorkTag>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,6,9,0.55),rgba(5,6,9,0)_55%)]" />
        <div className="px absolute bottom-8 left-0 md:bottom-12">
          <p className="flex items-center gap-3 text-[10px] font-semibold uppercase">
            {name.tag} <span className="h-px w-10 bg-white/60" /> {"// Conceptual"}
          </p>
          <p className="mt-1 inline-block bg-white px-1 text-[11px] font-bold uppercase text-ink md:text-[13px]">{name.rev}</p>
          <h2 className="d mt-3 text-[clamp(44px,6.4vw,104px)]">
            {name.big.map((l, i) => (
              <Rise key={l} delay={i * 0.08}>
                {l}
              </Rise>
            ))}
          </h2>
        </div>
      </div>

      <div>
        <motion.div style={{ y: panelY }} className="bg-grey px-4 pb-10 pt-24 text-ink md:min-h-[62vh] md:px-6 md:pt-28">
          <h3 className="d text-[clamp(40px,5.4vw,84px)]">
            <Rise>{name.title[0]}</Rise>
            <Rise delay={0.1} className="text-white">
              {name.title[1]}
            </Rise>
          </h3>
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {[name.cat1, name.cat2].map((c) => (
              <div key={c.k}>
                <p className="flex justify-between border-b-[3px] border-ink pb-1.5 text-[11px] font-semibold uppercase">
                  {c.k} <span className="tracking-[-0.1em]">|||</span>
                </p>
                <p className="mono mt-3 text-[10px] text-ink/80">{c.v}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <div className="relative h-[100svh] overflow-hidden">
          <Img slug="air" alt="Air — brand by LÉONCAPRI" className="bw h-full w-full object-cover" sizes="48vw" />
          <WorkTag className="absolute left-4 top-6 z-10 md:left-6">Air — LÉONCAPRI</WorkTag>
          <div className="absolute inset-0 bg-black/35" />
          <p className="d2 absolute bottom-10 right-4 max-w-[560px] text-right text-[clamp(22px,2.4vw,36px)] md:right-6">
            <BlurWords text={name.overlay} />
          </p>
        </div>
      </div>
    </section>
  );
}

/** Full-bleed dark photo, blur-in headline, four modules. */
export function Settle() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(p, [0, 1], ["-12%", "12%"]);
  return (
    <section ref={ref} className="relative z-10 overflow-hidden bg-bg">
      <motion.div style={{ y: bgY }} className="absolute inset-[-12%_0]">
        <Img slug="terrain" alt="" className="bw h-full w-full object-cover opacity-50" />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,6,9,0.2),rgba(5,6,9,0.85))]" />
      <div className="px relative flex min-h-[120vh] flex-col justify-between pb-10 pt-[18vh]">
        <div className="text-center">
          <motion.p
            className="inline-block bg-accent px-1 text-[10px] font-semibold uppercase text-ink"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {settle.tag}
          </motion.p>
          <h2 className="d mt-3 text-[clamp(40px,7.4vw,124px)]">
            {settle.h.map((l) => (
              <BlurWords key={l} text={l} className="block" />
            ))}
          </h2>
          <p className="d2 mt-6 text-[clamp(16px,1.7vw,26px)] text-fg-2">
            {settle.sub.map((l) => (
              <Rise key={l}>{l}</Rise>
            ))}
          </p>
          <p className="mt-3 text-[10px] font-semibold uppercase">{settle.src}</p>
        </div>
        <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {settle.modules.map((m, i) => (
            <motion.div
              key={m.k}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
            >
              <p className="text-[12px] font-semibold uppercase">{m.k}</p>
              <div className="relative mt-2 h-px bg-white/30">
                <span className="absolute left-0 top-[-1px] h-[3px] w-4 bg-accent" />
              </div>
              <p className="mt-3 text-[13px] font-semibold uppercase tracking-[-0.02em]">{m.t}</p>
              <p className="mono mt-2 text-[10px] text-fg-2">{m.v}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
