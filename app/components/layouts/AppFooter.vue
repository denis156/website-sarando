<script setup lang="ts">
const menuItems = [
  { label: 'Beranda', link: '/' },
  { label: 'Layanan', link: '/layanan' },
  { label: 'Portofolio', link: '/portofolio' },
  { label: 'Blog', link: '/blog' },
  { label: 'Kontak', link: '/kontak' },
]

const socialItems = [
  { label: 'Instagram', link: 'https://instagram.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' },
  { label: 'GitHub', link: 'https://github.com' },
]
</script>

<template>
  <footer class="bg-card border-t border-border py-12 md:py-24">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
      <!-- Brand -->
      <div class="col-span-2 space-y-4 md:space-y-6">
        <NuxtLink to="/" class="flex items-center gap-3">
          <NuxtImg src="/images/logo/submark-logo.png" alt="Sarando" class="w-10 h-10 md:w-12 md:h-12 object-contain" width="48" height="48" loading="lazy" />
          <span class="text-xl md:text-2xl font-bold tracking-tight text-foreground">SARANDO</span>
        </NuxtLink>
        <p class="text-sm md:text-base text-muted-foreground max-w-sm leading-relaxed">
          Membangun masa depan digital dengan integritas adat dan kualitas global. Dari Konawe untuk Dunia.
        </p>
      </div>

      <!-- Navigation -->
      <div class="space-y-4 md:space-y-6">
        <h4 class="text-base md:text-lg font-semibold text-foreground">Menu</h4>
        <ul class="space-y-3">
          <li v-for="item in menuItems" :key="item.link">
            <NuxtLink
              :to="item.link"
              class="text-sm text-muted-foreground hover:text-primary transition-colors block"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- Socials -->
      <div class="space-y-4 md:space-y-6">
        <h4 class="text-base md:text-lg font-semibold text-foreground">Sosial</h4>
        <ul class="space-y-3">
          <li v-for="social in socialItems" :key="social.link">
            <a
              :href="social.link"
              target="_blank"
              rel="noopener noreferrer"
              class="text-sm text-muted-foreground hover:text-primary transition-colors block"
            >
              {{ social.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom -->
    <div class="max-w-7xl mx-auto px-6 mt-10 md:mt-16 pt-6 md:pt-8 border-t border-border flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-4 text-xs md:text-sm text-muted-foreground text-center">
      <p>&copy; {{ new Date().getFullYear() }} PT SARANA DIGITAL ANANDONIA. All rights reserved.</p>
      <div class="flex gap-6">
        <a href="#" class="hover:text-foreground transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-foreground transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
</template>
