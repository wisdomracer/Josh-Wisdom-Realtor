import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { CommunityHero } from "@/components/location-hero";
import { locationPhotos } from "@/config/location-photos";

const areas = ["Spring", "Magnolia", "Conroe", "Cypress", "Klein", "Montgomery", "Kingwood", "Katy"];
const priorities = [
  ["Daily destinations", "Work, school, airport, healthcare, family, and the recurring trips that determine whether a location works in practice."],
  ["Property requirements", "Home style, lot, privacy, amenities, age, maintenance tolerance, and the improvements you are willing to take on."],
  ["Complete cost", "Price is only one input. Compare taxes, fees, insurance context, utilities, expected work, and ongoing ownership obligations."],
  ["Future alternatives", "Understand what else buyers can choose at the same price and how the property's position may affect a later resale."],
];

export default function GreaterHouston() {
  return (
    <>
      <Helmet>
        <title>Greater Houston Suburbs Real Estate | Josh Wisdom</title>
        <meta name="description" content="Compare Greater Houston communities around daily routes, property needs, complete ownership cost, and future buyer alternatives with Josh Wisdom." />
        <link rel="canonical" href="https://joshwisdomrealtor.com/communities/greater-houston" />
      </Helmet>

      <CommunityHero eyebrow="Private Relocation Advisory" title="Greater Houston" description="A disciplined way to narrow a large region around the property, routes, costs, and daily life that matter to you." photo={locationPhotos.houston} />

      <section className="bg-[#f7f5f0] py-20 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#875d17]">A Better Starting Point</p>
              <h2 className="mt-5 font-serif text-4xl leading-[0.98] text-black md:text-6xl">Start with the week you will live—not a map of suburbs.</h2>
              <p className="mt-7 text-lg leading-8 text-neutral-700">Greater Houston is too broad for a generic ranking. The right shortlist begins with the trips, property type, ownership preferences, and tradeoffs that will shape your actual experience.</p>
            </div>
            <div className="grid gap-px border border-black/10 bg-black/10 md:grid-cols-2">
              {priorities.map(([title, copy]) => (
                <article key={title} className="bg-white p-7">
                  <CheckCircle2 className="h-6 w-6 text-[#9b6d1d]" aria-hidden="true" />
                  <h3 className="mt-5 font-serif text-2xl text-black">{title}</h3>
                  <p className="mt-3 leading-7 text-neutral-700">{copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-16 border-y border-black/15 py-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-neutral-600">Areas often included in the comparison</p>
            <div className="mt-6 grid grid-cols-2 gap-px bg-black/10 sm:grid-cols-4 lg:grid-cols-8">
              {areas.map((area) => (
                <div key={area} className="flex min-h-20 items-center justify-center gap-2 bg-white px-3 text-center">
                  <MapPin className="h-4 w-4 shrink-0 text-[#9b6d1d]" aria-hidden="true" />
                  <span className="text-sm font-medium text-black">{area}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 bg-[#090909] px-7 py-12 text-white md:px-12 md:py-16">
            <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#d7b56d]">Private Area Comparison</p>
                <h3 className="mt-5 max-w-3xl font-serif text-4xl leading-tight md:text-5xl">Turn a wide search into a defensible shortlist.</h3>
                <p className="mt-5 max-w-2xl leading-7 text-white/70">Share your timing, likely destinations, property priorities, and preferred level of upkeep. Josh will organize the first comparison around those decisions.</p>
              </div>
              <Link href="/relocation" className="inline-flex items-center justify-center bg-[#cfa344] px-7 py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-black hover:bg-[#deb65f]">Request Relocation Brief <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
