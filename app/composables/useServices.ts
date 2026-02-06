import type { Service } from '~/types/service'

export function useServices() {
  return useFetch<Service[]>('/api/services', {
    key: 'services',
  })
}

export function useFeaturedServices() {
  return useFetch<Service[]>('/api/services/featured', {
    key: 'services-featured',
  })
}

export function useService(slug: string | Ref<string>) {
  return useFetch<Service>(() => `/api/services/${toValue(slug)}`, {
    key: `service-${toValue(slug)}`,
  })
}
