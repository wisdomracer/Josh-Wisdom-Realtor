import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home as HomeIcon, MapPin, Key, Mail, Phone } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Josh Wisdom | The Woodlands & Greater Houston Real Estate</title>
        <meta name="description" content="Discover upscale living in the piney woods. Josh Wisdom is your trusted local real estate expert in The Woodlands, Tomball, and Greater Houston." />
        <link rel="canonical" href="https://joshwisdomrealestate.com/" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-woodlands.png" 
            alt="Luxury home in heavily forested upscale neighborhood in The Woodlands" 
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6 drop-shadow-md">
              Find your roots in <br className="hidden md:block"/> the piney woods.
            </h1>
            <p className="text-xl text-white/90 mb-10 max-w-2xl leading-relaxed drop-shadow">
              Expert real estate guidance for The Woodlands, Tomball, and the master-planned communities of Greater Houston. 
              Grounded in local knowledge, focused on your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="h-12 px-8 text-base bg-white text-primary hover:bg-white/90">
                <Link href="/contact">Schedule a Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base border-white text-white hover:bg-white/10 hover:text-white bg-transparent">
                <Link href="/home-valuation">Free Home Valuation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-accent-foreground uppercase tracking-widest text-sm font-semibold">Your Local Guide</span>
              <h2 className="text-4xl md:text-5xl font-serif text-primary">A neighbor who knows the nuances.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The northern Houston suburbs aren't just subdivisions—they're distinct communities, each with its own character, school zones, and lifestyle. Whether you're drawn to the winding pathways of The Woodlands or the charming history of Tomball, you need an expert who knows the territory.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm Josh Wisdom. I don't just sell homes here; I understand what makes these communities special. My approach is warm, confident, and never pushy—designed to give you clarity in your real estate decisions.
              </p>
              <div className="pt-4">
                <Link href="/about" className="inline-flex items-center text-primary font-medium hover:underline group">
                  More about Josh 
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="/images/josh-wisdom.png" 
                  alt="Josh Wisdom, The Woodlands Real Estate Agent" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-lg shadow-lg border border-border max-w-[240px]">
                <p className="font-serif italic text-lg text-primary">"Rooted in the community, dedicated to your goals."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-serif text-primary mb-4">How I can help</h2>
            <p className="text-muted-foreground text-lg">Comprehensive real estate services tailored to your specific needs in the Greater Houston market.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Buying a Home",
                description: "Navigate the competitive market with an expert who understands school zones, commutes, and community amenities.",
                icon: HomeIcon,
                link: "/buy",
                linkText: "Buyer Services"
              },
              {
                title: "Selling Your Home",
                description: "Strategic pricing, exceptional marketing, and calm negotiation to maximize your home's value in today's market.",
                icon: Key,
                link: "/sell",
                linkText: "Seller Services"
              },
              {
                title: "Relocation",
                description: "Moving to Houston? Let me introduce you to the area and find the perfect community for your lifestyle.",
                icon: MapPin,
                link: "/relocation",
                linkText: "Relocation Guide"
              }
            ].map((service, i) => (
              <div key={i} className="bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow group">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-serif text-primary mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                <Link href={service.link} className="inline-flex items-center text-sm font-medium text-primary hover:underline">
                  {service.linkText} <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Communities Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-serif text-primary mb-4">Featured Communities</h2>
              <p className="text-muted-foreground text-lg">Explore the diverse, master-planned neighborhoods of Houston's northern suburbs.</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/communities">View All Areas</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/communities/the-woodlands" className="group relative rounded-xl overflow-hidden aspect-[16/9] md:aspect-[4/3] block">
              <img 
                src="/images/the-woodlands.png" 
                alt="The Woodlands Waterway" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-3xl font-serif text-white mb-2">The Woodlands</h3>
                <p className="text-white/80 max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  Forested villages, top-rated schools, and exceptional amenities.
                </p>
              </div>
            </Link>
            
            <Link href="/communities/tomball" className="group relative rounded-xl overflow-hidden aspect-[16/9] md:aspect-[4/3] block">
              <img 
                src="/images/tomball.png" 
                alt="Historic Tomball neighborhood" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-3xl font-serif text-white mb-2">Tomball</h3>
                <p className="text-white/80 max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  Historic charm meets modern convenience with acreage properties.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA / Form Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Abstract background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="absolute left-full transform -translate-x-1/2 -translate-y-1/4" width="404" height="784" fill="none" viewBox="0 0 404 784">
            <defs>
              <pattern id="b1e6e422-73f8-40a5-b5f9-2fac7f0f6229" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="784" fill="url(#b1e6e422-73f8-40a5-b5f9-2fac7f0f6229)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Ready to start the conversation?</h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-lg leading-relaxed">
                Whether you're ready to move tomorrow or just curious about the market, I'm here to provide honest, helpful guidance without the pressure.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/60">Call or Text</p>
                    <p className="text-lg font-medium">(281) 555-0123</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/60">Email</p>
                    <p className="text-lg font-medium">josh@thewoodlandslistingagent.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-foreground">
              <LeadForm 
                leadType="general" 
                title="Send a Message"
                subtitle="Fill out the form below and I'll get back to you within 24 hours."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
