"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryImageItem = {
  id: string;
  imageUrl: string;
  altText: string;
};

export function MasonryGrid({ images }: { images: GalleryImageItem[] }) {
  return (
    <div className="columns-1 gap-4 space-y-4 md:columns-2 lg:columns-3">
      {images.map((image) => (
        <div key={image.id} className="break-inside-avoid overflow-hidden rounded-2xl bg-slate-100 shadow-card">
          <LoadingImage src={image.imageUrl} alt={image.altText} />
        </div>
      ))}
    </div>
  );
}

function LoadingImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative min-h-52">
      {!loaded ? <div className="absolute inset-0 animate-pulse bg-slate-200" /> : null}
      <Image
        src={src}
        alt={alt}
        width={900}
        height={1200}
        className="h-auto w-full object-cover"
        onLoad={() => setLoaded(true)}
        unoptimized
      />
    </div>
  );
}
