"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useToastStore } from "@/store/toast";

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToastStore();

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

  const password = watch("password");

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

          <CardContent>
            <form className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <Input
                  id="fullName"
                  placeholder="Masukkan nama lengkap Anda"
                  disabled={isLoading}
                  {...register("fullName", {
                    required: "Nama lengkap wajib diisi",
                    minLength: {
                      value: 3,
                      message: "Nama minimal 3 karakter",
                    },
                  })}
                />
                {errors.fullName && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="nama@example.com"
                  type="email"
                  disabled={isLoading}
                  {...register("email", {
                    required: "Email wajib diisi",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Format email tidak valid",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  disabled={isLoading}
                  {...register("password", {
                    required: "Password wajib diisi",
                    minLength: {
                      value: 8,
                      message: "Password minimal 8 karakter",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message:
                        "Password harus mengandung huruf besar, huruf kecil, dan angka",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword"
                  placeholder="••••••••"
                  type="password"
                  disabled={isLoading}
                  {...register("confirmPassword", {
                    required: "Konfirmasi password wajib diisi",
                    validate: (value) =>
                      value === password || "Password tidak cocok",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                size="lg"
                onClick={handleSubmit(onSubmit)}
              >
                {isLoading ? "Memproses..." : "Daftar"}
              </Button>
            </form>
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
