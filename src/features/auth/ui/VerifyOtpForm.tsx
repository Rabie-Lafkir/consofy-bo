import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  Button,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@shared/ui";

import {
  otpSchema,
  type OtpFormValues,
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "@features/auth/model/useVerifyOtpMutation";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export const VerifyOtpForm = () => {
  /* email is passed by <Navigate state={{ email }}> after register / forgot */
  const { state } = useLocation() as { state?: { email: string } };
  const email = state?.email ?? "";

  /* react-hook-form ----------------------------------------------------- */
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { email, otp: "" },
  });

  /* mutations ----------------------------------------------------------- */
  const navigate = useNavigate();
  const {
    mutate: verify,
    isPending: verifying,
    error,
  } = useVerifyOtpMutation();
  const {
    mutate: resend,
    isPending: resending,
  } = useResendOtpMutation();

  const [info, setInfo] = useState("");

  const onSubmit = (v: OtpFormValues) =>
    verify(v, { onSuccess: () => navigate("/", { replace: true }) });

  const handleResend = () =>
    resend(email, {
      onSuccess: () => setInfo("Code sent again"),
      onError: () => setInfo(""),
    });

  /* ui ------------------------------------------------------------------ */
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* 6-digit OTP input (shadcn/ui) ---------------------------------- */}
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
              >
                <InputOTPGroup>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* server / info messages ----------------------------------------- */}
        {error && (
          <p className="text-destructive text-sm">{error.message}</p>
        )}
        {info && <p className="text-primary text-sm">{info}</p>}

        {/* actions -------------------------------------------------------- */}
        <Button className="w-full" disabled={verifying}>
          {verifying ? "Verifying…" : "Verify"}
        </Button>

        <Button
          variant="ghost"
          className="w-full"
          type="button"
          onClick={handleResend}
          disabled={!email || resending}
        >
          {resending ? "Sending…" : "Resend code"}
        </Button>
      </form>
    </Form>
  );
};
