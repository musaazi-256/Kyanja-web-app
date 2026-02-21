import Link from "next/link";
import { BarChart3, ImageUp, Images, Inbox } from "lucide-react";

import { AdminSignOutButton } from "@/components/admin/sign-out-button";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/admissions", label: "Admissions", icon: Inbox },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
  { href: "/admin/photos", label: "Photo Manager", icon: ImageUp }
];

export function AdminSidebar() {
  return (
    <aside className="flex h-full w-full flex-col rounded-3xl bg-brand-navy p-6 text-white md:w-64">
      <h2 className="text-lg font-bold">KJS Admin</h2>
      <nav className="mt-8 space-y-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition hover:bg-white/10">
            <link.icon size={16} />
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <AdminSignOutButton />
      </div>
    </aside>
  );
}
