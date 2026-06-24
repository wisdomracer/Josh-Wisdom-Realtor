import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowRight, MapPin, TreePine, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";

export default function TheWoodlands() {
  return (
    <>
      <Helmet>
        <title>The Woodlands Real Estate & Homes for Sale | Josh Wisdom</title>
        <meta name="description" content="Explore The Woodlands, Texas real estate. Learn about the villages, schools, and lifestyle in this premier forested master-planned community." />
        <link rel="canonical" href="https://thewoodlandslistingagent.com/communities/the-woodlands" />
      </Helmet>

      <section className="relative py-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="flex min-h-64 items-center justify-center bg-black p-8 text-center text-white"><div><p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Real media needed</p><p className="mt-3 text-lg text-white/70">Add approved real photography here. No fake property or community image is being shown.</p></div></div>
          <div className="absolute inset-0 bg-primary/70 mix-blend-multiply"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <span className="text-white/80 uppercase tracking-widest text-sm font-semibold mb-4 block">Community Guide</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 text-white drop-shadow-md">The Woodlands</h1>
          <p className="text-xl text-white/90 leading-relaxed drop-shadow">
            A premier master-planned community where nature and luxury living seamlessly intertwine.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h2 className="text-3xl font-serif text-primary mb-6">Living in The Woodlands</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  The Woodlands isn't just a suburb; it's a carefully curated lifestyle. Established in 1974, it was designed with the vision of preserving the natural forested environment while providing exceptional amenities, top-rated schools, and robust commercial centers.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Divided into distinct "villages," each area offers its own unique character, parks, and shopping centers, connected by over 220 miles of winding hike and bike trails.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-serif text-primary mb-6">The Villages</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {[
                    "Alden Bridge",
                    "Cochran's Crossing",
                    "College Park",
                    "Creekside Park",
                    "Grogan's Mill",
                    "Indian Springs",
                    "Panther Creek",
                    "Sterling Ridge",
                    "Town Center"
                  ].map((village) => (
                    <div key={village} className="flex items-center gap-3 bg-secondary/50 p-4 rounded-lg">
                      <TreePine className="w-5 h-5 text-primary" />
                      <span className="font-medium text-foreground">{village}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-serif text-primary mb-6">Key Landmarks & Amenities</h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex gap-4">
                    <Navigation className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <strong className="text-foreground block">The Woodlands Waterway & Market Street</strong>
                      The vibrant heart of the community, offering upscale shopping, dining, and entertainment along a scenic canal.
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <Navigation className="w-6 h-6 text-primary shrink-0" />
                    <div>
                      <strong className="text-foreground block">Hughes Landing</strong>
                      A premier mixed-use development situated on Lake Woodlands, featuring restaurant row, luxury living, and water activities.
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
                  <h3 className="font-serif text-xl text-primary mb-2">Interested in The Woodlands?</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    I can help you navigate the specific villages and find the perfect home for your lifestyle.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/contact">Schedule a Tour</Link>
                  </Button>
                </div>
                
                <LeadForm 
                  leadType="buying"
                  showArea={false}
                  title="Request Area Info"
                  subtitle="Get more details about schools and specific villages."
                  buttonText="Get Information"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
