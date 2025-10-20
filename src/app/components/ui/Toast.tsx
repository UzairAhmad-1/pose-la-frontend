"use client";

import { useEffect, useState } from "react";
import { X, AlertCircle, CheckCircle, Info } from "lucide-react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  isVisible,
  onClose,
  duration = 5000,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 100 / (duration / 100), 0));
      }, 100);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
      setIsExiting(false);
      setProgress(100);
    }, 300);
  };

  const getToastStyles = () => {
    const baseStyles =
      "max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 p-4 transform transition-all duration-300 ease-in-out";

    const typeStyles = {
      success: "border-green-500",
      error: "border-red-500",
      warning: "border-yellow-500",
      info: "border-blue-500",
    };

    const visibilityStyles =
      isVisible && !isExiting
        ? "translate-x-0 opacity-100"
        : "translate-x-full opacity-0";

    return `${baseStyles} ${typeStyles[type]} ${visibilityStyles}`;
  };

  const getIcon = () => {
    const iconClass = "w-5 h-5";

    switch (type) {
      case "success":
        return <CheckCircle className={`${iconClass} text-green-500`} />;
      case "error":
        return <AlertCircle className={`${iconClass} text-red-500`} />;
      case "warning":
        return <AlertCircle className={`${iconClass} text-yellow-500`} />;
      case "info":
        return <Info className={`${iconClass} text-blue-500`} />;
      default:
        return <Info className={iconClass} />;
    }
  };

  const getProgressColor = () => {
    switch (type) {
      case "success":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-blue-500";
    }
  };

  if (!isVisible && !isExiting) return null;

  return (
    <div className={getToastStyles()}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>
        <button
          onClick={handleClose}
          title="close"
          className="flex-shrink-0 ml-4 inline-flex text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 rounded-b-lg overflow-hidden">
        <div
          className={`h-full transition-all duration-100 ease-linear ${getProgressColor()}`}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
};
