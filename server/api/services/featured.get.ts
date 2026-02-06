export default defineEventHandler(async () => {
  const { baseURL, headers } = useApiConfig()

  const res = await $fetch<{ data: unknown[] }>('/services/featured', { baseURL, headers })
  return res.data
})
