import ytdl from 'ytdl-core'

type Body = {
  id: string
}

export default defineEventHandler(async (event) => {
  const { id } = await readBody<Body>(event)

  if (!id) {
    setResponseStatus(event, 400)

    return 'no'
  }

  return ytdl(id, {
    quality: 'highestaudio',
    filter: 'audioonly',
  })
})
