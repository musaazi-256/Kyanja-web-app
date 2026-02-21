import { addGalleryImageAction, deleteGalleryImageAction } from "@/app/(admin)/admin/gallery/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <section>
      <h1 className="text-2xl font-extrabold text-brand-navy">Gallery Manager</h1>

      <form action={addGalleryImageAction} className="mt-6 grid gap-3 rounded-2xl border border-slate-200 p-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Upload Image</label>
          <input name="imageFile" type="file" accept="image/*" className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Or Image URL</label>
          <input name="imageUrl" placeholder="https://..." className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" />
        </div>
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Alt Text</label>
          <input name="altText" placeholder="Children in class assembly" className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" required />
        </div>
        <button type="submit" className="w-fit rounded-xl bg-brand-navy px-4 py-2 text-sm font-medium text-white">
          Upload
        </button>
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {images.map((image) => (
          <article key={image.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="relative aspect-[4/3] w-full bg-slate-100">
              {/* Use native img so uploaded local files and external URLs both preview without domain config friction */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.imageUrl} alt={image.altText} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="space-y-3 p-4">
              <div>
                <p className="text-sm font-semibold text-brand-navy">{image.altText}</p>
                <p className="mt-1 truncate text-xs text-slate-500">{image.imageUrl}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">{image.createdAt.toLocaleDateString()}</p>
                <form action={deleteGalleryImageAction}>
                  <input type="hidden" name="id" value={image.id} />
                  <button type="submit" className="rounded-lg border border-red-300 px-3 py-2 text-xs font-medium text-red-700">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
