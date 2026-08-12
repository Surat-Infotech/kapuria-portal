/**
 * Dates arrive as ISO day strings ("2024-06-12") and are formatted here rather
 * than with `toLocaleDateString`: the drawings list renders on the server and
 * again on the client, and the two would disagree the moment their locales do —
 * a hydration mismatch on every card. Parsing the parts by hand also keeps the
 * day intact, which `new Date("2024-06-12")` does not once a timezone west of
 * UTC gets hold of it.
 */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const parts = (iso) => {
  const [year, month, day] = String(iso ?? "").split("-");
  return year && month && day ? { year, month, day } : null;
};

/** "2024-06-12" → "12 Jun 2024" — the page's "Last updated" line. */
export const formatLongDate = (iso) => {
  const date = parts(iso);
  if (!date) return "";

  return `${Number(date.day)} ${MONTHS[Number(date.month) - 1]} ${date.year}`;
};

/** "2024-06-12" → "12/06/2024" — the per-drawing "Updated" stamp. */
export const formatShortDate = (iso) => {
  const date = parts(iso);
  if (!date) return "";

  return `${date.day}/${date.month}/${date.year}`;
};
