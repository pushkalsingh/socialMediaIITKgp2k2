type Category = { id: string; name: string; icon: string | null };

type Person = {
  name: string;
  bio: string;
  categoryId: string;
  avatarUrl: string | null;
  youtubeUrl: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  xUrl: string | null;
  tiktokUrl: string | null;
  websiteUrl: string | null;
  verified?: boolean;
};

export function PersonForm({
  action,
  error,
  submitLabel,
  categories,
  defaultValues,
  showVerified = false,
}: {
  action: (formData: FormData) => void;
  error?: string;
  submitLabel: string;
  categories: Category[];
  defaultValues?: Person;
  showVerified?: boolean;
}) {
  return (
    <form action={action} className="flex flex-col gap-4">
      {error && (
        <p className="rounded-md bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 text-sm px-3 py-2">
          {error}
        </p>
      )}

      <label className="text-sm font-medium">
        Topic
        <select
          name="categoryId"
          required
          defaultValue={defaultValues?.categoryId}
          className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
        >
          <option value="" disabled>
            Choose a topic…
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm font-medium">
        Name
        <input
          type="text"
          name="name"
          required
          defaultValue={defaultValues?.name}
          placeholder="e.g. Andrej Karpathy"
          className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
        />
      </label>

      <label className="text-sm font-medium">
        Bio
        <textarea
          name="bio"
          required
          rows={3}
          defaultValue={defaultValues?.bio}
          placeholder="One or two sentences on who they are and why they're worth following"
          className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
        />
      </label>

      <label className="text-sm font-medium">
        Avatar image URL (optional)
        <input
          type="url"
          name="avatarUrl"
          defaultValue={defaultValues?.avatarUrl ?? ""}
          placeholder="https://…"
          className="mt-1 w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
        />
        <span className="block text-xs text-neutral-500 mt-1 font-normal">
          Leave blank to show a generated initials avatar instead.
        </span>
      </label>

      <fieldset className="border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 flex flex-col gap-3">
        <legend className="text-xs font-semibold uppercase tracking-wide text-neutral-500 px-1">
          Links to follow
        </legend>
        <UrlField label="YouTube" name="youtubeUrl" defaultValue={defaultValues?.youtubeUrl} />
        <UrlField label="Instagram" name="instagramUrl" defaultValue={defaultValues?.instagramUrl} />
        <UrlField label="Facebook" name="facebookUrl" defaultValue={defaultValues?.facebookUrl} />
        <UrlField label="X (Twitter)" name="xUrl" defaultValue={defaultValues?.xUrl} />
        <UrlField label="TikTok" name="tiktokUrl" defaultValue={defaultValues?.tiktokUrl} />
        <UrlField label="Website" name="websiteUrl" defaultValue={defaultValues?.websiteUrl} />
      </fieldset>

      {showVerified && (
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            name="verified"
            defaultChecked={defaultValues?.verified}
            className="h-4 w-4"
          />
          I&rsquo;ve checked these links and they work
        </label>
      )}

      <button
        type="submit"
        className="self-start rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2 text-sm font-medium hover:opacity-90"
      >
        {submitLabel}
      </button>
    </form>
  );
}

function UrlField({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
}) {
  return (
    <label className="text-sm font-medium flex items-center gap-3">
      <span className="w-24 shrink-0 font-normal text-neutral-600 dark:text-neutral-400">
        {label}
      </span>
      <input
        type="url"
        name={name}
        defaultValue={defaultValue ?? ""}
        placeholder="https://…"
        className="flex-1 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
      />
    </label>
  );
}
