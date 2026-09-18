import Link from "next/link";
import { requestAccessAction } from "@/lib/actions/auth";

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; submitted?: string }>;
}) {
  const { error, submitted } = await searchParams;

  if (submitted) {
    return (
      <div className="mx-auto max-w-sm px-4 py-16 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h1 className="text-2xl font-bold mb-2">Request submitted</h1>
        <p className="text-sm text-neutral-500">
          A super admin will review your identification number and approve or reject your
          request. You can try logging in once you&rsquo;ve been approved.
        </p>
        <Link href="/admin/login" className="inline-block mt-6 text-sm underline">
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold mb-1">Request admin access</h1>
      <p className="text-sm text-neutral-500 mb-6">
        Submit your name and institute ID number. A super admin will review your request
        before you can log in.
      </p>

      {error && (
        <p className="mb-4 rounded-md bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 text-sm px-3 py-2">
          {error}
        </p>
      )}

      <form action={requestAccessAction} className="flex flex-col gap-3">
        <label className="text-sm font-medium">
          Name
          <input
            type="text"
            name="name"
            required
            autoFocus
            className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
          />
        </label>
        <label className="text-sm font-medium">
          ID number
          <input
            type="text"
            name="identificationNumber"
            required
            placeholder="e.g. 02ME3031"
            className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm uppercase"
          />
          <span className="block text-xs text-neutral-500 mt-1 font-normal">
            Year of admission + department + roll number.
          </span>
        </label>
        <label className="text-sm font-medium">
          Email
          <input
            type="email"
            name="email"
            required
            className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
          />
          <span className="block text-xs text-neutral-500 mt-1 font-normal">
            No password needed — once approved, you&rsquo;ll log in with this email and your
            ID number.
          </span>
        </label>
        <button
          type="submit"
          className="mt-2 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 text-sm font-medium hover:opacity-90"
        >
          Submit request
        </button>
      </form>

      <Link href="/admin/login" className="inline-block mt-6 text-sm underline">
        Already approved? Log in
      </Link>
    </div>
  );
}
