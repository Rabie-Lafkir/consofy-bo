import type { RouteObject } from "react-router-dom";
import { AppLayout, AuthLayout } from "./layouts";
import { RouteError } from "./error-boundary";
import { RequireAuth } from "./guards";

export const routes: RouteObject[] = [
  {
    element: (<RequireAuth><AppLayout /></RequireAuth>),
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        lazy: () => import("@pages/home").then(m => ({ Component: m.default })),
      },
      {
        path: "*",
        lazy: () => import("@pages/not-found").then(m => ({ Component: m.default })),
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        lazy: () => import("@pages/login").then(m => ({ Component: m.default })),
      },
    ],
  },
];
