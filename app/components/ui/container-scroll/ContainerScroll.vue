<script setup lang="ts">
import { useElementBounding, useWindowSize } from "@vueuse/core";
import { computed, onMounted, onUnmounted, ref } from "vue";

const containerRef = ref(null);
const isMobile = ref(false);
const isMounted = ref(false);

function updateIsMobile() {
  if (import.meta.client) {
    isMobile.value = window.innerWidth <= 768;
  }
}

onMounted(() => {
  isMounted.value = true;
  updateIsMobile();
  window.addEventListener("resize", updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateIsMobile);
});

const { height: windowHeight } = useWindowSize();
const { top, height: containerHeight } = useElementBounding(containerRef);

const scrollYProgress = computed(() => {
  if (!isMounted.value || !containerHeight.value) return 0;

  // Calculate progress based on how much of the container has been scrolled through
  // When top of container is at bottom of viewport: progress = 0
  // When center of container is at center of viewport: progress = 1
  const containerCenter = top.value + containerHeight.value / 2;
  const viewportCenter = windowHeight.value / 2;

  // Distance from container center to viewport center
  // Positive = container is below center, Negative = container is above center
  const distanceFromCenter = containerCenter - viewportCenter;

  // Normalize: when distance is containerHeight/2 (starting position), progress = 0
  // when distance is 0 (centered), progress = 1
  const maxDistance = containerHeight.value / 2;
  const progress = 1 - Math.max(0, Math.min(1, distanceFromCenter / maxDistance));

  return progress;
});

const scaleDimensions = computed(() => (isMobile.value ? [0.7, 0.9] : [1.05, 1]));

const rotate = computed(() => 20 * (1 - scrollYProgress.value));
const scale = computed(() => {
  const [start = 1.05, end = 1] = scaleDimensions.value;
  return start + (end - start) * scrollYProgress.value;
});
const translateY = computed(() => -100 * scrollYProgress.value);
</script>

<template>
  <div
    ref="containerRef"
    class="relative flex h-240 items-center justify-center p-2 md:h-320 md:p-20"
  >
    <div
      class="relative w-full py-10 md:py-40"
      style="perspective: 1000px"
    >
      <ContainerScrollTitle :translate="translateY">
        <slot name="title" />
      </ContainerScrollTitle>
      <ContainerScrollCard
        :rotate="rotate"
        :scale="scale"
      >
        <slot name="card" />
      </ContainerScrollCard>
    </div>
  </div>
</template>
