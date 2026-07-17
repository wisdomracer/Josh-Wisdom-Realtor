export type LocationPhoto = {
  src: string; srcSet: string; width: number; height: number; alt: string;
  credit: string; sourceUrl: string; license: string; licenseUrl: string;
  objectPosition?: string; cropScale?: number; cropOrigin?: string;
};

const woodlandsWaterway: LocationPhoto = {
  src: "/images/the-woodlands-waterway.jpg",
  srcSet: "/images/the-woodlands-waterway-600.webp 600w, /images/the-woodlands-waterway-1200.webp 1200w",
  width: 1200, height: 1600,
  alt: "Water taxi and buildings along The Woodlands Waterway",
  credit: "Social Woodlands", sourceUrl: "https://commons.wikimedia.org/wiki/File:The_Woodlands_Waterway_(5050352741).jpg",
  license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/", objectPosition: "center 58%",
};

const woodlandsLifestyle: LocationPhoto = {
  src: "/images/the-woodlands-waterway-lifestyle.jpg",
  srcSet: "/images/the-woodlands-waterway-lifestyle-960.webp 960w, /images/the-woodlands-waterway-lifestyle-1920.webp 1920w",
  width: 1920, height: 1280,
  alt: "A great blue heron beside paddleboards on The Woodlands Waterway",
  credit: "Philcomanforterie", sourceUrl: "https://commons.wikimedia.org/wiki/File:Great_Blue_Heron,_Woodlands_Waterway.jpg",
  license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", objectPosition: "center",
};

const pavilion: LocationPhoto = {
  src: "/images/the-woodlands-pavilion-night.jpg",
  srcSet: "/images/the-woodlands-pavilion-night-960.webp 960w, /images/the-woodlands-pavilion-night-1920.webp 1920w",
  width: 1920, height: 1275,
  alt: "The Cynthia Woods Mitchell Pavilion illuminated during the Star-Spangled Salute",
  credit: "Ted Washington / Woodlands Pavilion", sourceUrl: "https://commons.wikimedia.org/wiki/File:Pavilion_Blue.jpg",
  license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/", objectPosition: "center",
};

const regional = (src: string, srcSet: string, width: number, height: number, alt: string, credit: string, sourceUrl: string, license: string, licenseUrl: string): LocationPhoto =>
  ({ src, srcSet, width, height, alt, credit, sourceUrl, license, licenseUrl, objectPosition: "center" });

const tomball = regional("/images/tomball-griffin-house.jpg", "/images/tomball-griffin-house-960.webp 960w, /images/tomball-griffin-house-1920.webp 1920w", 1920, 1440, "The historic Griffin House beneath mature trees in Tomball, Texas", "Michael Martin", "https://commons.wikimedia.org/wiki/File:Griffin_House_-_Flickr_-_pinemikey.jpg", "CC BY-SA 2.0", "https://creativecommons.org/licenses/by-sa/2.0/");
const magnolia = regional("/images/magnolia-historic-depot.jpg", "/images/magnolia-historic-depot-960.webp 960w, /images/magnolia-historic-depot-1920.webp 1920w", 1920, 1080, "The historic Magnolia railroad depot in Magnolia, Texas", "Stedil", "https://commons.wikimedia.org/wiki/File:Magnolia_Historic_Depot.jpg", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0/");
const spring = regional("/images/spring-old-town.jpg", "/images/spring-old-town-960.webp 960w, /images/spring-old-town-1920.webp 1920w", 1920, 962, "Historic storefronts and mature trees in Old Town Spring, Texas", "Renelibrary", "https://commons.wikimedia.org/wiki/File:Old_Town_Spring_Wiki_5.jpg", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0/");
const conroe = regional("/images/lake-conroe-sunset.jpg", "/images/lake-conroe-sunset-960.webp 960w, /images/lake-conroe-sunset-1920.webp 1920w", 1920, 1429, "Sunset over Lake Conroe viewed from the water", "Trey Perry", "https://commons.wikimedia.org/wiki/File:Lake_Conroe_on_July_4th.jpg", "CC BY 3.0", "https://creativecommons.org/licenses/by/3.0/");
const shenandoah = regional("/images/shenandoah-portofino.jpg", "/images/shenandoah-portofino-960.webp 960w, /images/shenandoah-portofino-1920.webp 1920w", 1920, 1080, "The Portofino shopping center in Shenandoah, Texas", "Stedil", "https://commons.wikimedia.org/wiki/File:Portofino_Shopping_Center.jpg", "CC BY-SA 4.0", "https://creativecommons.org/licenses/by-sa/4.0/");
const houston = regional("/images/houston-skyline.jpg", "/images/houston-skyline-960.webp 960w, /images/houston-skyline-1920.webp 1920w", 1920, 960, "Downtown Houston skyline viewed across Buffalo Bayou", "David Daniel Turner", "https://commons.wikimedia.org/wiki/File:Downtown_Houston,_TX_Skyline_-_2018.jpg", "CC BY 4.0", "https://creativecommons.org/licenses/by/4.0/");

export const locationPhotos = {
  homepage: woodlandsLifestyle,
  editorialWineCellar: woodlandsWaterway,
  editorialMarbleBathroom: woodlandsLifestyle,
  editorialPrivatePool: pavilion,
  woodlandsLuxury: woodlandsLifestyle,
  carltonWoods: woodlandsWaterway,
  eastShore: woodlandsWaterway,
  creeksidePark: woodlandsLifestyle,
  listingRepresentation: woodlandsWaterway,
  woodlands: woodlandsLifestyle,
  pavilion, tomball, magnolia, spring, conroe, shenandoah, houston,
};

export function photoForSeoSlug(slug: string): LocationPhoto {
  if (slug === "magnolia-realtor") return magnolia;
  if (slug === "spring-realtor") return spring;
  if (slug === "conroe-realtor") return conroe;
  if (slug === "shenandoah-realtor") return shenandoah;
  if (slug.includes("woodlands") || slug.includes("carlton-woods") || slug.includes("east-shore") || slug.includes("creekside-park")) return woodlandsLifestyle;
  return houston;
}
