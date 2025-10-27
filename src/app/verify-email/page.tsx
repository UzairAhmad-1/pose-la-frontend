"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Toast, ToastType } from "../components/ui/Toast";
import { userApi } from "../lib/api/user.api";

export default function CheckEmailPage() {
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    isVisible: boolean;
  }>({
    message: "",
    type: "info",
    isVisible: false,
  });
  const searchParams = useSearchParams();

  const showToast = (message: string, type: ToastType) => {
    setToast({
      message,
      type,
      isVisible: true,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  };

  useEffect(() => {
    // Get email from URL query parameters
    const emailFromParams = searchParams.get("email");
    if (emailFromParams) {
      // Decode the email (in case it was encoded)
      const decodedEmail = decodeURIComponent(emailFromParams);
      setEmail(decodedEmail);
    }
  }, [searchParams]);

  // pages/verify-email.tsx - Updated functions
  const handleConfirmEmail = async () => {
    const storedEmail = sessionStorage.getItem("pendingEmail");
    const storedToken = sessionStorage.getItem("verificationToken");

    if (!storedEmail || !storedToken) {
      showToast("Session invalide, veuillez recommencer", "error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await userApi.verifyToken(storedEmail, storedToken);

      if (response.success && response.data.authToken && response.data.user) {
        // Store auth data
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        showToast("Email vérifié avec succès !", "success");

        // Redirect based on onboarding status
        setTimeout(() => {
          if (response.data.user?.isOnboardingComplete) {
            window.location.href = "/home";
          } else {
            window.location.href = "/create-profile";
          }
        }, 1000);
      }
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "Erreur lors de la vérification",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendEmail = async () => {
    const storedEmail = sessionStorage.getItem("pendingEmail");

    if (!storedEmail) {
      showToast("Email non trouvé", "error");
      return;
    }

    setIsResending(true);

    try {
      const response = await userApi.signInWithEmail(storedEmail);

      if (response.success) {
        // Update stored token
        sessionStorage.setItem(
          "verificationToken",
          response.data.verificationToken!
        );
        showToast(
          "Un nouvel email vient d'être envoyé à votre adresse.",
          "success"
        );
      }
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Erreur lors de l'envoi",
        "error"
      );
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fc] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50">
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
          duration={4000}
        />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Main Content */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow sm:rounded-lg text-center">
            {/* Content */}
            <h2 className="text-2xl font-bold text-black">Vérifie ton email</h2>

            <p className="mt-4 text-black text-sm leading-relaxed">
              Nous avons envoyé un lien de connexion à ton
              <br />
              adresse email.
            </p>

            {/* Email Display */}
            <p className="mt-6 text-lg font-medium text-black break-all bg-[#f6f5f9] py-3 px-4 rounded-lg">
              {email || "Chargement..."}
            </p>

            {/* Confirm Button */}
            <button
              onClick={handleConfirmEmail}
              className="mt-8 w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
            >
              Confirmer mon email
            </button>

            {/* Resend Email */}
            <div className="mt-6">
              <button
                onClick={handleResendEmail}
                disabled={isResending || !email}
                className="text-sm text-black hover:text-black underline disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isResending
                  ? "Envoi en cours..."
                  : "Tu n'as pas reçu l'email ? Renvoyer"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
