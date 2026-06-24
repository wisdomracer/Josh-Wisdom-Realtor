import { Helmet } from "react-helmet-async";
import { LeadForm } from "@/components/forms/lead-form";
import { CheckCircle2 } from "lucide-react";

export default function HomeValuation() {
  return (
    <>
      <Helmet>
        <title>Get Home Value | The Woodlands Listing Agent</title>
        <meta name="description" content="Request a seller-focused home valuation from Josh Wisdom Realtor for The Woodlands, Tomball, Spring, Magnolia, or Greater Houston." />
        <link rel="canonical" href="https://thewoodlandslistingagent.com/home-valuation" />
      </Helmet>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start md:px-6">
          <div className="lg:sticky lg:top-24">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-600">Home Valuation</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-black md:text-6xl">What could your home sell for in today's market?</h1>
            <p className="mt-6 text-lg leading-8 text-neutral-700">A useful valuation should account for upgrades, lot, condition, village, timing, buyer demand, and the competition you would launch against.</p>
            <div className="mt-8 space-y-4">
              {["Comparative market analysis", "Neighborhood and village-level buyer demand", "Preparation ideas that may improve seller leverage", "Clear next steps without pressure"].map((item) => (
                <div key={item} className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 text-amber-600" /><span className="text-neutral-800">{item}</span></div>
              ))}
            </div>
          </div>
          <LeadForm leadType="valuation" showAddress title="Request your home value" subtitle="Give Josh the property address and your rough timeline." buttonText="Get My Home Value" />
        </div>
      </section>
    </>
  );
}