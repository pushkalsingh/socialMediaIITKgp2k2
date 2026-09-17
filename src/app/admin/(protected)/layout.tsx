import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { logoutAction } from "@/lib/actions/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <nav className="flex flex-wrap gap-1 text-sm">
          <AdminNavLink href="/admin">Dashboard</AdminNavLink>
          <AdminNavLink href="/admin/categories">Topics</AdminNavLink>
          <AdminNavLink href="/admin/people">Channels</AdminNavLink>
          <AdminNavLink href="/admin/account">Account</AdminNavLink>
        </nav>
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <span>{session.name}</span>
          <form action={logoutAction}>
            <button type="submit" className="hover:underline">
              Log out
            </button>
          </form>
        </div>
      </div>
      {children}
    </div>
  );
}

function AdminNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900"
    >
      {children}
    </Link>
  );
}
