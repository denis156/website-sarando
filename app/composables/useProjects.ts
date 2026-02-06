import type { Project } from '~/types/project'

export function useProjects() {
  return useFetch<{ data: Project[] }>('/api/projects', {
    key: 'projects',
    transform: res => res.data,
  })
}

export function useProject(slug: string | Ref<string>) {
  return useFetch<{ data: Project }>(() => `/api/projects/${toValue(slug)}`, {
    key: `project-${toValue(slug)}`,
    transform: res => res.data,
  })
}
