import { defineStore } from "pinia";
import { ref } from "vue";

import { InsightService } from "../services/insight.service";
import type { InsightResponse } from "../types/insight";

export const useInsightStore = defineStore("insight", () => {
  const insight = ref<InsightResponse | null>(null);
  const loading = ref(false);

  async function getInsights() {
    loading.value = true;
    try {
      const res = await InsightService.getAll();
      insight.value = res.data;
    } finally {
      loading.value = false;
    }
  }

  return {
    loading,
    insight,
    getInsights,
  };
});
