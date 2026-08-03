export interface DashboardResponse {
  health_score: number;
  summary: DashboardSummary;
  next_dialysis: DashboardSchedule | null;
  last_dialysis: DashboardSchedule | null;
  weekly_fluid: DashboardWeeklyFluid[];
  symptoms: DashboardSymptom[];
}

export interface DashboardSummary {
  fluid_today: number;
  fluid_limit: number;
  blood_pressure: DashboardBloodPressure;
  weight: number | null;
  medication: DashboardMedication;
}

export interface DashboardBloodPressure {
  systolic: number | null;
  diastolic: number | null;
}

export interface DashboardMedication {
  taken: number;
  scheduled: number;
  total: number;
}

export interface DashboardSchedule {
  id: number;
  user_id: number;
  type: "dialysis" | "doctor" | "medication";
  title: string;
  description: string;
  scheduled_at: string;
  status: "scheduled" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
}

export interface DashboardWeeklyFluid {
  date: string;
  total: string;
}

export interface DashboardSymptom {
  name: string;
  status: "normal" | "warning";
}
