import { RegisterFormData } from "@/app/types/register.type";
import { useForm } from "react-hook-form";

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<RegisterFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return {register, handleSubmit, errors, watch, reset}
};
