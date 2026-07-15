import { Helmet } from "react-helmet-async";
import { CheckCircle2, Navigation, TreePine } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { CommunityHero } from "@/components/location-hero";
import { locationPhotos } from "@/config/location-photos";

const villages = ["Alden Bridge", "Cochran's Crossing", "College Park", "Creekside Park", "Grogan's Mill", "Indian Springs", "Panther Creek", "Sterling Ridge", "Town Center"];

const decisionPoints = [
  ["Village and section", "Street character, access, lot pattern, nearby amenities, and competing inventory can change meaningfully from one section to another."],
  ["Property position", "Compare renovation level, lot placement, privacy, maintenance exposure, and the alternatives a future buyer is likely to consider."],
  ["Daily pattern", "Test school routes, work travel, airport access, recreation, dining, and the recurring trips that shape an ordinary week."],
];

export default function TheWoodlands() {
  return (
    <>
      <Helmet>
        <title>The Woodlands Real Estate & Homes for Sale | Josh Wisdom</title>
        <meta name="description" content="Compare The Woodlands villages, property types, daily routes, and ownership considerations with private real estate guidance from Josh Wisdom." />
        <link rel="canonical" href="https://joshwisdomrealtor.com/communities/the-woodlands" />
      </Helmet>

      <CommunityHero eyebrow="Private Community Advisory" title="The Woodlands" description="Village-level guidance for a market where the setting, section, lot, and condition can matter as much as the address." photo={locationPhotos.woodlands} />

      <section className="bg-[#f7f5f0] py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-9 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#875d17]">A More Precise Search</p>
            <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-[0.98] text-black md:text-6xl">The Woodlands is a collection of distinct buying decisions.</h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-700">The useful comparison is rarely one village against another in isolation. It is the complete fit: the home, its immediate setting, the routes you will use, the work it may need, and the properties a future buyer will compare with it.</p>

            <div className="mt-12 grid gap-px border border-black/10 bg-black/10 md:grid-cols-3">
              {decisionPoints.map(([title, copy]) => (
                <article key={title} className="bg-white p-7">
                  <CheckCircle2 className="h-6 w-6 text-[#9b6d1d]" aria-hidden="true" />
                  <h3 className="mt-6 font-serif text-2xl text-black">{title}</h3>
                  <p className="mt-4 leading-7 text-neutral-700">{copy}</p>
                </article>
              ))}
            </div>

            <div className="mt-16">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#875d17]">Village Reference</p>
              <h3 className="mt-4 font-serif text-4xl text-black">Begin broad. Compare narrowly.</h3>
              <div className="mt-8 grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
                {villages.map((village) => (
                  <div key={village} className="flex items-center gap-4 bg-white px-5 py-4">
                    <TreePine className="h-5 w-5 shrink-0 text-[#9b6d1d]" aria-hidden="true" />
                    <span className="font-medium text-black">{village}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 border-t border-black/15 pt-10">
              <h3 className="font-serif text-4xl text-black">Reference points</h3>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div className="flex gap-4"><Navigation className="mt-1 h-5 w-5 shrink-0 text-[#9b6d1d]" aria-hidden="true" /><div><h4 className="font-semibold text-black">Waterway and Market Street</h4><p className="mt-2 leading-7 text-neutral-700">Dining, shopping, events, and walkable destinations around Town Center.</p></div></div>
                <div className="flex gap-4"><Navigation className="mt-1 h-5 w-5 shrink-0 text-[#9b6d1d]" aria-hidden="true" /><div><h4 className="font-semibold text-black">Hughes Landing and Lake Woodlands</h4><p className="mt-2 leading-7 text-neutral-700">Restaurants, offices, residences, and waterfront access in one mixed-use district.</p></div></div>
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <LeadForm leadType="buying" showArea={false} title="Request a private area brief" subtitle="Share the property type, timing, and daily priorities that should shape your Woodlands search." buttonText="Request Area Consultation" />
          </aside>
        </div>
      </section>
    </>
  );
}
