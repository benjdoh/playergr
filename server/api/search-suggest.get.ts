import { Innertube } from "youtubei.js";

export default defineEventHandler(async (event) => {
  const query = getQuery<{ q?: string }>(event);
  if (!query.q) return [];

  const tube = await Innertube.create();

  return tube.getSearchSuggestions(query.q);
});
