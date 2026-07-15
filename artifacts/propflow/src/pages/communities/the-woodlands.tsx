import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  CarFront,
  CircleDollarSign,
  Compass,
  FileSearch,
  Home,
  MapPin,
  Route,
  Scale,
  ShieldCheck,
  Trees,
  type LucideIcon,
} from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { CommunityHero } from "@/components/location-hero";
import { Button } from "@/components/ui/button";
import { absoluteUrl, siteConfig } from "@/config/site";
import { locationPhotos } from "@/config/location-photos";

type DecisionPoint = {
  number: string;
  title: string;
  copy: string;
  icon: LucideIcon;
};

const decisionPoints: DecisionPoint[] = [
  {
    number: "01",
    title: "Village and section",
    copy: "Street character, access, lot pattern, nearby amenities, property age, and competing inventory can change meaningfully from one section to another.",
    icon: MapPin,
  },
  {
    number: "02",
    title: "Property position",
    copy: "Compare floor plan, renovation level, lot placement, privacy, maintenance exposure, and the alternatives a future buyer is likely to consider.",
    icon: Home,
  },
  {
    number: "03",
    title: "Daily pattern",
    copy: "Test work travel, school routes, airport access, medical care, recreation, dining, and the recurring trips that shape an ordinary week.",
    icon: Route,
  },
  {
    number: "04",
    title: "Ownership picture",
    copy: "Review taxes, applicable associations or community fees, insurance context, utilities, expected work, and ongoing care at the address level.",
    icon: CircleDollarSign,
  },
];

const villageReferences = [
  "Alden Bridge",
  "Cochran's Crossing",
  "College Park",
  "Creekside Park",
  "Grogan's Mill",
  "Indian Springs",
  "Panther Creek",
  "Sterling Ridge",
];

const distinctiveSettings = [
  {
    name: "Carlton Woods",
    label: "Private golf and estate setting",
    copy: "Gated estate property, golf-oriented context, lot position, architecture, condition, and a narrower luxury comparison set.",
    href: "/communities/carlton-woods",
    icon: ShieldCheck,
  },
  {
    name: "East Shore",
    label: "Lake and Town Center adjacency",
    copy: "A close-in setting where lake orientation, walkability, architecture, lock-and-leave considerations, and urban access shape the brief.",
    href: "/communities/east-shore",
    icon: Building2,
  },
  {
    name: "Creekside Park",
    label: "Newer village context",
    copy: "Newer housing, parks, trails, village amenities, Harris County context, and address-specific school and tax questions.",
    href: "/communities/creekside-park",
    icon: Trees,
  },
  {
    name: "Town Center",
    label: "Urban core—not a village link",
    copy: "Waterway, Market Street, Hughes Landing, offices, residences, entertainment, and close-in access create a different ownership and daily-life brief.",
    icon: Compass,
  },
];

const weeklyContexts = [
  {
    title: "Village-centered living",
    copy: "Test the trips from the specific section to groceries, parks, schools, services, and the destinations used most often.",
    icon: Trees,
  },
  {
    title: "Town Center and Waterway",
    copy: "Compare proximity to dining, retail, events, offices, and urban-style residences with traffic, access, and property-type tradeoffs.",
    icon: Building2,
  },
  {
    title: "Hughes Landing and Lake Woodlands",
    copy: "Consider the relationship among waterfront activity, offices, restaurants, residences, and routes into the surrounding villages.",
    icon: MapPin,
  },
  {
    title: "Regional routes",
    copy: "Drive the actual work, airport, medical, family, and recreation routes at the times that will matter after the move.",
    icon: CarFront,
  },
];

const diligenceQuestions = [
  {
    title: "Jurisdiction and schools",
    copy: "Confirm county, school district, attendance boundaries, tax entities, and municipal or township context for the exact address rather than relying on a Woodlands mailing label.",
  },
  {
    title: "Restrictions and fees",
    copy: "Review applicable deed restrictions, association obligations, community fees, architectural controls, and property-specific rules before committing.",
  },
  {
    title: "Lot and water context",
    copy: "Evaluate drainage, flood information, nearby water or green space, lot grade, trees, easements, and insurance questions with the appropriate professionals and records.",
  },
  {
    title: "Condition and complete cost",
    copy: "Separate visible finish from roof, systems, structure, maintenance, future work, taxes, insurance context, utilities, and financing considerations.",
  },
];

const visitSteps = [
  {
    number: "01",
    title: "Establish the week",
    copy: "Map recurring destinations and the acceptable route, privacy, lot, age, condition, and ownership tradeoffs.",
    icon: CalendarDays,
  },
  {
    number: "02",
    title: "Compare unlike options",
    copy: "Use the visit to compare village, urban, newer, established, estate, and close-in settings before narrowing the property list.",
    icon: Scale,
  },
  {
    number: "03",
    title: "Diligence the address",
    copy: "Once a property leads, confirm jurisdiction, restrictions, costs, condition, records, and the questions that require specialist review.",
    icon: FileSearch,
  },
];

const faqs = [
  {
    question: "Is The Woodlands one uniform real estate market?",
    answer:
      "No. Village, section, property type, age, condition, lot position, privacy, daily access, and the competing alternatives can produce materially different buying and selling contexts.",
  },
  {
    question: "Which Woodlands village is best?",
    answer:
      "There is no universal best village. The useful answer depends on the weekly routes, property brief, budget, ownership priorities, timing, and tradeoffs the household can accept.",
  },
  {
    question: "Is Town Center a residential village?",
    answer:
      "Town Center is the community's urban core rather than one of the residential village references listed on this page. It includes Waterway, Market Street, Hughes Landing, offices, entertainment, and urban-style residential options.",
  },
  {
    question: "Why verify schools, taxes, and restrictions by address?",
    answer:
      "A Woodlands mailing address alone does not establish every jurisdiction, attendance boundary, tax entity, fee, restriction, or utility detail. Those items should be confirmed for the specific property during diligence.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "The Woodlands Community and Real Estate Guide",
      url: absoluteUrl("/communities/the-woodlands"),
      description:
        "A village-level decision guide to The Woodlands real estate, property settings, daily routes, ownership context, and private area consultation.",
      about: {
        "@type": "Place",
        name: "The Woodlands, Texas",
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

export default function TheWoodlands() {
  return (
    <>
      <Helmet>
        <title>The Woodlands Real Estate & Community Guide | Josh Wisdom</title>
        <meta
          name="description"
          content="Compare The Woodlands villages, distinctive settings, daily routes, property types, and address-level ownership considerations with Josh Wisdom Realtor."
        />
        <link rel="canonical" href={absoluteUrl("/communities/the-woodlands")} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <CommunityHero
        eyebrow="Private Community Advisory"
        title="The Woodlands"
        description="Village-level guidance for a market where the setting, section, lot, property, and weekly routes can matter as much as the mailing address."
        photo={locationPhotos.woodlands}
      />

      <section className="bg-[#f5f2ec] py-20 md:py-28" aria-labelledby="precise-search-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-10 border-b border-black/15 pb-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div>
              <Eyebrow>A More Precise Search</Eyebrow>
              <h2 id="precise-search-title" className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
                The Woodlands is a collection of distinct property decisions.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-700 lg:justify-self-end">
              The useful comparison is not a village name in isolation. It is the complete fit: the home, immediate setting, recurring routes, ownership picture, work it may need, and the alternatives a future buyer will compare with it.
            </p>
          </div>

          <div className="mt-10 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-4">
            {decisionPoints.map(({ number, title, copy, icon: Icon }) => (
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

      <section className="bg-white py-20 md:py-28" aria-labelledby="village-reference-title">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-9 lg:grid-cols-[0.84fr_1.16fr]">
          <div>
            <Eyebrow>Residential Village Reference</Eyebrow>
            <h2 id="village-reference-title" className="mt-6 max-w-xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
              Begin broad. Compare by section.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">
              These village references help organize the first pass. They are intentionally plain labels unless a dedicated, substantive guide exists—no empty links.
            </p>
          </div>
          <div className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">
            {villageReferences.map((village, index) => (
              village === "Creekside Park" ? (
                <Link key={village} href="/communities/creekside-park" className="group flex items-center justify-between gap-5 bg-[#f8f6f1] px-6 py-5 transition hover:bg-black hover:text-white">
                  <span className="flex items-center gap-4"><Trees className="h-5 w-5 shrink-0 text-[#9b6d1d]" aria-hidden="true" /><span className="font-medium">{village}</span></span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              ) : (
                <div key={village} className="flex items-center justify-between gap-5 bg-[#f8f6f1] px-6 py-5">
                  <span className="flex items-center gap-4"><Trees className="h-5 w-5 shrink-0 text-[#9b6d1d]" aria-hidden="true" /><span className="font-medium text-black">{village}</span></span>
                  <span className="font-serif text-lg text-[#875d17]">{String(index + 1).padStart(2, "0")}</span>
                </div>
              )
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111] py-20 text-white md:py-28" aria-labelledby="distinctive-settings-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <Eyebrow light>Distinctive Settings</Eyebrow>
              <h2 id="distinctive-settings-title" className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-white md:text-7xl">
                Some briefs sit outside a simple village comparison.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-300 lg:justify-self-end">
              Estate, lake-adjacent, urban-core, and newer-village options should be compared by their actual ownership experience—not treated as interchangeable Woodlands inventory.
            </p>
          </div>

          <div className="mt-12 grid gap-px border border-white/15 bg-white/15 md:grid-cols-2">
            {distinctiveSettings.map(({ name, label, copy, href, icon: Icon }) => {
              const content = (
                <>
                  <div className="flex items-start justify-between gap-5">
                    <Icon className="h-6 w-6 text-[#d7b56d]" aria-hidden="true" />
                    {href ? <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" /> : <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-400">Reference only</span>}
                  </div>
                  <p className="mt-9 text-[10px] font-bold uppercase tracking-[0.26em] text-[#d7b56d]">{label}</p>
                  <h3 className="mt-3 font-serif text-4xl leading-tight text-white">{name}</h3>
                  <p className="mt-4 max-w-xl leading-7 text-neutral-400">{copy}</p>
                </>
              );
              return href ? (
                <Link key={name} href={href} className="group bg-black p-7 transition hover:bg-[#171717] md:p-9">{content}</Link>
              ) : (
                <article key={name} className="bg-black p-7 md:p-9">{content}</article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f2ec] py-20 md:py-28" aria-labelledby="weekly-context-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="max-w-4xl">
            <Eyebrow>Daily-Life Context</Eyebrow>
            <h2 id="weekly-context-title" className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
              Test the ordinary week—not only the showing route.
            </h2>
          </div>
          <div className="mt-14 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-4">
            {weeklyContexts.map(({ title, copy, icon: Icon }) => (
              <article key={title} className="bg-white p-7 md:p-8">
                <Icon className="h-6 w-6 text-[#9b6d1d]" aria-hidden="true" />
                <h3 className="mt-9 font-serif text-3xl leading-tight text-black">{title}</h3>
                <p className="mt-4 leading-7 text-neutral-600">{copy}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild variant="outline" className="h-13 rounded-none border-black bg-transparent px-7 text-[11px] font-bold uppercase tracking-[0.2em] text-black hover:bg-black hover:text-white">
              <Link href="/the-woodlands-events">Review Woodlands Events</Link>
            </Button>
            <Button asChild variant="outline" className="h-13 rounded-none border-black bg-transparent px-7 text-[11px] font-bold uppercase tracking-[0.2em] text-black hover:bg-black hover:text-white">
              <Link href="/relocation">Build a Relocation Brief</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28" aria-labelledby="diligence-title">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-9 lg:grid-cols-[0.76fr_1.24fr]">
          <div>
            <Eyebrow>Address-Level Diligence</Eyebrow>
            <h2 id="diligence-title" className="mt-6 max-w-xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
              Confirm what the mailing address does not tell you.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">
              The right professionals and records should answer material legal, tax, insurance, inspection, school-boundary, and property-condition questions. The search process should make those questions visible early.
            </p>
          </div>
          <div className="border-t border-black">
            {diligenceQuestions.map(({ title, copy }, index) => (
              <article key={title} className="grid gap-4 border-b border-black/15 py-7 md:grid-cols-[auto_0.75fr_1.25fr] md:gap-7">
                <span className="font-serif text-2xl text-[#9b6d1d]">0{index + 1}</span>
                <h3 className="text-lg font-semibold leading-7 text-black">{title}</h3>
                <p className="leading-7 text-neutral-600">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-20 text-white md:py-28" aria-labelledby="decision-visit-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="max-w-4xl">
            <Eyebrow light>Decision Visit</Eyebrow>
            <h2 id="decision-visit-title" className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-white md:text-7xl">
              Make the visit answer useful questions.
            </h2>
          </div>
          <ol className="mt-14 grid gap-px border border-white/15 bg-white/15 lg:grid-cols-3">
            {visitSteps.map(({ number, title, copy, icon: Icon }) => (
              <li key={number} className="bg-black p-8 md:p-10">
                <div className="flex items-center justify-between gap-5">
                  <Icon className="h-6 w-6 text-[#d7b56d]" aria-hidden="true" />
                  <span className="font-serif text-3xl text-[#d7b56d]">{number}</span>
                </div>
                <h3 className="mt-10 font-serif text-3xl leading-tight text-white">{title}</h3>
                <p className="mt-5 leading-7 text-neutral-400">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="area-consultation" className="scroll-mt-20 bg-[#f5f2ec] py-20 md:py-28" aria-labelledby="area-consultation-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Private Area Brief</Eyebrow>
            <h2 id="area-consultation-title" className="mt-6 max-w-xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
              Begin with the week the property must support.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">
              Share the property type, timing, daily destinations, privacy and lot priorities, and tradeoffs that should shape a focused Woodlands comparison.
            </p>
            <div className="mt-9 grid gap-3 sm:grid-cols-2">
              <Button asChild variant="outline" className="h-13 rounded-none border-black bg-transparent px-6 text-[10px] font-bold uppercase tracking-[0.18em] text-black hover:bg-black hover:text-white">
                <Link href="/buy">View Buyer Advisory</Link>
              </Button>
              <Button asChild variant="outline" className="h-13 rounded-none border-black bg-transparent px-6 text-[10px] font-bold uppercase tracking-[0.18em] text-black hover:bg-black hover:text-white">
                <Link href="/the-woodlands-listing-agent">View Seller Advisory</Link>
              </Button>
            </div>
          </div>
          <LeadForm
            leadType="buying"
            showArea
            title="Request a private Woodlands brief"
            subtitle="Tell Josh which property settings, routes, and ownership priorities should guide the comparison."
            buttonText="Request Area Consultation"
          />
        </div>
      </section>

      <section className="bg-white py-20 md:py-28" aria-labelledby="woodlands-faq-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <Eyebrow>Questions to Clarify</Eyebrow>
            <h2 id="woodlands-faq-title" className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-6xl">
              Before narrowing the map.
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
