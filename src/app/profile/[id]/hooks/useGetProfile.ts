import { useQuery } from "@tanstack/react-query";
import { getPublicUserProfile } from "@/lib/api/user.api";

export const useGetProfile = (id: string) => {
  return useQuery({
    queryKey: ["profile", id],
    queryFn: () => getPublicUserProfile(id),
  });
};
