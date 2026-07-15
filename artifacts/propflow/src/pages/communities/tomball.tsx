import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  ArrowRight,
  Building2,
  CarFront,
  CircleDollarSign,
  Fence,
  FileSearch,
  Home,
  LandPlot,
  MapPin,
  Route,
  Scale,
  Trees,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { CommunityHero } from "@/components/location-hero";
import { Button } from "@/components/ui/button";
import { absoluteUrl, siteConfig } from "@/config/site";
import { locationPhotos } from "@/config/location-photos";

type Comparison = {
  number: string;
  title: string;
  copy: string;
  icon: LucideIcon;
};

const comparisons: Comparison[] = [
  {
    number: "01",
    title: "The setting",
    copy: "Historic core, established subdivision, newer community, acreage, and unincorporated surroundings create different property and ownership briefs.",
    icon: MapPin,
  },
  {
    number: "02",
    title: "The land",
    copy: "Lot shape, access, drainage, trees, easements, improvements, utilities, restrictions, adjacent uses, and maintenance belong in the comparison.",
    icon: LandPlot,
  },
  {
    number: "03",
    title: "The route",
    copy: "Test actual trips to work, school, shopping, healthcare, family, and The Woodlands at the times they will be driven.",
    icon: Route,
  },
  {
    number: "04",
    title: "The complete cost",
    copy: "Consider price with taxes, applicable associations or districts, insurance context, utilities, expected work, land care, and financing needs.",
    icon: CircleDollarSign,
  },
];

const settingTypes = [
  {
    label: "Historic and close-in",
    title: "Town core context",
    copy: "Older street patterns, local destinations, property age, lot use, renovation history, nearby activity, and city-service context deserve address-level review.",
    icon: Building2,
  },
  {
    label: "Established residential",
    title: "Neighborhood context",
    copy: "Compare condition, updates, lot position, mature landscaping, restrictions, association structure where applicable, and likely future buyer alternatives.",
    icon: Home,
  },
  {
    label: "Newer inventory",
    title: "Community context",
    copy: "Builder, phase, lot, incentives, tax and district context, association obligations, competing new construction, and resale timing can all shape the decision.",
    icon: Wrench,
  },
  {
    label: "Land and privacy",
    title: "Acreage context",
    copy: "Access, utilities, drainage, flood information, restrictions, outbuildings, fencing, trees, maintenance, future flexibility, and nearby development require closer diligence.",
    icon: Trees,
  },
];

const addressQuestions = [
  {
    title: "City, county, or unincorporated context",
    copy: "A Tomball mailing address does not by itself establish city limits, municipal services, regulatory context, tax entities, or every utility detail.",
  },
  {
    title: "Water, sewer, well, and septic",
    copy: "Confirm the actual systems, service providers, permits, condition, capacity, maintenance history, and specialist questions relevant to the property.",
  },
  {
    title: "Road, access, and easements",
    copy: "Review legal and physical access, road maintenance, shared drives, gates, recorded easements, utility corridors, and how the property functions in ordinary weather.",
  },
  {
    title: "Restrictions and intended use",
    copy: "Confirm deed restrictions, association rules where applicable, business or animal-use questions, outbuildings, additions, setbacks, and future plans with the proper records and professionals.",
  },
];

const landDiligence = [
  {
    number: "01",
    title: "Read the survey and title context",
    copy: "Understand boundaries, easements, encroachments, access, improvements, and exceptions with the title company, surveyor, and attorney when appropriate.",
    icon: FileSearch,
  },
  {
    number: "02",
    title: "Inspect beyond the house",
    copy: "Evaluate drainage, site grading, trees, fencing, outbuildings, driveways, utilities, water or septic systems, and other property-specific improvements.",
    icon: Fence,
  },
  {
    number: "03",
    title: "Price the ownership plan",
    copy: "Estimate immediate work, recurring land care, system maintenance, insurance context, taxes, utilities, and financing implications—not only the purchase price.",
    icon: Scale,
  },
];

const routeContexts = [
  {
    route: "Tomball Parkway / SH 249",
    lens: "Regional north-south access",
    question: "How does the specific property connect to the route during the times the household will use it?",
  },
  {
    route: "FM 2920 / Main Street",
    lens: "East-west movement and local activity",
    question: "Does the route support the daily destinations, and how does nearby traffic or commercial activity affect the setting?",
  },
  {
    route: "FM 2978 and Woodlands-area connections",
    lens: "Access toward The Woodlands",
    question: "What does the actual drive reveal about peak-hour movement, schools, medical care, shopping, and recurring trips?",
  },
];

const nearbyComparisons = [
  {
    name: "The Woodlands",
    href: "/communities/the-woodlands",
    copy: "Compare a village-planned setting, Town Center access, property age and condition, and a different daily-life structure.",
  },
  {
    name: "Magnolia",
    href: "/magnolia-realtor",
    copy: "Compare privacy, acreage, newer communities, route patterns, and property-specific ownership needs farther west and northwest.",
  },
  {
    name: "Spring",
    href: "/spring-realtor",
    copy: "Compare established and newer options with routes toward The Woodlands and broader Houston employment centers.",
  },
  {
    name: "Greater Houston",
    href: "/communities/greater-houston",
    copy: "Step back to test the Tomball brief against the wider region before narrowing the property list.",
  },
];

const faqs = [
  {
    question: "Is every Tomball address inside the City of Tomball?",
    answer:
      "No. A Tomball mailing address can cover properties with different city-limit, county, utility, tax, and regulatory contexts. Those details should be confirmed for the exact address.",
  },
  {
    question: "Is acreage automatically a better value?",
    answer:
      "No. More land can provide privacy and flexibility, but access, utilities, restrictions, drainage, improvements, maintenance, insurance context, financing, and future buyer demand can materially change the comparison.",
  },
  {
    question: "How should newer communities be compared with established neighborhoods?",
    answer:
      "Compare complete cost, lot and phase, builder and warranty context, tax or district obligations, association rules, incentives, condition, location, immediate competition, and likely resale alternatives.",
  },
  {
    question: "Why drive routes instead of relying on map time?",
    answer:
      "A map estimate cannot fully show access from the specific property, peak-hour patterns, school traffic, construction, local activity, or how the route feels when repeated throughout an ordinary week.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "Tomball Real Estate and Community Guide",
      url: absoluteUrl("/communities/tomball"),
      description:
        "A property-specific guide to Tomball settings, acreage, utilities, daily routes, ownership context, and private area consultation.",
      about: {
        "@type": "Place",
        name: "Tomball, Texas",
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

export default function Tomball() {
  return (
    <>
      <Helmet>
        <title>Tomball TX Real Estate & Property Guide | Josh Wisdom</title>
        <meta
          name="description"
          content="Compare Tomball's historic core, established neighborhoods, newer communities, acreage, utilities, ownership context, and daily routes with Josh Wisdom Realtor."
        />
        <link rel="canonical" href={absoluteUrl("/communities/tomball")} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <CommunityHero
        eyebrow="Private Community Advisory"
        title="Tomball"
        description="A property-by-property market spanning historic streets, established neighborhoods, newer communities, acreage settings, and different city, utility, and ownership contexts."
        photo={locationPhotos.tomball}
      />

      <section className="bg-[#f5f2ec] py-20 md:py-28" aria-labelledby="tomball-comparison-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-10 border-b border-black/15 pb-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div>
              <Eyebrow>Property-Specific Guidance</Eyebrow>
              <h2 id="tomball-comparison-title" className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
                The land and the route belong in the same conversation.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-700 lg:justify-self-end">
              Tomball is not one uniform suburban market. A useful comparison distinguishes the setting first, then evaluates the property, address-level ownership obligations, daily routes, and future buyer alternatives within it.
            </p>
          </div>

          <div className="mt-10 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-4">
            {comparisons.map(({ number, title, copy, icon: Icon }) => (
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

      <section className="bg-white py-20 md:py-28" aria-labelledby="tomball-settings-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="max-w-4xl">
            <Eyebrow>Four Different Briefs</Eyebrow>
            <h2 id="tomball-settings-title" className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
              A Tomball search can begin in very different places.
            </h2>
          </div>
          <div className="mt-14 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2">
            {settingTypes.map(({ label, title, copy, icon: Icon }) => (
              <article key={title} className="bg-[#faf9f6] p-7 md:p-9">
                <div className="flex items-start justify-between gap-5">
                  <Icon className="h-6 w-6 text-[#9b6d1d]" aria-hidden="true" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#875d17]">{label}</span>
                </div>
                <h3 className="mt-9 font-serif text-4xl leading-tight text-black">{title}</h3>
                <p className="mt-5 max-w-2xl leading-7 text-neutral-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111] py-20 text-white md:py-28" aria-labelledby="address-context-title">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-9 lg:grid-cols-[0.76fr_1.24fr]">
          <div>
            <Eyebrow light>Address-Level Context</Eyebrow>
            <h2 id="address-context-title" className="mt-6 max-w-xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-white md:text-7xl">
              Confirm what “Tomball” does not answer.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-300">
              The mailing city is only a starting point. Material legal, utility, tax, survey, inspection, and intended-use questions should be confirmed from the relevant records and qualified professionals.
            </p>
          </div>
          <div className="border-t border-white/70">
            {addressQuestions.map(({ title, copy }, index) => (
              <article key={title} className="grid gap-4 border-b border-white/15 py-7 md:grid-cols-[auto_0.78fr_1.22fr] md:gap-7">
                <span className="font-serif text-2xl text-[#d7b56d]">0{index + 1}</span>
                <h3 className="text-lg font-semibold leading-7 text-white">{title}</h3>
                <p className="leading-7 text-neutral-300">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f2ec] py-20 md:py-28" aria-labelledby="land-diligence-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <Eyebrow>Land and Acreage Diligence</Eyebrow>
              <h2 id="land-diligence-title" className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
                More space changes the inspection brief.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-700 lg:justify-self-end">
              Acreage should be evaluated as a complete property system. The house, land, access, improvements, utilities, restrictions, maintenance, and intended use all belong in the decision.
            </p>
          </div>
          <ol className="mt-14 grid gap-px border border-black/10 bg-black/10 lg:grid-cols-3">
            {landDiligence.map(({ number, title, copy, icon: Icon }) => (
              <li key={number} className="bg-white p-8 md:p-10">
                <div className="flex items-center justify-between gap-5">
                  <Icon className="h-6 w-6 text-[#9b6d1d]" aria-hidden="true" />
                  <span className="font-serif text-3xl text-[#9b6d1d]">{number}</span>
                </div>
                <h3 className="mt-10 font-serif text-3xl leading-tight text-black">{title}</h3>
                <p className="mt-5 leading-7 text-neutral-600">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28" aria-labelledby="route-test-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-10 border-b border-black/15 pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <Eyebrow>Route Test</Eyebrow>
              <h2 id="route-test-title" className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
                Distance is not the daily experience.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-700 lg:justify-self-end">
              The useful route test begins at the property and follows the week. It should account for access, recurring timing, local activity, construction, and the destinations that matter most.
            </p>
          </div>

          <div className="mt-10 border-t border-black">
            {routeContexts.map(({ route, lens, question }, index) => (
              <article key={route} className="grid gap-4 border-b border-black/15 py-7 md:grid-cols-[auto_0.8fr_0.75fr_1.45fr] md:gap-7">
                <span className="font-serif text-2xl text-[#9b6d1d]">0{index + 1}</span>
                <h3 className="text-lg font-semibold leading-7 text-black">{route}</h3>
                <p className="text-sm font-semibold uppercase leading-6 tracking-[0.12em] text-[#875d17]">{lens}</p>
                <p className="leading-7 text-neutral-600">{question}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-20 text-white md:py-28" aria-labelledby="nearby-comparisons-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="max-w-4xl">
            <Eyebrow light>Nearby Alternatives</Eyebrow>
            <h2 id="nearby-comparisons-title" className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-white md:text-7xl">
              Test the brief against another setting.
            </h2>
          </div>
          <div className="mt-14 grid gap-px border border-white/15 bg-white/15 md:grid-cols-2">
            {nearbyComparisons.map(({ name, href, copy }) => (
              <Link key={href} href={href} className="group bg-black p-7 transition hover:bg-[#171717] md:p-9">
                <div className="flex items-start justify-between gap-5">
                  <CarFront className="h-6 w-6 text-[#d7b56d]" aria-hidden="true" />
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
                <h3 className="mt-9 font-serif text-4xl leading-tight text-white">{name}</h3>
                <p className="mt-4 max-w-xl leading-7 text-neutral-400">{copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28" aria-labelledby="seller-position-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow>For Tomball Owners</Eyebrow>
            <h2 id="seller-position-title" className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
              Position the property—not a broad city average.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-700">
              Setting, land, utilities, restrictions, improvements, condition, route, and the buyer's ownership brief can all shape the competitive position of a Tomball property.
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

      <section id="tomball-consultation" className="scroll-mt-20 bg-[#f5f2ec] py-20 md:py-28" aria-labelledby="tomball-consultation-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Private Tomball Brief</Eyebrow>
            <h2 id="tomball-consultation-title" className="mt-6 max-w-xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
              Begin with the setting, land, and route.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">
              Share the preferred property setting, lot or acreage needs, daily destinations, timing, and ownership questions that should shape the comparison.
            </p>
          </div>
          <LeadForm
            leadType="buying"
            showArea
            title="Request a private Tomball brief"
            subtitle="Tell Josh which setting, property requirements, routes, and ownership priorities should guide the search."
            buttonText="Request Tomball Consultation"
          />
        </div>
      </section>

      <section className="bg-white py-20 md:py-28" aria-labelledby="tomball-faq-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <Eyebrow>Questions to Clarify</Eyebrow>
            <h2 id="tomball-faq-title" className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-6xl">
              Before choosing more space.
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
