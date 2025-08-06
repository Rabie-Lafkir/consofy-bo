import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form, FormField, FormItem, FormMessage,
  Button, Input, Label,
} from "@shared/ui";
import {
  registerSchema,
  type RegisterFormValues,
  useRegisterMutation,
} from "@features/auth/model/useRegisterMutation";
import { useNavigate, Link } from "react-router-dom";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useRegisterMutation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { businessName: "", email: "", password: "", confirm: "" },
  });

  const onSubmit = (v: RegisterFormValues) =>
    mutate(v, {
      onSuccess: () =>
        navigate("/verify-otp", { state: { email: v.email } }),
    });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField control={form.control} name="businessName" render={({ field }) => (
          <FormItem>
            <Label>Business name</Label>
            <Input {...field} />
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <Label>Email</Label>
            <Input type="email" {...field} />
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <Label>Password</Label>
            <Input type="password" {...field} />
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="confirm" render={({ field }) => (
          <FormItem>
            <Label>Confirm Password</Label>
            <Input type="password" {...field} />
            <FormMessage />
          </FormItem>
        )} />

        {error && <p className="text-destructive text-sm">{error.message}</p>}

        <Button className="w-full" disabled={isPending}>
          {isPending ? "Creating…" : "Create account"}
        </Button>

        <p className="text-xs text-center text-muted-foreground pt-2">
          Already have an account?{" "}
          <Link to="/login" className="underline">Sign in</Link>
        </p>
      </form>
    </Form>
  );
};
