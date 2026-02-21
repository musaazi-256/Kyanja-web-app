import Image from "next/image";
import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-4 py-16 text-center md:px-6">
      <Image src="/legacy-assets/coming-soon-illustration.png" alt="Coming soon illustration" width={720} height={420} className="h-auto w-full max-w-2xl" />
      <h1 className="mt-4 text-4xl font-extrabold text-brand-navy">Coming Soon</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        This page is currently under construction. We&apos;re working hard to bring you something amazing — please check back soon.
      </p>
      <Link href="/" className="mt-7 rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white hover:bg-brand-navy/90">
        Back to Home
      </Link>
    </section>
  );
}
