"use client";

import { useState } from "react";
import Link from "next/link";
import { Toast, ToastType } from "../components/ui/Toast";
import { userApi } from "../lib/api/user.api";

export default function CreateProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    gender: "",
    customGender: "", // Add customGender to formData
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateAge = (birthDate: string): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name.trim()) {
      showToast("Le nom ou pseudo est requis", "error");
      return;
    }

    if (!formData.birthDate) {
      showToast("La date de naissance est requise", "error");
      return;
    }

    if (!formData.gender) {
      showToast("Le genre est requis", "error");
      return;
    }

    // Check age requirement
    const age = calculateAge(formData.birthDate);
    if (age < 18) {
      showToast(
        "Accès non autorisé. POSE-LÀ est disponible uniquement pour les utilisateurs de 18 ans et plus. Revenez lorsque vous aurez l&apos;âge requis.",
        "error"
      );
      return;
    }

    if (!acceptedTerms) {
      showToast(
        "Vous devez accepter les conditions d&apos;utilisation et la politique de confidentialité",
        "error"
      );
      return;
    }

    setIsLoading(true);

    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        throw new Error("Session expirée, veuillez vous reconnecter");
      }

      // Prepare onboarding data - fix the field names to match backend
      const onboardingData = {
        name: formData.name.trim(),
        dateOfBirth: formData.birthDate, // Make sure this matches backend expectation
        gender: formData.gender,
        ...(formData.gender === "autre" &&
          formData.customGender && {
            customGender: formData.customGender,
          }),
      };

      console.log("Sending onboarding data:", onboardingData); // Debug log

      const response = await userApi.completeOnboarding(
        onboardingData,
        authToken
      );

      // Fix: Check if response.data exists
      if (response.success && response.data?.user) {
        // Update user in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        showToast("Espace émotionnel créé avec succès !", "success");

        // Redirect to home page
        setTimeout(() => {
          window.location.href = "/home";
        }, 1000);
      } else {
        throw new Error(
          response.message || "Erreur lors de la création du profil"
        );
      }
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "Erreur lors de la création du profil",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const genderOptions = [
    { value: "femme", label: "femme" },
    { value: "homme", label: "homme" },
    { value: "autre", label: "autre / non-binaire" },
    { value: "later", label: "Je décide plus tard (→ Universel par défaut)" },
  ];
  // Show custom gender input only when "autre" is selected
  const showCustomGender = formData.gender === "autre";

  return (
    <div className="min-h-screen bg-[#f4f6fc] flex flex-col justify-center py-4 px-4 sm:py-12 sm:px-6 lg:px-8">
      {/* Toast Container - Mobile responsive positioning */}
      <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:top-4 z-50 max-w-sm mx-auto sm:mx-0">
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
          duration={4000}
        />
      </div>

      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-black">POSE-LÀ</h1>
          <h2 className="mt-3 sm:mt-4 text-lg sm:text-xl font-bold text-black px-2">
            Crée ton espace émotionnel personnalisé, à ton image
          </h2>
        </div>

        <div className="w-full">
          <div className="bg-white py-6 sm:py-8 px-4 sm:px-6 shadow sm:rounded-lg">
            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name or Nickname */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Nom ou pseudo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black text-sm bg-white"
                  placeholder="Entrez votre nom ou pseudo"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="birthDate"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Date de naissance
                </label>
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black text-sm bg-white"
                />
              </div>

              {/* Gender - Dropdown */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-black mb-2"
                >
                  Genre
                </label>
                <div className="relative">
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-3 pr-10 text-sm text-black focus:border-black focus:ring-1 focus:ring-black transition"
                  >
                    <option value="" disabled>
                      Sélectionnez votre genre
                    </option>
                    {genderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {/* Dropdown arrow */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Custom Gender Input - Conditionally rendered */}
              {showCustomGender && (
                <div>
                  <label
                    htmlFor="customGender"
                    className="block text-sm font-medium text-black mb-2"
                  >
                    Précisez votre genre
                  </label>
                  <input
                    id="customGender"
                    name="customGender"
                    type="text"
                    value={formData.customGender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black text-sm bg-white"
                    placeholder="Entrez votre genre"
                  />
                </div>
              )}

              {/* Terms Acceptance */}
              <div className="mt-6 sm:mt-8">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 mr-3 rounded border-gray-300 text-black focus:ring-black flex-shrink-0"
                  />
                  <span className="text-sm text-black font-bold leading-tight">
                    J&apos;accepte les conditions et la politique de
                    confidentialité
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !acceptedTerms}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-4 sm:mt-6"
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
                    Création en cours...
                  </>
                ) : (
                  "C&apos;est parti"
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-300">
              <div className="flex justify-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
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
                  Conditions d&apos;utilisation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
