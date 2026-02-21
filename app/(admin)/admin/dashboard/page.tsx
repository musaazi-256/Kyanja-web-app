import { countAdmissions, countGalleryImages } from "@/lib/db";

export default async function AdminDashboardPage() {
  const [pendingAdmissions, totalAdmissions, totalGalleryImages] = await Promise.all([
    countAdmissions("pending"),
    countAdmissions(),
    countGalleryImages()
  ]);

  const stats = [
    { label: "Pending Admissions", value: pendingAdmissions },
    { label: "Total Admissions", value: totalAdmissions },
    { label: "Gallery Images", value: totalGalleryImages }
  ];

  return (
    <section>
      <h1 className="text-2xl font-extrabold text-brand-navy">Dashboard</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-2xl border border-slate-200 p-5">
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-extrabold text-brand-navy">{stat.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
