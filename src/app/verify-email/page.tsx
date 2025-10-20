"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Mail } from "lucide-react";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ui/ToastContainer";

export default function CheckEmailPage() {
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const searchParams = useSearchParams();
  const { toasts, showToast, removeToast } = useToast();

  useEffect(() => {
    // Get email from URL query parameters
    const emailFromParams = searchParams.get("email");
    if (emailFromParams) {
      // Decode the email (in case it was encoded)
      const decodedEmail = decodeURIComponent(emailFromParams);
      setEmail(decodedEmail);
    }
  }, [searchParams]);

  const handleResendEmail = () => {
    setIsResending(true);

    // Simulate API call to resend verification email
    setTimeout(() => {
      setIsResending(false);
      showToast(
        "A new email has just been sent to your address.",
        "success",
        4000
      );
    }, 1000);
  };

  const handleConfirmEmail = () => {
    // Here you would typically verify the email and redirect to profile creation
    // For now, we'll redirect to the create profile page
    window.location.href = "/create-profile";
  };

  return (
    <div className="min-h-screen bg-[#f4f6fc] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">POSE-LÀ</h1>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
            {/* Email Icon */}
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>

            {/* Content */}
            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Check your email
            </h2>

            <p className="mt-4 text-sm text-gray-600">
              A login link has been sent to your email address.
            </p>

            <p className="mt-2 text-lg font-medium text-gray-900 break-all bg-gray-50 py-2 px-4 rounded-lg">
              {email || "Loading..."}
            </p>

            <p className="mt-4 text-sm text-gray-600">
              Click the link in the email to verify your account and continue to
              your emotional space.
            </p>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmEmail}
              className="mt-6 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
            >
              Confirm my email
            </button>

            {/* Resend Email */}
            <div className="mt-6">
              <button
                onClick={handleResendEmail}
                disabled={isResending || !email}
                className="text-sm text-blue-600 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isResending
                  ? "Sending..."
                  : "Didn't receive the email? Resend"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
