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

export default function RegisterPage() {
  const { register, handleSubmit, errors, watch, reset } = useRegisterForm();
  const { onSubmit, isLoading } = useSubmitRegisterForm(reset);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4 py-8">
      <div className="w-full max-w-md">
        <Card className="space-y-6">
          <CardHeader className="justify-center text-center">
            <h1 className="text-3xl font-bold text-foreground">Daftar</h1>
            <p className="text-sm text-muted-foreground">
              Buat akun baru untuk memulai
            </p>
          </CardHeader>
          <CardContent className="px-8">
            <RegisterForm
              register={register}
              errors={errors}
              watch={watch}
              submitHandler={handleSubmit(onSubmit)}
              isLoading={isLoading}
            />
          </CardContent>
          <CardFooter className="text-center">
            <p className="w-full text-sm text-muted-foreground">
              Sudah memiliki akun?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-primary hover:underline"
              >
                Login di sini
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
