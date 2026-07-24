<script setup lang="ts">
import BaseCard from "../components/common/BaseCard.vue";

import Button from "../components/ui/button/Button.vue";
import Input from "../components/ui/input/Input.vue";
import Chart from "../components/common/Chart.vue";


import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "../components/ui/table/index.ts";

import {
  HeartPulse,
  Activity,
  CircleCheck,
  Clock3,
  Plus,
  Info,
} from "lucide-vue-next";
</script>

<template>
  <div class="space-y-6 p-4 text-[var(--muted)]">
    <!-- Header -->
    <section
      class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <h2 class="text-3xl font-bold" :style="{ color: 'var(--foreground)' }">
          Blood Pressure
        </h2>

        <p :style="{ color: 'var(--muted)' }">
          Track and monitor your blood pressure readings.
        </p>
      </div>

      <Button class="rounded-2xl">
        <Plus class="mr-2 h-4 w-4" />

        Add Record
      </Button>
    </section>

    <!-- Summary -->

    <section class="grid gap-6 lg:grid-cols-12">
      <!-- Latest -->

      <BaseCard class="lg:col-span-6" title="Latest Reading">
        <div class="space-y-6">
          <div class="flex items-center gap-4">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl"
              :style="{ background: 'var(--primary-soft)' }"
            >
              <HeartPulse
                class="h-7 w-7"
                :style="{ color: 'var(--primary)' }"
              />
            </div>

            <div>
              <h2 class="text-5xl font-bold">118 / 78</h2>

              <p :style="{ color: 'var(--muted)' }">Recorded today at 08:15</p>
            </div>
          </div>

          <div
            class="rounded-2xl p-4"
            :style="{ background: 'var(--primary-soft)' }"
          >
            <div class="flex items-center gap-2">
              <CircleCheck class="h-5 w-5 text-green-500" />

              <span class="font-medium"> Normal Blood Pressure </span>
            </div>
          </div>
        </div>
      </BaseCard>

      <!-- Pulse -->

      <BaseCard class="lg:col-span-2">
        <Activity class="mb-5 h-8 w-8 text-red-500" />

        <p class="text-sm text-[var(--muted)]">Pulse</p>

        <h2 class="mt-2 text-3xl font-bold">74 bpm</h2>
      </BaseCard>

      <!-- Status -->

      <BaseCard class="lg:col-span-2">
        <CircleCheck class="mb-5 h-8 w-8 text-green-500" />

        <p class="text-sm text-[var(--muted)]">Status</p>

        <h2 class="mt-2 text-2xl font-bold">Normal</h2>
      </BaseCard>

      <!-- Records -->

      <BaseCard class="lg:col-span-2">
        <Clock3 class="mb-5 h-8 w-8 text-blue-500" />

        <p class="text-sm text-[var(--muted)]">Today's Records</p>

        <h2 class="mt-2 text-3xl font-bold">3</h2>
      </BaseCard>
    </section>

    <!-- CRUD -->

    <BaseCard
      title="Blood Pressure History"
      description="All blood pressure records"
    >
      <div class="mb-6 flex flex-col gap-4 md:flex-row md:justify-between">
        <Input class="max-w-sm" placeholder="Search record..." />

        <Button>
          <Plus class="mr-2 h-4 w-4" />

          Add Record
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>

            <TableHead>Time</TableHead>

            <TableHead>Systolic</TableHead>

            <TableHead>Diastolic</TableHead>

            <TableHead>Pulse</TableHead>

            <TableHead>Status</TableHead>

            <TableHead class="text-right"> Action </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>22 Jul 2026</TableCell>

            <TableCell>08:15</TableCell>

            <TableCell>118</TableCell>

            <TableCell>78</TableCell>

            <TableCell>74 bpm</TableCell>

            <TableCell>
              <span
                class="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600"
              >
                Normal
              </span>
            </TableCell>

            <TableCell class="text-right space-x-2">
              <Button size="sm" variant="outline"> Edit </Button>

              <Button size="sm" variant="destructive"> Delete </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </BaseCard>

    <!-- Bottom -->

    <section class="grid gap-6 lg:grid-cols-12">
      <BaseCard class="lg:col-span-8" title="Weekly Blood Pressure Trend">
        <div
          class="flex h-80 items-center justify-center rounded-2xl"
          :style="{ background: 'var(--surface-2)' }"
        >
          <Chart/>
        </div>
      </BaseCard>

      <BaseCard class="lg:col-span-4" title="Blood Pressure Guide">
        <div class="space-y-4">
          <div
            class="rounded-xl p-4"
            :style="{ background: 'var(--primary-soft)' }"
          >
            ❤️ Normal
            <br />
            90–120 / 60–80 mmHg
          </div>

          <div
            class="rounded-xl p-4"
            :style="{ background: 'var(--surface-2)' }"
          >
            📈 Measure after resting for at least 5 minutes.
          </div>

          <div
            class="rounded-xl p-4"
            :style="{ background: 'var(--surface-2)' }"
          >
            💊 Take medication consistently before measuring if prescribed.
          </div>

          <div
            class="rounded-xl p-4"
            :style="{ background: 'var(--surface-2)' }"
          >
            <Info class="mb-2 h-5 w-5" />
            Record measurements at the same time each day for more consistent
            tracking.
          </div>
        </div>
      </BaseCard>
    </section>
  </div>
</template>
