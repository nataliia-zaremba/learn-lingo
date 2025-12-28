"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema, BookingFormData } from "@/lib/validationSchemas";
import { Teacher } from "@/types/teacher";
import { useState } from "react";
import "./BookingForm.css";

interface BookingFormProps {
  teacher: Teacher & { id: string };
  onClose: () => void;
}

const LEARNING_REASONS = [
  { value: "career", label: "Career and business" },
  { value: "kids", label: "Lesson for kids" },
  { value: "abroad", label: "Living abroad" },
  { value: "exams", label: "Exams and coursework" },
  { value: "culture", label: "Culture, travel or hobby" },
];

export default function BookingForm({ teacher, onClose }: BookingFormProps) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      reason: "career",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      setLoading(true);

      // Тут можна додати логіку відправки на сервер
      console.log("Booking data:", {
        ...data,
        teacherId: teacher.id,
        teacherName: `${teacher.name} ${teacher.surname}`,
      });

      // Симуляція відправки
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);

      // Закриваємо через 2 секунди після успіху
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="booking-success">
        <div className="booking-success-icon">✓</div>
        <h3>Booking successful!</h3>
        <p>We will contact you soon to confirm the trial lesson.</p>
      </div>
    );
  }

  return (
    <div className="booking-form-wrapper">
      <p className="booking-description">
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>

      {/* Teacher Info */}
      <div className="booking-teacher">
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          className="booking-teacher-avatar"
        />
        <div>
          <p className="booking-teacher-label">Your teacher</p>
          <p className="booking-teacher-name">
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
        {/* Learning Reason */}
        <div className="form-group">
          <label className="booking-label">
            What is your main reason for learning English?
          </label>
          <div className="booking-radio-group">
            {LEARNING_REASONS.map((reason) => (
              <label key={reason.value} className="booking-radio-label">
                <input
                  type="radio"
                  value={reason.value}
                  {...register("reason")}
                  className="booking-radio-input"
                />
                <span className="booking-radio-custom"></span>
                {reason.label}
              </label>
            ))}
          </div>
          {errors.reason && (
            <span className="form-error">{errors.reason.message}</span>
          )}
        </div>

        {/* Full Name */}
        <div className="form-group">
          <input
            type="text"
            placeholder="Full Name"
            className={`form-input ${
              errors.fullName ? "form-input--error" : ""
            }`}
            {...register("fullName")}
          />
          {errors.fullName && (
            <span className="form-error">{errors.fullName.message}</span>
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

        {/* Phone Number */}
        <div className="form-group">
          <input
            type="tel"
            placeholder="Phone number"
            className={`form-input ${
              errors.phoneNumber ? "form-input--error" : ""
            }`}
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <span className="form-error">{errors.phoneNumber.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading} className="booking-submit-btn">
          {loading ? "Booking..." : "Book"}
        </button>
      </form>
    </div>
  );
}
