import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: [
    'shadcn-nuxt',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@vueuse/motion/nuxt',
    '@nuxt/image',
    'v-gsap-nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/eslint',
    '@nuxtjs/seo',
    '@nuxt/content',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: 'id',
      },
      titleTemplate: '%s - Sarando',
      meta: [
        { name: 'google-site-verification', content: 'googleb07166856d9b1061' },
        { name: 'author', content: 'Sarando - Sarana Digital Anandonia' },
        { name: 'theme-color', content: '#31694E' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/logo/submark-logo.png' },
      ],
    },
  },

  css: ['~/assets/css/tailwind.css'],

  site: {
    url: 'https://sarando.site',
    name: 'Sarando',
    description: 'Sarando - Sarana Digital Anandonia. Merakit solusi digital berstandar global dengan jiwa kearifan lokal dari Konawe, Sulawesi Tenggara.',
    defaultLocale: 'id',
  },

  colorMode: {
    classSuffix: '',
  },

  runtimeConfig: {
    apiBaseUrl: '',
    apiKey: '',
  },
  compatibilityDate: '2025-07-15',

  nitro: {
    preset: 'bun',
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
    build: {
      sourcemap: false,
    },
  },

  eslint: {
    config: {
      stylistic: {
        semi: false,
        indent: 2,
        quotes: 'single',
      },
    },
    checker: true,
  },

  googleFonts: {
    families: {
      Outfit: [300, 400, 500, 600, 700, 900],
    },
    display: 'swap',
    preload: true,
    prefetch: true,
  },

  icon: {
    clientBundle: {
      scan: true,
    },
  },

  image: {
    quality: 80,
    format: ['webp', 'avif'],
  },

  ogImage: {
    defaults: {
      url: '/images/logo/og-default.png',
    },
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Sarando',
      alternateName: ['Sarana Digital Anandonia', 'PT Sarana Digital Anandonia', 'SARANDO'],
      url: 'https://sarando.site',
      logo: 'https://sarando.site/images/logo/og-default.png',
      description: 'Merakit solusi digital berstandar global dengan jiwa kearifan lokal dari Konawe, Sulawesi Tenggara.',
      foundingDate: '2026',
      address: {
        addressLocality: 'Konawe',
        addressRegion: 'Sulawesi Tenggara',
        addressCountry: 'ID',
      },
    },
  },

  shadcn: {
    prefix: '',
    componentDir: '@/components/ui',
  },
})
