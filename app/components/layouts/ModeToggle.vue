<script setup lang="ts">
const colorMode = useColorMode()

function toggleMode() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <ClientOnly>
    <button
      class="relative w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 transition-all duration-300"
      aria-label="Toggle theme"
      @click="toggleMode"
    >
      <Icon name="radix-icons:moon" class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icon name="radix-icons:sun" class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  </ClientOnly>
</template>
