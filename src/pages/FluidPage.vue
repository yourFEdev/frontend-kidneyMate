<script setup lang="ts">
import BaseCard from "../components/common/BaseCard.vue";

import {
  Droplets,
  Plus,
  GlassWater,
  TrendingUp,
  CircleAlert,
} from "lucide-vue-next";
import Chart from "../components/common/Chart.vue";
</script>
<template>
  <div class="space-y-6 p-4 text-[var(--muted)]">
    <!-- Header -->
    <section
      class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <h2 class="text-3xl font-bold" :style="{ color: 'var(--foreground)' }">
          Fluid Tracker
        </h2>

        <p :style="{ color: 'var(--muted)' }">
          Monitor your daily fluid intake.
        </p>
      </div>
      <Button class="rounded-2xl">
        <Plus class="mr-2 h-4 w-4" />
        Add Intake
      </Button>
    </section>
    <section class="grid gap-6 lg:grid-cols-12">
      <BaseCard class="lg:col-span-6" title="Today's Progress">
        <div class="space-y-6">
          <div class="flex items-center gap-4">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl"
              :style="{ background: 'var(--primary-soft)' }"
            >
              <Droplets class="h-7 w-7" :style="{ color: 'var(--primary)' }" />
            </div>
            <div>
              <h2 class="text-4xl font-bold">700 ml</h2>
              <p :style="{ color: 'var(--muted)' }">of 1500 ml daily limit</p>
            </div>
          </div>
          <div>
            <div class="mb-2 flex justify-between">
              <span>Progress</span>
              <span>47%</span>
            </div>
            <div
              class="h-3 rounded-full"
              :style="{ background: 'var(--surface-2)' }"
            >
              <div
                class="h-full rounded-full"
                style="width: 47%; background: var(--primary)"
              />
            </div>
          </div>
        </div>
      </BaseCard>
      <BaseCard class="lg:col-span-2">
        <GlassWater class="mb-6 h-8 w-8 text-blue-500" />
        <p class="text-sm text-[var(--muted)]">Remaining</p>
        <h2 class="mt-2 text-3xl font-bold">800 ml</h2>
      </BaseCard>
      <BaseCard class="lg:col-span-2">
        <CircleAlert class="mb-6 h-8 w-8 text-yellow-500" />
        <p class="text-sm text-[var(--muted)]">Daily Limit</p>
        <h2 class="mt-2 text-3xl font-bold">1500 ml</h2>
      </BaseCard>
      <BaseCard class="lg:col-span-2">
        <TrendingUp class="mb-6 h-8 w-8 text-green-500" />
        <p class="text-sm text-[var(--muted)]">Entries</p>
        <h2 class="mt-2 text-3xl font-bold">5</h2>
      </BaseCard>
    </section>
    <BaseCard title="Today's Intake" description="All fluid records for today">
      <div class="mb-6 flex justify-between">
        <Input placeholder="Search..." class="max-w-xs" />
        <Button>
          <Plus class="mr-2 h-4 w-4" />
          Add Intake
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Drink</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead class="text-right"> Action </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>08:00</TableCell>
            <TableCell>Water</TableCell>
            <TableCell>250 ml</TableCell>
            <TableCell>-</TableCell>
            <TableCell class="text-right space-x-2">
              <Button size="icon" variant="outline"> Edit </Button>
              <Button size="icon" variant="destructive"> Delete </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </BaseCard>
    <section class="grid gap-6 lg:grid-cols-12">
      <BaseCard class="lg:col-span-8" title="Weekly Fluid Trend">
        <div
          class="flex h-80 items-center justify-center rounded-2xl"
          :style="{ background: 'var(--surface-2)' }"
        >
          <Chart/>
        </div>
      </BaseCard>
      <BaseCard class="lg:col-span-4" title="Daily Tips">
        <div class="space-y-4">
          <div
            class="rounded-xl p-4"
            :style="{ background: 'var(--primary-soft)' }"
          >
            💧 Drink slowly instead of consuming a large amount at once.
          </div>
          <div
            class="rounded-xl p-4"
            :style="{ background: 'var(--surface-2)' }"
          >
            🍉 Fruits also contribute to fluid intake.
          </div>
          <div
            class="rounded-xl p-4"
            :style="{ background: 'var(--surface-2)' }"
          >
            ⏰ Track every drink immediately after consuming it.
          </div>
        </div>
      </BaseCard>
    </section>
  </div>
</template>
