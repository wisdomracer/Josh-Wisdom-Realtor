import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  Home,
  MapPin,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { Button } from "@/components/ui/button";
import { absoluteUrl, siteConfig } from "@/config/site";

const valuationPhoto = {
  src: "/images/valuation-property-interior.jpg",
  srcSet:
    "/images/valuation-property-interior-960.webp 960w, /images/valuation-property-interior-1600.webp 1600w",
  width: 1920,
  height: 1280,
  alt: "Contemporary open-plan kitchen, dining, and living interior",
  credit: "Christopher Moon",
  sourceUrl:
    "https://www.pexels.com/photo/luxury-modern-kitchen-and-living-room-interior-design-32025967/",
};

type ValueFactor = {
  number: string;
  title: string;
  copy: string;
  icon: LucideIcon;
};

const valueFactors: ValueFactor[] = [
  {
    number: "01",
    title: "Setting",
    copy: "Village, section, lot orientation, privacy, view, nearby roads, schools, amenities, and the alternatives a buyer can choose nearby.",
    icon: MapPin,
  },
  {
    number: "02",
    title: "Property",
    copy: "Architecture, floor plan, condition, updates, maintenance, outdoor space, finish level, and the features that affect buyer confidence.",
    icon: Home,
  },
  {
    number: "03",
    title: "Competition",
    copy: "Relevant closed sales matter, but so do active listings, recent price changes, new inventory, and the homes competing for attention now.",
    icon: BarChart3,
  },
  {
    number: "04",
    title: "Timing",
    copy: "Seller priorities, preparation needs, market tempo, launch window, and the amount of flexibility available all shape the pricing decision.",
    icon: CalendarDays,
  },
];

const reviewSteps = [
  {
    number: "01",
    title: "Understand the property",
    copy: "Begin with the address, material updates, current condition, ownership context, timing, and what you are considering.",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "Build the comparison",
    copy: "Review relevant sales, active competition, buyer alternatives, property-specific differences, and the evidence behind the range.",
    icon: FileSearch,
  },
  {
    number: "03",
    title: "Discuss the position",
    copy: "Separate likely market value from an intentional list-price strategy, then clarify preparation, timing, and the next useful decision.",
    icon: Scale,
  },
];

const reviewIncludes = [
  "Property-specific comparative market context",
  "Relevant recent sales and current competition",
  "Condition, updates, lot, and setting considerations",
  "Preparation priorities that may affect presentation",
  "A pricing range discussed with the supporting evidence",
  "Clear next steps without an instant-estimate sales sequence",
];

const faqs = [
  {
    question: "Is this the same as a formal appraisal?",
    answer:
      "No. A private value review is a real estate broker's comparative market analysis and pricing conversation. It is not a licensed appraisal and should not be presented as one.",
  },
  {
    question: "Do I need to be ready to list immediately?",
    answer:
      "No. The review can help a homeowner understand current positioning, evaluate preparation choices, or plan around a future decision without committing to a launch date.",
  },
  {
    question: "What information makes the review more useful?",
    answer:
      "The property address, major updates, current condition, lot or location details, ownership considerations, and a rough timeline help distinguish the home from broad neighborhood averages.",
  },
  {
    question: "Why might a private review differ from an online estimate?",
    answer:
      "Automated estimates may not fully account for condition, finish level, lot characteristics, micro-location, recent preparation, current competition, or the specific homes a buyer will compare in real time.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Private home value review",
      serviceType: "Residential comparative market analysis and pricing consultation",
      url: absoluteUrl("/home-valuation"),
      provider: {
        "@type": "RealEstateAgent",
        "@id": `${siteConfig.url}/#agent`,
        name: siteConfig.agentName,
        telephone: siteConfig.phoneE164,
        memberOf: {
          "@type": "Organization",
          name: siteConfig.brokerage.name,
        },
      },
      areaServed: [
        "The Woodlands, TX",
        "Tomball, TX",
        "Spring, TX",
        "Magnolia, TX",
        "Conroe, TX",
        "North Houston, TX",
      ],
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

export default function HomeValuation() {
  return (
    <>
      <Helmet>
        <title>Private Home Value Review | The Woodlands Listing Agent</title>
        <meta
          name="description"
          content="Request a private, property-specific home value review from Josh Wisdom Realtor for The Woodlands and North Houston, with current competition and pricing context."
        />
        <link rel="canonical" href={absoluteUrl("/home-valuation")} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="relative min-h-[700px] overflow-hidden bg-[#050505] text-white">
        <div className="absolute inset-0 lg:left-[46%]">
          <picture className="block h-full w-full">
            <source type="image/webp" srcSet={valuationPhoto.srcSet} sizes="(min-width: 1024px) 54vw, 100vw" />
            <img
              src={valuationPhoto.src}
              alt={valuationPhoto.alt}
              width={valuationPhoto.width}
              height={valuationPhoto.height}
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,0.99)_0%,rgba(3,3,3,0.94)_48%,rgba(3,3,3,0.58)_75%,rgba(3,3,3,0.2)_100%)] lg:bg-[linear-gradient(90deg,#050505_0%,#050505_41%,rgba(5,5,5,0.88)_54%,rgba(5,5,5,0.12)_84%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="relative mx-auto flex min-h-[700px] max-w-[1440px] items-center px-5 py-24 md:px-9">
          <div className="max-w-4xl">
            <Eyebrow light>Private Home Value Review</Eyebrow>
            <h1 className="mt-7 max-w-4xl font-serif text-[clamp(3.45rem,6.8vw,7.2rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-white">
              Know the position before choosing the price.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/78 md:text-xl md:leading-9">
              Value is not a single automated number. Josh reviews the property, its setting, recent evidence, current competition, and the decision the owner is preparing to make.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild className="h-14 rounded-none bg-[#d7b56d] px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-white">
                <a href="#valuation-form" data-primary-cta>Request Private Value Review</a>
              </Button>
              <Button asChild variant="outline" className="h-14 rounded-none border-white/60 bg-black/15 px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black">
                <Link href="/sell">View Seller Strategy</Link>
              </Button>
            </div>
          </div>
        </div>
        <a
          href={valuationPhoto.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-5 right-5 z-10 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/65 underline decoration-white/30 underline-offset-4 hover:text-white"
        >
          Editorial interior · {valuationPhoto.credit} / Pexels
        </a>
      </section>

      <section className="bg-[#f5f2ec] py-20 md:py-28" aria-labelledby="value-factors-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-10 border-b border-black/15 pb-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <Eyebrow>Property-Specific Context</Eyebrow>
              <h2 id="value-factors-title" className="mt-6 max-w-2xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
                The details around the number matter.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-700 lg:justify-self-end">
              Two nearby homes can produce different buyer reactions and different pricing strategies. A useful review makes the reasons visible instead of hiding them inside an algorithm.
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-4">
            {valueFactors.map(({ number, title, copy, icon: Icon }) => (
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

      <section className="bg-white py-20 md:py-28" aria-labelledby="number-strategy-title">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-9 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <Eyebrow>Value Range vs. List Price</Eyebrow>
            <h2 id="number-strategy-title" className="mt-6 max-w-2xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
              A number is not a launch strategy.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">
              A likely market range and an intentional asking price answer different questions. One frames the evidence; the other shapes search placement, comparison, urgency, showing activity, and negotiation.
            </p>
            <p className="mt-5 max-w-xl leading-7 text-neutral-600">
              The review should clarify both—without promising a sale price or disguising an estimate as certainty.
            </p>
          </div>

          <div className="border border-black/15 bg-[#111] p-7 text-white shadow-2xl shadow-black/10 md:p-10">
            <div className="grid grid-cols-[0.78fr_1.22fr] gap-5 border-b border-white/15 pb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#d7b56d]">
              <span>Broad Estimate</span>
              <span>Private Value Review</span>
            </div>
            {[
              ["Model-driven output", "Property-specific comparison"],
              ["Historical data emphasis", "Closed evidence plus active competition"],
              ["Limited condition context", "Updates, finish, maintenance, and presentation"],
              ["One displayed number", "A supported range and strategic discussion"],
            ].map(([estimate, review]) => (
              <div key={estimate} className="grid grid-cols-[0.78fr_1.22fr] gap-5 border-b border-white/15 py-6 last:border-b-0">
                <p className="leading-7 text-neutral-400">{estimate}</p>
                <p className="leading-7 text-white">{review}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black py-20 text-white md:py-28" aria-labelledby="review-process-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="max-w-3xl">
            <Eyebrow light>A Considered Review</Eyebrow>
            <h2 id="review-process-title" className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-white md:text-7xl">
              Evidence first. Position second.
            </h2>
          </div>
          <ol className="mt-14 grid gap-px border border-white/15 bg-white/15 lg:grid-cols-3">
            {reviewSteps.map(({ number, title, copy, icon: Icon }) => (
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

      <section id="valuation-form" className="scroll-mt-20 bg-[#f5f2ec] py-20 md:py-28" aria-labelledby="valuation-request-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Private Value Review</Eyebrow>
            <h2 id="valuation-request-title" className="mt-6 max-w-xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">
              Begin with the address and the decision.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">
              Share the property address, rough timing, and any updates or questions that should shape the review. Josh will review the request personally.
            </p>
            <ul className="mt-9 space-y-4 border-t border-black/15 pt-8">
              {reviewIncludes.map((item) => (
                <li key={item} className="flex gap-3 text-neutral-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#9b6d1d]" aria-hidden="true" />
                  <span className="leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <LeadForm
            leadType="valuation"
            showAddress
            title="Request a private value review"
            subtitle="Share the property address and your rough timeline. Josh will review the request personally."
            buttonText="Request Private Valuation"
          />
        </div>
      </section>

      <section className="bg-white py-20 md:py-28" aria-labelledby="valuation-faq-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <Eyebrow>Before You Request</Eyebrow>
            <h2 id="valuation-faq-title" className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-6xl">
              Questions worth clarifying.
            </h2>
            <Button asChild variant="outline" className="mt-9 h-13 rounded-none border-black bg-transparent px-7 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-black hover:text-white">
              <Link href="/sell">Explore Seller Representation <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
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
