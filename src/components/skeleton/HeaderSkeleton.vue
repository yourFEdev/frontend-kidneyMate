<script setup lang="ts">
import Skeleton from "../ui/skeleton/Skeleton.vue";

interface Props {
  subtitle?: boolean;
}

withDefaults(defineProps<Props>(), {
  subtitle: true,
});
</script>

<template>
  <section
    class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
  >
    <div class="space-y-2">
      <Skeleton
        class="h-6 w-64 rounded-md"
        :style="{
          backgroundColor: 'var(--skeleton)',
        }"
      />

      <Skeleton
        v-if="subtitle"
        class="h-4 w-40 rounded-md"
        :style="{
          backgroundColor: 'var(--skeleton)',
        }"
      />
    </div>

    <slot />
  </section>
</template>
