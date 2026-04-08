import { LoginFormData } from "@/app/types/login.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  submitHandler: () => void;
  isLoading: boolean;
};

export const LoginForm = ({
  register,
  errors,
  submitHandler,
  isLoading,
}: Props) => {
  return (
    <form className="flex flex-col gap-4">
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
              value: 6,
              message: "Password minimal 6 karakter",
            },
          })}
        />
        {errors.password && (
          <p className="text-sm font-medium text-destructive">
            {errors.password.message}
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
        {isLoading ? "Memproses..." : "Login"}
      </Button>
    </form>
  );
};
