import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login as apiLogin, refresh as apiRefresh, type AuthTokens } from "../api/auth";
import type { User } from "@entities/user/User";

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setTokens: (t: AuthTokens) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      async login(email, password) {
        const tokens = await apiLogin({ email, password });
        set({ tokens });
        // optional: fetch current user profile here
      },
      logout() {
        set({ tokens: null, user: null });
      },
      setTokens(tokens) {
        set({ tokens });
      },
    }),
    {
      name: "consofy-auth", 
      partialize: (s) => ({ tokens: s.tokens }),
    }
  )
);
