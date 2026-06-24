import { Helmet } from "react-helmet-async";
import { LeadForm } from "@/components/forms/lead-form";

export default function HomeValuation() {
  return (
    <>
      <Helmet>
        <title>Free Home Valuation | The Woodlands & Tomball Real Estate</title>
        <meta name="description" content="Discover the true value of your home in The Woodlands, Tomball, or Greater Houston. Request a free, data-driven market analysis from Josh Wisdom." />
        <link rel="canonical" href="https://joshwisdomrealestate.com/home-valuation" />
      </Helmet>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-serif text-primary">What is your home worth in today's market?</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Automated online estimates can't account for the unique features of your home, recent upgrades, or the specific nuances of your neighborhood. 
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I provide a comprehensive, data-driven market analysis based on deep local knowledge of The Woodlands, Tomball, and surrounding areas.
              </p>
              
              <div className="space-y-6 pt-4">
                <h3 className="text-xl font-serif text-primary">What you'll receive:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">1</div>
                    <span className="text-foreground">A detailed comparative market analysis (CMA).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">2</div>
                    <span className="text-foreground">Insights into current buyer demand in your specific village or neighborhood.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">3</div>
                    <span className="text-foreground">Recommendations on potential improvements to maximize your return.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-secondary p-2 rounded-2xl">
              <LeadForm 
                leadType="valuation"
                showAddress={true}
                title="Request Valuation"
                subtitle="Provide your details below to receive a personalized report."
                buttonText="Get My Home Valuation"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
