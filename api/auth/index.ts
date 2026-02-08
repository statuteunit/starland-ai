import api from "@/utils/request"
import type { SendCodeRequest, SendCodeResponse } from "./types"

const AUTH_BASE = "/api/auth"

export async function sendVerificationCode(payload: SendCodeRequest) {
  const res = await api.post<SendCodeResponse>(`${AUTH_BASE}/send-code`, payload)
  return res.data
}

export type { SendCodeRequest, SendCodeResponse }
