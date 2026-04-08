import { useToastStore } from "@/store/toast";
import { RegisterFormData } from "@/types/register.type";
import { useState } from "react";
import { UseFormTrigger } from "react-hook-form";

export const useRegisterFormStepper = (
  trigger: UseFormTrigger<RegisterFormData>,
) => {
  const [step, setStep] = useState(1);
  const { addToast } = useToastStore();

  const handleNextStep = async () => {
    const stepOneFields = ["username", "email", "password"] as const;
    const isValid = await trigger(stepOneFields);

    if (!isValid) {
      addToast("Please fill in all fields correctly", "error");
      return;
    }

    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  return { step, handleNextStep, handlePrevStep };
};
