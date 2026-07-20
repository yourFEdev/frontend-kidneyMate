<script setup lang="ts">
import { RouterLink } from "vue-router"

defineProps<{
  title: string
  to: string
  icon: any
}>()
</script>

<template>
  <RouterLink
    :to="to"
    class="group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300"
    active-class="bg-[var(--primary)] text-white shadow-lg"
  >
    <component
      :is="icon"
      :size="20"
      class="transition-transform duration-300 group-hover:translate-x-1"
    />

    <span class="font-medium">
      {{ title }}
    </span>
  </RouterLink>
</template>