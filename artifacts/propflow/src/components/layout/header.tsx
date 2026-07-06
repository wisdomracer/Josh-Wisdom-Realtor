import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const navLinks = [
  { href: "/sell", label: "Sell" },
  { href: "/home-valuation", label: "Value" },
  { href: "/communities", label: "Areas" },
  { href: "/luxury-homes", label: "Luxury" },
  { href: "/the-woodlands-events", label: "Events" },
  { href: "/blog", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/95 text-white backdrop-blur-xl">
      <div className="mx-auto grid h-[76px] max-w-[1540px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-9">
        <Link href="/" className="flex items-center gap-4 justify-self-start" aria-label="Josh Wisdom Realtor home">
          <span className="grid h-11 w-11 place-items-center border border-[#c69a44] font-serif text-lg leading-none text-[#d7b56d]">JW</span>
          <span className="leading-none">
            <span className="block font-serif text-2xl font-semibold tracking-tight md:text-[28px]">Josh Wisdom</span>
            <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.42em] text-white/45">Realtor</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 justify-self-center xl:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`text-[11px] font-bold uppercase tracking-[0.24em] transition-colors hover:text-[#a97821] ${location === link.href ? "text-[#d7b56d]" : "text-white/62"}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 justify-self-end">
          <a href="tel:+18329818920" className="hidden items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/70 transition hover:text-[#d7b56d] lg:inline-flex" aria-label="Call Josh Wisdom at 832-981-8920">
            <Phone className="h-4 w-4" /> 832-981-8920
          </a>
          <Button asChild className="hidden h-12 rounded-none border border-[#c69a44] bg-[#c69a44] px-7 text-[11px] font-bold uppercase tracking-[0.24em] text-black hover:border-[#e1c06f] hover:bg-[#e1c06f] lg:inline-flex">
            <Link href="/home-valuation">Private Valuation</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild><Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu"><Menu className="h-5 w-5" /></Button></SheetTrigger>
            <SheetContent side="right" className="w-80 border-white/10 bg-[#050505] text-white">
              <SheetTitle className="font-serif text-2xl font-semibold text-white">Josh Wisdom Realtor</SheetTitle>
              <nav className="mt-9 flex flex-col gap-1" aria-label="Mobile navigation">
                {navLinks.map((link) => (<Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="border-b border-white/10 px-1 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white">{link.label}</Link>))}
                <a href="tel:+18329818920" className="mt-6 inline-flex items-center justify-center gap-2 border border-white/15 px-4 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white" onClick={() => setOpen(false)}><Phone className="h-4 w-4" /> Call Josh</a>
                <Button asChild className="mt-3 h-12 rounded-none bg-[#c69a44] text-black hover:bg-[#e1c06f]"><Link href="/home-valuation" onClick={() => setOpen(false)}>Private Valuation</Link></Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
