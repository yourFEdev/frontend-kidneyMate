<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
}

withDefaults(defineProps<Props>(), {
  subtitle: "",
});
</script>

<template>
  <section
    class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
  >
    <div>
      <h2 class="text-3xl font-bold" :style="{ color: 'var(--foreground)' }">
        {{ title }}
      </h2>

      <p v-if="subtitle" :style="{ color: 'var(--muted)' }">
        {{ subtitle }}
      </p>
    </div>

    <slot />
  </section>
</template>
