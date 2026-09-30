"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, type MotionValue } from "motion/react";
import { asset } from "@/lib/basePath";
import { site } from "@/content/site";

export const EASE = [0.16, 1, 0.3, 1] as const;

/** 800/1600/2400 webp set from scripts/media.mjs. */
export function Img({ slug, alt = "", className = "", sizes = "100vw", eager = false }: { slug: string; alt?: string; className?: string; sizes?: string; eager?: boolean }) {
  const s = (w: number) => asset(`/img/${slug}-${w}.webp`);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={s(1600)}
      srcSet={`${s(800)} 800w, ${s(1600)} 1600w, ${s(2400)} 2400w`}
      sizes={sizes}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}

/** Transparent cut-out (600/1200). */
export function Cut({ slug, alt = "", className = "" }: { slug: string; alt?: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(`/img/${slug}-1200.webp`)}
      srcSet={`${asset(`/img/${slug}-600.webp`)} 600w, ${asset(`/img/${slug}-1200.webp`)} 1200w`}
      sizes="30vw"
      alt={alt}
      loading="lazy"
      className={className}
    />
  );
}

/** Types its text out once, after `delay` seconds (on mount, or on first view with `onView`). */
export function Type({ text, delay = 0, speed = 28, className = "", onView = false }: { text: string; delay?: number; speed?: number; className?: string; onView?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [n, setN] = useState(0);
  const go = onView ? seen : true;
  useEffect(() => {
    if (!go) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = reduced ? text.length - 1 : 0;
    let iv: ReturnType<typeof setInterval>;
    const t = setTimeout(() => {
      iv = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) clearInterval(iv);
      }, speed);
    }, reduced ? 0 : delay * 1000);
    return () => {
      clearTimeout(t);
      clearInterval(iv);
    };
  }, [go, text, delay, speed]);
  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{text.slice(0, n)}</span>
      <span aria-hidden className="opacity-0">
        {text.slice(n)}
      </span>
    </span>
  );
}

/** Line that slides up out of a mask when it enters the viewport. */
export function Rise({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  return (
    <span ref={ref} className={`-mt-[0.14em] block overflow-hidden pt-[0.14em] ${className}`}>
      <motion.span className="block" initial={{ y: "105%" }} animate={seen ? { y: 0 } : undefined} transition={{ duration: 1.1, ease: EASE, delay }}>
        {children}
      </motion.span>
    </span>
  );
}

/** Words de-blur and settle in, staggered, on first view. */
export function BlurWords({ text, className = "", stagger = 0.06 }: { text: string; className?: string; stagger?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  return (
    <span ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, filter: "blur(14px)", y: 12 }}
          animate={seen ? { opacity: 1, filter: "blur(0px)", y: 0 } : undefined}
          transition={{ duration: 1, ease: EASE, delay: i * stagger }}
        >
          {w}&nbsp;
        </motion.span>
      ))}
    </span>
  );
}

function Piece({ p, range, children, from, to }: { p: MotionValue<number>; range: [number, number]; children: React.ReactNode; from: string; to: string }) {
  const color = useTransform(p, range, [from, to]);
  return <motion.span style={{ color }}>{children}</motion.span>;
}

/**
 * Scroll-linked reveal: each word (or char) goes from a dim colour to its
 * final colour as the block travels up the viewport.
 */
export function ScrollText({
  parts,
  by = "word",
  className = "",
  dim = "rgba(243,243,243,0.22)",
  color = "var(--fg)",
  accent = "var(--accent)",
  offset = ["start 0.85", "end 0.45"],
}: {
  parts: [string, boolean][];
  by?: "word" | "char";
  className?: string;
  dim?: string;
  color?: string;
  accent?: string;
  offset?: [string, string];
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as any });
  const tokens: { t: string; a: boolean }[] = [];
  parts.forEach(([s, a]) => {
    const bits = by === "word" ? s.split(/(\s+)/) : Array.from(s);
    bits.forEach((t) => t && tokens.push({ t, a }));
  });
  const total = tokens.length;
  return (
    <p ref={ref} className={className}>
      {tokens.map((tk, i) =>
        /^\s+$/.test(tk.t) ? (
          <span key={i}>{tk.t}</span>
        ) : (
          <Piece key={i} p={scrollYProgress} range={[i / total, Math.min(1, (i + 1) / total + 0.02)]} from={dim} to={tk.a ? accent : color}>
            {tk.t}
          </Piece>
        ),
      )}
    </p>
  );
}

/** Opens Izaac's Cal.com calendar as a popup; falls back to the booking page. */
export function Book({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      href={site.calUrl}
      target="_blank"
      rel="noopener"
      data-cal-link={site.calLink}
      data-cal-namespace="lc"
      data-cal-config='{"layout":"month_view","theme":"dark"}'
      onClick={(e) => {
        if ((window as unknown as { Cal?: { loaded?: boolean } }).Cal?.loaded && document.querySelector("script[src*='embed/embed.js']")) e.preventDefault();
      }}
      className={className}
    >
      {children}
    </a>
  );
}

/** Cal.com's official embed bootstrap — wires every [data-cal-link]. */
export function CalLoader() {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const W = window as any;
    if (W.Cal) return;
    const start = () => {
      /* eslint-disable */
      (function (C: any, A: string, L: string) {
        const p = function (a: any, ar: any) { a.q.push(ar); };
        const d = C.document;
        C.Cal = C.Cal || function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");
      /* eslint-enable */
      W.Cal("init", "lc", { origin: "https://app.cal.com" });
      W.Cal.ns.lc("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: { dark: { "cal-brand": "#81ff2c" } },
      });
    };
    if (W.requestIdleCallback) W.requestIdleCallback(start);
    else setTimeout(start, 1200);
  }, []);
  return null;
}
