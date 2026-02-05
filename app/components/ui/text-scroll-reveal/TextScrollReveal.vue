<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import ScrollWord from "./ScrollWord.vue";

interface Props {
  class?: string;
  text: string;
}

// Props
const props = defineProps<Props>();

const textScrollRevealRef = ref<HTMLElement | null>(null);

const words = computed(() => props.text.split(" "));

const scrollYProgress = ref(0);

function updateScrollYProgress() {
  if (textScrollRevealRef.value) {
    const boundingRect = textScrollRevealRef.value.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    scrollYProgress.value = (boundingRect.y / windowHeight) * -1;
  }
}

onMounted(() => {
  window.addEventListener("scroll", updateScrollYProgress);
  window.addEventListener("resize", updateScrollYProgress);
  updateScrollYProgress();
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScrollYProgress);
  window.removeEventListener("resize", updateScrollYProgress);
});
</script>

<template>
  <div
    ref="textScrollRevealRef"
    class="relative z-0 h-[200vh]"
    :class="[$props.class]"
  >
    <div
      class="sticky top-0 mx-auto flex h-1/2 max-w-6xl items-center bg-transparent px-6 md:px-12 lg:px-16 py-20"
    >
      <p
        class="flex flex-wrap p-4 text-2xl font-bold text-foreground/30 md:p-6 md:text-3xl lg:p-8 lg:text-4xl xl:text-5xl 2xl:text-6xl"
      >
        <ClientOnly>
          <ScrollWord
            v-for="(word, i) in words"
            :key="i"
            :word="word"
            :progress="scrollYProgress"
            :range="[i / words.length, (i + 1) / words.length]"
          />
          <template #fallback>
            <span
              v-for="(word, i) in words"
              :key="i"
              class="xl:mx-3 relative mx-1 lg:mx-2.5 text-black dark:text-white"
            >
              {{ word }}
            </span>
          </template>
        </ClientOnly>
      </p>
    </div>
  </div>
</template>
