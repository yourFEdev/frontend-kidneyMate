import api from "./api";

export const DashboardService = {
  async getAll() {
    const { data } = await api.get("/dashboard");
    return data;
  },
};
