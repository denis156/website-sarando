export function useApiConfig() {
  const config = useRuntimeConfig()

  return {
    baseURL: config.apiBaseUrl,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-API-KEY': config.apiKey,
    },
  }
}
