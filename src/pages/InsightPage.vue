<script setup lang="ts">
import { BaseCard, BaseHeader } from "../components/common";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { useInsightStore } from "../stores/insight.store";

const insightStore = useInsightStore();

const { insight, loading } = storeToRefs(insightStore);

import { StatSkeleton, HeaderSkeleton } from "../components/skeleton";

onMounted(() => {
  insightStore.getInsights();
});
</script>

<template>
  <div v-if="!insight" class="space-y-8 text-[var(--muted)]">
    <HeaderSkeleton v-if="loading" />
    <BaseHeader
      title="Insight"
      subtitle="Understand your health trends and dialysis progress."
      v-else
    />
    <StatSkeleton v-if="loading" />
    <BaseCard
      title="Not enough health data"
      description="Add your blood pressure, fluid intake and weight records to receive personalized health insights."
      v-else
    />
  </div>

  <div class="space-y-8 text-[var(--muted)]" v-else>
    <HeaderSkeleton v-if="loading" />
    <BaseHeader
      title="Insight"
      subtitle="Understand your health trends and dialysis progress."
      v-else
    />
    <StatSkeleton v-if="loading" />
    <section class="grid gap-5 md:grid-cols-2 xl:grid-cols-4" v-else>
      <BaseCard title="Health Score">
        <div class="space-y-2">
          <h2
            class="text-5xl font-bold text-emerald-500"
            v-if="!loading && insight"
          >
            {{ insight.health_score }}
          </h2>

          <div
            v-else
            class="h-12 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
          />
          <p :style="{ color: 'var(--muted)' }">Excellent this week</p>
        </div>
      </BaseCard>
      <BaseCard title="Medication">
        <div class="space-y-2">
          <h2
            class="text-5xl font-bold text-blue-500"
            v-if="!loading && insight"
          >
            {{ insight.medication_adherence }}%
          </h2>

          <div
            v-else
            class="h-12 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
          />
          <p :style="{ color: 'var(--muted)' }">Adherence Rate</p>
        </div>
      </BaseCard>
      <BaseCard title="Fluid Goal">
        <div class="space-y-2">
          <h2
            class="text-5xl font-bold text-cyan-500"
            v-if="!loading && insight"
          >
            {{ insight.fluid_goal }}%
          </h2>

          <div
            v-else
            class="h-12 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
          />
          <p :style="{ color: 'var(--muted)' }">Average Achievement</p>
        </div>
      </BaseCard>
      <BaseCard title="Blood Pressure">
        <div class="space-y-2">
          <h2
            class="text-5xl font-bold text-rose-500"
            v-if="!loading && insight"
          >
            {{ insight.blood_pressure_status }}
          </h2>

          <div
            v-else
            class="h-12 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700"
          />
          <p :style="{ color: 'var(--muted)' }">Last 30 days</p>
        </div>
      </BaseCard>
    </section>
    <StatSkeleton v-if="loading" />
    <BaseCard
      title="Health Summary"
      description="Generated from your recent health records"
      \
      v-else
    >
      <div
        :style="{
          color: 'var(--foreground)',
        }"
      >
        <p v-if="!loading && insight">
          {{ insight.summary }}
        </p>
      </div>
    </BaseCard>
  </div>
</template>
