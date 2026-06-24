import { Helmet } from "react-helmet-async";
import { LeadForm } from "@/components/forms/lead-form";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Josh Wisdom | Realtor in The Woodlands & Tomball</title>
        <meta name="description" content="Get in touch with Josh Wisdom to discuss buying, selling, or relocating in The Woodlands, Tomball, and Greater Houston." />
        <link rel="canonical" href="https://joshwisdomrealestate.com/contact" />
      </Helmet>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-serif text-primary mb-6">Let's Connect</h1>
            <p className="text-xl text-muted-foreground">
              I'm here to answer your questions and provide the local expertise you need.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-serif text-primary mb-4">Contact Information</h2>
                <p className="text-muted-foreground mb-6">
                  Feel free to reach out directly by phone or email. I aim to respond to all inquiries within 24 hours.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-foreground">
                    <span className="font-semibold w-20">Phone:</span>
                    <span>(281) 555-0123</span>
                  </div>
                  <div className="flex items-center gap-4 text-foreground">
                    <span className="font-semibold w-20">Email:</span>
                    <span>josh@thewoodlandslistingagent.com</span>
                  </div>
                  <div className="flex items-start gap-4 text-foreground">
                    <span className="font-semibold w-20">Area:</span>
                    <span>The Woodlands, Tomball, Spring, <br/>and Greater Houston</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-secondary rounded-xl">
                <h3 className="font-serif text-xl text-primary mb-2">Not ready to talk yet?</h3>
                <p className="text-muted-foreground mb-4">
                  That's completely fine. Feel free to explore the site and reach out whenever you're ready.
                </p>
              </div>
            </div>

            <div>
              <LeadForm 
                leadType="consultation"
                title="Send a Message"
                subtitle="Fill out the form below and let me know how I can help."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
