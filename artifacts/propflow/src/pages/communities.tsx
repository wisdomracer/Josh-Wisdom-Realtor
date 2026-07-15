import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  ArrowRight,
  Building2,
  CarFront,
  CircleDollarSign,
  Compass,
  Home,
  Map,
  Route,
  Scale,
  Trees,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoCredit, ResponsiveLocationImage } from "@/components/location-hero";
import { absoluteUrl, siteConfig } from "@/config/site";
import { locationPhotos, type LocationPhoto } from "@/config/location-photos";

type CommunityCard = {
  name: string;
  slug: string;
  eyebrow: string;
  description: string;
  compare: string[];
  photo: LocationPhoto;
};

const communities: CommunityCard[] = [
  {
    name: "The Woodlands",
    slug: "the-woodlands",
    eyebrow: "Village-Planned Living",
    description:
      "Compare established villages, newer sections, Town Center access, golf-oriented communities, and the relationship between setting and daily routes.",
    compare: ["Village and section", "Lot and privacy", "Town Center access"],
    photo: locationPhotos.woodlands,
  },
  {
    name: "Tomball",
    slug: "tomball",
    eyebrow: "Space and Range",
    description:
      "Compare the historic core, established neighborhoods, acreage settings, and newer communities against commute patterns and property-specific ownership needs.",
    compare: ["Established vs. newer", "Lot and acreage", "Regional access"],
    photo: locationPhotos.tomball,
  },
  {
    name: "Greater Houston",
    slug: "greater-houston",
    eyebrow: "Regional Comparison",
    description:
      "Use the wider region to compare Spring, Magnolia, Conroe, Cypress, Montgomery, and other options around work, family, recreation, and property priorities.",
    compare: ["Daily destination", "Property brief", "Complete ownership picture"],
    photo: locationPhotos.houston,
  },
];

type ComparisonLens = {
  number: string;
  title: string;
  copy: string;
  icon: LucideIcon;
};

const comparisonLenses: ComparisonLens[] = [
  {
    number: "01",
    title: "The week",
    copy: "Work, schools, airports, medical care, recreation, family, and the routes that will be repeated—not only the drive taken during a showing.",
    icon: Route,
  },
  {
    number: "02",
    title: "The property",
    copy: "Lot, privacy, age, architecture, condition, updates, outdoor space, restrictions, and the maintenance profile the ownership brief can support.",
    icon: Home,
  },
  {
    number: "03",
    title: "The complete cost",
    copy: "Price should be considered with taxes, association or special-district costs, insurance context, expected work, utilities, and ongoing care.",
    icon: CircleDollarSign,
  },
  {
    number: "04",
    title: "The future buyer",
    copy: "A property's setting, alternatives, daily practicality, and likely audience can matter when it is time to sell—not only when it is time to move in.",
    icon: Scale,
  },
];

const focusedMarkets = [
  {
    name: "Magnolia",
    href: "/magnolia-realtor",
    eyebrow: "West of The Woodlands",
    copy: "Acreage, newer communities, privacy, and regional routes viewed through a property-specific ownership brief.",
    icon: Trees,
  },
  {
    name: "Spring",
    href: "/spring-realtor",
    eyebrow: "South and Southeast",
    copy: "Established neighborhoods, Old Town context, newer options, and access toward The Woodlands and Houston employment centers.",
    icon: Building2,
  },
  {
    name: "Conroe",
    href: "/conroe-realtor",
    eyebrow: "North and Lakeside",
    copy: "City access, Lake Conroe proximity, new construction, established areas, and the routes connecting south toward The Woodlands.",
    icon: Compass,
  },
  {
    name: "Shenandoah",
    href: "/shenandoah-realtor",
    eyebrow: "Close-In Convenience",
    copy: "A compact location near Town Center, medical services, retail, and major routes that still requires address-level comparison.",
    icon: Map,
  },
];

const comparisonRows = [
  {
    question: "What kind of setting should frame the search?",
    woodlands: "A village or close-in urban edge within a master-planned community.",
    tomball: "A historic, suburban, acreage, or newer-community setting.",
    regional: "Begin with destinations, then identify the regional settings that fit the week.",
  },
  {
    question: "What deserves address-level review?",
    woodlands: "Village, section, lot, road relationship, age, updates, and applicable fees or restrictions.",
    tomball: "Utilities, road access, restrictions, flood context, lot care, condition, and commute pattern.",
    regional: "Taxes, insurance context, special districts, associations, utilities, condition, and daily routes.",
  },
  {
    question: "What should a decision visit test?",
    woodlands: "Village routes, Town Center access, neighborhood setting, and the specific property comparison.",
    tomball: "Peak-hour routes, retail and services, lot scale, surrounding uses, and ownership responsibilities.",
    regional: "A realistic weekly route plus the best competing property and area alternatives.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Community Guides for The Woodlands and North Houston",
  url: absoluteUrl("/communities"),
  description:
    "Area comparison guides for The Woodlands, Tomball, and the Greater Houston region from Josh Wisdom Realtor.",
  about: {
    "@type": "RealEstateAgent",
    "@id": `${siteConfig.url}/#agent`,
    name: siteConfig.agentName,
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: communities.map((community, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: community.name,
      url: absoluteUrl(`/communities/${community.slug}`),
    })),
  },
};

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p className={`text-[11px] font-bold uppercase tracking-[0.3em] ${light ? "text-[#d7b56d]" : "text-[#875d17]"}`}>
      {children}
    </p>
  );
}

export default function Communities() {
  return (
    <>
      <Helmet>
        <title>Community Guides | The Woodlands & North Houston</title>
        <meta
          name="description"
          content="Compare The Woodlands, Tomball, Magnolia, Spring, Conroe, Shenandoah, and Greater Houston areas by setting, property type, daily routes, and ownership context."
        />
        <link rel="canonical" href={absoluteUrl("/communities")} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="relative overflow-hidden bg-[#050505] text-white">
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(198,154,68,0.075)_1px,transparent_1px),linear-gradient(rgba(198,154,68,0.06)_1px,transparent_1px)] bg-[size:104px_104px] opacity-50" />
        <div className="relative mx-auto grid min-h-[650px] max-w-[1440px] gap-14 px-5 py-24 md:px-9 md:py-32 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
          <div>
            <Eyebrow light>Community Intelligence</Eyebrow>
            <h1 className="mt-7 max-w-5xl font-serif text-[clamp(3.5rem,6.6vw,7rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
              The address is only the beginning of the comparison.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/76 md:text-xl md:leading-9">
              Choose the setting around the life it must support. Then compare the property, complete ownership picture, daily routes, and future alternatives address by address.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild className="h-14 rounded-none bg-[#d7b56d] px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-white">
                <a href="#primary-markets">Compare Primary Markets</a>
              </Button>
              <Button asChild variant="outline" className="h-14 rounded-none border-white/60 bg-transparent px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black">
                <Link href="/relocation">Plan a Relocation Brief</Link>
              </Button>
            </div>
          </div>

          <aside className="border border-white/15 bg-black/70 p-7 backdrop-blur-sm md:p-9" aria-label="Area comparison starting points">
            <Eyebrow light>Start with the week</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-white md:text-5xl">Four questions before choosing a ZIP code.</h2>
            <ol className="mt-8 divide-y divide-white/15 border-y border-white/15">
              {[
                "Where must the week reliably go?",
                "What kind of property should support it?",
                "Which ownership costs change the comparison?",
                "What tradeoffs remain acceptable over time?",
              ].map((question, index) => (
                <li key={question} className="flex gap-5 py-5">
                  <span className="font-serif text-xl text-[#d7b56d]">0{index + 1}</span>
                  <span className="leading-7 text-neutral-200">{question}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section id="primary-markets" className="scroll-mt-20 bg-[#f5f2ec] py-20 md:py-28" aria-labelledby="primary-markets-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-10 border-b border-black/15 pb-12 lg:grid-cols-[0.84fr_1.16fr] lg:items-end">
            <div>
              <Eyebrow>Primary Market Guides</Eyebrow>
              <h2 id="primary-markets-title" className="mt-6 max-w-2xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
                Begin broad. Compare precisely.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-700 lg:justify-self-end">
              These guides establish the first comparison. The useful decision still happens at the village, neighborhood, section, street, lot, and property level.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {communities.map((community) => (
              <article key={community.slug} className="group overflow-hidden border border-black/10 bg-white">
                <figure className="relative h-72 overflow-hidden">
                  <ResponsiveLocationImage
                    photo={community.photo}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <PhotoCredit photo={community.photo} />
                </figure>
                <div className="p-7 md:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#875d17]">{community.eyebrow}</p>
                  <h3 className="mt-4 font-serif text-4xl leading-none text-black md:text-5xl">{community.name}</h3>
                  <p className="mt-5 min-h-28 leading-7 text-neutral-700">{community.description}</p>
                  <ul className="mt-6 space-y-3 border-y border-black/10 py-5">
                    {community.compare.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-neutral-600">
                        <span className="h-1.5 w-1.5 bg-[#9b6d1d]" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/communities/${community.slug}`} className="mt-7 inline-flex items-center text-[11px] font-bold uppercase tracking-[0.2em] text-black hover:text-[#875d17]">
                    Explore {community.name} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28" aria-labelledby="comparison-lenses-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="max-w-4xl">
            <Eyebrow>Comparison Discipline</Eyebrow>
            <h2 id="comparison-lenses-title" className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
              Compare the life and the property together.
            </h2>
          </div>
          <div className="mt-14 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-4">
            {comparisonLenses.map(({ number, title, copy, icon: Icon }) => (
              <article key={number} className="bg-[#faf9f6] p-7 md:p-8">
                <div className="flex items-start justify-between gap-5">
                  <Icon className="h-6 w-6 text-[#9b6d1d]" aria-hidden="true" />
                  <span className="font-serif text-2xl text-[#9b6d1d]">{number}</span>
                </div>
                <h3 className="mt-10 font-serif text-3xl leading-tight text-black">{title}</h3>
                <p className="mt-4 leading-7 text-neutral-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111] py-20 text-white md:py-28" aria-labelledby="comparison-table-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <Eyebrow light>Working Comparison</Eyebrow>
              <h2 id="comparison-table-title" className="mt-6 max-w-2xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-white md:text-7xl">
                Different markets answer different briefs.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-300 lg:justify-self-end">
              This is a starting framework, not a ranking. The right answer depends on the client's actual routes, property requirements, cost picture, and tradeoffs.
            </p>
          </div>

          <div className="mt-12 overflow-x-auto border border-white/15">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="bg-white/5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d7b56d]">
                  <th scope="col" className="w-[25%] p-6">Decision question</th>
                  <th scope="col" className="w-[25%] border-l border-white/15 p-6">The Woodlands</th>
                  <th scope="col" className="w-[25%] border-l border-white/15 p-6">Tomball</th>
                  <th scope="col" className="w-[25%] border-l border-white/15 p-6">Greater region</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.question} className="border-t border-white/15 align-top">
                    <th scope="row" className="p-6 text-base font-semibold leading-7 text-white">{row.question}</th>
                    <td className="border-l border-white/15 p-6 leading-7 text-neutral-300">{row.woodlands}</td>
                    <td className="border-l border-white/15 p-6 leading-7 text-neutral-300">{row.tomball}</td>
                    <td className="border-l border-white/15 p-6 leading-7 text-neutral-300">{row.regional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f2ec] py-20 md:py-28" aria-labelledby="focused-markets-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-10 border-b border-black/15 pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <Eyebrow>Focused Market Guides</Eyebrow>
              <h2 id="focused-markets-title" className="mt-6 max-w-2xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
                Continue the regional comparison.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-700 lg:justify-self-end">
              These local guides add context for nearby markets without pretending that a city name can replace property-level diligence.
            </p>
          </div>

          <div className="mt-10 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2">
            {focusedMarkets.map(({ name, href, eyebrow, copy, icon: Icon }) => (
              <Link key={href} href={href} className="group bg-white p-7 transition hover:bg-black hover:text-white md:p-9">
                <div className="flex items-start justify-between gap-5">
                  <Icon className="h-6 w-6 text-[#9b6d1d]" aria-hidden="true" />
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
                <p className="mt-9 text-[10px] font-bold uppercase tracking-[0.26em] text-[#875d17] group-hover:text-[#d7b56d]">{eyebrow}</p>
                <h3 className="mt-3 font-serif text-4xl leading-tight">{name}</h3>
                <p className="mt-4 max-w-xl leading-7 text-neutral-600 group-hover:text-neutral-300">{copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow>Private Area Brief</Eyebrow>
            <h2 className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
              Turn the map into a useful decision visit.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-700">
              Share the daily destinations, property requirements, timing, and tradeoffs that should shape the comparison. Josh can organize the conversation around the week you expect to live.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild className="h-14 rounded-none bg-black px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-[#875d17]">
              <Link href="/contact">Request an Area Consultation</Link>
            </Button>
            <Button asChild variant="outline" className="h-14 rounded-none border-black bg-transparent px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-black hover:text-white">
              <Link href="/relocation">View Relocation Advisory</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
