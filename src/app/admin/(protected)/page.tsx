import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/dal";

export default async function AdminDashboard() {
  const admin = await getCurrentAdmin();

  const [categoryCount, personCount, unverifiedCount, pendingCount] = await Promise.all([
    prisma.category.count(),
    prisma.person.count(),
    prisma.person.count({ where: { verified: false } }),
    admin?.isSuperAdmin ? prisma.admin.count({ where: { status: "PENDING" } }) : Promise.resolve(0),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Topics" value={categoryCount} />
        <StatCard label="Channels" value={personCount} />
        <StatCard label="Unverified links" value={unverifiedCount} />
      </div>

      {admin?.isSuperAdmin && pendingCount > 0 && (
        <p className="mb-6 text-sm">
          {pendingCount} admin access request{pendingCount === 1 ? "" : "s"} awaiting your
          review.{" "}
          <Link href="/admin/requests" className="underline font-medium">
            Review requests
          </Link>
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/categories/new"
          className="rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          + Add a topic
        </Link>
        <Link
          href="/admin/people/new"
          className="rounded-lg border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900"
        >
          + Add a channel to follow
        </Link>
      </div>

      {unverifiedCount > 0 && (
        <p className="mt-6 text-sm text-neutral-500">
          {unverifiedCount} channel{unverifiedCount === 1 ? "" : "s"} still need their links
          double-checked.{" "}
          <Link href="/admin/people" className="underline">
            Review them
          </Link>
          .
        </p>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-5">
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-neutral-500 mt-1">{label}</p>
    </div>
  );
}
