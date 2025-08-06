import { VerifyOtpForm } from "@/features/auth/ui/VerifyOtpForm";
import { Card, CardHeader, CardContent } from "@shared/ui";

export default function VerifyOtpPage() {
    return (
        <main className="grid min-h-dvh place-items-center bg-surface-soft px-4 py-6">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <h1 className="text-xl font-semibold text-center">Verify code</h1>
                </CardHeader>
                <CardContent>
                    <VerifyOtpForm />
                </CardContent>
            </Card>
        </main>
    );
}
