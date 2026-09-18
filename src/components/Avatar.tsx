import { colorThemeFor } from "@/lib/colors";

function initialsOf(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export function Avatar({
  name,
  avatarUrl,
  size = "md",
}: {
  name: string;
  avatarUrl?: string | null;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "h-10 w-10 text-sm",
    md: "h-14 w-14 text-lg",
    lg: "h-24 w-24 text-3xl",
  }[size];

  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- avatarUrl is an arbitrary admin-entered URL, not a static local asset
      <img
        src={avatarUrl}
        alt={name}
        className={`${sizeClasses} rounded-full object-cover shrink-0 ring-2 ring-white dark:ring-neutral-950`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses} ${colorThemeFor(name).solid} rounded-full flex items-center justify-center font-semibold text-white shrink-0 ring-2 ring-white dark:ring-neutral-950 transition-transform duration-200 group-hover:scale-105`}
    >
      {initialsOf(name)}
    </div>
  );
}
