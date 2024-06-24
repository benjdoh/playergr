import ytdl from 'ytdl-core'

type Query = {
  id: string
}

export default defineEventHandler(async (event) => {
  const { id } = getQuery<Query>(event)

  if (!id) {
    setResponseStatus(event, 400)

    return 'no'
  }

  return ytdl(id, {
    quality: 'highestaudio',
    filter: 'audioonly',
  })
})
