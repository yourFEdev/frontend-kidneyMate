import api from "./api";

export const ReportService = {
  async getAll() {
    const { data } = await api.get("/reports");
    return data;
  },
};
