<script setup lang="ts">
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Layers,
  Calendar,
  User,
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BoxReveal } from '@/components/ui/box-reveal'
import { Meteors } from '@/components/ui/meteors'
import {
  AppleCardCarousel,
  AppleCard,
} from '@/components/ui/apple-card-carousel'

const route = useRoute()
const slug = route.params.slug as string
const { data: project, pending } = await useProject(slug)

useHead({
  title: computed(() =>
    project.value ? project.value.title : 'Proyek Tidak Ditemukan',
  ),
})

useSeoMeta({
  description: computed(
    () => project.value?.description ?? 'Detail proyek Sarando',
  ),
  ogTitle: computed(() =>
    project.value ? `${project.value.title} - Sarando` : 'Proyek - Sarando',
  ),
  ogDescription: computed(
    () => project.value?.description ?? 'Detail proyek Sarando',
  ),
  ogImage: computed(
    () =>
      project.value?.images?.find(i => i.is_thumbnail)?.image_path
      ?? 'https://sarando.site/images/logo/og-default.png',
  ),
  twitterCard: 'summary_large_image',
})

// Utility
const formatDate = (dateString: string | null) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric',
  })
}

// Carousel Cards Data
const carouselCards = computed(() => {
  if (!project.value?.images) return []

  const images
    = project.value.images.length > 1
      ? project.value.images.filter(i => !i.is_thumbnail)
      : project.value.images

  return images.map((img, index) => ({
    src: img.image_path,
    title: img.title || project.value?.title || `Project Image ${index + 1}`,
    category: 'Gallery',
    id: img.id,
  }))
})
</script>

<template>
  <main class="min-h-screen bg-background pb-20 overflow-x-hidden">
    <!-- Loading State -->
    <div
      v-if="pending"
      class="flex items-center justify-center min-h-[50vh]"
    >
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
      />
    </div>

    <!-- 404 Case -->
    <div
      v-else-if="!project"
      class="flex flex-col items-center justify-center min-h-[50vh]"
    >
      <h1 class="text-2xl font-bold">
        Proyek tidak ditemukan
      </h1>
      <Button
        as-child
        class="mt-4"
      >
        <NuxtLink to="/portofolio">Kembali ke Portofolio</NuxtLink>
      </Button>
    </div>

    <template v-else>
      <div class="container max-w-7xl mx-auto px-6">
        <section
          class="min-h-dvh flex flex-col justify-center pt-24 lg:pt-32 pb-12 lg:pb-20"
        >
          <!-- Back Link -->
          <NuxtLink
            to="/portofolio"
            class="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 lg:mb-8 group"
          >
            <ArrowLeft
              class="w-4 h-4 transition-transform group-hover:-translate-x-1"
            />
            <span class="text-sm font-medium">Kembali ke Portofolio</span>
          </NuxtLink>

          <!-- HERO SECTION (Grid Layout) -->
          <div
            class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-12 lg:mb-20"
          >
            <!-- HERO TEXT -->
            <div class="space-y-6">
              <BoxReveal :duration="0.5">
                <div class="flex flex-wrap gap-2 mb-4">
                  <Badge
                    variant="secondary"
                    class="rounded-full"
                  >
                    {{ project.service?.name }}
                  </Badge>
                  <Badge
                    v-if="project.status === 'completed'"
                    variant="outline"
                    class="border-green-500/50 text-green-500 rounded-full"
                  >
                    Completed
                  </Badge>
                </div>
              </BoxReveal>

              <BoxReveal :duration="0.6">
                <h1
                  class="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.1]"
                >
                  {{ project.title }}
                </h1>
              </BoxReveal>

              <BoxReveal :duration="0.7">
                <p class="text-lg text-muted-foreground leading-relaxed">
                  {{ project.description }}
                </p>
              </BoxReveal>
            </div>

            <!-- MAIN IMAGE -->
            <div
              v-motion-fade-visible-once
              class="relative w-full aspect-4/3 lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border border-border/50 group"
            >
              <div
                class="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                :style="{
                  backgroundImage: `url(${project.images?.find((i) => i.is_thumbnail)?.image_path || project.service?.image_path})`,
                }"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-60"
              />
            </div>
          </div>
        </section>

        <!-- CONTENT GRID -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <!-- Left: Story / Content -->
          <div class="lg:col-span-8 space-y-12">
            <div
              v-if="project.content"
              class="prose prose-lg dark:prose-invert max-w-none"
            >
              <MDC :value="project.content" />
            </div>
            <div
              v-else
              class="text-muted-foreground italic"
            >
              Deskripsi detail proyek belum tersedia.
            </div>

            <!-- Gallery Carousel if more images exist -->
            <div
              v-if="project.images && project.images.length > 1"
              class="w-full py-10"
            >
              <h3 class="text-2xl font-bold mb-4">
                Galeri Proyek
              </h3>
              <AppleCardCarousel>
                <AppleCard
                  v-for="(card, index) in carouselCards"
                  :key="card.id"
                  :card="card"
                  :index="index"
                >
                  <div class="flex flex-col items-center justify-center">
                    <NuxtImg
                      :src="card.src"
                      :alt="card.title"
                      class="rounded-xl w-auto h-auto max-h-[70vh] object-contain shadow-md mx-auto"
                    />
                  </div>
                </AppleCard>
              </AppleCardCarousel>
            </div>
          </div>

          <!-- Right: Metadata Sidebar -->
          <div class="lg:col-span-4 space-y-8">
            <!-- Project Info Card -->
            <div
              class="p-6 rounded-3xl border border-border/50 bg-muted/20 backdrop-blur-sm space-y-6"
            >
              <h3 class="font-bold text-xl flex items-center gap-2">
                <Layers class="w-5 h-5 text-primary" />
                Informasi Proyek
              </h3>

              <div class="space-y-4">
                <div class="flex flex-col gap-1">
                  <span
                    class="text-sm text-muted-foreground flex items-center gap-2"
                  >
                    <User class="w-3 h-3" /> Klien
                  </span>
                  <span class="font-medium">{{
                    project.client?.name || "Confidential"
                  }}</span>
                </div>

                <div class="flex flex-col gap-1">
                  <span
                    class="text-sm text-muted-foreground flex items-center gap-2"
                  >
                    <Calendar class="w-3 h-3" /> Waktu Pengerjaan
                  </span>
                  <span class="font-medium">
                    {{ formatDate(project.started_at) }} -
                    {{ formatDate(project.completed_at) }}
                  </span>
                </div>
              </div>

              <div class="pt-4 border-t border-border/50 flex flex-col gap-3">
                <Button
                  v-if="project.project_url"
                  as-child
                  class="w-full"
                >
                  <a
                    :href="project.project_url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Kunjungi Website <ExternalLink class="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <div
                  v-else
                  class="w-full p-3 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/30 text-muted-foreground text-sm text-center flex items-center justify-center gap-2 cursor-not-allowed opacity-80"
                >
                  <Lock class="w-4 h-4" />
                  <span>Aplikasi Privat / Internal</span>
                </div>
                <Button
                  v-if="project.repository_url"
                  variant="outline"
                  as-child
                  class="w-full"
                >
                  <a
                    :href="project.repository_url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lihat Repository <Github class="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>

            <!-- Tech Stack Card with Meteors -->
            <div
              class="relative overflow-hidden rounded-3xl border border-border/50 bg-background p-6 shadow-lg"
            >
              <div class="absolute inset-0 h-full w-full overflow-hidden">
                <ClientOnly>
                  <Meteors :count="10" />
                </ClientOnly>
              </div>
              <div class="relative z-10">
                <h3 class="font-bold text-xl mb-6">
                  Teknologi
                </h3>
                <div class="flex flex-wrap gap-2">
                  <div
                    v-for="tech in project.technologies"
                    :key="tech.id"
                    class="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/80 border border-border/50 backdrop-blur-sm shadow-sm"
                  >
                    <Icon
                      :name="tech.icon || 'lucide:code'"
                      class="w-5 h-5"
                    />
                    <span class="text-sm font-medium">{{ tech.name }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- CTA Card -->
            <div
              class="rounded-3xl bg-primary text-primary-foreground p-8 text-center space-y-4 relative overflow-hidden group"
            >
              <div
                class="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-colors"
              />
              <h3 class="font-bold text-2xl relative z-10">
                Punya Ide Serupa?
              </h3>
              <p class="text-primary-foreground/80 text-sm relative z-10">
                Kami siap membantu mewujudkan visi digital Anda menjadi
                kenyataan.
              </p>
              <Button
                variant="secondary"
                class="w-full relative z-10 font-bold"
                as-child
              >
                <NuxtLink to="/kontak">Konsultasi Gratis</NuxtLink>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>
