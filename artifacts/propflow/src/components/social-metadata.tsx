import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";
import { locationPhotos } from "@/config/location-photos";
import { absoluteUrl, siteConfig } from "@/config/site";

const defaultDescription = "Private real estate advisory for homeowners and buyers across The Woodlands and North Houston.";

export function SocialMetadata() {
  const [location] = useLocation();
  const route = location.split(/[?#]/)[0] || "/";
  const [metadata, setMetadata] = useState<{ title: string; description: string }>({ title: siteConfig.name, description: defaultDescription });
  const socialImage = route === "/the-woodlands-events"
    ? { src: locationPhotos.pavilion.src, width: locationPhotos.pavilion.width, height: locationPhotos.pavilion.height, alt: locationPhotos.pavilion.alt }
    : { src: siteConfig.socialImage, width: 1200, height: 630, alt: siteConfig.socialImageAlt };

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
      <meta property="og:url" content={absoluteUrl(route)} />
      <meta property="og:image" content={absoluteUrl(socialImage.src)} />
      <meta property="og:image:width" content={String(socialImage.width)} />
      <meta property="og:image:height" content={String(socialImage.height)} />
      <meta property="og:image:alt" content={socialImage.alt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={absoluteUrl(socialImage.src)} />
      <meta name="twitter:image:alt" content={socialImage.alt} />
    </Helmet>
  );
}
