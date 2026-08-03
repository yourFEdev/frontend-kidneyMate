import api from "./api";

import type { ProfilePasswordPayload } from "../types/profile";

export const ProfileService = {
  async get() {
    const { data } = await api.get("/profile");
    return data;
  },

  async changePassword(payload: ProfilePasswordPayload) {
    const { data } = await api.post("/profile/password", payload);
    return data;
  },
};
