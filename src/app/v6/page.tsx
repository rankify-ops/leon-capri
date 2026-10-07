import { Inter_Tight, Newsreader } from "next/font/google";
import { About5, Contact5, Footer5, Header5, Hero5, SmoothScroll, Work5 } from "@/components/V5";
import { Intro6, Quote6, Services6 } from "@/components/V6";
import { CalLoader, Tone } from "@/components/fx";

const grotesk = Inter_Tight({ subsets: ["latin"], weight: ["400", "500"], variable: "--v5-sans", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], weight: ["400"], variable: "--v5-serif", display: "swap" });

// v6: v5's Known By structure + the favourites from earlier versions
// (frosted header, text-roll nav, typed hero caption, scroll-lit intro,
// cut-out mockups, case-study tags, cool shadows, letter-reveal quote,
// giant real wordmark).
export default function HomeV6() {
  return (
    <Tone value="light">
      <div className={`v5 ${grotesk.variable} ${serif.variable}`}>
        <Header5 glass roll />
        <main>
          <Hero5 typed />
          <Intro6 />
          <Work5 tags lift />
          <Services6 />
          <Quote6 />
          <About5 />
          <Contact5 />
        </main>
        <Footer5 bigLogo />
        <CalLoader />
        <SmoothScroll />
      </div>
    </Tone>
  );
}
