// A small, deterministic "pick a hue from a name" system so the same person
// or topic always gets the same color, without needing to store one.
export type ColorTheme = {
  /** Solid fill — avatar tiles, badges. */
  solid: string;
  /** Soft tinted circle background — category icon chips. */
  chip: string;
  /** Border/shadow tint used on hover for cards in this hue. */
  hoverBorder: string;
};

const PALETTE: ColorTheme[] = [
  {
    solid: "bg-rose-500",
    chip: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
    hoverBorder: "hover:border-rose-300 dark:hover:border-rose-800",
  },
  {
    solid: "bg-orange-500",
    chip: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
    hoverBorder: "hover:border-orange-300 dark:hover:border-orange-800",
  },
  {
    solid: "bg-amber-500",
    chip: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-800",
  },
  {
    solid: "bg-lime-600",
    chip: "bg-lime-100 text-lime-700 dark:bg-lime-500/15 dark:text-lime-300",
    hoverBorder: "hover:border-lime-300 dark:hover:border-lime-800",
  },
  {
    solid: "bg-emerald-500",
    chip: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-800",
  },
  {
    solid: "bg-teal-500",
    chip: "bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300",
    hoverBorder: "hover:border-teal-300 dark:hover:border-teal-800",
  },
  {
    solid: "bg-cyan-500",
    chip: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300",
    hoverBorder: "hover:border-cyan-300 dark:hover:border-cyan-800",
  },
  {
    solid: "bg-blue-500",
    chip: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300",
    hoverBorder: "hover:border-blue-300 dark:hover:border-blue-800",
  },
  {
    solid: "bg-indigo-500",
    chip: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
    hoverBorder: "hover:border-indigo-300 dark:hover:border-indigo-800",
  },
  {
    solid: "bg-violet-500",
    chip: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
    hoverBorder: "hover:border-violet-300 dark:hover:border-violet-800",
  },
  {
    solid: "bg-fuchsia-500",
    chip: "bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-300",
    hoverBorder: "hover:border-fuchsia-300 dark:hover:border-fuchsia-800",
  },
  {
    solid: "bg-pink-500",
    chip: "bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300",
    hoverBorder: "hover:border-pink-300 dark:hover:border-pink-800",
  },
];

export function colorThemeFor(key: string): ColorTheme {
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}
