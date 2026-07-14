import { Helmet } from "react-helmet-async";
import { absoluteUrl, emailHref, siteConfig } from "@/config/site";

export function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Josh Wisdom Realtor</title>
        <meta name="description" content="Privacy policy for The Woodlands Listing Agent and Josh Wisdom Realtor lead forms." />
        <link rel="canonical" href={absoluteUrl("/privacy-policy")} />
      </Helmet>
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4 md:px-6">
          <h1 className="text-4xl font-semibold text-black md:text-5xl">Privacy Policy</h1>
          <p className="mt-6 leading-8 text-neutral-700">When you submit a form, the information you provide may be used to respond to your inquiry, prepare a home valuation, schedule a consultation, or communicate about real estate services. Josh Wisdom Realtor does not sell your personal information.</p>
          <p className="mt-5 leading-8 text-neutral-700">Form submissions may include your name, email, phone number, property address, area of interest, message, referral URL, and campaign attribution. You can request that your information be updated or deleted by contacting <a className="font-semibold underline underline-offset-4" href={emailHref}>{siteConfig.email}</a>.</p>
        </div>
      </section>
    </>
  );
}

export function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms & Real Estate Notices | Josh Wisdom Realtor</title>
        <meta name="description" content="Real estate notices, brokerage information, and website terms for Josh Wisdom Realtor." />
        <link rel="canonical" href={absoluteUrl("/terms")} />
      </Helmet>
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4 md:px-6">
          <h1 className="text-4xl font-semibold text-black md:text-5xl">Terms & Real Estate Notices</h1>
          <p className="mt-6 leading-8 text-neutral-700">Information on this website is provided for general real estate guidance and is deemed reliable but not guaranteed. No representation is made about future market conditions, sale price, days on market, or buyer demand.</p>
          <p className="mt-5 leading-8 text-neutral-700">{siteConfig.agentName} is affiliated with {siteConfig.brokerage.name}, {siteConfig.brokerage.streetAddress}, {siteConfig.brokerage.locality}, {siteConfig.brokerage.region} {siteConfig.brokerage.postalCode}. Equal Housing Opportunity.</p>
          <div className="mt-8 space-y-3">
            <a className="block font-semibold text-amber-700" href={siteConfig.disclosures.consumerProtectionNotice} target="_blank" rel="noopener noreferrer">TREC Consumer Protection Notice</a>
            <a className="block font-semibold text-amber-700" href={siteConfig.disclosures.informationAboutBrokerageServices} target="_blank" rel="noopener noreferrer">TREC Information About Brokerage Services</a>
          </div>
        </div>
      </section>
    </>
  );
}
