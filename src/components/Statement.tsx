"use client";

import { useEffect, useRef } from "react";
import { facts, hero } from "@/content/site";
import { Kicker, Reveal } from "./ui";

/** The studio line, inked word by word as it scrolls through the viewport. */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = hero.intro.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>(".ink-word"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      spans.forEach((s) => s.classList.add("on"));
      return;
    }
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.3)));
        const n = Math.round(p * spans.length);
        spans.forEach((s, i) => s.classList.toggle("on", i < n));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      window.removeEventListener("scroll", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="py-28 md:py-44">
      <div className="wrap">
        <Kicker n="01">The Studio</Kicker>
        <p ref={ref} className="display mt-10 max-w-[1280px] text-[clamp(32px,4.6vw,76px)] leading-[1.08]">
          {words.map((w, i) => (
            <span key={i} className="ink-word">
              {w}{" "}
            </span>
          ))}
        </p>

        <dl className="mt-20 grid grid-cols-2 border-t border-rule md:mt-28 lg:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal
              key={f.k}
              delay={i * 90}
              className={`border-b border-rule py-7 pr-4 lg:border-b-0 ${i % 2 ? "border-l pl-5 md:pl-8" : ""} ${i === 2 ? "lg:border-l lg:pl-8" : ""}`}
            >
              <dt className="label text-ink-3">{f.k}</dt>
              <dd className="display mt-4 text-[clamp(22px,2.2vw,34px)] leading-tight">{f.v}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
