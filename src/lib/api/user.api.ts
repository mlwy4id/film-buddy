import { api } from "@/lib/axios";

export const getPublicUserProfile = async (id: string) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};
