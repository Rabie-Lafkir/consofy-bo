import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
} from "@shared/ui";
import { AlertTriangle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="grid min-h-dvh place-items-center bg-surface-soft px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="flex flex-col items-center gap-2">
          <AlertTriangle className="h-10 w-10 text-destructive" />
          <h1 className="text-3xl font-semibold tracking-tight">404</h1>
          <p className="text-muted-foreground">
            Sorry, we couldn’t find that page.
          </p>
        </CardHeader>

        <CardContent>
          <Button asChild className="w-full">
            <Link to="/">Go back home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
