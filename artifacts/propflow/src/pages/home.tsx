import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { ArrowRight, CalendarDays, Home, MapPin, ShieldCheck } from "lucide-react";
import { PhotoCredit, ResponsiveLocationImage } from "@/components/location-hero";
import { locationPhotos } from "@/config/location-photos";

const communities = [
  ["Carlton Woods", "Private golf estates, gated streets, estate lots, and premium property considerations.", "/communities/carlton-woods"],
  ["East Shore", "Lake Woodlands, walkability, Market Street access, and lock-and-leave luxury appeal.", "/communities/east-shore"],
  ["Creekside Park", "Newer homes, parks, trails, amenities, and distinct village-level market context.", "/communities/creekside-park"],
  ["The Woodlands", "Village-by-village guidance across Sterling Ridge, Alden Bridge, Panther Creek, and more.", "/communities/the-woodlands"],
];

const proofPoints = [
  ["Seller-first", "Every recommendation starts with value, timing, presentation, and negotiation leverage."],
  ["Local focus", "The Woodlands, Tomball, Spring, Magnolia, Conroe, Shenandoah, and north Houston."],
  ["Private guidance", "Clear next steps for homeowners who want a serious plan before listing."],
];

const process = [
  ["01", "Position", "Review nearby competition, condition, buyer profile, timing, and pricing strategy."],
  ["02", "Prepare", "Prioritize repairs, staging, cleaning, curb appeal, and presentation before launch."],
  ["03", "Launch", "Create the listing story, media direction, showing plan, and digital rollout."],
  ["04", "Negotiate", "Protect price, terms, appraisal risk, concessions, financing, and closing timing."],
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["RealEstateAgent", "LocalBusiness"],
      "@id": "https://joshwisdomrealtor.com/#agent",
      name: "Josh Wisdom Realtor",
      url: "https://joshwisdomrealtor.com/",
      telephone: "+18329818920",
      email: "WisdomRacer@gmail.com",
      areaServed: ["The Woodlands, TX", "Tomball, TX", "Spring, TX", "Magnolia, TX", "Conroe, TX", "Greater Houston, TX"],
      knowsAbout: ["The Woodlands luxury real estate", "seller representation", "home valuation", "listing strategy"],
      address: { "@type": "PostalAddress", streetAddress: "5100 Westheimer Ste 200", addressLocality: "Houston", addressRegion: "TX", postalCode: "77027", addressCountry: "US" },
      parentOrganization: { "@type": "RealEstateAgent", name: "VIP Realty" },
    },
    { "@type": "WebSite", "@id": "https://joshwisdomrealtor.com/#website", name: "Josh Wisdom Realtor", url: "https://joshwisdomrealtor.com/" },
  ],
};

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return <p className={`text-[11px] font-bold uppercase tracking-[0.28em] ${light ? "text-[#d7b56d]" : "text-[#9b6d1d]"}`}>{children}</p>;
}

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Josh Wisdom Realtor | The Woodlands Luxury Real Estate</title>
        <meta name="description" content="Josh Wisdom Realtor helps The Woodlands and North Houston homeowners price, prepare, market, and negotiate with a private seller-first listing strategy." />
        <link rel="canonical" href="https://joshwisdomrealtor.com/" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="home-hero overflow-hidden bg-[#050505] text-white">
        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[0.96fr_1.04fr]">
          <div className="relative flex items-center px-5 py-20 md:px-9 md:py-24 lg:px-12 lg:py-28">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:76px_76px]" />
            <div className="relative max-w-3xl luxury-reveal">
              <div className="mb-7 flex items-center gap-4 text-white/70">
                <span className="h-px w-14 bg-[#d7b56d]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.28em]">The Woodlands · North Houston</span>
              </div>
              <h1 className="max-w-3xl font-serif text-[clamp(3.6rem,6.4vw,7rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-white">
                Private real estate advisory.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76 md:text-xl md:leading-9">
                Discreet, seller-first representation across The Woodlands and North Houston for homeowners who expect stronger pricing, considered presentation, and disciplined negotiation.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button asChild className="h-13 rounded-none bg-[#d7b56d] px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-white">
                  <Link href="/home-valuation" data-primary-cta>Request Private Valuation</Link>
                </Button>
                <Button asChild variant="outline" className="h-13 rounded-none border-white/60 bg-transparent px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black">
                  <Link href="/contact" data-primary-cta>Schedule Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
          <figure className="relative min-h-[360px] overflow-hidden lg:min-h-[680px]">
            <ResponsiveLocationImage photo={locationPhotos.woodlands} className="absolute inset-0 h-full w-full object-cover" sizes="(min-width: 1024px) 52vw, 100vw" loading="eager" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
            <PhotoCredit photo={locationPhotos.woodlands} />
          </figure>
        </div>
      </section>

      <section className="bg-[#050505] text-white">
        <div className="mx-auto grid max-w-[1440px] gap-px bg-white/10 px-5 py-5 md:grid-cols-3 md:px-9">
          {proofPoints.map(([label, copy]) => (
            <article key={label} className="bg-[#050505] px-6 py-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d7b56d]">{label}</p>
              <p className="mt-4 leading-7 text-white/70">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 text-black md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-9 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <Eyebrow>Listing Strategy</Eyebrow>
            <h2 className="mt-6 max-w-xl font-serif text-[clamp(2.6rem,4.8vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
              Luxury is restraint, preparation, and leverage.
            </h2>
            <p className="mt-7 max-w-lg text-lg leading-8 text-neutral-700">
              The best listings do not depend on a sign in the yard. They are positioned before the first showing, photographed with intent, and negotiated with a plan.
            </p>
            <Button asChild className="mt-8 h-13 rounded-none bg-black px-7 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-[#9b6d1d]">
              <Link href="/sell">View Selling Plan</Link>
            </Button>
          </div>

          <div className="grid gap-px bg-neutral-200 md:grid-cols-2">
            {process.map(([number, title, copy]) => (
              <article key={title} className="group min-h-72 bg-[#f7f3ec] p-8 transition hover:bg-black hover:text-white">
                <p className="font-serif text-5xl text-[#9b6d1d]">{number}</p>
                <h3 className="mt-12 font-serif text-4xl font-semibold">{title}</h3>
                <p className="mt-5 leading-8 text-neutral-700 transition group-hover:text-white/70">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0b0a08] py-20 text-white md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <Eyebrow light>Luxury Communities</Eyebrow>
              <h2 className="mt-6 font-serif text-[clamp(2.6rem,4.7vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
                The Woodlands is not one market.
              </h2>
            </div>
            <p className="max-w-3xl text-lg leading-8 text-white/70">
              Carlton Woods, East Shore, Creekside Park, and the established villages each attract different buyers. Pricing and presentation should match the buyer profile.
            </p>
          </div>

          <div className="mt-12 grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {communities.map(([name, copy, href]) => (
              <Link key={name} href={href} className="group min-h-80 bg-[#0b0a08] p-7 transition hover:bg-[#f7f3ec] hover:text-black">
                <MapPin className="h-5 w-5 text-[#d7b56d]" />
                <h3 className="mt-16 font-serif text-4xl font-semibold leading-none">{name}</h3>
                <p className="mt-5 leading-7 text-white/68 transition group-hover:text-neutral-700">{copy}</p>
                <span className="mt-8 inline-flex items-center text-[11px] font-bold uppercase tracking-[0.22em] text-[#d7b56d]">Explore <ArrowRight className="ml-3 h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 text-black md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Eyebrow>Private Home Value</Eyebrow>
            <h2 className="mt-6 font-serif text-[clamp(2.6rem,4.7vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
              Know the number before you make a move.
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-700">
              Your value depends on condition, updates, lot, timing, nearby competition, and the story buyers see online. Start with a private review before you list.
            </p>
            <div className="mt-8 grid gap-px bg-black/10 sm:grid-cols-2">
              {["Local value review", "Preparation priorities", "Launch timing", "Offer strategy"].map((item) => (
                <div key={item} className="flex items-center gap-3 bg-[#f7f3ec] p-5">
                  <ShieldCheck className="h-5 w-5 text-[#9b6d1d]" />
                  <span className="font-semibold text-black">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-black/15 bg-[#f7f3ec] p-3 text-black shadow-2xl shadow-black/10">
            <LeadForm leadType="valuation" showAddress title="Request a private valuation" subtitle="Share the property address and timeline. Josh will review it personally." buttonText="Request Private Valuation" />
          </div>
        </div>
      </section>

      <section className="bg-black px-5 py-20 text-white md:px-9 md:py-28">
        <div className="mx-auto max-w-[1440px] border border-white/15 p-8 md:p-14">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <Eyebrow light>Private Consultation</Eyebrow>
              <h2 className="mt-6 max-w-5xl font-serif text-[clamp(2.6rem,4.7vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.035em]">
                Thinking about selling in The Woodlands?
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                Start with value, timing, preparation, and a clean plan before you list.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Button asChild size="lg" className="h-13 rounded-none bg-[#d7b56d] px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-white">
                <Link href="/home-valuation"><Home className="mr-2 h-4 w-4" /> Valuation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-13 rounded-none border-white bg-transparent px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black">
                <Link href="/contact"><CalendarDays className="mr-2 h-4 w-4" /> Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
