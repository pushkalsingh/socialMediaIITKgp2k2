import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateCategoryAction } from "@/lib/actions/categories";
import { CategoryForm } from "../../CategoryForm";

export default async function EditCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;

  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) notFound();

  const boundAction = updateCategoryAction.bind(null, id);

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Edit topic</h1>
      <CategoryForm
        action={boundAction}
        error={error}
        submitLabel="Save changes"
        defaultValues={category}
      />
    </div>
  );
}
