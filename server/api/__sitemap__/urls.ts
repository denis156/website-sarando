import { defineSitemapEventHandler } from '#imports'

export default defineSitemapEventHandler(async () => {
  const { baseURL, headers } = useApiConfig()

  const [servicesRes, projectsRes] = await Promise.all([
    $fetch<{ data: { slug: string }[] }>('/services', { baseURL, headers }).catch(() => ({ data: [] })),
    $fetch<{ data: { slug: string }[] }>('/projects', { baseURL, headers }).catch(() => ({ data: [] })),
  ])

  const serviceUrls = servicesRes.data.map(s => ({
    loc: `/layanan/${s.slug}`,
    changefreq: 'monthly' as const,
  }))

  const projectUrls = projectsRes.data.map(p => ({
    loc: `/portofolio/${p.slug}`,
    changefreq: 'monthly' as const,
  }))

  return [...serviceUrls, ...projectUrls]
})
