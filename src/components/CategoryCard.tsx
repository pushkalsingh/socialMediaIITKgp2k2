import Link from "next/link";
import { colorThemeFor } from "@/lib/colors";

export function CategoryCard({
  slug,
  name,
  description,
  icon,
  count,
}: {
  slug: string;
  name: string;
  description: string;
  icon: string | null;
  count: number;
}) {
  const theme = colorThemeFor(name);

  return (
    <Link
      href={`/category/${slug}`}
      className={`group rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 sm:p-5 ${theme.hoverBorder} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-2`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`h-11 w-11 rounded-xl flex items-center justify-center text-xl ${theme.chip} transition-transform duration-200 group-hover:scale-105`}
        >
          {icon ?? "📁"}
        </span>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          {count} {count === 1 ? "channel" : "channels"}
        </span>
      </div>
      <h3 className="font-semibold text-lg group-hover:underline decoration-2 underline-offset-2">
        {name}
      </h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
        {description}
      </p>
    </Link>
  );
}
