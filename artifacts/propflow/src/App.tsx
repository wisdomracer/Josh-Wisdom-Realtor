import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";

import { MainLayout } from "@/components/layout/main-layout";
import Home from "@/pages/home";
import { BlogIndex, BlogPost, blogPosts } from "@/pages/blog";
import { SeoLandingPage, seoLandingPages } from "@/pages/seo-landing";
import { FeaturePage, featurePages } from "@/pages/feature-page";
import NotFound from "@/pages/not-found";
import { Analytics } from "@/components/analytics";

const queryClient = new QueryClient();
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const About = lazy(() => import("@/pages/about"));
const Buy = lazy(() => import("@/pages/buy"));
const Sell = lazy(() => import("@/pages/sell"));
const HomeValuation = lazy(() => import("@/pages/home-valuation"));
const Relocation = lazy(() => import("@/pages/relocation"));
const Communities = lazy(() => import("@/pages/communities"));
const TheWoodlands = lazy(() => import("@/pages/communities/the-woodlands"));
const Tomball = lazy(() => import("@/pages/communities/tomball"));
const GreaterHouston = lazy(() => import("@/pages/communities/greater-houston"));
const LuxuryHomes = lazy(() => import("@/pages/luxury-homes"));
const TheWoodlandsEvents = lazy(() => import("@/pages/the-woodlands-events"));
const Contact = lazy(() => import("@/pages/contact"));
const PrivacyPolicy = lazy(() => import("@/pages/legal").then((module) => ({ default: module.PrivacyPolicy })));
const TermsPage = lazy(() => import("@/pages/legal").then((module) => ({ default: module.TermsPage })));
function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}

function AppRoutes() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="mx-auto min-h-[60vh] max-w-[1440px] px-5 py-24 text-sm text-neutral-600" role="status">Loading page…</div>}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/buy" component={Buy} />
        <Route path="/sell" component={Sell} />
        <Route path="/home-valuation" component={HomeValuation} />
        <Route path="/relocation" component={Relocation} />
        <Route path="/communities" component={Communities} />
        <Route path="/communities/the-woodlands" component={TheWoodlands} />
        <Route path="/communities/tomball" component={Tomball} />
        <Route path="/communities/greater-houston" component={GreaterHouston} />
        <Route path="/luxury-homes" component={LuxuryHomes} />
        <Route path="/the-woodlands-events" component={TheWoodlandsEvents} />
        <Route path="/blog" component={BlogIndex} />
        {blogPosts.map((post) => (
          <Route key={post.slug} path={`/blog/${post.slug}`} component={() => <BlogPost slug={post.slug} />} />
        ))}
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/contact" component={Contact} />
        {featurePages.map((feature) => (
          <Route key={feature.slug} path={`/${feature.slug}`} component={() => <FeaturePage feature={feature} />} />
        ))}
        {seoLandingPages.map((page) => (
          <Route key={page.slug} path={`/${page.slug}`} component={() => <SeoLandingPage page={page} />} />
        ))}
        <Route component={NotFound} />
      </Switch>
      </Suspense>
    </MainLayout>
  );
}

function App() {
  return (
    <HelmetProvider>
      <WouterRouter base={basePath}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ScrollToTop />
            <Analytics />
            <AppRoutes />
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </WouterRouter>
    </HelmetProvider>
  );
}

export default App;
