import { Header } from "@/components/Header";
import { HeroCoast } from "@/components/HeroCoast";
import { Scatter, Statement } from "@/components/Statement";
import { NameGrid, Settle } from "@/components/Name";
import { Belmere, Luna, Services } from "@/components/Work";
import { Coast, Quote, Sprezz } from "@/components/Story";
import { About, Footer } from "@/components/About";
import { CalLoader, LightTheme } from "@/components/fx";

// v3: light throughout: Coast exterior hero, paper ground, ink type, cool shadows.
export default function HomeV3() {
  return (
    <>
      <Header />
      <LightTheme>
      <main>
        <HeroCoast />
        <Statement />
        <Scatter />
        <NameGrid />
        <Settle />
        <Luna />
        <Services />
        <Belmere />
        <Sprezz />
        <Quote />
        <Coast />
        <About />
      </main>
      <Footer />
      </LightTheme>
      <div className="grain" aria-hidden />
      <CalLoader />
    </>
  );
}
