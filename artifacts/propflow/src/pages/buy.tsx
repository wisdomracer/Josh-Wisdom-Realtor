import { Helmet } from "react-helmet-async";
import { LeadForm } from "@/components/forms/lead-form";

export default function Buy() {
  return (
    <>
      <Helmet>
        <title>Buy a Home in The Woodlands & Tomball | Josh Wisdom</title>
        <meta name="description" content="Navigate the home buying process in the northern Houston suburbs with local expert Josh Wisdom. First-time buyers, new construction, and luxury homes." />
        <link rel="canonical" href="https://joshwisdomrealtor.com/buy" />
      </Helmet>

      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-6">Buying a Home</h1>
          <p className="text-xl text-primary-foreground/80 leading-relaxed">
            Finding the right home means finding the right community. Let's navigate the market together with clarity and confidence.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-3xl font-serif text-primary">Your Buyer Journey</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The market in The Woodlands, Tomball, and Greater Houston is dynamic. My goal is to ensure you are fully prepared, from understanding school zones to crafting a winning offer.
              </p>
              
              <div className="space-y-8 pt-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Local Expertise</h3>
                  <p className="text-muted-foreground">I know the nuances of the villages, the commute times, and the upcoming developments that could affect your investment.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">New Construction</h3>
                  <p className="text-muted-foreground">Having representation when buying new construction is critical. I can help you navigate builder contracts, design center choices, and inspections.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">First-Time Buyers</h3>
                  <p className="text-muted-foreground">I take the time to explain every step of the process, ensuring you feel comfortable and informed from pre-approval to closing day.</p>
                </div>
              </div>
            </div>

            <div>
              <div className="sticky top-24">
                <LeadForm 
                  leadType="buying"
                  showArea={true}
                  title="Start Your Search"
                  subtitle="Tell me what you're looking for, and let's find your perfect home."
                  buttonText="Request Consultation"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
