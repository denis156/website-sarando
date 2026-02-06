import type { AppearanceSettings } from '~/types/appearance'

interface AppearanceItem {
  key: string
  value: string
}

export function useAppearance() {
  return useFetch<{ data: AppearanceItem[] }>('/api/appearance', {
    key: 'appearance',
    transform: (res) => {
      const settings: AppearanceSettings = {}
      for (const item of res.data) {
        settings[item.key] = item.value
      }
      return settings
    },
  })
}
