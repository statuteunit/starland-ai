export interface SendCodeRequest {
  email: string;
}

export interface SendCodeResponse {
  message?: string;
  email?: string;
  code?: string;
  expires_in_minutes?: number;
}