import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/api/auth.api";
import { useToastStore } from "@/store/toast";
import { LoginFormData } from "@/types/login.type";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

export const useLoginMutation = (reset?: () => void) => {
  const router = useRouter();
  const { addToast } = useToastStore();
  const { setToken } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginFormData) => login(data),
    onSuccess: (data) => {
      addToast("Login successful!", "success");
      reset?.();

      setToken(data.data.token);

      router.push("/profile/me");
    },
    onError: (error) => {
      addToast("An error occurred during login", "error");
      console.log(error);
    },
  });
};
