import { Helmet } from "react-helmet-async";
import { CheckCircle2 } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";

const buyerPriorities = [
  ["Define the brief", "Clarify location, lifestyle, timing, budget, property needs, and the tradeoffs that actually matter before opening the search."],
  ["Compare the complete cost", "Look beyond list price to taxes, fees, insurance context, expected work, incentives, and long-term ownership considerations."],
  ["Inspect the details", "Review property condition, documents, neighborhood context, and material questions with the appropriate qualified professionals."],
  ["Negotiate the whole offer", "Balance price with financing, appraisal exposure, inspections, concessions, possession, and closing timing."],
];

export default function Buy() {
  return (
    <>
      <Helmet>
        <title>Private Buyer Representation | The Woodlands & North Houston</title>
        <meta name="description" content="Private buyer representation for The Woodlands and North Houston, with property-specific guidance, local context, and disciplined offer strategy." />
        <link rel="canonical" href="https://joshwisdomrealtor.com/buy" />
      </Helmet>

      <section className="bg-[#050505] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-9 md:py-32">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7b56d]">Private Buyer Advisory</p>
          <h1 className="mt-6 max-w-5xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] md:text-7xl">Buy with a clear brief, not more noise.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">
            The right property is a fit across location, lifestyle, condition, cost, and timing. Josh helps buyers compare the complete decision before competing for the home.
          </p>
        </div>
      </section>

      <section className="bg-[#f7f5f0] py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#875d17]">The Buyer Brief</p>
            <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-[0.98] text-black md:text-6xl">A search built around the decision.</h2>
            <div className="mt-10 grid gap-px border border-black/10 bg-black/10 md:grid-cols-2">
              {buyerPriorities.map(([title, copy]) => (
                <article key={title} className="bg-white p-7 md:p-8">
                  <CheckCircle2 className="h-6 w-6 text-[#9b6d1d]" aria-hidden="true" />
                  <h3 className="mt-6 font-serif text-3xl text-black">{title}</h3>
                  <p className="mt-4 leading-7 text-neutral-700">{copy}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <LeadForm
              leadType="buying"
              showArea
              title="Request a private buyer brief"
              subtitle="Share the areas, timing, and property details that matter. Josh will follow up directly."
              buttonText="Request Buyer Consultation"
            />
          </div>
        </div>
      </section>
    </>
  );
}
