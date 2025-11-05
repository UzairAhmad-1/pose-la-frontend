"use client";

import Link from "next/link";
import { Button } from "./Button";

export const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center  py-8 px-4 bg-white">
      {/* Title */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-black mb-8 tracking-tight">
        POSE-LÀ
      </h1>

      {/* Central Block */}
      <div className="bg-[#DDE0E8] rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-xl space-y-5">
        {/* Subtitle */}
        <h2 className="text-base sm:text-lg font-semibold text-black">
          SOYA, l&apos;intelligence qui comprend tes émotions
        </h2>

        {/* Narrative Text */}
        <p className="text-black text-sm sm:text-base leading-relaxed">
          Tu n&apos;as pas à porter ce fardeau en silence. Les mots jamais
          prononcés, les émotions qui t&apos;écrasent, tout cela peut trouver sa
          place ici.
        </p>
        <p className="text-black text-sm sm:text-base leading-relaxed">
          Chaque émotion renferme une vérité cachée. En les explorant, tu
          avances vers une compréhension plus claire de toi-même.
        </p>

        {/* CTA Button */}
        <div>
          <Button
            onClick={() => (window.location.href = "/signup")}
            className="bg-black text-white px-6 py-3 rounded-3xl hover:bg-gray-900 transition-colors text-base font-medium w-full sm:w-auto"
          >
            On commence
          </Button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="pt-6 sm:pt-8 flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 mt-6">
        <Link href="/help" className="hover:text-black transition-colors">
          Aide
        </Link>
        <span className="hidden sm:inline">|</span>
        <Link href="/privacy" className="hover:text-black transition-colors">
          Confidentialité
        </Link>
        <span className="hidden sm:inline">|</span>
        <Link href="/terms" className="hover:text-black transition-colors">
          Conditions d&apos;utilisation
        </Link>
        <span className="hidden sm:inline">|</span>
        <Link
          href="/legal-notice"
          className="hover:text-black transition-colors"
        >
          Mentions l&apos;égales
        </Link>
      </div>
    </section>
  );
};
