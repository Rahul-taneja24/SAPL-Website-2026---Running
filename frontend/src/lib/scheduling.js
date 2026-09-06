/**
 * Content scheduling gate for date-stamped content (blog posts, news articles).
 *
 * Why this exists: `publishDate` on a post used to be display-only -- there was
 * no logic anywhere that hid a future-dated post from listings, detail pages,
 * or the sitemap. That meant "schedule this for next week" was not actually
 * possible; anything added to the data files was live the moment it deployed.
 *
 * This file is the single source of truth for "is this live yet". A post/article
 * is published once its `publishDate` (interpreted as IST, since that's the
 * business's timezone) has passed. Everything that lists or serves date-stamped
 * content must filter through `isPublished()` / `publishedOnly()` -- listing
 * pages, generateStaticParams, the detail-page component itself (so a guessed
 * or crawled URL 404s instead of rendering), and the sitemap.
 *
 * Pairs with `export const revalidate = REVALIDATE_SECONDS` on the pages that
 * use this gate, so a scheduled post flips from hidden to live on its own once
 * the date arrives -- no manual redeploy needed. Without that revalidate export,
 * a page built before the publishDate would stay hidden until the next deploy.
 */

// India is the business's timezone; "today" for scheduling purposes is IST,
// not the server's local time (Vercel functions run in UTC).
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

function istNow() {
  return new Date(Date.now() + IST_OFFSET_MS);
}

/**
 * Rebuild interval for scheduled content. Hourly is frequent enough that a
 * post scheduled for a given date is live within an hour of midnight IST,
 * without paying for on-demand/dynamic rendering on every request.
 */
export const REVALIDATE_SECONDS = 3600;

/**
 * True once `dateStr` (YYYY-MM-DD) has arrived, IST. A post with no
 * publishDate is treated as published (fail open -- never hide existing
 * content just because a date is missing).
 */
export function isPublished(dateStr) {
  if (!dateStr) return true;
  const publishAt = new Date(`${dateStr}T00:00:00+05:30`);
  if (Number.isNaN(publishAt.getTime())) return true;
  return publishAt.getTime() <= istNow().getTime();
}

/** Filter any array of items carrying a `publishDate` field down to live ones. */
export function publishedOnly(items) {
  return items.filter((item) => isPublished(item.publishDate));
}
