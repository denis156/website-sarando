export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const { baseURL, headers } = useApiConfig()

  const res = await $fetch<{ data: unknown }>(`/projects/${slug}`, { baseURL, headers })
  return res.data
})
