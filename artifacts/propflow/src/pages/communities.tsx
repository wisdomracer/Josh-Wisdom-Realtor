import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Communities() {
  const communities = [
    { name: "The Woodlands", slug: "the-woodlands", description: "Real estate help for The Woodlands homeowners, from luxury listings to move-up homes and relocation moves." },
    { name: "Tomball", slug: "tomball", description: "Real estate help for Tomball homeowners, including acreage properties, established neighborhoods, and new construction areas." },
    { name: "Greater Houston", slug: "greater-houston", description: "Real estate help across Spring, Magnolia, Conroe, Cypress, Houston, Klein, Montgomery, Kingwood, Katy, Sugar Land, and nearby suburbs." },
  ];

  return (
    <>
      <Helmet>
        <title>Communities | The Woodlands, Tomball, Greater Houston Real Estate</title>
        <meta name="description" content="Explore The Woodlands, Tomball, and Greater Houston communities with Josh Wisdom Realtor." />
        <link rel="canonical" href="https://thewoodlandslistingagent.com/communities" />
      </Helmet>

      <section className="bg-black py-20 text-white md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-400">Communities</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">Explore The Woodlands, Tomball, and Greater Houston.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">Learn where to live, what makes each area different, and what to know before selling or buying a home.</p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto grid gap-5 px-4 md:grid-cols-3 md:px-6">
          {communities.map((community) => (
            <Link key={community.slug} href={`/communities/${community.slug}`} className="group border border-neutral-200 p-7 transition hover:border-amber-500">
              <div className="mb-8 flex h-28 items-center justify-between bg-black p-5 text-white">
                <span className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">Guide</span>
                <span className="text-5xl font-semibold text-white/10">{community.name.slice(0, 2).toUpperCase()}</span>
              </div>
              <h2 className="text-3xl font-semibold text-black">{community.name}</h2>
              <p className="mt-4 leading-7 text-neutral-700">{community.description}</p>
              <span className="mt-6 inline-flex items-center text-sm font-semibold uppercase tracking-[0.16em] text-amber-700">Explore {community.name} <ArrowRight className="ml-2 h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}