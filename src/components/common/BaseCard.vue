<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<template>
  <Card
  class="rounded-3xl border shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
  :style="{
    background: 'var(--surface)',
    borderColor: 'var(--border)',
    boxShadow: 'var(--shadow)',
  }"
>
    <CardHeader
      v-if="title || description"
      class="pb-3"
    >
      <CardTitle
        v-if="title"
        class="text-lg"
        :style="{ color: 'var(--foreground)' }"
      >
        {{ title }}
      </CardTitle>

      <CardDescription
        v-if="description"
        :style="{ color: 'var(--muted)' }"
      >
        {{ description }}
      </CardDescription>
    </CardHeader>

    <CardContent>
      <slot />
    </CardContent>
  </Card>
</template>