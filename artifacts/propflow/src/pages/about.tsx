import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Josh Wisdom Realtor | The Woodlands Real Estate Expert</title>
        <meta name="description" content="Learn about Josh Wisdom, your local real estate expert serving The Woodlands, Tomball, and Greater Houston. Deeply rooted in the community." />
        <link rel="canonical" href="https://thewoodlandslistingagent.com/about" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <div className="flex min-h-64 items-center justify-center bg-black p-8 text-center text-white"><div><p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Josh Wisdom Realtor</p><p className="mt-3 font-serif text-3xl text-white">The Woodlands & Greater Houston</p><p className="mt-4 text-sm uppercase tracking-[0.22em] text-white/50">Listing Strategy</p></div></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif mb-6">About Josh Wisdom</h1>
          <p className="text-xl text-primary-foreground/80 leading-relaxed">
            Your trusted neighbor and local guide to the master-planned communities north of Houston.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-xl">
                <div className="flex min-h-64 items-center justify-center bg-black p-8 text-center text-white"><div><p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">Josh Wisdom Realtor</p><p className="mt-3 font-serif text-3xl text-white">The Woodlands & Greater Houston</p><p className="mt-4 text-sm uppercase tracking-[0.22em] text-white/50">Listing Strategy</p></div></div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-primary">Rooted in the community.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I believe that buying or selling a home is more than a transaction-it's a significant life transition. As a long-time resident of the northern Houston suburbs, I've watched these communities grow and evolve. I know the nuances that make each village in The Woodlands unique, the historic charm of Tomball, and the vibrant growth across Greater Houston.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                My approach to real estate is built on calm, confident guidance. I don't believe in pressure tactics. Instead, I focus on providing you with clear data, honest advice, and a deep understanding of the local market so you can make decisions that are right for you and your family.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're a first-time buyer exploring Spring, looking for luxury acreage in Tomball, or selling your home in Sterling Ridge, I am dedicated to making your experience seamless and successful.
              </p>
              <div className="pt-8">
                <Button asChild size="lg">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
