import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateLead } from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { getLeadAttribution } from "@/lib/attribution";
import { trackEvent } from "@/lib/analytics";
import { phoneHref, siteConfig } from "@/config/site";

const sellerLeadTypes = ["selling", "valuation", "consultation", "luxury"] as const;

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().optional(),
  propertyAddress: z.string().optional(),
  area: z.string().optional(),
  leadType: z.string(),
  company: z.string().max(0).optional(),
}).superRefine((values, ctx) => {
  if (sellerLeadTypes.includes(values.leadType as (typeof sellerLeadTypes)[number]) && !values.phone?.trim()) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Phone number is required for private seller consultations",
      path: ["phone"],
    });
  }
});

type LeadFormProps = {
  leadType: "general" | "buying" | "selling" | "valuation" | "relocation" | "consultation" | "luxury" | "new_construction";
  showAddress?: boolean;
  showArea?: boolean;
  buttonText?: string;
  title?: string;
  subtitle?: string;
};

export function LeadForm({ leadType, showAddress, showArea, buttonText = "Submit", title, subtitle }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const started = useRef(false);
  const submissionId = useRef(createSubmissionId());
  const createLead = useCreateLead();
  const isSellerLead = sellerLeadTypes.includes(leadType as (typeof sellerLeadTypes)[number]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      propertyAddress: "",
      area: "",
      leadType,
      company: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const attribution = getLeadAttribution();

    createLead.mutate({
      data: {
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone?.trim() || null,
        message: values.message?.trim() || null,
        propertyAddress: values.propertyAddress?.trim() || null,
        area: values.area?.trim() || null,
        leadType,
        company: values.company || null,
        submissionId: submissionId.current,
        submittedAt: new Date().toISOString(),
        ...attribution,
      }
    }, {
      onSuccess: () => {
        trackEvent("lead_submission_success", { lead_type: leadType, submission_id: submissionId.current });
        setSubmitted(true);
        toast.success("Request submitted successfully!");
      },
      onError: (error) => {
        trackEvent("lead_submission_failure", { lead_type: leadType, error: error instanceof Error ? error.name : "unknown" });
        toast.error(`Your request was not confirmed. Please try again or call Josh directly at ${siteConfig.phone}.`);
      }
    });
  }

  function onInvalid() {
    trackEvent("lead_form_validation_error", {
      lead_type: leadType,
      fields: Object.keys(form.formState.errors).join(","),
    });
  }

  function markStarted() {
    if (started.current) return;
    started.current = true;
    trackEvent("start_lead_form", { lead_type: leadType });
  }

  if (submitted) {
    return (
      <div className="border border-black/10 bg-white p-10 text-center animate-in fade-in zoom-in duration-500">
        <h3 className="font-serif text-3xl text-black mb-3">Request received.</h3>
        <p className="text-muted-foreground mb-3">Josh will review your details and follow up shortly.</p>
        <p className="mb-6 text-sm text-neutral-600">Need a faster answer? Call or text <a href={phoneHref} className="font-semibold text-black underline underline-offset-4">{siteConfig.phone}</a>.</p>
        <Button variant="outline" onClick={() => {
          form.reset({
            name: "",
            email: "",
            phone: "",
            message: "",
            propertyAddress: "",
            area: "",
            leadType,
            company: "",
          });
          submissionId.current = createSubmissionId();
          started.current = false;
          setSubmitted(false);
        }}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <div className="border border-black/10 bg-white p-7 shadow-2xl shadow-black/10 md:p-10">
      {(title || subtitle) && (
        <div className="mb-8 border-b border-black/10 pb-6">
          {title && <h3 className="font-serif text-4xl leading-none text-black">{title}</h3>}
          {subtitle && <p className="mt-3 leading-7 text-neutral-600">{subtitle}</p>}
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} onFocusCapture={markStarted} noValidate className="space-y-5 [&_label]:text-[11px] [&_label]:font-bold [&_label]:uppercase [&_label]:tracking-[0.18em] [&_label]:text-neutral-600 [&_input]:h-12 [&_input]:rounded-none [&_input]:border-black/15 [&_textarea]:rounded-none [&_textarea]:border-black/15">
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor={`company-${leadType}`}>Company</label>
            <input id={`company-${leadType}`} type="text" autoComplete="off" tabIndex={-1} {...form.register("company")} />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Full name" autoComplete="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" inputMode="email" placeholder="name@email.com" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number{isSellerLead ? " *" : ""}</FormLabel>
                  <FormControl>
                    <Input type="tel" inputMode="tel" placeholder={siteConfig.phone} autoComplete="tel" {...field} onBlur={() => { field.onBlur(); field.onChange(formatPhone(field.value)); }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {showAddress && (
            <FormField
              control={form.control}
              name="propertyAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Property address in The Woodlands, Tomball, or Greater Houston" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {showArea && (
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Desired Area / Neighborhood</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Alden Bridge, Creekside, Tomball" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message / Details</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell Josh about your timeline, goals, property, or questions." 
                    className="min-h-[100px] resize-y"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <input type="hidden" {...form.register("leadType")} />
          <Button type="submit" className="h-14 w-full rounded-none bg-black text-[11px] font-bold uppercase tracking-[0.24em] text-white hover:bg-[#9b6d1d]" disabled={createLead.isPending}>
            {createLead.isPending ? "Submitting..." : buttonText}
          </Button>
          <div className="min-h-5 text-center text-xs text-neutral-500" aria-live="polite" role="status">
            {createLead.isPending ? "Securely sending your request. Please keep this page open." : createLead.isError ? <>Not confirmed. Try again or call <a className="font-semibold text-black underline underline-offset-4" href={phoneHref}>{siteConfig.phone}</a>.</> : null}
          </div>
          {isSellerLead && <p className="text-center text-xs leading-5 text-neutral-500">Private seller requests are reviewed personally. No spam, no automated valuation blast.</p>}
          <p className="text-center text-xs leading-5 text-neutral-500">By submitting, you agree Josh may contact you about your request. Your information is handled according to the <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-black">privacy policy</Link>.</p>
        </form>
      </Form>
    </div>
  );
}

function createSubmissionId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (character) => {
    const random = Math.floor(Math.random() * 16);
    return (character === "x" ? random : (random & 0x3) | 0x8).toString(16);
  });
}

function formatPhone(value: string | undefined) {
  const digits = value?.replace(/\D/g, "") ?? "";
  if (digits.length !== 10) return value ?? "";
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
