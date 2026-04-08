import { RegisterFormData } from "@/types/register.type";
import { useForm } from "react-hook-form";

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<RegisterFormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      display_name: "",
      bio: "",
    },
  });

  return { register, handleSubmit, errors, reset, trigger };
};
