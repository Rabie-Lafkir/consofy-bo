import { LoginForm } from "@features/auth";
import { Card, CardHeader, CardContent } from "@shared/ui";
import { Link } from "react-router";

export default function LoginPage() {
  return (
    <main className="grid min-h-dvh place-items-center bg-surface-soft px-4 py-6">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Consofy BO</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to continue
          </p>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <p className="text-xs text-center text-muted-foreground pt-2">
          New here? <Link to="/register" className="underline">Create an account</Link>
        </p>
      </Card>
    </main>
  );
}
