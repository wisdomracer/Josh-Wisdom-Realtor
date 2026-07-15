import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { absoluteUrl, siteConfig } from "@/config/site";

const defaultDescription = "Private real estate advisory for homeowners and buyers across The Woodlands and North Houston.";

export function SocialMetadata() {
  const [location] = useLocation();
  const [metadata, setMetadata] = useState<{ title: string; description: string }>({ title: siteConfig.name, description: defaultDescription });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMetadata({
        title: document.title || siteConfig.name,
        description: document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content || defaultDescription,
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location]);

  return (
    <Helmet>
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:url" content={absoluteUrl(location.split(/[?#]/)[0] || "/")} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
    </Helmet>
  );
}
