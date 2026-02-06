export default defineEventHandler(async () => {
  const { baseURL, headers } = useApiConfig()

  const res = await $fetch<{ data: unknown[] }>('/projects', { baseURL, headers })
  return res.data
})
