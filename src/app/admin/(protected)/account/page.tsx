import { getSession } from "@/lib/auth";
import { changePasswordAction, addAdminAction } from "@/lib/actions/auth";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const session = await getSession();
  const { error, success } = await searchParams;

  return (
    <div className="max-w-lg flex flex-col gap-10">
      <div>
        <h1 className="text-2xl font-bold mb-1">Account</h1>
        <p className="text-sm text-neutral-500 mb-6">
          Logged in as {session?.name} ({session?.email})
        </p>

        {error && (
          <p className="mb-4 rounded-md bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 text-sm px-3 py-2">
            {error}
          </p>
        )}
        {success && (
          <p className="mb-4 rounded-md bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 text-sm px-3 py-2">
            {success}
          </p>
        )}

        <h2 className="font-semibold mb-3">Change your password</h2>
        <form action={changePasswordAction} className="flex flex-col gap-3">
          <label className="text-sm font-medium">
            Current password
            <input
              type="password"
              name="currentPassword"
              required
              className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm font-medium">
            New password
            <input
              type="password"
              name="newPassword"
              required
              minLength={8}
              className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
            />
          </label>
          <button
            type="submit"
            className="self-start rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 text-sm font-medium hover:opacity-90"
          >
            Update password
          </button>
        </form>
      </div>

      <div>
        <h2 className="font-semibold mb-1">Add another admin</h2>
        <p className="text-sm text-neutral-500 mb-3">
          Give someone else login access to add and edit topics and channels.
        </p>
        <form action={addAdminAction} className="flex flex-col gap-3">
          <label className="text-sm font-medium">
            Name
            <input
              type="text"
              name="name"
              required
              className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm font-medium">
            Email
            <input
              type="email"
              name="email"
              required
              className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm font-medium">
            Temporary password
            <input
              type="password"
              name="password"
              required
              minLength={8}
              className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
            />
          </label>
          <button
            type="submit"
            className="self-start rounded-lg border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900"
          >
            Add admin
          </button>
        </form>
      </div>
    </div>
  );
}
