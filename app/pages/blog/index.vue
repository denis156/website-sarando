<script setup lang="ts">
useHead({ title: 'Blog' })
useSeoMeta({
  description: 'Artikel, tips, dan berita terbaru seputar teknologi digital dari Sarando.',
  ogTitle: 'Blog - Sarando',
  ogDescription: 'Artikel, tips, dan berita terbaru seputar teknologi digital dari Sarando.',
  ogImage: 'https://sarando.site/images/logo/og-default.png',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="flex-1 flex flex-col px-6">
    <!-- Section 1 -->
    <section class="min-h-dvh flex flex-col justify-center pt-20">
      <h1 class="text-3xl md:text-4xl font-bold tracking-tight">
        Blog
      </h1>
      <p class="mt-4 text-lg text-muted-foreground">
        Artikel dan berita terbaru.
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
