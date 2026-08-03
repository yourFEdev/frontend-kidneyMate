export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserProps {
  id: number;
  name: string;
  email: string;
  daily_fluid_limit: number;
  created_at: string;
  updated_at: string;
  role?: string;
}

export interface LoginResponse {
  user: UserProps;
  token: string;
}
