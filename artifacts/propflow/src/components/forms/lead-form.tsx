import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateLead } from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().optional(),
  propertyAddress: z.string().optional(),
  area: z.string().optional(),
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
  const createLead = useCreateLead();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      propertyAddress: "",
      area: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createLead.mutate({
      data: {
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        message: values.message || null,
        propertyAddress: values.propertyAddress || null,
        area: values.area || null,
        leadType,
      }
    }, {
      onSuccess: () => {
        setSubmitted(true);
        toast.success("Request submitted successfully!");
      },
      onError: () => {
        toast.error("Failed to submit. Please try again.");
      }
    });
  }

  if (submitted) {
    return (
      <div className="border border-black/10 bg-white p-10 text-center animate-in fade-in zoom-in duration-500">
        <h3 className="font-serif text-3xl text-black mb-3">Thank you!</h3>
        <p className="text-muted-foreground mb-6">Your request has been received. I'll be in touch with you shortly.</p>
        <Button variant="outline" onClick={() => {
          form.reset();
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 [&_label]:text-[11px] [&_label]:font-bold [&_label]:uppercase [&_label]:tracking-[0.18em] [&_label]:text-neutral-600 [&_input]:h-12 [&_input]:rounded-none [&_input]:border-black/15 [&_textarea]:rounded-none [&_textarea]:border-black/15">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="name@email.com" {...field} />
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
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="832-981-8920" {...field} />
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
          <Button type="submit" className="h-14 w-full rounded-none bg-black text-[11px] font-bold uppercase tracking-[0.24em] text-white hover:bg-[#9b6d1d]" disabled={createLead.isPending}>
            {createLead.isPending ? "Submitting..." : buttonText}
          </Button>
        </form>
      </Form>
    </div>
  );
}
