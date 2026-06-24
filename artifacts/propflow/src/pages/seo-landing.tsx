import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";

export type SeoLanding = {
  slug: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  hero: string;
  area: string;
  bullets: string[];
  sections: { title: string; copy: string }[];
  faqs: { question: string; answer: string }[];
};

export const seoLandingPages: SeoLanding[] = [
  {
    slug: "the-woodlands-listing-agent",
    eyebrow: "The Woodlands Listing Agent",
    title: "The Woodlands Listing Agent for homeowners who want a stronger sale.",
    metaTitle: "The Woodlands Listing Agent | Josh Wisdom Realtor",
    description: "Work with Josh Wisdom Realtor for listing strategy, pricing guidance, premium marketing, and seller representation in The Woodlands, Texas.",
    hero: "A listing launch should feel intentional before the sign goes up. Josh helps Woodlands homeowners prepare the home, position the price, and create buyer demand with a clear marketing plan.",
    area: "The Woodlands, TX",
    bullets: ["Village-level pricing review", "Launch plan for photography, copy, and buyer targeting", "Negotiation strategy before offers arrive"],
    sections: [
      { title: "Pricing built around local context", copy: "The Woodlands is not one flat market. Carlton Woods, East Shore, Creekside Park, Sterling Ridge, Alden Bridge, and Panther Creek each attract different buyer motivations and different pricing pressure." },
      { title: "Premium presentation", copy: "The first showing usually happens online. Josh's listing plan focuses on photography readiness, buyer-facing copy, neighborhood context, and a launch sequence built to create confidence." },
      { title: "Seller-first negotiation", copy: "A strong sale depends on more than price. Terms, timing, contingencies, appraisal risk, and buyer strength all shape the actual outcome." },
    ],
    faqs: [
      { question: "What does a listing agent do for a Woodlands seller?", answer: "A strong listing agent helps price, prepare, market, negotiate, and manage the sale from launch through closing while protecting the seller's leverage." },
      { question: "When should I talk to Josh before selling?", answer: "Ideally 30 to 90 days before listing so pricing, repairs, photos, and launch timing can be handled without rushing." },
    ],
  },
  {
    slug: "the-woodlands-realtor",
    eyebrow: "The Woodlands Realtor",
    title: "A Woodlands Realtor focused on local clarity and premium guidance.",
    metaTitle: "The Woodlands Realtor | Josh Wisdom Realtor",
    description: "Josh Wisdom Realtor serves The Woodlands, Tomball, and Greater Houston with seller-focused real estate guidance and local market knowledge.",
    hero: "From village differences to buyer demand patterns, local nuance matters. Josh helps clients understand what the market is rewarding before they make a move.",
    area: "The Woodlands, Tomball, Spring, Magnolia, and Greater Houston",
    bullets: ["Seller consultations", "Buyer and relocation guidance", "Neighborhood-level market insight"],
    sections: [
      { title: "Local decisions need local context", copy: "A home near the Waterway is evaluated differently from a golf-course estate, a Creekside Park move-up home, or a Tomball acreage property." },
      { title: "Guidance without pressure", copy: "The process starts with goals, timing, and facts. Josh's role is to help you see the decision clearly and move only when the strategy makes sense." },
      { title: "Greater Houston reach", copy: "The site is centered on The Woodlands and Tomball, with broader service across Spring, Magnolia, Conroe, Cypress, Houston, Klein, Montgomery, Kingwood, Katy, Sugar Land, and nearby suburbs." },
    ],
    faqs: [
      { question: "Does Josh serve areas outside The Woodlands?", answer: "Yes. The primary focus is The Woodlands and Tomball, with broader Greater Houston coverage." },
      { question: "Can Josh help with both buying and selling?", answer: "Yes. The site is seller-focused, but Josh also provides buyer, relocation, and luxury property guidance." },
    ],
  },
  {
    slug: "the-woodlands-luxury-homes",
    eyebrow: "The Woodlands Luxury Homes",
    title: "Luxury home representation in The Woodlands, Texas.",
    metaTitle: "The Woodlands Luxury Homes | Josh Wisdom Realtor",
    description: "Luxury listing and buyer guidance for The Woodlands estates, custom homes, golf-course properties, and premium neighborhoods.",
    hero: "Luxury buyers compare presentation, privacy, finishes, setting, and lifestyle. Josh helps position high-value homes with discretion and detail.",
    area: "The Woodlands luxury market",
    bullets: ["Luxury listing preparation", "Private consultation", "Premium neighborhood positioning"],
    sections: [
      { title: "Presentation is leverage", copy: "Luxury marketing must feel considered. Photography, staging, copy, and buyer targeting should communicate value before the appointment is booked." },
      { title: "Neighborhood prestige matters", copy: "Carlton Woods, East Shore, and other premium areas require copy and pricing that reflect both property features and lifestyle access." },
      { title: "Discretion and qualification", copy: "High-value homes need thoughtful exposure and serious buyer handling. The goal is visibility without chaos." },
    ],
    faqs: [
      { question: "What makes selling a luxury home different?", answer: "Luxury sales depend more heavily on presentation, qualified exposure, privacy, and negotiation of complex terms." },
      { question: "Can Josh advise before photos or staging?", answer: "Yes. A pre-listing consultation can identify which improvements and presentation details are likely to matter most." },
    ],
  },
  {
    slug: "carlton-woods-homes-for-sale",
    eyebrow: "Carlton Woods Homes For Sale",
    title: "Carlton Woods homes deserve a premium listing strategy.",
    metaTitle: "Carlton Woods Homes For Sale | Josh Wisdom Realtor",
    description: "Explore seller guidance and luxury positioning for Carlton Woods homes for sale in The Woodlands, Texas.",
    hero: "Carlton Woods buyers expect privacy, architecture, golf-club lifestyle, and estate-level presentation. Your listing should speak that language from day one.",
    area: "Carlton Woods, The Woodlands",
    bullets: ["Estate positioning", "Golf and gated-community context", "Luxury buyer targeting"],
    sections: [
      { title: "Premium buyer expectations", copy: "Carlton Woods buyers compare finishes, lot setting, privacy, club proximity, and long-term prestige." },
      { title: "Launch with intention", copy: "The listing should be prepared with strong photography, measured copy, and a plan for qualified attention." },
      { title: "IDX-ready for active inventory", copy: "When your approved IDX provider is connected, this page is ready to support live Carlton Woods homes for sale without fake listings." },
    ],
    faqs: [
      { question: "Is Carlton Woods a luxury market?", answer: "Yes. Carlton Woods is one of The Woodlands' most recognized luxury and gated-community markets." },
      { question: "Should I list publicly or quietly?", answer: "That depends on your goals, privacy needs, timeline, and buyer pool. Josh can help evaluate the right exposure strategy." },
    ],
  },
  {
    slug: "east-shore-homes-for-sale",
    eyebrow: "East Shore Homes For Sale",
    title: "East Shore listing guidance for lakefront and Waterway-area sellers.",
    metaTitle: "East Shore Homes For Sale | Josh Wisdom Realtor",
    description: "Seller-focused real estate guidance for East Shore homes for sale near Lake Woodlands, Market Street, and The Woodlands Waterway.",
    hero: "East Shore buyers often value convenience, architecture, walkability, water access, and low-maintenance luxury. The marketing should make that lifestyle clear.",
    area: "East Shore, The Woodlands",
    bullets: ["Lifestyle-focused marketing", "Waterway and Market Street positioning", "Premium buyer copy"],
    sections: [
      { title: "Lifestyle is the product", copy: "East Shore listings should communicate more than square footage. Walkability, dining, lake access, and the feel of the neighborhood all matter." },
      { title: "Online first impressions", copy: "Strong visuals and concise copy help buyers understand the East Shore value proposition quickly." },
      { title: "Prepared for live listings", copy: "This page is ready for IDX integration once approved listing data is connected." },
    ],
    faqs: [
      { question: "What attracts buyers to East Shore?", answer: "Many buyers are drawn to Lake Woodlands access, Market Street proximity, walkability, and luxury lock-and-leave living." },
      { question: "How should East Shore homes be marketed?", answer: "The marketing should emphasize lifestyle, setting, architecture, and convenience alongside property features." },
    ],
  },
  {
    slug: "creekside-park-homes-for-sale",
    eyebrow: "Creekside Park Homes For Sale",
    title: "Creekside Park homes for sale need village-specific positioning.",
    metaTitle: "Creekside Park Homes For Sale | Josh Wisdom Realtor",
    description: "Seller strategy and neighborhood guidance for Creekside Park homes for sale in The Woodlands and Tomball-area market.",
    hero: "Creekside Park appeals to buyers who want newer construction, village amenities, parks, and convenient access. The listing should connect those details to value.",
    area: "Creekside Park, The Woodlands",
    bullets: ["Move-up buyer positioning", "Amenity and school-zone context", "Preparation before launch"],
    sections: [
      { title: "Know the buyer pool", copy: "Creekside Park buyers often compare floor plans, age, updates, school access, commute, and neighborhood amenities." },
      { title: "Preparation pays", copy: "A cleaner launch can reduce buyer objections and make the home easier to compare favorably against active competition." },
      { title: "Ready for IDX", copy: "The page can support active Creekside Park listings once approved data is connected." },
    ],
    faqs: [
      { question: "Is Creekside Park in The Woodlands?", answer: "Creekside Park is one of The Woodlands' villages and is closely tied to the Tomball-area market as well." },
      { question: "What should sellers prepare first?", answer: "Start with pricing context, curb appeal, repairs, photography readiness, and the story buyers need to understand quickly." },
    ],
  },
  {
    slug: "selling-a-home-in-the-woodlands",
    eyebrow: "Selling A Home In The Woodlands",
    title: "Selling a home in The Woodlands starts with strategy, not guesswork.",
    metaTitle: "Selling A Home In The Woodlands | Josh Wisdom Realtor",
    description: "Learn how Josh Wisdom Realtor helps The Woodlands homeowners price, prepare, market, and negotiate a stronger home sale.",
    hero: "The best listing outcomes are usually created before the home hits the market. Josh helps you understand value, timing, preparation, and buyer psychology.",
    area: "The Woodlands, TX",
    bullets: ["Pre-listing consultation", "Pricing and preparation plan", "Offer strategy and negotiation"],
    sections: [
      { title: "Start with value", copy: "A true pricing review looks at recent sales, active competition, upgrades, condition, lot, timing, and buyer demand in your specific area." },
      { title: "Prepare what matters", copy: "Not every improvement pays. The goal is to identify the few changes most likely to improve buyer confidence or reduce objections." },
      { title: "Negotiate the whole offer", copy: "The strongest offer is not always the highest headline price. Terms, financing strength, appraisal risk, option periods, and closing timelines matter." },
    ],
    faqs: [
      { question: "How long does it take to prepare a Woodlands home for sale?", answer: "Many homes can be prepared in a few weeks, but starting 30 to 90 days early gives more control over presentation and timing." },
      { question: "Can Josh give a home value before I am ready to list?", answer: "Yes. A valuation consultation can help you decide whether selling now, later, or after improvements makes the most sense." },
    ],
  },
];

export function SeoLandingPage({ page }: { page: SeoLanding }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.description} />
        <link rel="canonical" href={`https://thewoodlandslistingagent.com/${page.slug}`} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="bg-black py-20 text-white md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
              <MapPin className="h-4 w-4" />
              {page.area}
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/50">{page.eyebrow}</p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-6xl">{page.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">{page.hero}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild className="h-12 rounded-none bg-amber-500 px-7 text-black hover:bg-amber-400">
                <Link href="/home-valuation">Get Home Value</Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-none border-white bg-transparent px-7 text-white hover:bg-white hover:text-black">
                <Link href="/contact">Schedule Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.75fr_1.25fr] md:px-6">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-600">What Josh Focuses On</p>
            <div className="mt-6 space-y-4">
              {page.bullets.map((bullet) => (
                <div key={bullet} className="flex gap-3 border-t border-neutral-200 pt-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-amber-600" />
                  <span className="font-medium text-black">{bullet}</span>
                </div>
              ))}
            </div>
          </aside>
          <div className="space-y-10">
            {page.sections.map((section) => (
              <article key={section.title} className="border-b border-neutral-200 pb-10">
                <h2 className="text-3xl font-semibold text-black">{section.title}</h2>
                <p className="mt-4 text-lg leading-8 text-neutral-700">{section.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-100 py-16 md:py-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2 md:px-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-600">Questions</p>
            <h2 className="mt-4 text-4xl font-semibold text-black">Common seller questions.</h2>
            <div className="mt-8 space-y-5">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="bg-white p-6">
                  <h3 className="text-xl font-semibold text-black">{faq.question}</h3>
                  <p className="mt-3 leading-7 text-neutral-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          <LeadForm
            leadType="valuation"
            showAddress
            title="Ask Josh for a local value review"
            subtitle={`Get a seller-focused opinion for ${page.area}.`}
            buttonText="Request Valuation"
          />
        </div>
      </section>
    </>
  );
}