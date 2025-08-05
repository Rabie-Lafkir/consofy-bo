import { Outlet } from "react-router-dom";
import { ThemeToggle } from "@widgets/theme-toggle/ThemeToggle";

export const AppLayout = () => (
  <div className="flex min-h-dvh flex-col">
    <header className="flex items-center justify-between p-4 border-b border-border">
      <h1 className="text-lg font-semibold">Consofy BO</h1>
      <ThemeToggle />
    </header>

    <main className="flex-1 bg-surface-soft p-6">
      <Outlet />
    </main>
  </div>
);

export const AuthLayout = () => (
  <div className="flex flex-col w-full min-h-dvh items-center justify-center bg-surface-soft">
    <header className="flex items-center justify-between p-4 border-b border-border w-full">
      <h1 className="text-lg font-semibold">Consofy BO</h1>
      <ThemeToggle />
    </header>
    <Outlet />
  </div>
);
