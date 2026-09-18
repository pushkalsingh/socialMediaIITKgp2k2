import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteCategoryAction } from "@/lib/actions/categories";
import { getCurrentAdmin } from "@/lib/dal";

export default async function AdminCategoriesPage() {
  const [categories, admin] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { people: true } } },
    }),
    getCurrentAdmin(),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Topics</h1>
        <Link
          href="/admin/categories/new"
          className="rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          + Add topic
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xl">{category.icon ?? "📁"}</span>
              <div className="min-w-0">
                <p className="font-medium truncate">{category.name}</p>
                <p className="text-xs text-neutral-500 truncate">
                  /category/{category.slug} · {category._count.people} channel
                  {category._count.people === 1 ? "" : "s"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/admin/categories/${category.id}/edit`}
                className="text-sm px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                Edit
              </Link>
              {admin?.isSuperAdmin && (
                <form action={deleteCategoryAction}>
                  <input type="hidden" name="id" value={category.id} />
                  <DeleteButton disabled={category._count.people > 0} />
                </form>
              )}
            </div>
          </div>
        ))}
        {categories.length === 0 && (
          <p className="px-4 py-6 text-sm text-neutral-500">No topics yet.</p>
        )}
      </div>
    </div>
  );
}

function DeleteButton({ disabled }: { disabled: boolean }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      title={disabled ? "Move or delete its channels first" : "Delete topic"}
      className="text-sm px-3 py-2 rounded-md border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      Delete
    </button>
  );
}
