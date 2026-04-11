"use client";

import { UserProfileContent } from "@/app/profile/[id]/container/UserProfileContent";
import { UserLayout } from "@/components/UserLayout";

const ProfilePage = () => {
  return (
    <UserLayout>
      <UserProfileContent />
    </UserLayout>
  );
};

export default ProfilePage;
