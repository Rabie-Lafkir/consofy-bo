import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { register, type RegisterDto } from "@features/auth/api/register";
import { normalizeAxiosError } from "@shared/lib/http-error";

/* ── Zod schema & inferred type ────────────────────────────────────────── */
export const registerSchema = z
  .object({
    businessName: z.string().min(2, "Name too short"),
    email: z.string().email(),
    password: z.string().min(6),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    path: ["confirm"],
    message: "Passwords don't match",
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

/* ── TanStack Query mutation ─────────────────────────────────────────────
   • Calls /api/auth/register
   • Surfaces backend validation with friendly message
   • DOES NOT auto-login ─ the caller (RegisterForm) decides what to do next
------------------------------------------------------------------------- */
export const useRegisterMutation = () =>
  useMutation({
    mutationFn: async (v: RegisterFormValues) => {
      const dto: RegisterDto = {
        businessName: v.businessName,
        email: v.email,
        password: v.password,
        confirmPassword: v.confirm
      };

      try {
        return await register(dto);
      } catch (e) {
        throw normalizeAxiosError(e);
      }
    },
  });
