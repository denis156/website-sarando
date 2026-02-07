<script setup lang="ts">
import { ArrowLeft, CheckCircle2, BotMessageSquare } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BoxReveal } from '@/components/ui/box-reveal'
import { Meteors } from '@/components/ui/meteors'

const route = useRoute()
const slug = route.params.slug as string

// Fetch service dari API
const { data: service, pending } = await useService(slug)

useHead({
  title: computed(() =>
    service.value ? service.value.name : 'Layanan Tidak Ditemukan',
  ),
})
useSeoMeta({
  description: computed(
    () => service.value?.description ?? 'Detail layanan Sarando',
  ),
  ogTitle: computed(() =>
    service.value ? `${service.value.name} - Sarando` : 'Layanan - Sarando',
  ),
  ogDescription: computed(
    () => service.value?.description ?? 'Detail layanan Sarando',
  ),
  ogImage: computed(
    () =>
      service.value?.image_path
      ?? 'https://sarando.site/images/logo/og-default.png',
  ),
  twitterCard: 'summary_large_image',
})

defineOgImage({
  url: service.value?.image_path || '/images/logo/og-default.png',
})

useSchemaOrg([
  defineWebPage({
    name: computed(() => service.value ? `${service.value.name} - Sarando` : 'Layanan - Sarando'),
    description: computed(() => service.value?.description ?? 'Detail layanan Sarando'),
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Beranda', item: '/' },
      { name: 'Layanan', item: '/layanan' },
      { name: computed(() => service.value?.name ?? 'Detail') },
    ],
  }),
])

// Smooth Scroll Handler
const scrollToPricing = () => {
  const element = document.getElementById('harga')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<template>
  <main class="min-h-screen bg-background pb-20">
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
      v-else-if="!service"
      class="flex flex-col items-center justify-center min-h-[50vh]"
    >
      <h1 class="text-2xl font-bold">
        Layanan tidak ditemukan
      </h1>
      <Button
        as-child
        class="mt-4"
      >
        <NuxtLink to="/layanan"> Kembali ke Layanan </NuxtLink>
      </Button>
    </div>

    <div
      v-else
      class="container max-w-7xl mx-auto px-6"
    >
      <!-- HERO SECTION -->
      <section
        class="min-h-dvh flex flex-col justify-center pt-24 lg:pt-32 pb-12 lg:pb-20"
      >
        <!-- Header / Breadcrumb -->
        <NuxtLink
          to="/layanan"
          class="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 lg:mb-8 group w-fit"
        >
          <ArrowLeft
            class="w-4 h-4 transition-transform group-hover:-translate-x-1"
          />
          <span class="text-sm font-medium">Kembali ke Daftar Layanan</span>
        </NuxtLink>

        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center"
        >
          <div class="space-y-6">
            <BoxReveal :duration="0.7">
              <Badge
                variant="outline"
                class="px-3 py-1 text-sm border-primary/20 text-primary bg-primary/10"
              >
                {{ service.category_name }}
              </Badge>
            </BoxReveal>

            <BoxReveal :duration="0.7">
              <h1
                class="text-4xl md:text-6xl font-black tracking-tight leading-tight"
              >
                {{ service.name }}
              </h1>
            </BoxReveal>

            <BoxReveal :duration="0.7">
              <p
                class="text-lg md:text-xl text-muted-foreground leading-relaxed"
              >
                {{ service.description }}
              </p>
            </BoxReveal>

            <div class="flex items-center gap-4 pt-4">
              <Button
                size="lg"
                class="px-8"
                @click="scrollToPricing"
              >
                Lihat Paket
              </Button>
              <Button
                variant="link"
                size="lg"
                class="font-medium text-muted-foreground"
                as-child
              >
                <NuxtLink to="/kontak"> Konsultasi Gratis </NuxtLink>
              </Button>
            </div>
          </div>

          <!-- Hero Image / Visual -->
          <div
            v-motion-fade-visible-once
            class="relative aspect-4/3 lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border border-border/50"
          >
            <NuxtImg
              :src="getImageUrl(service.image_path)"
              :alt="service.name"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute inset-0 bg-linear-to-t from-background/38 to-transparent"
            />
          </div>
        </div>
      </section>

      <!-- Pricing Plans -->
      <section
        id="harga"
        class="scroll-mt-24 py-24"
      >
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Pilihan Paket
          </h2>
          <p class="text-muted-foreground max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan skala bisnis dan kebutuhan spesifik
            Anda. Transparan, tanpa biaya tersembunyi.
          </p>
        </div>

        <div
          v-if="service.prices && service.prices.length > 0"
          class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          <div
            v-for="(plan, index) in service.prices"
            :key="plan.id"
            class="relative flex flex-col h-full border border-border/50 bg-background/50 dark:bg-black/40 rounded-2xl overflow-hidden shadow-sm hover:border-border transition-colors duration-300"
          >
            <!-- Meteors Effect -->
            <div class="absolute inset-0 h-full w-full overflow-hidden">
              <ClientOnly>
                <Meteors :count="8" />
              </ClientOnly>
            </div>

            <div class="p-5 md:p-8 flex flex-col h-full relative z-20">
              <h3 class="text-xl font-bold mb-2">
                {{ plan.package_name }}
              </h3>
              <div class="text-2xl md:text-3xl font-black mb-1">
                {{ formatRupiah(plan.price) }}
              </div>
              <p class="text-sm text-muted-foreground mb-8">
                {{ plan.description }}
              </p>

              <div class="space-y-4 flex-1 mb-8">
                <div
                  v-for="(feature, idx) in plan.features"
                  :key="idx"
                  class="flex items-start gap-3"
                >
                  <CheckCircle2 class="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span class="text-sm text-muted-foreground/90">{{
                    feature
                  }}</span>
                </div>
              </div>

              <Button
                :variant="index === 1 ? 'default' : 'outline'"
                class="w-full"
                as-child
              >
                <NuxtLink to="/kontak"> Pilih Paket </NuxtLink>
              </Button>
            </div>
          </div>
        </div>

        <!-- Empty State for Pricing -->
        <div
          v-else
          class="text-center py-20 border border-dashed border-border rounded-3xl bg-muted/30"
        >
          <BotMessageSquare
            class="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50"
          />
          <h3 class="text-xl font-medium mb-2">
            Harga Bersifat Custom
          </h3>
          <p class="text-muted-foreground mb-6 max-w-md mx-auto">
            Layanan ini membutuhkan estimasi khusus berdasarkan kompleksitas
            proyek. Silakan hubungi kami untuk penawaran.
          </p>
          <Button as-child>
            <NuxtLink to="/kontak"> Hubungi Tim Kami </NuxtLink>
          </Button>
        </div>
      </section>
    </div>
  </main>
</template>
