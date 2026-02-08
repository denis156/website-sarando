import type { ProfileCompany } from '~/types/profile-company'

export function useContact() {
  return useFetch<ProfileCompany>('/api/contact', {
    key: 'contact',
  })
}
