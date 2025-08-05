import { useAuth } from "@features/auth";
import { refresh as apiRefresh } from "@features/auth/api/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function createClient() {
  const qc = new QueryClient({
    defaultOptions: {
      queries: { staleTime: 5 * 60_000 },
    },
  });

  // add interceptor
  const authFetch = async (input: RequestInfo, init?: RequestInit) => {
    const { tokens, setTokens } = useAuth.getState();
    const withAuth = tokens
      ? { ...init, headers: { ...init?.headers, Authorization: `Bearer ${tokens.access}` } }
      : init;

    const res = await fetch(input, withAuth);
    if (res.status !== 401) return res;

    /* attempt refresh */
    if (!tokens?.refresh) throw new Error("Unauthenticated");
    const newTokens = await apiRefresh(tokens.refresh);
    setTokens(newTokens);

    // retry original request
    const retryRes = await fetch(input, {
      ...withAuth,
      headers: { ...(withAuth?.headers ?? {}), Authorization: `Bearer ${newTokens.access}` },
    });
    return retryRes;
  };

  // expose globally
  (window as any).authFetch = authFetch;
  return qc;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createClient()}>{children}</QueryClientProvider>
);
