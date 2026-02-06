import type { Service } from '~/types/service'

export function useServices() {
  return useFetch<{ data: Service[] }>('/api/services', {
    key: 'services',
    transform: res => res.data,
  })
}

export function useFeaturedServices() {
  return useFetch<{ data: Service[] }>('/api/services/featured', {
    key: 'services-featured',
    transform: res => res.data,
  })
}

export function useService(slug: string | Ref<string>) {
  return useFetch<{ data: Service }>(() => `/api/services/${toValue(slug)}`, {
    key: `service-${toValue(slug)}`,
    transform: res => res.data,
  })
}
