import { Outlet } from "react-router-dom";
import { Sidebar } from "@widgets/sidebar/Sidebar";
import { ThemeToggle } from "@widgets/theme-toggle/ThemeToggle";
import { LogoutButton } from "@widgets/logout/LogoutButton";

/* ───────────────────────────────────────────────────────────── */
/*  App layout (protected pages)                                */
/* ───────────────────────────────────────────────────────────── */
export const AppLayout = () => (
  <div className="flex min-h-dvh">
    <Sidebar />

    {/* content wrapper: shifted right on ≥lg to leave space for rail */}
    <div className="flex flex-1 flex-col">
      {/* mobile-only top bar */}
      <header className="flex items-center justify-between border-b border-border px-4 py-3 bg-surface">
        <h1 className="text-base font-semibold">Welcome back!</h1>
        <div className="flex gap-2">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </header>

      <main className="flex-1 bg-surface-soft p-6">
        <Outlet />
      </main>
    </div>
  </div>
);


/* ─────────────────────────────────────────────────────────────── */
/* Auth layout (login / register / verify-otp)                    */
/* ─────────────────────────────────────────────────────────────── */
export const AuthLayout = () => (
  <div className="flex min-h-dvh flex-col bg-surface-soft">
    {/* <header className="flex items-center justify-between border-b border-border px-4 py-3">
      <Logo />
      <ThemeToggle />
    </header> */}

    <main className="flex items-center justify-center px-4">
      <Outlet />
    </main>
  </div>
);
