import { getMe } from "@/lib/api/auth.api";
import { useQuery } from "@tanstack/react-query";

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: 2,
  });
};
