import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
      <div>
        <p className="mb-4 inline-flex rounded-full bg-brand-gold/20 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-navy">
          Where bright futures begin
        </p>
        <h1 className="text-4xl font-extrabold leading-tight text-brand-navy md:text-5xl">Unlock Your Child&apos;s Potential</h1>
        <p className="mt-5 max-w-xl text-base text-slate-600 md:text-lg">
          At Kyanja Junior School, we combine academic excellence, creativity, and character-building to shape joyful lifelong learners.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/admission" className="rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-navy/90">
            Start Admission
          </Link>
          <Link href="/gallery" className="rounded-full border border-brand-navy px-6 py-3 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy/5">
            Explore Gallery
          </Link>
        </div>
      </div>

      <div className="relative mx-auto h-[350px] w-full max-w-md">
        <div className="absolute -right-2 top-0 h-20 w-20 rounded-full bg-brand-gold/30" />
        <div className="absolute -left-6 bottom-8 h-28 w-28 rounded-3xl bg-brand-navy/10" />

        <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-card">
          <Image
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80"
            alt="Happy pupils learning"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
