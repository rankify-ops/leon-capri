"use client";

import { useState } from "react";
import { audience, disciplines } from "@/content/site";
import { Kicker, Photo, Reveal } from "./ui";

export function Disciplines() {
  const [open, setOpen] = useState(0);
  return (
    <section id="disciplines" className="bg-bone py-24 md:py-40">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Kicker n="05">Disciplines</Kicker>
            <Reveal className="mt-8">
              <h2 className="display h2">
                One studio, <span className="serif-i">every touchpoint.</span>
              </h2>
            </Reveal>
            <Reveal delay={120} className="mt-8 max-w-md">
              <p className="text-[15px] leading-[1.75] text-ink-2">{audience}</p>
            </Reveal>
            <Reveal kind="curtain settle" delay={200} className="mt-10 hidden aspect-[4/3] max-w-md bg-stone-2 lg:block">
              <Photo slug="terrain" alt="" sizes="30vw" className="h-full w-full object-cover" />
            </Reveal>
          </div>
        </div>

        <ul className="border-t border-ink/80 lg:col-span-7">
          {disciplines.map((d, i) => {
            const isOpen = open === i;
            return (
              <li key={d.name} className={`acc border-b border-rule ${isOpen ? "open" : ""}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center gap-5 py-7 text-left md:gap-8 md:py-9"
                >
                  <span className="label w-8 shrink-0 text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display flex-1 text-[clamp(26px,3vw,46px)] leading-tight">{d.name}</span>
                  <span className="acc-plus" aria-hidden />
                </button>
                <div className="acc-body">
                  <div>
                    <ul className="flex flex-wrap gap-x-2 gap-y-2 pb-9 pl-[52px] md:pl-[72px]">
                      {d.items.map((it) => (
                        <li key={it} className="border border-rule px-3.5 py-1.5 text-[13px] text-ink-2">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
