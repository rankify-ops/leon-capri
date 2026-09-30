import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Statement } from "@/components/Statement";
import { Work } from "@/components/Work";
import { Archive } from "@/components/Archive";
import { Founder } from "@/components/Founder";
import { Disciplines } from "@/components/Disciplines";
import { Booking, CalLoader } from "@/components/Booking";
import { Footer, NameSection } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Statement />
        <Work />
        <Archive />
        <Founder />
        <Disciplines />
        <NameSection />
        <Booking />
      </main>
      <Footer />
      <MobileBar />
      <CalLoader />
    </>
  );
}
