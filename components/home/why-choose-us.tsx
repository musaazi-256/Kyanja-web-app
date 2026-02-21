import { BookOpen, HeartHandshake, Trophy } from "lucide-react";

const features = [
  {
    title: "Academic Foundation",
    description: "Strong literacy, numeracy, and critical-thinking programs tailored for young learners.",
    icon: BookOpen
  },
  {
    title: "Holistic Nurturing",
    description: "We grow character, confidence, and social-emotional skills in a safe and joyful environment.",
    icon: HeartHandshake
  },
  {
    title: "Co-curricular Excellence",
    description: "Sports, music, and arts enrich every child and unlock their unique talents.",
    icon: Trophy
  }
];

export function WhyChooseUs() {
  return (
    <section className="bg-brand-mist py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="text-center text-3xl font-extrabold text-brand-navy md:text-4xl">Why Choose Us</h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-600">
          We partner with families to build confident, curious, and compassionate children.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl bg-white p-6 shadow-card transition hover:-translate-y-1">
              <feature.icon className="h-8 w-8 text-brand-gold" />
              <h3 className="mt-4 text-lg font-bold text-brand-navy">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
