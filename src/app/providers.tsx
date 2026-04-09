"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { setupAxiosInterceptors } from "@/lib/axios";
import { useAuthStore } from "@/store/auth";

const queryClient = new QueryClient();

function AuthInitializer({ children }: { children: ReactNode }) {
  useEffect(() => {
    useAuthStore.getState().initToken();
    setupAxiosInterceptors();
  }, []);

  return children;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>{children}</AuthInitializer>
    </QueryClientProvider>
  );
}
