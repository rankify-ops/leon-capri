"use client";

import { motion } from "motion/react";
import { archive, facts, featured, services, settle, statement } from "@/content/site";
import { EASE, Img, Rise, ScrollText } from "./fx";

/*
 * v4 — the same light system as v3, rebuilt for clarity: one numbered
 * section per idea, in the order a developer would read it.
 *   01 Work → 02 Services → 03 Collaborators → 04 About → 05 Book a call
 * All the work lives in one place: three case studies in a row, then every
 * other brand in a plain grid. Images always at their native aspect so no
 * logo is ever cropped.
 */

/** Numbered section heading used by every v4 section. */
export function Head({ n, title, sub, id }: { n: string; title: string; sub?: string; id?: string }) {
  return (
    <div id={id} className="scroll-mt-24 border-t border-line pt-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mono text-fg-3">
            ({n}) <span className="ml-2 inline-block h-px w-8 bg-line-2 align-middle" />
          </p>
          <h2 className="d2 mt-3 text-[clamp(34px,4.4vw,72px)]">
            <Rise>{title}</Rise>
          </h2>
        </div>
        {sub && <p className="mono max-w-[380px] text-fg-2">{sub}</p>}
      </div>
    </div>
  );
}

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -8% 0px" },
  transition: { duration: 0.9, ease: EASE, delay: i * 0.08 },
});

/** Short intro under the hero: the studio line lighting up, then four facts. */
export function Intro() {
  return (
    <section className="px relative z-10 bg-bg pb-20 pt-20 md:pb-28 md:pt-28">
      <ScrollText className="d2 max-w-[1250px] text-[clamp(26px,3.3vw,52px)] leading-[1.02]" parts={[[statement.big, false]]} />
      <dl className="mt-14 grid grid-cols-2 gap-y-8 border-t border-line pt-6 md:grid-cols-4">
        {facts.map((f, i) => (
          <motion.div key={f.k} {...fade(i)}>
            <dt className="mono text-fg-3">{f.k}</dt>
            <dd className="d2 mt-2 text-[clamp(20px,1.8vw,28px)]">{f.v}</dd>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}

// What LÉONCAPRI did on each case study (from their project pages).
const DID: Record<string, string[]> = {
  luna: ["Brand direction", "Campaign", "Digital"],
  belmere: ["Brand identity", "Print", "Marketing campaign"],
  coast: ["Brand identity", "Custom typeface", "Logo device"],
};
const IMG: Record<string, string> = { luna: "luna", belmere: "belmere", coast: "coast" };

/** 01 — every project in one place. */
export function Work() {
  return (
    <section className="px relative z-10 bg-bg pb-24 md:pb-32">
      <Head id="work" n="01" title="Selected work" sub="Brand identities and marketing campaigns for residential developments. Every image below is LÉONCAPRI client work." />

      {/* Case studies, in a row. */}
      <p className="mono mt-12 text-fg-3">Case studies — (03)</p>
      <div className="mt-4 grid gap-10 md:grid-cols-3 md:gap-6">
        {featured.map((f, i) => (
          <motion.a key={f.slug} href={f.url} target="_blank" rel="noopener" className="group block" {...fade(i)}>
            <div className="lift overflow-hidden bg-bg-2">
              <Img
                slug={IMG[f.slug]}
                alt={`${f.name} — by LÉONCAPRI`}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="bw aspect-[1600/1133] w-full object-cover transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:filter-none"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-3 border-b border-line pb-3">
              <p className="d2 text-[clamp(26px,2.4vw,38px)]">{f.name}</p>
              <p className="mono text-fg-3">0{i + 1}</p>
            </div>
            <p className="mono mt-3 text-fg-2">{f.place}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {DID[f.slug].map((d) => (
                <li key={d} className="border border-line-2 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[-0.01em]">
                  {d}
                </li>
              ))}
            </ul>
            <p className="mono mt-4 inline-flex items-center gap-2 text-fg transition-transform duration-500 group-hover:translate-x-1">
              {f.host} ↗
            </p>
          </motion.a>
        ))}
      </div>

      {/* Everything else, in a plain grid. */}
      <p className="mono mt-20 text-fg-3">More brands by LÉONCAPRI — ({String(archive.length).padStart(2, "0")})</p>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-6 md:gap-y-10">
        {archive.map((a, i) => (
          <motion.figure key={a.slug} className="group" {...fade(i % 4)}>
            <div className="lift hover-lift overflow-hidden bg-bg-2">
              <Img slug={a.slug} alt={`${a.name} — brand by LÉONCAPRI`} sizes="(min-width: 768px) 25vw, 50vw" className="bw aspect-video w-full object-cover group-hover:filter-none" />
            </div>
            <figcaption className="mt-2.5 flex items-baseline justify-between gap-2">
              <span className="text-[13px] font-semibold uppercase tracking-[-0.01em] md:text-[15px]">{a.name}</span>
              <span className="mono text-fg-3">{String(i + 1).padStart(2, "0")}</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

/** 02 — services, one row each. */
export function ServiceList() {
  return (
    <section className="px relative z-10 bg-bg pb-24 md:pb-32">
      <Head id="services" n="02" title="Services" sub="Everything a development needs to be named, branded, marketed and sold — under one studio." />
      <div className="mt-10">
        {services.rows.map((r, i) => (
          <motion.div key={r.t} className="grid gap-4 border-b border-line py-8 md:grid-cols-[80px_1fr_1.4fr] md:gap-8 md:py-10" {...fade()}>
            <p className="mono text-fg-3">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="d2 text-[clamp(24px,2.4vw,38px)]">{r.t}</h3>
            <ScrollText className="d2 text-[clamp(18px,1.7vw,26px)] leading-[1.08]" parts={r.parts} color="#8a8d92" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/** 03 — who the studio works alongside. */
export function Collaborators() {
  return (
    <section className="px relative z-10 bg-bg pb-24 md:pb-32">
      <Head n="03" title="Who we work with" sub="We partner with the right people and companies to craft enduring relationships." />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {settle.modules.map((m, i) => (
          <motion.div key={m.k} className="lift panel-soft bg-[#fbfaf8] p-6" {...fade(i)}>
            <p className="mono text-fg-3">0{i + 1}</p>
            <p className="d2 mt-6 text-[20px]">{m.t}</p>
            <p className="mono mt-3 text-fg-2">{m.v}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/** Small numbered label that sits above the reused About / Quote sections. */
export function Label({ n, title, id }: { n: string; title: string; id?: string }) {
  return (
    <div id={id} className="px relative z-10 scroll-mt-24 bg-bg">
      <Head n={n} title={title} />
    </div>
  );
}
