<script setup lang="ts">
useHead({ title: 'Portofolio' })
useSeoMeta({
  description: 'Lihat portofolio proyek digital yang telah dikerjakan oleh Sarando.',
  ogTitle: 'Portofolio - Sarando',
  ogDescription: 'Lihat portofolio proyek digital yang telah dikerjakan oleh Sarando.',
  ogImage: 'https://sarando.site/og-default.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="flex-1 flex flex-col">
    <!-- Section 1 -->
    <section class="min-h-dvh flex flex-col justify-center">
      <h1 class="text-4xl font-bold tracking-tight">
        Portofolio
      </h1>
      <p class="mt-4 text-lg text-muted-foreground">
        Halaman portofolio kami.
      </p>
    </section>

    <!-- Section 2 -->
    <section class="py-16">
      <h2 class="text-3xl font-bold tracking-tight">
        Section 2
      </h2>
    </section>
  </div>
</template>
