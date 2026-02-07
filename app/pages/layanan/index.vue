<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { BentoGridItem } from '@/components/ui/bento-grid'
import { Sparkles } from '@/components/ui/sparkles'
import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { Button } from '@/components/ui/button'

useHead({ title: 'Layanan' })
useSeoMeta({
  description:
    'Jelajahi layanan digital premium dari Sarando. Solusi komprehensif untuk kebutuhan digital bisnis Anda.',
  ogTitle: 'Layanan - Sarando',
  ogDescription:
    'Jelajahi layanan digital premium dari Sarando. Solusi komprehensif untuk kebutuhan digital bisnis Anda.',
  ogImage: 'https://sarando.site/images/logo/og-default.png',
  ogUrl: 'https://sarando.site/layanan',
  twitterCard: 'summary_large_image',
})

defineOgImage({ url: '/images/logo/og-default.png' })

useSchemaOrg([
  defineWebPage({
    '@type': 'CollectionPage',
    'name': 'Layanan Digital - Sarando',
    'description': 'Jelajahi layanan digital premium dari Sarando. Solusi komprehensif untuk kebutuhan digital bisnis Anda.',
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Beranda', item: '/' },
      { name: 'Layanan' },
    ],
  }),
])

// --- Data dari API ---
const { data: services, pending } = await useServices()

// --- State ---
const selectedCategory = ref<string | number>('all')

// --- Computed ---
const categories = computed(() => {
  if (!services.value) return [{ name: 'Semua', slug: 'all' }]

  const uniqueMap = new Map<number, { name: string, slug: number }>()
  for (const s of services.value) {
    if (!uniqueMap.has(s.category_id)) {
      uniqueMap.set(s.category_id, {
        name: s.category_name ?? 'Other',
        slug: s.category_id,
      })
    }
  }

  return [
    { name: 'Semua', slug: 'all' as string | number },
    ...uniqueMap.values(),
  ]
})

const filteredServices = computed(() => {
  if (!services.value) return []
  if (selectedCategory.value === 'all') {
    return services.value
  }
  return services.value.filter(
    service => service.category_id === selectedCategory.value,
  )
})

// --- Methods ---
const setCategory = (id: string | number) => {
  selectedCategory.value = id
}

// Grid Class Logic for Asymmetry
const getGridClass = (index: number) => {
  if (selectedCategory.value !== 'all') return 'md:col-span-1'

  if (index === 0 || index === 3) return 'md:col-span-2'
  return 'md:col-span-1'
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
          DIGITAL <span class="text-primary">SOLUTIONS</span>
        </h1>
        <div class="max-w-2xl mx-auto">
          <TextGenerateEffect
            words="Mengubah ide abstrak menjadi realitas digital yang presisi. Kami menyediakan ekosistem teknologi lengkap untuk pertumbuhan bisnis Anda."
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

      <template v-else-if="services && services.length > 0">
        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-2 mb-12">
          <Button
            v-for="cat in categories"
            :key="cat.slug"
            :variant="selectedCategory === cat.slug ? 'default' : 'outline'"
            size="sm"
            class="rounded-full px-6 transition-all duration-300"
            @click="setCategory(cat.slug)"
          >
            {{ cat.name }}
          </Button>
        </div>

        <!-- Bento Grid -->
        <div
          class="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[25rem]"
        >
          <BentoGridItem
            v-for="(item, i) in filteredServices"
            :key="item.id"
            :class="getGridClass(i)"
          >
            <template #header>
              <div
                class="flex flex-1 w-full h-full min-h-40 rounded-xl bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 border border-transparent dark:border-white/20 overflow-hidden relative group"
              >
                <NuxtImg
                  :src="getImageUrl(item.image_path, 800, 600)"
                  :alt="item.name"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div
                  class="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"
                />
              </div>
            </template>

            <template #icon>
              <Icon
                :name="item.icon?.toLowerCase() || 'lucide:globe'"
                class="h-6 w-6 text-primary mb-2"
              />
            </template>

            <template #title>
              <span class="text-xl font-bold">{{ item.name }}</span>
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
                    item.category_name ?? "Layanan"
                  }}</span>
                  <NuxtLink
                    :to="`/layanan/${item.slug}`"
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
      </template>
    </section>
  </main>
</template>
