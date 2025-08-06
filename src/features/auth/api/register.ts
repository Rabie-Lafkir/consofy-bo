import { api } from "./auth";
export interface RegisterDto {
  businessName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export async function register(dto: RegisterDto) {
  const { data } = await api.post("/api/auth/register", dto);
  return data as { message: string };
}
