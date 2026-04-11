import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/lib/api/auth.api";
import { useAuthStore } from "@/store/auth";

export const useGetProfile = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    enabled: isAuthenticated,
  });
};
