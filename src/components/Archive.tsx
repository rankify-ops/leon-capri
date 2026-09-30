import { archive, archiveLine } from "@/content/site";
import { Kicker, Photo, Reveal } from "./ui";

export function Archive() {
  // Doubled so the marquee loops seamlessly at -50%.
  const loop = [...archive, ...archive];
  return (
    <section className="overflow-hidden bg-bone py-24 md:py-36">
      <div className="wrap grid gap-8 md:grid-cols-12">
        <Kicker n="03" className="md:col-span-4">
          The Archive
        </Kicker>
        <Reveal className="md:col-span-8">
          <p className="display text-[clamp(26px,2.9vw,46px)] leading-[1.16]">{archiveLine}</p>
        </Reveal>
      </div>

      <div className="mt-16 md:mt-24" aria-label="Past brands by LÉONCAPRI">
        <ul className="marquee">
          {loop.map((a, i) => (
            <li key={`${a.slug}-${i}`} className="card w-[68vw] shrink-0 pl-5 sm:w-[42vw] md:w-[30vw] md:pl-8 xl:w-[24vw]" aria-hidden={i >= archive.length}>
              <div className="card-img aspect-[4/3] bg-stone-2">
                <Photo slug={a.slug} alt={i < archive.length ? `${a.name} — brand by LÉONCAPRI` : ""} sizes="(min-width: 1280px) 24vw, (min-width: 768px) 30vw, 68vw" className="h-full w-full object-cover" />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-rule pt-3">
                <p className="display text-[24px] md:text-[28px]">{a.name}</p>
                <p className="label text-ink-3">{String((i % archive.length) + 1).padStart(2, "0")}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
