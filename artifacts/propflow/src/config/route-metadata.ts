import { locationPhotos } from "./location-photos";
import { siteConfig } from "./site";

export type RouteSocialImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type RouteMetadata = {
  title: string;
  description: string;
  image: RouteSocialImage;
};

const images = {
  default: { src: siteConfig.socialImage, width: 1200, height: 630, alt: siteConfig.socialImageAlt },
  homepage: locationPhotos.homepage,
  woodlands: locationPhotos.woodlands,
  pavilion: locationPhotos.pavilion,
  houston: locationPhotos.houston,
  tomball: locationPhotos.tomball,
  luxury: locationPhotos.carltonWoods,
  listing: locationPhotos.listingRepresentation,
  eastShore: locationPhotos.eastShore,
  creekside: locationPhotos.creeksidePark,
  magnolia: locationPhotos.magnolia,
  spring: locationPhotos.spring,
  conroe: locationPhotos.conroe,
  buyer: { src: "/images/buyer-brief-interior.jpg", width: 1600, height: 1068, alt: "Spacious contemporary interior with a curved staircase" },
  seller: { src: "/images/seller-presentation-interior.jpg", width: 1600, height: 1067, alt: "Prepared contemporary living and dining space" },
  valuation: { src: "/images/valuation-property-interior.jpg", width: 1920, height: 1280, alt: "Contemporary open-plan kitchen, dining, and living interior" },
} satisfies Record<string, RouteSocialImage>;

type ImageKey = keyof typeof images;
type RouteCopy = readonly [title: string, description: string, image: ImageKey];

const routeCopy = {
  "/": ["Josh Wisdom Realtor | The Woodlands Luxury Real Estate", "Josh Wisdom Realtor helps The Woodlands and North Houston homeowners price, prepare, market, and negotiate with a private seller-first listing strategy.", "homepage"],
  "/about": ["About Josh Wisdom | Private Real Estate Advisory", "Meet Josh Wisdom, a VIP Realty real estate professional providing private seller, buyer, luxury, and relocation guidance across The Woodlands and North Houston.", "woodlands"],
  "/buy": ["Private Buyer Representation | The Woodlands & North Houston", "Private buyer representation for The Woodlands and North Houston, with a focused search brief, property comparison, diligence planning, and disciplined offer strategy.", "buyer"],
  "/sell": ["Selling A Home In The Woodlands | Josh Wisdom Realtor", "Private seller representation for The Woodlands and North Houston, with property-specific pricing, preparation, launch strategy, and disciplined offer negotiation.", "seller"],
  "/home-valuation": ["Private Home Value Review | The Woodlands Listing Agent", "Request a private, property-specific home value review from Josh Wisdom Realtor for The Woodlands and North Houston, with current competition and pricing context.", "valuation"],
  "/relocation": ["Private Houston Relocation Advisory | Josh Wisdom Realtor", "Private relocation guidance for The Woodlands and Greater Houston, organized around daily routes, area comparisons, remote previews, property needs, and complete ownership context.", "houston"],
  "/communities": ["Community Guides | The Woodlands & North Houston", "Compare The Woodlands, Tomball, Magnolia, Spring, Conroe, Shenandoah, and Greater Houston areas by setting, property type, daily routes, and ownership context.", "woodlands"],
  "/communities/the-woodlands": ["The Woodlands Real Estate & Community Guide | Josh Wisdom", "Compare The Woodlands villages, distinctive settings, daily routes, property types, and address-level ownership considerations with Josh Wisdom Realtor.", "woodlands"],
  "/communities/tomball": ["Tomball TX Real Estate & Property Guide | Josh Wisdom", "Compare Tomball's historic core, established neighborhoods, newer communities, acreage, utilities, ownership context, and daily routes with Josh Wisdom Realtor.", "tomball"],
  "/communities/greater-houston": ["Greater Houston Real Estate & Community Guide | Josh Wisdom", "Compare Greater Houston communities through recurring routes, property requirements, ownership context, complete cost, and a private relocation brief with Josh Wisdom.", "houston"],
  "/luxury-homes": ["The Woodlands Luxury Homes | Josh Wisdom Realtor", "Private luxury listing and buyer representation for The Woodlands estates, Carlton Woods, East Shore, and distinctive North Houston homes.", "luxury"],
  "/the-woodlands-events": ["The Woodlands Events | Automatically Updated Local Calendar", "An automatically refreshed Woodlands events brief sourced from the official Visit The Woodlands calendar.", "pavilion"],
  "/blog": ["Private Real Estate Insights | Josh Wisdom Realtor", "Decision-focused seller, luxury, property, and community guidance for The Woodlands, Tomball, and North Houston homeowners.", "woodlands"],
  "/privacy-policy": ["Privacy Policy | Josh Wisdom Realtor", "Privacy policy for The Woodlands Listing Agent and Josh Wisdom Realtor lead forms.", "default"],
  "/terms": ["Terms & Real Estate Notices | Josh Wisdom Realtor", "Real estate notices, brokerage information, and website terms for Josh Wisdom Realtor.", "default"],
  "/contact": ["Contact Josh Wisdom Realtor | The Woodlands Listing Agent", "Contact Josh Wisdom Realtor for private seller, buyer, luxury property, relocation, and home valuation guidance in The Woodlands and North Houston.", "houston"],
  "/the-woodlands-listing-agent": ["The Woodlands Listing Agent | Josh Wisdom Realtor", "The Woodlands listing agent for private seller representation, property-specific pricing, preparation, presentation, launch strategy, and negotiation.", "listing"],
  "/the-woodlands-realtor": ["The Woodlands Realtor | Josh Wisdom Realtor", "Josh Wisdom Realtor serves The Woodlands, Tomball, and Greater Houston with seller-focused real estate guidance and local market knowledge.", "woodlands"],
  "/the-woodlands-luxury-homes": ["The Woodlands Luxury Homes | Josh Wisdom Realtor", "Luxury listing and buyer guidance for The Woodlands estates, custom homes, golf-course properties, and premium neighborhoods.", "luxury"],
  "/communities/carlton-woods": ["Carlton Woods Real Estate Guide | Josh Wisdom Realtor", "Seller and buyer guidance for Carlton Woods estates, golf properties, and luxury real estate in The Woodlands, Texas.", "luxury"],
  "/communities/east-shore": ["East Shore Real Estate Guide | Josh Wisdom Realtor", "Seller and buyer guidance for East Shore real estate near Lake Woodlands, Market Street, and The Woodlands Waterway.", "eastShore"],
  "/communities/creekside-park": ["Creekside Park Real Estate Guide | Josh Wisdom Realtor", "Seller strategy and buyer guidance for Creekside Park real estate in The Woodlands and Tomball-area market.", "creekside"],
  "/magnolia-realtor": ["Magnolia Realtor | Josh Wisdom Realtor", "Work with Josh Wisdom Realtor for Magnolia homes, acreage properties, new construction, and seller guidance north of Houston.", "magnolia"],
  "/spring-realtor": ["Spring Realtor | Josh Wisdom Realtor", "Josh Wisdom Realtor helps Spring TX buyers and sellers with local guidance, home valuation, and north Houston market insight.", "spring"],
  "/conroe-realtor": ["Conroe Realtor | Josh Wisdom Realtor", "Josh Wisdom Realtor helps Conroe TX buyers and sellers with local guidance, home valuation, and luxury property conversations.", "conroe"],
  "/shenandoah-realtor": ["Shenandoah Realtor | Josh Wisdom Realtor", "Josh Wisdom Realtor helps Shenandoah TX buyers and sellers with local guidance, home valuation, and north Houston market insight.", "houston"],
  "/selling-a-home-in-the-woodlands": ["Selling A Home In The Woodlands | Josh Wisdom Realtor", "Learn how Josh Wisdom Realtor helps The Woodlands homeowners price, prepare, market, and negotiate a stronger home sale.", "listing"],
  "/blog/how-to-price-a-home-in-the-woodlands": ["How to price a Woodlands home without surrendering the strategy | Josh Wisdom Realtor", "A seller-focused framework for separating closed evidence, active competition, property condition, and launch decisions before choosing a list price.", "valuation"],
  "/blog/what-carlton-woods-buyers-compare": ["What buyers compare before making a Carlton Woods offer | Josh Wisdom Realtor", "A property-specific look at privacy, lot, architecture, condition, setting, presentation, access, and the complete terms behind a distinctive-home decision.", "luxury"],
  "/blog/selling-near-the-woodlands-waterway": ["Selling near The Woodlands Waterway: what the location must explain | Josh Wisdom Realtor", "How to position an East Shore, Waterway, Market Street, or Hughes Landing-area property without reducing the value story to a list of nearby destinations.", "woodlands"],
  "/blog/creekside-park-seller-checklist": ["A Creekside Park seller checklist before the market sees the home | Josh Wisdom Realtor", "A controlled pre-listing framework for competition, condition, records, photography, access, launch timing, and the buyer questions that should be addressed early.", "seller"],
  "/mortgage-estimate": ["Mortgage Payment Estimate | Josh Wisdom Realtor", "Model principal, interest, taxes, insurance, mortgage insurance, association costs, other assessments, and planning cash before comparing a specific home.", "buyer"],
} satisfies Record<string, RouteCopy>;

export function routeMetadataForPath(pathname: string): RouteMetadata | undefined {
  const normalized = pathname !== "/" ? pathname.replace(/\/+$/, "") : pathname;
  const copy = routeCopy[normalized as keyof typeof routeCopy];
  if (!copy) return undefined;
  return { title: copy[0], description: copy[1], image: images[copy[2]] };
}
