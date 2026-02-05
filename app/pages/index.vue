<script setup lang="ts">
import { Sparkles, ArrowDown, ArrowRight } from "lucide-vue-next";
import {
  AppleCardCarousel,
  AppleCard,
} from "@/components/ui/apple-card-carousel";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { SCROLL_REVEAL_TEXT, CAROUSEL_CARDS, TESTIMONIALS } from "@/constants";

useHead({
  title: "Sarando - Merakit Masa Depan",
  meta: [
    {
      name: "description",
      content:
        "Web Development & Digital Solutions dari Konawe, Sulawesi Tenggara.",
    },
  ],
});
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
      ></div>

      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.9 }"
        :enter="{
          opacity: 1,
          scale: 1,
          transition: { duration: 1000, type: 'spring' },
        }"
        class="container max-w-6xl mx-auto text-center z-10"
      >
        <h1
          class="text-[clamp(4rem,15vw,12rem)] font-black tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-linear-to-b from-foreground to-foreground/40 select-none"
        >
          SARA<span class="text-primary">NDO</span>
        </h1>

        <div
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{
            opacity: 1,
            y: 0,
            transition: { delay: 400, duration: 800 },
          }"
          class="mt-8 md:mt-12 space-y-6 max-w-2xl mx-auto"
        >
          <p
            class="text-xl md:text-2xl font-light text-muted-foreground leading-relaxed"
          >
            Merakit
            <span class="text-primary font-medium">Masa Depan</span>
            <br class="block md:hidden" />
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
        :enter="{ opacity: 1, transition: { delay: 1000, duration: 1000 } }"
        class="absolute bottom-34 md:bottom-38 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
      >
        <span class="text-xs uppercase tracking-widest text-primary/80"
          >Scroll</span
        >
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
              >Kearifan Lokal &</span
            >
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
              ></div>
              <img
                src="/images/logo/submark-logo.png"
                alt="Sarando Logo"
                class="relative w-full h-full object-contain"
              />
            </div>

            <!-- Text Section -->
            <div class="text-center space-y-4 max-w-xl z-10">
              <h3
                class="text-2xl md:text-5xl font-bold leading-tight text-foreground"
              >
                Saatnya <span class="text-primary">Percaya</span> pada <br />
                Karya Putra Daerah
              </h3>
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
    <section class="py-32 px-6">
      <div class="container max-w-7xl mx-auto">
        <div
          v-motion-slide-visible-once-bottom
          class="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-4 border-b border-border/40 pb-6"
        >
          <div>
            <span
              class="text-xs font-bold tracking-[0.2em] text-primary uppercase"
              >Ekspertise</span
            >
            <h2 class="text-4xl md:text-7xl font-black mt-4 tracking-tighter">
              Layanan<span class="text-muted-foreground/30">.</span>
            </h2>
          </div>
          <p
            class="text-muted-foreground/80 max-w-md text-left md:text-right text-lg font-light"
          >
            Pendekatan holistik untuk kebutuhan digital Anda. <br />Dari konsep
            hingga eksekusi presisi.
          </p>
        </div>

        <div class="w-full">
          <AppleCardCarousel>
            <AppleCard
              v-for="(card, index) in CAROUSEL_CARDS"
              :key="index"
              :card="card"
              :index="index"
            >
              <div class="space-y-6">
                <h3 class="text-2xl font-bold text-foreground">
                  {{ card.headline }}
                </h3>
                <p class="text-muted-foreground leading-relaxed text-lg">
                  {{ card.description }}
                </p>
                <div class="flex flex-wrap gap-2 pt-4">
                  <Badge
                    v-for="tag in card.tags"
                    :key="tag"
                    variant="secondary"
                    class="font-mono text-sm"
                  >
                    {{ tag }}
                  </Badge>
                </div>
              </div>
            </AppleCard>
          </AppleCardCarousel>
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- TEAM: THE "WHO" -->
    <!-- ============================================ -->
    <section class="py-32 px-6">
      <div class="container max-w-7xl mx-auto">
        <div v-motion-slide-visible-once-bottom class="mb-12 text-center">
          <span
            class="text-xs font-bold tracking-[0.2em] text-primary uppercase"
            >Our Team</span
          >
          <h2
            class="text-4xl md:text-6xl font-black leading-tight tracking-tight mt-4"
          >
            Inovasi Lahir dari <br />
            <span class="text-muted-foreground">Akar yang Kuat.</span>
          </h2>
        </div>

        <AnimatedTestimonials :testimonials="TESTIMONIALS" />
      </div>
    </section>

    <!-- ============================================ -->
    <!-- CTA: COLLAB -->
    <!-- ============================================ -->
    <section class="py-20 md:py-32 px-4 md:px-6">
      <div class="container max-w-7xl mx-auto">
        <div
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 800 } }"
          class="relative w-full overflow-hidden rounded-[40px] bg-white dark:bg-muted/30 border px-6 py-16 md:px-20 md:py-28 text-center"
        >
          <!-- Background Glow -->
          <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-50 h-50 md:w-125 md:h-125 bg-secondary/60 dark:bg-secondary/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"
          ></div>

          <div class="relative z-10 space-y-6 md:space-y-8">
            <h2
              class="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none"
            >
              Kenali Potensi
              <span class="text-primary italic pr-2">Digital Anda.</span>
            </h2>
            <p
              class="max-w-2xl mx-auto text-sm md:text-lg text-muted-foreground font-light leading-relaxed px-4"
            >
              Dari pengembangan sistem hingga strategi branding, kami punya
              solusi yang Anda butuhkan. <br class="hidden md:block" />
              Pelajari bagaimana kami dapat membantu bisnis Anda tumbuh.
            </p>

            <div
              class="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 pt-4 md:pt-6"
            >
              <NuxtLink
                to="/layanan"
                class="group relative inline-flex items-center px-6 py-3 text-sm md:px-8 md:py-4 md:text-lg font-bold overflow-hidden rounded-full bg-foreground text-background transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/25"
              >
                <span>Jelajahi Layanan</span>
                <ArrowRight
                  class="w-4 h-4 md:w-5 md:h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1"
                />
              </NuxtLink>
              <div class="hidden md:block w-px h-10 bg-border"></div>
              <NuxtLink
                to="/kontak"
                class="text-sm md:text-lg font-medium text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
              >
                Diskusikan Proyek
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
