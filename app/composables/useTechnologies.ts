import type { Technology } from '~/types/technology'

export function useTechnologies() {
  return useFetch<{ data: Technology[] }>('/api/technologies', {
    key: 'technologies',
    transform: res => res.data,
  })
}
