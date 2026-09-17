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
          className="mt-1 w-24 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
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
          className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
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
          className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
        />
      </label>

      <button
        type="submit"
        className="self-start rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 text-sm font-medium hover:opacity-90"
      >
        {submitLabel}
      </button>
    </form>
  );
}
