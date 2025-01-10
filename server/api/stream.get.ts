import { Innertube } from "youtubei.js";
import ytdl from "ytdl-core";

export default defineEventHandler(async (event) => {
  const { id } = getQuery<{ id: string }>(event);

  setHeader(event, "Cache-Control", "max-age: 1296000");
  console.log(id);

  return Innertube.create().then((v) => v.download(id, { type: "audio" }));
});
