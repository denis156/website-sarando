<script setup lang="ts">
import type { Project, ProjectImage } from '~/types/project'
import { ArrowRight } from 'lucide-vue-next'
import { BentoGridItem } from '@/components/ui/bento-grid'
import { Sparkles } from '@/components/ui/sparkles'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { Button } from '@/components/ui/button'

useHead({ title: 'Portofolio' })
useSeoMeta({
  description:
    'Lihat hasil karya terbaik kami. Studi kasus proyek pengembangan software, aplikasi mobile, dan solusi AI.',
  ogTitle: 'Portofolio - Sarando',
  ogDescription:
    'Lihat hasil karya terbaik kami. Studi kasus proyek pengembangan software, aplikasi mobile, dan solusi AI.',
  ogImage: 'https://sarando.site/images/logo/og-default.png',
  ogUrl: 'https://sarando.site/portofolio',
  twitterCard: 'summary_large_image',
})

defineOgImage({ url: '/images/logo/og-default.png' })

useSchemaOrg([
  defineWebPage({
    '@type': 'CollectionPage',
    'name': 'Portofolio - Sarando',
    'description': 'Lihat hasil karya terbaik kami. Studi kasus proyek pengembangan software, aplikasi mobile, dan solusi AI.',
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Beranda', item: '/' },
      { name: 'Portofolio' },
    ],
  }),
])

// --- Data ---
const { data: projects, pending } = await useProjects()

// --- State ---
const selectedService = ref<string>('all')

// --- Computed ---
const services = computed(() => {
  if (!projects.value) return [{ name: 'Semua', slug: 'all' }]

  const uniqueMap = new Map<string, { name: string, slug: string }>()
  for (const p of projects.value) {
    if (p.service?.slug && !uniqueMap.has(p.service.slug)) {
      uniqueMap.set(p.service.slug, {
        name: p.service.name,
        slug: p.service.slug,
      })
    }
  }

  return [{ name: 'Semua', slug: 'all' }, ...uniqueMap.values()]
})

const filteredProjects = computed(() => {
  if (!projects.value) return []
  if (selectedService.value === 'all') {
    return projects.value
  }
  return projects.value.filter(
    p => p.service?.slug === selectedService.value,
  )
})

// --- Methods ---
const setService = (slug: string) => {
  selectedService.value = slug
}

// Custom Grid Logic
const getGridClass = (index: number) => {
  if (selectedService.value !== 'all') return 'md:col-span-1'
  if (index === 0 || index === 3) return 'md:col-span-2'
  return 'md:col-span-1'
}

const getProjectImage = (project: Project) => {
  const thumbnail = project.images?.find(
    (img: ProjectImage) => img.is_thumbnail,
  )
  return (
    thumbnail?.image_path
    || project.service?.image_path
    || '/images/placeholder-project.jpg'
  )
}
</script>

<template>
  <main class="min-h-screen bg-background relative overflow-hidden">
    <!-- ============================================ -->
    <!-- HERO SECTION -->
    <!-- ============================================ -->
    <section
      class="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden"
    >
      <div class="absolute inset-0 w-full h-full">
        <ClientOnly>
          <Sparkles
            :key="$colorMode.value"
            background="transparent"
            :min-size="0.6"
            :max-size="1.4"
            :particle-density="100"
            class="w-full h-full"
            :particle-color="
              $colorMode.value === 'dark' ? '#FFFFFF' : '#000000'
            "
          />
        </ClientOnly>
      </div>

      <div class="relative z-10 text-center px-6">
        <h1
          class="text-3xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50 mb-6"
        >
          FEATURED <span class="text-primary">WORKS</span>
        </h1>
        <div class="max-w-2xl mx-auto">
          <TextGenerateEffect
            words="Karya terbaik kami yang memadukan estetika desain dan performa teknologi tinggi."
            class="text-base md:text-xl text-muted-foreground font-light leading-relaxed"
            :duration="0.3"
          />
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- FILTER & GRID -->
    <!-- ============================================ -->
    <section class="container max-w-7xl mx-auto px-6 pb-32 relative z-10">
      <!-- Loading State -->
      <div
        v-if="pending"
        class="flex justify-center py-20"
      >
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
        />
      </div>

      <template v-else-if="projects && projects.length > 0">
        <!-- Service Filter -->
        <div class="flex flex-wrap justify-center gap-2 mb-12">
          <Button
            v-for="svc in services"
            :key="svc.slug"
            :variant="selectedService === svc.slug ? 'default' : 'outline'"
            size="sm"
            class="rounded-full px-6 transition-all duration-300"
            @click="setService(svc.slug)"
          >
            {{ svc.name }}
          </Button>
        </div>

        <!-- Bento Grid -->
        <div
          class="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[25rem]"
        >
          <BentoGridItem
            v-for="(item, i) in filteredProjects"
            :key="item.id"
            :class="getGridClass(i)"
          >
            <template #header>
              <div
                class="flex flex-1 w-full h-full min-h-40 rounded-xl bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 border border-transparent dark:border-white/20 overflow-hidden relative group"
              >
                <!-- Image with Zoom Effect -->
                <NuxtImg
                  :src="getProjectImage(item)"
                  :alt="item.title"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div
                  class="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"
                />

                <!-- Overlay Content -->
                <div class="absolute bottom-0 left-0 p-4 w-full">
                  <div class="flex flex-wrap gap-2 mb-2">
                    <span
                      v-for="tech in item.technologies?.slice(0, 3)"
                      :key="tech.id"
                      class="text-[10px] bg-black/50 text-white px-2 py-1 rounded-full backdrop-blur-sm border border-white/10"
                    >
                      {{ tech.name }}
                    </span>
                  </div>
                </div>
              </div>
            </template>

            <template #icon>
              <!-- Optional Icon -->
            </template>

            <template #title>
              <span class="text-xl font-bold line-clamp-1">{{
                item.title
              }}</span>
            </template>

            <template #description>
              <div class="flex flex-col gap-4 h-full justify-between">
                <span
                  class="text-neutral-500 dark:text-neutral-300 text-sm leading-relaxed line-clamp-2"
                >
                  {{ item.description }}
                </span>
                <div class="flex items-center justify-between mt-auto">
                  <span class="text-xs font-medium text-muted-foreground">{{
                    item.client?.name
                  }}</span>
                  <NuxtLink
                    :to="`/portofolio/${item.slug}`"
                    class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Detail
                    <ArrowRight class="w-4 h-4" />
                  </NuxtLink>
                </div>
              </div>
            </template>
          </BentoGridItem>
        </div>

        <!-- Privacy Disclaimer -->
        <div class="mt-16 text-center max-w-2xl mx-auto space-y-4">
          <p class="text-muted-foreground text-sm leading-relaxed italic">
            "Masih banyak proyek strategis lainnya yang telah dikerjakan oleh
            <span class="font-medium text-foreground">Denis Djodian Ardika</span>
            dan tim <span class="font-medium text-foreground">Sarando</span>.
            Karena kebijakan privasi klien dan
            <span class="font-medium text-foreground">Non-Disclosure Agreements (NDA)</span>, detail proyek tersebut tidak dapat kami publikasikan secara
            terbuka."
          </p>
        </div>
      </template>

      <div
        v-else
        class="text-center py-20 text-muted-foreground"
      >
        Belum ada proyek yang ditampilkan.
      </div>
    </section>
  </main>
</template>
