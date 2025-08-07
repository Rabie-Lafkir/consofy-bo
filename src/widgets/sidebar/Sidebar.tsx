import { Link, NavLink } from "react-router-dom";
import {
  Gamepad2,
  LayoutDashboard,
  Menu,
  Users,
} from "lucide-react";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
} from "@shared/ui/sheet";
import { ScrollArea } from "@shared/ui/scroll-area";
import { Button, Avatar, AvatarImage, AvatarFallback } from "@shared/ui";

import Logo from "@shared/ui/logo";
import { LogoutButton } from "@widgets/logout/LogoutButton";

/* ───────────────────────────────────────────────────────────── */
/* Routes                                                       */
/* ───────────────────────────────────────────────────────────── */
const routes = [
  { to: "/",         label: "Dashboard", icon: LayoutDashboard },
  { to: "/consoles", label: "Consoles",  icon: Gamepad2 },
  { to: "/sessions", label: "Sessions",  icon: Users },
];

/* ───────────────────────────────────────────────────────────── */
/* User avatar                                                  */
/* ───────────────────────────────────────────────────────────── */
const UserAvatar = () => (
  <div className="flex items-center gap-3 px-6 py-4">
    <Avatar className="h-9 w-9">
      <AvatarImage src="https://github.com/shadcn.png" alt="@consofy" />
      <AvatarFallback>CB</AvatarFallback>
    </Avatar>
    <div className="leading-tight">
      <p className="text-sm font-medium">Admin</p>
      <p className="text-xs text-muted-foreground">admin@consofy.xyz</p>
    </div>
  </div>
);

/* ───────────────────────────────────────────────────────────── */
/* Header (logo)                                                */
/* ───────────────────────────────────────────────────────────── */
const Header = () => (
  <Link
    to="/"
    className="flex items-center gap-3 border-b border-border/60 px-6 py-5"
  >
    <Logo className="h-8" />
  </Link>
);

/* ───────────────────────────────────────────────────────────── */
/* Link list                                                    */
/* ───────────────────────────────────────────────────────────── */
const NavLinks = ({ onNavigate }: { onNavigate?: () => void } = {}) => (
  <ScrollArea className="flex-1">
    <nav className="space-y-1 px-2 py-2">
      {routes.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end
          onClick={onNavigate}
          className={({ isActive }) =>
            /* prettier-ignore */
            `group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition
             ${isActive
               ? "bg-primary text-primary-foreground shadow-sm"
               : "text-foreground/70 hover:bg-muted hover:text-foreground"}
            `
          }
        >
          <Icon className="h-5 w-5 shrink-0" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  </ScrollArea>
);

/* ───────────────────────────────────────────────────────────── */
/* Desktop rail                                                 */
/* ───────────────────────────────────────────────────────────── */
const DesktopRail = () => (
  <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-border/60 lg:bg-surface">
    <Header />
    <UserAvatar />
    <NavLinks />
    <LogoutButton className="m-4" />
  </aside>
);

/* ───────────────────────────────────────────────────────────── */
/* Mobile drawer (Sheet)                                        */
/* ───────────────────────────────────────────────────────────── */
const MobileDrawer = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="fixed left-4 top-4 z-40 lg:hidden bg-surface shadow"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </SheetTrigger>

    <SheetContent side="left" className="w-64 rounded-r-xl p-0">
      <div className="flex h-full flex-col">
        <Header />
        <UserAvatar />
        <NavLinks
          onNavigate={() => {
            const el = document.activeElement;
            if (el instanceof HTMLElement) el.blur();
          }}
        />
        <LogoutButton className="m-4" />
      </div>
    </SheetContent>
  </Sheet>
);

/* ───────────────────────────────────────────────────────────── */
/* Public export                                                */
/* ───────────────────────────────────────────────────────────── */
export const Sidebar = () => (
  <>
    <MobileDrawer />
    <DesktopRail />
  </>
);
