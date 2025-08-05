import { Moon, Sun } from "lucide-react";
import { Button } from "@shared/ui/button";
import { useLayoutEffect, useState } from "react";

export const ThemeToggle = () => {
  const getInitial = (): "light" | "dark" =>
    (localStorage.theme as "light" | "dark" | undefined) ??
    (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

  const [mode, setMode] = useState<"light" | "dark">(getInitial);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("light", mode === "light");
    localStorage.theme = mode;
  }, [mode]);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={() => setMode((m) => (m === "light" ? "dark" : "light"))}
    >
      {mode === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
};
