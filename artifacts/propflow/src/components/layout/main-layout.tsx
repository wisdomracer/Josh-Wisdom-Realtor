import { Link, useLocation } from "wouter";
import { CalendarDays, Home, Phone } from "lucide-react";
import { Header } from "./header";
import { Footer } from "./footer";
import { phoneHref } from "@/config/site";
import { SocialMetadata } from "@/components/social-metadata";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [location] = useLocation();
  const onValuationPage = location === "/home-valuation";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 bg-white px-4 py-3 font-semibold text-black shadow-xl transition focus:translate-y-0">
        Skip to main content
      </a>
      <SocialMetadata />
      <Header />
      <main id="main-content" tabIndex={-1} className="min-h-[60vh] pb-20 md:pb-0">{children}</main>

      <div className="fixed bottom-4 right-4 z-50 hidden flex-col gap-2 md:bottom-5 md:right-5 md:flex">
        <a href={phoneHref} className="group flex h-12 items-center justify-end gap-3 border border-white/15 bg-black px-4 text-white shadow-xl shadow-black/25 transition hover:bg-[#c69a44] hover:text-black" aria-label="Call Josh Wisdom">
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.18em] opacity-0 transition-all duration-300 group-hover:max-w-40 group-hover:opacity-100">Call Josh</span>
          <Phone className="h-5 w-5" />
        </a>
        {onValuationPage ? <a href="#valuation-form" data-primary-cta className="group flex h-12 items-center justify-end gap-3 border border-[#c69a44]/60 bg-[#c69a44] px-4 text-black shadow-xl shadow-black/20 transition hover:bg-[#e1c06f]" title="Go to valuation form">
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.18em] opacity-0 transition-all duration-300 group-hover:max-w-52 group-hover:opacity-100">Valuation Form</span>
          <Home className="h-4 w-4" /><span className="sr-only">Go to valuation form</span>
        </a> : <Link href="/home-valuation" data-primary-cta className="group flex h-12 items-center justify-end gap-3 border border-[#c69a44]/60 bg-[#c69a44] px-4 text-black shadow-xl shadow-black/20 transition hover:bg-[#e1c06f]" title="Private valuation">
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.18em] opacity-0 transition-all duration-300 group-hover:max-w-52 group-hover:opacity-100">Private Valuation</span>
          <Home className="h-4 w-4" /><span className="sr-only">Private valuation</span>
        </Link>}
        <Link href="/contact" className="group flex h-12 items-center justify-end gap-3 border border-white/15 bg-black px-4 text-white shadow-xl shadow-black/20 transition hover:bg-white hover:text-black" title="Schedule consultation">
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.18em] opacity-0 transition-all duration-300 group-hover:max-w-56 group-hover:opacity-100">Consultation</span>
          <CalendarDays className="h-4 w-4" /><span className="sr-only">Schedule consultation</span>
        </Link>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1fr_auto] border-t border-white/10 bg-black/95 text-white shadow-2xl shadow-black/30 backdrop-blur-xl md:hidden">
        {onValuationPage ? <a href="#valuation-form" data-primary-cta className="flex h-16 items-center justify-center bg-[#c69a44] px-4 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-black">Go to Valuation Form</a> : <Link href="/home-valuation" data-primary-cta className="flex h-16 items-center justify-center bg-[#c69a44] px-4 text-center text-[11px] font-bold uppercase tracking-[0.18em] text-black">Request Private Valuation</Link>}
        <a href={phoneHref} className="grid h-16 w-16 place-items-center border-l border-white/10" aria-label="Call Josh Wisdom">
          <Phone className="h-5 w-5" />
        </a>
      </div>
      <Footer />
    </div>
  );
}
