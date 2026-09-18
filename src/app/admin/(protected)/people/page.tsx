import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePersonAction } from "@/lib/actions/people";

export default async function AdminPeoplePage() {
  const people = await prisma.person.findMany({
    orderBy: [{ category: { name: "asc" } }, { name: "asc" }],
    include: { category: true, addedBy: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Channels</h1>
        <Link
          href="/admin/people/new"
          className="rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          + Add channel
        </Link>
      </div>

      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
        {people.map((person) => (
          <div key={person.id} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="font-medium truncate">
                {person.name}
                {person.verified && (
                  <span className="ml-1.5 text-blue-500" title="Links verified">
                    ✓
                  </span>
                )}
              </p>
              <p className="text-xs text-neutral-500 truncate">
                {person.category.icon} {person.category.name} · /person/{person.slug}
                {person.addedBy && ` · added by ${person.addedBy.name}`}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/admin/people/${person.id}/edit`}
                className="text-sm px-3 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                Edit
              </Link>
              <form action={deletePersonAction}>
                <input type="hidden" name="id" value={person.id} />
                <button
                  type="submit"
                  className="text-sm px-3 py-2 rounded-md border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
        {people.length === 0 && (
          <p className="px-4 py-6 text-sm text-neutral-500">No channels yet.</p>
        )}
      </div>
    </div>
  );
}
