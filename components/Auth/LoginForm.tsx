"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, LoginFormData } from "@/lib/validationSchemas";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import "./AuthForms.css";

interface LoginFormProps {
  onClose: () => void;
  onSwitchToSignup: () => void;
}

export default function LoginForm({
  onClose,
  onSwitchToSignup,
}: LoginFormProps) {
  const { login } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError("");
      setLoading(true);
      await login(data.email, data.password);
      onClose();
    } catch (err: any) {
      console.error("Login error:", err);

      // Обробка помилок Firebase
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format");
      } else if (err.code === "auth/user-disabled") {
        setError("This account has been disabled");
      } else if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else {
        setError("Failed to log in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <p className="auth-description">
        Welcome back! Please enter your credentials to access your account and
        continue your search for a teacher.
      </p>

      {error && <div className="auth-error">{error}</div>}

      {/* Email */}
      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          className={`form-input ${errors.email ? "form-input--error" : ""}`}
          {...register("email")}
        />
        {errors.email && (
          <span className="form-error">{errors.email.message}</span>
        )}
      </div>

      {/* Password */}
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          className={`form-input ${errors.password ? "form-input--error" : ""}`}
          {...register("password")}
        />
        {errors.password && (
          <span className="form-error">{errors.password.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit" disabled={loading} className="auth-submit-btn">
        {loading ? "Logging in..." : "Log In"}
      </button>

      {/* Switch to Signup */}
      <p className="auth-switch">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="auth-switch-btn"
        >
          Sign up
        </button>
      </p>
    </form>
  );
}
