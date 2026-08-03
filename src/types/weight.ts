export interface WeightRecord {
  id: number;
  user_id: number;
  weight: string;
  notes: string | null;
  recorded_at: string;
  created_at: string;
  updated_at: string;
}

export interface WeightPayload {
  weight: number;
  notes?: string;
}
