// lib/api/card.api.ts

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface Card {
  id: string;
  title: string;
  subtitle: string;
  pitch: string;
  group: string;
  prompt?: string | null;
  locked: boolean;
  sensitive: boolean;
  isGhost: boolean;
  hasPasserelle: boolean;
  hasMirror: boolean;
  mirrorCardId?: string | null;
  image: string;
  examples: string[];
  emotionalFocus: string[];
  cardType?: string;
  requiresSensitiveMode: boolean;
  gender: "MALE" | "FEMALE" | "UNIVERSAL" | "OTHER";
  createdAt: string;
  updatedAt: string;
}

class CardApiService {
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
    } catch (error: unknown) {
      throw new Error(
        error instanceof Error ? error.message : "Network error occurred"
      );
    }
  }

  // Get all male cards
  async getMaleCards(
    authToken: string
  ): Promise<ApiResponse<{ cards: Card[] }>> {
    return this.request<{ cards: Card[] }>("/cards/male", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  // Get all female cards
  async getFemaleCards(
    authToken: string
  ): Promise<ApiResponse<{ cards: Card[] }>> {
    return this.request<{ cards: Card[] }>("/cards/female", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  // Get all universal cards
  async getUniversalCards(
    authToken: string
  ): Promise<ApiResponse<{ cards: Card[] }>> {
    return this.request<{ cards: Card[] }>("/cards/universal", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }
}

export const cardApi = new CardApiService();
