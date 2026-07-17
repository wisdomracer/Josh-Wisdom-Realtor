import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileSearch,
  Home,
  MapPin,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { PhotoCredit, ResponsiveLocationImage } from "@/components/location-hero";
import { Button } from "@/components/ui/button";
import { absoluteUrl, siteConfig } from "@/config/site";
import { locationPhotos, type LocationPhoto } from "@/config/location-photos";

type ArticleSection = {
  heading: string;
  copy: string;
};

type ArticlePath = {
  label: string;
  title: string;
  copy: string;
  href: string;
  icon: LucideIcon;
};

type BlogPostData = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  photo: LocationPhoto;
  takeaways: string[];
  sections: ArticleSection[];
  paths: ArticlePath[];
};

const valuationPhoto: LocationPhoto = locationPhotos.woodlands;
const architecturePhoto: LocationPhoto = locationPhotos.pavilion;
const presentationPhoto: LocationPhoto = locationPhotos.homepage;

export const blogPosts: BlogPostData[] = [
  {
    slug: "how-to-price-a-home-in-the-woodlands",
    title: "How to price a Woodlands home without surrendering the strategy",
    description: "A seller-focused framework for separating closed evidence, active competition, property condition, and launch decisions before choosing a list price.",
    date: "2026-06-24",
    readTime: "8 min read",
    category: "Seller Strategy",
    photo: valuationPhoto,
    takeaways: [
      "Price the exact property, not a broad Woodlands average.",
      "Active competition shows the alternatives buyers can choose now.",
      "Define launch and adjustment rules before market feedback becomes emotional.",
    ],
    sections: [
      {
        heading: "Start with the exact property",
        copy: "The Woodlands is not one flat comparison. Village, section, lot position, privacy, view, age, architecture, condition, updates, nearby roads, and recurring routes can affect how a buyer evaluates the home. The first task is to identify which details materially change the competitive set and which details are simply descriptive.",
      },
      {
        heading: "Separate closed evidence from current pressure",
        copy: "Recent sales help establish what buyers accepted under earlier conditions. Active and pending alternatives show the decisions buyers face today. A useful pricing review considers both, then examines days on market, price changes, condition, builder age, lot, presentation, and unresolved buyer objections rather than treating every nearby sale as equally relevant.",
      },
      {
        heading: "Account for preparation and presentation",
        copy: "Price cannot be separated from the way the property will enter the market. Repairs, cleaning, staging decisions, photography readiness, access, records, and the clarity of the property story can influence buyer confidence. The goal is not to over-improve; it is to remove avoidable friction before buyers begin comparing alternatives.",
      },
      {
        heading: "Define the launch rules before going live",
        copy: "Decide what early showing activity, feedback, competing inventory, and offer quality will mean before the listing launches. A controlled plan identifies the intended position, the evidence that would support a change, and the timing for reviewing that evidence. That protects the seller from reacting to one comment or waiting too long while the market forms a different opinion.",
      },
    ],
    paths: [
      { label: "Value", title: "Request a private value review", copy: "Establish the property position before choosing the price.", href: "/home-valuation", icon: FileSearch },
      { label: "Representation", title: "Review the seller strategy", copy: "See the preparation, launch, and negotiation framework.", href: "/sell", icon: ShieldCheck },
      { label: "Local", title: "Explore The Woodlands", copy: "Compare village, property, route, and ownership context.", href: "/communities/the-woodlands", icon: MapPin },
    ],
  },
  {
    slug: "what-carlton-woods-buyers-compare",
    title: "What buyers compare before making a Carlton Woods offer",
    description: "A property-specific look at privacy, lot, architecture, condition, setting, presentation, access, and the complete terms behind a distinctive-home decision.",
    date: "2026-06-24",
    readTime: "7 min read",
    category: "Luxury Homes",
    photo: architecturePhoto,
    takeaways: [
      "Translate distinction into specific, supportable property qualities.",
      "Presentation and showing control should match the intended position.",
      "Evaluate price together with certainty, contingencies, timing, and privacy.",
    ],
    sections: [
      {
        heading: "Luxury buyers compare story and substance",
        copy: "A distinctive home should communicate what is difficult to reproduce: architecture, lot, privacy, construction, finish, setting, improvements, and the relationship between the residence and its surroundings. The narrative should be precise enough to orient a qualified buyer without relying on inflated adjectives or unsupported claims.",
      },
      {
        heading: "The comparison is property specific",
        copy: "Golf-course relationship, street position, neighboring homes, usable outdoor space, arrival, floor-plan function, renovation history, systems, and deferred work can carry different weight from one property to another. A buyer may compare alternatives across sections or nearby luxury markets when the homes answer the same underlying brief.",
      },
      {
        heading: "Presentation must support the position",
        copy: "Photography, lighting, copy, floor-plan context, records, showing preparation, access, and feedback management shape perceived value. Controlled exposure does not mean weak exposure; it means the presentation, qualification, and access plan are intentional and consistent with the seller's privacy and timing priorities.",
      },
      {
        heading: "Negotiate the complete offer",
        copy: "A high-value offer can involve financing nuance, appraisal exposure, inspection scope, exclusions, possession, timing, confidentiality, and certainty of execution. The headline price matters, but the strongest outcome is determined by the full package and how well it matches the seller's priorities.",
      },
    ],
    paths: [
      { label: "Community", title: "Review Carlton Woods", copy: "Begin with setting, property, and luxury-market context.", href: "/communities/carlton-woods", icon: MapPin },
      { label: "Luxury", title: "Explore private representation", copy: "See the position, presentation, and exposure approach.", href: "/luxury-homes", icon: ShieldCheck },
      { label: "Value", title: "Request a private value review", copy: "Discuss the property before deciding the next move.", href: "/home-valuation", icon: FileSearch },
    ],
  },
  {
    slug: "selling-near-the-woodlands-waterway",
    title: "Selling near The Woodlands Waterway: what the location must explain",
    description: "How to position an East Shore, Waterway, Market Street, or Hughes Landing-area property without reducing the value story to a list of nearby destinations.",
    date: "2026-06-24",
    readTime: "7 min read",
    category: "Neighborhood Guide",
    photo: locationPhotos.woodlands,
    takeaways: [
      "Describe the property's exact relationship to the destinations buyers value.",
      "Make access, parking, maintenance, outdoor space, and daily convenience clear.",
      "Position the home against the alternatives serving the same lifestyle brief.",
    ],
    sections: [
      {
        heading: "Lifestyle is part of the property position",
        copy: "Near the Waterway and Town Center, buyers may consider dining, trails, entertainment, shopping, lake access, and the convenience of recurring trips. Those features matter most when the marketing explains the property's actual relationship to them rather than implying that every nearby address offers the same experience.",
      },
      {
        heading: "Translate proximity into daily use",
        copy: "Walkability, driving access, parking, building access, outdoor space, elevator or stair use, view, noise context, and maintenance profile can change the convenience story materially. The exact route from the residence to the destinations belongs in the preparation and showing conversation.",
      },
      {
        heading: "Do not bury the ownership details",
        copy: "Association obligations, shared systems, insurance context, restrictions, maintenance responsibilities, reserves or records where applicable, and planned work should be organized early. Clear records help a buyer evaluate convenience as an ownership experience, not merely a marketing phrase.",
      },
      {
        heading: "Compare the future buyer's alternatives",
        copy: "The relevant competition may include other East Shore properties, Waterway-area residences, low-maintenance homes elsewhere in The Woodlands, or Houston options that answer a similar brief. Pricing and presentation should make the property's specific reasons clear within that broader decision set.",
      },
    ],
    paths: [
      { label: "Community", title: "Explore East Shore", copy: "Review the water, access, property, and ownership context.", href: "/communities/east-shore", icon: MapPin },
      { label: "Area", title: "Explore The Woodlands", copy: "Compare the broader village and Town Center decision.", href: "/communities/the-woodlands", icon: Home },
      { label: "Representation", title: "Review the seller strategy", copy: "Plan preparation, presentation, launch, and negotiation.", href: "/sell", icon: ShieldCheck },
    ],
  },
  {
    slug: "creekside-park-seller-checklist",
    title: "A Creekside Park seller checklist before the market sees the home",
    description: "A controlled pre-listing framework for competition, condition, records, photography, access, launch timing, and the buyer questions that should be addressed early.",
    date: "2026-06-24",
    readTime: "7 min read",
    category: "Pre-Listing Preparation",
    photo: presentationPhoto,
    takeaways: [
      "Define the competitive set before deciding what to improve.",
      "Resolve visible friction and organize material property records early.",
      "Coordinate photography, copy, access, price, and feedback rules as one launch.",
    ],
    sections: [
      {
        heading: "Identify the real buyer alternatives",
        copy: "Creekside Park buyers may compare section, builder, age, floor plan, lot, outdoor living, condition, updates, amenities, school information, recurring routes, and nearby new construction. The relevant set should be defined around the exact property rather than a broad village average.",
      },
      {
        heading: "Prepare what reduces buyer friction",
        copy: "Cleaning, landscaping, touch-up work, lighting, hardware, visible repairs, odor, storage, and photography readiness can shape confidence. The goal is not perfection. It is to prioritize the changes that make the property easier to understand and reduce avoidable objections during the first comparison.",
      },
      {
        heading: "Organize the material records",
        copy: "Survey, title context, association information, warranties, permits where relevant, repair history, systems, utility information, exclusions, and other property-specific records should be gathered before urgency develops. Questions that require specialists should be directed to the appropriate professional rather than guessed at in marketing copy.",
      },
      {
        heading: "Coordinate the complete launch",
        copy: "Photography, property copy, neighborhood context, showing instructions, access, price, timing, feedback review, and offer priorities should support one position. A controlled launch helps buyers understand the home quickly and gives the seller a clearer basis for evaluating early market response.",
      },
    ],
    paths: [
      { label: "Community", title: "Review Creekside Park", copy: "Compare property, section, route, and ownership context.", href: "/communities/creekside-park", icon: MapPin },
      { label: "Representation", title: "Review the seller strategy", copy: "See the complete pre-market and negotiation plan.", href: "/sell", icon: ShieldCheck },
      { label: "Value", title: "Request a private value review", copy: "Establish the position before choosing the launch price.", href: "/home-valuation", icon: FileSearch },
    ],
  },
];

const editorialStandards = [
  { title: "Property specific", copy: "The guidance begins with the exact home, setting, condition, ownership context, and alternatives rather than a broad average.", icon: Home },
  { title: "Decision focused", copy: "Each brief is written to clarify a pricing, preparation, ownership, location, or negotiation decision a client may actually face.", icon: CheckCircle2 },
  { title: "No invented proof", copy: "No fabricated sales, rankings, testimonials, performance claims, or guarantees are used to manufacture authority.", icon: ShieldCheck },
];

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

function ArticleMeta({ post, light = false }: { post: BlogPostData; light?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-[0.2em] ${light ? "text-white/55" : "text-neutral-500"}`}>
      <span>{formatDate(post.date)}</span>
      <span className="inline-flex items-center gap-2"><Clock3 className="h-3.5 w-3.5" aria-hidden="true" />{post.readTime}</span>
    </div>
  );
}

export function BlogIndex() {
  const [featured, ...remaining] = blogPosts;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", name: "Private Real Estate Insights", url: absoluteUrl("/blog"), description: "Decision-focused seller, luxury, property, and community guidance for The Woodlands and North Houston.", publisher: { "@type": "Organization", name: siteConfig.name } },
      { "@type": "ItemList", itemListElement: blogPosts.map((post, index) => ({ "@type": "ListItem", position: index + 1, url: absoluteUrl(`/blog/${post.slug}`), name: post.title })) },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Private Real Estate Insights | Josh Wisdom Realtor</title>
        <meta name="description" content="Decision-focused seller, luxury, property, and community guidance for The Woodlands, Tomball, and North Houston homeowners." />
        <link rel="canonical" href={absoluteUrl("/blog")} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="overflow-hidden bg-black text-white">
        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative flex items-center px-5 py-20 md:px-10 md:py-24 lg:px-14 lg:py-28">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:76px_76px]" />
            <div className="relative max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#d7b56d]">Private Real Estate Insights</p>
              <h1 className="mt-6 font-serif text-[clamp(3.5rem,7vw,7.25rem)] font-semibold leading-[0.9] tracking-[-0.035em] text-white">Read for the decision ahead.</h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-white/72 md:text-xl">Seller strategy, distinctive-property guidance, and local context written to clarify the next decision, not fill a feed.</p>
              <Button asChild className="mt-8 h-14 rounded-none bg-[#c69a44] px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-[#deb65f]"><a href="#latest-briefs">Explore The Briefs</a></Button>
            </div>
          </div>
          <figure className="relative min-h-[360px] overflow-hidden lg:min-h-[590px]">
            <ResponsiveLocationImage photo={locationPhotos.woodlands} className="absolute inset-0 h-full w-full object-cover" sizes="(min-width: 1024px) 56vw, 100vw" loading="eager" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
            <PhotoCredit photo={locationPhotos.woodlands} />
          </figure>
        </div>
      </section>

      <section id="latest-briefs" className="scroll-mt-20 bg-[#f5f2ec] py-20 md:py-28" aria-labelledby="latest-briefs-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-10 border-b border-black/15 pb-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#875d17]">Latest Advisory Briefs</p>
              <h2 id="latest-briefs-title" className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">Useful before the conversation becomes urgent.</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-700 lg:justify-self-end">These articles organize the facts and tradeoffs that often deserve attention before pricing, preparing, comparing, or negotiating a property.</p>
          </div>

          <Link href={`/blog/${featured.slug}`} className="group mt-12 grid overflow-hidden border border-black/10 bg-white lg:grid-cols-[1.04fr_0.96fr]">
            <figure className="relative min-h-[340px] overflow-hidden lg:min-h-[540px]">
              <ResponsiveLocationImage photo={featured.photo} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]" sizes="(min-width: 1024px) 52vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <PhotoCredit photo={featured.photo} />
            </figure>
            <div className="flex flex-col justify-between p-7 md:p-10 lg:p-12">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#875d17]">Featured · {featured.category}</p>
                <h3 className="mt-6 font-serif text-4xl font-semibold leading-[0.98] tracking-[-0.025em] text-black md:text-6xl">{featured.title}</h3>
                <p className="mt-6 text-lg leading-8 text-neutral-600">{featured.description}</p>
              </div>
              <div className="mt-10 flex items-end justify-between gap-6 border-t border-black/15 pt-6"><ArticleMeta post={featured} /><ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" /></div>
            </div>
          </Link>

          <div className="mt-8 grid gap-px border border-black/10 bg-black/10 lg:grid-cols-3">
            {remaining.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col bg-white">
                <figure className="relative aspect-[4/3] overflow-hidden">
                  <ResponsiveLocationImage photo={post.photo} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" sizes="(min-width: 1024px) 33vw, 100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <PhotoCredit photo={post.photo} />
                </figure>
                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#875d17]">{post.category}</p>
                  <h3 className="mt-5 font-serif text-3xl font-semibold leading-tight text-black">{post.title}</h3>
                  <p className="mt-4 leading-7 text-neutral-600">{post.description}</p>
                  <div className="mt-auto flex items-end justify-between gap-6 pt-9"><ArticleMeta post={post} /><ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111] py-20 text-white md:py-28" aria-labelledby="editorial-standard-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="max-w-4xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7b56d]">Editorial Standard</p>
            <h2 id="editorial-standard-title" className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-white md:text-7xl">Useful guidance does not need manufactured authority.</h2>
          </div>
          <div className="mt-14 grid gap-px border border-white/15 bg-white/15 md:grid-cols-3">
            {editorialStandards.map(({ title, copy, icon: Icon }) => (
              <article key={title} className="bg-[#111] p-7 md:p-9"><Icon className="h-6 w-6 text-[#d7b56d]" aria-hidden="true" /><h3 className="mt-10 font-serif text-3xl text-white">{title}</h3><p className="mt-4 leading-7 text-neutral-400">{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:px-9 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#875d17]">Property-Specific Guidance</p><h2 className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">The article is context. The property is the decision.</h2></div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild className="h-14 rounded-none bg-black px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-[#875d17]"><Link href="/home-valuation">Request Private Value Review</Link></Button>
            <Button asChild variant="outline" className="h-14 rounded-none border-black bg-transparent px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-black hover:text-white"><Link href="/sell">View Seller Representation</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}

export function BlogPost({ slug }: { slug: string }) {
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return null;
  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", headline: post.title, description: post.description, datePublished: post.date, dateModified: post.date, image: absoluteUrl(post.photo.src), author: { "@type": "Person", name: siteConfig.agentName, url: absoluteUrl("/about") }, publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url }, mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Insights", item: absoluteUrl("/blog") }, { "@type": "ListItem", position: 2, name: post.title, item: absoluteUrl(`/blog/${post.slug}`) }] },
    ],
  };

  return (
    <>
      <Helmet><title>{`${post.title} | Josh Wisdom Realtor`}</title><meta name="description" content={post.description} /><link rel="canonical" href={absoluteUrl(`/blog/${post.slug}`)} /><script type="application/ld+json">{JSON.stringify(schema)}</script></Helmet>
      <article className="bg-white">
        <header className="overflow-hidden bg-black text-white">
          <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[1.02fr_0.98fr]">
            <div className="relative flex items-center px-5 py-16 md:px-10 md:py-24 lg:px-14 lg:py-28">
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:76px_76px]" />
              <div className="relative max-w-3xl">
                <Link href="/blog" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/60 hover:text-white"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Insights</Link>
                <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7b56d]">{post.category}</p>
                <h1 className="mt-6 font-serif text-[clamp(3rem,5.6vw,6.5rem)] font-semibold leading-[0.93] tracking-[-0.035em] text-white">{post.title}</h1>
                <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">{post.description}</p>
                <div className="mt-7"><ArticleMeta post={post} light /></div>
              </div>
            </div>
            <figure className="relative min-h-[360px] overflow-hidden lg:min-h-[720px]">
              <ResponsiveLocationImage photo={post.photo} className="absolute inset-0 h-full w-full object-cover" sizes="(min-width: 1024px) 49vw, 100vw" loading="eager" fetchPriority="high" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" /><PhotoCredit photo={post.photo} />
            </figure>
          </div>
        </header>

        <section className="bg-[#f5f2ec] py-20 md:py-28" aria-label="Article brief">
          <div className="mx-auto grid max-w-[1320px] gap-14 px-5 md:px-9 lg:grid-cols-[0.72fr_1.28fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#875d17]">In This Brief</p>
              <nav aria-label="Article sections" className="mt-6 border-t border-black">
                {post.sections.map(({ heading }, index) => <a key={heading} href={`#article-section-${index + 1}`} className="flex items-start gap-4 border-b border-black/15 py-4 text-sm font-medium leading-6 text-black hover:text-[#875d17]"><span className="font-serif text-lg text-[#875d17]">0{index + 1}</span><span>{heading}</span></a>)}
              </nav>
              <div className="mt-8 bg-black p-7 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d7b56d]">Three Takeaways</p>
                <ul className="mt-5 space-y-4">{post.takeaways.map((takeaway) => <li key={takeaway} className="flex gap-3 text-sm leading-6 text-neutral-300"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d7b56d]" aria-hidden="true" /><span>{takeaway}</span></li>)}</ul>
              </div>
            </aside>
            <div>
              <p className="border-l-2 border-[#9b6d1d] pl-6 font-serif text-3xl leading-[1.25] text-black md:text-4xl">A useful article should improve the questions you ask about the exact property. It cannot replace property records, inspections, legal advice, tax advice, lending guidance, or a current market review.</p>
              <div className="mt-14">{post.sections.map(({ heading, copy }, index) => <section key={heading} id={`article-section-${index + 1}`} className="scroll-mt-28 border-t border-black/15 py-10 first:border-black first:pt-10"><div className="grid gap-5 md:grid-cols-[auto_1fr] md:gap-8"><span className="font-serif text-3xl text-[#9b6d1d]">0{index + 1}</span><div><h2 className="font-serif text-4xl font-semibold leading-tight tracking-[-0.02em] text-black md:text-5xl">{heading}</h2><p className="mt-6 text-lg leading-8 text-neutral-700">{copy}</p></div></div></section>)}</div>
            </div>
          </div>
        </section>

        <section className="bg-black py-20 text-white md:py-28" aria-labelledby="related-decisions-title">
          <div className="mx-auto max-w-[1440px] px-5 md:px-9">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7b56d]">Related Decisions</p>
            <h2 id="related-decisions-title" className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-white md:text-7xl">Continue with the property, service, or local context.</h2>
            <div className="mt-14 grid gap-px border border-white/15 bg-white/15 md:grid-cols-3">{post.paths.map(({ label, title, copy, href, icon: Icon }) => <Link key={href} href={href} className="group bg-black p-7 transition hover:bg-[#171717] md:p-9"><div className="flex items-start justify-between gap-5"><Icon className="h-6 w-6 text-[#d7b56d]" aria-hidden="true" /><ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" /></div><p className="mt-9 text-[10px] font-bold uppercase tracking-[0.22em] text-[#d7b56d]">{label}</p><h3 className="mt-3 font-serif text-3xl text-white">{title}</h3><p className="mt-4 leading-7 text-neutral-400">{copy}</p></Link>)}</div>
          </div>
        </section>

        <section className="bg-white py-20 md:py-28" aria-labelledby="related-reading-title">
          <div className="mx-auto max-w-[1440px] px-5 md:px-9">
            <div className="flex flex-col justify-between gap-6 border-b border-black/15 pb-8 md:flex-row md:items-end"><div><p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#875d17]">Related Reading</p><h2 id="related-reading-title" className="mt-4 font-serif text-5xl font-semibold leading-tight text-black">The next useful brief.</h2></div><Link href="/blog" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-black hover:text-[#875d17]">View All Insights <ArrowRight className="h-4 w-4" /></Link></div>
            <div className="mt-8 grid gap-px border border-black/10 bg-black/10 md:grid-cols-3">{relatedPosts.map((related) => <Link key={related.slug} href={`/blog/${related.slug}`} className="group bg-[#faf9f6] p-7 transition hover:bg-white md:p-8"><BookOpen className="h-5 w-5 text-[#9b6d1d]" aria-hidden="true" /><p className="mt-8 text-[10px] font-bold uppercase tracking-[0.22em] text-[#875d17]">{related.category}</p><h3 className="mt-4 font-serif text-3xl leading-tight text-black">{related.title}</h3><div className="mt-8 flex items-center justify-between gap-5 border-t border-black/15 pt-5"><span className="text-xs text-neutral-500">{related.readTime}</span><ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></div></Link>)}</div>
          </div>
        </section>

        <section id="article-consultation" className="scroll-mt-20 bg-[#f5f2ec] py-20 md:py-28" aria-labelledby="article-consultation-title">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
            <div className="lg:sticky lg:top-28"><p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#875d17]">Property-Specific Conversation</p><h2 id="article-consultation-title" className="mt-6 max-w-xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">Apply the framework to the actual home.</h2><p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">Share the property, timing, and decision you are considering. Josh will review the relevant context before the conversation.</p></div>
            <LeadForm leadType="selling" showAddress title="Request a private seller consultation" subtitle="Tell Josh which property, timing, pricing, preparation, or negotiation decision should guide the conversation." buttonText="Request Seller Consultation" />
          </div>
        </section>
      </article>
    </>
  );
}
