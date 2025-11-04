"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const needsOnboarding = searchParams.get("needsOnboarding");
    const error = searchParams.get("error");

    if (error) {
      console.error("Auth error:", error);
      router.push("/signup?error=auth_failed");
      return;
    }

    if (token) {
      // Store the token
      localStorage.setItem("authToken", token);

      // Redirect based on onboarding status
      if (needsOnboarding === "true") {
        router.push("/create-profile");
      } else {
        router.push("/home");
      }
    } else {
      // No token found, redirect to signup
      router.push("/signup");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
        <p className="mt-4 text-gray-600">Connexion en cours...</p>
      </div>
    </div>
  );
}
