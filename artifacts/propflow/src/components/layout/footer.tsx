import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";
import { emailHref, phoneHref, siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-[#050505] text-white">
      <div className="mx-auto max-w-[1580px] px-5 py-16 md:px-9 md:py-24">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-semibold tracking-normal">Josh Wisdom Realtor</h3>
            <p className="max-w-xs leading-7 text-white/70">
              Private real estate advisory for The Woodlands and North Houston homeowners.
            </p>
            <div className="space-y-3 pt-2">
              <a href={phoneHref} className="flex items-center gap-2 text-sm text-white/90 hover:text-amber-300">
                <Phone className="h-4 w-4" />
                <span>{siteConfig.phone}</span>
              </a>
              <a href={emailHref} className="flex items-center gap-2 text-sm text-white/90 hover:text-amber-300">
                <Mail className="h-4 w-4" />
                <span>{siteConfig.email}</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-white/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{siteConfig.brokerage.name}<br />{siteConfig.brokerage.streetAddress}, {siteConfig.brokerage.locality}, {siteConfig.brokerage.region} {siteConfig.brokerage.postalCode}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">Seller Pages</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link href="/the-woodlands-listing-agent" className="hover:text-white">Private Seller Advisory</Link></li>
              <li><Link href="/selling-a-home-in-the-woodlands" className="hover:text-white">Selling In The Woodlands</Link></li>
              <li><Link href="/home-valuation" className="hover:text-white">Get Home Value</Link></li>
              <li><Link href="/sell" className="hover:text-white">Seller Strategy</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">Communities</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link href="/communities/the-woodlands" className="hover:text-white">The Woodlands</Link></li>
              <li><Link href="/communities/carlton-woods" className="hover:text-white">Carlton Woods</Link></li>
              <li><Link href="/communities/east-shore" className="hover:text-white">East Shore</Link></li>
              <li><Link href="/communities/creekside-park" className="hover:text-white">Creekside Park</Link></li>
              <li><Link href="/communities/tomball" className="hover:text-white">Tomball</Link></li>
              <li><Link href="/magnolia-realtor" className="hover:text-white">Magnolia</Link></li>
              <li><Link href="/spring-realtor" className="hover:text-white">Spring</Link></li>
              <li><Link href="/conroe-realtor" className="hover:text-white">Conroe</Link></li>
              <li><Link href="/shenandoah-realtor" className="hover:text-white">Shenandoah</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">Resources</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li><Link href="/about" className="hover:text-white">About Josh</Link></li>
              <li><Link href="/mortgage-estimate" className="hover:text-white">Mortgage Estimate</Link></li>
              <li><Link href="/the-woodlands-events" className="hover:text-white">The Woodlands Events</Link></li>
              <li><Link href="/blog" className="hover:text-white">Seller Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms & Notices</Link></li>
              <li><a href={siteConfig.disclosures.consumerProtectionNotice} target="_blank" rel="noopener noreferrer" className="hover:text-white">TREC Consumer Protection Notice</a></li>
              <li><a href={siteConfig.disclosures.informationAboutBrokerageServices} target="_blank" rel="noopener noreferrer" className="hover:text-white">TREC Information About Brokerage Services</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-8 text-xs leading-6 text-white/55 md:flex-row md:items-center md:justify-between">
          <p>Copyright {new Date().getFullYear()} Josh Wisdom Realtor. All rights reserved.</p>
          <p className="max-w-3xl md:text-right">
            Josh Wisdom is a Texas real estate professional with VIP Realty. Information is deemed reliable but not guaranteed. Equal Housing Opportunity.
          </p>
        </div>
      </div>
    </footer>
  );
}
