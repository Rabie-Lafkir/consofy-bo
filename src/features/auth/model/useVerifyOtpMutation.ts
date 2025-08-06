import { email, z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { verifyOtp, resendOtp } from "@features/auth/api/otp";

export const otpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6, "Enter the 6-digit code"),
});

export type OtpFormValues = z.infer<typeof otpSchema>;

export const useVerifyOtpMutation = () =>
  useMutation({
    mutationFn: ({ email, otp }: OtpFormValues) => verifyOtp(email, otp),
  });

export const useResendOtpMutation = () =>
  useMutation({
    mutationFn: (email: string) => resendOtp(email),
  });
