import { Mail, MapPin, PhoneCall } from "lucide-react";

import { contacts } from "@/lib/content";

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 md:px-6">
      <h1 className="text-4xl font-extrabold text-brand-navy">Contact Us</h1>
      <p className="mt-3 text-slate-600">Reach us for admissions, circulars, events, and general school inquiries.</p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <Mail className="text-brand-gold" />
          <h2 className="mt-3 font-bold text-brand-navy">Email</h2>
          <p className="mt-1 text-sm text-slate-600">{contacts.email}</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <PhoneCall className="text-brand-gold" />
          <h2 className="mt-3 font-bold text-brand-navy">Phone</h2>
          <p className="mt-1 text-sm text-slate-600">{contacts.phones.join(" | ")}</p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
          <MapPin className="text-brand-gold" />
          <h2 className="mt-3 font-bold text-brand-navy">Location</h2>
          <p className="mt-1 text-sm text-slate-600">{contacts.location}</p>
        </article>
      </div>
    </section>
  );
}
