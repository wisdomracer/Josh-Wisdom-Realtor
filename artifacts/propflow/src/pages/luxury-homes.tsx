import { Helmet } from "react-helmet-async";
import { LeadForm } from "@/components/forms/lead-form";

export default function LuxuryHomes() {
  return (
    <>
      <Helmet>
        <title>The Woodlands Luxury Homes | Josh Wisdom Realtor</title>
        <meta name="description" content="Luxury listing and buyer representation for The Woodlands estates, Carlton Woods, East Shore, and Greater Houston premium homes." />
        <link rel="canonical" href="https://thewoodlandslistingagent.com/luxury-homes" />
      </Helmet>

      <section className="relative bg-black py-24 text-white md:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#050505,#171717,#2a210d)]" />
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute left-[12%] top-[20%] h-52 w-52 border border-amber-400/50" />
          <div className="absolute bottom-[18%] right-[14%] h-72 w-72 border border-white/20" />
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-300">Luxury Homes</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">Luxury real estate deserves premium presentation and qualified attention.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">From Carlton Woods estates to East Shore lifestyle properties, Josh helps high-value sellers position the home with clarity, discretion, and detail.</p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1fr_0.9fr] md:px-6">
          <div className="space-y-8">
            {["Architecture, privacy, lot, finishes, and lifestyle access all shape luxury value.", "A premium listing should communicate the property story before a buyer requests a showing.", "The right exposure balances visibility with discretion and buyer qualification."].map((copy) => (
              <p key={copy} className="border-l-2 border-amber-500 pl-6 text-xl leading-9 text-neutral-800">{copy}</p>
            ))}
          </div>
          <LeadForm leadType="luxury" showAddress title="Private luxury consultation" subtitle="Discuss your property, goals, and timing directly with Josh." buttonText="Request Private Consultation" />
        </div>
      </section>
    </>
  );
}