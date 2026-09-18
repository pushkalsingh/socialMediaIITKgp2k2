import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/dal";
import { prisma } from "@/lib/prisma";
import { logoutAction } from "@/lib/actions/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const pendingCount = admin.isSuperAdmin
    ? await prisma.admin.count({ where: { status: "PENDING" } })
    : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <nav className="flex flex-wrap gap-1 text-sm">
          <AdminNavLink href="/admin">Dashboard</AdminNavLink>
          <AdminNavLink href="/admin/categories">Topics</AdminNavLink>
          <AdminNavLink href="/admin/people">Channels</AdminNavLink>
          {admin.isSuperAdmin && (
            <AdminNavLink href="/admin/requests">
              Requests
              {pendingCount > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full bg-red-600 text-white text-xs">
                  {pendingCount}
                </span>
              )}
            </AdminNavLink>
          )}
          <AdminNavLink href="/admin/account">Account</AdminNavLink>
        </nav>
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <span>
            {admin.name}
            {admin.isSuperAdmin && (
              <span className="ml-1.5 text-xs uppercase tracking-wide text-blue-500">
                Super admin
              </span>
            )}
          </span>
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
      className="px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 inline-flex items-center"
    >
      {children}
    </Link>
  );
}
