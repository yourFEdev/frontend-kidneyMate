<script setup lang="ts">
import BaseCard from "../components/common/BaseCard.vue";

import {
  Activity,
  CalendarDays,
  Droplets,
  HeartPulse,
  Pill,
  Scale,
  Clock3,
  AlertCircle,
  CheckCircle2,
} from "lucide-vue-next";
import Chart from "../components/common/Chart.vue";


</script>

<template>
  <div class="space-y-6">
    <section class="grid gap-6 lg:grid-cols-12">
      <BaseCard
        class="lg:col-span-8"
        title="Today's Health Status"
        description="Overall condition today"
      >
        <div class="grid gap-8 lg:grid-cols-[1fr_260px]">
          <div>
            <div class="flex items-center gap-3">
              <div
                class="flex h-14 w-14 items-center justify-center rounded-2xl"
                :style="{ background: 'var(--primary-soft)' }"
              >
                <Activity
                  class="h-7 w-7"
                  :style="{ color: 'var(--primary)' }"
                />
              </div>
              <div>
                <h2 class="text-4xl font-bold dark:text-white">Good 😊</h2>
                <p :style="{ color: 'var(--muted)' }">Stable after dialysis</p>
              </div>
            </div>
            <div class="mt-8">
              <div class="mb-2 flex justify-between">
                <span :style="{ color: 'var(--muted)' }">Health Score</span>
                <span class="font-semibold text-[var(--muted)]">86%</span>
              </div>
              <div
                class="h-3 overflow-hidden rounded-full"
                :style="{ background: 'var(--surface-2)' }"
              >
                <div
                  class="h-full rounded-full"
                  style="width: 86%; background: var(--primary)"
                />
              </div>
            </div>
          </div>
          <div
            class="rounded-2xl p-5"
            :style="{ background: 'var(--surface-2)' }"
          >
            <div class="space-y-5">
              <div>
                <p class="text-sm text-[var(--muted)]">Last Dialysis</p>
                <h3 class="text-lg font-semibold text-[var(--muted)]">
                  Yesterday
                </h3>
              </div>
              <div>
                <p class="text-sm text-[var(--muted)]">Dry Weight</p>
                <h3 class="text-lg font-semibold text-[var(--muted)]">
                  61.8 kg
                </h3>
              </div>
              <div>
                <p class="text-sm text-[var(--muted)]">Hydration</p>
                <h3 class="font-semibold text-green-500 text-[var(--muted)]">
                  Normal
                </h3>
              </div>
            </div>
          </div>
        </div>
      </BaseCard>
      <BaseCard class="lg:col-span-4" title="Next Dialysis">
        <div class="flex h-full flex-col justify-between">
          <div
            class="flex h-14 w-14 items-center justify-center rounded-2xl"
            :style="{ background: 'var(--primary-soft)' }"
          >
            <CalendarDays
              class="h-7 w-7"
              :style="{ color: 'var(--primary)' }"
            />
          </div>
          <div class="mt-6">
            <h2 class="text-4xl font-bold text-[var(--muted)]">1 Day</h2>
            <p class="mt-1 text-[var(--muted)]">Thursday • 09:00 AM</p>
          </div>
          <div
            class="mt-6 rounded-2xl p-4 text-[var(--muted)]"
            :style="{ background: 'var(--primary-soft)' }"
          >
            <Clock3 class="mb-2 h-5 w-5 text-[var(--muted)]" />
            Remember to prepare before treatment.
          </div>
        </div>
      </BaseCard>
    </section>
    <section class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <BaseCard>
        <div class="space-y-5">
          <Droplets class="h-8 w-8 text-blue-500" />
          <div>
            <p class="text-sm text-[var(--muted)]">Fluid Intake</p>
            <h2 class="text-3xl font-bold text-[var(--muted)]">700 ml</h2>
            <p class="text-sm text-[var(--muted)]">Remaining 800 ml</p>
          </div>
        </div>
      </BaseCard>
      <BaseCard>
        <HeartPulse class="h-8 w-8 text-red-500" />
        <div class="mt-5">
          <p class="text-sm text-[var(--muted)]">Blood Pressure</p>
          <h2 class="text-3xl font-bold text-[var(--muted)]">118/78</h2>
          <span class="text-green-500"> Normal </span>
        </div>
      </BaseCard>
      <BaseCard>
        <Scale class="h-8 w-8 text-orange-500" />
        <div class="mt-5">
          <p class="text-sm text-[var(--muted)]">Current Weight</p>
          <h2 class="text-3xl font-bold text-[var(--muted)]">62.4 kg</h2>
          <span class="text-[var(--muted)]"> +0.6 kg </span>
        </div>
      </BaseCard>
      <BaseCard>
        <Pill class="h-8 w-8 text-violet-500" />
        <div class="mt-5">
          <p class="text-sm text-[var(--muted)]">Medication</p>
          <h2 class="text-3xl font-bold text-[var(--muted)]">3 / 4</h2>
          <span class="text-yellow-500"> One remaining </span>
        </div>
      </BaseCard>
    </section>
    <section class="grid gap-6 lg:grid-cols-12">
      <BaseCard class="lg:col-span-8" title="Weekly Fluid Intake">
        <div
          class="flex h-72 items-center justify-center rounded-2xl"
          :style="{ background: 'var(--surface-2)' }"
        >
          <Chart/>
        </div>
      </BaseCard>
      <BaseCard class="lg:col-span-4" title="Symptoms Today">
        <div class="space-y-4 text-[var(--muted)]">
          <div class="flex justify-between">
            <span>Fatigue</span>
            <CheckCircle2 class="text-green-500" />
          </div>
          <div class="flex justify-between">
            <span>Dizziness</span>
            <CheckCircle2 class="text-green-500" />
          </div>
          <div class="flex justify-between">
            <span>Headache</span>
            <AlertCircle class="text-yellow-500" />
          </div>
          <div class="flex justify-between">
            <span>Swelling</span>
            <CheckCircle2 class="text-green-500" />
          </div>
        </div>
      </BaseCard>
    </section>
    <BaseCard title="Today's Timeline">
      <div class="space-y-6 text-[var(--muted)]">
        <div class="flex items-center gap-4">
          <div class="h-3 w-3 rounded-full bg-blue-500" />
          <div>
            <h4 class="font-medium">Blood pressure recorded</h4>
            <p class="text-sm ">08:00 AM</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="h-3 w-3 rounded-full bg-green-500" />
          <div>
            <h4 class="font-medium">Medication taken</h4>
            <p class="text-sm ">09:15 AM</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="h-3 w-3 rounded-full bg-orange-500" />
          <div>
            <h4 class="font-medium">Drink 250 ml</h4>
            <p class="text-sm ">11:20 AM</p>
          </div>
        </div>
      </div>
    </BaseCard>
  </div>
</template>
