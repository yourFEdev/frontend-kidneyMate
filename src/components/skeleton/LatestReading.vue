<script setup lang="ts">
import { BaseCard, BaseSkeleton } from "../common";
</script>

<template>
  <BaseCard title="Latest Reading">
    <div class="flex items-center gap-4">
      <BaseSkeleton class="h-14 w-14 rounded-2xl" />
      <div class="space-y-3">
        <BaseSkeleton class="h-10 w-56" />
        <BaseSkeleton class="h-4 w-44" />
      </div>
    </div>
  </BaseCard>
</template>
