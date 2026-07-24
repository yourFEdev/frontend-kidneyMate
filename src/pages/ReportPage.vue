<script setup lang="ts">
import {
  Download,
  Eye,
  Share2,
  HeartPulse,
  Droplets,
  Scale,
  Pill,
  Sparkles,
  FileText,
 
} from "lucide-vue-next";

import BaseCard from "../components/common/BaseCard.vue";
const stats = [
  {
    title: "Average BP",
    value: "122 / 81",
    icon: HeartPulse,
    color: "#ef4444",
  },
  {
    title: "Weight",
    value: "61.8 kg",
    icon: Scale,
    color: "#3b82f6",
  },
  {
    title: "Fluid Goal",
    value: "92%",
    icon: Droplets,
    color: "#06b6d4",
  },
  {
    title: "Medication",
    value: "95%",
    icon: Pill,
    color: "#10b981",
  },
];

const timeline = [
  {
    month: "July 2026",
    status: "Monthly report generated",
  },
  {
    month: "June 2026",
    status: "Shared with doctor",
  },
  {
    month: "May 2026",
    status: "Monthly report generated",
  },
];
</script>

<template>
  <div class="space-y-6">

    <!-- HEADER -->

    <section>
      <h1
        class="text-3xl font-bold"
        :style="{ color: 'var(--foreground)' }"
      >
        Health Reports
      </h1>

      <p
        class="mt-2"
        :style="{ color: 'var(--muted)' }"
      >
        Generate, review and share your health journey.
      </p>
    </section>

    <!-- HERO -->

    <BaseCard>

      <div
        class="rounded-3xl p-8 text-white"
        style="
          background:
          linear-gradient(
          135deg,
          #0ea5e9,
          #2563eb
          );
        "
      >

        <div
          class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
        >

          <div>

            <p class="uppercase tracking-[4px] opacity-80">
              July 2026 Report
            </p>

            <h2 class="mt-2 text-4xl font-bold">
              Your Monthly Health Journey
            </h2>

            <p class="mt-3 opacity-90 max-w-xl">
              A complete summary of your dialysis,
              medication, fluid intake and blood pressure.
            </p>

          </div>

          <div class="text-center">

            <div
              class="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-8 border-white/20 bg-white/10 backdrop-blur"
            >
              <span class="text-5xl font-bold">
                87
              </span>
            </div>

            <p class="mt-4 font-medium">
              Overall Health Score
            </p>

          </div>

        </div>

        <div class="mt-8 flex flex-wrap gap-3">

          <button
            class="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-sky-700"
          >
            <Eye :size="18" />
            Preview
          </button>

          <button
            class="flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3"
          >
            <Download :size="18" />
            Download
          </button>

          <button
            class="flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3"
          >
            <Share2 :size="18" />
            Share
          </button>

        </div>

      </div>

    </BaseCard>

    <!-- SUMMARY -->

    <section class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

      <BaseCard
        v-for="item in stats"
        :key="item.title"
      >

        <div class="text-center">

          <component
            :is="item.icon"
            :size="34"
            class="mx-auto mb-4"
            :style="{ color: item.color }"
          />

          <h2
            class="text-3xl font-bold"
            :style="{ color: 'var(--foreground)' }"
          >
            {{ item.value }}
          </h2>

          <p
            class="mt-2"
            :style="{ color: 'var(--muted)' }"
          >
            {{ item.title }}
          </p>

        </div>

      </BaseCard>

    </section>

    <!-- CONTENT -->

    <section class="grid gap-6 xl:grid-cols-5">

      <!-- PDF -->

      <div class="xl:col-span-3">

        <BaseCard
          title="PDF Preview"
          description="Monthly health report"
        >

          <div
            class="mx-auto aspect-[8.5/11] max-w-md rounded-2xl border p-6"
            :style="{
              borderColor:'var(--border)',
              background:'var(--background)'
            }"
          >

            <div class="flex items-center gap-2">

              <FileText
                class="text-sky-500"
                :size="22"
              />

              <span class="font-semibold">
                KidneyMate Report
              </span>

            </div>

            <div class="mt-8 space-y-4">

              <div
                class="h-3 rounded-full"
                style="background:#dbeafe"
              />

              <div
                class="h-3 w-3/4 rounded-full"
                style="background:#dbeafe"
              />

              <div
                class="mt-6 h-40 rounded-xl bg-slate-100"
              />

              <div
                class="h-3 rounded-full"
                style="background:#dbeafe"
              />

              <div
                class="h-3 w-5/6 rounded-full"
                style="background:#dbeafe"
              />

            </div>

          </div>

        </BaseCard>

      </div>

      <!-- AI -->

      <div class="xl:col-span-2">

        <BaseCard
          title="AI Summary"
          description="Generated from your health data"
        >

          <div class="space-y-5">

            <div class="flex gap-3">

              <Sparkles
                class="text-amber-500"
              />

              <p>
                Blood pressure remained stable
                throughout the month.
              </p>

            </div>

            <div class="flex gap-3">

              <Droplets
                class="text-cyan-500"
              />

              <p>
                Fluid goal achieved
                on 92% of recorded days.
              </p>

            </div>

            <div class="flex gap-3">

              <Pill
                class="text-emerald-500"
              />

              <p>
                Medication adherence
                reached an excellent 95%.
              </p>

            </div>

            <div
              class="rounded-2xl p-4"
              :style="{
                background:'var(--background)'
              }"
            >

              <p class="font-semibold">
                Recommendation
              </p>

              <p
                class="mt-2 text-sm"
                :style="{ color:'var(--muted)' }"
              >
                Keep your current routine and
                continue monitoring your daily
                fluid intake.
              </p>

            </div>

          </div>

        </BaseCard>

      </div>

    </section>

    <!-- HEALTH JOURNEY -->

    <BaseCard
      title="Health Journey"
      description="Progress throughout the year"
    >

      <div class="space-y-5">

        <div
          v-for="month in [
            'Jan','Feb','Mar','Apr','May','Jun','Jul'
          ]"
          :key="month"
        >

          <div class="mb-2 flex justify-between">

            <span>{{ month }}</span>

            <span>85%</span>

          </div>

          <div
            class="h-3 overflow-hidden rounded-full"
            :style="{ background:'var(--border)' }"
          >

            <div
              class="h-full rounded-full bg-gradient-to-r from-sky-400 to-blue-600"
              style="width:85%;"
            />

          </div>

        </div>

      </div>

    </BaseCard>

    <!-- TIMELINE -->

    <BaseCard
      title="Report Timeline"
      description="History of generated reports"
    >

      <div
        class="space-y-8 text-[var(--muted)]"
      >

        <div
          v-for="item in timeline"
          :key="item.month"
          class="flex gap-5"
        >

          <div
            class="flex flex-col items-center"
          >

            <div
              class="h-4 w-4 rounded-full bg-sky-500"
            />

            <div
              class="mt-1 h-full w-px"
              :style="{ background:'var(--border)' }"
            />

          </div>

          <div>

            <h3
              class="font-semibold"
            >
              {{ item.month }}
            </h3>

            <p
              :style="{ color:'var(--muted)' }"
            >
              {{ item.status }}
            </p>

          </div>

        </div>

      </div>

    </BaseCard>

  </div>
</template>