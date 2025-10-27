"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, MessageCircle, Info } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Image from "next/image";
import { mirrorCards, allCards } from "../../lib/cardData";

export default function MirrorSpacePage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sourceCardId = searchParams.get("source");

  const cardId = parseInt(params.id);
  const card = mirrorCards.find((c) => c.id === cardId);
  const sourceCard = allCards.find(
    (c) => c.id === parseInt(sourceCardId || "")
  );

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Carte miroir non trouvée
          </h1>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>

        {/* Mirror Card Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">
                Mode Miroir Activé
              </h3>
              <p className="text-blue-800 text-sm leading-relaxed">
                {sourceCard
                  ? `Tu explores la version masculine de "${sourceCard.title}". Cette carte t'aide à comprendre le point de vue émotionnel de l'autre, sans jugement.`
                  : "Tu explores une carte du parcours masculin pour comprendre l'expérience émotionnelle de l'autre."}
              </p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex gap-2 mb-4">
          <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-semibold">
            Parcours Homme
          </span>
          {card.isGhost && (
            <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-semibold">
              Carte fantôme
            </span>
          )}
          {card.sensitive && (
            <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full font-semibold">
              ⚠ Mode sensible
            </span>
          )}
        </div>

        {/* Card Content */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100">
          <div className="mb-6">
            <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full">
              {card.group}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {card.title}
          </h1>

          <p className="text-lg text-gray-600 mb-6">{card.subtitle}</p>

          {/* Emotional Perspective */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Perspective masculine
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line bg-blue-50 rounded-2xl p-6">
              {card.pitch}
            </p>
          </div>

          {/* Examples */}
          {card.examples && card.examples.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Ce qui peut se vivre de son côté
              </h2>
              <div className="space-y-3">
                {card.examples.map((example, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 rounded-xl p-4 text-gray-700"
                  >
                    {example}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SOYA Chat Section */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Discuter avec SOYA
              </h2>
            </div>

            <p className="text-gray-600 mb-4 text-sm">
              Pose tes questions à SOYA pour mieux comprendre cette perspective
              masculine.
            </p>

            <button
              onClick={() => router.push(`/women-space/${sourceCardId || ""}`)}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-semibold shadow-md"
            >
              Retourner à ma carte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
