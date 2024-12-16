import { Innertube } from "youtubei.js";
import { StreamingData } from "~/assets/types";

export default defineEventHandler(async (event) => {
  const { id } = getQuery<{
    id: string;
  }>(event);

  if (!id) {
    setResponseStatus(event, 400);

    return "no";
  }

  setHeader(event, "Cache-Control", "public, max-age: 1296000");

  const yi = await Innertube.create();

  return yi.getStreamingData(id, { type: "audio" });
});
