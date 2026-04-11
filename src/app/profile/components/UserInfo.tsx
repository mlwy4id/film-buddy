import { User } from "@/types/auth.type";

export const UserInfo = ({ profile }: { profile: User }) => {
  return (
    <>
      <div>
        <label className="text-sm font-semibold text-muted-foreground">
          Username
        </label>
        <p className="text-lg mt-1">{profile.username}</p>
      </div>

      {profile.email && (
        <div>
          <label className="text-sm font-semibold text-muted-foreground">
            Email
          </label>
          <p className="text-lg mt-1">{profile.email}</p>
        </div>
      )}

      <div>
        <label className="text-sm font-semibold text-muted-foreground">
          Display Name
        </label>
        <p className="text-lg mt-1">{profile.display_name || "Not set"}</p>
      </div>

      {profile.bio && (
        <div>
          <label className="text-sm font-semibold text-muted-foreground">
            Bio
          </label>
          <p className="text-lg mt-1">{profile.bio}</p>
        </div>
      )}
    </>
  );
};
