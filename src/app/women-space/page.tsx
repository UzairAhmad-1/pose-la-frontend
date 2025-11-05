"use client";

import { useState } from "react";
import {
  Heart,
  Lock,
  Search,
  Filter,
  AlertTriangle,
  MessageCircle,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { allCards, groups, Card } from "../lib/cardData";

export default function WomenSpacePage() {
  const [selectedGroup, setSelectedGroup] = useState("Toutes les cartes");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<
    "sensitive" | "ghost" | "mirror" | "bridge" | null
  >(null);

  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const router = useRouter();

  // Filter cards based on selected group and search query
  const filteredCards = allCards.filter((card) => {
    const matchesGroup =
      selectedGroup === "Toutes les cartes" || card.group === selectedGroup;
    const matchesSearch =
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesGroup && matchesSearch;
  });

  // Handle card click with proper modal management
  const handleCardClick = (card: Card) => {
    if (card.locked) {
      return;
    }

    switch (card.cardType) {
      case "sensitive":
        setSelectedCard(card);
        setActiveModal("sensitive");
        break;

      case "ghost":
        setSelectedCard(card);
        setActiveModal("ghost");
        break;

      default:
        router.push(`/women-space/${card.id}`);
    }
  };

  const handleMirrorClick = (card: Card, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCard(card);
    setActiveModal("mirror");
  };

  const handlePasserelleClick = (card: Card, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCard(card);
    setActiveModal("bridge");
  };

  const handleAccessGhost = (option: "continue" | "sensitive" | "later") => {
    setActiveModal(null);
    if (option === "continue" && selectedCard) {
      router.push(`/women-space/${selectedCard.id}`);
    }
  };

  const handleAccessBridge = (
    target: "crossed-language" | "mirror" | "default"
  ) => {
    setActiveModal(null);
    switch (target) {
      case "crossed-language":
        router.push("/crossed-emotional-language");
        break;
      case "mirror":
        if (selectedCard?.mirrorCardId) {
          router.push(`/men-spaces/${selectedCard.mirrorCardId}`);
        }
        break;
      default:
        if (selectedCard) {
          router.push(`/women-space/${selectedCard.id}`);
        }
    }
  };
  // Modal handlers
  const handleAccessSensitive = () => {
    setActiveModal(null);
    if (selectedCard) {
      router.push(`/women-space/${selectedCard.id}`);
    }
  };

  const handleAccessMirror = () => {
    setActiveModal(null);
    if (selectedCard?.mirrorCardId) {
      // Navigate to male space mirror card
      router.push(`/men-spaces/${selectedCard.mirrorCardId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white text-gray-900 font-sans">
      <Navbar />

      {/* Sensitive Content Warning Modal */}
      {activeModal === "sensitive" && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-gray-900">
              Contenu sensible
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Cette carte touche à des souvenirs sensibles ou intimes. Veux-tu y
              accéder maintenant ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleAccessSensitive}
                className="flex-1 bg-orange-500 text-white py-2.5 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm"
              >
                Accéder
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
              >
                Pas maintenant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ghost Card Modal */}
      {activeModal === "ghost" && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-xl">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-bold mb-3 text-gray-900">
              Carte Fantôme
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              Cette carte explore des émotions intenses (colère, désir de
              revanche). Elle t&apos;invite à revisiter ce qui hante ton cœur
              avec douceur.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => handleAccessGhost("continue")}
                className="w-full bg-purple-500 text-white py-2.5 px-4 rounded-lg hover:bg-purple-600 transition-colors font-medium text-sm"
              >
                Continuer maintenant
              </button>
              <button
                onClick={() => handleAccessGhost("sensitive")}
                className="w-full bg-orange-500 text-white py-2.5 px-4 rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm"
              >
                Activer le mode sensible
              </button>
              <button
                onClick={() => handleAccessGhost("later")}
                className="w-full bg-gray-100 text-gray-700 py-2.5 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
              >
                Garder pour plus tard
              </button>
            </div>
          </div>
        </div>
      )}

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
                onClick={handleAccessMirror}
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
                onClick={() => handleAccessBridge("crossed-language")}
                className="w-full bg-green-500 text-white py-2.5 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
              >
                Langage Émotionnel Croisé
              </button>
              <button
                onClick={() => handleAccessBridge("mirror")}
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-white fill-white" />
          </div>
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            ESPACE FEMME
          </h1>
          <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
            Un accompagnement pensé spécifiquement pour les femmes, explorant
            les défis, les transitions et les forces uniques de
            l&apos;expérience féminine. Trouve ici un espace de sororité et de
            compréhension profonde.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
            <span className="bg-white text-pink-600 px-4 py-2 rounded-full font-semibold shadow-sm">
              {allCards.length} cartes disponibles
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-600">
              Parcours émotionnel personnalisé
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une carte..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Filter Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-semibold text-gray-600">
                Filtrer par groupe :
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3">
              {groups.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                    selectedGroup === group
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-pink-50 border border-gray-200"
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 ${
                card.locked ? "opacity-75" : "cursor-pointer hover:scale-105"
              }`}
              onClick={() => handleCardClick(card)}
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
                {card.locked && (
                  <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center">
                    <Lock className="w-12 h-12 text-gray-400" />
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between">
                  <div className="flex gap-2">
                    {card.isGhost && (
                      <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                        Fantôme
                      </span>
                    )}
                    {card.cardType === "bridge" && (
                      <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                        Passerelle
                      </span>
                    )}
                  </div>
                  <div>
                    {card.sensitive && (
                      <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                        Sensible
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
                    {card.group}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 line-clamp-2 min-h-[3.5rem]">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {card.subtitle}
                </p>

                {/* Action Buttons */}
                {card.locked ? (
                  <div className="text-center py-2">
                    <p className="text-sm text-gray-500 mb-3">
                      Cette carte est verrouillée
                    </p>
                    <button
                      className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-colors text-sm font-semibold"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Déverrouiller
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all font-semibold shadow-md flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(card);
                      }}
                    >
                      Explorer
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    {/* Special Buttons */}
                    {(card.hasPasserelle || card.hasMirror) && (
                      <div className="flex gap-2">
                        {card.hasPasserelle && (
                          <button
                            onClick={(e) => handlePasserelleClick(card, e)}
                            className="flex-1 bg-green-50 text-green-700 px-4 py-2 rounded-xl hover:bg-green-100 transition-colors text-sm font-semibold border border-green-200"
                          >
                            ☞ Passerelle
                          </button>
                        )}
                        {card.hasMirror && (
                          <button
                            onClick={(e) => handleMirrorClick(card, e)}
                            className="flex-1 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors text-sm font-semibold border border-blue-200"
                          >
                            ☐ Miroir
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCards.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-pink-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Aucune carte trouvée
            </h3>
            <p className="text-gray-600">
              Essaie de modifier tes filtres ou ta recherche
            </p>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8 border border-pink-100">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">
                {allCards.length}
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                Cartes disponibles
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">
                {allCards.filter((c) => !c.locked).length}
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                Cartes déverrouillées
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">
                {groups.length - 1}
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                Groupes thématiques
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-pink-100 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Un espace pensé pour toi
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Chaque carte a été créée avec soin pour accompagner ton parcours
                émotionnel. Prends ton temps, explore à ton rythme, et
                n&apos;hésite pas à revenir sur les cartes qui résonnent
                particulièrement avec toi. Tu n&apos;es pas seule dans ce
                voyage.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-pink-100 to-rose-100 mt-20 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-md">
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Besoin d&apos;accompagnement ?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            SOYA est là pour t&apos;écouter, te guider et t&apos;accompagner
            dans ton parcours. Chaque conversation est un pas vers ta
            reconstruction.
          </p>
          <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all font-semibold shadow-lg">
            Discuter avec SOYA
          </button>
        </div>
      </footer>
    </div>
  );
}
