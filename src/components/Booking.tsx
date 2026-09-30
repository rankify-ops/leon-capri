"use client";

import { useEffect } from "react";
import { booking, site } from "@/content/site";
import { BookButton, Kicker, Reveal } from "./ui";

type CalFn = ((...args: unknown[]) => void) & { ns: Record<string, (...args: unknown[]) => void>; q?: unknown[]; loaded?: boolean };
declare global {
  interface Window {
    Cal?: CalFn;
  }
}

/**
 * Cal.com's official embed bootstrap. Every [data-cal-link] (BookButton) then
 * opens the 45-min calendar as a modal over the page.
 */
export function CalLoader() {
  useEffect(() => {
    if (window.Cal) return;
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
      const Cal = window.Cal!;
      Cal("init", "lc", { origin: "https://app.cal.com" });
      Cal.ns.lc("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: { light: { "cal-brand": "#1c1917" } },
      });
    };
    // Off the critical path — the hero paints first.
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(start);
    else setTimeout(start, 1200);
  }, []);
  return null;
}

const DETAILS = [
  { k: "Duration", v: "45 minutes" },
  { k: "Format", v: "Google Meet" },
  { k: "With", v: site.founder },
];

export function Booking() {
  return (
    <section id="book" className="bg-bone py-28 md:py-44">
      <div className="wrap">
        <Kicker n="06">{booking.kicker}</Kicker>
        <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <h2 className="display text-[clamp(44px,6.2vw,108px)]">
              {booking.title[0]} <span className="serif-i">{booking.title[1]}</span>
            </h2>
          </Reveal>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={120} className="space-y-5">
              {booking.body.map((b) => (
                <p key={b} className="text-[16px] leading-[1.75] text-ink-2">
                  {b}
                </p>
              ))}
            </Reveal>

            <Reveal delay={200} className="mt-10">
              <dl className="border-t border-ink/25">
                {DETAILS.map((d) => (
                  <div key={d.k} className="flex items-baseline justify-between gap-6 border-b border-rule py-4">
                    <dt className="label text-ink-3">{d.k}</dt>
                    <dd className="text-right text-[15px] text-ink">{d.v}</dd>
                  </div>
                ))}
              </dl>
              <BookButton className="mt-8 w-full">{booking.cta}</BookButton>
            </Reveal>

            <Reveal delay={260} className="mt-10">
              <p className="label text-ink-3">Prefer to speak directly</p>
              <div className="mt-4 flex flex-col gap-2 text-[16px] text-ink">
                <a href={site.phoneHref} className="ulink self-start">
                  {site.phone}
                </a>
                <a href={`mailto:${site.email}?subject=Enquiry`} className="ulink self-start">
                  {site.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
