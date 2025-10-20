"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../components/ui/ToastContainer";
import { ChevronDown, Calendar, User } from "lucide-react";

export default function CreateProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    gender: "",
    customGenderPath: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isCustomPathOpen, setIsCustomPathOpen] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  const genderDropdownRef = useRef<HTMLDivElement>(null);
  const customPathDropdownRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderSelect = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      gender: value,
    }));
    setIsGenderOpen(false);
  };

  const handleCustomPathSelect = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      customGenderPath: value,
    }));
    setIsCustomPathOpen(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name.trim()) {
      showToast("Name or nickname is required", "error", 4000);
      return;
    }

    if (!formData.birthDate) {
      showToast("Date of birth is required", "error", 4000);
      return;
    }

    // Check age requirement
    const age = calculateAge(formData.birthDate);
    if (age < 18) {
      showToast(
        "Access not authorized. POSE-LÀ is available only for users aged 18 and over. Come back when you reach the required age.",
        "error",
        6000
      );
      return;
    }

    if (!acceptedTerms) {
      showToast(
        "You must accept the Terms of Use and Privacy Policy",
        "error",
        4000
      );
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      showToast("Profile created successfully!", "success", 3000);
      // Redirect to main app or next step
      window.location.href = "/";
    }, 2000);
  };

  const showGenderPathQuestion = formData.gender === "other";

  const genderOptions = [
    { value: "female", label: "Female", emoji: "👩" },
    { value: "male", label: "Male", emoji: "👨" },
    { value: "other", label: "Other / Non-binary", emoji: "⚧️" },
    {
      value: "later",
      label: "Decide later (Universal by default)",
      emoji: "🤔",
    },
  ];

  const customPathOptions = [
    { value: "", label: "Stay on Universal (default)", emoji: "🌍" },
    { value: "female", label: "Female path", emoji: "👩" },
    { value: "male", label: "Male path", emoji: "👨" },
  ];

  const getSelectedGenderLabel = () => {
    const selected = genderOptions.find((opt) => opt.value === formData.gender);
    return selected
      ? `${selected.emoji} ${selected.label}`
      : "Select your gender";
  };

  const getSelectedCustomPathLabel = () => {
    const selected = customPathOptions.find(
      (opt) => opt.value === formData.customGenderPath
    );
    return selected
      ? `${selected.emoji} ${selected.label}`
      : "Stay on Universal (default)";
  };

  // Close dropdowns when clicking outside
  useState(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        genderDropdownRef.current &&
        !genderDropdownRef.current.contains(event.target as Node)
      ) {
        setIsGenderOpen(false);
      }
      if (
        customPathDropdownRef.current &&
        !customPathDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCustomPathOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div className="min-h-screen bg-[#f4f6fc] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">POSE-LÀ</h1>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-2xl sm:px-10 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 mb-4">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Create your personalized emotional space
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Your safe place, your way
              </p>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name or Nickname */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name or Nickname
                </label>
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 sm:text-sm bg-white"
                    placeholder="Enter your preferred name"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Enter the first name or nickname you'd like to use in the app.
                </p>
              </div>

              {/* Date of Birth */}
              <div>
                <label
                  htmlFor="birthDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 sm:text-sm bg-white custom-date-picker"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Your date of birth allows us to verify that you are at least
                  18 years old.
                </p>
              </div>

              {/* Gender - Custom Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <div className="relative" ref={genderDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsGenderOpen(!isGenderOpen)}
                    className="w-full px-4 py-3 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 sm:text-sm bg-white text-left flex items-center justify-between"
                  >
                    <span className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-2" />
                      {getSelectedGenderLabel()}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                        isGenderOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isGenderOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                      {genderOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => handleGenderSelect(option.value)}
                          className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center space-x-3 ${
                            formData.gender === option.value
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-900"
                          }`}
                        >
                          <span className="text-lg">{option.emoji}</span>
                          <span className="flex-1">{option.label}</span>
                          {formData.gender === option.value && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Conditional Gender Path Question */}
              {showGenderPathQuestion && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Would you like me to suggest the "Female" path, the "Male"
                    path, or stay on Universal?
                  </label>
                  <div className="relative" ref={customPathDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setIsCustomPathOpen(!isCustomPathOpen)}
                      className="w-full px-4 py-3 pl-4 pr-10 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 sm:text-sm bg-white text-left flex items-center justify-between"
                    >
                      <span className="flex items-center">
                        {getSelectedCustomPathLabel()}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                          isCustomPathOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isCustomPathOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-blue-300 rounded-lg shadow-lg overflow-hidden">
                        {customPathOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => handleCustomPathSelect(option.value)}
                            className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150 flex items-center space-x-3 ${
                              formData.customGenderPath === option.value
                                ? "bg-blue-100 text-blue-700"
                                : "text-gray-900"
                            }`}
                          >
                            <span className="text-lg">{option.emoji}</span>
                            <span className="flex-1">{option.label}</span>
                            {formData.customGenderPath === option.value && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-blue-600">
                    Advantage: full freedom — you choose your own journey.
                  </p>
                </div>
              )}

              {/* Terms Acceptance */}
              <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="h-5 w-5 text-black focus:ring-black border-gray-300 rounded mt-0.5"
                />
                <label
                  htmlFor="terms"
                  className="ml-3 block text-sm text-gray-700"
                >
                  I accept the{" "}
                  <Link
                    href="/terms"
                    className="text-black hover:underline font-medium"
                  >
                    Terms of Use
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-black hover:underline font-medium"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
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
                    Creating your space...
                  </>
                ) : (
                  "Let's Go"
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-center space-x-6 text-sm">
                <Link
                  href="/help"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Help
                </Link>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Terms of Use
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for date picker styling */}
      <style jsx global>{`
        .custom-date-picker {
          color-scheme: light;
        }

        .custom-date-picker::-webkit-calendar-picker-indicator {
          background: transparent;
          bottom: 0;
          color: transparent;
          cursor: pointer;
          height: auto;
          left: 0;
          position: absolute;
          right: 0;
          top: 0;
          width: auto;
        }

        input[type="date"] {
          position: relative;
        }

        input[type="date"]:before {
          content: attr(placeholder);
          position: absolute;
          top: 50%;
          left: 10px;
          right: 10px;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }

        input[type="date"]:focus:before,
        input[type="date"]:not([value=""]):before {
          display: none;
        }
      `}</style>
    </div>
  );
}
