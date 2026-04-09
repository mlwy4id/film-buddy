import { create } from "zustand";

interface AuthStore {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  initToken: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  isAuthenticated: false,

  setToken: (token: string) => {
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true });
  },

  clearToken: () => {
    localStorage.removeItem("token");
    set({ token: null, isAuthenticated: false });
  },

  initToken: () => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      set({ token: savedToken, isAuthenticated: true });
    }
  },
}));
