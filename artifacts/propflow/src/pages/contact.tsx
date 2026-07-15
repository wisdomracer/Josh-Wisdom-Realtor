import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  ArrowRight,
  Building2,
  Compass,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { Button } from "@/components/ui/button";
import { absoluteUrl, emailHref, phoneHref, siteConfig, textHref } from "@/config/site";

type ConversationPath = {
  eyebrow: string;
  title: string;
  copy: string;
  href: string;
  icon: LucideIcon;
};

const conversationPaths: ConversationPath[] = [
  {
    eyebrow: "Selling",
    title: "Position a property",
    copy: "Discuss value context, preparation, timing, presentation, and the decisions that should be made before launch.",
    href: "/sell",
    icon: Scale,
  },
  {
    eyebrow: "Buying",
    title: "Define a private search",
    copy: "Clarify the property brief, area tradeoffs, ownership questions, diligence, and offer strategy.",
    href: "/buy",
    icon: Compass,
  },
  {
    eyebrow: "Distinctive Property",
    title: "Discuss luxury representation",
    copy: "Begin with privacy, positioning, presentation, value context, and the property's particular audience.",
    href: "/luxury-homes",
    icon: ShieldCheck,
  },
  {
    eyebrow: "Relocation",
    title: "Plan a focused move",
    copy: "Organize area comparisons, daily routes, remote previews, timing, and a useful decision visit.",
    href: "/relocation",
    icon: Building2,
  },
];

const nextSteps = [
  {
    number: "01",
    title: "Share the decision",
    copy: "Provide the property, timing, priorities, or question that should frame the conversation.",
  },
  {
    number: "02",
    title: "Josh reviews the context",
    copy: "Your request is reviewed personally so the follow-up begins with the details you provided.",
  },
  {
    number: "03",
    title: "Choose the next move",
    copy: "Use the conversation to clarify the relevant facts, tradeoffs, and most useful next step.",
  },
];

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${siteConfig.url}/contact#contact-page`,
  url: absoluteUrl("/contact"),
  name: "Contact Josh Wisdom Realtor",
  description: "Request a private real estate conversation with Josh Wisdom for The Woodlands and North Houston.",
  mainEntity: {
    "@type": "RealEstateAgent",
    "@id": `${siteConfig.url}/#agent`,
    name: siteConfig.agentName,
    telephone: siteConfig.phoneE164,
    email: siteConfig.email,
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
    areaServed: [
      "The Woodlands, TX",
      "Tomball, TX",
      "Magnolia, TX",
      "Spring, TX",
      "Conroe, TX",
      "North Houston, TX",
    ],
  },
};

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Josh Wisdom Realtor | The Woodlands Listing Agent</title>
        <meta
          name="description"
          content="Contact Josh Wisdom Realtor for private seller, buyer, luxury property, relocation, and home valuation guidance in The Woodlands and North Houston."
        />
        <link rel="canonical" href={absoluteUrl("/contact")} />
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
      </Helmet>

      <section className="relative overflow-hidden bg-black text-white">
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(198,154,68,0.09)_1px,transparent_1px),linear-gradient(rgba(198,154,68,0.07)_1px,transparent_1px)] bg-[size:96px_96px] opacity-40" />
        <div className="container relative mx-auto grid min-h-[640px] gap-12 px-4 py-20 md:px-6 md:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#d4a84f]">Private Consultation</p>
            <h1 className="mt-7 max-w-4xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] text-white md:text-7xl xl:text-[5.6rem]">
              Begin with the property, the timing, and the decision.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-300 md:text-xl">
              A sale, purchase, relocation, or valuation deserves a direct conversation before it becomes a process. Share what you are considering and Josh will review the context personally.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-14 rounded-none bg-[#cfa348] px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-[#dfb85f]">
                <a href="#private-consultation">Request a Private Consultation</a>
              </Button>
              <Button asChild variant="outline" className="h-14 rounded-none border-white/60 bg-transparent px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black">
                <a href={phoneHref}><Phone className="mr-2 h-4 w-4" /> Call Josh</a>
              </Button>
            </div>
          </div>

          <aside className="border border-white/15 bg-black/75 p-7 shadow-2xl backdrop-blur-sm md:p-9" aria-label="Direct contact options">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d4a84f]">Direct Access</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-white">Choose how to begin.</h2>
            <div className="mt-8 divide-y divide-white/15 border-y border-white/15">
              <a href={phoneHref} className="group flex items-center justify-between gap-5 py-5 text-white transition hover:text-[#e0b45a]">
                <span className="flex items-center gap-4"><Phone className="h-5 w-5" aria-hidden="true" /><span><span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">Call</span><span className="mt-1 block text-lg">{siteConfig.phone}</span></span></span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a href={textHref} className="group flex items-center justify-between gap-5 py-5 text-white transition hover:text-[#e0b45a]">
                <span className="flex items-center gap-4"><MessageSquareText className="h-5 w-5" aria-hidden="true" /><span><span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">Text</span><span className="mt-1 block text-lg">Send a direct message</span></span></span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a href={emailHref} className="group flex items-center justify-between gap-5 py-5 text-white transition hover:text-[#e0b45a]">
                <span className="flex min-w-0 items-center gap-4"><Mail className="h-5 w-5 shrink-0" aria-hidden="true" /><span className="min-w-0"><span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">Email</span><span className="mt-1 block break-all text-lg">{siteConfig.email}</span></span></span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
            <p className="mt-6 flex gap-3 text-sm leading-6 text-neutral-400"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d4a84f]" aria-hidden="true" />The Woodlands, North Houston, and surrounding communities</p>
          </aside>
        </div>
      </section>

      <section className="bg-[#f5f2ec] py-20 md:py-28" aria-labelledby="conversation-paths-title">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 border-b border-black/15 pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#875d17]">The Right Starting Point</p>
              <h2 id="conversation-paths-title" className="mt-5 max-w-xl font-serif text-4xl leading-[1.02] text-black md:text-6xl">Choose the conversation that matches the decision.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-700 lg:justify-self-end">Review the relevant advisory path first, or begin directly with Josh if the situation crosses more than one category.</p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-2">
            {conversationPaths.map(({ eyebrow, title, copy, href, icon: Icon }) => (
              <Link key={href} href={href} className="group bg-white p-7 transition hover:bg-black hover:text-white md:p-9">
                <div className="flex items-start justify-between gap-5">
                  <Icon className="h-6 w-6 text-[#9b6d1d]" aria-hidden="true" />
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
                <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.26em] text-[#875d17] group-hover:text-[#d4a84f]">{eyebrow}</p>
                <h3 className="mt-3 font-serif text-3xl leading-tight">{title}</h3>
                <p className="mt-4 max-w-xl leading-7 text-neutral-600 group-hover:text-neutral-300">{copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28" aria-labelledby="what-happens-title">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#875d17]">What Happens Next</p>
              <h2 id="what-happens-title" className="mt-5 font-serif text-4xl leading-[1.02] text-black md:text-6xl">A considered first conversation.</h2>
              <p className="mt-6 max-w-lg text-lg leading-8 text-neutral-700">No generic intake call is needed. Begin with enough context to make the first exchange useful.</p>
            </div>
            <ol className="grid gap-px border border-black/10 bg-black/10 md:grid-cols-3">
              {nextSteps.map(({ number, title, copy }) => (
                <li key={number} className="bg-[#faf9f6] p-7 md:p-8">
                  <span className="font-serif text-3xl text-[#9b6d1d]">{number}</span>
                  <h3 className="mt-8 text-lg font-semibold text-black">{title}</h3>
                  <p className="mt-3 leading-7 text-neutral-600">{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="private-consultation" className="scroll-mt-20 bg-[#111] py-20 text-white md:py-28" aria-labelledby="private-consultation-title">
        <div className="container mx-auto grid gap-12 px-4 md:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4a84f]">Private Consultation</p>
            <h2 id="private-consultation-title" className="mt-5 max-w-xl font-serif text-4xl leading-[1.02] text-white md:text-6xl">Put the relevant details in one place.</h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-300">Share the property address if there is one, your timing, and the question or decision you want to discuss. Josh will review the request personally.</p>
            <div className="mt-9 border-t border-white/15 pt-8">
              <p className="text-sm leading-7 text-neutral-400">Brokerage</p>
              <p className="mt-1 text-lg text-white">{siteConfig.brokerage.name}</p>
              <p className="mt-4 max-w-md text-sm leading-7 text-neutral-400">{siteConfig.brokerage.streetAddress}<br />{siteConfig.brokerage.locality}, {siteConfig.brokerage.region} {siteConfig.brokerage.postalCode}</p>
            </div>
          </div>
          <LeadForm
            leadType="consultation"
            showAddress
            title="Request a private conversation"
            subtitle="Tell Josh what you are considering and the best way to reach you."
            buttonText="Request Consultation"
          />
        </div>
      </section>
    </>
  );
}
