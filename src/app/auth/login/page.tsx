"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { LoginForm } from "@/app/auth/login/components/LoginForm";
import { useLoginForm } from "@/app/auth/login/hooks/useLoginForm";
import { useSubmitLoginForm } from "@/app/auth/login/hooks/useSubmitLoginForm";

export default function LoginPage() {
  const { register, handleSubmit, errors, reset } = useLoginForm();
  const { onSubmit, isPending } = useSubmitLoginForm(reset);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4">
      <div className="w-full max-w-md">
        <Card className="space-y-2">
          <CardHeader className="justify-center text-center">
            <h1 className="text-3xl font-bold text-foreground">Login</h1>
          </CardHeader>
          <CardContent className="px-8">
            <LoginForm
              register={register}
              errors={errors}
              submitHandler={handleSubmit(onSubmit)}
              isPending={isPending}
            />
          </CardContent>
          <CardFooter className="text-center">
            <p className="w-full text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="font-semibold text-primary hover:underline"
              >
                Register here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
