import { useAuth } from "@features/auth";
import { Navigate, useLocation } from "react-router-dom";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { tokens } = useAuth();
  const location = useLocation();
  if (!tokens) return <Navigate to="/login" state={{ from: location }} replace />;
  return <>{children}</>;
};
