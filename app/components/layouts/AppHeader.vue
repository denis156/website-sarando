<script setup lang="ts">
const route = useRoute();
const isOpen = ref(false);

const menuItems = [
  { label: "Beranda", link: "/" },
  { label: "Layanan", link: "/layanan" },
  { label: "Portofolio", link: "/portofolio" },
  { label: "Blog", link: "/blog" },
  { label: "Kontak", link: "/kontak" },
];

const socialItems = [
  { label: "Instagram", link: "https://instagram.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
  { label: "GitHub", link: "https://github.com" },
];

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const isActive = (path: string) => {
  if (path === "/") return route.path === "/";
  return route.path.startsWith(path);
};

const itemVariants = (i: number) => ({
  initial: { y: 20, opacity: 0 },
  enter: {
    y: 0,
    opacity: 1,
    transition: { delay: i * 80 + 100, duration: 300, ease: "easeOut" },
  },
});
</script>

<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 border-b border-border transition-colors duration-300"
    :class="[isOpen ? 'bg-background' : 'bg-background/80 backdrop-blur-md']"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="flex items-center gap-3 transition-opacity hover:opacity-80"
      >
        <NuxtImg
          src="/images/logo/submark-logo.png"
          alt="Sarando"
          class="w-10 h-10 object-contain"
          width="40"
          height="40"
          preload
        />
        <span
          class="hidden md:block text-xl font-bold tracking-tight text-foreground"
          >SARANDO</span
        >
      </NuxtLink>

      <!-- Right side: Mode Toggle + Hamburger -->
      <div class="flex items-center gap-3">
        <LayoutsModeToggle />
        <button
          class="relative w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 transition-all duration-300 group"
          :aria-label="isOpen ? 'Close Menu' : 'Open Menu'"
          @click="toggleMenu"
        >
          <Icon
            :name="isOpen ? 'lucide:x' : 'lucide:menu'"
            class="w-5 h-5 group-hover:scale-110 transition-transform"
          />
        </button>
      </div>
    </div>

    <!-- Menu Panel -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isOpen" class="bg-background min-h-dvh">
        <div
          class="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center min-h-[calc(100dvh-73px)] pb-[5vh] md:pb-[10vh]"
        >
          <div class="flex flex-col items-center space-y-6">
            <div
              v-for="(item, i) in menuItems"
              :key="item.link"
              v-motion
              :initial="itemVariants(i).initial"
              :enter="itemVariants(i).enter"
            >
              <NuxtLink
                :to="item.link"
                class="text-3xl md:text-5xl font-bold transition-colors tracking-tight relative group"
                :class="[
                  isActive(item.link)
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary',
                ]"
                @click="toggleMenu"
              >
                {{ item.label }}
                <span
                  class="absolute -bottom-2 left-0 h-1 bg-secondary transition-all duration-300 group-hover:w-full"
                  :class="[isActive(item.link) ? 'w-full' : 'w-0']"
                />
              </NuxtLink>
            </div>
          </div>

          <!-- Social Links -->
          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{
              opacity: 1,
              y: 0,
              transition: { delay: menuItems.length * 80 + 200, duration: 300 },
            }"
            class="mt-14 md:mt-20 flex gap-4 md:gap-8"
          >
            <a
              v-for="social in socialItems"
              :key="social.link"
              :href="social.link"
              target="_blank"
              rel="noopener noreferrer"
              class="text-muted-foreground hover:text-primary transition-colors text-xs md:text-sm uppercase tracking-widest"
            >
              {{ social.label }}
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>
