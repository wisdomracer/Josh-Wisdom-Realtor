import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function Communities() {
  const communities = [
    {
      name: "The Woodlands",
      slug: "the-woodlands",
      image: "/images/the-woodlands.png",
      description: "A premier master-planned community known for its extensive parks, winding trails, and top-tier amenities."
    },
    {
      name: "Tomball",
      slug: "tomball",
      image: "/images/tomball.png",
      description: "Historic charm, excellent schools, and a mix of classic neighborhoods and acreage properties."
    },
    {
      name: "Greater Houston",
      slug: "greater-houston",
      image: "/images/suburban-street.png",
      description: "Including Spring, Magnolia, Conroe, and other vibrant suburbs offering diverse lifestyle options."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Communities | The Woodlands, Tomball, Greater Houston Real Estate</title>
        <meta name="description" content="Explore the diverse neighborhoods and master-planned communities north of Houston with local expert Josh Wisdom." />
        <link rel="canonical" href="https://joshwisdomrealestate.com/communities" />
      </Helmet>

      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Communities We Serve</h1>
          <p className="text-xl text-primary-foreground/80">
            Discover the unique character and lifestyle of Houston's northern suburbs.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid gap-12">
            {communities.map((community) => (
              <div key={community.slug} className="group grid md:grid-cols-2 gap-8 items-center bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all">
                <div className="aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
                  <img 
                    src={community.image} 
                    alt={community.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 md:p-12 space-y-4">
                  <h2 className="text-3xl font-serif text-primary">{community.name}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {community.description}
                  </p>
                  <div className="pt-4">
                    <Link href={`/communities/${community.slug}`} className="inline-flex items-center text-primary font-medium hover:underline">
                      Explore {community.name} <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
