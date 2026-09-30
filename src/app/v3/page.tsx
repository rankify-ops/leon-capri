import { Header } from "@/components/Header";
import { HeroCoast } from "@/components/HeroCoast";
import { Scatter, Statement } from "@/components/Statement";
import { NameGrid, Settle } from "@/components/Name";
import { Belmere, Luna, Services } from "@/components/Work";
import { Coast, Quote, Sprezz } from "@/components/Story";
import { About, Footer } from "@/components/About";
import { CalLoader } from "@/components/fx";

// v3: v2 with a light hero — Coast exterior (car + sign) in colour, ink type.
export default function HomeV3() {
  return (
    <>
      <Header />
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
      <div className="grain" aria-hidden />
      <CalLoader />
    </>
  );
}
