import { notFound } from "next/navigation";

import { getAdmissionById } from "@/lib/db";

type AdmissionDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdmissionDetailPage({ params }: AdmissionDetailPageProps) {
  const { id } = await params;

  const admission = await getAdmissionById(id);

  if (!admission) {
    notFound();
  }

  const schools = admission.previousSchools;

  return (
    <section>
      <h1 className="text-2xl font-extrabold text-brand-navy">Admission Details</h1>
      <div className="mt-6 grid gap-4 rounded-2xl border border-slate-200 p-5 md:grid-cols-2">
        <Field label="Pupil Name" value={`${admission.surname} ${admission.foreName}`} />
        <Field label="Date of Birth" value={new Date(admission.dateOfBirth).toLocaleDateString()} />
        <Field label="Religious Belief" value={admission.religiousBelief} />
        <Field label="Parent / Guardian" value={admission.parentName} />
        <Field label="Email" value={admission.email} />
        <Field label="Tel (Home)" value={admission.telHome} />
        <Field label="Tel (Office)" value={admission.telOffice || "-"} />
        <Field label="Residence" value={admission.residence} />
        <Field label="Occupation" value={admission.occupation} />
        <Field label="NIN" value={admission.nin} />
        <Field label="Next of Kin" value={admission.nextOfKin} />
        <Field label="Status" value={admission.status} />
        <Field label="Vaccinations" value={[admission.vaccinationPolio && "Polio", admission.vaccinationTyphoid && "Typhoid", admission.vaccinationMeasles && "Measles"].filter(Boolean).join(", ") || "None"} />
        <Field label="Other Health Notes" value={admission.healthOthers || "-"} />
        <Field label="Digital Signature" value={admission.digitalSignature} />
        <Field label="Signed Date" value={new Date(admission.signedDate).toLocaleDateString()} />
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 p-5">
        <h2 className="text-lg font-bold text-brand-navy">Previous Schools</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          {schools.length > 0 ? (
            schools.map((school, index) => {
              if (!school || typeof school !== "object") {
                return null;
              }

              return (
                <li key={`${school.name || "school"}-${index}`}>
                  {school.name || "Unknown"}: {school.since || "?"} - {school.to || "?"}
                </li>
              );
            })
          ) : (
            <li>No previous school records.</li>
          )}
        </ul>
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}
