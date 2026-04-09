"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { RegisterForm } from "@/app/auth/register/components/RegisterForm";
import { useRegisterForm } from "@/app/auth/register/hooks/useRegisterForm";
import { useSubmitRegisterForm } from "@/app/auth/register/hooks/useSubmitRegisterForm";
import { useRegisterFormStepper } from "@/app/auth/register/hooks/useRegisterFormStepper";

export default function RegisterPage() {
  const { register, handleSubmit, errors, reset, trigger } = useRegisterForm();
  const { onSubmit, isPending } = useSubmitRegisterForm(reset);
  const { step, handleNextStep, handlePrevStep } =
    useRegisterFormStepper(trigger);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4 py-8">
      <div className="w-full max-w-md">
        <Card className="space-y-6">
          <CardHeader className="justify-center text-center">
            <h1 className="text-3xl font-bold text-foreground">Register</h1>
            <p className="text-sm text-muted-foreground">
              {step === 1
                ? "Create a new account with your personal information"
                : "Complete your profile"}
            </p>
          </CardHeader>

          <div className="flex items-center justify-center gap-2 px-8">
            <div
              className={`h-2 flex-1 rounded-full transition-all ${
                step >= 1 ? "bg-primary" : "bg-muted dark:bg-muted/50"
              }`}
            />
            <div
              className={`h-2 flex-1 rounded-full transition-all ${
                step >= 2 ? "bg-primary" : "bg-muted dark:bg-muted/50"
              }`}
            />
          </div>
          <CardContent className="px-8">
            <RegisterForm
              register={register}
              errors={errors}
              submitHandler={handleSubmit(onSubmit)}
              isPending={isPending}
              step={step}
              onNextStep={handleNextStep}
              onPrevStep={handlePrevStep}
            />
          </CardContent>
          {step === 1 && (
            <CardFooter className="text-center">
              <p className="w-full text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-primary hover:underline"
                >
                  Login here
                </Link>
              </p>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
