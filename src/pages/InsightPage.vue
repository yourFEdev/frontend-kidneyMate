<script setup lang="ts">
import BaseCard from "../components/common/BaseCard.vue";
import Chart from "../components/common/Chart.vue";

</script>

<template>
  <div class="space-y-6 text-[var(--muted)]">
    <section>
      <h1 class="text-3xl font-bold" :style="{ color: 'var(--foreground)' }">
        Insights
      </h1>
      <p class="mt-1" :style="{ color: 'var(--muted)' }">
        Understand your health trends and dialysis progress.
      </p>
    </section>
    <section class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <BaseCard title="Health Score">
        <div class="space-y-2">
          <h2 class="text-5xl font-bold text-emerald-500">87</h2>
          <p :style="{ color: 'var(--muted)' }">Excellent this week</p>
        </div>
      </BaseCard>
      <BaseCard title="Medication">
        <div class="space-y-2">
          <h2 class="text-5xl font-bold text-blue-500">96%</h2>
          <p :style="{ color: 'var(--muted)' }">Adherence Rate</p>
        </div>
      </BaseCard>
      <BaseCard title="Fluid Goal">
        <div class="space-y-2">
          <h2 class="text-5xl font-bold text-cyan-500">82%</h2>
          <p :style="{ color: 'var(--muted)' }">Average Achievement</p>
        </div>
      </BaseCard>
      <BaseCard title="Blood Pressure">
        <div class="space-y-2">
          <h2 class="text-5xl font-bold text-rose-500">Stable</h2>
          <p :style="{ color: 'var(--muted)' }">Last 30 days</p>
        </div>
      </BaseCard>
    </section>
    <BaseCard
      title="Fluid Intake Trend"
      description="Daily fluid intake over the last 30 days"
    >
      <div
        class="h-80 rounded-2xl border border-dashed flex items-center justify-center"
        :style="{ borderColor: 'var(--border)' }"
      >
        <Chart/>
      </div>
    </BaseCard>
    <section class="grid gap-6 lg:grid-cols-2">
      <BaseCard title="Blood Pressure Trend">
        <div
          class="h-72 rounded-xl border border-dashed flex items-center justify-center"
          :style="{ borderColor: 'var(--border)' }"
        >
          Line Chart
        </div>
      </BaseCard>
      <BaseCard title="Weight Trend">
        <div
          class="h-72 rounded-xl border border-dashed flex items-center justify-center"
          :style="{ borderColor: 'var(--border)' }"
        >
          Line Chart
        </div>
      </BaseCard>
    </section>
    <section class="grid gap-6 lg:grid-cols-2">
      <BaseCard title="Symptoms Overview">
        <div
          class="h-64 rounded-xl border border-dashed flex items-center justify-center"
          :style="{ borderColor: 'var(--border)' }"
        >
          Pie Chart
        </div>
      </BaseCard>
      <BaseCard title="Medication Consistency">
        <div
          class="h-64 rounded-xl border border-dashed flex items-center justify-center"
          :style="{ borderColor: 'var(--border)' }"
        >
          Bar Chart
        </div>
      </BaseCard>
    </section>
    <BaseCard
      title="Health Summary"
      description="Generated from your recent health records"
    >
      <div
        class="rounded-2xl p-6"
        :style="{
          background: 'var(--muted-background)',
          color: 'var(--foreground)',
        }"
      >
        <p class="leading-8">
          Your blood pressure has remained stable over the past month. Fluid
          intake is improving and medication adherence is excellent. Weight gain
          between dialysis sessions is within the recommended range. Continue
          maintaining your current routine.
        </p>
      </div>
    </BaseCard>
  </div>
</template>
