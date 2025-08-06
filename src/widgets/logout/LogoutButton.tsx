import { Button } from "@shared/ui";
import { useAuth } from "@features/auth";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export const LogoutButton = () => {
  const logout   = useAuth((s) => s.logout);
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Log out"
      onClick={handleClick}
    >
      <LogOut className="h-5 w-5" />
    </Button>
  );
};
