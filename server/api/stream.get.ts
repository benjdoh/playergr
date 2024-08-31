import { Innertube } from 'youtubei.js'

export default defineEventHandler(async (event) => {
  const { id } = getQuery<{
    id: string
  }>(event)

  if (!id) {
    setResponseStatus(event, 400)

    return 'no'
  }

  setHeader(event, 'Cache-Control', 'public, max-age: 1296000')

  const yi = await Innertube.create()

  return yi.download(id, {})
})
