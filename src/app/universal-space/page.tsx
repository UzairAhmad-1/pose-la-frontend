"use client";

import { useState } from "react";
import { Heart, Lock, Search, Filter } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Image from "next/image";
import { Card } from "../lib/cardData";

// All 65 cards data with images
const allCards = [
  {
    id: 1,
    title: "Une rupture que je regrette mais que je ne sais pas réparer",
    subtitle: "Regret & Reconstruction",
    pitch:
      "Certaines ruptures laissent un arrière-goût amer. Ton cœur regrette, ton esprit repasse les scènes, et pourtant rien ne se répare. C'est cet entre-deux douloureux — vouloir revenir sans savoir par où commencer. La question reste : est-il trop tard, ou ne sais-tu simplement pas comment faire",
    group: "Relations",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 2,
    title: "Quand le sexe devient un champ de bataille pour le contrôle",
    subtitle: "Intimité & Pouvoir",
    pitch:
      "Le sexe peut être un espace de liberté, mais parfois il se transforme en terrain de contrôle. Ce n'est plus une rencontre — ça devient domination, un rapport de force. Derrière les gestes, il n'y a plus de tendresse, seulement stratégie et contrôle. Alors l'intimité devient une contrainte, pas un refuge",
    group: "Intimité",
    locked: false,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1663115409520-989b46bd6eca?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1234",
  },
  {
    id: 3,
    title: "Relation avec le père",
    subtitle: "Lien fondateur & Héritage",
    pitch:
      "La relation avec le père laisse une empreinte profonde. Parfois c'est l'absence, parfois la dureté, parfois l'amour qui n'a jamais trouvé comment s'exprimer. Ce lien — fragile ou brisé — résonne encore dans tes choix, tes amours, tes colères. Tu crois avancer seul, mais l'ombre de ton père traîne toujours quelque part",
    group: "Famille",
    locked: false,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1629141650817-a4b997dc1613?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 4,
    title: "Charge mentale refoulée",
    subtitle: "Poids invisible & Épuisement",
    pitch:
      "Tu accumules tout — soucis, responsabilités, peurs — tout s'empile dans ta tête. Mais tu gardes le sourire, comme si tout allait bien. Cette charge mentale reste là, cachée, refoulée, jusqu'à ce que le corps ou le cœur lâche. Reconnaître ce poids est déjà le premier pas pour t'en libérer",
    group: "Bien-être mental",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1520127877998-122c33e8eb38?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
  },
  {
    id: 5,
    title: "Je veux poser une intention",
    subtitle: "Conscience & Direction",
    pitch:
      "Poser une intention, ce n'est pas seulement souhaiter. C'est mettre une énergie claire dans ce que tu veux vraiment vivre. C'est décider d'un cap — même petit — pour arrêter de subir ce qui arrive. L'intention devient une ancre, une force tranquille qui transforme tes pas en choix",
    group: "Développement personnel",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1184",
  },
  {
    id: 6,
    title: "Je veux comprendre mon comportement",
    subtitle: "Auto-observation & Conscience",
    pitch:
      "Parfois tu ne comprends pas tes propres gestes. Tu dis des mots que tu regrettes, tu agis de façon que tu n'avais pas prévue. C'est comme si autre chose agissait à ta place. Comprendre ton comportement, c'est mettre de la lumière sur ces mécanismes invisibles qui te pilotent — pour pouvoir reprendre la main",
    group: "Développement personnel",
    locked: true,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
  },
  {
    id: 7,
    title: "Je tourne en boucle",
    subtitle: "Rumination & Libération",
    pitch:
      "Ton esprit boucle sans fin. Les mêmes phrases, les mêmes images, les mêmes scénarios qui repassent encore et encore. Tu veux arrêter le disque rayé, mais il continue de tourner. Tourner en boucle, c'est être prisonnier d'un passé ou d'une peur, sans savoir comment en sortir. Reconnaître la boucle, c'est déjà le début pour trouver l'interrupteur",
    group: "Bien-être mental",
    locked: false,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
  },
  {
    id: 8,
    title: "Je veux parler à quelqu'un qui n'est plus là",
    subtitle: "Deuil & Paroles suspendues",
    pitch:
      "Quand quelqu'un disparaît, les mots restent coincés. Des phrases jamais dites, des confessions en suspens. Tu voudrais encore lui parler une fois — comme si le lien pouvait traverser l'absence. C'est le besoin de libérer ce que ton cœur n'a pas eu le temps d'exprimer",
    group: "Deuil",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1173",
  },
  {
    id: 9,
    title: "Je suis épuisé·e, mais je n'ai pas le droit de craquer",
    subtitle: "Fatigue & Attentes sociales",
    pitch:
      "Tu avances sous un poids écrasant. Tu souris, tu tiens, mais à l'intérieur, la fatigue te ronge. Craquer semble interdit — comme si tu devais rester fort·e coûte que coûte. Mais refouler ton épuisement ne l'efface pas ; il grandit, jusqu'à ce qu'un jour ton corps ou ton cœur dise stop",
    group: "Bien-être mental",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 10,
    title: "Je suis à deux doigts de reprendre contact",
    subtitle: "Tentation & Contrôle",
    pitch:
      "Tu te bats contre toi-même. Ton doigt plane au-dessus du téléphone — tu imagines le message, l'appel. Tu sais que reprendre contact pourrait rouvrir la plaie, pourtant l'envie reste forte. Entre la raison et l'impulsion, ton cœur balance encore",
    group: "Relations",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1613687089891-b9ea3e5e5f44?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  // Adding more cards to reach 65 (truncated for brevity, but you would continue with all 65)
  {
    id: 11,
    title: "Je fais semblant d'aller bien",
    subtitle: "Masque & Authenticité",
    pitch:
      "Ton masque est bien en place. Tu dis « ça va », tu ris même parfois — mais derrière, le vide et la fatigue restent. Faire semblant devient une armure — pour éviter d'inquiéter les autres, pour éviter d'être jugé·e. Mais cette façade a un prix : elle t'épuise et t'éloigne de toi-même",
    group: "Bien-être mental",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1651514644627-8a06b0559587?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
  },
  // Continue with remaining 54 cards...
];

// Available images array for cycling
const imageUrls = [
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://plus.unsplash.com/premium_photo-1663115409520-989b46bd6eca?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1234",
  "https://images.unsplash.com/photo-1629141650817-a4b997dc1613?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1520127877998-122c33e8eb38?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1184",
  "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332",
  "https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1173",
  "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1613687089891-b9ea3e5e5f44?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1651514644627-8a06b0559587?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
];

// Assign images to all cards (cycling through the image URLs)
allCards.forEach((card, index) => {
  card.image = imageUrls[index % imageUrls.length];
});

// Extract unique groups
const groups = [
  "Toutes les cartes",
  "Relations",
  "Intimité",
  "Famille",
  "Bien-être mental",
  "Développement personnel",
  "Deuil",
];

export default function UniversalSpacePage() {
  const [selectedGroup, setSelectedGroup] = useState("Toutes les cartes");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSensitiveWarning, setShowSensitiveWarning] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [sensitiveMode, setSensitiveMode] = useState(false);

  // Filter cards based on selected group and search query
  const filteredCards = allCards.filter((card) => {
    const matchesGroup =
      selectedGroup === "Toutes les cartes" || card.group === selectedGroup;
    const matchesSearch =
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter sensitive cards if sensitive mode is off
    const matchesSensitiveMode = sensitiveMode || !card.sensitive;

    return matchesGroup && matchesSearch && matchesSensitiveMode;
  });

  const handleCardClick = (card: Card) => {
    if (card.sensitive && !sensitiveMode) {
      setSelectedCard(card);
      setShowSensitiveWarning(true);
    } else if (!card.locked) {
      console.log("Navigate to card:", card.id);
    }
  };

  const handleAccessSensitive = () => {
    setSensitiveMode(true);
    setShowSensitiveWarning(false);
    console.log("Access sensitive card:", selectedCard?.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-indigo-50 text-gray-900 font-sans">
      <Navbar />

      {/* Sensitive Content Warning Modal */}
      {showSensitiveWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Contenu sensible
            </h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Cette carte touche à des souvenirs sensibles ou intimes. Veux-tu y
              accéder maintenant ?
            </p>
            <div className="space-y-3">
              <button
                onClick={handleAccessSensitive}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 px-6 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all font-semibold shadow-md"
              >
                Accéder
              </button>
              <button
                onClick={() => setShowSensitiveWarning(false)}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
              >
                Pas maintenant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-100 via-indigo-50 to-purple-100 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-white fill-white" />
          </div>
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            ESPACE UNIVERSEL
          </h1>
          <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
            Un accompagnement inclusif pour toutes et tous, explorant les défis,
            les transitions et les forces communes de l&apos;expérience humaine.
            Trouve ici un espace de compréhension profonde au-delà des genres.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
            <span className="bg-white text-purple-600 px-4 py-2 rounded-full font-semibold shadow-sm">
              {allCards.length} cartes disponibles
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-600">Parcours émotionnel universel</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="mb-5">
          {/* Filter Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-semibold text-gray-600">
                Filtrer par groupe :
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3 mb-4">
              {groups.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                    selectedGroup === group
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-purple-50 border border-gray-200"
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>

            {/* Sensitive Mode Toggle */}
            <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-200">
              {/* Non-clickable label text */}
              <span
                id="sensitiveModeLabel"
                className="text-sm font-semibold text-gray-600"
              >
                Mode sensible
              </span>

              {/* Toggle switch */}
              <label
                className="relative inline-flex items-center cursor-pointer"
                aria-labelledby="sensitiveModeLabel"
              >
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={sensitiveMode}
                  onChange={(e) => setSensitiveMode(e.target.checked)}
                  title="Activer ou désactiver le mode sensible"
                />
                <div
                  className="w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-checked:bg-purple-500
      after:content-[''] after:absolute after:top-[2px] after:left-[2px]
      after:bg-white after:border-gray-300 after:border after:rounded-full
      after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"
                ></div>
              </label>

              <span className="text-xs text-gray-500 ml-2">
                {sensitiveMode ? "Activé" : "Désactivé"}
              </span>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 ${
                card.locked ? "opacity-75" : "cursor-pointer"
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
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
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
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all font-semibold shadow-md flex items-center justify-center gap-2"
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

                    {/* Special Buttons for Ghost Cards */}
                    {(card.hasPasserelle || card.hasMirror) && (
                      <div className="flex gap-2">
                        {card.hasPasserelle && (
                          <button
                            className="flex-1 bg-purple-50 text-purple-700 px-4 py-2 rounded-xl hover:bg-purple-100 transition-colors text-sm font-semibold border border-purple-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            ☞ Passerelle
                          </button>
                        )}
                        {card.hasMirror && (
                          <button
                            className="flex-1 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors text-sm font-semibold border border-blue-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            ☐ Miroir
                          </button>
                        )}
                      </div>
                    )}

                    {card.isGhost && (
                      <p className="text-xs text-center text-gray-500 italic">
                        Carte fantôme - Contenu en exploration
                      </p>
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
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-purple-400" />
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
        <div className="mt-16 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-100">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {allCards.length}
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                Cartes disponibles
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {allCards.filter((c) => !c.locked).length}
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                Cartes déverrouillées
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {groups.length - 1}
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                Groupes thématiques
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-purple-100 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Un espace pour toutes et tous
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Chaque carte a été créée avec soin pour accompagner ton parcours
                émotionnel, au-delà des genres et des identités. Prends ton
                temps, explore à ton rythme, et n&apos;hésite pas à revenir sur
                les cartes qui résonnent particulièrement avec toi. Tu n&apos;es
                pas seul·e dans ce voyage.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-purple-100 to-indigo-100 mt-20 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-md">
            <Heart className="w-8 h-8 text-purple-500 fill-purple-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Besoin d&apos;accompagnement ?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            SOYA est là pour t&apos;écouter, te guider et t&apos;accompagner
            dans ton parcours. Chaque conversation est un pas vers ta
            reconstruction.
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all font-semibold shadow-lg">
            Discuter avec SOYA
          </button>
        </div>
      </footer>
    </div>
  );
}
