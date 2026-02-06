import type { Technology } from '~/types/technology'

export function useTechnologies() {
  return useFetch<Technology[]>('/api/technologies', {
    key: 'technologies',
  })
}
