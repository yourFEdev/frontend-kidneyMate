<script setup lang="ts">
import { BaseCard, BaseSkeleton } from "../common/";
</script>

<template>
  <BaseCard>
    <div class="space-y-5">
      <BaseSkeleton class="h-12 w-12 rounded-2xl" />

      <div class="space-y-3">
        <BaseSkeleton class="h-4 w-20" />
        <BaseSkeleton class="h-8 w-32" />
      </div>
    </div>
  </BaseCard>
</template>
