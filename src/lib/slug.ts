import slugify from "slugify";

export function toSlug(input: string) {
  return slugify(input, { lower: true, strict: true, trim: true });
}

/**
 * Appends a short random suffix so slugs stay unique even when two
 * entries share the same name (e.g. two people both called "Alex").
 */
export function uniqueSuffix() {
  return Math.random().toString(36).slice(2, 7);
}
