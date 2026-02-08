export default defineEventHandler(async () => {
  const { baseURL, headers } = useApiConfig()

  const res = await $fetch<{ data: unknown }>('/contact', { baseURL, headers })
  return res.data
})
