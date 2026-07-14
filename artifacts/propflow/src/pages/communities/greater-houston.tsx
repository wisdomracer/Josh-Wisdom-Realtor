import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommunityHero } from "@/components/location-hero";
import { locationPhotos } from "@/config/location-photos";

export default function GreaterHouston() {
  const areas = [
    "Spring", "Magnolia", "Conroe", "Cypress", 
    "Klein", "Montgomery", "Kingwood", "Katy"
  ];

  return (
    <>
      <Helmet>
        <title>Greater Houston Suburbs Real Estate | Josh Wisdom</title>
        <meta name="description" content="Explore real estate in the Greater Houston suburbs including Spring, Magnolia, Conroe, and Cypress with local expert Josh Wisdom." />
        <link rel="canonical" href="https://joshwisdomrealtor.com/communities/greater-houston" />
      </Helmet>

      <CommunityHero
        eyebrow="Community Guide"
        title="Greater Houston"
        description="Discover the diverse, thriving communities that make up the northern and western suburbs of Houston."
        photo={locationPhotos.houston}
      />

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif text-primary mb-6">Expanding Your Horizons</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              While deeply rooted in The Woodlands and Tomball, my expertise extends across the expansive northern and western corridors of Greater Houston. Whether you prioritize lake access, acreage, master-planned amenities, or specific school districts, the Houston suburbs offer a perfect fit.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {areas.map((area) => (
              <div key={area} className="bg-secondary p-4 rounded-lg flex items-center justify-center gap-2 border border-border">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-medium text-foreground">{area}</span>
              </div>
            ))}
          </div>

          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center border border-primary/10">
            <h3 className="text-2xl font-serif text-primary mb-4">Need help narrowing it down?</h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              If you are relocating to Houston or simply looking for a change of scenery, finding the right suburb is the first step. Let's discuss your commute, what matters day to day, and goals to identify the communities that align with your vision.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/relocation">Request Relocation Guide</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Schedule a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
