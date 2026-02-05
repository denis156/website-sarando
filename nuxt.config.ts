import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      titleTemplate: '%s - Sarando',
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/logo/submark-logo.png' },
      ],
    },
  },
  css: ['~/assets/css/tailwind.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
    build: {
      sourcemap: false,
    },
  },

  modules: [
    'shadcn-nuxt',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@vueuse/motion/nuxt',
    '@nuxt/image',
    'v-gsap-nuxt',
    '@nuxtjs/google-fonts',
  ],
  googleFonts: {
    families: {
      Outfit: [300, 400, 500, 600, 700, 900],
    },
    display: 'swap',
  },
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  colorMode: {
    classSuffix: '',
  },
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  }
})