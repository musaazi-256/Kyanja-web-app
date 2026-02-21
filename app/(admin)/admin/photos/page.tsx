import Link from "next/link";

import { addManagedImageAction, deleteManagedImageAction, updateManagedImageAction } from "@/app/(admin)/admin/photos/actions";
import { listManagedImages, mediaSections, type MediaSection } from "@/lib/db";

const sections = [
  { key: "HERO", label: "Hero Image" },
  { key: "PHILOSOPHY", label: "Philosophy Image" },
  { key: "TEAM", label: "Our Team" },
  { key: "SCHOOL_CLUBS", label: "School Clubs" },
  { key: "ADS_BANNER", label: "Ads Banner" }
] as const;
type SectionKey = (typeof sections)[number]["key"];

type AdminPhotosPageProps = {
  searchParams: Promise<{ section?: string }>;
};

export default async function AdminPhotosPage({ searchParams }: AdminPhotosPageProps) {
  const { section } = await searchParams;
  const isValidSection = mediaSections.some((item) => item === section);
  const activeSection: SectionKey = isValidSection ? (section as MediaSection) : "HERO";

  const images = await listManagedImages(activeSection);

  return (
    <section>
      <h1 className="text-2xl font-extrabold text-brand-navy">Photo Management</h1>
      <p className="mt-2 text-sm text-slate-600">Manage front-end images and the display details (name, role, description) by section.</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {sections.map((item) => (
          <Link
            key={item.key}
            href={`/admin/photos?section=${item.key}`}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              activeSection === item.key ? "bg-brand-navy text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <form action={addManagedImageAction} className="mt-6 grid gap-4 rounded-2xl border border-slate-200 p-5 md:grid-cols-2">
        <input type="hidden" name="section" value={activeSection} />
        {activeSection === "HERO" ? (
          <p className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600 md:col-span-2">
            You can upload Desktop only, Mobile only, or both at once.
            Recommended sizes:
            Desktop 1700x900 (WebP/JPG),
            Mobile 900x1200 (WebP/JPG).
          </p>
        ) : null}

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Desktop Image</label>
          <input name="imageFile" type="file" accept="image/*" className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Desktop Image URL</label>
          <input name="imageUrl" placeholder="https://..." className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Mobile Image</label>
          <input name="mobileImageFile" type="file" accept="image/*" className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Mobile Image URL</label>
          <input name="mobileImageUrl" placeholder="https://..." className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Name / Title</label>
          <input name="title" required className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Subtitle / Role</label>
          <input name="subtitle" className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Description</label>
          <textarea name="description" rows={3} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500">Sort Order</label>
          <input name="sortOrder" type="number" defaultValue={0} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm" />
        </div>

        <label className="mt-6 inline-flex items-center gap-2 text-sm text-slate-700">
          <input name="isActive" type="checkbox" defaultChecked className="h-4 w-4" />
          Active on front-end
        </label>

        <button type="submit" className="w-fit rounded-xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white">
          Save in {sections.find((item) => item.key === activeSection)?.label}
        </button>
      </form>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {images.map((image) => (
          <article key={image.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="relative aspect-[4/3] w-full bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image.imageUrl || "/legacy-assets/coming-soon-illustration.png"} alt={image.title} className="h-full w-full object-cover" loading="lazy" />
            </div>
            <div className="space-y-2 p-4">
              <p className="text-sm font-semibold text-brand-navy">{image.title}</p>
              {image.subtitle ? <p className="text-xs text-slate-600">{image.subtitle}</p> : null}
              {image.description ? <p className="line-clamp-2 text-xs text-slate-500">{image.description}</p> : null}
              <p className="text-xs text-slate-500">Order: {image.sortOrder} | {image.isActive ? "Active" : "Hidden"}</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-slate-200 p-2">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">Desktop</p>
                  <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={(image.imageUrl as string) || "/legacy-assets/coming-soon-illustration.png"} alt={`${image.title} desktop`} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className="rounded-lg border border-slate-200 p-2">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">Mobile</p>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image.mobileImageUrl || (image.imageUrl as string) || "/legacy-assets/coming-soon-illustration.png"}
                      alt={`${image.title} mobile`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <details className="rounded-xl border border-slate-200 p-3">
                <summary className="cursor-pointer text-xs font-semibold text-brand-navy">Edit</summary>
                <form action={updateManagedImageAction} className="mt-3 grid gap-2">
                  <input type="hidden" name="id" value={image.id} />
                  <input type="hidden" name="section" value={activeSection} />
                  <input
                    name="title"
                    defaultValue={image.title}
                    placeholder="Name / Title"
                    className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs"
                    required
                  />
                  <input name="subtitle" defaultValue={image.subtitle || ""} placeholder="Subtitle / Role" className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs" />
                  <textarea name="description" defaultValue={image.description || ""} rows={2} placeholder="Description" className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs" />
                  <input
                    name="sortOrder"
                    type="number"
                    defaultValue={image.sortOrder}
                    className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs"
                  />
                  <input name="imageUrl" defaultValue={image.imageUrl || ""} placeholder="Desktop image URL (optional)" className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs" />
                  <input name="imageFile" type="file" accept="image/*" className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs" />
                  <input
                    name="mobileImageUrl"
                    defaultValue={image.mobileImageUrl || ""}
                    placeholder="Mobile image URL (optional)"
                    className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs"
                  />
                  <input name="mobileImageFile" type="file" accept="image/*" className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs" />
                  <label className="inline-flex items-center gap-2 text-xs text-slate-700">
                    <input name="isActive" type="checkbox" defaultChecked={image.isActive} className="h-3.5 w-3.5" />
                    Active on front-end
                  </label>
                  <button type="submit" className="w-fit rounded-lg bg-brand-navy px-3 py-2 text-xs font-semibold text-white">
                    Update
                  </button>
                </form>
              </details>
              <form action={deleteManagedImageAction}>
                <input type="hidden" name="id" value={image.id} />
                <button type="submit" className="rounded-lg border border-red-300 px-3 py-2 text-xs font-medium text-red-700">
                  Delete
                </button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
