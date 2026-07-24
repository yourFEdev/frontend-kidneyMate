<script setup lang="ts">
import BaseCard from "../components/common/BaseCard.vue";
</script>

<template>
  <div class="space-y-6 text-[var(--muted)]">
    <!-- Header -->
    <section>
      <h1 class="text-3xl font-bold" :style="{ color: 'var(--foreground)' }">
        Schedule
      </h1>
      <p class="mt-1" :style="{ color: 'var(--muted)' }">
        Stay on top of your dialysis sessions and medication schedule.
      </p>
    </section>
    <!-- Summary -->
    <section class="grid gap-6 lg:grid-cols-2">
      <BaseCard title="Next Dialysis" description="Upcoming treatment">
        <div class="space-y-3">
          <h2
            class="text-4xl font-bold"
            :style="{ color: 'var(--foreground)' }"
          >
            Friday
          </h2>
          <p class="text-lg" :style="{ color: 'var(--muted)' }">25 July 2026</p>
          <div
            class="inline-flex rounded-full px-4 py-2 text-sm font-medium bg-sky-100 text-sky-700"
          >
            Starts in 2 days
          </div>
        </div>
      </BaseCard>
      <BaseCard title="Today's Medication">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span>Morning</span>
            <span class="text-green-500 font-medium"> Completed </span>
          </div>

          <div class="flex items-center justify-between">
            <span>Afternoon</span>
            <span class="text-yellow-500 font-medium"> Pending </span>
          </div>

          <div class="flex items-center justify-between">
            <span>Night</span>
            <span :style="{ color: 'var(--muted)' }"> Not Yet </span>
          </div>
        </div>
      </BaseCard>
    </section>

    <!-- Calendar -->

    <BaseCard title="Monthly Calendar" description="Appointments and reminders">
      <div
        class="h-[420px] rounded-2xl border border-dashed flex items-center justify-center"
        :style="{ borderColor: 'var(--border)' }"
      >
        Calendar Component Here
      </div>
    </BaseCard>

    <!-- Bottom -->

    <section class="grid gap-6 xl:grid-cols-2">
      <BaseCard title="Upcoming Appointments">
        <div class="space-y-4">
          <div
            class="flex justify-between rounded-xl border p-4"
            :style="{ borderColor: 'var(--border)' }"
          >
            <div>
              <h3 class="font-semibold">Hemodialysis</h3>

              <p :style="{ color: 'var(--muted)' }">Friday • 08:00 AM</p>
            </div>

            <span class="text-sky-500 font-medium"> Confirmed </span>
          </div>

          <div
            class="flex justify-between rounded-xl border p-4"
            :style="{ borderColor: 'var(--border)' }"
          >
            <div>
              <h3 class="font-semibold">Doctor Consultation</h3>

              <p :style="{ color: 'var(--muted)' }">Monday • 10:30 AM</p>
            </div>

            <span class="text-emerald-500 font-medium"> Scheduled </span>
          </div>
        </div>
      </BaseCard>

      <BaseCard title="Medication Schedule">
        <div class="space-y-4">
          <div
            class="flex justify-between rounded-xl border p-4"
            :style="{ borderColor: 'var(--border)' }"
          >
            <div>
              <h3 class="font-medium">Calcium Carbonate</h3>

              <p :style="{ color: 'var(--muted)' }">After Breakfast</p>
            </div>

            <span>08:00</span>
          </div>

          <div
            class="flex justify-between rounded-xl border p-4"
            :style="{ borderColor: 'var(--border)' }"
          >
            <div>
              <h3 class="font-medium">Vitamin D</h3>

              <p :style="{ color: 'var(--muted)' }">After Dinner</p>
            </div>

            <span>19:00</span>
          </div>
        </div>
      </BaseCard>
    </section>
  </div>
</template>
