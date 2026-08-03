import { defineStore } from "pinia";
import { ref } from "vue";

import { ProfileService } from "../services/profile.service";
import type { ProfileResponse, ProfilePasswordPayload } from "../types/profile";

export const useProfileStore = defineStore("profile", () => {
  const profiles = ref<ProfileResponse[]>([]);
  const loading = ref(false);

  async function get() {
    loading.value = true;
    try {
      const res = await ProfileService.get();
      profiles.value = res.data;
    } finally {
      loading.value = false;
    }
  }

  async function changePassword(payload: ProfilePasswordPayload) {
    const res = await ProfileService.changePassword(payload);
    profiles.value.unshift(res.data);
    return res.data;
  }

  return {
    loading,

    get,
    changePassword,
  };
});
