import Link from "next/link";
import { getSession } from "@/lib/auth";

export async function Header() {
  const session = await getSession();

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
          <span className="text-2xl leading-none">📚</span>
          <span>Follow Wiki</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:underline">
            Topics
          </Link>
          {session ? (
            <Link
              href="/admin"
              className="rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-3 py-1.5 hover:opacity-90"
            >
              Admin dashboard
            </Link>
          ) : (
            <Link href="/admin/login" className="hover:underline">
              Admin login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
