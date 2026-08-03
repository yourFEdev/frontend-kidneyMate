export interface ProfileResponse {
  id: number;
  name: string;
  email: string;
  daily_fluid_limit: number;
  email_verified_at: null;
  created_at: string;
  updated_at: string;
}

export interface ProfilePasswordPayload {
  current_password: string;
  password: string;
  password_confirmation: string;
}
