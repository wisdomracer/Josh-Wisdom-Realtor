import { Helmet } from "react-helmet-async";
import { LeadForm } from "@/components/forms/lead-form";
import { Mail, MapPin, Phone } from "lucide-react";
import { absoluteUrl, emailHref, phoneHref, siteConfig } from "@/config/site";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Josh Wisdom Realtor | The Woodlands Listing Agent</title>
        <meta name="description" content="Contact Josh Wisdom Realtor for listing strategy, home valuation, luxury homes, and real estate guidance in The Woodlands, Tomball, and Greater Houston." />
        <link rel="canonical" href={absoluteUrl("/contact")} />
      </Helmet>

      <section className="bg-black py-20 text-white md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-400">Private Consultation</p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.03em] text-white md:text-7xl">Begin with the property, the timing, and the decision.</h1>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] md:px-6">
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-4xl text-black">Direct contact with Josh.</h2>
              <p className="mt-4 leading-7 text-neutral-700">Discuss a sale, private valuation, purchase, relocation, or property-specific question without entering an automated sales sequence.</p>
            </div>
            <div className="space-y-5 border-t border-neutral-200 pt-8">
              <a href={phoneHref} className="flex gap-4 text-black hover:text-amber-700"><Phone className="h-5 w-5" /><span>{siteConfig.phone}</span></a>
              <a href={emailHref} className="flex gap-4 text-black hover:text-amber-700"><Mail className="h-5 w-5" /><span>{siteConfig.email}</span></a>
              <div className="flex gap-4 text-black"><MapPin className="h-5 w-5" /><span>{siteConfig.brokerage.name}, {siteConfig.brokerage.streetAddress}, {siteConfig.brokerage.locality}, {siteConfig.brokerage.region} {siteConfig.brokerage.postalCode}</span></div>
            </div>
          </div>
          <LeadForm leadType="consultation" showAddress title="Request a private conversation" subtitle="Tell Josh what you are considering and the best way to reach you." buttonText="Request Consultation" />
        </div>
      </section>
    </>
  );
}
