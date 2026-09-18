"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/Avatar";

type Suggestion =
  | { type: "category"; name: string; slug: string; icon: string | null; count: number }
  | {
      type: "person";
      name: string;
      slug: string;
      avatarUrl: string | null;
      category: { name: string; icon: string | null };
    };

function suggestionHref(suggestion: Suggestion) {
  return suggestion.type === "category" ? `/category/${suggestion.slug}` : `/person/${suggestion.slug}`;
}

export function SearchAutocomplete({ defaultValue }: { defaultValue?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue ?? "");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const query = value.trim();
      if (query.length < 2) {
        setSuggestions([]);
        setOpen(false);
        return;
      }

      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) return;
        const data: { results: Suggestion[] } = await res.json();
        setSuggestions(data.results);
        setOpen(true);
        setHighlighted(-1);
      } catch {
        // Network hiccup — leave whatever suggestions were already showing.
      }
    }, 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function goToAllResults() {
    setOpen(false);
    router.push(`/?q=${encodeURIComponent(value.trim())}`);
  }

  function goToSuggestion(suggestion: Suggestion) {
    setOpen(false);
    router.push(suggestionHref(suggestion));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlighted((i) => (i + 1) % suggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlighted((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (event.key === "Enter" && highlighted >= 0) {
      event.preventDefault();
      goToSuggestion(suggestions[highlighted]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <form
        action="/"
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          goToAllResults();
        }}
      >
        <div className="relative flex-1 min-w-0">
          <input
            type="text"
            name="q"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setOpen(true)}
            placeholder="Search topics, people, or channels…"
            autoComplete="off"
            role="combobox"
            aria-expanded={open}
            aria-controls="search-suggestions"
            aria-autocomplete="list"
            className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2.5 pr-9 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400"
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                setValue("");
                setSuggestions([]);
                setOpen(false);
              }}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
            >
              ×
            </button>
          )}
        </div>
        <button
          type="submit"
          className="rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-4 py-2.5 text-sm font-medium hover:opacity-90"
        >
          Search
        </button>
      </form>

      {open && suggestions.length > 0 && (
        <ul
          id="search-suggestions"
          role="listbox"
          className="absolute z-20 mt-1 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-lg overflow-hidden"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.type}-${suggestion.slug}`}
              role="option"
              aria-selected={index === highlighted}
            >
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => goToSuggestion(suggestion)}
                onMouseEnter={() => setHighlighted(index)}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm ${
                  index === highlighted
                    ? "bg-neutral-100 dark:bg-neutral-900"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-900"
                }`}
              >
                {suggestion.type === "category" ? (
                  <>
                    <span className="h-10 w-10 rounded-full flex items-center justify-center text-lg bg-neutral-100 dark:bg-neutral-900 shrink-0">
                      {suggestion.icon ?? "📁"}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium truncate">{suggestion.name}</span>
                      <span className="block text-xs text-neutral-500 truncate">
                        Topic · {suggestion.count} channel{suggestion.count === 1 ? "" : "s"}
                      </span>
                    </span>
                  </>
                ) : (
                  <>
                    <Avatar name={suggestion.name} avatarUrl={suggestion.avatarUrl} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium truncate">{suggestion.name}</span>
                      <span className="block text-xs text-neutral-500 truncate">
                        {suggestion.category.icon} {suggestion.category.name}
                      </span>
                    </span>
                  </>
                )}
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={goToAllResults}
              className="w-full px-3 py-2 text-left text-xs text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800"
            >
              See all results for &ldquo;{value.trim()}&rdquo;
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
