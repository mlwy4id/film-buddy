import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { LucideArrowLeft } from "lucide-react";
import { useGetMyProfile } from "@/app/profile/me/hooks/useGetMyProfile";
import { useGetProfile } from "@/app/profile/[id]/hooks/useGetProfile";
import { UserInfo } from "@/app/profile/components/UserInfo";
import { ProfileError } from "@/app/profile/components/ProfileError";
import { ProfileLoading } from "@/app/profile/components/ProfileLoading";
import { ProfileNotFound } from "@/app/profile/components/ProfileNotFound";
import { UserReviewContainer } from "@/app/profile/container/UserReviewContainer";
import { UserWatchlistContainer } from "@/app/profile/container/UserWatchlistContainer";

export const MyProfileContent = () => {
  const { data, isLoading, error } = useGetMyProfile();
  const profile = data?.personal_info || [];

  const { data: profileDetails, isLoading: isProfileLoading } = useGetProfile(
    profile.id,
  );

  if (isLoading || isProfileLoading) return <ProfileLoading />;
  if (error) return <ProfileError />;
  if (!profile) return <ProfileNotFound />;

  return (
    <div className="min-h-screen bg-linear-to-br dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="mb-6">
          <Link
            href="/"
            className="text-primary hover:underline text-sm font-semibold flex items-center gap-2"
          >
            <LucideArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        <Card className="px-4 py-8">
          <CardHeader>
            <h1 className="text-3xl font-bold">My Profile</h1>
          </CardHeader>

          <CardContent className="space-y-4">
            <UserInfo profile={profile} />
          </CardContent>
        </Card>

        <Card className="px-4 py-8">
          <CardHeader>
            <h1 className="text-3xl font-bold">Review</h1>
          </CardHeader>

          <CardContent className="space-y-4">
            <UserReviewContainer
              reviews={profileDetails.data.reviews}
              profileName={profileDetails.data.display_name}
            />
          </CardContent>
        </Card>

        <Card className="px-4 py-8">
          <CardHeader>
            <h1 className="text-3xl font-bold">Watchlists</h1>
          </CardHeader>

          <CardContent className="space-y-4">
            <UserWatchlistContainer
              watchlists={profileDetails.data.film_lists}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
