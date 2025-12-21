"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema, SignupFormData } from "@/lib/validationSchemas";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import "./AuthForms.css";

interface SignupFormProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function SignupForm({
  onClose,
  onSwitchToLogin,
}: SignupFormProps) {
  const { signup } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setError("");
      setLoading(true);
      await signup(data.email, data.password, data.name);
      onClose();
    } catch (err: any) {
      console.error("Signup error:", err);

      // Обробка помилок Firebase
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <p className="auth-description">
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>

      {error && <div className="auth-error">{error}</div>}

      {/* Name */}
      <div className="form-group">
        <input
          type="text"
          placeholder="Name"
          className={`form-input ${errors.name ? "form-input--error" : ""}`}
          {...register("name")}
        />
        {errors.name && (
          <span className="form-error">{errors.name.message}</span>
        )}
      </div>

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
        {loading ? "Signing up..." : "Sign Up"}
      </button>

      {/* Switch to Login */}
      <p className="auth-switch">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="auth-switch-btn"
        >
          Log in
        </button>
      </p>
    </form>
  );
}
