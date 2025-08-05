import axios from "axios";

export interface LoginDto   { email: string; password: string }
export interface AuthTokens { access: string; refresh: string }

/* ------------------------------------------------------------------
   Central axios instance: base URL comes from your .env* files
   ------------------------------------------------------------------ */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" }
});

/* ------------------------------------------------------------------
   Auth endpoints
   ------------------------------------------------------------------ */
export async function login(dto: LoginDto): Promise<AuthTokens> {
  const { data } = await api.post<AuthTokens>("/api/auth/login", dto);
  return data;
}

export async function refresh(refreshToken: string): Promise<AuthTokens> {
  const { data } = await api.post<AuthTokens>("/api/auth/refresh", {
    refreshToken
  });
  return data;
}
