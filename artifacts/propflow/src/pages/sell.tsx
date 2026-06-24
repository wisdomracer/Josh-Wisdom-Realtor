import { Helmet } from "react-helmet-async";
import { LeadForm } from "@/components/forms/lead-form";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Sell() {
  return (
    <>
      <Helmet>
        <title>Sell Your Home in The Woodlands & Tomball | Josh Wisdom</title>
        <meta name="description" content="Sell your home for maximum value with Josh Wisdom. Strategic pricing, exceptional marketing, and calm negotiation in The Woodlands and Greater Houston." />
        <link rel="canonical" href="https://joshwisdomrealestate.com/sell" />
      </Helmet>

      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/suburban-street.png" alt="" className="w-full h-full object-cover mix-blend-overlay" />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Selling Your Home</h1>
          <p className="text-xl text-primary-foreground/80 leading-relaxed">
            Strategic pricing, exceptional marketing, and calm negotiation to maximize your return.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-3xl font-serif text-primary">A Strategic Approach to Selling</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Selling a home requires more than putting a sign in the yard. It requires an understanding of how buyers are searching, what they value, and how to present your home in its best light.
              </p>
              
              <div className="space-y-6 pt-4">
                <div className="bg-secondary p-6 rounded-xl border border-border">
                  <h3 className="text-xl font-serif text-primary mb-2">Data-Driven Pricing</h3>
                  <p className="text-muted-foreground">Pricing is the most critical factor. I provide a deep analysis of recent sales, active competition, and market trends to position your home correctly from day one.</p>
                </div>
                <div className="bg-secondary p-6 rounded-xl border border-border">
                  <h3 className="text-xl font-serif text-primary mb-2">Elevated Presentation</h3>
                  <p className="text-muted-foreground">First impressions happen online. I utilize professional photography, targeted digital marketing, and staging advice to ensure your home stands out.</p>
                </div>
                <div className="bg-secondary p-6 rounded-xl border border-border">
                  <h3 className="text-xl font-serif text-primary mb-2">Calm Negotiation</h3>
                  <p className="text-muted-foreground">I advocate fiercely for your interests while maintaining the professionalism needed to keep transactions on track and successfully reach the closing table.</p>
                </div>
              </div>

              <div className="pt-4">
                <Button asChild variant="outline" size="lg">
                  <Link href="/home-valuation">Get a Free Home Valuation</Link>
                </Button>
              </div>
            </div>

            <div>
              <div className="sticky top-24">
                <LeadForm 
                  leadType="selling"
                  showAddress={true}
                  title="Ready to sell?"
                  subtitle="Let's discuss your timeline and goals."
                  buttonText="Schedule Listing Appointment"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
