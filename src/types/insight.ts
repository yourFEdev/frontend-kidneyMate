export interface InsightResponse {
  health_score: number;
  medication_adherence: number;
  fluid_goal: number;
  blood_pressure_status: string;
  summary: string;
}

export interface InsightPayload {
  health_score: number;
  medication_adherence: number;
  fluid_goal: number;
  blood_pressure_status: string;
  summary: string;
}
