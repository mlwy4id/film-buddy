import { api } from "@/lib/axios";
import { LoginFormData } from "@/types/login.type";
import { RegisterFormData } from "@/types/register.type";

export const register = async (data: RegisterFormData) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const login = async (data: LoginFormData) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};
