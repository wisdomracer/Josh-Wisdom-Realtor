import { Helmet } from "react-helmet-async";
import { CheckCircle2 } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { PhotoCredit } from "@/components/location-hero";
import { locationPhotos } from "@/config/location-photos";

const relocationBrief = [
  ["Daily routes", "Compare likely commute patterns, airport access, recurring destinations, and the trips that shape an ordinary week."],
  ["Community fit", "Narrow the search by property type, lot, amenities, maintenance preferences, and the setting you want around the home."],
  ["Complete ownership cost", "Account for taxes, fees, insurance context, utilities, expected work, and other property-specific obligations."],
  ["Remote decision support", "Use virtual previews and organized property context to make in-person time more focused when distance limits the search."],
];

export default function Relocation() {
  const photo = locationPhotos.houston;

  return (
    <>
      <Helmet>
        <title>Private Houston Relocation Advisory | Josh Wisdom Realtor</title>
        <meta name="description" content="Relocation guidance for The Woodlands and North Houston, organized around daily routes, community fit, property needs, and complete ownership cost." />
        <link rel="canonical" href="https://joshwisdomrealtor.com/relocation" />
      </Helmet>

      <section className="overflow-hidden bg-[#050505] text-white">
        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="flex items-center px-5 py-24 md:px-10 lg:px-14 lg:py-28">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7b56d]">Private Relocation Advisory</p>
              <h1 className="mt-6 font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] md:text-7xl">Choose the area around the life you will live.</h1>
              <p className="mt-8 max-w-xl text-lg leading-8 text-white/72 md:text-xl">
                Houston is too broad for a generic suburb list. Josh helps relocating buyers compare daily routes, property needs, community character, and ownership costs before narrowing the search.
              </p>
            </div>
          </div>
          <figure className="relative min-h-[360px] overflow-hidden lg:min-h-[620px]">
            <img src={photo.src} alt={photo.alt} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: photo.objectPosition }} loading="eager" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
            <PhotoCredit photo={photo} />
          </figure>
        </div>
      </section>

      <section className="bg-[#f7f5f0] py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#875d17]">The Relocation Brief</p>
            <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-[0.98] text-black md:text-6xl">Make the first visit more useful.</h2>
            <div className="mt-10 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2">
              {relocationBrief.map(([title, copy]) => (
                <article key={title} className="bg-white p-7 md:p-8">
                  <CheckCircle2 className="h-6 w-6 text-[#9b6d1d]" aria-hidden="true" />
                  <h3 className="mt-6 font-serif text-3xl text-black">{title}</h3>
                  <p className="mt-4 leading-7 text-neutral-700">{copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <LeadForm
              leadType="relocation"
              showArea
              title="Request a private relocation brief"
              subtitle="Share your timing, likely destinations, and property priorities. Josh will follow up directly."
              buttonText="Request Relocation Consultation"
            />
          </div>
        </div>
      </section>
    </>
  );
}
