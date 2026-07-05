import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { ArrowRight, BadgeCheck, Calculator, CalendarDays, Check, Home, Mail, MapPin, PlayCircle, Search, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";

const listingPlan = [
  ["01", "Price", "A local pricing review that weighs condition, timing, competition, and buyer demand."],
  ["02", "Prepare", "A practical pre-launch plan for repairs, refreshes, staging, cleaning, and presentation."],
  ["03", "Launch", "Listing copy, photography direction, showing strategy, digital rollout, and buyer follow-up."],
  ["04", "Negotiate", "Offer guidance on price, terms, financing, appraisal risk, concessions, and timing."],
];

const communities = [
  ["Carlton Woods", "Golf estates, gated privacy, and high-expectation luxury buyers.", "/carlton-woods-homes-for-sale"],
  ["East Shore", "Lake Woodlands, Market Street, Waterway dining, and lock-and-leave appeal.", "/east-shore-homes-for-sale"],
  ["Creekside Park", "Newer homes, parks, schools, and strong family demand.", "/creekside-park-homes-for-sale"],
  ["Sterling Ridge", "Golf, schools, established sections, and steady move-up demand.", "/communities/the-woodlands"],
  ["Alden Bridge", "Mature trees, larger sections, and everyday Woodlands convenience.", "/communities/the-woodlands"],
  ["Panther Creek", "Central location, trails, and Lake Woodlands access.", "/communities/the-woodlands"],
];

const proofPoints = [
  ["Woodlands-area focus", "The Woodlands, Tomball, Spring, Magnolia, Conroe, Shenandoah, and north Houston."],
  ["Seller-first strategy", "Value, prep, presentation, and negotiation before the home ever hits the market."],
  ["Straightforward guidance", "Clear local advice, useful tools, and direct next steps for serious buyers and sellers."],
];

const serviceCards = [
  ["Sell", "Pricing, preparation, launch strategy, and negotiation guidance before your home goes live.", "/sell"],
  ["Buy", "Search by lifestyle, community, commute, schools, taxes, lot, and long-term fit.", "/buy"],
  ["Luxury", "Private guidance for estates, golf course homes, acreage, and high-value properties.", "/luxury-homes"],
];

const searchFeatures = [
  ["Featured Listings", "Request a current shortlist instead of scrolling stale inventory.", "/featured-listings"],
  ["Recently Sold", "Get sold comps, pricing patterns, and seller takeaways.", "/recently-sold"],
  ["Map Search", "Compare areas by commute, lifestyle, golf, water, acreage, and schools.", "/map-search"],
  ["Property Alerts", "Know when the right home appears in the right area.", "/property-alerts"],
];

const planningTools = [
  ["Mortgage estimate", "Run a real payment estimate before touring homes.", "/mortgage-estimate"],
  ["Affordability", "Find a comfortable range before you search.", "/affordability-calculator"],
  ["Seller net sheet", "Estimate proceeds before you list.", "/seller-net-sheet"],
];

const mediaFeatures = [
  ["Video Library", PlayCircle, "/video-library"],
  ["Instagram Feed", Sparkles, "/instagram-feed"],
  ["Google Reviews", BadgeCheck, "/google-reviews"],
  ["Newsletter", Mail, "/newsletter"],
];

const woodlandsImages = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Forest_Bridge_in_The_Woodlands.jpg/1920px-Forest_Bridge_in_The_Woodlands.jpg",
    alt: "A wooded trail bridge in The Woodlands, Texas",
    caption: "Wooded Trails",
    credit: "Photo: Trey Perry / Wikimedia Commons, CC BY 3.0",
    href: "https://commons.wikimedia.org/wiki/File:Forest_Bridge_in_The_Woodlands.jpg",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/57/The_Woodlands_Waterway_(5050352741).jpg",
    alt: "The Woodlands Waterway in The Woodlands, Texas",
    caption: "The Woodlands Waterway",
    credit: "Photo: socialwoodlands / Wikimedia Commons, CC BY 2.0",
    href: "https://commons.wikimedia.org/wiki/File:The_Woodlands_Waterway_(5050352741).jpg",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/The_Woodlands_Towers_at_The_Waterway_lower_res.jpg/1920px-The_Woodlands_Towers_at_The_Waterway_lower_res.jpg",
    alt: "The Woodlands Towers at The Waterway",
    caption: "Town Center and Waterway District",
    credit: "Photo: HowardHughesCo / Wikimedia Commons, CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:The_Woodlands_Towers_at_The_Waterway_lower_res.jpg",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Woodlands_Lake.jpg/1920px-Woodlands_Lake.jpg",
    alt: "Lake Woodlands in The Woodlands, Texas",
    caption: "Lake Woodlands",
    credit: "Photo: Antonio Rivera / Wikimedia Commons, CC BY-SA 2.0",
    href: "https://commons.wikimedia.org/wiki/File:Woodlands_Lake.jpg",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Great_Blue_Heron%2C_Woodlands_Waterway.jpg",
    alt: "Great blue heron and paddleboards along Woodlands Waterway",
    caption: "Waterway Paddleboards",
    credit: "Photo: Philcomanforterie / Wikimedia Commons, CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:Great_Blue_Heron,_Woodlands_Waterway.jpg",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/The_Woodlands_Trolley.jpg/1920px-The_Woodlands_Trolley.jpg",
    alt: "The Woodlands Trolley in The Woodlands, Texas",
    caption: "The Woodlands Trolley",
    credit: "Photo: Philcomanforterie / Wikimedia Commons, CC BY-SA 4.0",
    href: "https://commons.wikimedia.org/wiki/File:The_Woodlands_Trolley.jpg",
  },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": "https://thewoodlandslistingagent.com/#agent",
      name: "Josh Wisdom Realtor",
      url: "https://thewoodlandslistingagent.com/",
      telephone: "+18329818920",
      email: "WisdomRacer@gmail.com",
      areaServed: ["The Woodlands, TX", "Tomball, TX", "Spring, TX", "Magnolia, TX", "Conroe, TX", "Greater Houston, TX"],
      address: { "@type": "PostalAddress", streetAddress: "5100 Westheimer Ste 200", addressLocality: "Houston", addressRegion: "TX", postalCode: "77027" },
      parentOrganization: { "@type": "RealEstateAgent", name: "VIP Realty" },
    },
    { "@type": "WebSite", "@id": "https://thewoodlandslistingagent.com/#website", name: "The Woodlands Listing Agent", url: "https://thewoodlandslistingagent.com/" },
  ],
};

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return <p className={`text-[11px] font-bold uppercase tracking-[0.42em] ${light ? "text-[#d7b56d]" : "text-[#9b6d1d]"}`}>{children}</p>;
}

function ImageCreditLinks() {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-500">
      {woodlandsImages.map((image) => (
        <a key={image.href} href={image.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">{image.credit}</a>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>The Woodlands Listing Agent | Josh Wisdom Realtor</title>
        <meta name="description" content="Josh Wisdom Realtor helps The Woodlands homeowners price, prepare, market, and negotiate with confidence before listing a home." />
        <link rel="canonical" href="https://thewoodlandslistingagent.com/" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-black text-white">
        <img src={woodlandsImages[0].src} alt={woodlandsImages[0].alt} className="absolute inset-0 h-full w-full object-cover opacity-70" loading="eager" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_28%,rgba(214,177,93,0.24),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.64)_42%,rgba(0,0,0,0.24)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black to-transparent" />
        <div className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-[1600px] px-5 py-12 md:px-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:pb-20">
          <div className="max-w-6xl luxury-reveal">
            <div className="mb-8 flex flex-wrap items-center gap-4 text-white/70">
              <span className="h-px w-16 bg-[#d7b56d]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.34em]">TheWoodlandsListingAgent.com</span>
            </div>
            <h1 className="font-serif text-[clamp(4.6rem,11vw,13.2rem)] font-semibold leading-[0.78] tracking-[-0.055em] text-white">The Woodlands Listing Agent</h1>
            <p className="mt-8 max-w-4xl text-xl leading-9 text-white/80 md:text-2xl md:leading-10">Helping homeowners maximize value through expert marketing, local market knowledge, and proven negotiation strategy.</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild className="h-14 rounded-none bg-[#d7b56d] px-9 text-[11px] font-bold uppercase tracking-[0.26em] text-black hover:bg-white"><Link href="/home-valuation">Get Home Value</Link></Button>
              <Button asChild variant="outline" className="h-14 rounded-none border-white/70 bg-transparent px-9 text-[11px] font-bold uppercase tracking-[0.26em] text-white hover:bg-white hover:text-black"><Link href="/contact">Schedule Consultation</Link></Button>
            </div>
          </div>
          <div className="mt-12 hidden self-end border border-white/20 bg-black/45 p-5 backdrop-blur-md lg:block">
            <div className="grid gap-px bg-white/15 md:grid-cols-2">
              {woodlandsImages.slice(1, 3).map((image) => (
                <figure key={image.caption} className="relative h-48 overflow-hidden bg-black">
                  <img src={image.src} alt={image.alt} className="h-full w-full object-cover opacity-86" loading="lazy" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent px-5 pb-5 pt-16 text-[11px] font-bold uppercase tracking-[0.24em] text-white">{image.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] text-white">
        <div className="mx-auto grid max-w-[1600px] gap-px bg-white/10 px-5 py-5 md:grid-cols-3 md:px-9">
          {proofPoints.map(([label, copy]) => (
            <article key={label} className="bg-[#050505] px-6 py-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#d7b56d]">{label}</p>
              <p className="mt-4 leading-7 text-white/72">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-24 text-black md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-5 md:px-9 xl:grid-cols-[0.85fr_1.15fr] xl:items-center">
          <div>
            <Eyebrow>Bespoke Marketing</Eyebrow>
            <h2 className="mt-7 font-serif text-[clamp(3.2rem,7vw,8rem)] font-semibold leading-[0.86] tracking-[-0.04em]">Maximize your sale before your home hits the market.</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
            <p className="text-xl leading-9 text-neutral-700">The strongest sales usually start before showings begin: accurate pricing, smart preparation, premium presentation, targeted exposure, and clear negotiation strategy.</p>
            <figure className="relative min-h-[520px] overflow-hidden bg-black">
              <img src={woodlandsImages[3].src} alt={woodlandsImages[3].alt} className="absolute inset-0 h-full w-full object-cover opacity-90" loading="lazy" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/55 to-transparent p-8 text-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7b56d]">The Woodlands, TX</p>
                <p className="mt-3 font-serif text-4xl">{woodlandsImages[3].caption}</p>
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="mx-auto mt-20 grid max-w-[1600px] gap-px bg-neutral-200 px-5 md:px-9 lg:grid-cols-4">
          {listingPlan.map(([number, title, copy]) => (
            <article key={title} className="group min-h-96 bg-[#050505] p-8 text-white transition hover:bg-[#14110b]">
              <p className="font-serif text-7xl text-[#d7b56d]">{number}</p>
              <h3 className="mt-20 text-3xl font-semibold">{title}</h3>
              <p className="mt-5 leading-8 text-white/70">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#0b0a08] py-24 text-white md:py-36">
        <div className="mx-auto max-w-[1600px] px-5 md:px-9">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <Eyebrow light>Search Experience</Eyebrow>
              <h2 className="mt-7 font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.88] tracking-[-0.035em]">Find the right home without the noise.</h2>
            </div>
            <p className="max-w-3xl text-xl leading-9 text-white/72">Search by lifestyle, community, golf, water access, acreage, schools, commute, and long-term fit across The Woodlands and north Houston.</p>
          </div>
          <div className="mt-16 grid gap-px bg-white/10 lg:grid-cols-4">
            {searchFeatures.map(([title, copy, href], index) => (
              <Link key={title} href={href} className={`group relative min-h-[360px] overflow-hidden bg-black p-8 ${index === 0 ? "lg:col-span-2" : ""}`}>
                <img src={woodlandsImages[(index + 2) % woodlandsImages.length].src} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35 transition duration-700 group-hover:scale-105 group-hover:opacity-55" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                <div className="relative flex h-full flex-col justify-end">
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7b56d]">0{index + 1}</p>
                  <h3 className="mt-6 font-serif text-5xl font-semibold leading-none text-white">{title}</h3>
                  <p className="mt-5 max-w-lg leading-7 text-white/76">{copy}</p>
                  <span className="mt-8 inline-flex items-center text-[11px] font-bold uppercase tracking-[0.24em] text-[#d7b56d]">Open <ArrowRight className="ml-3 h-4 w-4" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 text-black md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-5 md:px-9 xl:grid-cols-[0.66fr_1.34fr]">
          <div className="xl:sticky xl:top-28 xl:self-start">
            <Eyebrow>Luxury Communities</Eyebrow>
            <h2 className="mt-7 font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.88] tracking-[-0.035em]">The Woodlands is not one market.</h2>
            <p className="mt-8 text-xl leading-9 text-neutral-700">Each village attracts a different buyer. Better positioning starts with understanding what makes each area matter.</p>
            <Button asChild variant="outline" className="mt-10 h-14 rounded-none border-black px-7 text-[11px] font-bold uppercase tracking-[0.24em] text-black hover:bg-black hover:text-white"><Link href="/communities">Explore Communities</Link></Button>
          </div>
          <div className="grid gap-px bg-neutral-200 md:grid-cols-2">
            {communities.map(([name, copy, href], index) => (
              <Link key={name} href={href} className={`group min-h-80 bg-[#f7f3ec] p-8 transition hover:bg-black hover:text-white ${index === 0 || index === communities.length - 1 ? "md:col-span-2" : ""}`}>
                <div className="flex items-start justify-between gap-8">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#9b6d1d] transition group-hover:text-[#d7b56d]">0{index + 1}</p>
                    <h3 className="mt-9 font-serif text-5xl font-semibold leading-none md:text-7xl">{name}</h3>
                  </div>
                  <ArrowRight className="h-5 w-5 text-[#9b6d1d] transition group-hover:translate-x-1 group-hover:text-[#d7b56d]" />
                </div>
                <p className="mt-10 max-w-2xl text-lg leading-8 text-neutral-700 transition group-hover:text-white/76">{copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f3ec] py-24 text-black md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-5 md:px-9 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
          <div className="grid gap-px bg-black/15 md:grid-cols-3">
            {woodlandsImages.slice(3, 6).map((image, index) => (
              <figure key={image.caption} className={`group relative overflow-hidden bg-black ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                <img src={image.src} alt={image.alt} className={`w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 ${index === 0 ? "h-[620px]" : "h-[309px]"}`} loading="lazy" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/50 to-transparent p-7 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#d7b56d]">The Woodlands, TX</p>
                  <p className="mt-3 font-serif text-3xl font-semibold">{image.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div>
            <Eyebrow>Local Lifestyle</Eyebrow>
            <h2 className="mt-7 font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.88] tracking-[-0.035em]">Make the area feel real before the showing.</h2>
            <p className="mt-8 text-xl leading-9 text-neutral-700">The Woodlands sells on more than square footage. Trails, Waterway nights, parks, schools, commute, golf, and neighborhood feel all shape buyer confidence.</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild className="h-14 rounded-none bg-black px-8 text-[11px] font-bold uppercase tracking-[0.24em] text-white hover:bg-[#d7b56d] hover:text-black"><Link href="/the-woodlands-events">Events Guide</Link></Button>
              <Button asChild variant="outline" className="h-14 rounded-none border-black px-8 text-[11px] font-bold uppercase tracking-[0.24em] text-black hover:bg-black hover:text-white"><Link href="/communities/the-woodlands">Area Guide</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black py-24 text-white md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-px bg-white/10 px-5 md:px-9 lg:grid-cols-3">
          <div className="bg-black p-9 lg:col-span-1">
            <Eyebrow light>Seller Intelligence</Eyebrow>
            <h2 className="mt-7 font-serif text-5xl font-semibold leading-[0.94] md:text-7xl">Useful tools, not decoration.</h2>
            <p className="mt-7 leading-8 text-white/70">Start with payment comfort, seller proceeds, recent sold data, and local context before making a major decision.</p>
          </div>
          {[...planningTools, ["Recently sold", "Request sold comps and pricing context.", "/recently-sold"]].map(([title, copy, href]) => (
            <Link key={title} href={href} className="group bg-[#080808] p-9 transition hover:bg-[#f7f3ec] hover:text-black">
              <Calculator className="h-6 w-6 text-[#d7b56d]" />
              <h3 className="mt-16 font-serif text-4xl font-semibold">{title}</h3>
              <p className="mt-5 leading-8 text-white/70 transition group-hover:text-neutral-700">{copy}</p>
              <span className="mt-8 inline-flex items-center text-[11px] font-bold uppercase tracking-[0.24em] text-[#d7b56d]">Use tool <ArrowRight className="ml-3 h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-24 text-black md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-14 px-5 md:px-9 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <Eyebrow>Home Value</Eyebrow>
            <h2 className="mt-7 font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.88] tracking-[-0.035em]">Know the number before you move.</h2>
            <p className="mt-8 text-xl leading-9 text-neutral-700">Your value depends on more than a Zestimate. Location, updates, lot, condition, timing, and nearby competition all matter.</p>
            <div className="mt-10 grid gap-px bg-black/15 sm:grid-cols-2">
              {["Local value review", "Preparation priorities", "Launch timing", "Offer strategy"].map((item) => (
                <div key={item} className="flex items-center gap-3 bg-[#f7f3ec] p-5"><ShieldCheck className="h-5 w-5 text-[#9b6d1d]" /><span className="font-semibold text-black">{item}</span></div>
              ))}
            </div>
          </div>
          <div className="border border-black/15 bg-[#f7f3ec] p-3 text-black shadow-2xl shadow-black/10">
            <LeadForm leadType="valuation" showAddress title="Request a private value review" subtitle="Share the property address and your rough timeline." buttonText="Get Home Value" />
          </div>
        </div>
      </section>

      <section className="bg-[#0b0a08] py-24 text-white md:py-36">
        <div className="mx-auto max-w-[1600px] px-5 md:px-9">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <Eyebrow light>Services</Eyebrow>
              <h2 className="mt-7 font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.88] tracking-[-0.035em]">One site. Three clear paths.</h2>
            </div>
            <p className="max-w-3xl text-xl leading-9 text-white/72">Visitors should know exactly what to do next: search homes, request value, book a consultation, or read a local guide.</p>
          </div>
          <div className="mt-16 grid gap-px bg-white/10 lg:grid-cols-3">
            {serviceCards.map(([title, copy, href]) => (
              <Link key={title} href={href} className="group min-h-96 bg-[#0b0a08] p-9 transition hover:bg-[#f7f3ec] hover:text-black">
                <Sparkles className="h-6 w-6 text-[#d7b56d]" />
                <h3 className="mt-20 font-serif text-6xl font-semibold">{title}</h3>
                <p className="mt-6 leading-8 text-white/70 transition group-hover:text-neutral-700">{copy}</p>
                <span className="mt-10 inline-flex items-center text-[11px] font-bold uppercase tracking-[0.24em] text-[#d7b56d]">Learn more <ArrowRight className="ml-3 h-4 w-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24 text-black md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-16 px-5 md:grid-cols-2 md:px-9">
          <div>
            <Eyebrow>Latest Guides</Eyebrow>
            <h2 className="mt-7 font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.88] tracking-[-0.035em]">Helpful answers before you make a move.</h2>
          </div>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {[
              "How to price a home in The Woodlands without leaving money on the table",
              "The Woodlands events and lifestyle calendar for relocation weekends",
              "What Carlton Woods buyers compare before making a luxury offer",
              "Selling near The Woodlands Waterway: what premium buyers notice first",
            ].map((article) => (
              <Link key={article} href={article.includes("events") ? "/the-woodlands-events" : "/blog"} className="group flex items-center justify-between gap-6 py-8 text-xl font-semibold leading-8 text-black hover:text-[#9b6d1d]"><span>{article}</span><ArrowRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-1" /></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-5 py-24 text-white md:px-9 md:py-36">
        <div className="mx-auto max-w-[1600px] border border-white/15 p-8 md:p-16">
          <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <Eyebrow light>Private Consultation</Eyebrow>
              <h2 className="mt-7 max-w-6xl font-serif text-[clamp(3rem,6vw,7rem)] font-semibold leading-[0.88] tracking-[-0.035em]">Thinking about selling in The Woodlands?</h2>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">Start with value, timing, preparation, and a clear plan before you list.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Button asChild size="lg" className="h-14 rounded-none bg-[#d7b56d] px-8 text-[11px] font-bold uppercase tracking-[0.24em] text-black hover:bg-white"><Link href="/home-valuation"><CalendarDays className="mr-2 h-4 w-4" /> Get Home Value</Link></Button>
              <Button asChild size="lg" variant="outline" className="h-14 rounded-none border-white bg-transparent px-8 text-[11px] font-bold uppercase tracking-[0.24em] text-white hover:bg-white hover:text-black"><Link href="/contact">Schedule Consultation</Link></Button>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-[1600px]">
          <ImageCreditLinks />
        </div>
      </section>
    </>
  );
}