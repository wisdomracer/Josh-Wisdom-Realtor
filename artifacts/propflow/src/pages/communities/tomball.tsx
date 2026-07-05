import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { MapPin, Store, Trees } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";

export default function Tomball() {
  return (
    <>
      <Helmet>
        <title>Tomball TX Real Estate & Neighborhood Guide | Josh Wisdom</title>
        <meta name="description" content="Discover Tomball real estate. Explore acreage properties, historic charm, and new master-planned communities in the Tomball area." />
        <link rel="canonical" href="https://thewoodlandslistingagent.com/communities/tomball" />
      </Helmet>

      <section className="relative py-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="flex min-h-64 items-center justify-center bg-black p-8 text-center text-white"><div><p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Local Realtor</p><p className="mt-3 font-serif text-3xl text-white">The Woodlands, Tomball & Greater Houston</p><p className="mt-4 text-sm uppercase tracking-[0.22em] text-white/50">Home Value . Selling . Buying</p></div></div>
          <div className="absolute inset-0 bg-primary/70 mix-blend-multiply"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <span className="text-white/80 uppercase tracking-widest text-sm font-semibold mb-4 block">Community Guide</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 text-white drop-shadow-md">Tomball</h1>
          <p className="text-xl text-white/90 leading-relaxed drop-shadow">
            Historic charm, excellent schools, and a seamless blend of acreage living and modern convenience.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-serif text-primary mb-6">Welcome to Tomball</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Tomball offers a unique lifestyle that bridges the gap between rural tranquility and suburban convenience. Known for its award-winning Tomball Independent School District (TISD) and a strong sense of community, it has become a highly sought-after destination north of Houston.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  With the expansion of the Grand Parkway (Highway 99) and Highway 249, Tomball provides excellent connectivity while retaining its historic, small-town feel.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-8">
                <div className="bg-secondary/50 p-6 rounded-xl border border-border">
                  <Store className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-serif text-primary mb-2">Old Town Tomball</h3>
                  <p className="text-muted-foreground">
                    A charming historic downtown featuring antique shops, local boutiques, acclaimed barbecue, and a renowned weekly farmers market.
                  </p>
                </div>
                <div className="bg-secondary/50 p-6 rounded-xl border border-border">
                  <Trees className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-serif text-primary mb-2">Acreage & Equestrian</h3>
                  <p className="text-muted-foreground">
                    Unlike more densely developed suburbs, Tomball still offers significant opportunities for acreage properties, custom estates, and equestrian-friendly living.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-serif text-primary mb-6">Real Estate Options</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The Tomball real estate market is incredibly diverse. Buyers can find everything from established, tree-lined neighborhoods to brand-new master-planned developments with resort-style amenities, and sprawling country estates offering privacy and space.
                </p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <LeadForm 
                  leadType="buying"
                  showArea={false}
                  title="Explore Tomball"
                  subtitle="Let me know what type of property you're looking for."
                  buttonText="Contact Josh"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
