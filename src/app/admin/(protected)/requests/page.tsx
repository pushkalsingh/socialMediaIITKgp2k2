import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/dal";
import { approveAdminAction, rejectAdminAction, revokeAdminAction } from "@/lib/actions/auth";

export default async function RequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  if (!admin.isSuperAdmin) redirect("/admin");

  const { error } = await searchParams;

  const [pending, everyone] = await Promise.all([
    prisma.admin.findMany({ where: { status: "PENDING" }, orderBy: { createdAt: "asc" } }),
    prisma.admin.findMany({ orderBy: { createdAt: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Access requests</h1>
      <p className="text-sm text-neutral-500 mb-6">
        Review identification numbers and approve or reject admin access.
      </p>

      {error && (
        <p className="mb-4 rounded-md bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 text-sm px-3 py-2">
          {error}
        </p>
      )}

      <h2 className="font-semibold mb-3">
        Pending ({pending.length})
      </h2>
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden mb-10">
        {pending.map((request) => (
          <div key={request.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="font-medium truncate">{request.name}</p>
              <p className="text-xs text-neutral-500 truncate">
                {request.email} · ID {request.identificationNumber ?? "—"}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <form action={approveAdminAction}>
                <input type="hidden" name="id" value={request.id} />
                <button
                  type="submit"
                  className="text-sm px-3 py-2 rounded-md border border-green-200 text-green-700 transition-all duration-150 hover:bg-green-50 hover:shadow-sm active:scale-95 dark:border-green-900 dark:text-green-400 dark:hover:bg-green-950"
                >
                  Approve
                </button>
              </form>
              <form action={rejectAdminAction}>
                <input type="hidden" name="id" value={request.id} />
                <button
                  type="submit"
                  className="text-sm px-3 py-2 rounded-md border border-red-200 text-red-600 transition-all duration-150 hover:bg-red-50 hover:shadow-sm active:scale-95 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                >
                  Reject
                </button>
              </form>
            </div>
          </div>
        ))}
        {pending.length === 0 && (
          <p className="px-4 py-6 text-sm text-neutral-500">No pending requests.</p>
        )}
      </div>

      <h2 className="font-semibold mb-3">All admins</h2>
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
        {everyone.map((record) => (
          <div key={record.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="font-medium truncate">
                {record.name}
                {record.isSuperAdmin && (
                  <span className="ml-1.5 text-xs uppercase tracking-wide text-indigo-500">
                    Super admin
                  </span>
                )}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {record.email}
                {record.identificationNumber && ` · ID ${record.identificationNumber}`}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <StatusBadge status={record.status} />
              {record.id !== admin.id && record.status === "APPROVED" && (
                <form action={revokeAdminAction}>
                  <input type="hidden" name="id" value={record.id} />
                  <button
                    type="submit"
                    className="text-sm px-3 py-2 rounded-md border border-red-200 text-red-600 transition-all duration-150 hover:bg-red-50 hover:shadow-sm active:scale-95 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                  >
                    Revoke
                  </button>
                </form>
              )}
              {record.id !== admin.id && record.status !== "APPROVED" && (
                <form action={approveAdminAction}>
                  <input type="hidden" name="id" value={record.id} />
                  <button
                    type="submit"
                    className="text-sm px-3 py-2 rounded-md border border-green-200 text-green-700 transition-all duration-150 hover:bg-green-50 hover:shadow-sm active:scale-95 dark:border-green-900 dark:text-green-400 dark:hover:bg-green-950"
                  >
                    Approve
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: "PENDING" | "APPROVED" | "REJECTED" }) {
  const styles = {
    PENDING: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
    APPROVED: "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400",
    REJECTED: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
  }[status];

  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles}`}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
