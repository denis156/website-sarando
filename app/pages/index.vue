<script setup lang="ts">
import { Sparkles, ArrowDown, ArrowRight } from 'lucide-vue-next'
import {
  AppleCardCarousel,
  AppleCard,
} from '@/components/ui/apple-card-carousel'
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials'
import { CardSpotlight } from '@/components/ui/card-spotlight'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SCROLL_REVEAL_TEXT, TESTIMONIALS } from '@/constants'

const { data: services } = await useServices()

// Map API data ke format AppleCard
const carouselCards = computed(() => {
  if (!services.value) return []
  return services.value.map(service => ({
    src: getImageUrl(service.image_path),
    title: service.name,
    category: service.category_name ?? 'Layanan',
    description: service.description ?? '',
    slug: service.slug,
    prices: service.prices ?? [],
  }))
})

useHead({ title: 'Beranda' })
useSeoMeta({
  description: 'Sarando - Sarana Digital Anandonia. Merakit solusi digital berstandar global dengan jiwa kearifan lokal dari Konawe, Sulawesi Tenggara.',
  ogTitle: 'Beranda - Sarando',
  ogDescription: 'Sarando - Sarana Digital Anandonia. Merakit solusi digital berstandar global dengan jiwa kearifan lokal dari Konawe, Sulawesi Tenggara.',
  ogImage: 'https://sarando.site/images/logo/og-default.png',
  ogUrl: 'https://sarando.site/',
  twitterCard: 'summary_large_image',
})

defineOgImage({ url: '/images/logo/og-default.png' })

useSchemaOrg([
  defineWebPage({
    '@type': 'WebPage',
    'name': 'Beranda - Sarando',
    'description': 'Sarando - Sarana Digital Anandonia. Merakit solusi digital berstandar global dengan jiwa kearifan lokal dari Konawe, Sulawesi Tenggara.',
  }),
])
</script>

<template>
  <main
    class="flex flex-col min-h-screen selection:bg-primary/20 selection:text-primary"
  >
    <!-- ============================================ -->
    <!-- HERO SECTION: SARA + NDO -->
    <!-- ============================================ -->
    <section
      class="relative min-h-dvh flex flex-col justify-center items-center overflow-hidden px-6 py-24"
    >
      <!-- Background Elements -->
      <div
        class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50"
      />

      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.95 }"
        :enter="{
          opacity: 1,
          scale: 1,
          transition: { duration: 600 },
        }"
        class="container max-w-6xl mx-auto text-center z-10"
      >
        <h1
          class="text-[clamp(3rem,12vw,12rem)] font-black tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/40 select-none"
        >
          SARA<span class="text-primary">NDO</span>
        </h1>

        <div
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { delay: 300, duration: 500 },
          }"
          class="mt-8 md:mt-12 space-y-6 max-w-2xl mx-auto"
        >
          <p
            class="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed"
          >
            Merakit
            <span class="text-primary font-medium">Masa Depan</span>
            <br class="block md:hidden">
            dari
            <span class="text-primary font-medium">Akar Budaya</span>.
          </p>
          <p
            class="text-xs md:text-base text-muted-foreground/60 tracking-wider uppercase whitespace-nowrap"
          >
            Konawe, Sulawesi Tenggara &mdash; Est. 2026
          </p>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1, transition: { delay: 600, duration: 500 } }"
        class="absolute bottom-34 md:bottom-38 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
      >
        <span class="text-xs uppercase tracking-widest text-primary/80">Scroll</span>
        <ArrowDown class="w-5 h-5 animate-bounce text-primary/80" />
      </div>
    </section>

    <!-- ============================================ -->
    <!-- SCROLL REVEAL: ORIGIN STORY -->
    <!-- ============================================ -->
    <section class="relative z-10">
      <TextScrollReveal :text="SCROLL_REVEAL_TEXT" />
    </section>

    <!-- ============================================ -->
    <!-- CONTAINER SCROLL: SHOWCASE -->
    <!-- ============================================ -->
    <section class="relative z-10 -mt-24 md:-mt-48">
      <ContainerScroll>
        <template #title>
          <div class="flex flex-col items-center text-center mb-8">
            <span
              class="text-xl md:text-3xl font-medium text-muted-foreground mb-2 tracking-wide"
            >Kearifan Lokal &</span>
            <span
              class="text-4xl md:text-[6rem] font-black tracking-tighter leading-none mt-1 text-foreground"
            >
              INOVASI <span class="text-primary">GLOBAL</span>
            </span>
          </div>
        </template>

        <template #card>
          <div
            class="w-full h-full flex flex-col items-center justify-center p-4 md:p-8"
          >
            <!-- Logo Section -->
            <div
              class="relative w-24 h-24 md:w-40 md:h-40 mb-6 flex items-center justify-center"
            >
              <div
                class="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-50"
              />
              <NuxtImg
                src="/images/logo/submark-logo.png"
                alt="Sarando Logo"
                class="relative w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            <!-- Text Section -->
            <div class="text-center space-y-4 max-w-xl z-10">
              <h2
                class="text-2xl md:text-5xl font-bold leading-tight text-foreground"
              >
                Saatnya <span class="text-primary">Percaya</span> pada <br>
                Karya Putra Daerah
              </h2>
              <p
                class="text-sm md:text-lg text-muted-foreground leading-relaxed px-2"
              >
                "Kami membuktikan bahwa dedikasi dari tanah kelahiran mampu
                melahirkan inovasi berstandar global. Mari bangun masa depan
                bersama Sarando."
              </p>
            </div>

            <!-- Small Badge -->
            <div
              class="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full border border-border/50 text-xs md:text-sm text-muted-foreground font-medium backdrop-blur-sm"
            >
              <Sparkles class="w-3 h-3 md:w-4 md:h-4 text-primary" />
              <span>Karya Asli Konawe</span>
            </div>
          </div>
        </template>
      </ContainerScroll>
    </section>

    <!-- ============================================ -->
    <!-- SERVICES: THE "WHAT" -->
    <!-- ============================================ -->
    <section class="py-16 md:py-32 px-6">
      <div class="container max-w-7xl mx-auto">
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{
            opacity: 1,
            y: 0,
            transition: { duration: 500 },
          }"
          class="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-4 border-b border-border/40 pb-6"
        >
          <div>
            <span
              class="text-xs font-bold tracking-[0.2em] text-primary uppercase"
            >Ekspertise</span>
            <h3 class="text-3xl md:text-7xl font-black mt-4 tracking-tighter">
              Layanan<span class="text-muted-foreground/30">.</span>
            </h3>
          </div>
          <p
            class="text-muted-foreground/80 max-w-md text-left md:text-right text-lg font-light"
          >
            Pendekatan holistik untuk kebutuhan digital Anda. <br>Dari konsep
            hingga eksekusi presisi.
          </p>
        </div>

        <div class="w-full">
          <AppleCardCarousel v-if="carouselCards.length > 0">
            <AppleCard
              v-for="(card, index) in carouselCards"
              :key="index"
              :card="card"
              :index="index"
            >
              <div class="space-y-6">
                <NuxtImg
                  :src="card.src"
                  :alt="card.title"
                  class="w-1/2 mx-auto rounded-2xl object-contain"
                  loading="lazy"
                />
                <p class="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {{ card.description }}
                </p>
                <div
                  v-if="card.prices.length > 0"
                  class="flex flex-wrap gap-2 pt-4"
                >
                  <Badge
                    v-for="price in card.prices"
                    :key="price.id"
                    variant="secondary"
                    class="font-mono text-sm"
                  >
                    {{ price.package_name }}
                  </Badge>
                </div>
                <Button
                  as-child
                  size="sm"
                  class="mt-4"
                >
                  <NuxtLink :to="`/layanan/${card.slug}`">
                    Lihat Detail
                    <ArrowRight class="w-4 h-4" />
                  </NuxtLink>
                </Button>
              </div>
            </AppleCard>
          </AppleCardCarousel>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- TEAM: THE "WHO" -->
    <!-- ============================================ -->
    <section class="py-16 md:py-32 px-6">
      <div class="container max-w-7xl mx-auto">
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{
            opacity: 1,
            y: 0,
            transition: { duration: 500 },
          }"
          class="mb-12 text-center"
        >
          <span
            class="text-xs font-bold tracking-[0.2em] text-primary uppercase"
          >Our Team</span>
          <h3
            class="text-3xl md:text-6xl font-black leading-tight tracking-tight mt-4"
          >
            Inovasi Lahir dari <br>
            <span class="text-muted-foreground">Akar yang Kuat.</span>
          </h3>
        </div>

        <AnimatedTestimonials :testimonials="TESTIMONIALS" />
      </div>
    </section>

    <!-- ============================================ -->
    <!-- CTA: COLLAB -->
    <!-- ============================================ -->
    <section class="py-20 md:py-32 px-4 md:px-6">
      <div class="container max-w-7xl mx-auto">
        <CardSpotlight
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 500 } }"
          class="rounded-[40px]"
          slot-class="px-6 py-16 md:px-20 md:py-28 w-full"
          :gradient-size="200"
          gradient-color="oklch(0.89 0.12 96.5)"
          :gradient-opacity="0.3"
        >
          <div class="text-center space-y-6 md:space-y-8">
            <h3
              class="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none"
            >
              Kenali Potensi
              <span class="text-primary italic pr-2">Digital Anda.</span>
            </h3>
            <p
              class="max-w-2xl mx-auto text-sm md:text-lg text-muted-foreground font-light leading-relaxed px-4"
            >
              Dari pengembangan sistem hingga strategi branding, kami punya
              solusi yang Anda butuhkan. <br class="hidden md:block">
              Pelajari bagaimana kami dapat membantu bisnis Anda tumbuh.
            </p>

            <div
              class="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 pt-4 md:pt-6"
            >
              <Button
                as-child
                size="lg"
                class="group rounded-full px-6 py-6 md:px-8 text-sm md:text-lg font-bold"
              >
                <NuxtLink to="/layanan">
                  Jelajahi Layanan
                  <ArrowRight
                    class="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-1"
                  />
                </NuxtLink>
              </Button>
              <div class="hidden md:block w-px h-10 bg-border" />
              <Button
                as-child
                variant="link"
                class="text-sm md:text-lg font-medium text-muted-foreground"
              >
                <NuxtLink to="/kontak">
                  Diskusikan Proyek
                </NuxtLink>
              </Button>
            </div>
          </div>
        </CardSpotlight>
      </div>
    </section>
  </main>
</template>
