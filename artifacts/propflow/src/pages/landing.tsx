import { Link } from "wouter";
import { Building2, Search, Zap, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <MapPin className="w-6 h-6 text-accent" />
            HoustonForeclosureAlerts
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="font-medium">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-24 px-6 relative overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-90"></div>
          
          <div className="container mx-auto relative z-10 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-2 text-sm font-semibold text-accent mb-8">
              <MapPin className="w-4 h-4" />
              Houston, TX — Harris County &amp; Surrounding Areas
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Houston's #1<br/>
              <span className="text-accent">Foreclosure Alert System</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Get instant access to foreclosures, tax-delinquent properties, and code violations across Houston, Harris County, and the Greater Houston area — before they hit the open market.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-accent hover:bg-accent/90 text-accent-foreground">
                  Start Finding Deals
                </Button>
              </Link>
              <Link href="/memberships">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-6 bg-muted/30 border-y border-border">
          <div className="container mx-auto">
            <div className="grid grid-cols-3 md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-4xl font-extrabold text-primary mb-2">500+</p>
                <p className="text-muted-foreground font-medium">Active Houston Listings</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-primary mb-2">3</p>
                <p className="text-muted-foreground font-medium">Distress Lead Types</p>
              </div>
              <div>
                <p className="text-4xl font-extrabold text-primary mb-2">Daily</p>
                <p className="text-muted-foreground font-medium">Data Updates</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Three Powerful Lead Sources in One Platform</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Stop chasing cold leads. Our Houston-focused database gives you the distressed properties that are motivated to sell.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-xl border border-red-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-6">
                  <Building2 className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Foreclosures</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Pre-foreclosure filings and scheduled Harris County courthouse auctions — get notified before the competition finds them.
                </p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-amber-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Tax Delinquent</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Owners behind on Harris County property taxes are highly motivated to sell — often below market value to avoid tax liens.
                </p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Code Violations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  City of Houston code enforcement actions — properties under pressure to sell or remediate, often with significant equity.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-muted/50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Why Houston Investors Choose Us</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Search className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Houston-Specific Search</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Filter by Houston neighborhoods, zip codes, and Harris County districts. Find exactly the areas where you invest.
                </p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Real-Time Alerts</h3>
                <p className="text-muted-foreground leading-relaxed">
                  New listings added daily directly from county records, courthouse filings, and city code enforcement databases.
                </p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Built for Investors</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Save properties, track deals, and manage your pipeline. Everything a serious Houston investor needs in one place.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-4xl font-extrabold mb-6">Ready to Find Your Next Houston Deal?</h2>
            <p className="text-xl text-primary-foreground/80 mb-10">
              Join Houston investors already using our platform to source off-market leads every week.
            </p>
            <Link href="/sign-up">
              <Button size="lg" className="h-14 px-10 text-lg bg-accent hover:bg-accent/90 text-accent-foreground">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 font-bold text-xl text-primary mb-4">
            <MapPin className="w-6 h-6 text-accent" />
            HoustonForeclosureAlerts.com
          </div>
          <p className="text-muted-foreground text-sm mb-2">
            Serving Houston, Harris County, Fort Bend County, Montgomery County, and the Greater Houston Metro Area.
          </p>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Houston Foreclosure Alerts. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
