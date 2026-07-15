import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PhotoCredit } from "@/components/location-hero";
import { locationPhotos, type LocationPhoto } from "@/config/location-photos";

type CommunityCard = {
  name: string;
  slug: string;
  description: string;
  photo: LocationPhoto;
};

const communities: CommunityCard[] = [
  {
    name: "The Woodlands",
    slug: "the-woodlands",
    description: "Village-level guidance spanning established neighborhoods, golf communities, Waterway access, and newer sections.",
    photo: locationPhotos.woodlands,
  },
  {
    name: "Tomball",
    slug: "tomball",
    description: "Compare established neighborhoods, acreage settings, newer communities, daily routes, and property-specific ownership needs.",
    photo: locationPhotos.tomball,
  },
  {
    name: "Greater Houston",
    slug: "greater-houston",
    description: "A structured starting point for comparing Spring, Magnolia, Conroe, Cypress, Montgomery, and other Houston-area options.",
    photo: locationPhotos.houston,
  },
];

export default function Communities() {
  return (
    <>
      <Helmet>
        <title>Community Guides | The Woodlands & North Houston</title>
        <meta name="description" content="Compare The Woodlands, Tomball, and Greater Houston communities with property-specific guidance from Josh Wisdom Realtor." />
        <link rel="canonical" href="https://joshwisdomrealtor.com/communities" />
      </Helmet>

      <section className="bg-[#050505] text-white">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-9 md:py-32">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7b56d]">Community Intelligence</p>
          <h1 className="mt-6 max-w-5xl font-serif text-5xl font-semibold leading-[0.94] tracking-[-0.035em] md:text-7xl">The address is only the beginning of the comparison.</h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">Compare the setting, property type, daily routes, ownership costs, and buyer alternatives that make each market distinct.</p>
        </div>
      </section>

      <section className="bg-[#f7f5f0] py-20 md:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-5 md:px-9 lg:grid-cols-3">
          {communities.map((community) => (
            <article key={community.slug} className="group overflow-hidden border border-black/10 bg-white">
              <figure className="relative h-64 overflow-hidden">
                <img src={community.photo.src} alt={community.photo.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]" style={{ objectPosition: community.photo.objectPosition }} loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <PhotoCredit photo={community.photo} />
              </figure>
              <div className="p-7 md:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#9b6d1d]">Market Guide</p>
                <h2 className="mt-4 font-serif text-4xl text-black">{community.name}</h2>
                <p className="mt-4 min-h-24 leading-7 text-neutral-700">{community.description}</p>
                <Link href={`/communities/${community.slug}`} className="mt-7 inline-flex items-center text-[11px] font-bold uppercase tracking-[0.2em] text-black hover:text-[#9b6d1d]">
                  Explore {community.name} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
