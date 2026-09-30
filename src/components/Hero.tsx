"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/basePath";
import { hero } from "@/content/site";
import { BookButton } from "./ui";

// Cut-out mockups from his portfolio, standing on one floor line.
// left/width are % of the stage; depth drives the pointer parallax.
const STAGE = [
  { slug: "coast-laptop", alt: "Coast website on a laptop", left: 0, width: 31, lm: 0, wm: 0, depth: 10, delay: 0.5, mobile: false },
  { slug: "coast-phone", alt: "Coast social campaign on a phone", left: 29.5, width: 10, lm: 2, wm: 19, depth: 22, delay: 0.65, mobile: true },
  { slug: "luna-book", alt: "Luna agent flip book", left: 42, width: 38, lm: 23, wm: 52, depth: 6, delay: 0.8, mobile: true },
  { slug: "luna-tote", alt: "Luna Huskisson tote bag", left: 83, width: 15, lm: 78, wm: 21, depth: 16, delay: 0.95, mobile: true },
] as const;

export function Hero() {
  const stage = useRef<HTMLDivElement>(null);

  // Pointer parallax — each piece drifts by its depth.
  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    const imgs = Array.from(el.querySelectorAll<HTMLImageElement>("img[data-depth]"));
    let raf = 0;
    const on = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        imgs.forEach((img) => {
          const d = Number(img.dataset.depth);
          img.style.transform = `translate3d(${x * -d}px, ${y * -d * 0.5}px, 0)`;
        });
      });
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => {
      window.removeEventListener("pointermove", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[124px] md:pt-[140px]">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="label fade-in mb-7 text-ink-3" style={{ animationDelay: "0.6s" }}>
            {hero.kicker}
          </p>
          <h1 className="display h-hero">
            <span className="rise">
              <span style={{ animationDelay: "0.15s" }}>{hero.line1}</span>
            </span>
            <span className="rise pb-[0.06em]">
              <span className="serif-i" style={{ animationDelay: "0.3s" }}>
                {hero.line2}
              </span>
            </span>
          </h1>
        </div>
        <div className="fade-in lg:col-span-4 lg:pb-3" style={{ animationDelay: "0.9s" }}>
          <p className="max-w-sm text-[16px] leading-relaxed text-ink-2">{hero.sub}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <BookButton className="w-full sm:w-auto">Book an initial discussion</BookButton>
            <a href="#work" className="btn btn-line w-full sm:w-auto">
              <span>View the work</span>
            </a>
          </div>
        </div>
      </div>

      {/* The stage fills whatever height is left, with the floor line at the bottom. */}
      <div className="wrap mt-auto pt-14 md:pt-16">
        <div ref={stage} className="relative h-[56vw] max-h-[420px] md:h-[30vw]" aria-label="LÉONCAPRI campaign pieces">
          {STAGE.map((s) => (
            <div
              key={s.slug}
              className={`stage-item ${s.mobile ? "" : "hidden md:block"}`}
              style={
                {
                  "--l": `${s.left}%`,
                  "--w": `${s.width}%`,
                  "--lm": `${s.lm}%`,
                  "--wm": `${s.wm}%`,
                  animationDelay: `${s.delay}s`,
                } as React.CSSProperties
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                data-depth={s.depth}
                src={asset(`/img/cut-${s.slug}-1200.webp`)}
                srcSet={`${asset(`/img/cut-${s.slug}-600.webp`)} 600w, ${asset(`/img/cut-${s.slug}-1200.webp`)} 1200w`}
                sizes={`${s.width}vw`}
                alt={s.alt}
                fetchPriority="high"
              />
            </div>
          ))}
        </div>
        <div className="h-px bg-ink/15" />
        <div className="flex justify-between py-5">
          <p className="label text-ink-3">Luna · Coast · Belmeré</p>
          <p className="label hidden text-ink-3 sm:block">Property · Design · Branding</p>
        </div>
      </div>
    </section>
  );
}
