import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Store, Trees } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { CommunityHero } from "@/components/location-hero";
import { locationPhotos } from "@/config/location-photos";

export default function Tomball() {
  return (
    <>
      <Helmet>
        <title>Tomball TX Real Estate & Neighborhood Guide | Josh Wisdom</title>
        <meta name="description" content="Discover Tomball real estate. Explore acreage properties, historic charm, and new master-planned communities in the Tomball area." />
        <link rel="canonical" href="https://joshwisdomrealtor.com/communities/tomball" />
      </Helmet>

      <CommunityHero
        eyebrow="Community Guide"
        title="Tomball"
        description="Historic charm, excellent schools, and a seamless blend of acreage living and modern convenience."
        photo={locationPhotos.tomball}
      />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-serif text-primary mb-6">Welcome to Tomball</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Tomball includes a historic town center, established subdivisions, newer master-planned communities, and rural acreage. Buyers should compare the exact property, commute, taxes, school zoning, and nearby development rather than treating it as one uniform market.
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
