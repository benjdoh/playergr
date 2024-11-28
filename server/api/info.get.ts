import { Innertube } from "youtubei.js";

import { string, object } from "valibot";

type QueryObj = {
  id?: string;
};

export default defineEventHandler(async (event) => {
  const query = getQuery<QueryObj>(event);

  if (!query.id) {
    setResponseStatus(event, 400);
    return "no";
  }

  const yi = await Innertube.create();

  return yi.getBasicInfo(query.id);
});
