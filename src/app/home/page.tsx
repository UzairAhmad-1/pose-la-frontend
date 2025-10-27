"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/layout/Navbar";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
// This would typically come from your user context/auth
type Gender = "female" | "male" | "other" | "not-specified" | null;

interface JourneyCardProps {
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
  isRecommended?: boolean;
  recommendedColor?: string;
  recommendedText?: string;
  highlightText?: string;
}

function JourneyCard({
  title,
  description,
  imageUrl,
  imageAlt,
  href,
  isRecommended,
  recommendedColor,
  recommendedText,
  highlightText,
}: JourneyCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <section className="mb-12 border bg-white border-gray-200 rounded-lg overflow-hidden flex flex-col md:flex-row relative">
      {/* Recommended Badge */}
      {isRecommended && recommendedColor && (
        <div
          className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-white text-sm font-semibold cursor-help"
          style={{ backgroundColor: recommendedColor }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          Recommandé
          {showTooltip && (
            <div className="absolute top-full right-0 mt-2 bg-gray-900 text-white text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap">
              {recommendedText}
            </div>
          )}
        </div>
      )}

      {/* Highlight Text for Universal */}
      {highlightText && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
          {highlightText}
        </div>
      )}

      <div className="flex-shrink-0 w-full md:w-1/3">
        <Image
          src={imageUrl}
          alt={imageAlt}
          width={400}
          height={300}
          className="w-full h-64 md:h-full object-cover"
        />
      </div>
      <div className="flex-1 p-6 md:p-8 flex flex-col">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-gray-700 mb-6 leading-relaxed text-lg flex-grow">
          {description}
        </p>
        <div className="mt-auto">
          <Link
            href={href}
            className="inline-block bg-black text-white px-8 py-3 rounded transition-colors font-semibold"
          >
            ENTRER →
          </Link>
        </div>
      </div>
    </section>
  );
}

interface GenderPreferenceModalProps {
  onSelect: (choice: "women" | "men" | "universal") => void;
  onClose: () => void;
}

function GenderPreferenceModal({
  onSelect,
  onClose,
}: GenderPreferenceModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
        <h3 className="text-xl font-bold mb-4">Choisis ton parcours</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Souhaites-tu que je te suggère le Parcours Femme, le Parcours Homme,
          ou rester sur l'Espace Universel ?
          <br />
          <span className="text-sm text-gray-600 mt-2 block">
            Avantage : liberté complète — tu choisis ton propre chemin
            émotionnel.
          </span>
        </p>
        <div className="space-y-3">
          <button
            onClick={() => onSelect("women")}
            className="w-full bg-[#8c52ff] text-white px-6 py-3 rounded hover:bg-[#7a45dd] transition-colors font-semibold"
          >
            Parcours Femme
          </button>
          <button
            onClick={() => onSelect("men")}
            className="w-full bg-[#97b6e5] text-white px-6 py-3 rounded hover:bg-[#7a9fd9] transition-colors font-semibold"
          >
            Parcours Homme
          </button>
          <button
            onClick={() => onSelect("universal")}
            className="w-full bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors font-semibold"
          >
            Espace Universel
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 text-sm hover:text-gray-700 w-full text-center"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState<string | null>(null);
  const { user, isLoading } = useAuth();
  const userGender = user?.gender
    ? (user.gender.toLowerCase() as "female" | "male" | "other" | "universal")
    : null;

  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = "/";
    }
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleGenderPreferenceSelect = (
    choice: "women" | "men" | "universal"
  ) => {
    setSelectedJourney(choice);
    setShowGenderModal(false);
  };

  // Determine recommendations
  const getRecommendation = (space: "women" | "men" | "universal") => {
    // If user selected "other" and made a choice
    if (userGender === "other" && selectedJourney) {
      if (selectedJourney === space) {
        return {
          isRecommended: true,
          color:
            space === "women"
              ? "#8c52ff"
              : space === "men"
              ? "#97b6e5"
              : undefined,
          text: "Recommandé selon ton choix",
        };
      }
      return { isRecommended: false };
    }

    // Female user
    if (userGender === "female" && space === "women") {
      return {
        isRecommended: true,
        color: "#8c52ff",
        text: "Recommandé selon ton profil",
      };
    }

    // Male user
    if (userGender === "male" && space === "men") {
      return {
        isRecommended: true,
        color: "#97b6e5",
        text: "Recommandé selon ton profil",
      };
    }

    // Not specified or universal - highlight universal
    if (
      (userGender === "universal" || userGender === null) &&
      space === "universal"
    ) {
      return {
        highlightText: "Commence librement ici",
      };
    }

    return { isRecommended: false };
  };

  const womenRec = getRecommendation("women");
  const menRec = getRecommendation("men");
  const universalRec = getRecommendation("universal");

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans">
      {/* Header */}
      <Navbar />

      {/* Gender Preference Modal */}
      {showGenderModal && (
        <GenderPreferenceModal
          onSelect={handleGenderPreferenceSelect}
          onClose={() => setShowGenderModal(false)}
        />
      )}

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Introduction */}
        <section className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-6">
            PARCOURS ET ESPACES PRINCIPAUX
          </h2>
          <p className="text-lg leading-relaxed max-w-3xl mx-auto">
            Chaque espace qui t'est dédié est une invitation à déposer tes
            émotions, à comprendre ce que tu traverses et à avancer à ton
            rythme, en toute bienveillance.
          </p>
        </section>

        {/* Women's Space */}
        <JourneyCard
          title="ESPACE FEMME"
          description="Un accompagnement pensé spécifiquement pour les femmes, explorant les défis, les transitions et les forces uniques de l'expérience féminine. Trouve ici un espace de sororité et de compréhension profonde."
          imageUrl="/women.jpg"
          imageAlt="Espace Femme"
          href="/women-space"
          isRecommended={womenRec.isRecommended}
          recommendedColor={womenRec.color}
          recommendedText={womenRec.text}
        />

        {/* Men's Space */}
        <JourneyCard
          title="ESPACE HOMME"
          description="Un parcours dédié aux hommes pour explorer leur monde émotionnel, leurs relations et leur identité. Un lieu sûr pour exprimer, comprendre et transformer les aspects les plus profonds de leur être."
          imageUrl="/men.jpg"
          imageAlt="Espace Homme"
          href="/men-spaces"
          isRecommended={menRec.isRecommended}
          recommendedColor={menRec.color}
          recommendedText={menRec.text}
        />

        {/* Universal Space */}
        <JourneyCard
          title="ESPACE UNIVERSEL"
          description="Un espace inclusif qui transcende les genres, axé sur les expériences humaines communes. Explore ici les émotions, les relations et les défis qui nous unissent tous dans notre humanité partagée."
          imageUrl="/universal.jpg"
          imageAlt="Espace Universel"
          href="/universal-space"
          highlightText={universalRec.highlightText}
        />

        {/* Complementary Modules */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            Modules complémentaires
          </h2>
          <p className="text-center text-gray-700 mb-8 text-lg">
            Des outils et ressources pour enrichir ton parcours d'exploration
            émotionnelle.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Je me reconstruis */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white flex flex-col h-full">
              <h3 className="text-xl font-bold mb-3">Je me reconstruis</h3>
              <p className="text-gray-700 mb-4 flex-grow">
                Reprends le contrôle de ton histoire.
              </p>
              <div className="mt-auto">
                <Link
                  href="/rebuilding-myself"
                  className="text-black font-semibold hover:underline text-lg"
                >
                  Explorer →
                </Link>
              </div>
            </div>

            {/* Boîte à traduction */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white flex flex-col h-full">
              <h3 className="text-xl font-bold mb-3">Boîte à traduction</h3>
              <p className="text-gray-700 mb-4 flex-grow">
                Quand elle dit ça, il entend quoi ? Quand il dit ça, elle entend
                quoi ?
              </p>
              <div className="mt-auto">
                <Link
                  href="/boite-traduction"
                  className="text-black font-semibold hover:underline text-lg"
                >
                  Explorer →
                </Link>
              </div>
            </div>

            {/* Scanner relationnel */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white flex flex-col h-full">
              <h3 className="text-xl font-bold mb-3">Scanner relationnel</h3>
              <p className="text-gray-700 mb-4 flex-grow">
                Analyse tes dynamiques relationnelles.
              </p>
              <div className="mt-auto">
                <Link
                  href="/scanner-relationnel"
                  className="text-black font-semibold hover:underline text-lg"
                >
                  Explorer →
                </Link>
              </div>
            </div>

            {/* Énergie de séduction */}
            <div className="border border-gray-200 rounded-lg p-6 bg-white flex flex-col h-full">
              <h3 className="text-xl font-bold mb-3">Énergie de séduction</h3>
              <p className="text-gray-700 mb-4 flex-grow">
                Réveille son charisme authentique.
              </p>
              <div className="mt-auto">
                <Link
                  href="/energie-seduction"
                  className="text-black font-semibold hover:underline text-lg"
                >
                  Explorer →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center border-t border-gray-200 pt-12">
          <h3 className="text-2xl font-bold mb-4">
            Prête à commencer ton voyage intérieur ?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto text-lg">
            Chaque pas compte dans la découverte de soi. Laisse-toi guider avec
            douceur et bienveillance.
          </p>
          <Link
            href="/commencer"
            className="inline-block bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Commencer avec SOYA
          </Link>
        </section>
      </main>
    </div>
  );
}
