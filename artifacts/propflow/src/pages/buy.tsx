import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  ArrowRight,
  Building2,
  Calculator,
  CheckCircle2,
  Compass,
  FileSearch,
  KeyRound,
  MapPinned,
  Scale,
  SearchCheck,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { Button } from "@/components/ui/button";

const buyerPhoto = {
  src: "/images/buyer-brief-interior.jpg",
  srcSet:
    "/images/buyer-brief-interior-960.webp 960w, /images/buyer-brief-interior-1600.webp 1600w",
  width: 1600,
  height: 1068,
  alt: "Spacious contemporary interior with a curved staircase",
  credit: "Max Vakhtbovych",
  sourceUrl:
    "https://www.pexels.com/photo/interior-of-modern-house-with-staircase-5997959/",
};

type BuyerStep = {
  number: string;
  title: string;
  copy: string;
  icon: LucideIcon;
};

const buyerSteps: BuyerStep[] = [
  {
    number: "01",
    title: "Brief",
    copy: "Define the location, daily life, property requirements, ownership priorities, timing, budget, and tradeoffs that should govern the search.",
    icon: Compass,
  },
  {
    number: "02",
    title: "Compare",
    copy: "Evaluate the property, setting, condition, complete ownership cost, and relevant alternatives before urgency narrows the decision.",
    icon: SearchCheck,
  },
  {
    number: "03",
    title: "Investigate",
    copy: "Organize material questions, documents, inspections, restrictions, and specialist review so the decision rests on evidence.",
    icon: FileSearch,
  },
  {
    number: "04",
    title: "Structure",
    copy: "Shape price, financing, appraisal exposure, options, concessions, possession, and timing around the buyer's actual priorities.",
    icon: ShieldCheck,
  },
];

const decisionCards = [
  {
    label: "Address vs. daily life",
    title: "A location should work after the showing ends.",
    copy: "Routes, recurring destinations, neighborhood setting, jurisdiction, amenities, and the rhythm of daily life belong in the comparison.",
    icon: MapPinned,
  },
  {
    label: "Price vs. ownership",
    title: "The list price is not the complete cost.",
    copy: "Taxes, insurance context, fees, utilities, expected work, maintenance, incentives, and financing can change the practical fit.",
    icon: Calculator,
  },
  {
    label: "Desire vs. evidence",
    title: "A compelling home still deserves disciplined review.",
    copy: "Condition, disclosures, restrictions, improvements, market alternatives, and qualified inspections help separate attraction from avoidable risk.",
    icon: Scale,
  },
];

const buyerBrief = [
  { title: "Daily-life brief", copy: "The routes, setting, space, privacy, and recurring destinations the property should support." },
  { title: "Property comparison", copy: "Condition, lot, construction, improvements, layout, utility, and relevant buyer alternatives." },
  { title: "Ownership picture", copy: "Price plus taxes, fees, insurance context, expected work, maintenance, and financing considerations." },
  { title: "Diligence plan", copy: "Documents, inspections, specialist questions, restrictions, and material issues to investigate." },
  { title: "Offer framework", copy: "Price, option period, financing, appraisal, concessions, exclusions, possession, and timing." },
  { title: "Closing roadmap", copy: "Deadlines, lender and title coordination, final review, walkthrough, and possession planning." },
];

const areaGuides = [
  {
    title: "The Woodlands",
    href: "/communities/the-woodlands",
    copy: "Compare villages, setting, amenities, daily routes, property types, and the alternatives behind the address.",
  },
  {
    title: "Tomball",
    href: "/communities/tomball",
    copy: "Understand the choice between established neighborhoods, newer communities, acreage, and regional access.",
  },
  {
    title: "Greater Houston",
    href: "/communities/greater-houston",
    copy: "Widen the comparison when work, family, lifestyle, or property requirements make the larger region relevant.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private buyer representation",
  serviceType: "Residential real estate buyer representation",
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

export default function Buy() {
  return (
    <>
      <Helmet>
        <title>Private Buyer Representation | The Woodlands & North Houston</title>
        <meta
          name="description"
          content="Private buyer representation for The Woodlands and North Houston, with a focused search brief, property comparison, diligence planning, and disciplined offer strategy."
        />
        <link rel="canonical" href="https://joshwisdomrealtor.com/buy" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="relative min-h-[690px] overflow-hidden bg-[#050505] text-white">
        <div className="absolute inset-0 lg:left-[45%]">
          <picture className="block h-full w-full">
            <source
              type="image/webp"
              srcSet={buyerPhoto.srcSet}
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
            <img
              src={buyerPhoto.src}
              alt={buyerPhoto.alt}
              width={buyerPhoto.width}
              height={buyerPhoto.height}
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,0.98)_0%,rgba(3,3,3,0.94)_45%,rgba(3,3,3,0.65)_72%,rgba(3,3,3,0.26)_100%)] lg:bg-[linear-gradient(90deg,#050505_0%,#050505_40%,rgba(5,5,5,0.86)_53%,rgba(5,5,5,0.15)_82%)]" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="relative mx-auto flex min-h-[690px] max-w-[1440px] items-center px-5 py-24 md:px-9">
          <div className="max-w-4xl">
            <Eyebrow light>Private Buyer Representation</Eyebrow>
            <h1 className="mt-7 max-w-4xl font-serif text-[clamp(3.4rem,6.8vw,7.1rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-white">
              Buy with a clear brief, not more noise.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76 md:text-xl md:leading-9">
              Josh helps buyers define the right search, compare the complete
              property decision, investigate material questions, and structure
              an offer around the terms that matter.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                className="h-13 rounded-none bg-[#d7b56d] px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-white"
              >
                <a href="#buyer-consultation" data-primary-cta>
                  Request Private Buyer Brief
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

        <a
          href={buyerPhoto.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-5 z-10 text-[9px] text-white/65 underline-offset-2 hover:text-white hover:underline md:right-9"
        >
          Editorial interior: {buyerPhoto.credit} / Pexels
        </a>
      </section>

      <section className="bg-[#050505] text-white">
        <div className="mx-auto grid max-w-[1440px] gap-px bg-white/12 px-5 py-5 md:grid-cols-3 md:px-9">
          {[
            ["Brief before search", "Define the real decision before opening more tabs."],
            ["Context before urgency", "Compare the property and its alternatives before competing."],
            ["Terms before signature", "Know the offer priorities and acceptable exposure in advance."],
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
              <Eyebrow>The Buyer Plan</Eyebrow>
              <h2 className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] md:text-7xl">
                Representation begins before the first showing.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-700 lg:justify-self-end">
              A useful search is selective by design. Each step should narrow
              uncertainty, clarify the tradeoff, and prepare the buyer to act
              without allowing urgency to replace judgment.
            </p>
          </div>

          <div className="mt-12 grid gap-px bg-black/15 md:grid-cols-2 xl:grid-cols-4">
            {buyerSteps.map((step) => {
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
          <Eyebrow light>The Decision Lens</Eyebrow>
          <h2 className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] md:text-7xl">
            Compare what will still matter after closing.
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
            <Eyebrow>Before The Offer</Eyebrow>
            <h2 className="mt-6 max-w-xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] md:text-7xl">
              Build a decision brief, not a favorites list.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-8 text-neutral-700">
              The brief gives each property the same disciplined review and
              makes the eventual tradeoff visible before a contract creates
              deadlines.
            </p>
            <Button
              asChild
              className="mt-8 h-12 rounded-none bg-black px-7 text-[10px] font-bold uppercase tracking-[0.22em] text-white hover:bg-[#9b6d1d]"
            >
              <a href="#buyer-consultation">Start A Private Brief</a>
            </Button>
          </div>

          <div className="grid gap-px bg-black/12 sm:grid-cols-2">
            {buyerBrief.map((item, index) => (
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
                Choose the area around the life it should support.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-700 lg:justify-self-end">
              Start with practical comparisons of setting, routes, property
              types, and ownership questions before allowing a familiar city
              name to define the search.
            </p>
          </div>

          <div className="mt-12 grid gap-px bg-black/12 lg:grid-cols-3">
            {areaGuides.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="group flex min-h-72 flex-col bg-white p-7 transition-colors hover:bg-[#0a0a09] hover:text-white md:p-9"
              >
                <Building2 className="h-5 w-5 text-[#9b6d1d]" aria-hidden="true" />
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

      <section id="buyer-consultation" className="scroll-mt-24 bg-white py-20 text-black md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <Eyebrow>Private Buyer Consultation</Eyebrow>
            <h2 className="mt-6 max-w-2xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] md:text-7xl">
              Begin with the decision the property must solve.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">
              Share the areas, timing, property type, daily priorities, and
              tradeoffs already in view. Josh will review the request personally
              and follow up directly.
            </p>
            <div className="mt-10 border-t border-black/15 pt-6">
              <div className="flex gap-4">
                <KeyRound className="mt-1 h-5 w-5 shrink-0 text-[#9b6d1d]" aria-hidden="true" />
                <div>
                  <h3 className="font-serif text-2xl">No generic property blast.</h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-neutral-600">
                    Begin with the brief, then narrow the search around the
                    relevant property and area tradeoffs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-black/15 bg-[#f7f3ec] p-2 shadow-[0_20px_55px_rgba(0,0,0,0.10)]">
            <LeadForm
              leadType="buying"
              showArea
              title="Request a private buyer brief"
              subtitle="Share the areas, timing, property needs, and priorities Josh should review."
              buttonText="Request Buyer Consultation"
            />
          </div>
        </div>
      </section>
    </>
  );
}
