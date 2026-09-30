"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/basePath";
import { site } from "@/content/site";

/** Adds .in once the element scrolls into view — drives .reveal / .settle / .curtain. */
export function useInView<T extends HTMLElement>(margin = "0px 0px -10% 0px") {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return ref;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  kind = "reveal",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  kind?: "reveal" | "settle" | "curtain" | "curtain settle";
}) {
  const ref = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`${kind} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

/** Photo from public/img — 800/1600/2400 webp set made by scripts/media.mjs. */
export function Photo({
  slug,
  alt,
  sizes = "100vw",
  className = "",
  priority = false,
}: {
  slug: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  const src = (w: number) => asset(`/img/${slug}-${w}.webp`);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src(1600)}
      srcSet={`${src(800)} 800w, ${src(1600)} 1600w, ${src(2400)} 2400w`}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
    />
  );
}

export function Kicker({ n, children, className = "" }: { n?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`label flex items-center gap-4 text-ink-3 ${className}`}>
      {n && <span className="text-ink">{n}</span>}
      {n && <span className="h-px w-10 bg-ink/30" aria-hidden />}
      <span>{children}</span>
    </p>
  );
}

/** Opens Izaac's Cal.com calendar as a popup (see CalLoader). No-JS / not-loaded fallback: the booking page. */
export function BookButton({
  children = "Book a Call",
  variant = "ink",
  size,
  className = "",
}: {
  children?: React.ReactNode;
  variant?: "ink" | "line" | "light";
  size?: "sm";
  className?: string;
}) {
  return (
    <a
      href={site.calUrl}
      target="_blank"
      rel="noopener"
      data-cal-link={site.calLink}
      data-cal-namespace="lc"
      data-cal-config='{"layout":"month_view","theme":"light"}'
      onClick={(e) => {
        // Cal's click handler opens the modal once embed.js is in; only then stay on the page.
        if (window.Cal?.loaded && document.querySelector("script[src*='embed/embed.js']")) e.preventDefault();
      }}
      className={`btn btn-${variant} ${size ? "btn-sm" : ""} ${className}`}
    >
      <span>{children}</span>
      <span className="tick" aria-hidden />
    </a>
  );
}
