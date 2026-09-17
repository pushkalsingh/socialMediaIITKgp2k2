import Link from "next/link";
import { getSession } from "@/lib/auth";

export async function Header() {
  const session = await getSession();

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2 font-semibold text-lg shrink-0">
          <span className="text-2xl leading-none">📚</span>
          <span className="hidden sm:inline">Follow Wiki</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-3 text-sm">
          <Link href="/" className="-mx-1 px-2 py-2 rounded-md hover:underline hover:bg-neutral-100 dark:hover:bg-neutral-900">
            Topics
          </Link>
          {session ? (
            <Link
              href="/admin"
              className="rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-3 py-2 hover:opacity-90"
            >
              <span className="sm:hidden">Admin</span>
              <span className="hidden sm:inline">Admin dashboard</span>
            </Link>
          ) : (
            <Link
              href="/admin/login"
              className="-mx-1 px-2 py-2 rounded-md hover:underline hover:bg-neutral-100 dark:hover:bg-neutral-900"
            >
              <span className="sm:hidden">Login</span>
              <span className="hidden sm:inline">Admin login</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
