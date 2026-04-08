import { LoginFormData } from "@/app/types/login.type";
import { useForm } from "react-hook-form";

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return { register, handleSubmit, errors, reset };
};
