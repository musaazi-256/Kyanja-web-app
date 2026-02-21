import Image from "next/image";

import { AdmissionForm } from "@/components/admission/admission-form";
import { getHomepageManagedContent } from "@/lib/managed-media";

export default async function AdmissionPage() {
  const managed = await getHomepageManagedContent();

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <h1 className="text-3xl font-extrabold text-brand-navy md:text-4xl">Admissions are ongoing — Enroll Your Child Today</h1>
      <p className="mt-3 text-slate-600">Complete all sections below to submit your child&apos;s application.</p>
      <div className="mt-6 overflow-hidden rounded-3xl shadow-card">
        <Image src={managed.bannerImage} alt="Admissions banner" width={1400} height={700} className="w-full object-cover" unoptimized />
      </div>
      <div className="mt-8">
        <AdmissionForm />
      </div>
    </section>
  );
}
