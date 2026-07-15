import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  ArrowRight,
  BarChart3,
  Camera,
  CheckCircle2,
  FileSearch,
  KeyRound,
  Megaphone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { Button } from "@/components/ui/button";

const presentationPhoto = {
  src: "/images/seller-presentation-interior.jpg",
  srcSet:
    "/images/seller-presentation-interior-960.webp 960w, /images/seller-presentation-interior-1600.webp 1600w",
  width: 1600,
  height: 1067,
  alt: "Prepared contemporary living and dining space",
  credit: "Thiha Soe",
  sourceUrl:
    "https://www.pexels.com/photo/elegant-living-room-interior-5883721/",
};

type Step = {
  number: string;
  title: string;
  copy: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Position",
    copy: "Review recent sales, active competition, condition, lot, village-level demand, likely buyer, and the details automated estimates miss.",
    icon: BarChart3,
  },
  {
    number: "02",
    title: "Prepare",
    copy: "Separate the presentation work that may reduce objections from projects that add cost, delay, or complexity without enough strategic benefit.",
    icon: Camera,
  },
  {
    number: "03",
    title: "Launch",
    copy: "Coordinate media direction, property narrative, showing access, buyer-facing context, timing, and inquiry handling before the listing goes live.",
    icon: Megaphone,
  },
  {
    number: "04",
    title: "Negotiate",
    copy: "Compare price with financing strength, contingencies, appraisal exposure, concessions, timing, exclusions, certainty, and likely net outcome.",
    icon: ShieldCheck,
  },
];

const decisionCards = [
  {
    label: "Price vs. position",
    title: "The highest starting number is not always the strongest strategy.",
    copy: "List price shapes search placement, comparison, urgency, showing activity, and the leverage available when a qualified offer arrives.",
  },
  {
    label: "Preparation vs. delay",
    title: "Not every improvement deserves the time or expense.",
    copy: "The goal is to make the home easier to understand and trust while protecting the seller from avoidable work that may not improve the outcome.",
  },
  {
    label: "Offer vs. outcome",
    title: "Price is only one part of an offer.",
    copy: "Financing, appraisal language, option and closing periods, concessions, exclusions, sale contingencies, and possession can materially change risk and net.",
  },
];

const sellerBrief = [
  "Property-specific comparative review",
  "Current competition and buyer alternatives",
  "Preparation and presentation priorities",
  "Launch timing and media direction",
  "Showing access and feedback process",
  "Offer-comparison and negotiation framework",
];

const sellerArticles = [
  {
    title: "How to price a home in The Woodlands",
    href: "/blog/how-to-price-a-home-in-the-woodlands",
    copy: "Village, condition, active competition, timing, and buyer choice all shape the opening position.",
  },
  {
    title: "Selling near The Woodlands Waterway",
    href: "/blog/selling-near-the-woodlands-waterway",
    copy: "Lifestyle and setting should be translated into a clear buyer-facing value story.",
  },
  {
    title: "Creekside Park seller checklist",
    href: "/blog/creekside-park-seller-checklist",
    copy: "A controlled launch begins by resolving small objections and aligning every listing asset.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private seller representation",
  serviceType: "Residential real estate listing and seller representation",
  areaServed: [
    "The Woodlands, TX",
    "Tomball, TX",
    "Spring, TX",
    "Magnolia, TX",
    "North Houston, TX",
  ],
  provider: {
    "@type": "RealEstateAgent",
    "@id": "https://joshwisdomrealtor.com/#agent",
    name: "Josh Wisdom Realtor",
    url: "https://joshwisdomrealtor.com/",
  },
};

function Eyebrow({
  children,
  light = false,
}: {
  children: string;
  light?: boolean;
}) {
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

export default function Sell() {
  return (
    <>
      <Helmet>
        <title>Selling A Home In The Woodlands | Josh Wisdom Realtor</title>
        <meta
          name="description"
          content="Private seller representation for The Woodlands and North Houston, with property-specific pricing, preparation, launch strategy, and disciplined offer negotiation."
        />
        <link rel="canonical" href="https://joshwisdomrealtor.com/sell" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="relative min-h-[690px] overflow-hidden bg-[#050505] text-white">
        <div className="absolute inset-0 lg:left-[45%]">
          <picture className="block h-full w-full">
            <source
              type="image/webp"
              srcSet={presentationPhoto.srcSet}
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <img
              src={presentationPhoto.src}
              alt={presentationPhoto.alt}
              width={presentationPhoto.width}
              height={presentationPhoto.height}
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,0.98)_0%,rgba(3,3,3,0.94)_45%,rgba(3,3,3,0.64)_72%,rgba(3,3,3,0.3)_100%)] lg:bg-[linear-gradient(90deg,#050505_0%,#050505_40%,rgba(5,5,5,0.86)_53%,rgba(5,5,5,0.16)_82%)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="relative mx-auto flex min-h-[690px] max-w-[1440px] items-center px-5 py-24 md:px-9">
          <div className="max-w-4xl">
            <Eyebrow light>Private Seller Representation</Eyebrow>
            <h1 className="mt-7 max-w-4xl font-serif text-[clamp(3.4rem,6.8vw,7.1rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-white">
              Selling should begin before the listing goes live.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76 md:text-xl md:leading-9">
              Josh helps The Woodlands and North Houston homeowners establish
              value, make deliberate preparation decisions, control the launch,
              and compare the whole offer—not only the headline price.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                className="h-13 rounded-none bg-[#d7b56d] px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-white"
              >
                <a href="#seller-consultation" data-primary-cta>
                  Request Seller Consultation
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-13 rounded-none border-white/60 bg-black/15 px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black"
              >
                <Link href="/home-valuation" data-primary-cta>
                  Request Private Valuation
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <a
          href={presentationPhoto.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-5 z-10 text-[9px] text-white/65 underline-offset-2 hover:text-white hover:underline md:right-9"
        >
          Editorial interior: {presentationPhoto.credit} / Pexels
        </a>
      </section>

      <section className="bg-[#050505] text-white">
        <div className="mx-auto grid max-w-[1440px] gap-px bg-white/12 px-5 py-5 md:grid-cols-3 md:px-9">
          {[
            [
              "Position first",
              "Understand value and competition before choosing the public number.",
            ],
            [
              "Prepare selectively",
              "Direct time and money toward the objections most likely to matter.",
            ],
            [
              "Define leverage",
              "Set priorities for price, terms, timing, certainty, and acceptable risk.",
            ],
          ].map(([title, copy]) => (
            <article key={title} className="bg-[#050505] px-6 py-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#d7b56d]">
                {title}
              </p>
              <p className="mt-4 leading-7 text-white/70">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f7f3ec] py-20 text-black md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <Eyebrow>The Listing Plan</Eyebrow>
              <h2 className="mt-6 max-w-3xl font-serif text-[clamp(2.8rem,5vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
                The first two weeks are shaped before day one.
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-neutral-700">
              Buyer perception starts with the initial position, photography,
              property story, showing experience, and competing choices. Those
              decisions should be aligned before the market begins reacting.
            </p>
          </div>

          <div className="mt-14 grid gap-px bg-black/12 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ number, title, copy, icon: Icon }) => (
              <article key={title} className="min-h-[390px] bg-white p-8">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-5xl text-[#9b6d1d]">
                    {number}
                  </span>
                  <Icon className="h-6 w-6 text-[#9b6d1d]" aria-hidden="true" />
                </div>
                <h3 className="mt-20 font-serif text-4xl leading-none">
                  {title}
                </h3>
                <p className="mt-6 leading-8 text-neutral-700">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b0a08] py-20 text-white md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="max-w-4xl">
            <Eyebrow light>Seller Decisions</Eyebrow>
            <h2 className="mt-6 font-serif text-[clamp(2.8rem,5vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
              Where leverage is won or lost.
            </h2>
          </div>

          <div className="mt-14 grid gap-px bg-white/15 lg:grid-cols-3">
            {decisionCards.map(({ label, title, copy }) => (
              <article
                key={label}
                className="min-h-[390px] bg-[#13120f] p-8 md:p-10"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d7b56d]">
                  {label}
                </p>
                <h3 className="mt-12 font-serif text-4xl leading-tight">
                  {title}
                </h3>
                <p className="mt-6 leading-8 text-white/68">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-black md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Before The Market</Eyebrow>
            <h2 className="mt-6 max-w-2xl font-serif text-[clamp(2.8rem,4.9vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
              Start with a seller brief, not a sales pitch.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">
              The purpose of the initial review is to organize the property,
              market position, preparation choices, and seller priorities before
              a listing decision is made.
            </p>
            <Button
              asChild
              className="mt-9 h-13 rounded-none bg-black px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-[#875d17]"
            >
              <a href="#seller-consultation" data-primary-cta>
                Start A Private Review
              </a>
            </Button>
          </div>

          <div className="grid gap-px bg-black/12 sm:grid-cols-2">
            {sellerBrief.map((item, index) => (
              <article key={item} className="min-h-44 bg-[#f7f3ec] p-7">
                <div className="flex items-start justify-between gap-4">
                  <CheckCircle2
                    className="h-5 w-5 shrink-0 text-[#875d17]"
                    aria-hidden="true"
                  />
                  <span className="font-serif text-3xl text-black/50">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-8 font-serif text-3xl leading-tight">
                  {item}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3ec] py-20 text-black md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-10 border-b border-black/15 pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <Eyebrow>Seller Intelligence</Eyebrow>
              <h2 className="mt-5 font-serif text-[clamp(2.7rem,4.8vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
                Make the next decision with context.
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-neutral-700">
              Practical guidance for Woodlands homeowners considering pricing,
              presentation, timing, and buyer perception before they enter the
              market.
            </p>
          </div>

          <div className="grid gap-px bg-black/12 md:grid-cols-3">
            {sellerArticles.map(({ title, href, copy }) => (
              <Link
                key={href}
                href={href}
                className="group min-h-72 bg-white p-8 transition hover:bg-black hover:text-white"
              >
                <FileSearch
                  className="h-6 w-6 text-[#875d17] transition group-hover:text-[#d7b56d]"
                  aria-hidden="true"
                />
                <h3 className="mt-12 font-serif text-3xl leading-tight">
                  {title}
                </h3>
                <p className="mt-5 leading-7 text-neutral-700 transition group-hover:text-white/70">
                  {copy}
                </p>
                <span className="mt-8 inline-flex items-center text-[10px] font-bold uppercase tracking-[0.24em] text-[#875d17] transition group-hover:text-[#d7b56d]">
                  Read Guide{" "}
                  <ArrowRight className="ml-3 h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="seller-consultation"
        className="scroll-mt-20 bg-white py-20 text-black md:py-28"
      >
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-9 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Private Seller Consultation</Eyebrow>
            <h2 className="mt-6 max-w-2xl font-serif text-[clamp(2.8rem,4.9vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
              Discuss the property before deciding the next move.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">
              Share the address, timing, and decision you are considering. Josh
              will review the request personally and follow up directly—without
              an automated valuation blast.
            </p>
            <div className="mt-9 border-t border-black/15 pt-7">
              <div className="flex gap-4">
                <KeyRound
                  className="mt-1 h-6 w-6 shrink-0 text-[#875d17]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-serif text-3xl">
                    No listing commitment required.
                  </h3>
                  <p className="mt-3 leading-7 text-neutral-700">
                    Begin with facts, tradeoffs, and a clearer picture of the
                    available options.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-black/15 bg-[#f7f3ec] p-3 shadow-2xl shadow-black/10">
            <LeadForm
              leadType="selling"
              showAddress
              title="Request a private seller consultation"
              subtitle="Share the property, rough timing, and the decision you would like Josh to review."
              buttonText="Request Seller Consultation"
            />
          </div>
        </div>
      </section>
    </>
  );
}
