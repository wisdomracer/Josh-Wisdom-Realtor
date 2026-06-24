import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { ArrowRight, BadgeCheck, BarChart3, Home, MapPin, Play, ShieldCheck } from "lucide-react";

const communities = [
  { name: "Carlton Woods", href: "/carlton-woods-homes-for-sale", copy: "Gated luxury, golf-course settings, estate-level privacy, and buyers who expect premium presentation." },
  { name: "East Shore", href: "/east-shore-homes-for-sale", copy: "Lake Woodlands, Market Street proximity, lock-and-leave appeal, and lifestyle-focused positioning." },
  { name: "Creekside Park", href: "/creekside-park-homes-for-sale", copy: "Newer homes, parks, village amenities, and move-up buyer demand near The Woodlands and Tomball." },
  { name: "Sterling Ridge", href: "/communities/the-woodlands", copy: "Established village appeal with golf, retail convenience, and refined family neighborhoods." },
  { name: "Alden Bridge", href: "/communities/the-woodlands", copy: "Tree-lined streets, neighborhood parks, and broad buyer appeal across price points." },
  { name: "Panther Creek", href: "/communities/the-woodlands", copy: "Central Woodlands access, Lake Woodlands proximity, and enduring neighborhood character." },
];

const proof = [
  "Listing-first marketing plan built for seller lead conversion",
  "Local focus across The Woodlands, Tomball, Spring, Magnolia, and Greater Houston",
  "Professional presentation strategy before the first buyer ever walks through",
];

const stats = [
  { label: "Primary market", value: "The Woodlands", note: "Seller representation and luxury positioning" },
  { label: "Service reach", value: "Greater Houston", note: "Tomball, Spring, Magnolia, Conroe, Cypress, Katy, Sugar Land" },
  { label: "Strategy", value: "Price + Present + Promote", note: "The three levers that protect seller equity" },
  { label: "Lead response", value: "Direct to Josh", note: "Valuation and consultation requests route to the team" },
];

const articles = [
  "How to price a home in The Woodlands without leaving money on the table",
  "What Carlton Woods buyers compare before making a luxury offer",
  "Selling near The Woodlands Waterway: what premium buyers notice first",
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
      areaServed: ["The Woodlands, TX", "Tomball, TX", "Spring, TX", "Magnolia, TX", "Greater Houston, TX"],
      address: { "@type": "PostalAddress", streetAddress: "5100 Westheimer Ste 200", addressLocality: "Houston", addressRegion: "TX", postalCode: "77027" },
      parentOrganization: { "@type": "RealEstateAgent", name: "VIP Realty" },
    },
    { "@type": "WebSite", "@id": "https://thewoodlandslistingagent.com/#website", name: "The Woodlands Listing Agent", url: "https://thewoodlandslistingagent.com/", potentialAction: { "@type": "ContactAction", target: "https://thewoodlandslistingagent.com/home-valuation", name: "Get Home Value" } },
  ],
};

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>The Woodlands Listing Agent | Josh Wisdom Realtor</title>
        <meta name="description" content="Josh Wisdom Realtor helps The Woodlands homeowners maximize value through expert marketing, local market knowledge, and proven negotiation strategies." />
        <meta name="keywords" content="The Woodlands Listing Agent, The Woodlands Realtor, The Woodlands Luxury Homes, Carlton Woods homes for sale, East Shore homes for sale, Creekside Park homes for sale, Tomball listing agent, Greater Houston Realtor" />
        <link rel="canonical" href="https://thewoodlandslistingagent.com/" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#050505_0%,#111_45%,#2a210d_100%)]" />
        <div className="absolute left-0 top-0 h-full w-full opacity-20" aria-hidden="true">
          <div className="absolute left-[8%] top-[18%] h-48 w-48 border border-amber-400/50" />
          <div className="absolute bottom-[12%] right-[10%] h-64 w-64 border border-white/20" />
          <div className="absolute left-[45%] top-[12%] h-px w-80 bg-amber-300/60" />
          <div className="absolute bottom-[24%] left-[18%] h-px w-96 bg-white/25" />
        </div>
        <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] items-end px-4 pb-14 pt-24 md:px-6 md:pb-20">
          <div className="max-w-5xl">
            <div className="mb-6 inline-flex items-center gap-2 border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white backdrop-blur"><MapPin className="h-4 w-4 text-amber-300" />The Woodlands, Tomball & Greater Houston</div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[0.98] text-white md:text-7xl lg:text-8xl">The Woodlands Listing Agent</h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/90 md:text-2xl md:leading-9">Helping homeowners maximize value through expert marketing, local market knowledge, and proven negotiation strategies.</p>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/60">No stock listing photos, fake reviews, or AI property images are being presented as real homes. Real listing and community media can be added when you provide approved assets.</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row"><Button asChild size="lg" className="h-14 rounded-none bg-amber-500 px-8 text-base font-semibold text-black hover:bg-amber-400"><Link href="/home-valuation">Get Home Value</Link></Button><Button asChild size="lg" variant="outline" className="h-14 rounded-none border-white bg-transparent px-8 text-base font-semibold text-white hover:bg-white hover:text-black"><Link href="/contact">Schedule Consultation</Link></Button></div>
          </div>
        </div>
      </section>

      <section className="border-b border-neutral-200 bg-white py-16 md:py-24"><div className="container mx-auto grid gap-12 px-4 md:grid-cols-[0.95fr_1.05fr] md:items-center md:px-6"><div className="relative"><div className="flex aspect-[4/5] w-full items-center justify-center bg-neutral-950 p-10 text-center text-white"><div><p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-400">Photo Needed</p><p className="mt-4 text-3xl font-semibold">Add Josh's real professional portrait here.</p><p className="mt-4 text-sm leading-6 text-white/60">No stock or AI portrait is being presented as Josh.</p></div></div><div className="absolute bottom-6 left-6 right-6 border border-white/40 bg-black/70 p-5 text-white backdrop-blur"><p className="text-sm uppercase tracking-[0.24em] text-amber-300">Josh Wisdom Realtor</p><p className="mt-2 text-xl font-semibold">Listing strategy for serious Woodlands sellers.</p></div></div><div><p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-600">Seller Representation</p><h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-black md:text-6xl">Premium marketing. Local pricing intelligence. Calm negotiation.</h2><p className="mt-6 text-lg leading-8 text-neutral-700">Josh Wisdom helps homeowners in The Woodlands, Tomball, and Greater Houston prepare, position, and negotiate their sale with a listing plan built around presentation and demand. The goal is simple: protect your equity and make the move feel controlled.</p><div className="mt-8 grid gap-4">{proof.map((item) => (<div key={item} className="flex gap-3 border-t border-neutral-200 pt-4 text-neutral-800"><BadgeCheck className="mt-1 h-5 w-5 shrink-0 text-amber-600" /><span>{item}</span></div>))}</div></div></div></section>

      <section className="bg-neutral-950 py-16 text-white md:py-24"><div className="container mx-auto px-4 md:px-6"><div className="grid gap-8 md:grid-cols-3"><div><p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-400">Trust Signals</p><h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">Honest proof, not filler.</h2></div><div className="md:col-span-2 grid gap-4 md:grid-cols-3">{["No fabricated reviews", "No fake listing inventory", "No misleading property photos"].map((item) => (<div key={item} className="border border-white/15 bg-white/[0.04] p-6"><ShieldCheck className="mb-5 h-7 w-7 text-amber-400" /><h3 className="text-xl font-semibold text-white">{item}</h3><p className="mt-3 text-sm leading-6 text-white/70">Real testimonials, IDX listings, and community photos should be added only after they are verified and approved.</p></div>))}</div></div></div></section>

      <section className="bg-white py-16 md:py-24"><div className="container mx-auto px-4 md:px-6"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-600">Featured Listings</p><h2 className="mt-4 text-4xl font-semibold text-black md:text-5xl">IDX-ready, without fake listings.</h2></div><p className="max-w-2xl text-neutral-600">This section is prepared for active MLS/IDX inventory once your provider is connected. Until then, it intentionally avoids invented property cards.</p></div><div className="mt-10 grid gap-5 md:grid-cols-3">{[["Luxury estates", "Carlton Woods, gated communities, golf-course homes"], ["Waterway living", "East Shore, Hughes Landing, Market Street access"], ["Move-up homes", "Creekside Park, Sterling Ridge, Alden Bridge, Panther Creek"]].map(([title, copy]) => (<div key={title} className="border border-neutral-200 bg-neutral-50 p-7"><Home className="mb-6 h-7 w-7 text-amber-600" /><h3 className="text-2xl font-semibold text-black">{title}</h3><p className="mt-3 leading-7 text-neutral-600">{copy}</p></div>))}</div></div></section>

      <section className="bg-neutral-100 py-16 md:py-24"><div className="container mx-auto px-4 md:px-6"><div className="max-w-3xl"><p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-600">The Woodlands Communities</p><h2 className="mt-4 text-4xl font-semibold text-black md:text-5xl">Neighborhood-specific positioning wins attention.</h2></div><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{communities.map((community) => (<Link key={community.name} href={community.href} className="group block bg-white"><div className="flex aspect-[16/10] items-center justify-between bg-black p-6 text-white"><span className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Community Guide</span><span className="text-6xl font-semibold text-white/10">{community.name.slice(0, 2).toUpperCase()}</span></div><div className="border border-t-0 border-neutral-200 p-6"><h3 className="text-2xl font-semibold text-black">{community.name}</h3><p className="mt-3 min-h-20 leading-7 text-neutral-600">{community.copy}</p><span className="mt-5 inline-flex items-center text-sm font-semibold uppercase tracking-[0.16em] text-amber-700">Explore <ArrowRight className="ml-2 h-4 w-4" /></span></div></Link>))}</div></div></section>

      <section id="valuation" className="bg-white py-16 md:py-24"><div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start md:px-6"><div className="lg:sticky lg:top-24"><p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-600">Home Valuation</p><h2 className="mt-4 text-4xl font-semibold leading-tight text-black md:text-5xl">Know the number before you make the move.</h2><p className="mt-6 text-lg leading-8 text-neutral-700">Online estimates miss upgrades, lot premiums, village-level demand, and the details that can change your pricing strategy. Request a local review built for real seller decisions.</p></div><LeadForm leadType="valuation" showAddress title="Get your home value" subtitle="Tell Josh where the property is and what you are considering." buttonText="Request Valuation" /></div></section>

      <section className="bg-black py-16 text-white md:py-24"><div className="container mx-auto px-4 md:px-6"><div className="flex items-center gap-3 text-amber-400"><BarChart3 className="h-6 w-6" /><p className="text-sm font-semibold uppercase tracking-[0.28em]">Market Dashboard</p></div><div className="mt-10 grid gap-px overflow-hidden bg-white/10 md:grid-cols-4">{stats.map((stat) => (<div key={stat.label} className="bg-neutral-950 p-7"><p className="text-sm uppercase tracking-[0.2em] text-white/50">{stat.label}</p><p className="mt-4 text-3xl font-semibold text-white">{stat.value}</p><p className="mt-3 text-sm leading-6 text-white/65">{stat.note}</p></div>))}</div></div></section>

      <section className="bg-white py-16 md:py-24"><div className="container mx-auto grid gap-12 px-4 md:grid-cols-2 md:px-6"><div><p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-600">Latest Articles</p><h2 className="mt-4 text-4xl font-semibold text-black md:text-5xl">Seller education that can rank.</h2><div className="mt-8 space-y-4">{articles.map((article) => (<div key={article} className="border-t border-neutral-200 py-5"><h3 className="text-xl font-semibold text-black">{article}</h3><p className="mt-2 text-neutral-600">Prepared as real seller education. Replace or expand these with Josh's own market notes as he publishes them.</p></div>))}</div></div><div><p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-600">Video Library</p><h2 className="mt-4 text-4xl font-semibold text-black md:text-5xl">Ready for real video.</h2><div className="mt-8 grid gap-4">{["The Woodlands seller strategy", "Carlton Woods market positioning", "Preparing a luxury listing for launch"].map((video) => (<div key={video} className="flex items-center gap-5 border border-neutral-200 p-5"><div className="flex h-12 w-12 shrink-0 items-center justify-center bg-black text-amber-400"><Play className="h-5 w-5" /></div><div><h3 className="font-semibold text-black">{video}</h3><p className="text-sm text-neutral-600">Placeholder topic only. Add Josh's real YouTube, Instagram, or property videos when available.</p></div></div>))}</div></div></div></section>

      <section className="bg-neutral-950 py-16 text-white md:py-24"><div className="container mx-auto grid gap-10 px-4 md:grid-cols-[1fr_auto] md:items-center md:px-6"><div><p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-400">Contact Josh Wisdom</p><h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">Considering a sale in The Woodlands or Greater Houston?</h2><p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">Start with a quiet conversation about timing, value, preparation, and what the market is likely to reward.</p></div><div className="flex flex-col gap-3 sm:flex-row md:flex-col"><Button asChild size="lg" className="h-14 rounded-none bg-amber-500 px-8 text-black hover:bg-amber-400"><Link href="/home-valuation">Get Home Value</Link></Button><Button asChild size="lg" variant="outline" className="h-14 rounded-none border-white bg-transparent px-8 text-white hover:bg-white hover:text-black"><Link href="/contact">Schedule Consultation</Link></Button></div></div></section>
    </>
  );
}