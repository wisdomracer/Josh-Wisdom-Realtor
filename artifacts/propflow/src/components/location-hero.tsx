import type { LocationPhoto } from "@/config/location-photos";

type ResponsiveLocationImageProps = {
  photo: LocationPhoto;
  className: string;
  sizes: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

export function ResponsiveLocationImage({ photo, className, sizes, loading = "lazy", fetchPriority = "auto" }: ResponsiveLocationImageProps) {
  return (
    <picture className="block h-full w-full">
      <source type="image/webp" srcSet={photo.srcSet} sizes={sizes} />
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        className={className}
        style={{ objectPosition: photo.objectPosition }}
        loading={loading}
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}

export function PhotoCredit({ photo, label = "Photo", position = "bottom-right", className = "" }: { photo: LocationPhoto; label?: string; position?: "bottom-right" | "top-right"; className?: string }) {
  return (
    <p className={`absolute right-3 z-10 max-w-[calc(100%-1.5rem)] bg-black/70 px-3 py-1.5 text-right text-[9px] font-semibold uppercase leading-4 tracking-[0.16em] text-white/80 backdrop-blur-sm ${position === "top-right" ? "top-3" : "bottom-3"} ${className}`}>
      {label}: <a href={photo.sourceUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white">{photo.credit}</a>
      <span aria-hidden="true"> · </span>
      <a href={photo.licenseUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-white">{photo.license}</a>
    </p>
  );
}

type CommunityHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  photo: LocationPhoto;
};

export function CommunityHero({ eyebrow, title, description, photo }: CommunityHeroProps) {
  return (
    <section className="overflow-hidden bg-[#050505] text-white">
      <div className="mx-auto grid max-w-[1600px] lg:grid-cols-[0.88fr_1.12fr]">
        <div className="relative flex items-center px-5 py-20 md:px-10 md:py-24 lg:px-14 lg:py-28">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:76px_76px]" />
          <div className="relative max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#d1a54d]">{eyebrow}</p>
            <h1 className="mt-6 font-serif text-[clamp(3.5rem,7vw,7.25rem)] font-semibold leading-[0.9] tracking-[-0.035em] text-white">{title}</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/72 md:text-xl">{description}</p>
          </div>
        </div>
        <figure className="relative min-h-[360px] overflow-hidden lg:min-h-[590px]">
          <ResponsiveLocationImage photo={photo} className="absolute inset-0 h-full w-full object-cover" sizes="(min-width: 1024px) 56vw, 100vw" loading="eager" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
          <PhotoCredit photo={photo} />
        </figure>
      </div>
    </section>
  );
}
