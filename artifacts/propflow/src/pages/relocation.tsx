import { Helmet } from "react-helmet-async";
import { LeadForm } from "@/components/forms/lead-form";

export default function Relocation() {
  return (
    <>
      <Helmet>
        <title>Relocating to Greater Houston | The Woodlands Real Estate</title>
        <meta name="description" content="Moving to Houston? Discover the northern suburbs including The Woodlands and Tomball with local expert Josh Wisdom." />
        <link rel="canonical" href="https://thewoodlandslistingagent.com/relocation" />
      </Helmet>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span className="text-accent-foreground uppercase tracking-widest text-sm font-semibold">Welcome to Texas</span>
              <h1 className="text-4xl md:text-5xl font-serif text-primary">Relocating to the Houston Area?</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Moving to a new city can be overwhelming. The Houston metro area is vast, and choosing the right suburb is crucial for your lifestyle and commute.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I specialize in helping out-of-state and out-of-city buyers find their place in the northern suburbs—including The Woodlands, Tomball, Spring, and Conroe. I can guide you through the differences in communities, school zones, and amenities.
              </p>
              
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Virtual tours and remote showings</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Area orientation and community tours</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Guidance on commute times to major employment hubs</span>
                </li>
              </ul>
            </div>

            <div className="bg-secondary p-2 rounded-2xl">
              <LeadForm 
                leadType="relocation"
                showArea={true}
                title="Request Relocation Guide"
                subtitle="Tell me a bit about your timeline and what you're looking for in a community."
                buttonText="Connect with Josh"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
