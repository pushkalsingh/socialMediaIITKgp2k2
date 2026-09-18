import Link from "next/link";
import { getSession } from "@/lib/auth";

export async function Header() {
  const session = await getSession();

  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-2">
        <Link
          href="/"
          className="group flex items-center gap-2 font-semibold text-lg shrink-0"
        >
          <span className="text-2xl leading-none inline-block transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6">
            📚
          </span>
          <span className="hidden sm:inline bg-gradient-to-r from-indigo-600 to-fuchsia-600 dark:from-indigo-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
            Follow Wiki
          </span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-3 text-sm">
          <Link
            href="/"
            className="-mx-1 px-2 py-2 rounded-md transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            Topics
          </Link>
          {session ? (
            <Link
              href="/admin"
              className="rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white px-3 py-2 shadow-sm transition-all duration-150 hover:shadow-md hover:brightness-110 active:scale-95"
            >
              <span className="sm:hidden">Admin</span>
              <span className="hidden sm:inline">Admin dashboard</span>
            </Link>
          ) : (
            <Link
              href="/admin/login"
              className="-mx-1 px-2 py-2 rounded-md transition-colors hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-neutral-100 dark:hover:bg-neutral-900"
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
