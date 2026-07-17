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

const photographyPending: LocationPhoto = {
  src: "",
  srcSet: "",
  width: 1,
  height: 1,
  alt: "Photography intentionally withheld pending verified Woodlands-area imagery",
  credit: "",
  sourceUrl: "",
  license: "",
  licenseUrl: "",
};

export const locationPhotos = {
  homepage: photographyPending,
  editorialWineCellar: photographyPending,
  editorialMarbleBathroom: photographyPending,
  editorialPrivatePool: photographyPending,
  woodlandsLuxury: photographyPending,
  carltonWoods: photographyPending,
  eastShore: photographyPending,
  creeksidePark: photographyPending,
  listingRepresentation: photographyPending,
  woodlands: photographyPending,
  pavilion: photographyPending,
  tomball: photographyPending,
  magnolia: photographyPending,
  spring: photographyPending,
  conroe: photographyPending,
  shenandoah: photographyPending,
  houston: photographyPending,
};

export function photoForSeoSlug(_slug: string): LocationPhoto {
  return photographyPending;
}
