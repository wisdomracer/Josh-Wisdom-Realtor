import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";

import { MainLayout } from "@/components/layout/main-layout";
import Home from "@/pages/home";
import About from "@/pages/about";
import Buy from "@/pages/buy";
import Sell from "@/pages/sell";
import HomeValuation from "@/pages/home-valuation";
import Relocation from "@/pages/relocation";
import Communities from "@/pages/communities";
import TheWoodlands from "@/pages/communities/the-woodlands";
import Tomball from "@/pages/communities/tomball";
import GreaterHouston from "@/pages/communities/greater-houston";
import LuxuryHomes from "@/pages/luxury-homes";
import MarketUpdates from "@/pages/market-updates";
import TheWoodlandsEvents from "@/pages/the-woodlands-events";
import Contact from "@/pages/contact";
import { BlogIndex, BlogPost, blogPosts } from "@/pages/blog";
import { PrivacyPolicy, TermsPage } from "@/pages/legal";
import { SeoLandingPage, seoLandingPages } from "@/pages/seo-landing";
import { FeaturePage, featurePages } from "@/pages/feature-page";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
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
        <Route path="/market-updates" component={MarketUpdates} />
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
            <AppRoutes />
            <Toaster />
          </TooltipProvider>
        </QueryClientProvider>
      </WouterRouter>
    </HelmetProvider>
  );
}

export default App;