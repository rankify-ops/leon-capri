import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Scatter, Statement } from "@/components/Statement";
import { NameGrid, Settle } from "@/components/Name";
import { Belmere, Luna, Services } from "@/components/Work";
import { Coast, Quote, Sprezz } from "@/components/Story";
import { About, Footer } from "@/components/About";
import { CalLoader } from "@/components/fx";

// Section order follows vertical.framer.media one-to-one.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
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
