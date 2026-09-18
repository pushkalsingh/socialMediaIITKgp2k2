type Category = {
  name: string;
  description: string;
  icon: string | null;
};

export function CategoryForm({
  action,
  error,
  submitLabel,
  defaultValues,
}: {
  action: (formData: FormData) => void;
  error?: string;
  submitLabel: string;
  defaultValues?: Category;
}) {
  return (
    <form action={action} className="flex flex-col gap-4">
      {error && (
        <p className="rounded-md bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 text-sm px-3 py-2">
          {error}
        </p>
      )}

      <label className="text-sm font-medium">
        Icon (single emoji, optional)
        <input
          type="text"
          name="icon"
          defaultValue={defaultValues?.icon ?? ""}
          placeholder="📁"
          maxLength={8}
          className="mt-1 w-24 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 text-sm"
        />
      </label>

      <label className="text-sm font-medium">
        Name
        <input
          type="text"
          name="name"
          required
          defaultValue={defaultValues?.name}
          placeholder="e.g. Artificial Intelligence"
          className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 text-sm"
        />
      </label>

      <label className="text-sm font-medium">
        Description
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={defaultValues?.description}
          placeholder="One or two sentences describing this topic"
          className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 transition-shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 text-sm"
        />
      </label>

      <button
        type="submit"
        className="self-start rounded-lg bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white px-4 py-2 text-sm font-medium shadow-sm transition-all duration-150 hover:shadow-md hover:brightness-110 active:scale-95"
      >
        {submitLabel}
      </button>
    </form>
  );
}
