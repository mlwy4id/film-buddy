import { RegisterFormData } from "@/app/types/register.type";
import { useToastStore } from "@/store/toast";
import { useState } from "react";
import { UseFormReset } from "react-hook-form";

export const useSubmitRegisterForm = (
  reset: UseFormReset<RegisterFormData>,
) => {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToastStore();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);

      // Validasi password match
      if (data.password !== data.confirmPassword) {
        addToast("Password tidak cocok", "error");
        return;
      }

      // Simulasi API call
      const { confirmPassword, ...submitData } = data;
      console.log("Register data:", submitData);

      // Uncomment untuk real API call:
      // const response = await axios.post('/api/auth/register', submitData)
      // Handle response accordingly

      addToast("Pendaftaran berhasil! Silakan login.", "success");
      reset();

      // Redirect atau handle success
      // setTimeout(() => redirect('/auth/login'), 1500)
    } catch (error) {
      console.error("Register error:", error);
      addToast("Terjadi kesalahan saat pendaftaran", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading };
};
