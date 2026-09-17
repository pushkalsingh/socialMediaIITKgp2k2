import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Avatar } from "@/components/Avatar";
import { SocialIcons } from "@/components/SocialIcons";

export default async function PersonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const person = await prisma.person.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!person) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link
        href={`/category/${person.category.slug}`}
        className="text-sm text-neutral-500 hover:underline"
      >
        ← {person.category.icon} {person.category.name}
      </Link>

      <div className="mt-6 flex items-start gap-5">
        <Avatar name={person.name} avatarUrl={person.avatarUrl} size="lg" />
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {person.name}
            {person.verified && (
              <span
                title="An admin has verified these links are live"
                className="text-blue-500 text-lg"
              >
                ✓
              </span>
            )}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">{person.bio}</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-neutral-500 mb-2">
          Follow
        </h2>
        <SocialIcons links={person} size="lg" />
      </div>
    </div>
  );
}
