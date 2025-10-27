// lib/api/user.api.ts

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
export interface AuthResponse {
  verificationToken?: string;
  authToken?: string;
  isNewUser: boolean;
  userId: string;
  user?: {
    id: string;
    email: string;
    isOnboardingComplete: boolean;
    name: string | null;
  };
}

export interface OnboardingData {
  name: string;
  dateOfBirth: string;
  gender: string;
  customGender?: string;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  dateOfBirth: string | null;
  gender: string;
  customGender: string | null;
  isOnboardingComplete: boolean;
  lastLogin: string | null;
  createdAt: string;
  updatedAt: string;
}

class UserApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      return data;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Network error occurred"
      );
    }
  }

  // Initiate email signin
  async signInWithEmail(email: string): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>("/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  // Verify token
  async verifyToken(
    email: string,
    verificationToken: string
  ): Promise<ApiResponse<AuthResponse>> {
    return this.request<AuthResponse>("/auth/verify", {
      method: "POST",
      body: JSON.stringify({ email, verificationToken }),
    });
  }

  // Complete onboarding
  // lib/api/user.api.ts - Update completeOnboarding method
  async completeOnboarding(
    onboardingData: OnboardingData,
    authToken: string
  ): Promise<ApiResponse<{ user: User }>> {
    console.log("Sending onboarding request with:", {
      data: onboardingData,
      token: authToken ? "Present" : "Missing",
    });

    try {
      const response = await fetch(`${API_BASE_URL}/auth/onboarding`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(onboardingData),
      });

      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      return data;
    } catch (error) {
      console.error("API request error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Network error occurred"
      );
    }
  }
  // Get current user
  async getCurrentUser(
    authToken: string
  ): Promise<ApiResponse<{ user: User }>> {
    return this.request<{ user: User }>("/auth/me", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }
}

export const userApi = new UserApiService();
