export interface FluidIntake {
  id: number;
  drink_name: string;
  amount: number;
  notes: string | null;
  drank_at: string;
  created_at: string;
  updated_at: string;
}

export interface FluidPayload {
  drink_name: string;
  amount: number;
  notes?: string;
}