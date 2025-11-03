"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Toast, ToastType } from "../components/ui/Toast";
import { userApi } from "../lib/api/user.api";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function PhoneLoginPage() {
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    isVisible: boolean;
  }>({
    message: "",
    type: "info",
    isVisible: false,
  });

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

  const startCountdown = () => {
    setCountdown(60);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone) {
      showToast("Veuillez entrer votre numéro de téléphone", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await userApi.sendPhoneOTP(phone);

      if (response.success) {
        showToast("Code de vérification envoyé par SMS", "success");
        setStep("otp");
        startCountdown();

        if (process.env.NODE_ENV === "development" && response.data.otp) {
          setOtp(response.data.otp);
        }
      }
    } catch (error: any) {
      showToast(
        error.response?.data?.message || "Erreur lors de l'envoi du code",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp.trim() || otp.length !== 6) {
      showToast("Veuillez entrer le code à 6 chiffres", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await userApi.verifyPhoneOTP(phone, otp);

      if (response.success) {
        showToast(
          response.data.isNewUser
            ? "Compte créé avec succès!"
            : "Connexion réussie!",
          "success"
        );

        localStorage.setItem("authToken", response.data.token);

        setTimeout(() => {
          if (response.data.needsOnboarding) {
            router.push("/create-profile");
          } else {
            router.push("/account-selection");
          }
        }, 1000);
      }
    } catch (error: any) {
      showToast(
        error.response?.data?.message || "Code invalide. Veuillez réessayer.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setIsLoading(true);
    try {
      const response = await userApi.sendPhoneOTP(phone);
      if (response.success) {
        showToast("Nouveau code envoyé", "success");
        startCountdown();
      }
    } catch (error: any) {
      showToast(
        error.response?.data?.message || "Erreur lors de l'envoi du code",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="bg-white py-8 px-6 shadow sm:rounded-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">
              {step === "phone" ? "Connexion par téléphone" : "Vérification"}
            </h2>
            <p className="text-black text-sm">
              {step === "phone"
                ? "Entrez votre numéro de téléphone pour recevoir un code de vérification"
                : `Entrez le code à 6 chiffres envoyé au ${phone}`}
            </p>
          </div>

          {/* PHONE STEP */}
          {step === "phone" && (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Numéro de téléphone
                </label>

                <PhoneInput
                  international
                  defaultCountry="FR" // you can change this to your main audience (e.g., "US")
                  value={phone}
                  onChange={(value) => setPhone(value || "")}
                  className="w-full rounded-md border border-gray-300 focus:outline-none focus:ring-black focus:border-black px-3 py-2 bg-white"
                />

                <p className="mt-2 text-xs text-gray-500">
                  Format international: +1 555 123 4567
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || !phone}
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
                  "Recevoir le code"
                )}
              </button>
            </form>
          )}

          {/* OTP STEP */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Code de vérification
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  required
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 6) setOtp(value);
                  }}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm bg-white text-center text-2xl font-mono tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
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
                    Vérification...
                  </>
                ) : (
                  "Vérifier le code"
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={countdown > 0 || isLoading}
                  className="text-sm text-black hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {countdown > 0
                    ? `Renvoyer le code (${countdown}s)`
                    : "Renvoyer le code"}
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="text-sm text-black hover:text-black"
                >
                  ← Changer de numéro
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/signup"
              className="text-sm text-black hover:text-black underline"
            >
              ← Retour aux autres options de connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
