import { Link } from "wouter";
import { CalendarDays, Home, Phone } from "lucide-react";
import { Header } from "./header";
import { Footer } from "./footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 overflow-hidden">{children}</main>
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 md:bottom-5 md:right-5">
        <a href="tel:+18329818920" className="grid h-11 w-11 place-items-center border border-white/15 bg-black text-white shadow-xl shadow-black/25 transition hover:bg-[#c69a44] hover:text-black" aria-label="Call Josh Wisdom">
          <Phone className="h-5 w-5" />
        </a>
        <Link href="/home-valuation" className="group grid h-11 w-11 place-items-center border border-[#c69a44]/60 bg-[#c69a44] text-black shadow-xl shadow-black/20 transition hover:bg-[#e1c06f]" title="Home value">
          <Home className="h-4 w-4" /><span className="sr-only">Home value</span>
        </Link>
        <Link href="/contact" className="group grid h-11 w-11 place-items-center border border-white/15 bg-black text-white shadow-xl shadow-black/20 transition hover:bg-white hover:text-black" title="Schedule consultation">
          <CalendarDays className="h-4 w-4" /><span className="sr-only">Schedule consultation</span>
        </Link>
      </div>
      <Footer />
    </div>
  );
}