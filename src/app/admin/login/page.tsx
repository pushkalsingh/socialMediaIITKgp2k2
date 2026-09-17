import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { loginAction } from "@/lib/actions/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await getSession();
  if (session) redirect("/admin");

  const { error } = await searchParams;

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold mb-1">Admin login</h1>
      <p className="text-sm text-neutral-500 mb-6">
        Log in to add or edit topics and channels.
      </p>

      {error && (
        <p className="mb-4 rounded-md bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 text-sm px-3 py-2">
          {error}
        </p>
      )}

      <form action={loginAction} className="flex flex-col gap-3">
        <label className="text-sm font-medium">
          Email
          <input
            type="email"
            name="email"
            required
            autoFocus
            className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
          />
        </label>
        <label className="text-sm font-medium">
          Password
          <input
            type="password"
            name="password"
            required
            className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
