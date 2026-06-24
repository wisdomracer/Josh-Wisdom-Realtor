import { Helmet } from "react-helmet-async";
import { LeadForm } from "@/components/forms/lead-form";

export default function LuxuryHomes() {
  return (
    <>
      <Helmet>
        <title>Luxury Homes in The Woodlands & Greater Houston | Josh Wisdom</title>
        <meta name="description" content="Explore luxury real estate and upscale properties in The Woodlands, Tomball, and Greater Houston with luxury specialist Josh Wisdom." />
        <link rel="canonical" href="https://joshwisdomrealestate.com/luxury-homes" />
      </Helmet>

      <section className="relative py-32 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/luxury-interior.png" 
            alt="Luxury home interior" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-primary/70 mix-blend-multiply"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 text-white">Luxury Properties</h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Discreet, refined representation for high-end buyers and sellers in Houston's most exclusive communities.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-3xl font-serif text-primary">Exceptional Service for Exceptional Properties</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The luxury market in the northern Houston suburbs requires a nuanced approach. Whether you are seeking a sprawling estate in Tomball, a custom home in Carlton Woods, or a waterfront property on Lake Conroe, I provide the highest level of service and discretion.
              </p>
              
              <div className="space-y-6 pt-4">
                <div className="border-l-2 border-primary pl-6 py-2">
                  <h3 className="text-xl font-serif text-primary mb-2">For Buyers</h3>
                  <p className="text-muted-foreground">Access to exclusive neighborhoods, knowledge of unlisted properties, and expert guidance through complex high-value transactions.</p>
                </div>
                <div className="border-l-2 border-primary pl-6 py-2">
                  <h3 className="text-xl font-serif text-primary mb-2">For Sellers</h3>
                  <p className="text-muted-foreground">Bespoke marketing strategies, premium presentation, and a network of qualified buyers to ensure your luxury home receives the attention it deserves.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-card p-2 rounded-2xl border border-border shadow-sm">
                <LeadForm 
                  leadType="luxury"
                  showArea={true}
                  title="Private Consultation"
                  subtitle="Contact me to discuss your luxury real estate needs with complete confidentiality."
                  buttonText="Request Private Consultation"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
