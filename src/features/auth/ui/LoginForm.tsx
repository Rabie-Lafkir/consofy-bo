import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Input,
  Label,
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@shared/ui";

import {
  loginSchema,
  type LoginFormValues,
  useLoginMutation,
} from "@features/auth/model/useLoginMutation";

import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  /* form instance -------------------------------------------------------- */
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  /* mutation hook -------------------------------------------------------- */
  const navigate = useNavigate();
  const { mutate, isPending, error } = useLoginMutation();

  const onSubmit = (values: LoginFormValues) =>
    mutate(values, { onSuccess: () => navigate("/", { replace: true }) });

  /* UI ------------------------------------------------------------------- */
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* E-mail ----------------------------------------------------------- */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password -------------------------------------------------------- */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error message ---------------------------------------------------- */}
        {error && (
          <p className="text-destructive text-sm">{error.message}</p>
        )}

        {/* Submit ----------------------------------------------------------- */}
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </Form>
  );
};
