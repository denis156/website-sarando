<script setup lang="ts">
import { ref } from "vue";

interface Props {
  height?: number | string;
  width?: number | string;
  src: string;
  class?: string;
  alt?: string;
  fill?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  height: undefined,
  width: undefined,
  class: "",
  alt: "Background of a beautiful view",
  fill: false,
});

const isLoading = ref(true);

function handleLoad() {
  isLoading.value = false;
}
</script>

<template>
  <NuxtImg
    class="transition duration-300 h-full w-full object-cover"
    :class="[props.class]"
    :src="src"
    :width="width"
    :height="height"
    loading="lazy"
    :alt="alt"
    @load="handleLoad"
  />
</template>
