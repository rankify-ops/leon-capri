"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/basePath";
import { featured } from "@/content/site";
import { Kicker, Photo, Reveal, useInView } from "./ui";

/** Belmeré's day-to-night tower clip — only plays while on screen. */
function BelmereFilm() {
  const wrap = useInView<HTMLDivElement>();
  const vid = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      threshold: 0.15,
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={wrap} className="curtain settle h-full w-full">
      <video
        ref={vid}
        className="h-full w-full object-cover"
        src={asset("/video/belmere.mp4")}
        poster={asset("/img/belmere-poster.jpg")}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Belmeré tower, Wollongong, from day to night"
      />
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="pb-16 md:pb-28">
      <div className="wrap">
        <div className="grid gap-8 border-t border-rule pt-8 md:grid-cols-12">
          <Kicker n="02" className="md:col-span-4">
            Selected Work
          </Kicker>
          <Reveal className="md:col-span-8">
            <h2 className="display h2">
              Brands for the addresses <span className="serif-i">people remember.</span>
            </h2>
          </Reveal>
        </div>
      </div>

      {featured.map((p, i) => {
        const flip = i % 2 === 1;
        return (
          <article key={p.slug} className="wrap mt-24 md:mt-40">
            <div className={`flex flex-wrap items-end justify-between gap-x-10 gap-y-4 ${flip ? "md:flex-row-reverse" : ""}`}>
              <Reveal>
                <p className="label text-ink-3">
                  <span className="text-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span className="mx-3">/</span>
                  {p.place}
                </p>
                <h3 className="display h-xl mt-4">{p.name}</h3>
              </Reveal>
              <Reveal delay={150}>
                <a href={p.url} target="_blank" rel="noopener" className="label ulink text-ink">
                  {p.host} ↗
                </a>
              </Reveal>
            </div>

            <div className="relative mt-8 aspect-[4/3] overflow-hidden bg-stone-2 md:mt-12 md:aspect-[16/8]">
              {p.main === "video" ? (
                <BelmereFilm />
              ) : (
                <Reveal kind="curtain settle" className="h-full w-full">
                  <Photo slug={p.main} alt={`${p.name} — brand identity by LÉONCAPRI`} sizes="100vw" className="h-full w-full object-cover" />
                </Reveal>
              )}
            </div>

            <div className="mt-6 grid gap-8 md:mt-8 md:grid-cols-12">
              <Reveal delay={120} className={`md:col-span-4 ${flip ? "md:order-2 md:pl-4" : "md:pr-4"}`}>
                <p className="text-[15px] leading-[1.75] text-ink-2">{p.body}</p>
              </Reveal>
              <div className={`grid grid-cols-2 gap-3 md:col-span-8 md:gap-8 ${flip ? "md:order-1" : ""}`}>
                {p.side.map((s, j) => (
                  <Reveal
                    key={s}
                    kind="curtain"
                    delay={200 + j * 160}
                    className={`cut-panel ${p.side.length === 1 ? "col-span-2 aspect-[16/8]" : "aspect-[16/12]"}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(`/img/cut-${s}-1200.webp`)}
                      srcSet={`${asset(`/img/cut-${s}-600.webp`)} 600w, ${asset(`/img/cut-${s}-1200.webp`)} 1200w`}
                      sizes="(min-width: 768px) 30vw, 50vw"
                      alt={`${p.name} — campaign piece`}
                      loading="lazy"
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
