import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/sell", label: "Sell" },
  { href: "/home-valuation", label: "Home Value" },
  { href: "/communities", label: "Communities" },
  { href: "/luxury-homes", label: "Luxury" },
  { href: "/market-updates", label: "Market" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 text-black backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="font-serif text-xl font-semibold tracking-normal text-black md:text-2xl">
          Josh Wisdom Realtor
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold uppercase tracking-[0.12em] transition-colors hover:text-amber-700 ${
                location === link.href ? "text-amber-700" : "text-neutral-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild className="hidden h-11 rounded-none bg-black px-5 text-white hover:bg-amber-600 sm:inline-flex">
            <Link href="/home-valuation">Get Home Value</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-white">
              <SheetTitle className="font-serif text-xl font-semibold text-black">
                Josh Wisdom Realtor
              </SheetTitle>
              <nav className="mt-8 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-3 py-3 text-base font-semibold text-black transition-colors hover:bg-neutral-100"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-base font-semibold text-black transition-colors hover:bg-neutral-100"
                >
                  Contact
                </Link>
                <Button asChild className="mt-5 h-12 rounded-none bg-black text-white hover:bg-amber-600">
                  <Link href="/home-valuation" onClick={() => setOpen(false)}>
                    Get Home Value
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}