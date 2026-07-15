import { Helmet } from "react-helmet-async";
import { CheckCircle2, Route, Trees } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { CommunityHero } from "@/components/location-hero";
import { locationPhotos } from "@/config/location-photos";

const comparisons = [
  ["The property", "Lot size, utilities, drainage context, restrictions, improvements, maintenance needs, and planned nearby development."],
  ["The route", "Highway access is only part of the answer. Test the actual trips to work, school, shopping, healthcare, and The Woodlands."],
  ["The ownership plan", "Acreage, established neighborhoods, and newer communities carry different cost structures and future resale audiences."],
  ["The offer position", "Condition, setting, recent competition, and buyer alternatives should inform terms—not a broad Tomball average."],
];

export default function Tomball() {
  return (
    <>
      <Helmet>
        <title>Tomball TX Real Estate & Neighborhood Guide | Josh Wisdom</title>
        <meta name="description" content="Compare Tomball acreage, established neighborhoods, newer communities, daily routes, and property-specific ownership considerations with Josh Wisdom." />
        <link rel="canonical" href="https://joshwisdomrealtor.com/communities/tomball" />
      </Helmet>

      <CommunityHero eyebrow="Private Community Advisory" title="Tomball" description="A property-by-property market spanning historic streets, established neighborhoods, acreage settings, and newer communities." photo={locationPhotos.tomball} />

      <section className="bg-[#f7f5f0] py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-9 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#875d17]">Property-Specific Guidance</p>
            <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-[0.98] text-black md:text-6xl">In Tomball, the land and the route belong in the same conversation.</h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-700">Tomball is not one uniform suburban market. A useful search distinguishes the town core, established subdivisions, newer planned communities, and rural or acreage properties—then evaluates the practical ownership details within each one.</p>

            <div className="mt-12 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2">
              {comparisons.map(([title, copy]) => (
                <article key={title} className="bg-white p-7 md:p-8">
                  <CheckCircle2 className="h-6 w-6 text-[#9b6d1d]" aria-hidden="true" />
                  <h3 className="mt-6 font-serif text-3xl text-black">{title}</h3>
                  <p className="mt-4 leading-7 text-neutral-700">{copy}</p>
                </article>
              ))}
            </div>

            <div className="mt-16 grid gap-8 border-t border-black/15 pt-10 md:grid-cols-2">
              <article className="flex gap-5"><Trees className="mt-1 h-6 w-6 shrink-0 text-[#9b6d1d]" aria-hidden="true" /><div><h3 className="font-serif text-3xl text-black">Space with obligations</h3><p className="mt-3 leading-7 text-neutral-700">Acreage and custom properties deserve closer review of access, improvements, utilities, upkeep, restrictions, and future flexibility.</p></div></article>
              <article className="flex gap-5"><Route className="mt-1 h-6 w-6 shrink-0 text-[#9b6d1d]" aria-hidden="true" /><div><h3 className="font-serif text-3xl text-black">Convenience measured honestly</h3><p className="mt-3 leading-7 text-neutral-700">Compare the routes you will actually drive at the times you will use them, not only the distance shown on a map.</p></div></article>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <LeadForm leadType="buying" showArea={false} title="Request a private Tomball brief" subtitle="Share your preferred setting, lot needs, timing, and daily destinations. Josh will follow up directly." buttonText="Request Tomball Consultation" />
          </aside>
        </div>
      </section>
    </>
  );
}
