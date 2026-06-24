import { Helmet } from "react-helmet-async";
import { LeadForm } from "@/components/forms/lead-form";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Josh Wisdom Realtor | The Woodlands Listing Agent</title>
        <meta name="description" content="Contact Josh Wisdom Realtor for listing strategy, home valuation, luxury homes, and real estate guidance in The Woodlands, Tomball, and Greater Houston." />
        <link rel="canonical" href="https://thewoodlandslistingagent.com/contact" />
      </Helmet>

      <section className="bg-black py-20 text-white md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-400">Contact</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">Talk with Josh about value, timing, and your next move.</h1>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.85fr_1.15fr] md:px-6">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-semibold text-black">Direct Contact</h2>
              <p className="mt-4 leading-7 text-neutral-700">Reach out for a seller consultation, home valuation, neighborhood question, or private luxury conversation.</p>
            </div>
            <div className="space-y-5 border-t border-neutral-200 pt-8">
              <a href="tel:+18329818920" className="flex gap-4 text-black hover:text-amber-700"><Phone className="h-5 w-5" /><span>832-981-8920</span></a>
              <a href="mailto:WisdomRacer@gmail.com" className="flex gap-4 text-black hover:text-amber-700"><Mail className="h-5 w-5" /><span>WisdomRacer@gmail.com</span></a>
              <div className="flex gap-4 text-black"><MapPin className="h-5 w-5" /><span>VIP Realty, 5100 Westheimer Ste 200, Houston, TX 77027</span></div>
            </div>
          </div>
          <LeadForm leadType="consultation" showAddress title="Send Josh a message" subtitle="Tell Josh what you are considering and the best way to reach you." buttonText="Send Message" />
        </div>
      </section>
    </>
  );
}