"use client";

import { useEffect } from "react";
import "./Toast.css";

interface ToastProps {
  message: string;
  type?: "info" | "error" | "success" | "warning";
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = "info",
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast--${type}`}>
      <div className="toast__content">
        <div className="toast__icon">
          {type === "error" && "⚠️"}
          {type === "success" && "✓"}
          {type === "info" && "ℹ"}
          {type === "warning" && "⚠"}
        </div>
        <p className="toast__message">{message}</p>
      </div>
      <button className="toast__close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
}
