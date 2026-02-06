export default defineEventHandler(async () => {
  const { baseURL, headers } = useApiConfig()

  const res = await $fetch<{ data: unknown[] }>('/services', { baseURL, headers })
  return res.data
})
