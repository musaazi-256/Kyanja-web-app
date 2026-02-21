import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { loginAction } from "@/app/login/actions";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/admin/dashboard");
  }

  return (
    <section className="mx-auto flex min-h-screen max-w-md items-center px-4">
      <div className="w-full rounded-3xl bg-white p-8 shadow-card">
        <h1 className="text-2xl font-extrabold text-brand-navy">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in to manage admissions and gallery content.</p>

        <form action={loginAction} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
            <input name="email" type="email" required className="w-full rounded-xl border border-slate-300 p-3 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
            <input name="password" type="password" required className="w-full rounded-xl border border-slate-300 p-3 text-sm" />
          </div>
          <button type="submit" className="w-full rounded-xl bg-brand-navy py-3 text-sm font-semibold text-white">
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}
