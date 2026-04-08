import { LoginFormData } from "@/app/types/login.type";
import { useToastStore } from "@/store/toast";
import { useState } from "react";
import { UseFormReset } from "react-hook-form";

export const useSubmitLoginForm = (reset: UseFormReset<LoginFormData>) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToastStore();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      // Simulasi API call
      console.log("Login data:", data);

      // Uncomment untuk real API call:
      // const response = await axios.post('/api/auth/login', data)
      // Handle response accordingly

      addToast("Login berhasil!", "success");
      reset();

      // Redirect atau handle success
      // redirect('/dashboard')
    } catch (error) {
      console.error("Login error:", error);
      addToast("Email atau password salah", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
};
