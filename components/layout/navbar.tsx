import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/programs", label: "School Programs" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/legacy-assets/logo.svg" alt="Kyanja Junior School" width={40} height={40} className="rounded-md bg-white p-1" />
          <span className="text-sm font-extrabold text-brand-navy md:text-base">Kyanja Junior School</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700 transition hover:text-brand-navy">
              {item.label}
            </Link>
          ))}
          <Link href="/admission" className="rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-navy transition hover:brightness-95">
            Admission
          </Link>
        </nav>

        <details className="relative md:hidden">
          <summary className="list-none rounded-lg border border-slate-200 p-2 text-slate-700 marker:content-none">
            <Menu size={20} />
          </summary>
          <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700">
                  {item.label}
                </Link>
              ))}
              <Link href="/admission" className="w-fit rounded-full bg-brand-gold px-5 py-2.5 text-sm font-semibold text-brand-navy">
                Admission
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
