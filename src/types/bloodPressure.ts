export interface BloodPressure {
  id: number;
  systolic: number;
  diastolic: number;
  pulse: number;
  measured_at: string;
}

export interface BloodPressurePayload {
  systolic: number;
  diastolic: number;
  pulse: number;
  measured_at: string;
}
