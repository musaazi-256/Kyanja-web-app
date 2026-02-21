import Image from "next/image";

import { getHomepageManagedContent } from "@/lib/managed-media";

const aboutContent = {
  title: "Who We Are",
  subtitle: "Nurturing treasure, building character, and inspiring excellence.",
  identity:
    "A model school of academic excellence and character development, raising future leaders who fear God and serve their community.",
  mission:
    "To produce a well-rounded learner who is spiritual, moral, social, focused, holistic, and self-reliant.",
  values: ["Faith & Community", "Excellence", "Responsibility", "Resilience"],
  philosophy: [
    "We believe that Education is a Treasure. At Kyanja Junior School, we don't just teach the mind; we nurture the heart.",
    "We provide a safe and supportive learning environment where academic rigour meets moral discipline. We believe every child has hidden potential waiting to be unlocked.",
    "Our responsibility is to guide each child toward self-reliance, ensuring they leave us not just as students, but as principled leaders ready to impact their world."
  ],
  pillars: [
    {
      title: "1. Spiritual",
      points: ["The fear of God", "Moral Integrity", "Prayer & Fellowship"]
    },
    {
      title: "2. Social",
      points: ["Self-reliance", "Social responsibility", "Respect for peers and elders"]
    },
    {
      title: "3. Academic",
      points: ["High Academic Standards", "Critical Thinking", "Individualised Attention", "Digital Literacy (ICT)", "Talent Development"]
    }
  ]
};

export default async function AboutPage() {
  const managed = await getHomepageManagedContent();

  return (
    <>
      <section className="bg-brand-navy py-16 text-white">
        <div className="mx-auto max-w-5xl px-4 text-center md:px-6">
          <h1 className="text-4xl font-extrabold md:text-5xl">{aboutContent.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-blue-100">{aboutContent.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-card">
            <h2 className="text-2xl font-extrabold text-brand-navy">Our Identity</h2>
            <p className="mt-3 text-slate-600">{aboutContent.identity}</p>
          </article>
          <article className="rounded-3xl bg-brand-navy p-7 text-white shadow-card">
            <h2 className="text-2xl font-extrabold text-brand-gold">Our Mission</h2>
            <p className="mt-3 text-blue-100">{aboutContent.mission}</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
              {aboutContent.values.map((value) => (
                <li key={value} className="rounded-full bg-white/10 px-3 py-1.5 text-center">
                  {value}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 md:grid-cols-2 md:px-6">
        <div>
          <h2 className="text-3xl font-extrabold text-brand-navy">Our Education Philosophy</h2>
          <div className="mt-4 space-y-3 text-slate-700">
            {aboutContent.philosophy.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
        <div className="relative min-h-[340px] overflow-hidden rounded-[2rem] shadow-card">
          <Image src={managed.philosophyImage} alt="Student learning" fill className="object-cover" unoptimized />
        </div>
      </section>

      <section className="bg-brand-mist py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-center text-3xl font-extrabold text-brand-navy">Our Strategic Pillars</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {aboutContent.pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-3xl bg-white p-6 shadow-card">
                <h3 className="text-xl font-bold text-brand-navy">{pillar.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {pillar.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 className="text-center text-3xl font-extrabold text-brand-navy">Our Administrative Team</h2>
        <p className="mt-3 text-center text-slate-600">The servant leaders guiding our vision.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {managed.team.map((member) => (
            <article key={member.name} className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-card">
              <Image src={member.image} alt={member.name} width={180} height={180} className="mx-auto h-36 w-36 rounded-full object-cover" unoptimized />
              <h3 className="mt-4 font-bold text-brand-navy">{member.name}</h3>
              <p className="text-sm text-slate-600">{member.role}</p>
              {member.description ? <p className="mt-2 text-xs text-slate-500">{member.description}</p> : null}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
