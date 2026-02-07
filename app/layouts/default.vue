<template>
  <div class="min-h-dvh flex flex-col">
    <LayoutsAppHeader />

    <main class="flex-1 flex flex-col max-w-7xl w-full mx-auto px-6">
      <slot />
    </main>

    <LayoutsAppFooter />
  </div>
</template>
