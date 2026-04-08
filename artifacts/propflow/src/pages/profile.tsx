import { MainLayout } from "@/components/layout/main-layout";
import { useGetMyProfile, useUpsertProfile, useGetMyMembership } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { ShieldAlert, User as UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

const profileSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional().nullable(),
  company: z.string().optional().nullable(),
});

export default function Profile() {
  const { data: profile, isLoading: profileLoading } = useGetMyProfile();
  const { data: membership, isLoading: membershipLoading } = useGetMyMembership({ query: { retry: false } });
  const upsertMutation = useUpsertProfile();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      company: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        email: profile.email || "",
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phone: profile.phone || "",
        company: profile.company || "",
      });
    }
  }, [profile, form]);

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    upsertMutation.mutate({ data: values }, {
      onSuccess: () => {
        toast({ title: "Profile updated successfully" });
      },
      onError: (err) => {
        toast({ title: "Failed to update profile", description: err.error?.error, variant: "destructive" });
      }
    });
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and membership details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="border-border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-primary" /> Personal Information
                </CardTitle>
                <CardDescription>Update your personal and company details.</CardDescription>
              </CardHeader>
              <CardContent>
                {profileLoading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-10 bg-muted/50 rounded" />
                    <div className="h-10 bg-muted/50 rounded" />
                    <div className="h-10 bg-muted/50 rounded" />
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-foreground">First Name</FormLabel>
                              <FormControl>
                                <Input {...field} value={field.value || ""} className="bg-background" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-foreground">Last Name</FormLabel>
                              <FormControl>
                                <Input {...field} value={field.value || ""} className="bg-background" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold text-foreground">Email Address</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" disabled className="bg-muted/30" />
                            </FormControl>
                            <CardDescription>Managed via Clerk authentication.</CardDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-foreground">Phone Number</FormLabel>
                              <FormControl>
                                <Input {...field} value={field.value || ""} className="bg-background" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-semibold text-foreground">Company</FormLabel>
                              <FormControl>
                                <Input {...field} value={field.value || ""} placeholder="e.g. Acme Capital" className="bg-background" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-end pt-4 border-t border-border">
                        <Button type="submit" className="bg-primary text-primary-foreground font-semibold" disabled={upsertMutation.isPending}>
                          {upsertMutation.isPending ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-border shadow-sm">
              <CardHeader className="bg-muted/30 border-b border-border pb-4">
                <CardTitle className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-accent" /> Membership
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {membershipLoading ? (
                  <div className="h-20 bg-muted/50 rounded animate-pulse" />
                ) : membership?.status === "active" ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-muted-foreground font-medium">Current Plan</span>
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-500/10">Active</Badge>
                      </div>
                      <p className="text-2xl font-bold">{membership.plan.name}</p>
                    </div>
                    
                    <div className="pt-4 border-t border-border space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Billing Cycle</span>
                        <span className="font-medium capitalize">{membership.billingCycle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Renews On</span>
                        <span className="font-medium">{membership.expiresAt ? new Date(membership.expiresAt).toLocaleDateString() : 'N/A'}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 mt-2">
                      <Link href="/memberships">
                        <Button variant="outline" className="w-full font-semibold">Change Plan</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 space-y-4">
                    <p className="text-muted-foreground font-medium">No active subscription</p>
                    <Link href="/memberships">
                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">View Plans</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
