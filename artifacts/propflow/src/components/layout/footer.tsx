import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-semibold tracking-normal">Josh Wisdom Realtor</h3>
            <p className="max-w-xs leading-7 text-white/70">
              Premier listing-focused real estate guidance for The Woodlands, Tomball, and Greater Houston homeowners.
            </p>
            <div className="space-y-3 pt-2">
              <a href="tel:+18329818920" className="flex items-center gap-2 text-sm text-white/90 hover:text-amber-300">
                <Phone className="h-4 w-4" />
                <span>832-981-8920</span>
              </a>
              <a href="mailto:WisdomRacer@gmail.com" className="flex items-center gap-2 text-sm text-white/90 hover:text-amber-300">
                <Mail className="h-4 w-4" />
                <span>WisdomRacer@gmail.com</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-white/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>VIP Realty<br />5100 Westheimer Ste 200, Houston, TX 77027</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">Seller Pages</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link href="/the-woodlands-listing-agent" className="hover:text-white">The Woodlands Listing Agent</Link></li>
              <li><Link href="/selling-a-home-in-the-woodlands" className="hover:text-white">Selling In The Woodlands</Link></li>
              <li><Link href="/home-valuation" className="hover:text-white">Get Home Value</Link></li>
              <li><Link href="/sell" className="hover:text-white">Seller Strategy</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">Communities</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link href="/communities/the-woodlands" className="hover:text-white">The Woodlands</Link></li>
              <li><Link href="/carlton-woods-homes-for-sale" className="hover:text-white">Carlton Woods</Link></li>
              <li><Link href="/east-shore-homes-for-sale" className="hover:text-white">East Shore</Link></li>
              <li><Link href="/creekside-park-homes-for-sale" className="hover:text-white">Creekside Park</Link></li>
              <li><Link href="/communities/tomball" className="hover:text-white">Tomball</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">Resources</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link href="/about" className="hover:text-white">About Josh</Link></li>
              <li><Link href="/market-updates" className="hover:text-white">Market Updates</Link></li>
              <li><Link href="/blog" className="hover:text-white">Seller Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms & Notices</Link></li>
              <li><a href="https://www.trec.texas.gov/forms/consumer-protection-notice" className="hover:text-white">TREC Consumer Protection Notice</a></li>
              <li><a href="https://www.trec.texas.gov/forms/information-about-brokerage-services" className="hover:text-white">TREC Information About Brokerage Services</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-8 text-xs leading-6 text-white/55 md:flex-row md:items-center md:justify-between">
          <p>� {new Date().getFullYear()} Josh Wisdom Realtor. All rights reserved.</p>
          <p className="max-w-3xl md:text-right">
            Josh Wisdom is a Texas real estate professional with VIP Realty. Information is deemed reliable but not guaranteed. Equal Housing Opportunity. This website is prepared for IDX and Google Business Profile integration when approved assets are connected.
          </p>
        </div>
      </div>
    </footer>
  );
}