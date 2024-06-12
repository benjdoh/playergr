import { useSearchYoutubeMusic } from '../utils/youtube'

export default defineEventHandler(async (event) => {
  const { query } = await readBody<{ query: string }>(event)

  if (!query) return []

  return await useSearchYoutubeMusic({ query })
})
