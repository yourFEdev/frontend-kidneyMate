<script setup lang="ts">
import { BaseCard, BaseSkeleton } from "../common/";

withDefaults(
  defineProps<{
    rows?: number;
    columns?: number;
  }>(),
  {
    rows: 5,
    columns: 6,
  },
);
</script>

<template>
  <BaseCard>
    <div class="space-y-6">
      <div class="flex justify-between">
        <div class="space-y-2">
          <BaseSkeleton class="h-5 w-48" />
          <BaseSkeleton class="h-4 w-72" />
        </div>

        <BaseSkeleton class="h-10 w-32 rounded-xl" />
      </div>

      <div
        class="overflow-hidden rounded-2xl border"
        style="border-color: var(--border)"
      >
        <table class="w-full">
          <thead>
            <tr>
              <th v-for="i in columns" :key="'head' + i" class="px-5 py-4">
                <BaseSkeleton class="h-4 w-20" />
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="r in rows" :key="r" class="border-t">
              <td v-for="c in columns" :key="c" class="px-5 py-4">
                <BaseSkeleton class="h-4 w-full" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </BaseCard>
</template>
