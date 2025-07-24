import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  onGoogleLogin: () => void;
  onForgotPassword: () => void;
  onSignUp: () => void;
  loading?: boolean;
}

export interface LoginFormData {
  emailOrPhone: string;
  rememberMe: boolean;
}

export default function SheduleLoginForm({ 
  onSubmit, 
  onGoogleLogin, 
  onForgotPassword, 
  onSignUp, 
  loading = false 
}: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    emailOrPhone: "",
    rememberMe: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background font-poppins px-4 py-11 flex flex-col justify-start max-w-sm mx-auto">
      {/* Welcome Section */}
      <div className="mb-20 mt-16">
        <p className="text-text-primary text-base mb-2">
          Hi Welcome too <span className="text-shedula-brand font-medium">Shedula</span>
        </p>
        <h1 className="text-text-primary text-2xl font-bold">Login</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        {/* Mobile / Email Input */}
        <div className="space-y-3">
          <label className="text-text-primary text-sm font-medium block">
            Mobile / Email
          </label>
          <Input
            type="text"
            placeholder="login with email or mobile number"
            value={formData.emailOrPhone}
            onChange={(e) => handleInputChange("emailOrPhone", e.target.value)}
            className="h-12 bg-input-bg border-input-border rounded-xl text-sm placeholder:text-text-muted placeholder:text-sm"
          />
        </div>

        {/* Remember Me & Forgot Password Row */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                className="data-[state=checked]:bg-shedula-brand data-[state=checked]:border-shedula-brand"
              />
              <label htmlFor="rememberMe" className="text-sm text-text-primary font-medium">
                Remember Me
              </label>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-shedula-danger text-sm font-medium"
          >
            Forgot Password
          </button>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-shedula-brand hover:bg-shedula-brand/90 text-white font-semibold text-base rounded-xl mt-6"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-input-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-4 text-text-muted font-light">
            Or login with
          </span>
        </div>
      </div>

      {/* Google Login Button */}
      <Button
        type="button"
        variant="outline"
        onClick={onGoogleLogin}
        className="w-full h-12 border-input-border bg-white text-text-primary font-medium text-base rounded-xl mb-8 flex items-center justify-center space-x-3"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span>Continue with Google</span>
      </Button>

      {/* Bottom Signup Prompt */}
      <div className="text-center mt-auto">
        <p className="text-text-secondary text-sm">
          Don't have an account?{" "}
          <button
            onClick={onSignUp}
            className="text-shedula-brand font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}