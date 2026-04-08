import { RegisterFormData } from "@/app/types/register.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";

type Props = {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  watch: UseFormWatch<RegisterFormData>;
  submitHandler: () => void;
  isLoading: boolean;
};

export const RegisterForm = ({ register, errors, watch, submitHandler, isLoading }: Props) => {
  return (
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
              value === watch("password") || "Password tidak cocok",
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
        onClick={submitHandler}
      >
        {isLoading ? "Memproses..." : "Daftar"}
      </Button>
    </form>
  );
};
