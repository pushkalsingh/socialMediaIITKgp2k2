import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { CategoryCard } from "@/components/CategoryCard";
import { PersonCard } from "@/components/PersonCard";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim();

  if (query) {
    const [matchingCategories, matchingPeople] = await Promise.all([
      prisma.category.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        orderBy: { name: "asc" },
        include: { _count: { select: { people: true } } },
      }),
      prisma.person.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { bio: { contains: query, mode: "insensitive" } },
          ],
        },
        orderBy: { name: "asc" },
        include: { category: true, addedBy: true },
      }),
    ]);

    const totalResults = matchingCategories.length + matchingPeople.length;

    return (
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
        <SearchAutocomplete defaultValue={query} />
        <h1 className="text-xl font-semibold mt-8 mb-4">
          {totalResults} result{totalResults === 1 ? "" : "s"} for “{query}”
        </h1>

        {matchingCategories.length > 0 && (
          <div className="mb-8">
            <h2 className="font-semibold text-neutral-500 uppercase text-xs tracking-wide mb-3">
              Topics
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matchingCategories.map((category, index) => (
                <div
                  key={category.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <CategoryCard
                    slug={category.slug}
                    name={category.name}
                    description={category.description}
                    icon={category.icon}
                    count={category._count.people}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {matchingPeople.length > 0 && (
          <div>
            {matchingCategories.length > 0 && (
              <h2 className="font-semibold text-neutral-500 uppercase text-xs tracking-wide mb-3">
                People &amp; channels
              </h2>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              {matchingPeople.map((person, index) => (
                <div
                  key={person.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <p className="text-xs text-neutral-500 mb-1">
                    <Link href={`/category/${person.category.slug}`} className="hover:underline">
                      {person.category.icon} {person.category.name}
                    </Link>
                  </p>
                  <PersonCard person={person} />
                </div>
              ))}
            </div>
          </div>
        )}

        {totalResults === 0 && (
          <p className="text-neutral-500">Nothing matches that search yet.</p>
        )}
      </div>
    );
  }

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { people: true } } },
  });

  return (
    <div className="hero-glow">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10">
        <div className="mb-8 sm:mb-10 text-center animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 dark:from-indigo-400 dark:via-violet-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
              Who to follow,
            </span>{" "}
            by topic
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
            A free, community-editable directory of great YouTube, Instagram, Facebook,
            X, and TikTok accounts — organized by subject, curated by admins.
          </p>
          <div className="mt-6 max-w-md mx-auto">
            <SearchAutocomplete />
          </div>
        </div>

        <h2 className="font-semibold text-neutral-500 uppercase text-xs tracking-wide mb-3">
          Browse topics
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${Math.min(index * 40, 320)}ms` }}
            >
              <CategoryCard
                slug={category.slug}
                name={category.name}
                description={category.description}
                icon={category.icon}
                count={category._count.people}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
