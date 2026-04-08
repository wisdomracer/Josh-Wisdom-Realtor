import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Save, X } from "lucide-react";
import { Property, CreatePropertyBodyType, CreatePropertyBodyStatus } from "@workspace/api-client-react/src/generated/api.schemas";
import { Link } from "wouter";

const propertySchema = z.object({
  type: z.enum(["foreclosure", "tax_delinquent", "code_violation"]),
  status: z.enum(["active", "pending", "sold", "removed"]).default("active"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "Zip is required"),
  county: z.string().optional().nullable(),
  price: z.coerce.number().optional().nullable(),
  estimatedValue: z.coerce.number().optional().nullable(),
  beds: z.coerce.number().optional().nullable(),
  baths: z.coerce.number().optional().nullable(),
  sqft: z.coerce.number().optional().nullable(),
  yearBuilt: z.coerce.number().optional().nullable(),
  lotSize: z.coerce.number().optional().nullable(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().url().optional().nullable().or(z.literal('')),
  
  // Type specific fields
  auctionDate: z.string().optional().nullable(),
  taxAmount: z.coerce.number().optional().nullable(),
  violationCode: z.string().optional().nullable(),
  violationDescription: z.string().optional().nullable(),
});

interface PropertyFormProps {
  initialData?: Property;
  onSubmit: (data: z.infer<typeof propertySchema>) => void;
  isSubmitting: boolean;
}

export function PropertyForm({ initialData, onSubmit, isSubmitting }: PropertyFormProps) {
  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      type: initialData?.type || "foreclosure",
      status: initialData?.status || "active",
      address: initialData?.address || "",
      city: initialData?.city || "",
      state: initialData?.state || "",
      zip: initialData?.zip || "",
      county: initialData?.county || "",
      price: initialData?.price || null,
      estimatedValue: initialData?.estimatedValue || null,
      beds: initialData?.beds || null,
      baths: initialData?.baths || null,
      sqft: initialData?.sqft || null,
      yearBuilt: initialData?.yearBuilt || null,
      lotSize: initialData?.lotSize || null,
      description: initialData?.description || "",
      imageUrl: initialData?.imageUrl || "",
      
      auctionDate: initialData?.auctionDate || "",
      taxAmount: initialData?.taxAmount || null,
      violationCode: initialData?.violationCode || "",
      violationDescription: initialData?.violationDescription || "",
    },
  });

  const selectedType = form.watch("type");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted/30 border-b border-border">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" /> Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="foreclosure">Foreclosure</SelectItem>
                            <SelectItem value="tax_delinquent">Tax Delinquent</SelectItem>
                            <SelectItem value="code_violation">Code Violation</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="sold">Sold</SelectItem>
                            <SelectItem value="removed">Removed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="county"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>County (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} className="bg-background" placeholder="https://..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          value={field.value || ""} 
                          className="bg-background min-h-[120px]" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted/30 border-b border-border">
                <CardTitle className="text-lg">Property Specifications</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <FormField
                    control={form.control}
                    name="beds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Beds</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} value={field.value || ""} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="baths"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Baths</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.5" {...field} value={field.value || ""} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sqft"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sq. Ft.</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} value={field.value || ""} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="yearBuilt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year Built</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} value={field.value || ""} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted/30 border-b border-border">
                <CardTitle className="text-lg">Financial Data</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <FormField
                  control={form.control}
                  name="estimatedValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Value</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} value={field.value || ""} className="bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Listed Price (Optional)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} value={field.value || ""} className="bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lotSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lot Size (sqft)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} value={field.value || ""} className="bg-background" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="border-border shadow-sm border-t-4" style={{ borderTopColor: selectedType === 'foreclosure' ? 'var(--destructive)' : selectedType === 'tax_delinquent' ? '#f59e0b' : '#a855f7' }}>
              <CardHeader className="bg-muted/30 border-b border-border">
                <CardTitle className="text-lg capitalize">{selectedType.replace('_', ' ')} Details</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {selectedType === "foreclosure" && (
                  <FormField
                    control={form.control}
                    name="auctionDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Auction Date (YYYY-MM-DD)</FormLabel>
                        <FormControl>
                          <Input {...field} value={field.value || ""} placeholder="2024-12-01" className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                {selectedType === "tax_delinquent" && (
                  <FormField
                    control={form.control}
                    name="taxAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delinquent Tax Amount</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} value={field.value || ""} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {selectedType === "code_violation" && (
                  <>
                    <FormField
                      control={form.control}
                      name="violationCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Violation Code</FormLabel>
                          <FormControl>
                            <Input {...field} value={field.value || ""} className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="violationDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Violation Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} value={field.value || ""} className="bg-background" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-12 text-lg font-bold" disabled={isSubmitting}>
                <Save className="w-5 h-5 mr-2" /> {initialData ? "Save Changes" : "Create Property"}
              </Button>
              <Link href="/dashboard" className="w-full">
                <Button type="button" variant="outline" className="w-full h-12 font-semibold">
                  <X className="w-5 h-5 mr-2" /> Cancel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
