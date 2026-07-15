export const siteConfig = {
  url: "https://joshwisdomrealtor.com",
  name: "Josh Wisdom Realtor",
  agentName: "Josh Wisdom",
  phone: "832-981-8920",
  phoneE164: "+18329818920",
  email: "WisdomRacer@gmail.com",
  socialImage: "/og-image.png",
  socialImageAlt: "Josh Wisdom Realtor — private real estate advisory for The Woodlands and North Houston",
  brokerage: {
    name: "VIP Realty",
    streetAddress: "5100 Westheimer Ste 200",
    locality: "Houston",
    region: "TX",
    postalCode: "77027",
  },
  disclosures: {
    consumerProtectionNotice: "https://www.trec.texas.gov/forms/consumer-protection-notice",
    informationAboutBrokerageServices: "https://www.trec.texas.gov/forms/information-about-brokerage-services",
  },
} as const;

export const phoneHref = `tel:${siteConfig.phoneE164}`;
export const textHref = `sms:${siteConfig.phoneE164}`;
export const emailHref = `mailto:${siteConfig.email}`;

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? `${siteConfig.url}/` : `${siteConfig.url}${normalizedPath}`;
}
