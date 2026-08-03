<script setup lang="ts">
import { Download, Eye, Share2 } from "lucide-vue-next";
import { BaseCard, BaseHeader } from "../components/common";
import { StatSkeleton, HeaderSkeleton } from "../components/skeleton";
import { useReportStore } from "../stores/report.store.ts";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const reportStore = useReportStore();
const { report, loading } = storeToRefs(reportStore);

onMounted(() => {
  reportStore.getReports();
});

const emptyReport = false;
</script>

<template>
  <div v-if="!emptyReport" class="space-y-8 text-[var(--muted)]">
    <HeaderSkeleton v-if="loading" />
    <BaseHeader
      title="Reports"
      subtitle="Generate, review and share your health journey."
      v-else
    />
    <StatSkeleton v-if="loading" />
    <BaseCard title="Not enough report data" v-else />
  </div>

  <div class="space-y-8 text-[var(--muted)]" v-else>
    <!-- HEADER -->
    <HeaderSkeleton v-if="loading" />
    <BaseHeader
      title="Reports"
      subtitle="Generate, review and share your health journey."
      v-else
    />
    <!-- Hero -->
    <StatSkeleton v-if="loading" />
    <BaseCard v-else>
      <div
        class="rounded-3xl p-8 text-white"
        style="background: linear-gradient(135deg, #0ea5e9, #2563eb)"
      >
        <div
          class="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <p class="uppercase tracking-[4px] opacity-80">July 2026 Report</p>

            <h2 class="mt-2 text-4xl font-bold">Your Monthly Health Journey</h2>

            <p class="mt-3 opacity-90 max-w-xl">
              A complete summary of your dialysis, medication, fluid intake and
              blood pressure.
            </p>
          </div>

          <div class="text-center">
            <div
              class="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-8 border-white/20 bg-white/10 backdrop-blur"
            >
              <span class="text-5xl font-bold">
                {{ report?.health_score }}
              </span>
            </div>

            <p class="mt-4 font-medium">Overall Health Score</p>
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
  </div>
</template>
