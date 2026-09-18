import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PersonCard } from "@/components/PersonCard";
import { colorThemeFor } from "@/lib/colors";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      people: { orderBy: { name: "asc" }, include: { addedBy: true } },
    },
  });

  if (!category) notFound();

  const theme = colorThemeFor(category.name);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
      <Link
        href="/"
        className="-ml-1 inline-block px-1 py-2 text-sm text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        ← All topics
      </Link>

      <div className="mt-4 mb-8 flex items-start gap-4 animate-fade-in-up">
        <span className={`text-4xl shrink-0 h-16 w-16 rounded-2xl flex items-center justify-center ${theme.chip}`}>
          {category.icon ?? "📁"}
        </span>
        <div className="min-w-0">
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
          {category.people.map((person, index) => (
            <div
              key={person.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${Math.min(index * 40, 320)}ms` }}
            >
              <PersonCard person={person} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
