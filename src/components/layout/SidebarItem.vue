<script setup lang="ts">
import { computed, type Component } from "vue";
import { RouterLink, useRoute } from "vue-router";

const props = defineProps<{
  title: string;
  to: string;
  icon: Component;
  collapsed?: boolean;
}>();

const route = useRoute();

const isActive = computed(() => {
  if (props.to === "/dashboard") {
    return route.path === "/dashboard";
  }

  return route.path.startsWith(props.to);
});
</script>

<template>
  <RouterLink
  :to="to"
  :title="collapsed ? title : ''"
  :class="[
    'group relative flex h-12 items-center rounded-2xl transition-all duration-200',
    collapsed ? 'justify-center' : 'px-4',
    isActive
      ? 'bg-[var(--sidebar-active)]'
      : 'hover:bg-[var(--sidebar-hover)]'
  ]"
  :style="{
    color: isActive ? 'var(--primary)' : 'var(--foreground)'
  }"
>
    <!-- Active Indicator -->
    <span
      v-if="isActive"
      class="absolute left-0 top-2 bottom-2 w-1 rounded-r-full"
      style="background: var(--primary)"
    />

    <!-- Icon -->
    <component
  :is="icon"
  class="h-5 w-5 shrink-0 transition-all duration-200"
  :class="[
    isActive
      ? 'scale-110'
      : 'group-hover:scale-105'
  ]"
  :style="{
    color: isActive ? 'var(--primary)' : 'var(--foreground)'
  }"
/>

    <!-- Label -->
    <Transition name="fade">
      <span
  v-if="!collapsed"
  class="ml-3 font-medium whitespace-nowrap"
  :style="{
    color: isActive ? 'var(--primary)' : 'var(--foreground)'
  }"
>
  {{ title }}
</span>
    </Transition>

    <!-- Active Background -->
    <div
      v-if="isActive"
      class="absolute inset-0 -z-10 rounded-2xl"
      style="background: var(--sidebar-active)"
    />
  </RouterLink>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>