import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center bg-[#050505] px-5 py-24 text-white">
      <Helmet>
        <title>Page Not Found | Josh Wisdom Realtor</title>
        <meta name="description" content="The requested page is not available." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="max-w-3xl text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7b56d]">404</p>
        <h1 className="mt-6 font-serif text-6xl font-semibold leading-none md:text-8xl">Page not found.</h1>
        <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-white/70">This page may have moved or been retired. Continue to a real service page below.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="h-13 rounded-none bg-[#d7b56d] px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-black hover:bg-white"><Link href="/">Return Home</Link></Button>
          <Button asChild variant="outline" className="h-13 rounded-none border-white/60 bg-transparent px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black"><Link href="/contact">Contact Josh <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
        </div>
      </div>
    </section>
  );
}
