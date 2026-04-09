import { useMutation } from "@tanstack/react-query";
import { register } from "@/lib/api/auth.api";
import { RegisterFormData } from "@/types/register.type";
import { useToastStore } from "@/store/toast";

export const useRegisterMutation = (reset?: () => void) => {
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: (data: RegisterFormData) => register(data),
    onSuccess: () => {
      addToast("Registration successful!", "success");
      reset?.();
    },
    onError: (error) => {
      addToast("An error occurred during registration", "error");
      console.error(error);
    },
  });
};
