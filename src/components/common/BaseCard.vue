<script setup lang="ts">
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    hoverable?: boolean;
  }>(),
  {
    hoverable: true,
  },
);
</script>

<template>
  <Card
    :class="[
      'rounded-3xl border shadow-none transition-all duration-300',
      hoverable && 'hover:-translate-y-1 hover:shadow-lg',
    ]"
    :style="{
      background: 'var(--sidebar)',
      borderColor: 'var(--border)',
      boxShadow: 'var(--shadow)',
    }"
  >
    <CardHeader
      v-if="title || description || $slots.action"
      class="flex flex-row items-start justify-between pb-3"
    >
      <div>
        <CardTitle
          v-if="title"
          class="text-lg"
          :style="{ color: 'var(--foreground)' }"
        >
          {{ title }}
        </CardTitle>

        <CardDescription v-if="description" :style="{ color: 'var(--muted)' }">
          {{ description }}
        </CardDescription>
      </div>

      <slot name="action" />
    </CardHeader>

    <CardContent>
      <slot />
    </CardContent>
  </Card>
</template>
