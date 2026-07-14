export type LocationPhoto = {
  src: string;
  alt: string;
  credit: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
  objectPosition?: string;
};

export const locationPhotos = {
  woodlands: {
    src: "/images/the-woodlands-waterway-lifestyle.jpg",
    alt: "A great blue heron beside paddleboards on The Woodlands Waterway",
    credit: "Philcomanforterie",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Great_Blue_Heron,_Woodlands_Waterway.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    objectPosition: "center",
  },
  tomball: {
    src: "/images/tomball-griffin-house.jpg",
    alt: "The historic Griffin House beneath mature trees in Tomball, Texas",
    credit: "Michael Martin",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Griffin_House_-_Flickr_-_pinemikey.jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    objectPosition: "center",
  },
  magnolia: {
    src: "/images/magnolia-historic-depot.jpg",
    alt: "The historic Magnolia railroad depot in Magnolia, Texas",
    credit: "Stedil",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Magnolia_Historic_Depot.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    objectPosition: "center",
  },
  houston: {
    src: "/images/houston-skyline.jpg",
    alt: "The downtown Houston skyline viewed across Buffalo Bayou",
    credit: "David Daniel Turner",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Downtown_Houston,_TX_Skyline_-_2018.jpg",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    objectPosition: "center",
  },
} satisfies Record<string, LocationPhoto>;

export function photoForSeoSlug(slug: string): LocationPhoto {
  if (slug === "magnolia-realtor") return locationPhotos.magnolia;
  if (slug.includes("woodlands") || slug.includes("carlton-woods") || slug.includes("east-shore") || slug.includes("creekside-park")) {
    return locationPhotos.woodlands;
  }
  return locationPhotos.houston;
}
