import * as yup from "yup";

// Схема для реєстрації
export const signupSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// Схема для логіну
export const loginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// Типи для форм
export type SignupFormData = yup.InferType<typeof signupSchema>;
export type LoginFormData = yup.InferType<typeof loginSchema>;
