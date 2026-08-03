import { defineStore } from "pinia";
import { ref } from "vue";

import type { ReportResponse } from "../types/reports";
import { ReportService } from "../services/report.service";

export const useReportStore = defineStore("report", () => {
  const report = ref<ReportResponse | null>(null);
  const loading = ref(false);

  async function getReports() {
    loading.value = true;
    try {
      const res = await ReportService.getAll();
      report.value = res.data;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    report,

    getReports,
  };
});
