"use client";

import { useGetProfile } from "@/app/profile/hooks/useGetProfile";
import { useAuthStore } from "@/store/auth";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function ProfilePage() {
  const { isAuthenticated } = useAuthStore();
  const { data: profile, isLoading, error } = useGetProfile();

  useEffect(() => {
    if (!isAuthenticated) {
      redirect("/auth/login");
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-destructive mb-4">
            Failed to load profile
          </p>
          <Link
            href="/"
            className="text-primary hover:underline text-sm font-semibold"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">No profile data found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="text-primary hover:underline text-sm font-semibold"
          >
            ← Back to Home
          </Link>
        </div>

        <Card>
          <CardHeader>
            <h1 className="text-3xl font-bold">My Profile</h1>
          </CardHeader>

          <CardContent className="space-y-2">
            <div>
              <label className="text-sm font-semibold text-muted-foreground">
                Username
              </label>
              <p className="text-lg mt-1">{profile.username}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-muted-foreground">
                Email
              </label>
              <p className="text-lg mt-1">{profile.email}</p>
            </div>

            <div>
              <label className="text-sm font-semibold text-muted-foreground">
                Display Name
              </label>
              <p className="text-lg mt-1">
                {profile.display_name || "Not set"}
              </p>
            </div>

            {profile.bio && (
              <div>
                <label className="text-sm font-semibold text-muted-foreground">
                  Bio
                </label>
                <p className="text-lg mt-1">{profile.bio}</p>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {
                  useAuthStore.getState().clearToken();
                  redirect("/auth/login");
                }}
                className="px-4 py-2 border border-destructive text-destructive rounded-lg font-semibold hover:bg-destructive/10"
              >
                Logout
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
