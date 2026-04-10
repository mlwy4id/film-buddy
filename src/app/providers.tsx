"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";
import { setupAxiosInterceptors } from "@/lib/axios";
import { useAuthStore } from "@/store/auth";

const queryClient = new QueryClient();

const AuthInitializer = ({ children }: { children: ReactNode }) => {
  const { isLoading, setLoading } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      try {
        useAuthStore.getState().initToken();
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
    setupAxiosInterceptors();
  }, [setLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return children;
};

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>{children}</AuthInitializer>
    </QueryClientProvider>
  );
};
