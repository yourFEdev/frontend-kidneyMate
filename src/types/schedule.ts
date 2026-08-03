export interface ScheduleResponse {
  id: number;
  user_id: number;
  type: string;
  title: string;
  description: string;
  scheduled_at: string;
  status?: string;
  created_at: string;
  updated_at: string;
}

export interface SchedulePayload {
  type: string;
  title: string;
  description: string;
  scheduled_at: string;
  status?: string;
}
