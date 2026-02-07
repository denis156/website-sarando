<script setup lang="ts">
const route = useRoute()
useHead({ title: String(route.params.slug).replace(/-/g, ' ') })
</script>

<template>
  <div class="flex-1 flex flex-col px-6">
    <!-- Section 1 -->
    <section class="min-h-dvh flex flex-col justify-center pt-20">
      <NuxtLink
        to="/blog"
        class="text-sm text-muted-foreground hover:text-foreground"
      >&larr; Kembali ke Blog</NuxtLink>
      <h1 class="mt-6 text-3xl md:text-4xl font-bold tracking-tight capitalize">
        {{ route.params.slug }}
      </h1>
      <p class="mt-4 text-lg text-muted-foreground">
        Detail artikel.
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
