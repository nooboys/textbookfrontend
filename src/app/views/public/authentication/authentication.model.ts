export interface AuthenticationState {
  name: string;
  email: string;
  token: string;
}

export interface UserResponse {
  id: number;
  role: string;
  first_name: string;
  last_name: string;
  organization_id: number;
  organization_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export type UserDetails = Omit<AuthenticationState, 'token'>;

export enum CardStates {
  DEFAULT = 'default',
  FLIPPED = 'flipped',
}
export interface CardState {
  state: CardStates;
}

export interface ForgotPwdRequestParams {
  email: string;
}

export interface ForgotPwdResponse {
  message: string;
}

export interface ResetPwdRequestParams {
  password: string;
  password_confirmation: string;
}

export interface ChangePwdRequestParams {
  current_password: string;
  new_password: string;
  confirm_password: string;
}
