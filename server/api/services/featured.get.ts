export default defineEventHandler(async () => {
  const { baseURL, headers } = useApiConfig()

  return await $fetch('/services/featured', { baseURL, headers })
})
