import { api } from "./auth";
import { normalizeAxiosError } from "@shared/lib/http-error";

export async function verifyOtp(email:string, otp: string) {
  try {
    const { data } = await api.post<{ token: string }>("/api/auth/verify-otp", { email , otp });
    return data;
  } catch (err) {
    throw normalizeAxiosError(err);
  }
}

export async function resendOtp(email: string) {
  try {
    await api.post("/api/auth/resend-otp", { email });
  } catch (err) {
    throw normalizeAxiosError(err);
  }
}
