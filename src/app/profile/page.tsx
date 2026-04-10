"use client";

import { useGetProfile } from "@/app/profile/hooks/useGetProfile";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/navbar";
import { UserRole } from "@/types/auth.type";
import { UserLayout } from "@/components/UserLayout";

const ProfileContent = () => {
  const { data: profile, isLoading, error } = useGetProfile();

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

          <CardContent className="space-y-4">
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

            <div>
              <label className="text-sm font-semibold text-muted-foreground">
                Role
              </label>
              <p className="text-lg mt-1 capitalize">
                {profile.role || "User"}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <UserLayout>
      <ProfileContent />
    </UserLayout>
  );
};

export default ProfilePage;
