<script setup lang="ts">
defineProps<{
  label: string;
  hint?: string;
}>();
</script>

<template>
  <div class="space-y-2">
    <label
      class="text-sm font-medium"
      :style="{
        color: 'var(--foreground)',
      }"
    >
      {{ label }}
    </label>

    <slot />

    <p v-if="hint" class="text-xs" :style="{ color: 'var(--muted)' }">
      {{ hint }}
    </p>
  </div>
</template>
