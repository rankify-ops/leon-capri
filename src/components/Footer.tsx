import { asset } from "@/lib/basePath";
import { name, site } from "@/content/site";
import { BookButton, Reveal } from "./ui";

export function NameSection() {
  return (
    <section className="py-24 md:py-36">
      <div className="wrap">
        <div className="grid gap-12 border-t border-rule pt-10 md:grid-cols-2 md:gap-10">
          {[name.leon, name.capri].map((line) => {
            const [word, rest] = line.split(": ");
            return (
              <Reveal key={word}>
                <p className="display text-[clamp(64px,9vw,150px)] leading-[0.9]">{word}</p>
                <p className="serif-i mt-5 text-[clamp(22px,2vw,30px)] text-ink-2">{rest}</p>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={150} className="mt-14 max-w-2xl md:mt-20">
          <p className="text-[15px] leading-[1.75] text-ink-3">{name.close}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink pb-28 pt-24 text-stone/70 md:pb-12 md:pt-32">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            {/* Their contact-page line. */}
            <h2 className="display text-[clamp(44px,6.4vw,110px)] leading-[0.98] text-stone">
              Ready to <span className="serif-i">break ground?</span>
            </h2>
            <p className="mt-6 text-[16px] text-stone/70">We’re excited to collaborate on your next project.</p>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <BookButton variant="light" className="w-full sm:w-auto">
              Book a Call
            </BookButton>
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-stone/15 pt-10 text-[14px] sm:grid-cols-2 md:mt-28 lg:grid-cols-3">
          <div>
            <p className="label text-stone/45">Studio</p>
            <p className="mt-4 leading-relaxed">
              {site.reach}
              <br />
              {site.location}
            </p>
          </div>
          <div>
            <p className="label text-stone/45">Contact</p>
            <p className="mt-4 flex flex-col gap-1.5">
              <span className="text-stone">{site.founder}</span>
              <a href={site.phoneHref} className="transition-colors hover:text-stone">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}?subject=Enquiry`} className="transition-colors hover:text-stone">
                {site.email}
              </a>
            </p>
          </div>
          <div>
            <p className="label text-stone/45">Follow</p>
            <p className="mt-4">
              <a href={site.instagram} target="_blank" rel="noopener" className="transition-colors hover:text-stone">
                Instagram ↗
              </a>
            </p>
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("/img/wordmark-light.png")} alt="LÉONCAPRI" className="mt-20 w-full opacity-90 md:mt-28" />
        <div className="mt-8 flex flex-wrap justify-between gap-4 text-[12px] text-stone/40">
          <p>© {new Date().getFullYear()} LÉONCAPRI</p>
          <p>Property · Design · Branding</p>
        </div>
      </div>
    </footer>
  );
}
