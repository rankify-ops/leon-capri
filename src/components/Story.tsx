"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { coast, quote, site, sprezz } from "@/content/site";
import { Book, BlurWords, EASE, Img, Logo, Rise, ScrollText, WorkTag } from "./fx";

/** Off-white interlude: two columns of the name story around a central word, then the giant wordmark. */
export function Sprezz() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end 0.7"] });
  const line = useTransform(p, [0.3, 1], [0, 1]);
  const wordY = useTransform(p, [0, 1], ["12vh", "0vh"]);

  return (
    <section className="relative z-10 bg-paper text-ink">
      <div className="px grid items-center gap-10 pb-10 pt-24 md:grid-cols-[1fr_auto_1fr] md:pt-32">
        <motion.p initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE }} className="max-w-[330px] text-[13px] font-semibold uppercase leading-[1.25] text-ink/55 md:text-[15px]">
          {sprezz.left} <span className="text-ink">{sprezz.leftStrong}</span>
        </motion.p>
        <div className="text-center">
          <p className="text-[clamp(40px,5vw,84px)] font-medium italic tracking-[-0.05em]">
            <BlurWords text={sprezz.word} />
          </p>
          <p className="mono text-[10px] text-ink/60">— effortless elegance</p>
        </div>
        <motion.p initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: EASE }} className="max-w-[330px] justify-self-end text-right text-[13px] font-semibold uppercase leading-[1.25] text-ink/55 md:text-[15px]">
          {sprezz.right} <span className="text-ink">{sprezz.rightStrong}</span>
        </motion.p>
      </div>

      <div ref={ref} className="px pb-12 pt-10">
        <motion.h2 style={{ y: wordY }} className="mx-auto max-w-[1500px]">
          <Logo className="w-full" />
        </motion.h2>
        <div className="mx-auto mt-4 flex max-w-[1140px] items-end gap-3">
          <span className="text-[22px] font-bold leading-none tracking-[-0.08em]">LC</span>
          <motion.span style={{ scaleX: line }} className="mb-1 h-[4px] flex-1 origin-left bg-ink" />
          <span className="mono text-[9px]">{sprezz.sign}</span>
        </div>
      </div>

      <div className="bg-bg px-4 py-14 text-fg md:px-[4vw] md:py-16">
        <div className="mx-auto grid max-w-[1140px] gap-10 md:grid-cols-3">
          {sprezz.cols.map((c, i) => (
            <motion.div key={c.t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}>
              <p className="flex items-center gap-2 border-b border-line-2 pb-2 text-[14px] font-bold uppercase">
                <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-accent" /> {c.t}
              </p>
              <p className="mono mt-3 text-[10px] text-fg-2">{c.v}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Accent panel: the quote fills in character by character; booking card beside it. */
export function Quote() {
  return (
    <section className="panel relative z-10 grid gap-8 bg-accent px-4 py-16 text-ink md:grid-cols-2 md:px-6 md:py-24">
      <div className="md:sticky md:top-24 md:self-start">
        <ScrollText
          by="char"
          className="d2 text-[clamp(28px,3.2vw,50px)] leading-[0.98]"
          parts={[[quote.text, false]]}
          dim="rgba(10,10,10,0.14)"
          color="#0a0a0a"
          offset={["start 0.8", "end 0.5"]}
        />
      </div>
      <div>
        <div className="placeholder-dark lift relative flex aspect-[5/4] items-end justify-between overflow-hidden bg-ink p-5 text-fg">
          {/* PLACEHOLDER — Izaac's portrait goes here. */}
          <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_60%_30%,#2a2d31,#0a0a0a)]" />
          <p className="mono relative text-fg-2">Portrait</p>
          <p className="mono relative text-fg-2">{site.founder}</p>
        </div>
        <Book className="group mt-5 flex items-center gap-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:scale-110">
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
              <path d="M2 1l7 4-7 4z" fill="currentColor" />
            </svg>
          </span>
          <span className="d2 text-[clamp(18px,1.7vw,26px)] underline-offset-4 group-hover:underline">{quote.cta}</span>
        </Book>
        <div className="mt-2 h-[3px] bg-ink" />
        <p className="mt-3 text-[13px] font-bold uppercase leading-tight">{quote.ctaSub}</p>
        <p className="mono mt-2 max-w-[520px] text-[10px] text-ink/75">{quote.note}</p>
        <p className="mt-3 flex gap-6 text-[11px] font-semibold">
          {quote.meta.map((m) => (
            <span key={m}>◈ {m}</span>
          ))}
        </p>
      </div>
    </section>
  );
}

/** Pinned photo, a frosted panel that rises over it, then a big project code. */
export function Coast() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const glassY = useTransform(p, [0.12, 0.45], ["100%", "0%"]);

  return (
    <section ref={ref} className="relative z-10 bg-paper text-ink">
      <div className="relative md:h-[210vh]">
        <div className="md:sticky md:top-0 md:grid md:h-[100svh] md:grid-cols-2">
          <div className="relative h-[70svh] overflow-hidden md:h-full">
            <Img slug="coast-ext" alt="Coast — North Wollongong" className="bw h-full w-full object-cover object-[33%_50%]" sizes="50vw" />
          </div>
          <div className="px flex flex-col pb-8 pt-10 md:pt-24">
            <WorkTag tone="dark" className="mb-5 self-start">{coast.tag}</WorkTag>
            <h2 className="d text-[clamp(52px,5.6vw,92px)]">
              <Rise>{coast.title}</Rise>
            </h2>
            <div className="mt-2 h-[4px] bg-ink" />
            <p className="mt-4 max-w-[640px] text-[14px] font-semibold uppercase leading-[1.2] text-ink/70 md:text-[16px]">{coast.body}</p>
            <div className="mt-10 md:mt-auto">
              <p className="text-[11px]">{coast.small[0]}</p>
              <p className="text-[14px] font-bold uppercase">{coast.small[1]}</p>
              <p className="mono text-[10px] text-ink/60">{coast.link}</p>
              <a href={coast.url} target="_blank" rel="noopener" className="cta mt-2 text-[13px]">
                Visit ▸▸
              </a>
            </div>
          </div>

          {/* Frosted panel. No video under it, so blur is safe here. */}
          <motion.div
            style={{ y: glassY }}
            className="lift absolute inset-x-0 bottom-0 hidden h-[70%] bg-white/55 backdrop-blur-2xl md:block"
          >
            <div className="hstripes absolute bottom-10 left-6 top-10 w-14 text-ink/15" />
            <div className="absolute left-[28%] top-[16%] max-w-[560px]">
              <p className="text-[9px] font-semibold uppercase">
                {coast.crumbs[0]} <span className="text-ink/40">/ {coast.crumbs[1]}</span>
              </p>
              <p className="d2 mt-1 text-[clamp(34px,3.2vw,52px)]">
                {coast.concept[0]}
                <span className="text-ink/35">/</span>
                <br />
                <span className="text-ink/45">{coast.concept[1]}</span>
              </p>
              <p className="mt-4 pl-4 text-[11px] font-semibold uppercase leading-tight">{coast.conceptBody}</p>
              <p className="mt-4 flex items-center gap-3 text-[20px] font-medium">
                {coast.years[0]} <span className="h-px w-24 bg-ink" /> {coast.years[1]}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px grid items-center gap-8 bg-paper pb-20 pt-10 md:grid-cols-[auto_1fr] md:pl-[14%]">
        <motion.div
          className="lift w-[62vw] max-w-[300px] overflow-hidden"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, ease: EASE }}
        >
          <Img slug="coast" alt="Coast brand identity" className="bw aspect-square w-full object-cover" sizes="300px" />
        </motion.div>
        <div>
          <p className="text-[12px] font-semibold uppercase">{coast.trace}</p>
          <p className="d text-[clamp(72px,11vw,190px)] leading-[0.85]">
            <Rise>{coast.code}</Rise>
          </p>
          <ul className="mt-3 text-[11px] font-bold uppercase leading-tight">
            {coast.list.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <p className="mono mt-4 max-w-[420px] text-[10px] text-ink/60">{coast.tagline}</p>
        </div>
      </div>
    </section>
  );
}
