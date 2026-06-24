import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold tracking-tight">Josh Wisdom</h3>
            <p className="text-primary-foreground/80 max-w-xs leading-relaxed">
              Your trusted, deeply-local guide to living in the forested, master-planned suburbs north of Houston.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/90">
                <Phone className="h-4 w-4" />
                <span>(281) 555-0123</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/90">
                <Mail className="h-4 w-4" />
                <span>josh@thewoodlandslistingagent.com</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-primary-foreground/90">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>The Woodlands, TX<br />Licensed Texas Real Estate Agent</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="/buy" className="hover:text-white transition-colors">Buying a Home</Link></li>
              <li><Link href="/sell" className="hover:text-white transition-colors">Selling Your Home</Link></li>
              <li><Link href="/home-valuation" className="hover:text-white transition-colors">Free Home Valuation</Link></li>
              <li><Link href="/relocation" className="hover:text-white transition-colors">Relocation Services</Link></li>
              <li><Link href="/luxury-homes" className="hover:text-white transition-colors">Luxury Properties</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Communities</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="/communities/the-woodlands" className="hover:text-white transition-colors">The Woodlands</Link></li>
              <li><Link href="/communities/tomball" className="hover:text-white transition-colors">Tomball</Link></li>
              <li><Link href="/communities/greater-houston" className="hover:text-white transition-colors">Greater Houston</Link></li>
              <li><Link href="/communities" className="hover:text-white transition-colors">All Communities</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link href="/about" className="hover:text-white transition-colors">About Josh</Link></li>
              <li><Link href="/market-updates" className="hover:text-white transition-colors">Market Updates</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Josh Wisdom Real Estate. All rights reserved.</p>
          <p className="text-center md:text-right max-w-2xl">
            Josh Wisdom is a licensed real estate agent in the state of Texas. Information provided is deemed reliable but not guaranteed. Equal Housing Opportunity.
          </p>
        </div>
      </div>
    </footer>
  );
}
