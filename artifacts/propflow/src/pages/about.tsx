import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Compass,
  MapPin,
  MessageSquareText,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhotoCredit, ResponsiveLocationImage } from "@/components/location-hero";
import { locationPhotos } from "@/config/location-photos";
import { emailHref, phoneHref, siteConfig } from "@/config/site";

type Principle = {
  number: string;
  title: string;
  copy: string;
  icon: LucideIcon;
};

const principles: Principle[] = [
  {
    number: "01",
    title: "Property-specific judgment",
    copy: "Advice should reflect the property, competing alternatives, likely buyer or ownership brief, and the decision in front of you—not a generic script.",
    icon: Scale,
  },
  {
    number: "02",
    title: "Local context",
    copy: "The Woodlands, Tomball, Magnolia, Spring, Conroe, and North Houston require more precise comparison than a broad city or ZIP-code average.",
    icon: MapPin,
  },
  {
    number: "03",
    title: "Disciplined representation",
    copy: "Clear communication, thoughtful preparation, material questions, and careful negotiation matter from the first conversation through closing.",
    icon: ShieldCheck,
  },
];

const workingStyle = [
  {
    title: "Begin with the decision",
    copy: "Start with the property, timing, priorities, and outcome before recommending a route forward.",
    icon: Compass,
  },
  {
    title: "Make the tradeoff visible",
    copy: "Organize price, condition, setting, complete cost, timing, and risk so the client can compare the real decision.",
    icon: Scale,
  },
  {
    title: "Use the right expertise",
    copy: "Surface material questions and involve the appropriate inspectors, attorneys, lenders, tax professionals, or other specialists when the issue requires them.",
    icon: BadgeCheck,
  },
  {
    title: "Communicate around action",
    copy: "Keep the next decision, relevant deadline, outstanding question, and practical consequence clear as the transaction moves.",
    icon: MessageSquareText,
  },
];

const servicePaths = [
  {
    eyebrow: "For Sellers",
    title: "Private seller representation",
    href: "/sell",
    copy: "Pricing, preparation, launch strategy, offer comparison, and negotiation organized before the listing goes live.",
  },
  {
    eyebrow: "For Buyers",
    title: "Private buyer representation",
    href: "/buy",
    copy: "A focused search brief, property comparison, diligence plan, and offer structure built around the complete decision.",
  },
  {
    eyebrow: "Distinctive Property",
    title: "Luxury representation",
    href: "/luxury-homes",
    copy: "Measured positioning, controlled presentation, privacy considerations, and property-specific value context.",
  },
  {
    eyebrow: "Moving To Houston",
    title: "Private relocation advisory",
    href: "/relocation",
    copy: "Daily routes, area comparisons, remote previews, ownership context, and a visit designed to answer useful questions.",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${siteConfig.url}/#agent`,
  name: siteConfig.agentName,
  url: `${siteConfig.url}/about`,
  telephone: siteConfig.phoneE164,
  email: siteConfig.email,
  description: "Private real estate advisory for The Woodlands and North Houston buyers and sellers.",
  areaServed: [
    "The Woodlands, TX",
    "Tomball, TX",
    "Spring, TX",
    "Magnolia, TX",
    "Conroe, TX",
    "North Houston, TX",
  ],
  memberOf: {
    "@type": "Organization",
    name: siteConfig.brokerage.name,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.brokerage.streetAddress,
    addressLocality: siteConfig.brokerage.locality,
    addressRegion: siteConfig.brokerage.region,
    postalCode: siteConfig.brokerage.postalCode,
    addressCountry: "US",
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

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Josh Wisdom | Private Real Estate Advisory</title>
        <meta
          name="description"
          content="Meet Josh Wisdom, a VIP Realty real estate professional providing private seller, buyer, luxury, and relocation guidance across The Woodlands and North Houston."
        />
        <link rel="canonical" href="https://joshwisdomrealtor.com/about" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="relative overflow-hidden bg-[#050505] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:76px_76px]" />
        <div className="relative mx-auto grid min-h-[700px] max-w-[1440px] gap-14 px-5 py-24 md:px-9 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:py-28">
          <div className="max-w-5xl">
            <Eyebrow light>Private Representation</Eyebrow>
            <h1 className="mt-7 max-w-5xl font-serif text-[clamp(3.5rem,7vw,7.4rem)] font-semibold leading-[0.88] tracking-[-0.045em] text-white">
              Clear judgment. Considered execution. Direct guidance.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/74 md:text-xl md:leading-9">
              Josh Wisdom helps homeowners and buyers make consequential real
              estate decisions with local context, a defined strategy, and no
              unnecessary pressure.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                className="h-13 rounded-none bg-[#d7b56d] px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-white"
              >
                <Link href="/contact" data-primary-cta>
                  Request a Private Consultation
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-13 rounded-none border-white/60 bg-transparent px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black"
              >
                <a href={phoneHref}>Call {siteConfig.phone}</a>
              </Button>
            </div>
          </div>

          <aside className="relative min-h-[540px] overflow-hidden border border-white/15 bg-white/[0.035] p-7 md:p-10" aria-label="Josh Wisdom professional details">
            <div className="absolute inset-0">
              <ResponsiveLocationImage photo={locationPhotos.woodlands} className="absolute inset-0 h-full w-full object-cover" sizes="(min-width: 1024px) 38vw, 100vw" loading="eager" fetchPriority="high" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/42 via-black/72 to-black/95" />
              <PhotoCredit photo={locationPhotos.woodlands} label="Woodlands context" position="top-right" />
            </div>
            <div className="absolute right-7 top-16 font-serif text-[10rem] leading-none text-white/[0.06] md:text-[14rem]">JW</div>
            <div className="relative flex min-h-[390px] flex-col justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d7b56d]">Josh Wisdom</p>
                <h2 className="mt-5 max-w-md font-serif text-5xl leading-[0.95] text-white md:text-6xl">
                  Private real estate advisory.
                </h2>
              </div>
              <dl className="mt-14 divide-y divide-white/15 border-y border-white/15">
                <div className="grid grid-cols-[0.42fr_0.58fr] gap-4 py-4">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">Brokerage</dt>
                  <dd className="text-sm text-white/82">{siteConfig.brokerage.name}</dd>
                </div>
                <div className="grid grid-cols-[0.42fr_0.58fr] gap-4 py-4">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">Primary Area</dt>
                  <dd className="text-sm text-white/82">The Woodlands & North Houston</dd>
                </div>
                <div className="grid grid-cols-[0.42fr_0.58fr] gap-4 py-4">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">Representation</dt>
                  <dd className="text-sm text-white/82">Seller, buyer, luxury & relocation</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[#050505] text-white">
        <div className="mx-auto grid max-w-[1440px] gap-px bg-white/12 px-5 py-5 md:grid-cols-3 md:px-9">
          {[
            ["Direct", "Begin with the decision and the facts that shape it."],
            ["Measured", "Compare the tradeoff before urgency defines the route."],
            ["Personal", "Keep the next action, question, and consequence clear."],
          ].map(([title, copy]) => (
            <div key={title} className="bg-[#090909] px-6 py-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d7b56d]">{title}</p>
              <p className="mt-2 text-sm leading-6 text-white/65">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f6f1e8] py-20 text-black md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <Eyebrow>About Josh</Eyebrow>
            <h2 className="mt-6 font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] md:text-7xl">
              A serious decision deserves more than a sales pitch.
            </h2>
            <p className="mt-7 text-lg leading-8 text-neutral-700">
              The work begins by understanding the property, the timing, and
              the outcome the client is considering. From there, Josh organizes
              a practical route around value, preparation, comparison,
              diligence, market position, and negotiation.
            </p>
            <p className="mt-5 text-lg leading-8 text-neutral-700">
              Josh is a Texas real estate professional with VIP Realty, serving
              The Woodlands and communities across North Houston. The approach
              is personal, measured, and grounded in the details that shape an
              actual transaction.
            </p>
          </div>

          <div className="grid gap-px bg-black/12 md:grid-cols-3">
            {principles.map(({ icon: Icon, number, title, copy }) => (
              <article key={title} className="min-h-[430px] bg-white p-7 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <Icon className="h-6 w-6 text-[#9b6d1d]" aria-hidden="true" />
                  <span className="font-serif text-3xl text-black/50">{number}</span>
                </div>
                <h3 className="mt-20 font-serif text-4xl leading-[0.98] text-black">{title}</h3>
                <p className="mt-5 leading-7 text-neutral-700">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#080807] py-20 text-white md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <Eyebrow light>Working Style</Eyebrow>
              <h2 className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] md:text-7xl">
                Advice should make the next decision clearer.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-white/62 lg:justify-self-end">
              The purpose is not to remove every uncertainty. It is to identify
              the material questions, organize the comparison, and help the
              client act with a more deliberate position.
            </p>
          </div>

          <div className="mt-12 grid gap-px bg-white/12 md:grid-cols-2 xl:grid-cols-4">
            {workingStyle.map(({ icon: Icon, title, copy }, index) => (
              <article key={title} className="min-h-80 bg-[#11110f] p-7 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <Icon className="h-5 w-5 text-[#d7b56d]" aria-hidden="true" />
                  <span className="font-serif text-3xl text-white/45">0{index + 1}</span>
                </div>
                <h3 className="mt-14 font-serif text-3xl leading-[1.02] text-white">{title}</h3>
                <p className="mt-5 leading-7 text-white/64">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-black md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
            <div>
              <Eyebrow>Representation</Eyebrow>
              <h2 className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] md:text-7xl">
                Choose the conversation that matches the decision.
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-700 lg:justify-self-end">
              Each service path begins with different questions while retaining
              the same standard of property-specific context and disciplined
              representation.
            </p>
          </div>

          <div className="mt-12 grid gap-px bg-black/12 md:grid-cols-2">
            {servicePaths.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex min-h-80 flex-col bg-[#f7f3ec] p-7 transition-colors hover:bg-[#0a0a09] hover:text-white md:p-9"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#875d17] group-hover:text-[#d7b56d]">{service.eyebrow}</p>
                <h3 className="mt-12 font-serif text-4xl leading-[0.98] md:text-5xl">{service.title}</h3>
                <p className="mt-5 max-w-xl flex-1 leading-7 text-neutral-700 transition-colors group-hover:text-white/65">{service.copy}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#875d17] group-hover:text-[#d7b56d]">
                  Explore Representation <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6f1e8] py-20 text-black md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[1fr_0.62fr] lg:items-end">
          <div>
            <Eyebrow>Begin With Clarity</Eyebrow>
            <h2 className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] md:text-7xl">
              Discuss the property before deciding the next move.
            </h2>
          </div>
          <div className="border border-black/15 bg-white p-7 md:p-9">
            <Building2 className="h-5 w-5 text-[#9b6d1d]" aria-hidden="true" />
            <h3 className="mt-8 font-serif text-3xl">Start a private conversation.</h3>
            <p className="mt-4 leading-7 text-neutral-700">
              Share the property, timing, or decision you are considering. Josh
              will review the request personally and follow up directly.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Button asChild className="h-12 rounded-none bg-black px-7 text-[10px] font-bold uppercase tracking-[0.22em] text-white hover:bg-[#9b6d1d]">
                <Link href="/contact">Request Consultation</Link>
              </Button>
              <a href={emailHref} className="text-center text-sm text-neutral-600 underline underline-offset-4 hover:text-black">
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
