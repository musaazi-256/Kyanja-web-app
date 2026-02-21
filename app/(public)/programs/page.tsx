import Image from "next/image";

import { getHomepageManagedContent } from "@/lib/managed-media";
import { resources } from "@/lib/content";

export default async function ProgramsPage() {
  const managed = await getHomepageManagedContent();

  return (
    <>
      <section className="bg-brand-navy py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center md:px-6">
          <h1 className="text-4xl font-extrabold md:text-5xl">School Programs</h1>
          <p className="mx-auto mt-4 max-w-3xl text-blue-100">
            Learning goes beyond the classroom. We develop talents and life skills through a vibrant co-curricular program tailored for nurturing the whole child.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 className="text-3xl font-extrabold text-brand-navy">Co-curricular Activities</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {managed.clubs.map((item) => (
            <article key={`${item.title}-${item.image}`} className="relative min-h-72 overflow-hidden rounded-3xl shadow-card">
              <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <h3 className="text-2xl font-extrabold">{item.title}</h3>
                <p className="mt-1 text-sm">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-brand-mist py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-3xl font-extrabold text-brand-navy">Resources & Downloads</h2>
          <p className="mt-2 text-slate-600">Search, filter, and download admission forms, circulars, and timetables.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {resources.map((item) => (
              <article key={item.title} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
                <Image src={item.icon} alt={item.title} width={34} height={34} />
                <div>
                  <h3 className="font-semibold text-brand-navy">{item.title}</h3>
                  <p className="text-xs uppercase tracking-wide text-slate-500">{item.type}</p>
                </div>
                <span className="ml-auto rounded-full bg-brand-navy/10 px-3 py-1 text-xs font-semibold capitalize text-brand-navy">{item.category}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
