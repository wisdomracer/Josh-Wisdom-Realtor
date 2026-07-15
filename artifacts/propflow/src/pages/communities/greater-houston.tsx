import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  ArrowRight,
  Building2,
  CarFront,
  CircleDollarSign,
  Compass,
  Home,
  Landmark,
  MapPin,
  Plane,
  Route,
  School,
  Trees,
  type LucideIcon,
} from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { CommunityHero } from "@/components/location-hero";
import { Button } from "@/components/ui/button";
import { absoluteUrl, siteConfig } from "@/config/site";
import { locationPhotos } from "@/config/location-photos";

type DecisionLens = {
  number: string;
  title: string;
  copy: string;
  icon: LucideIcon;
};

const decisionLenses: DecisionLens[] = [
  {
    number: "01",
    title: "The recurring week",
    copy: "Work, school, healthcare, family, airport, and ordinary errands should shape the search before a broad suburb list does.",
    icon: Route,
  },
  {
    number: "02",
    title: "The property brief",
    copy: "Architecture, lot, privacy, amenities, age, condition, maintenance tolerance, and future plans define which markets belong in the comparison.",
    icon: Home,
  },
  {
    number: "03",
    title: "The ownership structure",
    copy: "Taxes, applicable associations or districts, utilities, insurance context, restrictions, expected work, and recurring obligations belong beside price.",
    icon: CircleDollarSign,
  },
  {
    number: "04",
    title: "The next buyer",
    copy: "A sound decision considers what future buyers may compare at the same price and which property qualities can preserve a clear position.",
    icon: Compass,
  },
];

const focusedGuides = [
  {
    name: "The Woodlands",
    href: "/communities/the-woodlands",
    label: "Village-planned living",
    copy: "Compare village, section, property age, condition, lot, Town Center access, recurring routes, and ownership obligations at the address level.",
    icon: Trees,
  },
  {
    name: "Tomball",
    href: "/communities/tomball",
    label: "Town, neighborhood, or land",
    copy: "Historic, established, newer-community, and acreage settings create different utility, restriction, access, maintenance, and route questions.",
    icon: Landmark,
  },
  {
    name: "Magnolia",
    href: "/magnolia-realtor",
    label: "Space and ownership",
    copy: "Acreage, newer communities, utilities, improvements, restrictions, and daily connections should be evaluated as one ownership brief.",
    icon: Trees,
  },
  {
    name: "Spring",
    href: "/spring-realtor",
    label: "Address-specific context",
    copy: "Neighborhood, jurisdiction, tax profile, school boundary, condition, and access can change within a short drive and deserve direct confirmation.",
    icon: MapPin,
  },
  {
    name: "Conroe",
    href: "/conroe-realtor",
    label: "Lake, land, or community",
    copy: "Water-oriented property, acreage, established neighborhoods, and newer construction answer different lifestyle and ownership briefs.",
    icon: Building2,
  },
  {
    name: "Shenandoah",
    href: "/shenandoah-realtor",
    label: "Access in the foreground",
    copy: "Proximity can be meaningful, while exact street position, jurisdiction, condition, ownership cost, and nearby alternatives still drive the comparison.",
    icon: CarFront,
  },
];

const weeklyDestinations = [
  {
    title: "Work and recurring appointments",
    copy: "Test the door-to-door route from the property at the times it will actually be used, including the final local streets and access points.",
    icon: Building2,
  },
  {
    title: "School and household logistics",
    copy: "Confirm boundaries and programs directly, then map drop-offs, activities, childcare, and the timing of an ordinary weekday.",
    icon: School,
  },
  {
    title: "Healthcare, family, and support",
    copy: "Recurring medical care, relatives, caregivers, and other support networks can matter more than a simple distance to downtown.",
    icon: Landmark,
  },
  {
    title: "Airport, travel, and discretionary time",
    copy: "Consider airport choice, travel frequency, dining, recreation, and how much time the household is willing to exchange for the property itself.",
    icon: Plane,
  },
];

const ownershipSettings = [
  {
    setting: "Master-planned community",
    appeal: "Coordinated amenities, neighborhood identity, and a defined residential setting.",
    confirm: "Exact section, associations, districts, fees, rules, amenities, lot, age, condition, and nearby alternatives.",
  },
  {
    setting: "Established neighborhood",
    appeal: "Mature streets, varied architecture, existing improvements, and a known physical setting.",
    confirm: "Condition, renovation history, systems, restrictions, drainage context, lot position, and likely future work.",
  },
  {
    setting: "Newer construction",
    appeal: "Current plans, finishes, warranties, and the possibility of selecting a newer community phase.",
    confirm: "Builder, incentives, complete cost, phase, lot, delivery timing, districts, fees, warranties, and resale competition.",
  },
  {
    setting: "Acreage or water-oriented property",
    appeal: "Privacy, land, flexibility, views, access, or a property experience that is difficult to reproduce.",
    confirm: "Survey, access, utilities, restrictions, flood information, improvements, maintenance, insurance context, and intended use.",
  },
];

const broaderMarkets = ["Cypress", "Katy", "Kingwood", "Klein", "Montgomery", "Houston neighborhoods"];

const faqs = [
  {
    question: "Where should a Greater Houston home search begin?",
    answer:
      "Begin with the household's recurring destinations, property requirements, ownership preferences, timing, and complete budget. Those constraints usually create a more useful shortlist than a generic ranking of suburbs.",
  },
  {
    question: "Can one commute estimate compare the region accurately?",
    answer:
      "No. Access from the exact property, departure time, route alternatives, school traffic, construction, weather, and recurring destinations can change the experience. Test the routes that matter at realistic times.",
  },
  {
    question: "How should new construction be compared with resale?",
    answer:
      "Compare complete cost, incentives, financing terms, taxes and districts, fees, lot and location, finish level, warranties, completion timing, expected work, and the future resale competition created by nearby builder inventory.",
  },
  {
    question: "Does Josh advise outside The Woodlands and Tomball?",
    answer:
      "Yes. The primary focus is The Woodlands, Tomball, and North Houston, with broader Greater Houston guidance when the client's property, route, or relocation brief requires it.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Greater Houston Real Estate and Community Guide",
      url: absoluteUrl("/communities/greater-houston"),
      description:
        "A decision-focused guide to Greater Houston communities, recurring routes, property settings, ownership context, and private relocation consultation.",
      about: {
        "@type": "Place",
        name: "Greater Houston, Texas",
        containedInPlace: {
          "@type": "State",
          name: "Texas",
        },
      },
      provider: {
        "@type": "RealEstateAgent",
        "@id": `${siteConfig.url}/#agent`,
        name: siteConfig.agentName,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ question, answer }) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      })),
    },
  ],
};

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p className={`text-[11px] font-bold uppercase tracking-[0.3em] ${light ? "text-[#d7b56d]" : "text-[#875d17]"}`}>
      {children}
    </p>
  );
}

export default function GreaterHouston() {
  return (
    <>
      <Helmet>
        <title>Greater Houston Real Estate & Community Guide | Josh Wisdom</title>
        <meta
          name="description"
          content="Compare Greater Houston communities through recurring routes, property requirements, ownership context, complete cost, and a private relocation brief with Josh Wisdom."
        />
        <link rel="canonical" href={absoluteUrl("/communities/greater-houston")} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <CommunityHero
        eyebrow="Private Regional Advisory"
        title="Greater Houston"
        description="A large region becomes useful only after the search is organized around the property, recurring routes, ownership structure, and daily life that matter to you."
        photo={locationPhotos.houston}
      />

      <section className="bg-[#f5f2ec] py-20 md:py-28" aria-labelledby="regional-lens-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-10 border-b border-black/15 pb-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
            <div>
              <Eyebrow>A Better Starting Point</Eyebrow>
              <h2 id="regional-lens-title" className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
                Narrow the region by consequences, not zip codes.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-700 lg:justify-self-end">
              Greater Houston is too broad for a generic suburb ranking. The useful shortlist begins with the week you will live, then tests each market against the property, cost, upkeep, and future alternatives.
            </p>
          </div>

          <div className="mt-10 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-4">
            {decisionLenses.map(({ number, title, copy, icon: Icon }) => (
              <article key={number} className="bg-white p-7 md:p-8">
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

      <section className="bg-white py-20 md:py-28" aria-labelledby="focused-guides-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="max-w-4xl">
            <Eyebrow>Focused Market Guides</Eyebrow>
            <h2 id="focused-guides-title" className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
              Different settings answer different briefs.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-700">
              These guides are starting points, not rankings. The right comparison depends on the exact address, household routes, property requirements, ownership preferences, and alternatives available at the time.
            </p>
          </div>

          <div className="mt-14 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-3">
            {focusedGuides.map(({ name, href, label, copy, icon: Icon }) => (
              <Link key={href} href={href} className="group bg-[#faf9f6] p-7 transition hover:bg-white md:p-9">
                <div className="flex items-start justify-between gap-5">
                  <Icon className="h-6 w-6 text-[#9b6d1d]" aria-hidden="true" />
                  <ArrowRight className="h-5 w-5 text-black transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
                <p className="mt-9 text-[10px] font-bold uppercase tracking-[0.22em] text-[#875d17]">{label}</p>
                <h3 className="mt-3 font-serif text-4xl leading-tight text-black">{name}</h3>
                <p className="mt-4 leading-7 text-neutral-600">{copy}</p>
              </Link>
            ))}
          </div>

          <div className="mt-10 border-y border-black/15 py-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-neutral-600">Broader markets included when the brief requires them</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {broaderMarkets.map((market) => (
                <span key={market} className="border border-black/15 bg-[#faf9f6] px-4 py-3 text-sm font-medium text-black">
                  {market}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#111] py-20 text-white md:py-28" aria-labelledby="weekly-route-title">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-9 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <Eyebrow light>Build the Real Week</Eyebrow>
            <h2 id="weekly-route-title" className="mt-6 max-w-xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-white md:text-7xl">
              The route begins at the front door.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-300">
              A map pin does not show the final local streets, access points, recurring departure times, or the number of trips a household will repeat. Test the complete week from the specific property.
            </p>
          </div>
          <div className="border-t border-white/70">
            {weeklyDestinations.map(({ title, copy, icon: Icon }, index) => (
              <article key={title} className="grid gap-4 border-b border-white/15 py-7 md:grid-cols-[auto_0.82fr_1.18fr] md:gap-7">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-2xl text-[#d7b56d]">0{index + 1}</span>
                  <Icon className="h-5 w-5 text-[#d7b56d] md:hidden" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-white">{title}</h3>
                <p className="leading-7 text-neutral-300">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f2ec] py-20 md:py-28" aria-labelledby="ownership-setting-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <Eyebrow>Ownership Context</Eyebrow>
              <h2 id="ownership-setting-title" className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
                The setting changes the diligence.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-700 lg:justify-self-end">
              A luxury residence, established home, new build, acreage property, and water-oriented home can carry very different records, systems, costs, maintenance, restrictions, and future-buyer questions.
            </p>
          </div>

          <div className="mt-12 grid gap-px border border-black/10 bg-black/10 md:hidden">
            {ownershipSettings.map(({ setting, appeal, confirm }, index) => (
              <article key={setting} className="bg-white p-7">
                <div className="flex items-start justify-between gap-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#875d17]">Property setting</p>
                  <span className="font-serif text-2xl text-[#9b6d1d]">0{index + 1}</span>
                </div>
                <h3 className="mt-5 font-serif text-3xl leading-tight text-black">{setting}</h3>
                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#875d17]">Potential appeal</p>
                <p className="mt-2 leading-7 text-neutral-600">{appeal}</p>
                <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#875d17]">Confirm property by property</p>
                <p className="mt-2 leading-7 text-neutral-600">{confirm}</p>
              </article>
            ))}
          </div>

          <div className="mt-14 hidden overflow-x-auto border-t border-black md:block">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="border-b border-black/20">
                  <th className="w-[24%] py-5 pr-6 text-[10px] font-bold uppercase tracking-[0.22em] text-[#875d17]">Property setting</th>
                  <th className="w-[31%] px-6 py-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#875d17]">Potential appeal</th>
                  <th className="w-[45%] py-5 pl-6 text-[10px] font-bold uppercase tracking-[0.22em] text-[#875d17]">Confirm property by property</th>
                </tr>
              </thead>
              <tbody>
                {ownershipSettings.map(({ setting, appeal, confirm }) => (
                  <tr key={setting} className="border-b border-black/15 align-top">
                    <th scope="row" className="py-7 pr-6 font-serif text-2xl font-normal text-black">{setting}</th>
                    <td className="px-6 py-7 leading-7 text-neutral-600">{appeal}</td>
                    <td className="py-7 pl-6 leading-7 text-neutral-600">{confirm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28" aria-labelledby="regional-seller-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow>For Greater Houston Owners</Eyebrow>
            <h2 id="regional-seller-title" className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
              Position the home against the alternatives buyers can actually choose.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-700">
              The relevant competition may cross neighborhood, city, or county lines. Pricing and presentation should explain the property's specific setting, condition, ownership profile, and value relative to those real alternatives.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild className="h-14 rounded-none bg-black px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-[#875d17]">
              <Link href="/home-valuation">Request Private Value Review</Link>
            </Button>
            <Button asChild variant="outline" className="h-14 rounded-none border-black bg-transparent px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-black hover:text-white">
              <Link href="/sell">View Seller Representation</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="greater-houston-consultation" className="scroll-mt-20 bg-black py-20 text-white md:py-28" aria-labelledby="regional-consultation-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow light>Private Regional Brief</Eyebrow>
            <h2 id="regional-consultation-title" className="mt-6 max-w-xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-white md:text-7xl">
              Begin with the property and the week.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-300">
              Share the likely destinations, preferred setting, property requirements, complete budget, timing, and ownership tradeoffs that should shape the first comparison.
            </p>
          </div>
          <div className="text-black">
            <LeadForm
              leadType="buying"
              showArea
              title="Request a private Greater Houston brief"
              subtitle="Tell Josh which routes, property types, markets, and ownership priorities should guide the shortlist."
              buttonText="Request Regional Consultation"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28" aria-labelledby="regional-faq-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <Eyebrow>Questions to Clarify</Eyebrow>
            <h2 id="regional-faq-title" className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-6xl">
              Before drawing the shortlist.
            </h2>
          </div>
          <div className="border-t border-black">
            {faqs.map(({ question, answer }) => (
              <article key={question} className="grid gap-4 border-b border-black/15 py-7 md:grid-cols-[0.86fr_1.14fr] md:gap-8">
                <h3 className="text-lg font-semibold leading-7 text-black">{question}</h3>
                <p className="leading-7 text-neutral-600">{answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
