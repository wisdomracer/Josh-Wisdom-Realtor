import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { BarChart3, Camera, CheckCircle2, Megaphone, ShieldCheck, type LucideIcon } from "lucide-react";

type Step = {
  title: string;
  copy: string;
  icon: LucideIcon;
};

const steps: Step[] = [
  { title: "Price", copy: "Review recent sales, active competition, village-level demand, and the details automated estimates miss.", icon: BarChart3 },
  { title: "Prepare", copy: "Identify the presentation moves most likely to reduce objections and improve buyer confidence.", icon: Camera },
  { title: "Promote", copy: "Launch with strong copy, quality visuals, buyer targeting, and community context that makes value obvious.", icon: Megaphone },
  { title: "Negotiate", copy: "Evaluate price, terms, buyer strength, contingencies, appraisal risk, and closing timelines.", icon: ShieldCheck },
];

export default function Sell() {
  return (
    <>
      <Helmet>
        <title>Selling A Home In The Woodlands | Josh Wisdom Realtor</title>
        <meta name="description" content="Sell your Woodlands, Tomball, or Greater Houston home with Josh Wisdom Realtor using strategic pricing, premium marketing, and seller-first negotiation." />
        <link rel="canonical" href="https://thewoodlandslistingagent.com/sell" />
      </Helmet>

      <section className="bg-black py-20 text-white md:py-28">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center md:px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-400">Seller Strategy</p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-6xl">Selling your home should start with leverage.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">Josh Wisdom Realtor helps homeowners in The Woodlands, Tomball, and Greater Houston understand value, prepare the property, launch with polish, and negotiate the whole offer.</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild className="h-12 rounded-none bg-amber-500 px-7 text-black hover:bg-amber-400"><Link href="/home-valuation">Get Home Value</Link></Button>
              <Button asChild variant="outline" className="h-12 rounded-none border-white bg-transparent px-7 text-white hover:bg-white hover:text-black"><Link href="/contact">Schedule Consultation</Link></Button>
            </div>
          </div>
          <div className="flex min-h-64 items-center justify-center bg-black p-8 text-center text-white"><div><p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Real media needed</p><p className="mt-3 text-lg text-white/70">Add approved real photography here. No fake property or community image is being shown.</p></div></div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1fr_0.9fr] md:px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-600">The Listing Plan</p>
            <h2 className="mt-4 text-4xl font-semibold text-black md:text-5xl">A clean process for a stronger sale.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="border border-neutral-200 p-6">
                    <Icon className="mb-5 h-7 w-7 text-amber-600" />
                    <h3 className="text-2xl font-semibold text-black">{step.title}</h3>
                    <p className="mt-3 leading-7 text-neutral-700">{step.copy}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 space-y-4 border-t border-neutral-200 pt-8">
              {["No fake listing promises", "No generic home-value bait", "No one-size-fits-all neighborhood copy"].map((item) => (
                <div key={item} className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 text-amber-600" /><span className="text-neutral-800">{item}</span></div>
              ))}
            </div>
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <LeadForm leadType="selling" showAddress title="Ready to talk strategy?" subtitle="Share your address, timing, and goals. Josh will follow up with a seller-focused plan." buttonText="Schedule Listing Consultation" />
          </div>
        </div>
      </section>
    </>
  );
}