import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowRight, BadgeCheck, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const principles = [
  {
    icon: BadgeCheck,
    title: "Property-specific judgment",
    copy: "Advice should reflect the home, the competing inventory, the likely buyer, and the decision in front of you—not a generic script.",
  },
  {
    icon: MapPin,
    title: "Local context",
    copy: "The Woodlands, Tomball, Magnolia, Spring, Conroe, and north Houston each require a more precise comparison than a ZIP-code average.",
  },
  {
    icon: ShieldCheck,
    title: "Disciplined representation",
    copy: "Clear communication, thoughtful preparation, and careful negotiation matter from the first conversation through closing.",
  },
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Josh Wisdom | Private Real Estate Advisory</title>
        <meta name="description" content="Meet Josh Wisdom, a VIP Realty real estate professional providing private seller and buyer guidance across The Woodlands and North Houston." />
        <link rel="canonical" href="https://joshwisdomrealtor.com/about" />
      </Helmet>

      <section className="bg-[#050505] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-9 md:py-32">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7b56d]">Private Representation</p>
          <h1 className="mt-6 max-w-5xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] md:text-7xl">
            Clear judgment. Considered execution. Direct guidance.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
            Josh Wisdom helps homeowners and buyers make consequential real estate decisions with local context, a defined strategy, and no unnecessary pressure.
          </p>
        </div>
      </section>

      <section className="bg-[#f7f5f0] py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#9b6d1d]">About Josh</p>
            <h2 className="mt-5 font-serif text-4xl leading-[0.98] text-black md:text-6xl">A serious decision deserves more than a sales pitch.</h2>
            <p className="mt-7 text-lg leading-8 text-neutral-700">
              The work begins by understanding the property, the timing, and the outcome you need. From there, Josh builds a practical plan around value, preparation, market position, and negotiation.
            </p>
            <p className="mt-5 text-lg leading-8 text-neutral-700">
              Josh is a Texas real estate professional with VIP Realty, serving The Woodlands and communities across North Houston. The approach is personal, measured, and grounded in the details that shape an actual transaction.
            </p>
            <Button asChild className="mt-9 h-12 rounded-none bg-black px-7 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-[#9b6d1d]">
              <Link href="/contact">Request a Private Consultation <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid gap-px border border-black/10 bg-black/10 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {principles.map(({ icon: Icon, title, copy }) => (
              <article key={title} className="bg-white p-7 md:p-8">
                <Icon className="h-6 w-6 text-[#9b6d1d]" aria-hidden="true" />
                <h3 className="mt-8 font-serif text-3xl leading-tight text-black">{title}</h3>
                <p className="mt-4 leading-7 text-neutral-700">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 border border-black/15 px-7 py-10 md:flex-row md:items-center md:justify-between md:px-12">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#9b6d1d]">Start With Clarity</p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-black md:text-5xl">Discuss the property before deciding the next move.</h2>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
            <Button asChild className="h-12 rounded-none bg-[#d7b56d] px-7 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-black hover:text-white">
              <Link href="/home-valuation">Private Valuation</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-none border-black px-7 text-[11px] font-bold uppercase tracking-[0.22em]">
              <Link href="/contact">Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
