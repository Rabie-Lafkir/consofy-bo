import { LoginForm } from "@features/auth";
import { Card, CardHeader, CardContent } from "@shared/ui";

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-surface-soft">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Consofy BO</h1>
          <p className="text-sm text-muted-foreground text-center">
            Sign in to continue
          </p>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
