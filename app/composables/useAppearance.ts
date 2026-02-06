import type { AppearanceSettings } from '~/types/appearance'

export function useAppearance() {
  return useFetch<AppearanceSettings>('/api/appearance', {
    key: 'appearance',
  })
}
