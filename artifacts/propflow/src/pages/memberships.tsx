import { MainLayout } from "@/components/layout/main-layout";
import { useListMembershipPlans, useGetMyMembership, useSubscribeToPlan } from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ShieldAlert, Sparkles, Building2, Search, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { getGetMyMembershipQueryKey } from "@workspace/api-client-react";
import { Show, useUser } from "@clerk/react";
import { Link } from "wouter";

export default function Memberships() {
  const { data: plans, isLoading: plansLoading } = useListMembershipPlans();
  const { data: myMembership, isLoading: membershipLoading } = useGetMyMembership({ query: { retry: false } }); // handle 404 gracefully by not retrying
  const subscribeMutation = useSubscribeToPlan();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { isSignedIn } = useUser();

  const handleSubscribe = (planId: number) => {
    subscribeMutation.mutate(
      { data: { planId, billingCycle: "monthly" } },
      {
        onSuccess: () => {
          toast({ title: "Successfully subscribed to plan!" });
          queryClient.invalidateQueries({ queryKey: getGetMyMembershipQueryKey() });
        },
        onError: (err) => {
          toast({ title: "Failed to subscribe", description: err.error?.error, variant: "destructive" });
        }
      }
    );
  };

  return (
    <MainLayout requireAuth={false}>
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 px-3 py-1 font-semibold uppercase tracking-wider">
            Pricing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Institutional Data. Investor Pricing.</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your deal flow. Upgrade anytime.
          </p>
        </div>

        {myMembership && myMembership.status === "active" && (
          <Card className="mb-12 border-primary bg-primary/5 shadow-sm">
            <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Current Plan: {myMembership.plan.name}</h3>
                  <p className="text-muted-foreground text-sm">Your subscription is active until {myMembership.expiresAt ? new Date(myMembership.expiresAt).toLocaleDateString() : 'forever'}</p>
                </div>
              </div>
              <Link href="/dashboard">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Go to Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {plansLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3].map(i => <Card key={i} className="h-96 bg-muted/50" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans?.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative flex flex-col h-full border-border shadow-sm transition-all duration-300 hover:shadow-xl ${plan.isPopular ? 'border-accent shadow-accent/10 md:-translate-y-4' : 'hover:border-primary/30'}`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-accent text-accent-foreground px-3 py-1 shadow-sm font-bold uppercase tracking-wider text-xs">
                      <Sparkles className="w-3 h-3 mr-1" /> Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pt-8 pb-4">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-sm mt-2 font-medium">{plan.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-1 flex flex-col">
                  <div className="text-center mb-8">
                    <span className="text-5xl font-extrabold">${plan.priceMonthly}</span>
                    <span className="text-muted-foreground font-medium">/mo</span>
                  </div>

                  <ul className="space-y-4 mb-8 flex-1">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium">{plan.maxSearches === -1 ? 'Unlimited' : plan.maxSearches?.toLocaleString()} searches per month</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium">{plan.maxSavedProperties === -1 ? 'Unlimited' : plan.maxSavedProperties?.toLocaleString()} saved properties</span>
                    </li>
                    {plan.hasForeclosures && (
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium">Pre-foreclosure & Auction Data</span>
                      </li>
                    )}
                    {plan.hasTaxDelinquent && (
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium">Tax Delinquent Leads</span>
                      </li>
                    )}
                    {plan.hasCodeViolations && (
                      <li className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium">City Code Violations</span>
                      </li>
                    )}
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pb-8 pt-0">
                  <Show when="signed-in">
                    <Button 
                      className={`w-full h-12 font-bold text-base ${plan.isPopular ? 'bg-accent hover:bg-accent/90 text-accent-foreground' : ''}`}
                      variant={plan.isPopular ? 'default' : 'outline'}
                      disabled={myMembership?.planId === plan.id || subscribeMutation.isPending}
                      onClick={() => handleSubscribe(plan.id)}
                    >
                      {myMembership?.planId === plan.id ? 'Current Plan' : 'Subscribe Now'}
                    </Button>
                  </Show>
                  <Show when="signed-out">
                    <Link href="/sign-up" className="w-full">
                      <Button 
                        className={`w-full h-12 font-bold text-base ${plan.isPopular ? 'bg-accent hover:bg-accent/90 text-accent-foreground' : ''}`}
                        variant={plan.isPopular ? 'default' : 'outline'}
                      >
                        Sign Up to Subscribe <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </Show>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
