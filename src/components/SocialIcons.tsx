type Platform = "youtube" | "instagram" | "facebook" | "x" | "tiktok" | "website";

const LABELS: Record<Platform, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  facebook: "Facebook",
  x: "X (Twitter)",
  tiktok: "TikTok",
  website: "Website",
};

const COLORS: Record<Platform, string> = {
  youtube: "hover:bg-red-600 hover:text-white hover:border-red-600",
  instagram:
    "hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-600 hover:to-purple-600 hover:text-white hover:border-transparent",
  facebook: "hover:bg-blue-600 hover:text-white hover:border-blue-600",
  x: "hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black",
  tiktok: "hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black",
  website: "hover:bg-slate-700 hover:text-white hover:border-slate-700",
};

function Icon({ platform }: { platform: Platform }) {
  const common = "h-4 w-4";
  switch (platform) {
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.5v-7l6.3 3.5-6.3 3.5Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
          <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 2.2.28 2.9.6a5.9 5.9 0 0 1 2.1 1.4 5.9 5.9 0 0 1 1.4 2.1c.3.7.5 1.7.6 2.9.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.28 2.2-.6 2.9a5.9 5.9 0 0 1-1.4 2.1 5.9 5.9 0 0 1-2.1 1.4c-.7.3-1.7.5-2.9.6-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-2.2-.28-2.9-.6a5.9 5.9 0 0 1-2.1-1.4 5.9 5.9 0 0 1-1.4-2.1c-.3-.7-.5-1.7-.6-2.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.28-2.2.6-2.9a5.9 5.9 0 0 1 1.4-2.1 5.9 5.9 0 0 1 2.1-1.4c.7-.3 1.7-.5 2.9-.6C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.52 0-4.76.07-1 .04-1.5.2-1.86.34-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.13.36-.3.87-.34 1.86C3.02 8.48 3 8.85 3 12s0 3.52.07 4.76c.04 1 .2 1.5.34 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.36.13.87.3 1.86.34 1.24.06 1.61.07 4.76.07s3.52 0 4.76-.07c1-.04 1.5-.2 1.86-.34.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.13-.36.3-.87.34-1.86.06-1.24.07-1.61.07-4.76s0-3.52-.07-4.76c-.04-1-.2-1.5-.34-1.86a3.1 3.1 0 0 0-.75-1.15 3.1 3.1 0 0 0-1.15-.75c-.36-.13-.87-.3-1.86-.34C15.52 4 15.15 4 12 4Zm0 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 1.8a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm4.7-2a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
          <path d="M13.5 21v-7.9h2.66l.4-3.1h-3.06V8.1c0-.9.25-1.5 1.55-1.5h1.65V3.8c-.29-.04-1.27-.12-2.4-.12-2.38 0-4 1.45-4 4.1v2.3H7.65v3.1h2.65V21h3.2Z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
          <path d="M18.3 2.3h3.2l-7 8 8.2 11.4h-6.4L11 14.6l-5.8 6.9H1.9l7.5-8.6L1.5 2.3h6.5l4.8 6.4 5.5-6.4Zm-1.1 17.1h1.8L7 4.5H5l12.2 15Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden>
          <path d="M16.6 2h-3.2v13.6a2.9 2.9 0 1 1-2.1-2.8v-3.3a6.2 6.2 0 1 0 5.3 6.1V8.6a8.2 8.2 0 0 0 4.9 1.6V7a4.9 4.9 0 0 1-4.9-5Z" />
        </svg>
      );
    case "website":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9Z" />
        </svg>
      );
  }
}

export type SocialLinks = {
  youtubeUrl?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  xUrl?: string | null;
  tiktokUrl?: string | null;
  websiteUrl?: string | null;
};

export function SocialIcons({
  links,
  size = "sm",
}: {
  links: SocialLinks;
  size?: "sm" | "lg";
}) {
  const entries: { platform: Platform; url: string }[] = [
    links.youtubeUrl ? { platform: "youtube", url: links.youtubeUrl } : null,
    links.instagramUrl ? { platform: "instagram", url: links.instagramUrl } : null,
    links.facebookUrl ? { platform: "facebook", url: links.facebookUrl } : null,
    links.xUrl ? { platform: "x", url: links.xUrl } : null,
    links.tiktokUrl ? { platform: "tiktok", url: links.tiktokUrl } : null,
    links.websiteUrl ? { platform: "website", url: links.websiteUrl } : null,
  ].filter((e): e is { platform: Platform; url: string } => e !== null);

  if (entries.length === 0) {
    return <p className="text-xs text-neutral-400 italic">No links yet</p>;
  }

  const sizeClasses =
    size === "lg" ? "h-10 w-10 rounded-xl" : "h-8 w-8 rounded-lg";

  return (
    <div className="flex flex-wrap gap-2">
      {entries.map(({ platform, url }) => (
        <a
          key={platform}
          href={url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          title={LABELS[platform]}
          aria-label={`${LABELS[platform]} profile`}
          className={`flex items-center justify-center border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors ${sizeClasses} ${COLORS[platform]}`}
        >
          <Icon platform={platform} />
        </a>
      ))}
    </div>
  );
}
