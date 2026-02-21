import { signOut } from "@/auth";

export function AdminSignOutButton() {
  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <form action={handleSignOut}>
      <button type="submit" className="w-full rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20">
        Sign Out
      </button>
    </form>
  );
}
