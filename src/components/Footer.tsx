export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 mt-auto">
      <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-neutral-500 dark:text-neutral-400 flex flex-col sm:flex-row gap-2 sm:justify-between">
        <p>Follow Wiki — a community directory of who to follow, by topic.</p>
        <p>Built with Next.js. Data stored locally in SQLite.</p>
      </div>
    </footer>
  );
}
