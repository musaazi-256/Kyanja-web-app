import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { coreValues, educationPhilosophy, holisticActivities, identity, strategicAnchors } from "@/lib/content";

type HomeManagedContent = {
  hero: {
    title: string;
    subtitle: string;
    imageUrl: string;
    mobileImageUrl: string;
    badge: string;
  };
  philosophyImage: string;
  team: Array<{ name: string; role: string; image: string; description?: string }>;
  clubs: Array<{ title: string; description: string; image: string }>;
  bannerImage: string;
};

export function HomeContent({ managed }: { managed: HomeManagedContent }) {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 md:px-6 md:pt-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-card">
          <div className="absolute inset-0 md:hidden">
            <Image
              src={managed.hero.mobileImageUrl}
              alt={managed.hero.title}
              width={900}
              height={1200}
              className="absolute left-1/2 top-1/2 h-[1200px] w-[900px] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
              priority
              unoptimized
            />
          </div>
          <div className="absolute inset-0 hidden md:block">
            <Image
              src={managed.hero.imageUrl}
              alt={managed.hero.title}
              width={1700}
              height={900}
              className="absolute left-1/2 top-1/2 h-[900px] w-[1700px] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
              priority
              unoptimized
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/72 to-white/60 md:bg-gradient-to-r md:from-white/95 md:via-white/88 md:to-white/10" />
          <div className="relative grid min-h-[620px] items-center md:min-h-[470px] md:grid-cols-2">
            <div className="px-6 py-12 text-center sm:px-10 md:px-12 md:text-left">
              <p className="inline-flex rounded-full bg-brand-gold/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-navy">{managed.hero.badge}</p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-brand-navy md:text-6xl">{managed.hero.title}</h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-700 md:mx-0 md:text-lg">{managed.hero.subtitle}</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
                <Link href="/admission" className="rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white hover:bg-brand-navy/90">
                  Enroll Your Child Now
                </Link>
                <Link href="/contact" className="rounded-full border border-brand-navy px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-navy/5">
                  Contact Us
                </Link>
              </div>
            </div>
            <div aria-hidden className="hidden h-full md:block" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-6">
          <h2 className="text-3xl font-extrabold text-brand-navy md:text-4xl">Who We Are</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-slate-600">Raising a generation of confident, powerful, and godly leaders.</p>
        </div>
      </section>

      <section className="bg-brand-mist py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2 md:px-6">
          <article className="rounded-3xl bg-white p-7 shadow-card">
            <h3 className="text-2xl font-extrabold text-brand-navy">{identity.title}</h3>
            <p className="mt-3 text-slate-600">{identity.body}</p>
          </article>
          <article className="rounded-3xl bg-brand-navy p-7 text-white shadow-card">
            <h3 className="text-2xl font-extrabold text-brand-gold">Our Mission</h3>
            <p className="mt-3 text-blue-100">{identity.mission}</p>
            <h4 className="mt-5 text-lg font-bold text-brand-gold">Our Values</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {identity.values.map((value) => (
                <li key={value} className="flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  {value}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:px-6">
        <div>
          <h2 className="text-3xl font-extrabold text-brand-navy">{educationPhilosophy.title}</h2>
          <div className="mt-5 space-y-4 text-slate-700">
            {educationPhilosophy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] bg-slate-100 shadow-card">
          <Image src={managed.philosophyImage} alt="Education philosophy" fill className="object-cover" unoptimized />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-center text-3xl font-extrabold text-brand-navy">Our Strategic Anchors</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {strategicAnchors.map((anchor) => (
              <article key={anchor.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
                <h3 className="text-xl font-extrabold text-brand-navy">{anchor.title}</h3>
                {anchor.quote ? <p className="mt-2 text-sm italic text-slate-500">{anchor.quote}</p> : null}
                <p className="mt-2 text-sm text-slate-600">{anchor.intro}</p>
                <ul className="mt-3 space-y-1 text-sm text-slate-700">
                  {anchor.bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2 md:px-6">
          <div>
            <h2 className="text-3xl font-extrabold">Holistic Activities</h2>
            <p className="mt-4 text-blue-100">{holisticActivities.lead}</p>
            <div className="mt-6 rounded-2xl bg-white/10 p-5">
              <h3 className="font-bold text-brand-gold">Daily Schedule</h3>
              <p className="mt-2 text-sm text-blue-100">{holisticActivities.dailySchedule}</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold">Primary School Clubs</h3>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {holisticActivities.clubs.map((club) => (
                <span key={club} className="rounded-full bg-white/10 px-3 py-2">
                  {club}
                </span>
              ))}
            </div>
            <h4 className="mt-6 text-lg font-bold">Other Activities</h4>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              {holisticActivities.otherActivities.map((activity) => (
                <span key={activity} className="rounded-full bg-white px-3 py-1.5 font-semibold text-brand-navy">
                  {activity}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-center text-3xl font-extrabold text-brand-navy">Our Core Values</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">The principles that shape our learners and guide our community every day.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {coreValues.map((value) => (
              <article key={value.title} className="flex gap-4 rounded-3xl border border-slate-200 p-5 shadow-card">
                <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ backgroundColor: value.color }}>
                  <Image src={value.image} alt={`${value.title} icon`} width={24} height={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: value.color }}>
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{value.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-mist py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-center text-3xl font-extrabold text-brand-navy">Meet Our Team</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">A dedicated group of educators and staff committed to giving every child a great start.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {managed.team.map((member) => (
              <article key={member.name} className="rounded-3xl bg-white p-5 text-center shadow-card">
                <Image src={member.image} alt={member.name} width={180} height={180} className="mx-auto h-36 w-36 rounded-full object-cover" unoptimized />
                <h3 className="mt-4 font-bold text-brand-navy">{member.name}</h3>
                <p className="text-sm text-slate-600">{member.role}</p>
                {member.description ? <p className="mt-2 text-xs text-slate-500">{member.description}</p> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="mb-8 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-extrabold text-brand-navy">School Clubs</h2>
            <p className="text-slate-600">Discover our co-curricular activities.</p>
          </div>
          <Link href="/programs" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy">
            Explore Programs <ArrowRight size={16} />
          </Link>
        </div>
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 lg:grid lg:grid-cols-2 lg:overflow-visible">
          {managed.clubs.map((item) => (
            <article key={`${item.title}-${item.image}`} className="relative min-h-72 min-w-[85%] snap-center overflow-hidden rounded-3xl shadow-card sm:min-w-[48%] lg:min-w-0">
              <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-5 text-white">
                <h3 className="text-2xl font-extrabold">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-100">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <div className="overflow-hidden rounded-[2rem] bg-white shadow-card">
          <Image src={managed.bannerImage} alt="Admissions banner" width={1400} height={700} className="w-full object-cover" unoptimized />
        </div>
      </section>
    </>
  );
}
