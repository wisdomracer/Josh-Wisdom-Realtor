import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  ArrowRight,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  Compass,
  MapPinned,
  Plane,
  Route,
  SearchCheck,
  Video,
  type LucideIcon,
} from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { PhotoCredit, ResponsiveLocationImage } from "@/components/location-hero";
import { Button } from "@/components/ui/button";
import { locationPhotos } from "@/config/location-photos";

type RelocationStep = {
  number: string;
  title: string;
  copy: string;
  icon: LucideIcon;
};

const relocationSteps: RelocationStep[] = [
  {
    number: "01",
    title: "Map the week",
    copy: "Identify work, airport, healthcare, family, recreation, and recurring destinations so the search reflects the trips that will shape ordinary life.",
    icon: Route,
  },
  {
    number: "02",
    title: "Compare areas",
    copy: "Evaluate setting, property types, lot expectations, maintenance, jurisdiction, routes, amenities, and relevant alternatives side by side.",
    icon: MapPinned,
  },
  {
    number: "03",
    title: "Preview remotely",
    copy: "Use organized property context, live video, documents, and direct questions to narrow the shortlist before travel time becomes the constraint.",
    icon: Video,
  },
  {
    number: "04",
    title: "Use the visit",
    copy: "Build an itinerary around the strongest area and property comparisons so the visit tests real tradeoffs instead of collecting more options.",
    icon: CalendarCheck2,
  },
];

const decisionCards = [
  {
    label: "Route over radius",
    title: "Distance alone does not describe the daily trip.",
    copy: "Direction, time of day, airport access, recurring destinations, toll routes, and the sequence of an ordinary week can matter more than mileage.",
    icon: Route,
  },
  {
    label: "Property over place name",
    title: "The address is only one part of the fit.",
    copy: "Property type, lot, condition, privacy, maintenance, jurisdiction, fees, and nearby alternatives can materially change the decision within one area.",
    icon: Building2,
  },
  {
    label: "Focus over volume",
    title: "A useful visit should answer questions, not create more tabs.",
    copy: "Remote review should remove weak options early and reserve in-person time for the comparisons that can actually change the decision.",
    icon: SearchCheck,
  },
];

const relocationBrief = [
  { title: "Weekly route map", copy: "Recurring destinations, likely travel windows, airport needs, and the routes worth testing directly." },
  { title: "Area comparison", copy: "Setting, property types, jurisdictions, amenities, maintenance expectations, and practical alternatives." },
  { title: "Property criteria", copy: "Space, lot, privacy, condition, architecture, ownership obligations, and acceptable tradeoffs." },
  { title: "Ownership context", copy: "Price plus taxes, fees, insurance context, utilities, expected work, and property-specific costs." },
  { title: "Remote shortlist", copy: "Live previews, documents, direct observations, material questions, and reasons to keep or remove each option." },
  { title: "Visit itinerary", copy: "A focused sequence of areas, properties, routes, and decision points designed around limited time." },
];

const areaGuides = [
  {
    title: "The Woodlands",
    href: "/communities/the-woodlands",
    copy: "Compare villages, wooded settings, amenities, property types, and routes within a large master-planned community.",
  },
  {
    title: "Tomball",
    href: "/communities/tomball",
    copy: "Evaluate established neighborhoods, newer communities, acreage options, and access across the northwest side.",
  },
  {
    title: "Greater Houston",
    href: "/communities/greater-houston",
    copy: "Widen the decision when employment, airport, family, or property requirements point beyond North Houston.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private Houston relocation advisory",
  serviceType: "Residential real estate relocation and buyer representation",
  areaServed: [
    "The Woodlands, TX",
    "Tomball, TX",
    "Spring, TX",
    "Magnolia, TX",
    "Greater Houston, TX",
  ],
  provider: {
    "@type": "RealEstateAgent",
    "@id": "https://joshwisdomrealtor.com/#agent",
    name: "Josh Wisdom Realtor",
    url: "https://joshwisdomrealtor.com/",
  },
};

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-[0.3em] ${
        light ? "text-[#d7b56d]" : "text-[#875d17]"
      }`}
    >
      {children}
    </p>
  );
}

export default function Relocation() {
  const photo = locationPhotos.houston;

  return (
    <>
      <Helmet>
        <title>Private Houston Relocation Advisory | Josh Wisdom Realtor</title>
        <meta
          name="description"
          content="Private relocation guidance for The Woodlands and Greater Houston, organized around daily routes, area comparisons, remote previews, property needs, and complete ownership context."
        />
        <link rel="canonical" href="https://joshwisdomrealtor.com/relocation" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="relative min-h-[690px] overflow-hidden bg-[#050505] text-white">
        <figure className="absolute inset-0 lg:left-[42%]">
          <ResponsiveLocationImage
            photo={photo}
            className="h-full w-full object-cover"
            sizes="(min-width: 1024px) 58vw, 100vw"
            loading="eager"
            fetchPriority="high"
          />
          <PhotoCredit photo={photo} />
        </figure>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,0.98)_0%,rgba(3,3,3,0.94)_45%,rgba(3,3,3,0.63)_72%,rgba(3,3,3,0.2)_100%)] lg:bg-[linear-gradient(90deg,#050505_0%,#050505_38%,rgba(5,5,5,0.86)_52%,rgba(5,5,5,0.12)_82%)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="relative mx-auto flex min-h-[690px] max-w-[1440px] items-center px-5 py-24 md:px-9">
          <div className="max-w-4xl">
            <Eyebrow light>Private Relocation Advisory</Eyebrow>
            <h1 className="mt-7 max-w-4xl font-serif text-[clamp(3.4rem,6.8vw,7.1rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-white">
              Choose the area around the life you will live.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76 md:text-xl md:leading-9">
              Josh helps relocating buyers translate work, travel, recurring
              destinations, property needs, and ownership priorities into a
              focused Houston-area search.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                className="h-13 rounded-none bg-[#d7b56d] px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-white"
              >
                <a href="#relocation-consultation" data-primary-cta>
                  Request Private Move Brief
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-13 rounded-none border-white/60 bg-black/15 px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black"
              >
                <Link href="/communities" data-primary-cta>
                  Compare Areas
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] text-white">
        <div className="mx-auto grid max-w-[1440px] gap-px bg-white/12 px-5 py-5 md:grid-cols-3 md:px-9">
          {[
            ["Daily life before map", "Start with the week the location must support."],
            ["Fit before favorites", "Define the property and ownership tradeoffs early."],
            ["Focus before visit", "Use remote review to protect limited in-person time."],
          ].map(([title, copy]) => (
            <div key={title} className="bg-[#090909] px-6 py-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d7b56d]">{title}</p>
              <p className="mt-2 text-sm leading-6 text-white/65">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f6f1e8] py-20 text-black md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <Eyebrow>The Move Plan</Eyebrow>
              <h2 className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] md:text-7xl">
                Make the first visit answer the right questions.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-700 lg:justify-self-end">
              A relocation search should reduce uncertainty before travel. The
              process begins with the real week, narrows the geography, tests
              properties remotely, and reserves the visit for meaningful
              comparisons.
            </p>
          </div>

          <div className="mt-12 grid gap-px bg-black/15 md:grid-cols-2 xl:grid-cols-4">
            {relocationSteps.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.number} className="min-h-80 bg-white p-7 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-serif text-3xl text-[#8a6520]">{step.number}</span>
                    <Icon className="h-5 w-5 text-[#9b6d1d]" aria-hidden="true" />
                  </div>
                  <h3 className="mt-16 font-serif text-4xl leading-none">{step.title}</h3>
                  <p className="mt-5 leading-7 text-neutral-700">{step.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#080807] py-20 text-white md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <Eyebrow light>The Relocation Lens</Eyebrow>
          <h2 className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] md:text-7xl">
            Compare the move you will actually experience.
          </h2>

          <div className="mt-12 grid gap-px bg-white/12 lg:grid-cols-3">
            {decisionCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.label} className="bg-[#11110f] p-7 md:p-9">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#d7b56d]">{card.label}</p>
                    <Icon className="h-5 w-5 text-[#d7b56d]" aria-hidden="true" />
                  </div>
                  <h3 className="mt-10 font-serif text-3xl leading-[1.05] text-white md:text-4xl">{card.title}</h3>
                  <p className="mt-6 leading-7 text-white/65">{card.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-black md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <Eyebrow>Before The Visit</Eyebrow>
            <h2 className="mt-6 max-w-xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] md:text-7xl">
              Build the move brief before booking the route.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-8 text-neutral-700">
              The brief turns a broad metro into a deliberate comparison and
              gives each remote preview or in-person stop a clear reason to
              remain in the search.
            </p>
            <Button
              asChild
              className="mt-8 h-12 rounded-none bg-black px-7 text-[10px] font-bold uppercase tracking-[0.22em] text-white hover:bg-[#9b6d1d]"
            >
              <a href="#relocation-consultation">Start A Private Move Brief</a>
            </Button>
          </div>

          <div className="grid gap-px bg-black/12 sm:grid-cols-2">
            {relocationBrief.map((item, index) => (
              <article key={item.title} className="min-h-52 bg-[#f7f3ec] p-7">
                <div className="flex items-start justify-between gap-4">
                  <CheckCircle2 className="h-5 w-5 text-[#9b6d1d]" aria-hidden="true" />
                  <span className="font-serif text-3xl text-black/50">0{index + 1}</span>
                </div>
                <h3 className="mt-8 font-serif text-3xl leading-none">{item.title}</h3>
                <p className="mt-4 leading-7 text-neutral-700">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f1e8] py-20 text-black md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <Eyebrow>Area Intelligence</Eyebrow>
              <h2 className="mt-6 font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] md:text-7xl">
                Start with three useful frames of reference.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-700 lg:justify-self-end">
              These guides organize the initial comparison without pretending
              one city or neighborhood can answer every relocation brief.
            </p>
          </div>

          <div className="mt-12 grid gap-px bg-black/12 lg:grid-cols-3">
            {areaGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group flex min-h-72 flex-col bg-white p-7 transition-colors hover:bg-[#0a0a09] hover:text-white md:p-9"
              >
                <Compass className="h-5 w-5 text-[#9b6d1d]" aria-hidden="true" />
                <h3 className="mt-12 font-serif text-4xl leading-none">{guide.title}</h3>
                <p className="mt-5 flex-1 leading-7 text-neutral-700 transition-colors group-hover:text-white/65">{guide.copy}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#875d17] group-hover:text-[#d7b56d]">
                  Read Area Guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="relocation-consultation" className="scroll-mt-24 bg-white py-20 text-black md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <Eyebrow>Private Relocation Consultation</Eyebrow>
            <h2 className="mt-6 max-w-2xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] md:text-7xl">
              Begin with the week the move must support.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">
              Share your timing, starting location, work and travel needs,
              recurring destinations, property priorities, and the tradeoffs
              already in view. Josh will review the request personally.
            </p>
            <div className="mt-10 border-t border-black/15 pt-6">
              <div className="flex gap-4">
                <Plane className="mt-1 h-5 w-5 shrink-0 text-[#9b6d1d]" aria-hidden="true" />
                <div>
                  <h3 className="font-serif text-2xl">Remote-first when useful.</h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-neutral-600">
                    Organize the comparison before travel, then use in-person
                    time on the areas and properties that remain relevant.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-black/15 bg-[#f7f3ec] p-2 shadow-[0_20px_55px_rgba(0,0,0,0.10)]">
            <LeadForm
              leadType="relocation"
              showArea
              title="Request a private relocation brief"
              subtitle="Share the timing, likely destinations, travel needs, and property priorities Josh should review."
              buttonText="Request Relocation Consultation"
            />
          </div>
        </div>
      </section>
    </>
  );
}
