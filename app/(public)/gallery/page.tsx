import { MasonryGrid } from "@/components/gallery/masonry-grid";
import { listGalleryImages } from "@/lib/db";

const fallbackImages = [
  { id: "1", imageUrl: "/legacy-assets/Scouts.webp", altText: "Scouts" },
  { id: "2", imageUrl: "/legacy-assets/mdd.webp", altText: "Music Dance and Drama" },
  { id: "3", imageUrl: "/legacy-assets/sports.webp", altText: "Sports" },
  { id: "4", imageUrl: "/legacy-assets/sports2.webp", altText: "Sports activities" },
  { id: "5", imageUrl: "/legacy-assets/Director.webp", altText: "School leadership" },
  { id: "6", imageUrl: "/legacy-assets/DOS.webp", altText: "Director of Studies" }
];

export default async function GalleryPage() {
  const dbImages = await listGalleryImages();

  const images = dbImages.length > 0 ? dbImages : fallbackImages;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
      <h1 className="text-3xl font-extrabold text-brand-navy md:text-4xl">Our School Gallery</h1>
      <p className="mt-3 text-slate-600">Capturing moments of learning, joy, and growth.</p>
      <div className="mt-8">
        <MasonryGrid images={images} />
      </div>
    </section>
  );
}
