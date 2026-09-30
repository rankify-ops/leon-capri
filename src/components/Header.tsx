"use client";

import { useEffect, useState } from "react";
import { asset } from "@/lib/basePath";
import { booking } from "@/content/site";
import { BookButton } from "./ui";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#founder", label: "Founder" },
  { href: "#disciplines", label: "Disciplines" },
];

export function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`hdr fixed inset-x-0 top-0 z-50 ${solid ? "solid" : ""}`}>
      <div className={`overflow-hidden bg-ink text-center text-stone transition-[height] duration-700 ${solid ? "h-0" : "h-8"}`}>
        <p className="label flex h-8 items-center justify-center px-4 text-[9.5px] tracking-[0.3em] sm:text-[10px]">
          <span className="truncate sm:hidden">{booking.bar.split(" · ")[1]}</span>
          <span className="hidden truncate sm:inline">{booking.bar}</span>
        </p>
      </div>
      <div className="wrap grid h-[68px] grid-cols-[1fr_auto] items-center gap-4 md:h-[76px] md:grid-cols-[1fr_auto_1fr]">
        <nav className="hidden items-center gap-9 md:flex" aria-label="Sections">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="label text-ink transition-opacity hover:opacity-50">
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#top" aria-label="LÉONCAPRI — top" className="justify-self-start md:justify-self-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset("/img/wordmark.png")} alt="LÉONCAPRI" className="h-[17px] w-auto md:h-[21px]" />
        </a>
        <div className="justify-self-end">
          <BookButton size="sm">Book a Call</BookButton>
        </div>
      </div>
    </header>
  );
}
