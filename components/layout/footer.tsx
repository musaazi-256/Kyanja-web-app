import Image from "next/image";
import Link from "next/link";

import { contacts } from "@/lib/content";

const socials = [
  { href: "#", icon: "/legacy-assets/facebook.svg", name: "Facebook" },
  { href: "#", icon: "/legacy-assets/instagram.svg", name: "Instagram" },
  { href: "#", icon: "/legacy-assets/tiktok.svg", name: "TikTok" },
  { href: "#", icon: "/legacy-assets/twitter-x.svg", name: "X" },
  { href: "https://wa.me/256772493267", icon: "/legacy-assets/whatsapp.svg", name: "WhatsApp" },
  { href: "https://www.youtube.com/@KyanjaJuniorSchool", icon: "/legacy-assets/youtube.svg", name: "YouTube" }
];

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image src="/legacy-assets/logo.svg" alt="Kyanja Junior School" width={42} height={42} className="rounded bg-white p-1" />
            <span className="text-lg font-extrabold">Kyanja Junior School</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-blue-100">
            A caring school community focused on academic excellence, character formation and holistic development.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-blue-100">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/programs">Programs</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/admission">Admission</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Contact</h3>
          <div className="mt-4 space-y-3 text-sm text-blue-100">
            <div className="flex gap-2">
              <Image src="/legacy-assets/email-icon.svg" alt="Email" width={18} height={18} />
              <span>{contacts.email}</span>
            </div>
            <p>{contacts.phones.join(" | ")}</p>
            <div className="flex gap-2">
              <Image src="/legacy-assets/location-icon.svg" alt="Location" width={18} height={18} />
              <span>{contacts.location}</span>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {socials.map((social) => (
              <a key={social.name} href={social.href} className="grid h-9 w-9 place-items-center rounded-full bg-white p-2" aria-label={social.name}>
                <Image src={social.icon} alt={social.name} width={18} height={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm text-blue-100">© {new Date().getFullYear()} Kyanja Junior School. All rights reserved.</div>
    </footer>
  );
}
