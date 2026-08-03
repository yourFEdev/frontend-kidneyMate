import { computed, ref } from "vue";
import { defineStore } from "pinia";

import { DashboardService } from "../services/dashboard.service";
import type { DashboardResponse } from "../types/dashboard";

export const useDashboardStore = defineStore("dashboard", () => {
  const dashboard = ref<DashboardResponse | null>(null);
  const loading = ref(false);

  const summary = computed(() => dashboard.value?.summary);

  const nextDialysis = computed(() => dashboard.value?.next_dialysis);

  const nextDialysisDate = computed(() => {
    if (!nextDialysis.value) return "-";

    const date = new Date(nextDialysis.value.scheduled_at);

    const formattedDate = date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedDate} ${formattedTime}`;
  });
  const weeklyFluid = computed(() => dashboard.value?.weekly_fluid ?? []);

  const remainingFluid = computed(() => {
    if (!summary.value) return 0;

    return Math.max(summary.value.fluid_limit - summary.value.fluid_today, 0);
  });

  const remainingDialysisDays = computed(() => {
    if (!nextDialysis.value) return null;

    const diff =
      new Date(nextDialysis.value.scheduled_at).getTime() - Date.now();

    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  });

  async function getDashboard() {
    loading.value = true;

    try {
      const res = await DashboardService.getAll();
      dashboard.value = res.data;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,

    dashboard,

    summary,
    nextDialysisDate,
    weeklyFluid,

    remainingFluid,
    remainingDialysisDays,

    getDashboard,
  };
});
