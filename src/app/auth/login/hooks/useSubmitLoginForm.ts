import { useLoginMutation } from "@/app/auth/login/hooks/useLoginMutation";
import { LoginFormData } from "@/types/login.type";
import { useToastStore } from "@/store/toast";
import { useState } from "react";
import { UseFormReset } from "react-hook-form";

export const useSubmitLoginForm = (reset: UseFormReset<LoginFormData>) => {
  const { mutate, isPending } = useLoginMutation(() => reset);

  const onSubmit = async (data: LoginFormData) => {
    mutate(data);
  };

  return {onSubmit, isPending}
};
