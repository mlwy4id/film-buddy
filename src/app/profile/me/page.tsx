"use client";

import { MyProfileContent } from "@/app/profile/me/container/MyProfileContent";
import { UserLayout } from "@/components/UserLayout";

const ProfilePage = () => {
  return (
    <UserLayout>
      <MyProfileContent />
    </UserLayout>
  );
};

export default ProfilePage;
