<script lang="ts" setup>
import { AnimatePresence, Motion } from "motion-v";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  image: string;
}
interface Props {
  testimonials?: Testimonial[];
  autoplay?: boolean;
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  testimonials: () => [],
  autoplay: () => false,
  duration: 5000,
});

const active = ref(0);
const isMounted = ref(false);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const interval = ref<any>();

const activeTestimonialQuote = computed(() => {
  return props.testimonials[active.value]?.quote.split(" ") ?? [];
});

// Pre-generate deterministic rotations based on index to avoid hydration mismatch
const rotations = computed(() => {
  return props.testimonials.map((_, index) => {
    // Use a seeded rotation based on index for consistency
    const seed = index * 7;
    return ((seed % 21) - 10);
  });
});

onMounted(() => {
  isMounted.value = true;
  if (props.autoplay) {
    interval.value = setInterval(handleNext, props.duration);
  }
});

onUnmounted(() => {
  if (!interval.value) {
    clearInterval(interval.value);
  }
});

function handleNext() {
  active.value = (active.value + 1) % props.testimonials.length;
}

function handlePrev() {
  active.value =
    (active.value - 1 + props.testimonials.length) % props.testimonials.length;
}

function isActive(index: number) {
  return active.value === index;
}

function getRotation(index: number) {
  return rotations.value[index] ?? 0;
}
</script>

<template>
  <div
    class="mx-auto max-w-md px-4 py-20 font-sans antialiased md:max-w-7xl md:px-8 lg:px-12"
  >
    <div class="relative grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-20">
      <div>
        <div class="relative h-64 w-full md:h-96">
          <AnimatePresence>
            <Motion
              v-for="(testimonial, index) in props.testimonials"
              :key="testimonial.image"
              as="div"
              :initial="{
                opacity: 0,
                scale: 0.9,
                z: -100,
                rotate: getRotation(index),
              }"
              :animate="{
                opacity: isActive(index) ? 1 : 0.7,
                scale: isActive(index) ? 1 : 0.95,
                z: isActive(index) ? 0 : -100,
                rotate: isActive(index) ? 0 : getRotation(index),
                zIndex: isActive(index) ? 40 : testimonials.length + 2 - index,
                y: isActive(index) ? [0, -80, 0] : 0,
              }"
              :exit="{
                opacity: 0,
                scale: 0.9,
                z: 100,
                rotate: getRotation(index),
              }"
              :transition="{
                duration: 0.4,
                ease: 'easeInOut',
              }"
              class="absolute inset-0 origin-bottom"
            >
              <NuxtImg
                :src="testimonial.image"
                :alt="testimonial.name"
                width="500"
                height="500"
                :draggable="false"
                class="size-full rounded-3xl object-cover object-center"
              />
            </Motion>
          </AnimatePresence>
        </div>
      </div>
      <div class="flex flex-col justify-between py-4">
        <Motion
          :key="active"
          as="div"
          :initial="{
            y: 20,
            opacity: 0,
          }"
          :animate="{
            y: 0,
            opacity: 1,
          }"
          :exit="{
            y: -20,
            opacity: 0,
          }"
          :transition="{
            duration: 0.2,
            ease: 'easeInOut',
          }"
        >
          <h4 class="text-xl md:text-4xl font-bold text-foreground">
            {{ props.testimonials[active]?.name }}
          </h4>
          <p class="text-sm md:text-lg text-muted-foreground mt-2">
            {{ props.testimonials[active]?.designation }}
          </p>
          <Motion
            as="p"
            class="mt-8 text-base md:text-2xl font-light leading-relaxed text-foreground/80"
          >
            <Motion
              v-for="(word, index) in activeTestimonialQuote"
              :key="index"
              as="span"
              :initial="{
                filter: 'blur(10px)',
                opacity: 0,
                y: 5,
              }"
              :animate="{
                filter: 'blur(0px)',
                opacity: 1,
                y: 0,
              }"
              :transition="{
                duration: 0.2,
                ease: 'easeInOut',
                delay: 0.02 * index,
              }"
              class="inline-block"
            >
              {{ word }}&nbsp;
            </Motion>
          </Motion>
        </Motion>
        <div class="flex gap-4 pt-12 md:pt-0">
          <button
            aria-label="Testimoni sebelumnya"
            class="group/button flex size-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            @click="handlePrev"
          >
            <Icon
              name="lucide:arrow-left"
              class="size-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400"
            />
          </button>
          <button
            aria-label="Testimoni berikutnya"
            class="group/button flex size-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
            @click="handleNext"
          >
            <Icon
              name="lucide:arrow-right"
              class="size-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
