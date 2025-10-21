
"use client";

import { HeroSection } from "./components/ui/HeroSection";
import { CookieBanner } from "./components/ui/CookieBanner";

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Hero Section */}
          <HeroSection />
        </div>

        {/* Cookie Banner */}
        <CookieBanner />
      </main>
    </>
  );
}
