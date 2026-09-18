import { createCategoryAction } from "@/lib/actions/categories";
import { DailyQuotaNote } from "@/components/DailyQuotaNote";
import { CategoryForm } from "../CategoryForm";

export default async function NewCategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-1">Add a topic</h1>
      <DailyQuotaNote />
      <CategoryForm action={createCategoryAction} error={error} submitLabel="Create topic" />
    </div>
  );
}
