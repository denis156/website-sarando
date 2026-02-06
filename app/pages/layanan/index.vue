<script setup lang="ts">
import {
  Globe,
  Smartphone,
  Palette,
  BotMessageSquare,
  TrendingUp,
  ArrowRight,
} from "lucide-vue-next";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Sparkles } from "@/components/ui/sparkles";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/constants/services";

useHead({
  title: "Layanan - Solusi Digital Komprehensif",
  meta: [
    {
      name: "description",
      content: "Jelajahi layanan digital premium dari Sarando.",
    },
  ],
});

// --- State ---
const selectedCategory = ref("all");

// --- Computed ---
const categories = computed(() => {
  // Extract and sanitize categories
  const allCategories = SERVICES.map((s) => ({
    name: s.category_name ?? "Other",
    slug: s.category_slug ?? "other",
  }));

  // Create unique map
  const uniqueMap = new Map();
  allCategories.forEach((cat) => {
    if (!uniqueMap.has(cat.slug)) {
      uniqueMap.set(cat.slug, cat);
    }
  });

  // Return All + Unique Categories
  return [{ name: "All", slug: "all" }, ...uniqueMap.values()];
});

const filteredServices = computed(() => {
  if (selectedCategory.value === "all") {
    return SERVICES;
  }
  return SERVICES.filter(
    (service) => service.category_slug === selectedCategory.value,
  );
});

// --- Methods ---
const setCategory = (slug: string) => {
  selectedCategory.value = slug;
};

// Icon Mapping
const getIcon = (iconName: string | null) => {
  switch (iconName) {
    case "Globe":
      return Globe;
    case "Smartphone":
      return Smartphone;
    case "Palette":
      return Palette;
    case "BotMessageSquare":
      return BotMessageSquare;
    case "TrendingUp":
      return TrendingUp;
    default:
      return Globe;
  }
};

// Grid Class Logic for Asymmetry
const getGridClass = (index: number) => {
  // Only apply asymmetry if showing all services, otherwise keep it uniform
  if (selectedCategory.value !== "all") return "md:col-span-1";

  if (index === 0 || index === 3) return "md:col-span-2";
  return "md:col-span-1";
};
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
          class="text-4xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 mb-6"
        >
          DIGITAL <span class="text-primary">SOLUTIONS</span>
        </h1>
        <div class="max-w-2xl mx-auto">
          <TextGenerateEffect
            words="Mengubah ide abstrak menjadi realitas digital yang presisi. Kami menyediakan ekosistem teknologi lengkap untuk pertumbuhan bisnis Anda."
            class="text-lg md:text-xl text-muted-foreground font-light leading-relaxed"
            :duration="0.3"
          />
        </div>
      </div>
    </section>

    <!-- ============================================ -->
    <!-- FILTER & GRID -->
    <!-- ============================================ -->
    <section class="container max-w-7xl mx-auto px-6 pb-32 relative z-10">
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
        class="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[20rem]"
      >
        <BentoGridItem
          v-for="(item, i) in filteredServices"
          :key="item.id"
          :class="getGridClass(i)"
        >
          <template #header>
            <div
              class="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 border border-transparent dark:border-white/[0.2] overflow-hidden relative"
            >
              <!-- Optional: Background Image Overlay -->
              <div
                v-if="item.image_path"
                class="absolute inset-0 opacity-20 bg-cover bg-center"
                :style="{ backgroundImage: `url(${item.image_path})` }"
              ></div>
            </div>
          </template>

          <template #icon>
            <component
              :is="getIcon(item.icon)"
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
              <NuxtLink
                :to="`/layanan/${item.slug}`"
                class="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-auto"
              >
                Lihat Detail
                <ArrowRight class="w-4 h-4" />
              </NuxtLink>
            </div>
          </template>
        </BentoGridItem>
      </div>
    </section>
  </main>
</template>
