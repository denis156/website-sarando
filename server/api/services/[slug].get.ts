export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  const { baseURL, headers } = useApiConfig()

  return await $fetch(`/services/${slug}`, { baseURL, headers })
})
