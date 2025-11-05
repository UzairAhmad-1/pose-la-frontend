"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, MessageCircle, Heart, AlertTriangle } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Image from "next/image";
import { allCards, getMirrorCard } from "../../lib/cardData";

export default function CardDetailPage() {
  const router = useRouter();
  const params = useParams();
  const cardId = parseInt(params.id as string);

  const [message, setMessage] = useState("");
  const [activeModal, setActiveModal] = useState<"mirror" | "bridge" | null>(
    null
  );
  const [sensitiveMode, setSensitiveMode] = useState(false);

  const card = allCards.find((c) => c.id === cardId);
  const mirrorCard = card?.mirrorCardId ? getMirrorCard(card.id) : null;

  if (!card) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Carte non trouvée
          </h1>
          <button
            onClick={() => router.push("/women-space")}
            className="text-pink-600 hover:text-pink-700 font-semibold"
          >
            ← Retour à l&apos;espace Femme
          </button>
        </div>
      </div>
    );
  }

  // Check if card requires sensitive mode and if it's not activated
  const requiresSensitiveAccess = card.requiresSensitiveMode && !sensitiveMode;

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Message envoyé à SOYA:", message);
      // Handle message sending logic here
      setMessage("");
    }
  };

  const handleMirrorAccess = () => {
    setActiveModal(null);
    if (card.mirrorCardId) {
      router.push(`/men-space/${card.mirrorCardId}`);
    }
  };

  const handleBridgeAccess = (target: "crossed-language" | "mirror") => {
    setActiveModal(null);
    switch (target) {
      case "crossed-language":
        router.push("/crossed-emotional-language");
        break;
      case "mirror":
        if (card.mirrorCardId) {
          router.push(`/men-space/${card.mirrorCardId}`);
        }
        break;
      default:
        break;
    }
  };

  const handleActivateSensitiveMode = () => {
    setSensitiveMode(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <Navbar />

      {/* Mirror Card Modal */}
      {activeModal === "mirror" && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-gray-900">
              Changer de perspective
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Vous allez découvrir comment l&apos;autre personne pourrait vivre
              cette situation. Ce n&apos;est pas pour vous identifier, mais pour
              comprendre son univers émotionnel.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleMirrorAccess}
                className="flex-1 bg-blue-500 text-white py-2.5 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
              >
                Voir sa perspective
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
              >
                Rester ici
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bridge Card Modal */}
      {activeModal === "bridge" && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-gray-900">
              Carte Passerelle
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Cette carte vous invite à explorer d&apos;autres dimensions
              émotionnelles.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => handleBridgeAccess("crossed-language")}
                className="w-full bg-green-500 text-white py-2.5 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
              >
                Langage Émotionnel Croisé
              </button>
              <button
                onClick={() => handleBridgeAccess("mirror")}
                className="w-full bg-blue-500 text-white py-2.5 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm"
              >
                Voir sa perspective
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="w-full bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
              >
                Rester ici
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/women-space")}
          className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour à l&apos;espace Femme
        </button>

        {/* Sensitive Mode Warning */}
        {requiresSensitiveAccess && (
          <div className="mb-6 bg-orange-50 border border-orange-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-orange-800 mb-2">
                  Contenu sensible
                </h3>
                <p className="text-orange-700 text-sm mb-4">
                  Cette carte explore des thèmes sensibles qui pourraient
                  réveiller des émotions intenses. Nous te recommandons
                  d&apos;activer le mode sensible pour une expérience plus
                  douce.
                </p>
                <button
                  onClick={handleActivateSensitiveMode}
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm"
                >
                  Activer le mode sensible
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="flex gap-2 mb-4">
          {card.sensitive && (
            <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full font-semibold">
              ⚠ Mode sensible {sensitiveMode ? "activé" : ""}
            </span>
          )}
          {card.isGhost && (
            <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-semibold">
              Carte fantôme
            </span>
          )}
          {card.cardType === "bridge" && (
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-semibold">
              Carte passerelle
            </span>
          )}
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-80 rounded-3xl overflow-hidden mb-8 shadow-lg">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>

        {/* Card Header */}
        <div className="mb-8">
          <div className="mb-3">
            <span className="text-sm font-semibold text-pink-600 bg-pink-50 px-4 py-1.5 rounded-full">
              {card.group}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {card.title}
          </h1>
          <p className="text-lg text-gray-600 mb-6">{card.subtitle}</p>
        </div>

        {/* Main Content Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-pink-100 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Résonance émotionnelle
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {card.pitch}
          </p>
        </div>

        {/* Examples Section */}
        {card.examples && card.examples.length > 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-pink-100 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Exemples de situations
            </h2>
            <div className="space-y-3">
              {card.examples.map((example, index) => (
                <div
                  key={index}
                  className="bg-pink-50 rounded-xl p-4 text-gray-700"
                >
                  {example}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Emotional Focus Section */}
        {card.emotionalFocus && card.emotionalFocus.length > 0 && (
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-pink-100 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Ce que SOYA t&apos;aide à explorer ici
            </h2>
            <div className="space-y-3">
              {card.emotionalFocus.map((focus, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Heart className="w-3 h-3 text-pink-600" />
                  </div>
                  <p className="text-gray-700">{focus}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat with SOYA Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-pink-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Discuter avec SOYA
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Partage ce que tu ressens, SOYA est là pour t&apos;écouter
              </p>
            </div>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Par exemple: "SOYA, ${card.title.toLowerCase()}. Aide-moi à comprendre ce que je ressens."`}
            className="w-full min-h-[120px] p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-400 mb-4"
          />

          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 px-6 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Envoyer à SOYA
          </button>

          {/* Special Actions */}
          {(card.hasPasserelle || card.hasMirror) && (
            <div className="mt-8 border-t pt-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-4 text-center">
                Explorer d&apos;autres perspectives
              </h3>
              <div className="space-y-3">
                {card.hasMirror && mirrorCard && (
                  <button
                    onClick={() => setActiveModal("mirror")}
                    className="w-full bg-blue-50 text-blue-700 px-6 py-4 rounded-xl hover:bg-blue-100 transition-colors font-semibold border border-blue-200 flex items-center justify-center gap-3"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5z"
                      />
                    </svg>
                    <div className="text-left">
                      <div className="font-semibold">
                        Changer de perspective
                      </div>
                      <div className="text-sm text-blue-600">
                        Voir comment il pourrait le vivre
                      </div>
                    </div>
                  </button>
                )}

                {card.hasPasserelle && (
                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveModal("bridge")}
                      className="w-full bg-green-50 text-green-700 px-6 py-4 rounded-xl hover:bg-green-100 transition-colors font-semibold border border-green-200 flex items-center justify-center gap-3"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                      <div className="text-left">
                        <div className="font-semibold">Carte Passerelle</div>
                        <div className="text-sm text-green-600">
                          Explorer d&apos;autres dimensions émotionnelles
                        </div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Mirror Card Preview */}
              {card.hasMirror && mirrorCard && (
                <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <h4 className="text-sm font-semibold text-blue-800 mb-2">
                    Perspective masculine correspondante:
                  </h4>
                  <p className="text-sm text-blue-700 italic">
                    &quot;{mirrorCard.title}&quot;
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Ghost Card Information */}
          {card.isGhost && (
            <div className="mt-6 p-4 bg-purple-50 rounded-xl border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <svg
                  className="w-4 h-4 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <span className="text-sm font-semibold text-purple-700">
                  Carte Fantôme
                </span>
              </div>
              <p className="text-sm text-purple-600">
                Cette carte explore les zones d&apos;ombre entre passé et
                présent. Elle t&apos;invite à revisiter ce qui hante ton cœur
                avec douceur, sans rouvrir les blessures.
              </p>
            </div>
          )}
        </div>

        {/* Navigation to related cards */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => {
              const prevCard = allCards.find((c) => c.id === card.id - 1);
              if (prevCard) {
                router.push(`/women-space/${prevCard.id}`);
              }
            }}
            disabled={!allCards.find((c) => c.id === card.id - 1)}
            className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Carte précédente
          </button>

          <button
            onClick={() => {
              const nextCard = allCards.find((c) => c.id === card.id + 1);
              if (nextCard) {
                router.push(`/women-space/${nextCard.id}`);
              }
            }}
            disabled={!allCards.find((c) => c.id === card.id + 1)}
            className="flex items-center gap-2 text-gray-600 hover:text-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Carte suivante
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
