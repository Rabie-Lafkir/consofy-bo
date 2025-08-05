import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { login as apiLogin } from "@features/auth/api/auth";
import { useAuth } from "@features/auth";
import { normalizeAxiosError } from "@shared/lib/http-error";

/* ── Zod schema & type ─────────────────────────────────────────────────── */
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

/* ── Mutation hook ─────────────────────────────────────────────────────── */
export const useLoginMutation = () => {
  const setTokens = useAuth((s) => s.setTokens);

  return useMutation({
    /** Wrap the API call so any AxiosError is converted first */
    mutationFn: async (dto: LoginFormValues) => {
      try {
        return await apiLogin(dto);                // { access, refresh }
      } catch (err) {
        throw normalizeAxiosError(err);            // Error("Invalid credentials.")
      }
    },
    onSuccess: (tokens) => setTokens(tokens),
  });
};
