import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Scatter, Statement } from "@/components/Statement";
import { NameGrid, Settle } from "@/components/Name";
import { Belmere, Luna, Services } from "@/components/Work";
import { Coast, Quote, Sprezz } from "@/components/Story";
import { About, Footer } from "@/components/About";
import { CalLoader } from "@/components/fx";

// v2: same page, hero without the giant LÉON / CA / PRI.
export default function HomeV2() {
  return (
    <>
      <Header />
      <main>
        <Hero word={false} />
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
