import { useAuthStore } from "@/store/auth";
import { UserRole } from "@/types/auth.type";

export const useAuth = () => {
  const store = useAuthStore();

  return {
    token: store.token,
    user: store.user,
    role: store.role,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,

    hasRole: store.hasRole,
    isAdmin: store.isAdmin,
    isUser: store.isUser,
    isGuest: () => store.role === "",

    setToken: store.setToken,
    setUser: store.setUser,
    clearToken: store.clearToken,
    setRole: store.setRole,
  };
};
