import api from "./api";

export const InsightService = {
  async getAll() {
    const { data } = await api.get("/insight/");
    return data;
  },
};
