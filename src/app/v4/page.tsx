import { Header } from "@/components/Header";
import { HeroCoast } from "@/components/HeroCoast";
import { Quote } from "@/components/Story";
import { About, Footer } from "@/components/About";
import { Collaborators, Intro, Label, ServiceList, Work } from "@/components/V4";
import { CalLoader, LightTheme } from "@/components/fx";

// v4: v3's light look, restructured for clarity —
// 01 Work (case studies in a row + brand grid) → 02 Services → 03 Collaborators → 04 About → 05 Book a call.
export default function HomeV4() {
  return (
    <>
      <Header />
      <LightTheme>
        <main>
          <HeroCoast />
          <Intro />
          <Work />
          <ServiceList />
          <Collaborators />
          <Label n="04" title="About Izaac" id="about" />
          <About />
          <Label n="05" title="Book a call" id="book" />
          <Quote />
        </main>
        <Footer />
      </LightTheme>
      <div className="grain" aria-hidden />
      <CalLoader />
    </>
  );
}
