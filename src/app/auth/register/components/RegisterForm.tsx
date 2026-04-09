import { RegisterFormData } from "@/types/register.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { ChevronLeft } from "lucide-react";

type Props = {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  submitHandler: () => void;
  isPending: boolean;
  step: number;
  onNextStep: () => void;
  onPrevStep: () => void;
};

export const RegisterForm = ({
  register,
  errors,
  submitHandler,
  isPending,
  step,
  onNextStep,
  onPrevStep,
}: Props) => {
  return (
    <form className="flex flex-col gap-4">
      {step === 1 ? (
        <>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Choose your username"
              disabled={isPending}
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
              })}
            />
            {errors.username && (
              <p className="text-sm font-medium text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              disabled={isPending}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email format",
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
              disabled={isPending}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message:
                    "Password must contain uppercase, lowercase, and numbers",
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
            type="button"
            className="w-full"
            disabled={isPending}
            size="lg"
            onClick={onNextStep}
          >
            Continue
          </Button>
        </>
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              placeholder="What would you like to be called?"
              disabled={isPending}
              {...register("display_name", {
                required: "Display name is required",
                minLength: {
                  value: 2,
                  message: "Display name must be at least 2 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Display name must be at most 30 characters",
                },
              })}
            />
            {errors.display_name && (
              <p className="text-sm font-medium text-destructive">
                {errors.display_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              placeholder="Tell us a little about yourself..."
              disabled={isPending}
              rows={4}
              className="flex min-h-20 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              {...register("bio", {
                maxLength: {
                  value: 500,
                  message: "Bio must be at most 500 characters",
                },
              })}
            />
            {errors.bio && (
              <p className="text-sm font-medium text-destructive">
                {errors.bio.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onPrevStep}
              disabled={isPending}
              size="lg"
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isPending}
              size="lg"
              onClick={submitHandler}
            >
              {isPending ? "Processing..." : "Sign Up"}
            </Button>
          </div>
        </>
      )}
    </form>
  );
};
