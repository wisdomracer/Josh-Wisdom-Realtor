import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowRight, BadgeCheck, Bell, Calculator, Home, Mail, Map, Newspaper, PlayCircle, Search, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";

type Feature = {
  slug: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  icon: typeof Search;
  leadType: "general" | "buying" | "selling" | "valuation" | "relocation" | "consultation" | "luxury" | "new_construction";
  cta: string;
  points: string[];
  sections: { title: string; copy: string }[];
};

export const featurePages: Feature[] = [
  {
    slug: "featured-listings",
    eyebrow: "Featured Listings",
    title: "Featured homes in The Woodlands and north Houston.",
    metaTitle: "Featured Listings | Josh Wisdom Realtor",
    description: "Request current featured listings in The Woodlands, Carlton Woods, East Shore, Creekside Park, Tomball, Spring, Magnolia, and north Houston.",
    icon: Home,
    leadType: "buying",
    cta: "Request Current Listings",
    points: ["The Woodlands and north Houston", "Luxury and move-up homes", "Current availability by request"],
    sections: [
      { title: "Current inventory changes quickly", copy: "Instead of showing stale listings, Josh can pull current homes that match your area, price range, timeline, and lifestyle priorities." },
      { title: "Search with context", copy: "Featured homes should be compared by condition, community, commute, schools, taxes, and resale outlook." },
      { title: "Private shortlist", copy: "Ask for a focused shortlist instead of scrolling through homes that do not fit your goals." },
    ],
  },
  {
    slug: "recently-sold",
    eyebrow: "Recently Sold",
    title: "See what nearby homes actually sold for before you price yours.",
    metaTitle: "Recently Sold Homes | Josh Wisdom Realtor",
    description: "Get a focused sold-comps review for your neighborhood, including relevant recent sales, pricing patterns, and what they may mean for your home.",
    icon: TrendingUp,
    leadType: "valuation",
    cta: "Request Sold Comps",
    points: ["Relevant sold comps", "Neighborhood-by-neighborhood context", "Pricing takeaways for sellers"],
    sections: [
      { title: "What Josh reviews", copy: "Recent sale price, list-to-sale movement, days on market, condition, lot, upgrades, floor plan, and neighborhood fit." },
      { title: "Popular comp areas", copy: "The Woodlands, Carlton Woods, East Shore, Creekside Park, Tomball, Spring, Magnolia, Conroe, and Shenandoah." },
      { title: "What you get", copy: "A clearer pricing conversation before you list, including which sales matter, which do not, and what buyers are likely to compare." },
    ],
  },
  {
    slug: "map-search",
    eyebrow: "Map Search",
    title: "Search homes by community, commute, and lifestyle.",
    metaTitle: "Map Search | The Woodlands Homes | Josh Wisdom Realtor",
    description: "Request a map-based home search for The Woodlands, Tomball, Spring, Magnolia, Conroe, Shenandoah, and north Houston.",
    icon: Map,
    leadType: "buying",
    cta: "Start Map Search",
    points: ["Community boundaries", "Commute and lifestyle", "Golf, water, acreage, schools"],
    sections: [
      { title: "Area matters", copy: "A map search helps compare villages, commute routes, nearby amenities, and lifestyle fit." },
      { title: "Search by what matters", copy: "Josh can help narrow by golf, water access, acreage, new construction, schools, or low-maintenance living." },
      { title: "Focused tours", copy: "Better search criteria means better showings and fewer wasted appointments." },
    ],
  },
  {
    slug: "property-alerts",
    eyebrow: "Property Alerts",
    title: "Get notified when the right home hits the market.",
    metaTitle: "Property Alerts | Josh Wisdom Realtor",
    description: "Set up property alerts for homes in The Woodlands, Tomball, Spring, Magnolia, Conroe, and north Houston.",
    icon: Bell,
    leadType: "buying",
    cta: "Create Property Alert",
    points: ["Area and price alerts", "Luxury and move-up homes", "Buyer consultation"],
    sections: [
      { title: "Speed helps", copy: "Good homes can move quickly. A focused alert keeps your search active without requiring constant scrolling." },
      { title: "Better criteria", copy: "Alerts work best when they are based on the lifestyle and property details that truly matter to you." },
      { title: "Human filter", copy: "Josh can help review alerts so you know which homes are worth attention." },
    ],
  },
  {
    slug: "mortgage-estimate",
    eyebrow: "Mortgage Estimate",
    title: "Estimate your monthly payment before you tour.",
    metaTitle: "Mortgage Estimate | Josh Wisdom Realtor",
    description: "Use a quick mortgage payment estimator for homes in The Woodlands, Tomball, Spring, Magnolia, Conroe, or north Houston, then ask Josh for local tax and HOA context.",
    icon: Calculator,
    leadType: "buying",
    cta: "Use Payment Calculator",
    points: ["Payment comfort", "Taxes and insurance", "Lender conversation"],
    sections: [
      { title: "Payment matters more than price", copy: "A purchase price only tells part of the story. Taxes, insurance, down payment, rate, and HOA dues all affect comfort." },
      { title: "Prepare before touring", copy: "Understanding payment range helps you make better decisions before falling in love with a home." },
      { title: "Connect with a lender", copy: "Josh can help coordinate the next conversation with your preferred lender or a trusted local lender." },
    ],
  },
  {
    slug: "affordability-calculator",
    eyebrow: "Affordability",
    title: "Find a comfortable price range before you search.",
    metaTitle: "Affordability Calculator | Josh Wisdom Realtor",
    description: "Request affordability guidance for buying a home in The Woodlands, Tomball, Spring, Magnolia, Conroe, or north Houston.",
    icon: Calculator,
    leadType: "buying",
    cta: "Discuss Affordability",
    points: ["Comfortable budget", "Monthly payment", "Area and home type"],
    sections: [
      { title: "Comfort comes first", copy: "A strong home search starts with a monthly payment range that fits your life." },
      { title: "Compare areas", copy: "Taxes, HOA dues, insurance, and home age can vary by neighborhood and can change affordability." },
      { title: "Search smarter", copy: "A clear budget helps Josh build a better search and avoid homes that create unnecessary pressure." },
    ],
  },
  {
    slug: "seller-net-sheet",
    eyebrow: "Seller Net Sheet",
    title: "Estimate what you may walk away with after selling.",
    metaTitle: "Seller Net Sheet | Josh Wisdom Realtor",
    description: "Request a seller net sheet and estimated proceeds review for selling a home in The Woodlands or greater Houston.",
    icon: Calculator,
    leadType: "valuation",
    cta: "Request Seller Net Sheet",
    points: ["Estimated sale price", "Payoff and costs", "Net proceeds review"],
    sections: [
      { title: "Net matters", copy: "The list price is not the number you keep. Payoff, fees, repairs, concessions, and timing all matter." },
      { title: "Plan before listing", copy: "A net sheet helps you compare selling now, selling later, or preparing the home first." },
      { title: "Discuss scenarios", copy: "Josh can help compare conservative, expected, and stronger sale scenarios." },
    ],
  },
  {
    slug: "video-library",
    eyebrow: "Video Library",
    title: "Local real estate videos from Josh Wisdom.",
    metaTitle: "Video Library | Josh Wisdom Realtor",
    description: "Watch local real estate videos and request Woodlands-area guidance from Josh Wisdom Realtor.",
    icon: PlayCircle,
    leadType: "general",
    cta: "Ask Josh a Question",
    points: ["Market updates", "Seller education", "Community guidance"],
    sections: [
      { title: "Video builds trust", copy: "Video is a useful way to explain pricing, preparation, offers, neighborhoods, and common real estate questions." },
      { title: "Local topics", copy: "The best videos answer specific questions about The Woodlands, Tomball, Spring, Magnolia, Conroe, and north Houston." },
      { title: "Request a topic", copy: "Ask Josh for a video or answer on the real estate question you are working through." },
    ],
  },
  {
    slug: "instagram-feed",
    eyebrow: "Instagram Feed",
    title: "Follow local market moments and community updates.",
    metaTitle: "Instagram Feed | Josh Wisdom Realtor",
    description: "Follow Josh Wisdom Realtor for local real estate updates, community posts, seller tips, and Woodlands-area content.",
    icon: Newspaper,
    leadType: "general",
    cta: "Connect With Josh",
    points: ["Community updates", "Seller tips", "Local real estate content"],
    sections: [
      { title: "Social should support trust", copy: "Useful social content helps people understand local real estate, not just scroll past pretty posts." },
      { title: "Local focus", copy: "The right content should speak to The Woodlands, Tomball, north Houston, and the questions real clients ask." },
      { title: "Stay connected", copy: "Reach out to Josh for the latest local guidance or to connect on social channels." },
    ],
  },
  {
    slug: "google-reviews",
    eyebrow: "Google Reviews",
    title: "Client reviews and reputation for Josh Wisdom Realtor.",
    metaTitle: "Google Reviews | Josh Wisdom Realtor",
    description: "Learn how to review Josh Wisdom Realtor or request client references and reputation information.",
    icon: Star,
    leadType: "general",
    cta: "Contact Josh",
    points: ["Review guidance", "Client references", "Reputation questions"],
    sections: [
      { title: "Reviews should be real", copy: "This page is reserved for verified review information and client feedback, not invented testimonials." },
      { title: "Ask for references", copy: "If you are considering working with Josh, ask for the most relevant proof for your situation." },
      { title: "Leave feedback", copy: "Past clients can contact Josh for the correct review link." },
    ],
  },
  {
    slug: "newsletter",
    eyebrow: "Newsletter",
    title: "Get local real estate updates from Josh Wisdom.",
    metaTitle: "Newsletter | Josh Wisdom Realtor",
    description: "Join Josh Wisdom Realtor's local real estate updates for The Woodlands, Tomball, Spring, Magnolia, Conroe, and north Houston.",
    icon: Mail,
    leadType: "general",
    cta: "Join Updates",
    points: ["Market notes", "Seller tips", "Community updates"],
    sections: [
      { title: "Useful updates", copy: "A good real estate newsletter should help you understand timing, value, local movement, and opportunities." },
      { title: "Local coverage", copy: "Updates can include The Woodlands, Tomball, Spring, Magnolia, Conroe, Shenandoah, and north Houston." },
      { title: "No pressure", copy: "Use the form to ask for updates or a one-time answer to your current question." },
    ],
  },
];


function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0);
}

function NumberField({ label, value, onChange, prefix, suffix, step = 1 }: { label: string; value: number; onChange: (value: number) => void; prefix?: string; suffix?: string; step?: number }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-600">{label}</span>
      <div className="flex h-13 border border-black/15 bg-white">
        {prefix && <span className="grid w-10 place-items-center border-r border-black/10 text-neutral-500">{prefix}</span>}
        <input
          type="number"
          value={value}
          step={step}
          onChange={(event) => onChange(Number(event.target.value))}
          className="h-12 min-w-0 flex-1 bg-transparent px-4 text-base outline-none"
        />
        {suffix && <span className="grid w-12 place-items-center border-l border-black/10 text-neutral-500">{suffix}</span>}
      </div>
    </label>
  );
}

function MortgageEstimator() {
  const [price, setPrice] = useState(750000);
  const [downPayment, setDownPayment] = useState(150000);
  const [rate, setRate] = useState(6.75);
  const [term, setTerm] = useState(30);
  const [taxRate, setTaxRate] = useState(2.1);
  const [insurance, setInsurance] = useState(4200);
  const [hoa, setHoa] = useState(125);

  const results = useMemo(() => {
    const loanAmount = Math.max(price - downPayment, 0);
    const months = Math.max(term * 12, 1);
    const monthlyRate = Math.max(rate, 0) / 100 / 12;
    const principalInterest = monthlyRate === 0 ? loanAmount / months : loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const monthlyTaxes = Math.max(price * (taxRate / 100) / 12, 0);
    const monthlyInsurance = Math.max(insurance / 12, 0);
    const monthlyHoa = Math.max(hoa, 0);
    return {
      loanAmount,
      principalInterest,
      monthlyTaxes,
      monthlyInsurance,
      monthlyHoa,
      total: principalInterest + monthlyTaxes + monthlyInsurance + monthlyHoa,
    };
  }, [price, downPayment, rate, term, taxRate, insurance, hoa]);

  return (
    <section id="calculator" className="bg-white py-16 text-black md:py-24">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-5 md:px-9 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9b6d1d]">Actual Tool</p>
          <h2 className="mt-6 font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.025em] md:text-7xl">Run the payment before you ask for help.</h2>
          <p className="mt-7 text-lg leading-8 text-neutral-700">Adjust price, down payment, rate, taxes, insurance, and HOA dues. This is an estimate only, not a lender quote, but it gives you a real starting point.</p>
        </div>
        <div className="border border-black/15 bg-[#f8f5ef] p-5 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <NumberField label="Purchase price" value={price} onChange={setPrice} prefix="$" step={1000} />
            <NumberField label="Down payment" value={downPayment} onChange={setDownPayment} prefix="$" step={1000} />
            <NumberField label="Interest rate" value={rate} onChange={setRate} suffix="%" step={0.125} />
            <NumberField label="Loan term" value={term} onChange={setTerm} suffix="yr" step={1} />
            <NumberField label="Property tax rate" value={taxRate} onChange={setTaxRate} suffix="%" step={0.1} />
            <NumberField label="Annual insurance" value={insurance} onChange={setInsurance} prefix="$" step={100} />
            <NumberField label="Monthly HOA" value={hoa} onChange={setHoa} prefix="$" step={25} />
          </div>
          <div className="mt-8 grid gap-px bg-black/15 md:grid-cols-2">
            <div className="bg-black p-7 text-white md:col-span-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#d7b56d]">Estimated monthly payment</p>
              <p className="mt-4 font-serif text-6xl font-semibold">{formatCurrency(results.total)}</p>
            </div>
            <div className="bg-white p-5"><p className="text-sm text-neutral-500">Principal & interest</p><p className="mt-2 text-2xl font-semibold">{formatCurrency(results.principalInterest)}</p></div>
            <div className="bg-white p-5"><p className="text-sm text-neutral-500">Taxes</p><p className="mt-2 text-2xl font-semibold">{formatCurrency(results.monthlyTaxes)}</p></div>
            <div className="bg-white p-5"><p className="text-sm text-neutral-500">Insurance</p><p className="mt-2 text-2xl font-semibold">{formatCurrency(results.monthlyInsurance)}</p></div>
            <div className="bg-white p-5"><p className="text-sm text-neutral-500">HOA</p><p className="mt-2 text-2xl font-semibold">{formatCurrency(results.monthlyHoa)}</p></div>
          </div>
          <p className="mt-5 text-sm leading-6 text-neutral-600">Estimated loan amount: {formatCurrency(results.loanAmount)}. Actual payment can vary by lender, credit profile, taxes, insurance, HOA dues, flood zones, and loan program.</p>
        </div>
      </div>
    </section>
  );
}
export function FeaturePage({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: feature.metaTitle,
    description: feature.description,
    url: `https://thewoodlandslistingagent.com/${feature.slug}`,
  };

  return (
    <>
      <Helmet>
        <title>{feature.metaTitle}</title>
        <meta name="description" content={feature.description} />
        <link rel="canonical" href={`https://thewoodlandslistingagent.com/${feature.slug}`} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="relative overflow-hidden bg-[#050505] py-20 text-white md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:76px_76px]" />
        <div className="relative mx-auto max-w-[1500px] px-5 md:px-9">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_0.6fr] lg:items-end">
            <div>
              <div className="mb-7 inline-flex items-center gap-3 border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#d7b56d]"><Icon className="h-4 w-4" />{feature.eyebrow}</div>
              <h1 className="font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.025em] text-white md:text-7xl">{feature.title}</h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-white/76">{feature.description}</p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Button asChild className="h-14 rounded-none bg-[#c69a44] px-8 text-[11px] font-bold uppercase tracking-[0.24em] text-black hover:bg-[#e1c06f]"><Link href={feature.slug === "mortgage-estimate" ? "#calculator" : "#request"}>{feature.cta}</Link></Button>
                <Button asChild variant="outline" className="h-14 rounded-none border-white bg-transparent px-8 text-[11px] font-bold uppercase tracking-[0.24em] text-white hover:bg-white hover:text-black"><Link href="/contact">Contact Josh</Link></Button>
              </div>
            </div>
            <div className="border border-[#c69a44]/35 bg-black/35 p-7">
              {feature.points.map((point) => (
                <div key={point} className="flex gap-3 border-b border-white/10 py-4 last:border-b-0"><BadgeCheck className="mt-0.5 h-5 w-5 text-[#c69a44]" /><span className="text-white/78">{point}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {feature.slug === "mortgage-estimate" && <MortgageEstimator />}

      <section className="bg-[#f8f5ef] py-16 text-black md:py-24">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 md:px-9 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-px bg-neutral-200 md:grid-cols-3">
            {feature.sections.map((section) => (
              <article key={section.title} className="bg-white p-7">
                <h2 className="font-serif text-3xl font-semibold text-black">{section.title}</h2>
                <p className="mt-5 leading-8 text-neutral-700">{section.copy}</p>
              </article>
            ))}
          </div>
          <div id="request" className="lg:sticky lg:top-28 lg:self-start">
            <LeadForm leadType={feature.leadType} showAddress={feature.leadType === "valuation"} showArea={feature.leadType === "buying"} title={feature.cta} subtitle={feature.slug === "recently-sold" ? "Send the property address or neighborhood and Josh will review relevant sold comps." : feature.slug === "mortgage-estimate" ? "Use the calculator above first. Then send Josh the price range or property address if you want local tax, HOA, and lender context." : "Tell Josh what you need and where you are looking."} buttonText={feature.slug === "mortgage-estimate" ? "Ask About This Estimate" : feature.cta} />
          </div>
        </div>
      </section>

      <section className="bg-white py-14 text-black">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-5 md:flex-row md:items-center md:justify-between md:px-9">
          <p className="font-serif text-3xl font-semibold">Need a more specific answer?</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" className="h-12 rounded-none border-black px-6 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-black hover:text-white"><Link href="/home-valuation">Get Home Value</Link></Button>
            <Button asChild className="h-12 rounded-none bg-black px-6 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-[#9b6d1d]"><Link href="/contact">Schedule Consultation</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}