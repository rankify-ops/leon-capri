"use client";

import { motion } from "motion/react";
import { nav } from "@/content/site";
import { Book, EASE, Logo } from "./fx";

function Roll({ children }: { children: string }) {
  return (
    <span className="roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

/** Fixed bar in difference blend: white over dark, black over the light panels. */
export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
      className="px pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between py-4 mix-blend-difference md:py-5"
    >
      <a href="#top" className="glitch pointer-events-auto" aria-label="LÉONCAPRI — top">
        <Logo className="w-[96px] text-white md:w-[126px]" />
      </a>
      <nav className="pointer-events-auto flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[-0.02em] text-white md:gap-4 md:text-[15px]">
        {nav.map((n) => (
          <a key={n.href} href={n.href} className="hidden sm:inline-flex">
            <Roll>{n.label}</Roll>
          </a>
        ))}
        <Book className="inline-flex">
          <Roll>Book a Call</Roll>
        </Book>
      </nav>
    </motion.header>
  );
}
