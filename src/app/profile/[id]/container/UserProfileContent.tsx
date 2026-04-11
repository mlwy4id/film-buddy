import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { LucideArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetProfile } from "@/app/profile/[id]/hooks/useGetProfile";
import { ProfileError } from "@/app/profile/components/ProfileError";
import { ProfileLoading } from "@/app/profile/components/ProfileLoading";
import { ProfileNotFound } from "@/app/profile/components/ProfileNotFound";
import { UserInfo } from "@/app/profile/components/UserInfo";
import { UserReviewContainer } from "@/app/profile/container/UserReviewContainer";
import { UserWatchlistContainer } from "@/app/profile/container/UserWatchlistContainer";

export const UserProfileContent = () => {
  const { id } = useParams();
  if (!id) return;

  const profileId = id.toString();
  const { data: profile, isLoading, error } = useGetProfile(profileId);

  if (isLoading) return <ProfileLoading />;
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
            <UserInfo profile={profile.data} />
          </CardContent>
        </Card>

        <Card className="px-4 py-8">
          <CardHeader>
            <h1 className="text-3xl font-bold">Review</h1>
          </CardHeader>

          <CardContent className="space-y-4">
            <UserReviewContainer
              reviews={profile.data.reviews}
              profileName={profile.data.display_name}
            />
          </CardContent>
        </Card>

        <Card className="px-4 py-8">
          <CardHeader>
            <h1 className="text-3xl font-bold">Watchlists</h1>
          </CardHeader>

          <CardContent className="space-y-4">
            <UserWatchlistContainer watchlists={profile.data.film_lists} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
