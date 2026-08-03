<script setup lang="ts">
import { BaseCard, BaseHeader } from "../components/common/";
import {
  StatSkeleton,
  ChartSkeleton,
  HeaderSkeleton,
} from "../components/skeleton";
import {
  Activity,
  CalendarDays,
  Droplets,
  HeartPulse,
  Scale,
} from "lucide-vue-next";
import { useDashboardStore } from "../stores/dashboard.store.ts";
import { useFluidStore } from "../stores/fluid.store.ts";
import { storeToRefs } from "pinia";
import { onMounted, computed } from "vue";
import Chart from "../components/charts/Chart.vue";
import { useAuthStore } from "../stores/auth.ts";

const dashboardStore = useDashboardStore();
const fluidStore = useFluidStore();
const { chartData } = storeToRefs(fluidStore);
const { loading, summary, nextDialysisDate, remainingDialysisDays } =
  storeToRefs(dashboardStore);
const auth = useAuthStore();
const { user } = storeToRefs(auth);
onMounted(() => {
  dashboardStore.getDashboard();
  fluidStore.fetchFluidIntakes();
});

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return "🌅 Good Morning";
  }

  if (hour >= 12 && hour < 15) {
    return "☀️ Good Afternoon";
  }

  if (hour >= 15 && hour < 18) {
    return "🌇 Good Evening";
  }

  return "🌙 Good Night";
});
</script>

<template>
  <div class="space-y-8 text-[var(--muted)]">
    <!-- Header -->
    <HeaderSkeleton v-if="loading" />
    <BaseHeader
      title="Dashboard"
      subtitle="Showing overview your healthy"
      v-else
    />
    <!-- Greeting -->
    <StatSkeleton v-if="loading" />
    <BaseCard class="my-8" v-else>
      <div class="flex items-center justify-between text-[var(--muted)]">
        <div>
          <h2 class="text-3xl font-bold">{{ greeting }}, {{ user?.name }}</h2>
          <p class="mt-2 text-[var(--muted)]">
            Welcome back. Here's your health summary today.
          </p>
        </div>

        <Activity class="h-12 w-12" :style="{ color: 'var(--primary)' }" />
      </div>
    </BaseCard>

    <StatSkeleton v-if="loading" />
    <section
      class="grid gap-6 md:grid-cols-2 xl:grid-cols-4 my-8 text-[var(--muted)]"
      v-else
    >
      <!--  -->
      <BaseCard>
        <Droplets class="h-8 w-8 text-blue-500" />

        <div class="mt-5">
          <p class="text-sm text-[var(--muted)]">Fluid Intake</p>

          <h2 class="text-3xl font-bold">{{ summary?.fluid_today ?? 0 }} ml</h2>

          <p class="text-sm text-[var(--muted)]">
            Daily Limit {{ summary?.fluid_limit ?? 0 }} ml
          </p>
        </div>
      </BaseCard>

      <!--  -->
      <BaseCard>
        <HeartPulse class="h-8 w-8 text-red-500" />

        <div class="mt-5">
          <p class="text-sm text-[var(--muted)]">Blood Pressure</p>

          <h2 class="text-3xl font-bold">
            {{
              summary?.blood_pressure?.systolic != null &&
              summary?.blood_pressure?.diastolic != null
                ? `${summary.blood_pressure.systolic}/${summary.blood_pressure.diastolic}`
                : "-"
            }}
          </h2>

          <p class="text-sm text-[var(--muted)]">Latest Record</p>
        </div>
      </BaseCard>

      <!--  -->
      <BaseCard>
        <Scale class="h-8 w-8 text-orange-500" />
        <div class="mt-5">
          <p class="text-sm text-[var(--muted)]">Current Weight</p>
          <h2 class="text-3xl font-bold">{{ summary?.weight ?? "-" }} kg</h2>
          <p class="text-sm text-[var(--muted)]">Latest Record</p>
        </div>
      </BaseCard>

      <!--  -->
      <BaseCard>
        <CalendarDays class="h-8 w-8 text-violet-500" />
        <div class="mt-5">
          <p class="text-sm text-[var(--muted)]">Next Dialysis</p>
          <h2 class="text-xl font-bold">
            {{ remainingDialysisDays }} Day{{
              remainingDialysisDays || 0 > 1 ? "s" : ""
            }}
          </h2>
          <p class="text-sm text-[var(--muted)]">
            {{ nextDialysisDate }}
          </p>
        </div>
      </BaseCard>
    </section>
    <ChartSkeleton v-if="loading" />
    <section class="grid gap-6" v-else>
      <BaseCard class="lg:col-span-8" title="Weekly Fluid Trend">
        <div
          class="flex h-80 items-center justify-center rounded-2xl"
          :style="{ background: 'var(--surface-2)' }"
        >
          <Chart
            :categories="chartData.categories"
            :series="chartData.series"
            suffix="ml"
          />
        </div>
      </BaseCard>
    </section>
  </div>
</template>
