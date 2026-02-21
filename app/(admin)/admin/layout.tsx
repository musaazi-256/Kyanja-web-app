import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-6 md:grid-cols-[260px_1fr] md:px-6">
      <AdminSidebar />
      <main className="rounded-3xl bg-white p-6 shadow-card md:p-8">{children}</main>
    </div>
  );
}
