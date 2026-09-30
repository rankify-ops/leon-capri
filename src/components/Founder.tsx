import { founder, site } from "@/content/site";
import { BookButton, Kicker, Reveal } from "./ui";

export function Founder() {
  return (
    <section id="founder" className="py-24 md:py-40">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-10">
        {/* PLACEHOLDER — swap for Izaac's portrait once supplied. */}
        <Reveal kind="curtain" className="md:col-span-5 lg:col-span-5">
          <div className="placeholder relative flex aspect-[4/5] items-end justify-between overflow-hidden p-6 md:p-8">
            <p className="label relative text-ink-3">Portrait</p>
            <p className="label relative text-ink-3">{site.founder}</p>
          </div>
        </Reveal>

        <div className="flex flex-col md:col-span-7 md:pl-6 lg:col-span-6 lg:col-start-7 lg:pl-0">
          <Kicker n="04">The Founder</Kicker>
          <Reveal className="mt-8">
            <h2 className="display h2">
              Izaac <span className="serif-i">Trpeski</span>
            </h2>
            <p className="label mt-5 text-ink-3">{site.role}</p>
          </Reveal>

          <Reveal delay={120} className="mt-10">
            <p className="lead text-ink-2">{founder.bio}</p>
          </Reveal>

          <Reveal delay={200} className="mt-12 border-l border-ink/25 pl-6 md:pl-8">
            {founder.motto.map((m) => (
              <p key={m} className="serif-i text-[clamp(26px,2.6vw,40px)] leading-[1.2] text-ink">
                {m}
              </p>
            ))}
          </Reveal>

          <Reveal delay={260} className="mt-12">
            <p className="text-[14px] leading-[1.75] text-ink-3">{founder.studio}</p>
          </Reveal>

          <Reveal delay={320} className="mt-10">
            <BookButton className="w-full sm:w-auto">Book a call with Izaac</BookButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
