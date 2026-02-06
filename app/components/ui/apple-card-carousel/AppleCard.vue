<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { AnimatePresence, Motion } from 'motion-v'
import { inject, onMounted, onUnmounted, ref, watch } from 'vue'
import { CarouselKey } from './AppleCarouselContext'

interface Card {
  src: string
  title: string
  category: string
}

interface Props {
  card: Card
  index: number
  layout?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  layout: false,
})

const open = ref(false)
const containerRef = ref<HTMLDivElement | null>(null)
const carouselContext = inject(CarouselKey)

if (!carouselContext) {
  throw new Error('Card must be used within a Carousel')
}

const { onCardClose, currentIndex: _currentIndex } = carouselContext

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    handleClose()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.style.overflow = 'auto'
})

watch(open, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.overflow = 'auto'
  }
})

onClickOutside(containerRef, () => handleClose())

function handleOpen() {
  open.value = true
}

function handleClose() {
  open.value = false
  onCardClose(props.index)
}
</script>

<template>
  <Teleport to="body">
    <AnimatePresence>
      <div
        v-if="open"
        class="fixed inset-0 z-50 h-screen overflow-auto"
      >
        <Motion
          as="div"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
          class="fixed inset-0 size-full bg-black/80 backdrop-blur-lg"
        />
        <div
          class="relative z-50 flex min-h-full items-center justify-center p-4"
        >
          <Motion
            ref="containerRef"
            as="div"
            :initial="{ opacity: 0, scale: 0.95 }"
            :animate="{ opacity: 1, scale: 1 }"
            :exit="{ opacity: 0, scale: 0.95 }"
            :layout-id="layout ? `card-${card.title}` : undefined"
            class="relative w-full max-w-2xl rounded-3xl bg-white p-4 font-sans md:p-8 dark:bg-neutral-900 shadow-2xl"
          >
            <button
              aria-label="Tutup"
              class="sticky top-4 right-0 ml-auto flex size-8 items-center justify-center rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-colors backdrop-blur-md"
              @click="handleClose"
            >
              <Icon
                name="tabler:x"
                class="size-5 text-neutral-700 dark:text-neutral-200"
              />
            </button>
            <Motion
              as="div"
              :layout-id="layout ? `category-${card.title}` : undefined"
              class="text-base font-medium text-primary"
            >
              {{ card.category }}
            </Motion>
            <Motion
              as="div"
              :layout-id="layout ? `title-${card.title}` : undefined"
              class="mt-2 text-2xl font-bold text-neutral-800 md:text-3xl dark:text-neutral-100"
            >
              {{ card.title }}
            </Motion>
            <div class="py-8">
              <slot />
            </div>
          </Motion>
        </div>
      </div>
    </AnimatePresence>
  </Teleport>

  <Motion
    :layout-id="layout ? `card-${card.title}` : undefined"
    class="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-160 md:w-96 dark:bg-neutral-900"
    @click="handleOpen"
  >
    <div
      class="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-linear-to-b from-black/50 via-transparent to-transparent"
    />
    <div class="relative z-40 p-8">
      <Motion
        :layout-id="layout ? `category-${card.category}` : undefined"
        class="text-left font-sans text-sm font-medium text-white md:text-base"
      >
        {{ card.category }}
      </Motion>
      <Motion
        :layout-id="layout ? `title-${card.title}` : undefined"
        class="mt-2 max-w-xs text-left font-sans text-xl font-semibold text-balance text-white md:text-3xl"
      >
        {{ card.title }}
      </Motion>
    </div>
    <AppleBlurImage
      :src="card.src"
      :alt="card.title"
      class="absolute inset-0 z-10 object-cover"
      fill
    />
  </Motion>
</template>
