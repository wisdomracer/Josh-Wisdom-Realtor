import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Eye, Gem, ShieldCheck } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { Button } from "@/components/ui/button";
import { ResponsiveLocationImage } from "@/components/location-hero";
import { locationPhotos } from "@/config/location-photos";

const architecturePhoto = locationPhotos.woodlands;

const strategy = [
  {
    number: "01",
    title: "Position the value",
    copy: "Architecture, privacy, lot, construction, condition, improvements, setting, and competing alternatives shape the comparison before a price is chosen.",
    icon: Gem,
  },
  {
    number: "02",
    title: "Present the distinction",
    copy: "Media direction, property narrative, preparation, showing standards, and neighborhood context should make the home's strongest reasons clear.",
    icon: Eye,
  },
  {
    number: "03",
    title: "Control the process",
    copy: "Exposure, access, feedback, offer quality, appraisal considerations, exclusions, timing, and privacy are managed as parts of one strategy.",
    icon: ShieldCheck,
  },
];

const communities = [
  {
    name: "Carlton Woods",
    href: "/communities/carlton-woods",
    copy: "Golf, gates, estate lots, custom construction, and property-specific comparisons.",
  },
  {
    name: "East Shore",
    href: "/communities/east-shore",
    copy: "Architecture, walkability, Lake Woodlands, Market Street, and lock-and-leave appeal.",
  },
  {
    name: "Creekside Park",
    href: "/communities/creekside-park",
    copy: "Newer construction, outdoor living, village amenities, and a distinct buyer pool.",
  },
];

const consultationTopics = [
  "The property, improvements, setting, and likely buyer",
  "Your privacy preferences and acceptable showing access",
  "Value range, current competition, and launch timing",
  "Preparation priorities and the assets the home may require",
  "Offer terms, exclusions, appraisal risk, and closing priorities",
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Private luxury real estate representation",
  serviceType: "Luxury seller and buyer representation",
  areaServed: ["The Woodlands, TX", "North Houston, TX"],
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

export default function LuxuryHomes() {
  return (
    <>
      <Helmet>
        <title>The Woodlands Luxury Homes | Josh Wisdom Realtor</title>
        <meta
          name="description"
          content="Private luxury listing and buyer representation for The Woodlands estates, Carlton Woods, East Shore, and distinctive North Houston homes."
        />
        <link
          rel="canonical"
          href="https://joshwisdomrealtor.com/luxury-homes"
        />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="relative min-h-[700px] overflow-hidden bg-[#050505] text-white">
        <div className="absolute inset-0 lg:left-[42%]">
          <ResponsiveLocationImage photo={architecturePhoto} className="h-full w-full object-cover" sizes="(min-width: 1024px) 58vw, 100vw" loading="eager" fetchPriority="high" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,3,3,0.98)_0%,rgba(3,3,3,0.94)_38%,rgba(3,3,3,0.68)_65%,rgba(3,3,3,0.28)_100%)] lg:bg-[linear-gradient(90deg,#050505_0%,#050505_36%,rgba(5,5,5,0.88)_48%,rgba(5,5,5,0.2)_78%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="relative mx-auto flex min-h-[700px] max-w-[1440px] items-center px-5 py-24 md:px-9">
          <div className="max-w-4xl">
            <Eyebrow light>Private Luxury Representation</Eyebrow>
            <h1 className="mt-7 max-w-4xl font-serif text-[clamp(3.3rem,6.7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-white">
              Exceptional homes require disciplined representation.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76 md:text-xl md:leading-9">
              Josh helps owners of distinctive Woodlands and North Houston homes
              align value, preparation, presentation, exposure, and negotiation
              around the property—not a generic luxury script.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                className="h-13 rounded-none bg-[#d7b56d] px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-white"
              >
                <a href="#luxury-consultation" data-primary-cta>
                  Request Private Consultation
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-13 rounded-none border-white/60 bg-black/15 px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black"
              >
                <Link href="/the-woodlands-luxury-homes">
                  Explore Woodlands Luxury
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <p className="absolute bottom-4 right-5 z-10 text-[9px] uppercase tracking-[0.16em] text-white/65 md:right-9">The Woodlands Waterway context · CC BY-SA 4.0</p>
      </section>

      <section className="bg-[#050505] text-white">
        <div className="mx-auto grid max-w-[1440px] gap-px bg-white/12 px-5 py-5 md:grid-cols-3 md:px-9">
          {[
            [
              "Property-specific",
              "Value and presentation begin with this home, not a price-band template.",
            ],
            [
              "Seller-controlled",
              "Timing, access, privacy, and exposure are decisions—not assumptions.",
            ],
            [
              "Terms-aware",
              "Price is weighed alongside certainty, contingencies, timing, and risk.",
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
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <Eyebrow>Luxury Listing Strategy</Eyebrow>
              <h2 className="mt-6 max-w-3xl font-serif text-[clamp(2.8rem,5vw,5.8rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
                The property decides the plan.
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-neutral-700">
              A distinctive residence does not need louder marketing. It needs a
              sharper value argument, deliberate presentation, and a process
              that protects the seller's priorities from preparation through
              closing.
            </p>
          </div>

          <div className="mt-14 grid gap-px bg-black/12 lg:grid-cols-3">
            {strategy.map(({ number, title, copy, icon: Icon }) => (
              <article
                key={title}
                className="group min-h-[390px] bg-white p-8 md:p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-5xl text-[#9b6d1d]">
                    {number}
                  </span>
                  <Icon className="h-6 w-6 text-[#9b6d1d]" aria-hidden="true" />
                </div>
                <h3 className="mt-20 font-serif text-4xl leading-none text-black">
                  {title}
                </h3>
                <p className="mt-6 leading-8 text-neutral-700">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b0a08] py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-9 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <Eyebrow light>Calibrated Exposure</Eyebrow>
            <h2 className="mt-6 max-w-2xl font-serif text-[clamp(2.8rem,4.8vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
              Reach and discretion can coexist.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/70">
              The right exposure plan depends on your timing, privacy needs,
              showing preferences, property, and likely buyer pool. The decision
              is made deliberately before launch.
            </p>
          </div>

          <div className="grid gap-px bg-white/15 md:grid-cols-2">
            <article className="bg-[#13120f] p-8 md:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d7b56d]">
                Market-Facing Launch
              </p>
              <h3 className="mt-6 font-serif text-4xl leading-tight">
                Coordinated visibility.
              </h3>
              <p className="mt-5 leading-8 text-white/68">
                Preparation, media, property copy, launch timing, showing
                access, inquiry handling, and feedback are aligned before the
                home enters the market.
              </p>
            </article>
            <article className="bg-[#13120f] p-8 md:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d7b56d]">
                Privacy-Aware Plan
              </p>
              <h3 className="mt-6 font-serif text-4xl leading-tight">
                Controlled access.
              </h3>
              <p className="mt-5 leading-8 text-white/68">
                When discretion matters, Josh can help evaluate what information
                is shared, how access is handled, and whether a more limited
                approach supports the seller's actual goals.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-black md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="flex flex-col gap-8 border-b border-black/15 pb-10 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Woodlands Luxury Context</Eyebrow>
              <h2 className="mt-5 max-w-3xl font-serif text-[clamp(2.7rem,4.7vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
                Luxury changes by setting.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-neutral-700">
              The buyer, comparison set, and value story shift across golf
              estates, waterfront-adjacent living, walkable neighborhoods, and
              newer village homes.
            </p>
          </div>

          <div className="grid gap-px bg-black/12 md:grid-cols-3">
            {communities.map(({ name, href, copy }) => (
              <Link
                key={name}
                href={href}
                className="group min-h-72 bg-[#f7f3ec] p-8 transition hover:bg-black hover:text-white"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#875d17] transition group-hover:text-[#d7b56d]">
                  Community Guide
                </p>
                <h3 className="mt-12 font-serif text-4xl leading-none">
                  {name}
                </h3>
                <p className="mt-5 leading-7 text-neutral-700 transition group-hover:text-white/70">
                  {copy}
                </p>
                <span className="mt-8 inline-flex items-center text-[10px] font-bold uppercase tracking-[0.24em] text-[#875d17] transition group-hover:text-[#d7b56d]">
                  Explore{" "}
                  <ArrowRight className="ml-3 h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="luxury-consultation"
        className="scroll-mt-20 bg-[#f7f3ec] py-20 text-black md:py-28"
      >
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-9 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Private Consultation</Eyebrow>
            <h2 className="mt-6 max-w-2xl font-serif text-[clamp(2.8rem,4.9vw,5.6rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
              Begin with the property and your priorities.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">
              The first conversation is a focused review of the decision—not a
              commitment to list and not an automated valuation sequence.
            </p>
            <div className="mt-9 space-y-4 border-t border-black/15 pt-7">
              {consultationTopics.map((topic) => (
                <div key={topic} className="flex gap-3">
                  <CheckCircle2
                    className="mt-1 h-5 w-5 shrink-0 text-[#875d17]"
                    aria-hidden="true"
                  />
                  <span className="leading-7 text-neutral-800">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-black/15 bg-white p-3 shadow-2xl shadow-black/10">
            <LeadForm
              leadType="luxury"
              showAddress
              title="Request a private luxury consultation"
              subtitle="Share the property, timing, and priorities you would like Josh to review."
              buttonText="Request Private Consultation"
            />
          </div>
        </div>
      </section>
    </>
  );
}
