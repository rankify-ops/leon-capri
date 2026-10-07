import { Inter_Tight, Newsreader } from "next/font/google";
import { About5, Contact5, Footer5, Header5, Hero5, Intro5, Quote5, Services5, SmoothScroll, Work5 } from "@/components/V5";
import { CalLoader, Tone } from "@/components/fx";

// Known By uses Die Grotesk A (medium, tight) + GT Alpina (serif captions/nav);
// closest free equivalents.
const grotesk = Inter_Tight({ subsets: ["latin"], weight: ["400", "500"], variable: "--v5-sans", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], weight: ["400"], variable: "--v5-serif", display: "swap" });

// v5: rebuilt on the knownby.studio structure — clean, white, hairline sections.
export default function HomeV5() {
  return (
    <Tone value="light">
    <div className={`v5 ${grotesk.variable} ${serif.variable}`}>
      <Header5 />
      <main>
        <Hero5 />
        <Intro5 />
        <Work5 />
        <Services5 />
        <Quote5 />
        <About5 />
        <Contact5 />
      </main>
      <Footer5 />
      <CalLoader />
      <SmoothScroll />
    </div>
    </Tone>
  );
}
