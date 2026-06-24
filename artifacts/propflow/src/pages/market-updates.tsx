import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function MarketUpdates() {
  return (
    <>
      <Helmet>
        <title>Real Estate Market Updates | The Woodlands & Houston | Josh Wisdom</title>
        <meta name="description" content="Stay informed on the local real estate market in The Woodlands, Tomball, and Greater Houston with insights from Josh Wisdom." />
        <link rel="canonical" href="https://thewoodlandslistingagent.com/market-updates" />
      </Helmet>

      <section className="py-24 bg-secondary text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif text-primary mb-6">Market Insights</h1>
          <p className="text-xl text-muted-foreground">
            Clear, contextual analysis of the real estate landscape in Houston's northern suburbs.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background min-h-[50vh]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="bg-card p-12 rounded-2xl border border-border shadow-sm">
            <h2 className="text-2xl font-serif text-primary mb-4">Want the latest local data?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Real estate is hyper-local. Broad national or state-level statistics often don't reflect what is actually happening in a specific village in The Woodlands or a neighborhood in Tomball. 
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              For an accurate, up-to-date analysis of your specific area of interest, please reach out directly for a personalized market report.
            </p>
            <Link href="/contact" className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
              Request a Local Market Report <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
