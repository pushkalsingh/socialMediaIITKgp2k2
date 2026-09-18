import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePersonAction, deletePersonAction } from "@/lib/actions/people";
import { getCurrentAdmin } from "@/lib/dal";
import { PersonForm } from "../../PersonForm";

export default async function EditPersonPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const [person, categories, admin] = await Promise.all([
    prisma.person.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    getCurrentAdmin(),
  ]);

  if (!person) notFound();

  const boundAction = updatePersonAction.bind(null, id);

  return (
    <div className="max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit channel</h1>
        {admin?.isSuperAdmin && (
          <form action={deletePersonAction}>
            <input type="hidden" name="id" value={person.id} />
            <button
              type="submit"
              className="text-sm px-3 py-2 rounded-md border border-red-200 text-red-600 transition-all duration-150 hover:bg-red-50 hover:shadow-sm active:scale-95 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
            >
              Delete
            </button>
          </form>
        )}
      </div>
      <PersonForm
        action={boundAction}
        error={error}
        submitLabel="Save changes"
        categories={categories}
        defaultValues={person}
        showVerified
      />
    </div>
  );
}
