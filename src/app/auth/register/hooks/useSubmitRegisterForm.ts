import { RegisterFormData } from "@/types/register.type";
import { UseFormReset } from "react-hook-form";
import { useRegisterMutation } from "@/app/auth/register/hooks/useRegisterMutation";

export const useSubmitRegisterForm = (
  reset: UseFormReset<RegisterFormData>,
) => {
  const { mutate, isPending } = useRegisterMutation(() => reset());

  const onSubmit = async (data: RegisterFormData) => {
    mutate(data);
  };

  return { onSubmit, isPending };
};
