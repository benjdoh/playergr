import { Innertube } from "youtubei.js";
import ytdl from "ytdl-core";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) return setResponseStatus(event, 400);

  setHeader(event, "Cache-Control", "max-age: 1296000");

  const yi = await Innertube.create();

  return yi.download(id, { type: "audio" });
});
