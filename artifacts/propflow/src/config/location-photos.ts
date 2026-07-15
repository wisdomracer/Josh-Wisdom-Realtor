export type LocationPhoto = {
  src: string;
  srcSet: string;
  width: number;
  height: number;
  alt: string;
  credit: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  objectPosition?: string;
  cropScale?: number;
  cropOrigin?: string;
};

export const locationPhotos = {
  homepage: {
    src: "/images/homepage-wooded-residence.jpg",
    srcSet: "/images/homepage-wooded-residence-960.webp 960w, /images/homepage-wooded-residence-1920.webp 1920w",
    width: 1920,
    height: 1281,
    alt: "Editorial view of a stone residence among tall pine trees at dusk",
    credit: "Curtis Adams",
    sourceUrl: "https://www.pexels.com/photo/modern-stone-house-in-tranquil-forest-setting-36777966/",
    license: "Pexels License",
    licenseUrl: "https://www.pexels.com/license/",
    objectPosition: "center",
  },
  carltonWoods: {
    src: "/images/luxury-architecture-dusk.jpg",
    srcSet: "/images/luxury-architecture-dusk-960.webp 960w, /images/luxury-architecture-dusk-1600.webp 1600w",
    width: 1600,
    height: 1067,
    alt: "Contemporary residence illuminated at dusk",
    credit: "Gustavo Galeano Maz",
    sourceUrl: "https://www.pexels.com/photo/exterior-of-a-modern-villa-13752348/",
    license: "Pexels License",
    licenseUrl: "https://www.pexels.com/license/",
    objectPosition: "center",
  },
  eastShore: {
    src: "/images/the-woodlands-waterway.jpg",
    srcSet: "/images/the-woodlands-waterway-600.webp 600w, /images/the-woodlands-waterway-1200.webp 1200w",
    width: 1200,
    height: 1600,
    alt: "Water taxi and buildings along The Woodlands Waterway",
    credit: "Social Woodlands",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:The_Woodlands_Waterway_(5050352741).jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    objectPosition: "center 58%",
  },
  creeksidePark: {
    src: "/images/creekside-wooded-residence.jpg",
    srcSet: "/images/creekside-wooded-residence-960.webp 960w, /images/creekside-wooded-residence-1600.webp 1600w",
    width: 1600,
    height: 1067,
    alt: "Contemporary suburban residence framed by tall pine trees",
    credit: "Curtis Adams",
    sourceUrl: "https://www.pexels.com/photo/modern-suburban-home-surrounded-by-tall-trees-36777840/",
    license: "Pexels License",
    licenseUrl: "https://www.pexels.com/license/",
    objectPosition: "center",
  },
  listingRepresentation: {
    src: "/images/listing-representation-exterior.jpg",
    srcSet: "/images/listing-representation-exterior-960.webp 960w, /images/listing-representation-exterior-1600.webp 1600w",
    width: 1600,
    height: 1068,
    alt: "Contemporary residence with a private landscaped yard and mature trees",
    credit: "Max Vakhtbovych",
    sourceUrl: "https://www.pexels.com/photo/modern-house-exterior-7587880/",
    license: "Pexels License",
    licenseUrl: "https://www.pexels.com/license/",
    objectPosition: "center",
  },
  woodlands: {
    src: "/images/the-woodlands-waterway-lifestyle.jpg",
    srcSet: "/images/the-woodlands-waterway-lifestyle-960.webp 960w, /images/the-woodlands-waterway-lifestyle-1920.webp 1920w",
    width: 1920,
    height: 1280,
    alt: "A great blue heron beside paddleboards on The Woodlands Waterway",
    credit: "Philcomanforterie",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Great_Blue_Heron,_Woodlands_Waterway.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    objectPosition: "center",
  },
  tomball: {
    src: "/images/tomball-griffin-house.jpg",
    srcSet: "/images/tomball-griffin-house-960.webp 960w, /images/tomball-griffin-house-1920.webp 1920w",
    width: 1920,
    height: 1440,
    alt: "The historic Griffin House beneath mature trees in Tomball, Texas",
    credit: "Michael Martin",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Griffin_House_-_Flickr_-_pinemikey.jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    objectPosition: "center",
  },
  magnolia: {
    src: "/images/magnolia-historic-depot.jpg",
    srcSet: "/images/magnolia-historic-depot-960.webp 960w, /images/magnolia-historic-depot-1920.webp 1920w",
    width: 1920,
    height: 1080,
    alt: "The historic Magnolia railroad depot in Magnolia, Texas",
    credit: "Stedil",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Magnolia_Historic_Depot.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    objectPosition: "center",
  },
  spring: {
    src: "/images/spring-old-town.jpg",
    srcSet: "/images/spring-old-town-960.webp 960w, /images/spring-old-town-1920.webp 1920w",
    width: 1920,
    height: 962,
    alt: "Historic storefronts and mature trees in Old Town Spring, Texas",
    credit: "Renelibrary",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Old_Town_Spring_Wiki_5.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    objectPosition: "center",
  },
  conroe: {
    src: "/images/lake-conroe-sunset.jpg",
    srcSet: "/images/lake-conroe-sunset-960.webp 960w, /images/lake-conroe-sunset-1920.webp 1920w",
    width: 1920,
    height: 1429,
    alt: "Sunset over Lake Conroe viewed from the water",
    credit: "Trey Perry",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Lake_Conroe_on_July_4th.jpg",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
    objectPosition: "center",
    cropScale: 1.18,
    cropOrigin: "center top",
  },
  houston: {
    src: "/images/houston-skyline.jpg",
    srcSet: "/images/houston-skyline-960.webp 960w, /images/houston-skyline-1920.webp 1920w",
    width: 1920,
    height: 960,
    alt: "The downtown Houston skyline viewed across Buffalo Bayou",
    credit: "David Daniel Turner",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Downtown_Houston,_TX_Skyline_-_2018.jpg",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    objectPosition: "center",
  },
} satisfies Record<string, LocationPhoto>;

export function photoForSeoSlug(slug: string): LocationPhoto {
  if (slug === "the-woodlands-listing-agent") return locationPhotos.listingRepresentation;
  if (slug === "communities/carlton-woods") return locationPhotos.carltonWoods;
  if (slug === "communities/east-shore") return locationPhotos.eastShore;
  if (slug === "communities/creekside-park") return locationPhotos.creeksidePark;
  if (slug === "magnolia-realtor") return locationPhotos.magnolia;
  if (slug === "spring-realtor") return locationPhotos.spring;
  if (slug === "conroe-realtor") return locationPhotos.conroe;
  if (slug.includes("woodlands") || slug.includes("carlton-woods") || slug.includes("east-shore") || slug.includes("creekside-park")) {
    return locationPhotos.woodlands;
  }
  return locationPhotos.houston;
}
