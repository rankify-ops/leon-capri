"use client";

import { useEffect, useState } from "react";
import { BookButton } from "./ui";

/** Phone-only Book a Call bar: appears past the hero, steps aside at the calendar. */
export function MobileBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const book = document.getElementById("book")?.getBoundingClientRect();
      const foot = document.querySelector("footer")?.getBoundingClientRect();
      const vh = window.innerHeight;
      const inBook = book ? book.top < vh && book.bottom > 0 : false;
      const inFoot = foot ? foot.top < vh : false;
      setShow(window.scrollY > vh * 0.8 && !inBook && !inFoot);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className={`mbar fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-stone/90 p-3 backdrop-blur-lg md:hidden ${show ? "show" : ""}`}>
      <BookButton className="w-full">Book an initial discussion</BookButton>
    </div>
  );
}
