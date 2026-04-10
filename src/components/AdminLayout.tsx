"use client";

import { ReactNode } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { UserRole } from "@/types/auth.type";
import { Navbar } from "@/components/navbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <ProtectedRoute requiredRole={UserRole.ADMIN}>
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
      </div>
    </ProtectedRoute>
  );
};
