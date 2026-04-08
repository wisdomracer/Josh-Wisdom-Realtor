import { Link } from "wouter";
import { Building2, Search, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <Building2 className="w-6 h-6 text-accent" />
            PropFlow
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
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Institutional-Grade <br/>
              <span className="text-accent">Property Intelligence</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Find foreclosures, tax-delinquent properties, and code violations before they hit the open market.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up">
                <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-accent hover:bg-accent/90 text-accent-foreground">
                  Start Sourcing Deals
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

        <section className="py-24 px-6 bg-muted/50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Why Top Investors Use PropFlow</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Stop relying on outdated public records. Get real-time access to the most profitable off-market opportunities.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Search className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Deep Search</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Filter thousands of properties by distress type, equity, and owner status in milliseconds.
                </p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Real-Time Data</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our datasets are updated daily directly from county records and courthouses nationwide.
                </p>
              </div>
              <div className="bg-card p-8 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Institutional Grade</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Built for professionals. Export lists, run comps, and manage your pipeline in one place.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 font-bold text-xl text-primary mb-6">
            <Building2 className="w-6 h-6 text-accent" />
            PropFlow
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} PropFlow Intelligence. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
