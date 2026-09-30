import { Header } from "@/components/Header";
import { Hero2 } from "@/components/Hero2";
import { Scatter, Statement } from "@/components/Statement";
import { NameGrid, Settle } from "@/components/Name";
import { Belmere, Luna, Services } from "@/components/Work";
import { Coast, Quote, Sprezz } from "@/components/Story";
import { About, Footer } from "@/components/About";
import { CalLoader } from "@/components/fx";

// v2: same page, but the hero keeps all type off the photo.
export default function HomeV2() {
  return (
    <>
      <Header />
      <main>
        <Hero2 />
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
