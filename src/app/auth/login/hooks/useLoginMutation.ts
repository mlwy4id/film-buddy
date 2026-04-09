import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/api/auth.api";
import { useToastStore } from "@/store/toast";
import { LoginFormData } from "@/types/login.type";

export const useLoginMutation = (reset?: () => void) => {
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: (data: LoginFormData) => login(data),
    onSuccess: () => {
      addToast("Login successful!", "success");
      reset?.();
    },
    onError: (error) => {
      addToast("An error occurred during login", "error");
      console.error(error);
    },
  });
};
