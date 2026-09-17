import { prisma } from "@/lib/prisma";
import { createPersonAction } from "@/lib/actions/people";
import { PersonForm } from "../PersonForm";

export default async function NewPersonPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; categoryId?: string }>;
}) {
  const { error, categoryId } = await searchParams;
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Add a channel to follow</h1>
      <PersonForm
        action={createPersonAction}
        error={error}
        submitLabel="Add channel"
        categories={categories}
        defaultValues={
          categoryId
            ? {
                name: "",
                bio: "",
                categoryId,
                avatarUrl: null,
                youtubeUrl: null,
                instagramUrl: null,
                facebookUrl: null,
                xUrl: null,
                tiktokUrl: null,
                websiteUrl: null,
              }
            : undefined
        }
      />
    </div>
  );
}
