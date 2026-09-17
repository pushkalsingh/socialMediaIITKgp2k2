import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PersonCard } from "@/components/PersonCard";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: { people: { orderBy: { name: "asc" } } },
  });

  if (!category) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link href="/" className="text-sm text-neutral-500 hover:underline">
        ← All topics
      </Link>

      <div className="mt-4 mb-8 flex items-start gap-4">
        <span className="text-4xl">{category.icon ?? "📁"}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            {category.description}
          </p>
        </div>
      </div>

      {category.people.length === 0 ? (
        <p className="text-neutral-500">
          No one has been added to this topic yet.{" "}
          <Link href="/admin/login" className="underline">
            Log in as admin
          </Link>{" "}
          to add the first channel.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {category.people.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      )}
    </div>
  );
}
