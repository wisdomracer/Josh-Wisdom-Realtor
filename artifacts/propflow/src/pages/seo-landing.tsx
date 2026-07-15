import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowRight, BadgeCheck, CheckCircle2, Home, Landmark, MapPin, Search, Trees } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { PhotoCredit, ResponsiveLocationImage } from "@/components/location-hero";
import { absoluteUrl } from "@/config/site";
import { photoForSeoSlug } from "@/config/location-photos";

export type SeoLanding = {
  slug: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  hero: string;
  area: string;
  intent: "seller" | "luxury" | "advisory";
  bullets: string[];
  sections: { title: string; copy: string }[];
  faqs: { question: string; answer: string }[];
};

export const seoLandingPages: SeoLanding[] = [
  {
    slug: "the-woodlands-listing-agent",
    intent: "seller",
    eyebrow: "Private Listing Representation",
    title: "Private listing representation in The Woodlands.",
    metaTitle: "The Woodlands Listing Agent | Josh Wisdom Realtor",
    description: "The Woodlands listing agent for private seller representation, property-specific pricing, preparation, presentation, launch strategy, and negotiation.",
    hero: "A successful sale should feel intentional before the sign goes up. Josh helps Woodlands homeowners establish the position, prepare selectively, and enter the market with clarity, discretion, and a disciplined launch plan.",
    area: "The Woodlands, TX",
    bullets: ["Village-level value and competition review", "Controlled preparation and launch plan", "Offer strategy defined before negotiation"],
    sections: [
      { title: "Pricing built around local context", copy: "The Woodlands is not one flat market. Carlton Woods, East Shore, Creekside Park, Sterling Ridge, Alden Bridge, and Panther Creek each attract different buyer priorities and different pricing pressure." },
      { title: "Premium presentation", copy: "The first showing usually happens online. Josh's listing plan focuses on photography readiness, listing description, neighborhood context, and a launch sequence built to create confidence." },
      { title: "Seller-first negotiation", copy: "A strong sale depends on more than price. Terms, timing, contingencies, appraisal risk, and buyer strength all shape the actual outcome." },
    ],
    faqs: [
      { question: "What does a listing agent do for a Woodlands seller?", answer: "A strong listing agent helps price, prepare, market, negotiate, and manage the sale from launch through closing while protecting the seller's leverage." },
      { question: "When should I talk to Josh before selling?", answer: "Ideally 30 to 90 days before listing so pricing, repairs, photos, and launch timing can be handled without rushing." },
    ],
  },
  {
    slug: "the-woodlands-realtor",
    intent: "advisory",
    eyebrow: "Private Real Estate Advisory",
    title: "Private real estate guidance for The Woodlands.",
    metaTitle: "The Woodlands Realtor | Josh Wisdom Realtor",
    description: "Josh Wisdom Realtor serves The Woodlands, Tomball, and Greater Houston with seller-focused real estate guidance and local market knowledge.",
    hero: "Begin with the property, the timing, and the decision—not a generic market pitch. Josh organizes the relevant local context so buyers and sellers can move with a clearer position.",
    area: "The Woodlands, Tomball, Spring, Magnolia, and Greater Houston",
    bullets: ["Seller positioning", "Buyer and relocation strategy", "Village-level comparisons"],
    sections: [
      { title: "Property-specific decisions", copy: "A home near the Waterway should not be evaluated like a golf-course estate, a Creekside Park property, or Tomball acreage. Setting, condition, alternatives, and buyer expectations change the comparison." },
      { title: "Clear advice without a forced timeline", copy: "The conversation starts with goals, timing, and facts. Josh's role is to surface tradeoffs, organize the next decision, and help you move only when the strategy supports it." },
      { title: "Focused locally. Connected regionally.", copy: "The primary focus is The Woodlands and Tomball, with service extending through Spring, Magnolia, Conroe, Cypress, Houston, Klein, Montgomery, Kingwood, Katy, Sugar Land, and nearby communities when the client brief requires it." },
    ],
    faqs: [
      { question: "Does Josh advise beyond The Woodlands?", answer: "Yes. The primary focus is The Woodlands and Tomball, with broader Greater Houston coverage when the search or sale requires it." },
      { question: "Can Josh help with both buying and selling?", answer: "Yes. Josh provides seller representation as well as buyer, relocation, and luxury-property guidance." },
    ],
  },
  {
    slug: "the-woodlands-luxury-homes",
    intent: "luxury",
    eyebrow: "Private Luxury Representation",
    title: "Private representation for distinctive Woodlands homes.",
    metaTitle: "The Woodlands Luxury Homes | Josh Wisdom Realtor",
    description: "Luxury listing and buyer guidance for The Woodlands estates, custom homes, golf-course properties, and premium neighborhoods.",
    hero: "Distinctive properties require a sharper value narrative, controlled presentation, and an exposure plan calibrated to the seller—not a louder version of ordinary marketing.",
    area: "The Woodlands luxury market",
    bullets: ["Property-specific positioning", "Presentation and launch planning", "Qualified, controlled exposure"],
    sections: [
      { title: "Position before promotion", copy: "Photography, preparation, copy, and launch sequencing should establish the property's value narrative before a qualified buyer requests access." },
      { title: "Value is property-specific", copy: "Architecture, lot placement, privacy, construction, condition, setting, and competing alternatives can carry different weight from one distinctive home to another." },
      { title: "Control the exposure", copy: "The right plan balances reach with discretion, buyer qualification, showing management, and consistent communication of the property's position." },
    ],
    faqs: [
      { question: "What makes selling a distinctive home different?", answer: "The buyer pool is narrower and the comparison is more property-specific, placing greater weight on preparation, qualified exposure, privacy, and negotiation of the complete offer." },
      { question: "Can Josh advise before photos or staging?", answer: "Yes. A pre-listing consultation can identify which improvements and presentation details are likely to matter most." },
    ],
  },
  {
    slug: "communities/carlton-woods",
    intent: "luxury",
    eyebrow: "Carlton Woods Real Estate",
    title: "Carlton Woods real estate guidance for buyers and sellers.",
    metaTitle: "Carlton Woods Real Estate Guide | Josh Wisdom Realtor",
    description: "Seller and buyer guidance for Carlton Woods estates, golf properties, and luxury real estate in The Woodlands, Texas.",
    hero: "Carlton Woods buyers expect privacy, architecture, golf-club lifestyle, and estate-level presentation. Your listing should make those strengths clear from day one.",
    area: "Carlton Woods, The Woodlands",
    bullets: ["Estate home guidance", "Golf and gated-community context", "Luxury marketing"],
    sections: [
      { title: "Premium buyer expectations", copy: "Carlton Woods buyers compare finishes, lot setting, privacy, club proximity, and long-term prestige." },
      { title: "Launch with intention", copy: "The listing should be prepared with strong photography, measured copy, and a plan for qualified attention." },
      { title: "Property-specific guidance", copy: "Estate lots, golf-course settings, architecture, updates, and club proximity can shape value differently from one property to the next." },
    ],
    faqs: [
      { question: "Is Carlton Woods a luxury market?", answer: "Yes. Carlton Woods is one of The Woodlands' most recognized luxury and gated-community markets." },
      { question: "Should I list publicly or quietly?", answer: "That depends on your goals, privacy needs, timeline, and buyer pool. Josh can help evaluate the right exposure strategy." },
    ],
  },
  {
    slug: "communities/east-shore",
    intent: "seller",
    eyebrow: "East Shore Real Estate",
    title: "East Shore listing guidance for lakefront and Waterway-area sellers.",
    metaTitle: "East Shore Real Estate Guide | Josh Wisdom Realtor",
    description: "Seller and buyer guidance for East Shore real estate near Lake Woodlands, Market Street, and The Woodlands Waterway.",
    hero: "East Shore buyers often value convenience, architecture, walkability, water access, and low-maintenance luxury. The marketing should make that lifestyle clear.",
    area: "East Shore, The Woodlands",
    bullets: ["Lifestyle-focused marketing", "Waterway and Market Street guidance", "Premium buyer copy"],
    sections: [
      { title: "Lifestyle is the product", copy: "East Shore listings should communicate more than square footage. Walkability, dining, lake access, and the feel of the neighborhood all matter." },
      { title: "Online first impressions", copy: "Strong visuals and concise copy help buyers understand the East Shore value proposition quickly." },
      { title: "Property and location context", copy: "Architecture, water proximity, maintenance profile, and exact position within East Shore can all affect the comparison." },
    ],
    faqs: [
      { question: "What attracts buyers to East Shore?", answer: "Many buyers are drawn to Lake Woodlands access, Market Street proximity, walkability, and luxury lock-and-leave living." },
      { question: "How should East Shore homes be marketed?", answer: "The marketing should emphasize lifestyle, setting, architecture, and convenience alongside property features." },
    ],
  },
  {
    slug: "communities/creekside-park",
    intent: "seller",
    eyebrow: "Creekside Park Real Estate",
    title: "Creekside Park real estate needs local context.",
    metaTitle: "Creekside Park Real Estate Guide | Josh Wisdom Realtor",
    description: "Seller strategy and buyer guidance for Creekside Park real estate in The Woodlands and Tomball-area market.",
    hero: "Creekside Park appeals to buyers who want newer construction, village amenities, parks, and convenient access. The listing should connect those details to value.",
    area: "Creekside Park, The Woodlands",
    bullets: ["Move-up buyer guidance", "Amenity and school-zone context", "Preparation before launch"],
    sections: [
      { title: "Know the buyer pool", copy: "Creekside Park buyers often compare floor plans, age, updates, school access, commute, and neighborhood amenities." },
      { title: "Preparation pays", copy: "A cleaner launch can reduce buyer objections and make the home easier to compare favorably against active competition." },
      { title: "Compare the right details", copy: "Section, builder, floor plan, age, lot, updates, and nearby competition can create meaningful differences within the village." },
    ],
    faqs: [
      { question: "Is Creekside Park in The Woodlands?", answer: "Creekside Park is one of The Woodlands' villages and is closely tied to the Tomball-area market as well." },
      { question: "What should sellers prepare first?", answer: "Start with pricing context, curb appeal, repairs, photography readiness, and the story buyers need to understand quickly." },
    ],
  },
  {
    slug: "magnolia-realtor",
    intent: "advisory",
    eyebrow: "Magnolia Property Advisory",
    title: "More land changes more than the view.",
    metaTitle: "Magnolia Realtor | Josh Wisdom Realtor",
    description: "Work with Josh Wisdom Realtor for Magnolia homes, acreage properties, new construction, and seller guidance north of Houston.",
    hero: "Acreage, newer communities, utilities, improvements, restrictions, and daily routes create different ownership questions. The comparison should account for all of them before price alone drives the search.",
    area: "Magnolia, TX",
    bullets: ["Acreage ownership context", "Builder and resale comparison", "Property-specific value review"],
    sections: [
      { title: "Space comes with obligations", copy: "Acreage buyers should compare access, utilities, drainage context, restrictions, improvements, outbuildings, upkeep, and the flexibility the property may offer later." },
      { title: "Builders reshape the resale comparison", copy: "Nearby inventory, incentives, warranties, finish packages, and completion timelines can influence how a resale home must be positioned." },
      { title: "Test the complete fit", copy: "The useful shortlist balances the property, route, ownership cost, expected work, and the alternatives available at the same price." },
    ],
    faqs: [
      { question: "What deserves extra review with Magnolia acreage?", answer: "Access, utilities, drainage context, restrictions, improvements, maintenance, and future flexibility should be reviewed property by property." },
      { question: "How should a Magnolia resale be compared with new construction?", answer: "Compare complete cost, incentives, warranties, lot and location differences, finish level, timing, and the work a buyer would still need to complete." },
    ],
  },
  {
    slug: "spring-realtor",
    intent: "advisory",
    eyebrow: "Spring Property Advisory",
    title: "Spring is too broad for a single market answer.",
    metaTitle: "Spring Realtor | Josh Wisdom Realtor",
    description: "Josh Wisdom Realtor helps Spring TX buyers and sellers with local guidance, home valuation, and north Houston market insight.",
    hero: "Established neighborhoods, newer communities, school boundaries, municipal jurisdictions, and daily routes can change within a short drive. The advice should be specific to the property and its real alternatives.",
    area: "Spring, TX",
    bullets: ["Property and neighborhood comparison", "Seller positioning", "Buyer decision brief"],
    sections: [
      { title: "Start with the exact property", copy: "Neighborhood, jurisdiction, tax profile, school boundary, condition, age, and active competition should shape the analysis—not a broad Spring average." },
      { title: "Measure convenience honestly", copy: "Test the routes to work, school, healthcare, shopping, and The Woodlands at the times they will actually be used." },
      { title: "Compare the future buyer's options", copy: "A sound purchase or sale strategy considers what else the next buyer can choose at the same price and why this property should hold its position." },
    ],
    faqs: [
      { question: "Why is property-specific context important in Spring?", answer: "A Spring address can span different neighborhoods, jurisdictions, tax profiles, school boundaries, and access patterns, so broad averages can conceal material differences." },
      { question: "What should a Spring seller compare before pricing?", answer: "Recent sales, current competition, condition, lot, jurisdiction, buyer alternatives, and the likely objections specific to the property." },
    ],
  },
  {
    slug: "conroe-realtor",
    intent: "advisory",
    eyebrow: "Conroe Property Advisory",
    title: "Compare the lake, the land, and the route.",
    metaTitle: "Conroe Realtor | Josh Wisdom Realtor",
    description: "Josh Wisdom Realtor helps Conroe TX buyers and sellers with local guidance, home valuation, and luxury property conversations.",
    hero: "Lake-oriented properties, acreage, established neighborhoods, and newer communities answer different briefs. Josh helps organize the ownership details and daily tradeoffs behind each one.",
    area: "Conroe, TX",
    bullets: ["Lake and acreage context", "Builder and resale comparison", "Property-specific positioning"],
    sections: [
      { title: "Water access is not one feature", copy: "View, frontage, dock potential, restrictions, flood context, maintenance, and the route to daily destinations can change the value proposition materially." },
      { title: "Land changes the diligence", copy: "Acreage calls for closer review of access, utilities, improvements, drainage context, restrictions, upkeep, and future use." },
      { title: "New and resale compete differently", copy: "Builder incentives, warranties, completion timing, lot position, finish level, and expected work belong in the same comparison as headline price." },
    ],
    faqs: [
      { question: "What should a buyer review near Lake Conroe?", answer: "The exact water relationship, restrictions, flood context, improvements, maintenance, access, and complete ownership cost should be reviewed property by property." },
      { question: "How should Conroe new construction be compared with resale?", answer: "Compare incentives, warranties, finish level, lot and location differences, completion timing, taxes, fees, and the work still required after closing." },
    ],
  },
  {
    slug: "shenandoah-realtor",
    intent: "advisory",
    eyebrow: "Shenandoah Property Advisory",
    title: "In Shenandoah, access is part of the property story.",
    metaTitle: "Shenandoah Realtor | Josh Wisdom Realtor",
    description: "Josh Wisdom Realtor helps Shenandoah TX buyers and sellers with local guidance, home valuation, and north Houston market insight.",
    hero: "Proximity to medical, retail, dining, The Woodlands, and major routes can be meaningful—but the exact neighborhood, street, condition, and competing alternatives still determine the decision.",
    area: "Shenandoah, TX",
    bullets: ["Access and route comparison", "Seller positioning", "Property-specific buyer brief"],
    sections: [
      { title: "Translate access into daily value", copy: "The useful story is not a list of nearby landmarks. It is how the location changes recurring trips, convenience, and the buyer's alternatives." },
      { title: "Keep the property in the foreground", copy: "Condition, lot, street position, updates, ownership cost, and active competition still decide whether the home earns its asking position." },
      { title: "Compare beyond the city line", copy: "A sound search should include the relevant Woodlands and north Houston alternatives rather than treating the municipal boundary as the decision." },
    ],
    faqs: [
      { question: "What makes Shenandoah distinct in a Woodlands-area search?", answer: "Its location can offer practical access to medical, retail, dining, and commuter routes, while property type, jurisdiction, taxes, and exact street position still require direct comparison." },
      { question: "Should a Shenandoah search include Woodlands alternatives?", answer: "Yes. Comparing the relevant nearby options helps clarify the tradeoff between property, access, ownership cost, and setting." },
    ],
  },  {
    slug: "selling-a-home-in-the-woodlands",
    intent: "seller",
    eyebrow: "Selling A Home In The Woodlands",
    title: "Selling a home in The Woodlands starts with strategy, not guesswork.",
    metaTitle: "Selling A Home In The Woodlands | Josh Wisdom Realtor",
    description: "Learn how Josh Wisdom Realtor helps The Woodlands homeowners price, prepare, market, and negotiate a stronger home sale.",
    hero: "The best listing outcomes are usually created before the home hits the market. Josh helps you understand value, timing, preparation, and buyer psychology.",
    area: "The Woodlands, TX",
    bullets: ["Pre-listing consultation", "Pricing and preparation plan", "Offer strategy and negotiation"],
    sections: [
      { title: "Start with value", copy: "A true pricing review looks at recent sales, active competition, upgrades, condition, lot, timing, and buyer interest in your specific area." },
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
  const heroPhoto = photoForSeoSlug(page.slug);
  const isSeller = page.intent === "seller" || page.intent === "luxury";
  const isLuxury = page.intent === "luxury";
  const isWoodlandsListingPage = page.slug === "the-woodlands-listing-agent";
  const primaryAction = isWoodlandsListingPage
    ? { href: "#private-consultation", label: "Request Seller Consultation" }
    : isSeller
    ? { href: "/home-valuation", label: isLuxury ? "Request Private Consultation" : "Request Private Valuation" }
    : { href: "/contact", label: "Request Private Consultation" };
  const secondaryAction = isWoodlandsListingPage
    ? { href: "/sell", label: "View Seller Strategy" }
    : isSeller
    ? { href: "/contact", label: "Discuss the Property" }
    : { href: "/communities", label: "Explore Area Guides" };
  const form = isWoodlandsListingPage
    ? {
        leadType: "selling" as const,
        title: "Request a private seller consultation",
        subtitle: "Share the property, timing, and decision you are considering in The Woodlands. Josh will review the request personally.",
        buttonText: "Request Seller Consultation",
        showAddress: true,
        showArea: false,
      }
    : isSeller
    ? {
        leadType: isLuxury ? "luxury" as const : "valuation" as const,
        title: isLuxury ? "Request a private property consultation" : "Request a private value review",
        subtitle: `Share the property, timing, and goals you are considering in ${page.area}.`,
        buttonText: isLuxury ? "Request Private Consultation" : "Request Private Valuation",
        showAddress: true,
        showArea: false,
      }
    : {
        leadType: "general" as const,
        title: "Start a private local conversation",
        subtitle: `Share the decision, timing, and area you are considering around ${page.area}.`,
        buttonText: "Request Local Consultation",
        showAddress: false,
        showArea: true,
      };
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": absoluteUrl(`/${page.slug}#service`),
        name: page.title,
        description: page.description,
        serviceType: isSeller ? "Residential real estate seller representation" : "Residential real estate advisory",
        areaServed: { "@type": "AdministrativeArea", name: page.area },
        provider: {
          "@type": "RealEstateAgent",
          "@id": "https://joshwisdomrealtor.com/#agent",
          name: "Josh Wisdom Realtor",
          url: "https://joshwisdomrealtor.com/",
        },
      },
      {
        "@type": "FAQPage",
        "@id": absoluteUrl(`/${page.slug}#questions`),
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{page.metaTitle}</title>
        <meta name="description" content={page.description} />
        <link rel="canonical" href={absoluteUrl(`/${page.slug}`)} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="overflow-hidden bg-[#050505] text-white">
        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[0.98fr_1.02fr]">
          <div className="relative flex items-center px-5 py-20 md:px-9 md:py-24 lg:px-12 lg:py-28">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:76px_76px]" />
            <div className="relative max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">
              <MapPin className="h-4 w-4" />
              {page.area}
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/50">{page.eyebrow}</p>
            <h1 className="mt-6 font-serif text-[clamp(3rem,5.1vw,6.25rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-white">{page.title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76 md:text-xl">{page.hero}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild className="h-14 rounded-none bg-[#c69a44] px-8 text-[11px] font-bold uppercase tracking-[0.24em] text-black hover:bg-[#e1c06f]">
                {primaryAction.href.startsWith("#") ? (
                  <a href={primaryAction.href}>{primaryAction.label}</a>
                ) : (
                  <Link href={primaryAction.href}>{primaryAction.label}</Link>
                )}
              </Button>
              <Button asChild variant="outline" className="h-14 rounded-none border-white bg-transparent px-8 text-[11px] font-bold uppercase tracking-[0.24em] text-white hover:bg-white hover:text-black">
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            </div>
          </div>
          </div>
          <figure className="relative min-h-[360px] overflow-hidden lg:min-h-[720px]">
            <div
              className="absolute inset-0"
              style={{
                transform: heroPhoto.cropScale ? `scale(${heroPhoto.cropScale})` : undefined,
                transformOrigin: heroPhoto.cropOrigin,
              }}
            >
              <ResponsiveLocationImage photo={heroPhoto} className="h-full w-full object-cover" sizes="(min-width: 1024px) 51vw, 100vw" loading="eager" fetchPriority="high" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
            <PhotoCredit photo={heroPhoto} />
          </figure>
        </div>
      </section>

      <section className="bg-[#f8f5ef] py-16 text-black md:py-24">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 md:px-9 lg:grid-cols-[0.72fr_1.28fr]">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#6f4b0d]">Advisory Focus</p>
            <div className="mt-7 space-y-4">
              {page.bullets.map((bullet) => (
                <div key={bullet} className="flex gap-3 border-t border-black/15 pt-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#9b6d1d]" />
                  <span className="font-medium text-black">{bullet}</span>
                </div>
              ))}
            </div>
          </aside>
          <div className="space-y-10">
            {page.sections.map((section) => (
              <article key={section.title} className="border-b border-neutral-200 pb-10">
                <h2 className="font-serif text-4xl font-normal leading-tight text-black">{section.title}</h2>
                <p className="mt-4 text-lg leading-8 text-neutral-700">{section.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="private-consultation" className="scroll-mt-24 bg-white py-16 text-black md:py-24">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 md:px-9 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#6f4b0d]">Questions</p>
            <h2 className="mt-4 font-serif text-5xl font-semibold leading-tight text-black">{isSeller ? "Questions sellers ask." : "Questions to clarify early."}</h2>
            <div className="mt-8 space-y-5">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="border border-neutral-200 bg-[#f8f5ef] p-6">
                  <h3 className="text-xl font-semibold text-black">{faq.question}</h3>
                  <p className="mt-3 leading-7 text-neutral-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
          <LeadForm
            leadType={form.leadType}
            showAddress={form.showAddress}
            showArea={form.showArea}
            title={form.title}
            subtitle={form.subtitle}
            buttonText={form.buttonText}
          />
        </div>
      </section>
    </>
  );
}
