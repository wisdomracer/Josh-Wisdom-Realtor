import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import {
  ArrowRight,
  BadgeCheck,
  Calculator,
  CircleDollarSign,
  Home,
  ReceiptText,
  Scale,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { PhotoCredit, ResponsiveLocationImage } from "@/components/location-hero";
import { absoluteUrl, siteConfig } from "@/config/site";
import type { LocationPhoto } from "@/config/location-photos";

type Feature = {
  slug: string;
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  icon: typeof Calculator;
  leadType: "buying";
  cta: string;
};

export const featurePages: Feature[] = [
  {
    slug: "mortgage-estimate",
    eyebrow: "Private Purchase Planning",
    title: "Estimate the payment. Then test the property.",
    metaTitle: "Mortgage Payment Estimate | Josh Wisdom Realtor",
    description: "Model principal, interest, taxes, insurance, mortgage insurance, association costs, other assessments, and planning cash before comparing a specific home.",
    icon: Calculator,
    leadType: "buying",
    cta: "Build Payment Scenario",
  },
];

const buyerPhoto: LocationPhoto = {
  src: "/images/buyer-brief-interior.jpg",
  srcSet: "/images/buyer-brief-interior-960.webp 960w, /images/buyer-brief-interior-1600.webp 1600w",
  width: 1600,
  height: 1068,
  alt: "Spacious contemporary interior with a curved staircase",
  credit: "Max Vakhtbovych",
  sourceUrl: "https://www.pexels.com/photo/interior-of-modern-house-with-staircase-5997959/",
  license: "Pexels License",
  licenseUrl: "https://www.pexels.com/license/",
  objectPosition: "center",
};

type EstimateInputs = {
  price: number;
  downPayment: number;
  rate: number;
  term: number;
  taxRate: number;
  homeInsurance: number;
  supplementalInsurance: number;
  mortgageInsurance: number;
  hoa: number;
  otherAssessments: number;
  ownershipReserve: number;
  closingCosts: number;
  prepaids: number;
  creditsAndDeposits: number;
};

const exampleInputs: EstimateInputs = {
  price: 750000,
  downPayment: 150000,
  rate: 6.5,
  term: 30,
  taxRate: 2.1,
  homeInsurance: 4200,
  supplementalInsurance: 0,
  mortgageInsurance: 0,
  hoa: 125,
  otherAssessments: 0,
  ownershipReserve: 500,
  closingCosts: 18000,
  prepaids: 9000,
  creditsAndDeposits: 0,
};

function finite(value: number, minimum = 0, maximum = Number.MAX_SAFE_INTEGER) {
  if (!Number.isFinite(value)) return minimum;
  return Math.min(Math.max(value, minimum), maximum);
}

export function calculateMortgageEstimate(values: EstimateInputs) {
  const price = finite(values.price, 0, 100000000);
  const downPayment = finite(values.downPayment, 0, price);
  const loanAmount = Math.max(price - downPayment, 0);
  const termYears = finite(values.term, 1, 50);
  const months = termYears * 12;
  const monthlyRate = finite(values.rate, 0, 30) / 100 / 12;
  const growth = Math.pow(1 + monthlyRate, months);
  const principalInterest = monthlyRate === 0 ? loanAmount / months : loanAmount * (monthlyRate * growth) / (growth - 1);
  const monthlyTaxes = price * (finite(values.taxRate, 0, 20) / 100) / 12;
  const monthlyHomeInsurance = finite(values.homeInsurance, 0, 1000000) / 12;
  const monthlySupplementalInsurance = finite(values.supplementalInsurance, 0, 1000000) / 12;
  const monthlyMortgageInsurance = finite(values.mortgageInsurance, 0, 100000);
  const monthlyHoa = finite(values.hoa, 0, 100000);
  const monthlyOtherAssessments = finite(values.otherAssessments, 0, 100000);
  const monthlyOwnershipReserve = finite(values.ownershipReserve, 0, 100000);
  const estimatedHousingPayment = principalInterest + monthlyTaxes + monthlyHomeInsurance + monthlySupplementalInsurance + monthlyMortgageInsurance + monthlyHoa + monthlyOtherAssessments;
  const planningTotal = estimatedHousingPayment + monthlyOwnershipReserve;
  const estimatedPlanningCash = Math.max(
    downPayment + finite(values.closingCosts, 0, 10000000) + finite(values.prepaids, 0, 10000000) - finite(values.creditsAndDeposits, 0, 10000000),
    0,
  );

  return {
    price,
    downPayment,
    downPercent: price > 0 ? (downPayment / price) * 100 : 0,
    loanAmount,
    principalInterest,
    monthlyTaxes,
    monthlyHomeInsurance,
    monthlySupplementalInsurance,
    monthlyMortgageInsurance,
    monthlyHoa,
    monthlyOtherAssessments,
    monthlyOwnershipReserve,
    estimatedHousingPayment,
    planningTotal,
    estimatedPlanningCash,
  };
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0);
}

type NumberFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
  help?: string;
};

function NumberField({ label, value, onChange, prefix, suffix, step = 1, min = 0, max, help }: NumberFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600">{label}</span>
      <div className="flex h-13 border border-black/15 bg-white focus-within:border-[#875d17] focus-within:ring-1 focus-within:ring-[#875d17]">
        {prefix && <span className="grid w-10 place-items-center border-r border-black/10 text-neutral-500" aria-hidden="true">{prefix}</span>}
        <input
          type="number"
          value={value}
          step={step}
          min={min}
          max={max}
          inputMode="decimal"
          onChange={(event) => onChange(Number(event.target.value))}
          className="h-12 min-w-0 flex-1 bg-transparent px-4 text-base text-black outline-none"
        />
        {suffix && <span className="grid min-w-12 place-items-center border-l border-black/10 px-2 text-neutral-500" aria-hidden="true">{suffix}</span>}
      </div>
      {help && <span className="mt-2 block text-xs leading-5 text-neutral-500">{help}</span>}
    </label>
  );
}

function InputGroup({ number, title, description, children }: { number: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-black/15 pt-7 first:border-t-0 first:pt-0">
      <legend className="sr-only">{title}</legend>
      <div className="flex items-start gap-5">
        <span className="font-serif text-2xl text-[#875d17]">{number}</span>
        <div>
          <h3 className="font-serif text-3xl text-black">{title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">{description}</p>
        </div>
      </div>
      <div className="mt-7 grid gap-5 md:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function ResultLine({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-white/10 py-3 last:border-b-0">
      <span className="text-sm text-neutral-400">{label}</span>
      <span className="font-semibold text-white">{formatCurrency(value)}</span>
    </div>
  );
}

function MortgageEstimator() {
  const [inputs, setInputs] = useState<EstimateInputs>(exampleInputs);
  const results = useMemo(() => calculateMortgageEstimate(inputs), [inputs]);
  const update = (key: keyof EstimateInputs) => (value: number) => setInputs((current) => ({ ...current, [key]: value }));

  return (
    <section id="calculator" className="scroll-mt-20 bg-[#f5f2ec] py-20 text-black md:py-28" aria-labelledby="calculator-title">
      <div className="mx-auto max-w-[1440px] px-5 md:px-9">
        <div className="grid gap-10 border-b border-black/15 pb-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#875d17]">Editable Planning Scenario</p>
            <h2 id="calculator-title" className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">Build the complete monthly picture.</h2>
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-lg leading-8 text-neutral-700">Every starting number below is an example, not a market quote. Replace each one with property-specific information and figures from a lender, insurer, association, district, or other relevant source.</p>
            <button type="button" onClick={() => setInputs(exampleInputs)} className="mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#875d17] underline underline-offset-4 hover:text-black">Reset Example Inputs</button>
          </div>
        </div>

        <div className="mt-12 grid gap-10 xl:grid-cols-[1.12fr_0.88fr] xl:items-start">
          <div className="space-y-10 border border-black/10 bg-white p-6 md:p-9">
            <InputGroup number="01" title="Loan scenario" description="Use the purchase price and financing terms you want to test. The interest rate is entered by you and is not represented as current or available.">
              <NumberField label="Purchase price" value={inputs.price} onChange={update("price")} prefix="$" step={1000} max={100000000} />
              <NumberField label="Down payment" value={inputs.downPayment} onChange={update("downPayment")} prefix="$" step={1000} max={100000000} help={`${results.downPercent.toFixed(1)}% of the entered price`} />
              <NumberField label="Example interest rate" value={inputs.rate} onChange={update("rate")} suffix="%" step={0.125} max={30} help="Replace with a lender-provided scenario." />
              <NumberField label="Loan term" value={inputs.term} onChange={update("term")} suffix="years" step={1} min={1} max={50} />
            </InputGroup>

            <InputGroup number="02" title="Recurring housing costs" description="Include costs that may be escrowed and costs you may pay separately. Confirm whether each item applies to the specific property and loan.">
              <NumberField label="Property tax rate" value={inputs.taxRate} onChange={update("taxRate")} suffix="% / yr" step={0.05} max={20} />
              <NumberField label="Annual homeowner insurance" value={inputs.homeInsurance} onChange={update("homeInsurance")} prefix="$" step={100} max={1000000} />
              <NumberField label="Annual supplemental insurance" value={inputs.supplementalInsurance} onChange={update("supplementalInsurance")} prefix="$" step={100} max={1000000} help="For any additional property-specific coverage you choose to model." />
              <NumberField label="Monthly mortgage insurance" value={inputs.mortgageInsurance} onChange={update("mortgageInsurance")} prefix="$" step={25} max={100000} help="Enter only if a lender scenario includes it." />
              <NumberField label="Monthly HOA or association dues" value={inputs.hoa} onChange={update("hoa")} prefix="$" step={25} max={100000} />
              <NumberField label="Other monthly assessments" value={inputs.otherAssessments} onChange={update("otherAssessments")} prefix="$" step={25} max={100000} help="Optional district, condo, club, or other recurring amount you want to model." />
            </InputGroup>

            <InputGroup number="03" title="Planning beyond the payment" description="These figures help frame a broader ownership and closing conversation. They are not a lender's official Cash to Close calculation.">
              <NumberField label="Monthly ownership reserve" value={inputs.ownershipReserve} onChange={update("ownershipReserve")} prefix="$" step={50} max={100000} help="Optional repair or maintenance planning amount; not part of the mortgage payment." />
              <NumberField label="Estimated closing costs" value={inputs.closingCosts} onChange={update("closingCosts")} prefix="$" step={500} max={10000000} />
              <NumberField label="Estimated prepaids and initial escrow" value={inputs.prepaids} onChange={update("prepaids")} prefix="$" step={500} max={10000000} />
              <NumberField label="Credits and deposits already paid" value={inputs.creditsAndDeposits} onChange={update("creditsAndDeposits")} prefix="$" step={500} max={10000000} help="A simplified offset for planning only." />
            </InputGroup>
          </div>

          <aside className="bg-black p-7 text-white md:p-9 xl:sticky xl:top-28" aria-live="polite" aria-label="Mortgage estimate results">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#d7b56d]">Estimated Housing Payment</p>
            <p className="mt-5 font-serif text-6xl font-semibold leading-none text-white md:text-7xl">{formatCurrency(results.estimatedHousingPayment)}</p>
            <p className="mt-3 text-sm leading-6 text-neutral-400">Per month from the entered principal, interest, taxes, insurance, mortgage insurance, association dues, and other assessments.</p>

            <div className="mt-8 border-t border-white/20 pt-2">
              <ResultLine label="Principal and interest" value={results.principalInterest} />
              <ResultLine label="Property taxes" value={results.monthlyTaxes} />
              <ResultLine label="Homeowner insurance" value={results.monthlyHomeInsurance} />
              <ResultLine label="Supplemental insurance" value={results.monthlySupplementalInsurance} />
              <ResultLine label="Mortgage insurance" value={results.monthlyMortgageInsurance} />
              <ResultLine label="HOA or association dues" value={results.monthlyHoa} />
              <ResultLine label="Other assessments" value={results.monthlyOtherAssessments} />
            </div>

            <div className="mt-8 grid gap-px bg-white/15 sm:grid-cols-2">
              <div className="bg-[#111] p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d7b56d]">Loan amount</p>
                <p className="mt-3 font-serif text-3xl text-white">{formatCurrency(results.loanAmount)}</p>
              </div>
              <div className="bg-[#111] p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d7b56d]">Planning total</p>
                <p className="mt-3 font-serif text-3xl text-white">{formatCurrency(results.planningTotal)}</p>
                <p className="mt-2 text-xs leading-5 text-neutral-400">Includes the optional ownership reserve.</p>
              </div>
              <div className="bg-[#111] p-5 sm:col-span-2">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#d7b56d]">Simplified planning cash</p>
                <p className="mt-3 font-serif text-3xl text-white">{formatCurrency(results.estimatedPlanningCash)}</p>
                <p className="mt-2 text-xs leading-5 text-neutral-400">Down payment + entered closing costs + entered prepaids - entered credits and deposits. This is not Cash to Close.</p>
              </div>
            </div>

            <div className="mt-8 border border-[#d7b56d]/35 p-5 text-sm leading-6 text-neutral-300">
              This tool is an educational estimate, not a quote, approval, disclosure, appraisal, tax calculation, insurance estimate, or promise of loan terms. Confirm the figures with the appropriate professionals and written records.
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

const ownershipQuestions = [
  { title: "What changes at this address?", copy: "Confirm actual tax entities and exemptions, insurance requirements, utilities, associations, districts, assessments, and property-specific coverage needs.", icon: Home },
  { title: "What is paid monthly or separately?", copy: "Taxes, insurance, mortgage insurance, dues, assessments, and other obligations may be escrowed, billed separately, or change after closing.", icon: ReceiptText },
  { title: "What cash is needed before closing?", copy: "Down payment, lender costs, title and settlement charges, prepaids, initial escrow, deposits, credits, and adjustments shape the written Cash to Close figure.", icon: CircleDollarSign },
  { title: "What remains outside the payment?", copy: "Maintenance, repairs, utilities, furnishings, improvements, travel, and other ownership choices still belong in the household plan.", icon: Scale },
];

const loanEstimateChecks = [
  { number: "01", title: "Projected payments", copy: "Review principal and interest, mortgage insurance, estimated escrow, and any items the lender shows as not escrowed." },
  { number: "02", title: "Loan costs and credits", copy: "Compare origination charges, services, points, lender credits, and the assumptions behind different lender scenarios." },
  { number: "03", title: "Estimated Cash to Close", copy: "Use the lender's written figure and supporting details rather than treating a web calculator as the closing statement." },
];

const faqs = [
  { question: "Is this a lender quote or preapproval?", answer: "No. It is an educational planning calculator using only the numbers you enter. A lender must evaluate the borrower, property, loan program, and supporting documentation before providing actual terms or an approval decision." },
  { question: "Why can the total payment be higher than principal and interest?", answer: "A total housing payment may also include property taxes, homeowner insurance, supplemental insurance, mortgage insurance, association dues, and other assessments. Some amounts may be escrowed while others are paid separately." },
  { question: "Does the planning cash equal Cash to Close?", answer: "No. The simplified planning cash on this page does not model every lender cost, title or settlement charge, deposit, credit, prepaid, escrow item, prorated adjustment, or program-specific amount. Use the lender's Loan Estimate and later Closing Disclosure for the written figures." },
  { question: "Why should the estimate be rebuilt for each property?", answer: "Taxes, exemptions, insurance, associations, districts, assessments, utilities, maintenance, and the financing scenario can differ by property. Replace every example input with current, address-specific information." },
];

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Mortgage Payment Planning Calculator",
      url: absoluteUrl("/mortgage-estimate"),
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web browser",
      description: "An educational calculator for modeling principal, interest, taxes, insurance, mortgage insurance, association costs, other assessments, ownership reserve, and simplified planning cash.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      provider: { "@type": "RealEstateAgent", "@id": `${siteConfig.url}/#agent`, name: siteConfig.agentName },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
    },
  ],
};

export function FeaturePage({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <>
      <Helmet>
        <title>{feature.metaTitle}</title>
        <meta name="description" content={feature.description} />
        <link rel="canonical" href={absoluteUrl(`/${feature.slug}`)} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <section className="overflow-hidden bg-black text-white">
        <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[0.94fr_1.06fr]">
          <div className="relative flex items-center px-5 py-20 md:px-10 md:py-24 lg:px-14 lg:py-28">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:76px_76px]" />
            <div className="relative max-w-3xl">
              <div className="inline-flex items-center gap-3 border border-white/20 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-[#d7b56d]"><Icon className="h-4 w-4" aria-hidden="true" />{feature.eyebrow}</div>
              <h1 className="mt-7 font-serif text-[clamp(3.4rem,6.4vw,7rem)] font-semibold leading-[0.92] tracking-[-0.035em] text-white">{feature.title}</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72 md:text-xl">{feature.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="h-14 rounded-none bg-[#c69a44] px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-black hover:bg-[#deb65f]"><a href="#calculator">{feature.cta}</a></Button>
                <Button asChild variant="outline" className="h-14 rounded-none border-white bg-transparent px-8 text-[11px] font-bold uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black"><a href="#payment-brief">Discuss A Property</a></Button>
              </div>
              <div className="mt-9 grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-3">
                {["Editable inputs", "Complete breakdown", "No lender claim"].map((item) => <div key={item} className="flex items-center gap-2 text-xs text-white/65"><BadgeCheck className="h-4 w-4 text-[#d7b56d]" aria-hidden="true" />{item}</div>)}
              </div>
            </div>
          </div>
          <figure className="relative min-h-[360px] overflow-hidden lg:min-h-[720px]">
            <ResponsiveLocationImage photo={buyerPhoto} className="absolute inset-0 h-full w-full object-cover" sizes="(min-width: 1024px) 53vw, 100vw" loading="eager" fetchPriority="high" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" /><PhotoCredit photo={buyerPhoto} />
          </figure>
        </div>
      </section>

      <MortgageEstimator />

      <section className="bg-[#111] py-20 text-white md:py-28" aria-labelledby="property-cost-title">
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="max-w-4xl"><p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#d7b56d]">Property-Specific Cost</p><h2 id="property-cost-title" className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-white md:text-7xl">A payment estimate is only as good as the property inputs.</h2></div>
          <div className="mt-14 grid gap-px border border-white/15 bg-white/15 md:grid-cols-2 xl:grid-cols-4">
            {ownershipQuestions.map(({ title, copy, icon: CardIcon }) => <article key={title} className="bg-[#111] p-7 md:p-8"><CardIcon className="h-6 w-6 text-[#d7b56d]" aria-hidden="true" /><h3 className="mt-10 font-serif text-3xl leading-tight text-white">{title}</h3><p className="mt-4 leading-7 text-neutral-400">{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28" aria-labelledby="loan-estimate-title">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 md:px-9 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#875d17]">Written Lender Comparison</p>
            <h2 id="loan-estimate-title" className="mt-6 max-w-xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">Replace the scenario with the Loan Estimate.</h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">The calculator helps frame questions. A lender's Loan Estimate provides the written loan terms, projected payments, estimated costs, and estimated Cash to Close for the scenario requested.</p>
            <a href="https://www.consumerfinance.gov/owning-a-home/loan-estimate/" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#875d17] underline underline-offset-4 hover:text-black">Review the CFPB Loan Estimate Explainer <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="border-t border-black">
            {loanEstimateChecks.map(({ number, title, copy }) => <article key={number} className="grid gap-4 border-b border-black/15 py-7 md:grid-cols-[auto_0.8fr_1.2fr] md:gap-7"><span className="font-serif text-2xl text-[#875d17]">{number}</span><h3 className="text-lg font-semibold leading-7 text-black">{title}</h3><p className="leading-7 text-neutral-600">{copy}</p></article>)}
            <a href="https://www.consumerfinance.gov/owning-a-home/compare/compare-loan-estimates/" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#875d17] underline underline-offset-4 hover:text-black">Compare Loan Estimates with CFPB guidance <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <section id="payment-brief" className="scroll-mt-20 bg-[#f5f2ec] py-20 md:py-28" aria-labelledby="payment-brief-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <div className="lg:sticky lg:top-28"><p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#875d17]">Private Buyer Payment Brief</p><h2 id="payment-brief-title" className="mt-6 max-w-xl font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-7xl">Bring the scenario back to the actual property.</h2><p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">Share the property or target area, likely purchase range, timing, and which taxes, insurance, association, district, or ownership questions should be confirmed.</p></div>
          <LeadForm leadType="buying" showAddress showArea title="Request a private payment brief" subtitle="Tell Josh which property or area you are comparing and which ownership costs need better context." buttonText="Request Buyer Consultation" />
        </div>
      </section>

      <section className="bg-white py-20 md:py-28" aria-labelledby="mortgage-faq-title">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 md:px-9 lg:grid-cols-[0.72fr_1.28fr]">
          <div><p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#875d17]">Questions to Clarify</p><h2 id="mortgage-faq-title" className="mt-6 font-serif text-5xl font-semibold leading-[0.95] tracking-[-0.035em] text-black md:text-6xl">Before treating the estimate as a budget.</h2></div>
          <div className="border-t border-black">{faqs.map(({ question, answer }) => <article key={question} className="grid gap-4 border-b border-black/15 py-7 md:grid-cols-[0.86fr_1.14fr] md:gap-8"><h3 className="text-lg font-semibold leading-7 text-black">{question}</h3><p className="leading-7 text-neutral-600">{answer}</p></article>)}</div>
        </div>
      </section>
    </>
  );
}
