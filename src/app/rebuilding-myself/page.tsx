"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "../components/layout/Navbar";
import {
  FaCheck,
  FaLock,
  FaArrowLeft,
  FaExclamationTriangle,
  FaTimes,
} from "react-icons/fa";
import { IoIosConstruct } from "react-icons/io";

interface Step {
  id: number;
  title: string;
  text: string;
  narrative: string;
  isUnlocked: boolean;
  isCompleted: boolean;
}

export default function RebuildingMyself() {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: "Reconnaître mes ruines",
      text: "Accepter l&apos;effondrement est ton premier acte de courage.",
      narrative:
        "Tout s&apos;effondre. Tu regardes les décombres et tu aimerais fermer les yeux. Mais reconnaître tes ruines n&apos;est pas une faiblesse — c&apos;est du courage. C&apos;est dire : Oui, tout se brise... mais je suis encore là.",
      isUnlocked: true,
      isCompleted: false,
    },
    {
      id: 2,
      title: "Rassembler mes morceaux",
      text: "Même brisé, tu portes encore des forces prêtes à renaître.",
      narrative:
        "Tu te sens vide, convaincu qu&apos;il ne reste plus rien en toi. Et pourtant, dans les fissures, certaines parties demeurent solides. Ramasser ces fragments, c&apos;est reconnaître que ta valeur n&apos;a pas disparu. C&apos;est le début de la reconstruction d&apos;une base — fragile peut-être, mais réelle — sur laquelle renaître.",
      isUnlocked: false,
      isCompleted: false,
    },
    {
      id: 3,
      title: "Reconstruire ma confiance",
      text: "Ta valeur ne s&apos;est pas effondrée — elle attend d&apos;être retrouvée.",
      narrative:
        "La confiance peut se fissurer, mais elle ne disparaît jamais. Elle attend que tu la relèves, pierre par pierre, à ton propre rythme. Reconstruire ta confiance, c&apos;est te rappeler que tes épreuves ne te définissent pas. C&apos;est t&apos;accorder la permission d&apos;avancer avec dignité et force.",
      isUnlocked: false,
      isCompleted: false,
    },
    {
      id: 4,
      title: "Transformer ma douleur en force",
      text: "Ta douleur peut devenir le carburant de ta renaissance.",
      narrative:
        "La douleur peut rester un poids — ou se transformer en nouvelle énergie. Elle peut t&apos;enfermer, ou te pousser à créer quelque chose de différent. La transformer ne veut pas dire l&apos;effacer — mais lui donner un sens. C&apos;est en faire une force motrice, une source de résilience et de renouveau.",
      isUnlocked: false,
      isCompleted: false,
    },
    {
      id: 5,
      title: "Un nouveau départ",
      text: "Le passé reste écrit — mais demain t&apos;appartient.",
      narrative:
        "Tu portes encore tes cicatrices, mais elles ne dictent plus ton histoire. Chaque fin ouvre la possibilité d&apos;un nouveau commencement. Un nouveau départ ne nie pas ce que tu as vécu — il s&apos;appuie dessus. C&apos;est t&apos;autoriser à croire que demain peut être plus doux, et différent.",
      isUnlocked: false,
      isCompleted: false,
    },
  ]);

  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const resetModalRef = useRef<HTMLDivElement>(null);

  // Load progress from localStorage on component mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem("rebuilding-myself-progress");
      if (savedProgress) {
        setSteps(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error("Error loading progress:", error);
    }
  }, []);

  // Save progress to localStorage whenever steps change
  useEffect(() => {
    try {
      localStorage.setItem("rebuilding-myself-progress", JSON.stringify(steps));
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  }, [steps]);

  const handleCardClick = (step: Step) => {
    if (step.isUnlocked) {
      setSelectedStep(step);
      setShowModal(true);
      setIsClosing(false);
    }
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setSelectedStep(null);
      setIsClosing(false);
    }, 300);
  };

  const completeStep = (stepId: number) => {
    setSteps((prevSteps) =>
      prevSteps.map((step) => {
        if (step.id === stepId) {
          // Mark current step as completed
          const updatedStep = { ...step, isCompleted: true };

          // Unlock next step if it exists
          if (stepId < 5) {
            const nextStep = prevSteps.find((s) => s.id === stepId + 1);
            if (nextStep && !nextStep.isUnlocked) {
              setTimeout(() => {
                setSteps((prev) =>
                  prev.map((s) =>
                    s.id === stepId + 1 ? { ...s, isUnlocked: true } : s
                  )
                );
              }, 500);
            }
          }
          return updatedStep;
        }
        return step;
      })
    );
    closeModal();
  };

  const getProgressPercentage = () => {
    const completedSteps = steps.filter((step) => step.isCompleted).length;
    return (completedSteps / steps.length) * 100;
  };

  const handleResetClick = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    const resetSteps = steps.map((step, index) => ({
      ...step,
      isUnlocked: index === 0,
      isCompleted: false,
    }));
    setSteps(resetSteps);
    setShowResetConfirm(false);
    if (showModal) {
      closeModal();
    }
  };

  const cancelReset = () => {
    setShowResetConfirm(false);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        (!resetModalRef.current ||
          !resetModalRef.current.contains(event.target as Node))
      ) {
        closeModal();
      }
    };

    if (showModal || showResetConfirm) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [showModal, showResetConfirm]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans">
      <Navbar />

      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors font-semibold flex items-center gap-2"
            >
              <FaArrowLeft className="text-sm" />
              Retour
            </Link>
            <button
              onClick={handleResetClick}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors px-3 py-1 border border-gray-300 rounded-md flex items-center gap-2"
            >
              <IoIosConstruct />
              Réinitialiser
            </button>
          </div>

          <h1 className="text-3xl font-bold mb-4">Je me reconstruis</h1>
          <p className="text-lg text-gray-700 mb-6">
            Un voyage progressif en 5 étapes, de l&apos;effondrement à la
            renaissance. Chaque carte ouverte est un pas vers ton nouveau
            commencement.
          </p>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progression</span>
              <span>{Math.round(getProgressPercentage())}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-[#8c52ff] h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Steps Grid */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.id}
              onClick={() => handleCardClick(step)}
              className={`
                border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 transform
                ${
                  step.isUnlocked
                    ? "border-[#8c52ff] bg-white hover:shadow-lg hover:scale-105"
                    : "border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed"
                }
                ${step.isCompleted ? "border-green-500 bg-green-50" : ""}
              `}
            >
              {/* Step Number */}
              <div
                className={`
                w-10 h-10 rounded-full flex items-center justify-center mb-4 font-bold
                ${
                  step.isCompleted
                    ? "bg-green-500 text-white"
                    : step.isUnlocked
                    ? "bg-[#8c52ff] text-white"
                    : "bg-gray-300 text-gray-600"
                }
              `}
              >
                {step.isCompleted ? <FaCheck /> : step.id}
              </div>

              {/* Step Title */}
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>

              {/* Step Text */}
              <p className="text-gray-700 mb-4 italic">
                &quot;{step.text}&quot;
              </p>

              {/* Status */}
              <div className="text-sm flex items-center gap-1">
                {step.isCompleted ? (
                  <>
                    <FaCheck className="text-green-600" />
                    <span className="text-green-600 font-semibold">
                      Terminé
                    </span>
                  </>
                ) : step.isUnlocked ? (
                  <span className="text-[#8c52ff] font-semibold">
                    Clique pour commencer
                  </span>
                ) : (
                  <>
                    <FaLock className="text-gray-500 text-xs" />
                    <span className="text-gray-500">
                      Débloque après l&apos;étape {step.id - 1}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Completion Message */}
        {steps.every((step) => step.isCompleted) && (
          <div className="mt-12 text-center bg-green-50 border border-green-200 rounded-xl p-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <FaCheck className="text-white text-2xl" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              Parcours accompli !
            </h3>
            <p className="text-green-700 mb-6 text-lg">
              Tu as complété ton voyage de reconstruction. Souviens-toi que
              chaque fin n&apos;est que le début de quelque chose de nouveau.
            </p>
            <button
              onClick={handleResetClick}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center gap-2 mx-auto"
            >
              <IoIosConstruct />
              Recommencer le voyage
            </button>
          </div>
        )}
      </main>

      {/* Step Modal */}
      {showModal && selectedStep && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
            isClosing ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            ref={modalRef}
            className={`bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-transform duration-300 ${
              isClosing ? "scale-95" : "scale-100"
            }`}
          >
            {/* Modal Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500">
                    Étape {selectedStep.id}/5
                  </span>
                  <h2 className="text-2xl font-bold">{selectedStep.title}</h2>
                </div>
                <button
                  title="close"
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl transition-colors"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Step Text */}
              <blockquote className="text-xl italic text-gray-700 mb-8 p-4 bg-gray-50 rounded-lg border-l-4 border-[#8c52ff]">
                &quot;{selectedStep.text}&quot;
              </blockquote>

              {/* Narrative */}
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                  {selectedStep.narrative}
                </p>
              </div>

              {/* SOYA Discussion Prompt */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                  <IoIosConstruct className="text-blue-600" />
                  Discussion avec SOYA
                </h4>
                <p className="text-blue-700 mb-4">
                  Comment cette étape résonne-t-elle avec ton expérience
                  actuelle ? Qu&apos;est-ce que ces mots éveillent en toi ?
                </p>
                <textarea
                  placeholder="Partage tes réflexions, tes émotions, tes questions..."
                  className="w-full h-32 p-4 border border-blue-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-xl">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {selectedStep.isCompleted
                    ? "Étape déjà complétée"
                    : "Prêt à avancer ?"}
                </span>
                <div className="space-x-3">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Plus tard
                  </button>
                  {!selectedStep.isCompleted && (
                    <button
                      onClick={() => completeStep(selectedStep.id)}
                      className="px-6 py-2 bg-[#8c52ff] text-white rounded-lg hover:bg-[#7a45dd] transition-colors font-semibold"
                    >
                      Compléter cette étape
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            ref={resetModalRef}
            className="bg-white rounded-xl max-w-md w-full transform transition-transform duration-300 scale-100"
          >
            {/* Modal Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <FaExclamationTriangle className="text-red-600 text-lg" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Réinitialiser la progression
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Cette action ne peut pas être annulée
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-700">
                Es-tu sûr de vouloir réinitialiser ta progression ? Toutes les
                étapes complétées seront perdues et tu devras recommencer depuis
                le début.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-xl">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={cancelReset}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmReset}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
                >
                  <IoIosConstruct />
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
