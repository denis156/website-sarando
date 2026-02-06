export default defineEventHandler(async () => {
  const { baseURL, headers } = useApiConfig()

  return await $fetch('/projects', { baseURL, headers })
})
