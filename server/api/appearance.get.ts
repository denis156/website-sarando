export default defineEventHandler(async () => {
  const { baseURL, headers } = useApiConfig()

  const res = await $fetch<{ data: { key: string, value: string }[] }>('/appearance', { baseURL, headers })

  const settings: Record<string, string> = {}
  for (const item of res.data) {
    settings[item.key] = item.value
  }
  return settings
})
