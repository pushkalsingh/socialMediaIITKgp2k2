import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CategoryCard } from "@/components/CategoryCard";
import { PersonCard } from "@/components/PersonCard";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim();

  if (query) {
    const results = await prisma.person.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { bio: { contains: query } },
        ],
      },
      orderBy: { name: "asc" },
      include: { category: true, addedBy: true },
    });

    return (
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
        <SearchBar defaultValue={query} />
        <h1 className="text-xl font-semibold mt-8 mb-4">
          {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
        </h1>
        <div className="grid sm:grid-cols-2 gap-4">
          {results.map((person) => (
            <div key={person.id}>
              <p className="text-xs text-neutral-500 mb-1">
                <Link href={`/category/${person.category.slug}`} className="hover:underline">
                  {person.category.icon} {person.category.name}
                </Link>
              </p>
              <PersonCard person={person} />
            </div>
          ))}
        </div>
        {results.length === 0 && (
          <p className="text-neutral-500">No one matches that search yet.</p>
        )}
      </div>
    );
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { people: true } } },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
      <div className="mb-8 sm:mb-10 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Who to follow, by topic</h1>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
          A free, community-editable directory of great YouTube, Instagram, Facebook,
          X, and TikTok accounts — organized by subject, curated by admins.
        </p>
        <div className="mt-6 max-w-md mx-auto">
          <SearchBar />
        </div>
      </div>

      <h2 className="font-semibold text-neutral-500 uppercase text-xs tracking-wide mb-3">
        Browse topics
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            slug={category.slug}
            name={category.name}
            description={category.description}
            icon={category.icon}
            count={category._count.people}
          />
        ))}
      </div>
    </div>
  );
}

function SearchBar({ defaultValue }: { defaultValue?: string }) {
  return (
    <form action="/" className="flex gap-2">
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search people or channels…"
        className="flex-1 min-w-0 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
      />
      <button
        type="submit"
        className="rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2.5 text-sm font-medium hover:opacity-90"
      >
        Search
      </button>
    </form>
  );
}
