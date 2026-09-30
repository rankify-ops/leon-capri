"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { belmere, luna, services } from "@/content/site";
import { BlurWords, Cut, EASE, Img, Rise, ScrollText } from "./fx";

/** Accent panel + B&W photo; the [tag] focuses in and a line sweeps across. */
export function Luna() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const blur = useTransform(p, [0.3, 1], ["blur(18px)", "blur(0px)"]);
  const tagO = useTransform(p, [0.3, 1], [0.2, 1]);
  const tagS = useTransform(p, [0.3, 1], [1.25, 1]);
  const line = useTransform(p, [0.35, 0.9], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative z-10 grid bg-bg md:grid-cols-2">
      <div className="relative bg-accent px-4 pb-8 pt-20 text-ink md:min-h-[100svh] md:px-6 md:pt-24">
        <div className="hstripes absolute inset-y-0 right-0 hidden w-14 text-ink/15 md:block" />
        <h2 className="d text-[clamp(48px,6vw,96px)]">
          <Rise>{luna.title[0]}</Rise>
          <Rise delay={0.08}>{luna.title[1]}</Rise>
        </h2>
        <p className="mt-2 text-[11px] font-bold uppercase leading-tight">
          {luna.study}
          <br />
          <span className="font-semibold">{luna.sel}</span>
        </p>
        <div className="mt-8 flex gap-4 md:mt-10">
          <motion.span
            className="w-[5px] origin-top bg-ink"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          <div className="max-w-[520px]">
            <p className="d2 text-[clamp(20px,2.3vw,34px)]">
              {luna.bar.map((b, i) => (
                <Rise key={b} delay={0.1 + i * 0.08}>
                  {b}
                </Rise>
              ))}
            </p>
            <p className="mt-4 text-[13px] font-semibold uppercase leading-[1.25] tracking-[-0.01em] md:text-[15px]">{luna.body}</p>
            <a href={luna.url} target="_blank" rel="noopener" className="mono mt-4 inline-block underline underline-offset-4">
              lunahuskisson.com.au ↗
            </a>
          </div>
        </div>
        <div className="mt-10 flex gap-3 md:absolute md:bottom-8 md:left-6">
          {luna.thumbs.map((t, i) => (
            <motion.div
              key={t}
              className="flex h-16 w-16 items-center justify-center bg-ink/10 p-1.5 md:h-20 md:w-20"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.1 }}
            >
              <Cut slug={t} alt="Luna campaign piece" className="max-h-full max-w-full object-contain" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative h-[80svh] overflow-hidden md:h-auto">
        <Img slug="luna" alt="Luna — Huskisson brand identity" className="bw h-full w-full object-cover object-[88%_50%]" sizes="50vw" />
        <motion.div style={{ width: line }} className="absolute right-0 top-[74%] h-[3px] bg-accent" />
        <motion.p
          style={{ filter: blur, opacity: tagO, scale: tagS }}
          className="d absolute inset-x-0 top-[64%] text-center text-[clamp(44px,5.6vw,92px)] text-white"
        >
          {luna.tag}
        </motion.p>
      </div>
    </section>
  );
}

/** Giant accent wordmark, then indexed rows whose text lights up word by word. */
export function Services() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const x = useTransform(p, [0, 1], ["18%", "0%"]);

  return (
    <section id="services" ref={ref} className="px relative z-10 bg-bg pb-24 pt-20 md:pt-28">
      <motion.h2 style={{ x }} className="d whitespace-nowrap text-[17.2vw] leading-[0.82] text-accent">
        {services.big}
      </motion.h2>
      <ScrollText
        className="d2 mt-4 text-[clamp(28px,4.2vw,68px)]"
        parts={[[services.sub.join(" "), false]]}
        offset={["start 0.9", "end 0.6"]}
      />
      <div className="mt-6 flex items-center gap-3">
        <span className="mono whitespace-nowrap text-[10px] text-fg-2">▣ {services.bar[0]}</span>
        <motion.span
          className="h-[3px] flex-1 origin-left bg-white/25"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE }}
        />
        <span className="mono whitespace-nowrap text-[10px] text-fg-2">{services.bar[1]}</span>
      </div>

      <div className="mt-16 md:mt-24">
        {services.rows.map((r, i) => (
          <div key={r.t} className="grid gap-6 border-b border-white/15 py-10 md:grid-cols-[1fr_1px_1fr] md:gap-8 md:py-12">
            <div className="relative flex flex-col">
              <p className="mono text-[9px] text-fg-3">{r.k}</p>
              <h3 className="d2 mt-3 text-[clamp(26px,2.6vw,40px)]">{r.t}</h3>
              <span className="mt-3 flex flex-col gap-[3px]" aria-hidden>
                {[0, 1, 2, 3].map((k) => (
                  <i key={k} className={`block h-px ${k === 1 ? "w-4 bg-accent" : "w-3 bg-white/40"}`} />
                ))}
              </span>
              <p className="mono mt-auto pt-10 text-[10px] text-fg-3">
                {"//"}
                <span className="text-fg">{String(i + 1).padStart(3, "0")}</span>
              </p>
              <span className="absolute right-0 top-0 text-[22px] text-fg-3 transition-transform duration-500 hover:translate-x-1">→</span>
            </div>
            <span className="hidden w-[5px] bg-white/20 md:block" />
            <ScrollText className="d2 text-[clamp(22px,2.3vw,36px)] leading-[1]" parts={r.parts} color="#8a8d92" />
          </div>
        ))}
      </div>
    </section>
  );
}

/** Pinned photo on the left with headlines drifting over it; grey story panel on the right. */
export function Belmere() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const overY = useTransform(p, [0, 1], ["55vh", "-45vh"]);
  const botO = useTransform(p, [0.55, 0.8], [0, 1]);
  const botY = useTransform(p, [0.55, 0.8], ["8vh", "0vh"]);

  return (
    <section ref={ref} className="relative z-10 bg-grey text-ink md:grid md:grid-cols-[46%_54%]">
      <div className="relative h-[62svh] overflow-hidden md:sticky md:top-0 md:h-[100svh]">
        <Img slug="belmere" alt="Belmeré — brand identity" className="bw h-full w-full object-cover object-[50%_50%]" sizes="46vw" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.85),rgba(255,255,255,0)_40%)]" />
        <ul className="px absolute left-0 top-20 text-[11px] font-bold uppercase leading-[1.15] text-white md:top-24 md:text-[13px]">
          {belmere.side.map((s) => (
            <li key={s}>{s}</li>
          ))}
          <li className="mt-3 h-4 w-4 rounded-full bg-accent" />
        </ul>
        <motion.p style={{ y: overY }} className="d2 px absolute left-0 top-0 z-10 w-[190%] text-[clamp(40px,4.8vw,78px)] text-white mix-blend-difference">
          {belmere.overlay[0]}
          <br />
          {belmere.overlay[1]}
        </motion.p>
        <motion.p style={{ opacity: botO, y: botY }} className="d2 px absolute bottom-10 left-0 text-[clamp(26px,2.8vw,44px)] text-ink">
          {belmere.bottom[0]}
          <br />
          {belmere.bottom[1]}
        </motion.p>
      </div>

      <div className="px pb-24 pt-10 md:min-h-[210vh] md:pt-24">
        <p className="d2 text-[clamp(26px,2.4vw,38px)]">{belmere.small}</p>
        <h2 className="d text-[clamp(60px,7vw,116px)]">
          <Rise>{belmere.big}</Rise>
        </h2>
        <motion.div className="mt-2 h-[4px] origin-left bg-ink" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: EASE }} />
        <p className="mt-5 max-w-[620px] text-[14px] font-semibold uppercase leading-[1.2] md:text-[16px]">{belmere.body}</p>
        <p className="mono mt-[30vh] max-w-[380px] text-[10px] text-ink/70">{belmere.mono}</p>
        <div className="mt-10 grid gap-6 md:mt-16">
          <motion.div
            className="w-[70%] max-w-[300px] overflow-hidden md:w-[42%]"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            whileInView={{ clipPath: "inset(0% 0 0 0)" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.3, ease: EASE }}
          >
            <Img slug="belmere-print" alt="Belmeré printed collateral" className="bw aspect-[3/4] w-full object-cover" sizes="300px" />
          </motion.div>
          <h3 className="d2 text-[clamp(28px,2.8vw,46px)]">
            <BlurWords text={belmere.h2.join(" ")} />
          </h3>
          <p className="mono text-[10px] text-ink/70">
            {belmere.mono2[0]}
            <br />
            {belmere.mono2[1]}
          </p>
          <a href={belmere.url} target="_blank" rel="noopener" className="cta self-start text-[13px]">
            belmerewollongong.com.au ▸▸
          </a>
        </div>
      </div>
    </section>
  );
}
