import Link from "next/link";
import { Avatar } from "@/components/Avatar";
import { SocialIcons, type SocialLinks } from "@/components/SocialIcons";

type Person = SocialLinks & {
  slug: string;
  name: string;
  bio: string;
  avatarUrl?: string | null;
  verified: boolean;
};

export function PersonCard({ person }: { person: Person }) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <Avatar name={person.name} avatarUrl={person.avatarUrl} />
        <div className="min-w-0">
          <Link href={`/person/${person.slug}`} className="font-semibold hover:underline">
            {person.name}
          </Link>
          {person.verified && (
            <span
              title="An admin has verified these links are live"
              className="ml-1.5 inline-block text-blue-500 align-middle"
            >
              ✓
            </span>
          )}
          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mt-0.5">
            {person.bio}
          </p>
        </div>
      </div>
      <SocialIcons links={person} />
    </div>
  );
}
