import Link from "next/link";
import { listAdmissions } from "@/lib/db";

type AdmissionsPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function AdminAdmissionsPage({ searchParams }: AdmissionsPageProps) {
  const { status } = await searchParams;
  const activeStatus = status ?? "all";

  const admissions = await listAdmissions(status);

  return (
    <section>
      <h1 className="text-2xl font-extrabold text-brand-navy">Admissions Manager</h1>
      <p className="mt-2 text-sm text-slate-600">Review and track submitted admission applications.</p>
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        {["all", "pending", "approved", "rejected"].map((item) => (
          <Link
            key={item}
            href={item === "all" ? "/admin/admissions" : `/admin/admissions?status=${item}`}
            className={`rounded-full px-3 py-1.5 font-medium ${
              activeStatus === item ? "bg-brand-navy text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-4 py-3">Pupil</th>
              <th className="px-4 py-3">Parent</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {admissions.map((admission) => (
              <tr key={admission.id}>
                <td className="px-4 py-3 font-medium text-brand-navy">
                  {admission.surname} {admission.foreName}
                </td>
                <td className="px-4 py-3">{admission.parentName}</td>
                <td className="px-4 py-3">{admission.email}</td>
                <td className="px-4 py-3 capitalize">{admission.status}</td>
                <td className="px-4 py-3">{new Date(admission.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/admissions/${admission.id}`} className="font-semibold text-brand-navy">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
