import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export const blogPosts = [
  {
    slug: "how-to-price-a-home-in-the-woodlands",
    title: "How To Price A Home In The Woodlands Without Leaving Money On The Table",
    description: "A seller-focused pricing guide for The Woodlands homeowners comparing village demand, active competition, condition, and buyer psychology.",
    date: "2026-06-24",
    readTime: "7 min read",
    category: "Seller Strategy",
    sections: [
      ["Start with the village, not the ZIP code", "The Woodlands is a collection of distinct villages and luxury pockets. Carlton Woods, East Shore, Creekside Park, Sterling Ridge, Alden Bridge, and Panther Creek can attract different buyers even when the homes share similar square footage."],
      ["Study active competition", "Recent sales matter, but your real pricing pressure comes from homes buyers can choose today. A strong list price accounts for nearby alternatives, condition, days on market, builder age, lot setting, updates, and buyer urgency."],
      ["Protect leverage before launch", "The first two weeks shape perception. If the home launches too high without a clear value story, buyers may wait. If it launches with strong positioning, quality visuals, and a clean showing experience, negotiation starts from a stronger place."],
    ],
  },
  {
    slug: "what-carlton-woods-buyers-compare",
    title: "What Carlton Woods Buyers Compare Before Making A Luxury Offer",
    description: "Luxury buyer behavior in Carlton Woods, including privacy, lot quality, golf-course setting, architecture, condition, and lifestyle presentation.",
    date: "2026-06-24",
    readTime: "6 min read",
    category: "Luxury Homes",
    sections: [
      ["Luxury buyers compare story and substance", "A Carlton Woods listing should communicate privacy, architecture, condition, setting, and lifestyle without overexplaining. The buyer needs to understand why this home is special before the showing."],
      ["Presentation must match the price point", "Photography, lighting, copy, floor-plan context, and preparation all shape perceived value. A luxury home can lose momentum when the marketing feels ordinary."],
      ["Terms matter at the top of the market", "High-value offers can involve financing nuance, appraisal strategy, inspection scope, furniture or fixture exclusions, and privacy considerations. Price is only one part of the negotiation."],
    ],
  },
  {
    slug: "selling-near-the-woodlands-waterway",
    title: "Selling Near The Woodlands Waterway: What Premium Buyers Notice First",
    description: "How to position East Shore, Waterway, Market Street, and Hughes Landing-area homes for lifestyle-driven buyers.",
    date: "2026-06-24",
    readTime: "5 min read",
    category: "Neighborhood Positioning",
    sections: [
      ["Lifestyle is part of the value", "Near the Waterway, buyers often compare walkability, dining access, lock-and-leave convenience, lake proximity, and the feel of the surrounding streetscape."],
      ["Lead with the setting", "The marketing should help buyers imagine the daily rhythm: restaurants, Market Street, Hughes Landing, trails, events, and easy access to The Woodlands core."],
      ["Do not bury the convenience", "If a property has low-maintenance features, premium parking, elevator access, outdoor space, or strong views, those details should be easy to understand quickly."],
    ],
  },
  {
    slug: "creekside-park-seller-checklist",
    title: "Creekside Park Seller Checklist Before Going Live",
    description: "A practical pre-listing checklist for Creekside Park homeowners preparing for photos, showings, pricing, and buyer objections.",
    date: "2026-06-24",
    readTime: "6 min read",
    category: "Pre-Listing Prep",
    sections: [
      ["Review the buyer pool", "Creekside Park buyers often compare age, floor plan, schools, commute, amenities, and outdoor living. The listing should make the strongest points obvious."],
      ["Handle small objections early", "Touch-up paint, landscaping, lighting, cleaning, hardware, and simple repairs can reduce friction. The goal is not perfection. The goal is buyer confidence."],
      ["Prepare the launch assets", "Before the home goes live, align photography, property copy, neighborhood notes, showing instructions, and pricing strategy so the listing feels controlled."],
    ],
  },
];

export function BlogIndex() {
  return (
    <>
      <Helmet>
        <title>The Woodlands Real Estate Blog | Josh Wisdom Realtor</title>
        <meta name="description" content="Seller guides, luxury home positioning, and neighborhood market insight for The Woodlands, Tomball, and Greater Houston homeowners." />
        <link rel="canonical" href="https://thewoodlandslistingagent.com/blog" />
      </Helmet>
      <section className="bg-black py-20 text-white md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-400">Local Seller Resources</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">The Woodlands real estate articles built for sellers.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">Practical guidance on pricing, preparation, marketing, and negotiation in The Woodlands and Greater Houston.</p>
        </div>
      </section>
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto grid gap-5 px-4 md:grid-cols-2 md:px-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group border border-neutral-200 p-7 transition hover:border-amber-500">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">{post.category}</p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight text-black group-hover:text-amber-700">{post.title}</h2>
              <p className="mt-4 leading-7 text-neutral-700">{post.description}</p>
              <span className="mt-6 inline-flex items-center text-sm font-semibold uppercase tracking-[0.16em] text-black">Read Article <ArrowRight className="ml-2 h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function BlogPost({ slug }: { slug: string }) {
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: "Josh Wisdom" },
    publisher: { "@type": "Organization", name: "Josh Wisdom Realtor" },
    mainEntityOfPage: `https://thewoodlandslistingagent.com/blog/${post.slug}`,
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Josh Wisdom Realtor</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={`https://thewoodlandslistingagent.com/blog/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <article className="bg-white">
        <header className="bg-black py-20 text-white md:py-28">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-400">{post.category}</p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-6xl">{post.title}</h1>
            <p className="mt-5 text-sm text-white/55">{post.date} � {post.readTime}</p>
          </div>
        </header>
        <div className="container mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-20">
          <p className="text-xl leading-9 text-neutral-700">{post.description}</p>
          <div className="mt-12 space-y-10">
            {post.sections.map(([heading, copy]) => (
              <section key={heading} className="border-t border-neutral-200 pt-8">
                <h2 className="text-3xl font-semibold text-black">{heading}</h2>
                <p className="mt-4 text-lg leading-8 text-neutral-700">{copy}</p>
              </section>
            ))}
          </div>
          <div className="mt-14 bg-neutral-100 p-7">
            <h2 className="text-2xl font-semibold text-black">Want a local read on your home?</h2>
            <p className="mt-3 leading-7 text-neutral-700">Ask Josh for a seller-focused value review before you make timing, preparation, or pricing decisions.</p>
            <Link href="/home-valuation" className="mt-5 inline-flex items-center font-semibold text-amber-700">Get Home Value <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </div>
        </div>
      </article>
    </>
  );
}