"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Toast, ToastType } from "../components/ui/Toast";
import { userApi } from "../lib/api/user.api";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    isVisible: boolean;
  }>({
    message: "",
    type: "info",
    isVisible: false,
  });

  // Check for auth callback parameters
  useEffect(() => {
    const token = searchParams.get("token");
    const needsOnboarding = searchParams.get("needsOnboarding");
    const error = searchParams.get("error");

    if (error) {
      showToast(
        error === "auth_failed"
          ? "Échec de l'authentification. Veuillez réessayer."
          : "Une erreur est survenue. Veuillez réessayer.",
        "error"
      );
      // Clean URL
      router.replace("/signup");
    }

    if (token) {
      // Store the token
      localStorage.setItem("authToken", token);

      // Redirect based on onboarding status
      if (needsOnboarding === "true") {
        router.push("/onboarding");
      } else {
        router.push("/account-selection");
      }
    }
  }, [searchParams, router]);

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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms) {
      showToast(
        "Vous devez accepter les conditions d'utilisation pour continuer",
        "error"
      );
      return;
    }

    if (!validateEmail(email)) {
      showToast("Veuillez entrer une adresse email valide", "error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await userApi.signInWithEmail(email);

      if (response.success) {
        showToast("Lien de connexion envoyé à votre email !", "success");

        // Store email and verification token temporarily
        sessionStorage.setItem("pendingEmail", email);
        sessionStorage.setItem(
          "verificationToken",
          response.data.verificationToken!
        );

        // Redirect to verify email page
        setTimeout(() => {
          const encodedEmail = encodeURIComponent(email);
          window.location.href = `/verify-email?email=${encodedEmail}`;
        }, 1000);
      }
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "Erreur lors de l'envoi de l'email",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleGoogleLogin = () => {
    setSocialLoading("google");
    // Redirect to Google OAuth endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  const handleMicrosoftLogin = () => {
    setSocialLoading("microsoft");
    // Redirect to Microsoft OAuth endpoint
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/microsoft`;
  };

  const handleAppleLogin = () => {
    setSocialLoading("apple");
    showToast("Fonctionnalité Apple bientôt disponible", "info");
    setTimeout(() => setSocialLoading(null), 1000);
  };

  const handlePhoneLogin = () => {
    setIsLoading(true);
    showToast("Redirection vers la connexion par téléphone...", "info");

    // Redirect to phone login page
    setTimeout(() => {
      window.location.href = "/phone-login";
    }, 1000);
  };
  const isEmailValid = validateEmail(email);
  const isContinueEnabled = isEmailValid && acceptedTerms && !isLoading;

  return (
    <div className="bg-[#f4f6fc] flex flex-col justify-center py-8 sm:px-6 lg:px-8 min-h-screen">
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
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow sm:rounded-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-black mb-4">
                Créé ton compte ou connecte-toi à ton espace émotionnel
              </h2>
              <p className="text-black text-sm leading-relaxed">
                Saisis ton adresse email pour créer ton compte ou te connecter à
                ton espace émotionnel.
                <br />
                <br />
                Dialogue avec SOYA pour décoder tes messages, comprendre tes
                nuances émotionnelles et trouver des réponses.
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="bg-[#f6f5f9] rounded-lg p-4 space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black mb-2"
                  >
                    Adresse email
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-white"
                      placeholder="Entrez votre adresse email"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isContinueEnabled}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    "Continuer"
                  )}
                </button>
              </div>
            </form>

            {/* Separator */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Ou</span>
                </div>
              </div>
            </div>

            {/* Social Login Options */}
            <div className="mt-6 space-y-3">
              <button
                onClick={handleGoogleLogin}
                disabled={!!socialLoading}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 transition-colors"
              >
                {socialLoading === "google" ? (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
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
                )}
                {socialLoading === "google"
                  ? "Connexion..."
                  : "Continuer avec Google"}
              </button>

              <button
                onClick={handleMicrosoftLogin}
                disabled={!!socialLoading}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 transition-colors"
              >
                {socialLoading === "microsoft" ? (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-3" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z" />
                    <path fill="#81bc06" d="M12 1h10v10H12z" />
                    <path fill="#05a6f0" d="M1 12h10v10H1z" />
                    <path fill="#ffba08" d="M12 12h10v10H12z" />
                  </svg>
                )}
                {socialLoading === "microsoft"
                  ? "Connexion..."
                  : "Continuer avec Microsoft"}
              </button>

              <button
                onClick={handleAppleLogin}
                disabled={!!socialLoading}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 transition-colors"
              >
                {socialLoading === "apple" ? (
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 mr-3"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                )}
                {socialLoading === "apple"
                  ? "Connexion..."
                  : "Continuer avec Apple"}
              </button>

              <button
                onClick={handlePhoneLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Continuer avec ton numéro de téléphone
              </button>
            </div>

            {/* Terms Acceptance */}
            <div className="mt-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 mr-3 rounded border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm text-black">
                  J'accepte les{" "}
                  <Link
                    href="/terms"
                    className="text-black hover:text-black underline"
                  >
                    conditions d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link
                    href="/privacy"
                    className="text-black hover:text-black underline"
                  >
                    politique de confidentialité
                  </Link>
                </span>
              </label>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <div className="flex justify-center space-x-6 text-sm">
              <Link
                href="/help"
                className="text-black hover:text-black transition-colors"
              >
                Aide
              </Link>
              <Link
                href="/privacy"
                className="text-black hover:text-black transition-colors"
              >
                Confidentialité
              </Link>
              <Link
                href="/terms"
                className="text-black hover:text-black transition-colors"
              >
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
