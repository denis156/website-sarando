import type { Project } from '~/types/project'

export function useProjects() {
  return useFetch<Project[]>('/api/projects', {
    key: 'projects',
  })
}

export function useProject(slug: string | Ref<string>) {
  return useFetch<Project>(() => `/api/projects/${toValue(slug)}`, {
    key: `project-${toValue(slug)}`,
  })
}
