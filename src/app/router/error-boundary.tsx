import { useRouteError } from "react-router-dom";

export const RouteError = () => {
  const error = useRouteError() as unknown;
  console.error(error);

  return (
    <div className="grid place-items-center min-h-dvh p-8 text-center">
      <h2 className="text-2xl font-semibold text-destructive">Something went wrong</h2>
      <p className="text-muted-foreground mt-2">{String(error)}</p>
    </div>
  );
};
