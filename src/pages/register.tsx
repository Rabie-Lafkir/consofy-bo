import { RegisterForm } from "@features/auth";
import { Card, CardHeader, CardContent } from "@shared/ui";

export default function RegisterPage() {
    return (
        <main className="grid min-h-dvh place-items-center bg-surface-soft px-4 py-6">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <h1 className="text-xl font-semibold text-center">Create account</h1>
                </CardHeader>
                <CardContent>
                    <RegisterForm />
                </CardContent>
            </Card>
        </main>
    );
}
