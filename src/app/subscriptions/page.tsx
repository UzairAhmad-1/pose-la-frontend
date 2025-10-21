// app/subscriptions/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, X, Gift } from "lucide-react";

export default function SubscriptionsPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly"
  );
  const router = useRouter();

  const plans = [
    {
      id: "free",
      name: "Gratuit",
      subtitle: "3 jours pour découvrir POSE-LÀ",
      description: "Pas de carte bleue, pas d'engagement",
      price: "0",
      period: "/ 3 jours",
      features: [
        { text: "3 jours d'accès complet à toutes les cartes", included: true },
        {
          text: "Envoi limité à 3 fichiers (captures ou documents)",
          included: true,
        },
        { text: "Réponses générales en mode standard", included: true },
        { text: "Interface simple (sans options avancées)", included: true },
        { text: "Accès limité aux modules", included: true },
      ],
      cta: "Commencer l'essai gratuit",
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      subtitle: "L'accompagnement émotionnel complet avec SOYA",
      price: "19,99",
      annualPrice: "239,88",
      period: "/ mois",
      annualPeriod: "/ an",
      features: [
        { text: "Accès illimité à tous les contenus", included: true },
        { text: "Conversations vocales quotidiennes (20 min)", included: true },
        {
          text: "Sauvegarde complète de vos échanges et cartes débloquées",
          included: true,
        },
        {
          text: "Mémoire conversationnelle : SOYA se souvient de vos confidences",
          included: true,
        },
        {
          text: "Accompagnement équilibré pour explorer vos émotions en toute sécurité",
          included: true,
        },
        { text: "Interface personnalisable", included: true },
        {
          text: "Bonus exclusif abonnement annuel : 1 mois de formule Pro à offrir à un proche",
          included: true,
        },
      ],
      cta: "Choisir Pro",
      popular: true,
    },
    {
      id: "plus",
      name: "Plus",
      subtitle:
        "Un accompagnement privilégié sur la durée avec des avantages exclusifs",
      price: "23,99",
      annualPrice: "359,88",
      period: "/ mois",
      annualPeriod: "/ an",
      annualNote: "1 mois offert",
      features: [
        { text: "Tous les avantages de la formule Pro", included: true },
        {
          text: "Conversations vocales quotidiennes (40 min/jour)",
          included: true,
        },
        { text: "Fluidité garantie même aux heures de pointe", included: true },
        { text: "Mémoire émotionnelle enrichie", included: true },
        { text: "Accès prioritaire aux nouveautés", included: true },
        {
          text: "Bonus exclusif abonnement annuel : 1 mois de formule Pro à offrir à un proche",
          included: true,
        },
      ],
      cta: "Choisir Plus",
      popular: false,
    },
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);

    // Handle navigation based on selected plan
    if (planId === "free") {
      // Redirect to free trial start
      router.push("/home");
    } else {
      // Redirect to payment page for the selected plan
      router.push(`/settings/tone?plan=${planId}&billing=${billingCycle}`);
      //   router.push(
      //     `/subscriptions/checkout?plan=${planId}&billing=${billingCycle}`
      //   );
    }
  };

  const handleGiftClick = (planId: string) => {
    // Redirect to gift page with plan pre-selected
    router.push(`/subscriptions/gift?plan=${planId}`);
  };

  return (
    <div className="min-h-screen bg-[#f4f6fc] py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Choisis ton accompagnement
          </h1>
          <p className="text-black text-lg max-w-2xl mx-auto">
            Découvre les différentes formules pour vivre une expérience
            émotionnelle unique avec SOYA
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === "monthly"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === "annual"
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Annuel
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? "border-black scale-105 relative"
                  : "border-transparent"
              } ${
                selectedPlan === plan.id
                  ? "ring-2 ring-black ring-opacity-50"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-black text-white px-4 py-1 rounded-full text-sm font-medium">
                    Le plus populaire
                  </span>
                </div>
              )}

              <div className="p-6 sm:p-8">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-black mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-black text-sm mb-4">{plan.subtitle}</p>
                  {plan.description && (
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                  )}
                </div>

                {/* Price */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-black">
                      {billingCycle === "annual" && plan.id !== "free"
                        ? plan.annualPrice
                        : plan.price}
                      €
                    </span>
                    <span className="text-gray-600">
                      {billingCycle === "annual" && plan.id !== "free"
                        ? plan.annualPeriod
                        : plan.period}
                    </span>
                  </div>
                  {plan.annualNote && billingCycle === "annual" && (
                    <p className="text-green-600 text-sm font-medium mt-2">
                      {plan.annualNote}
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-black text-sm">
                    {plan.id === "free" ? "Accès limité" : "Ce que tu obtiens"}
                  </h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      )}
                      <span className="text-sm text-black leading-tight">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                    plan.id === "free"
                      ? "bg-gray-900 text-white hover:bg-black"
                      : plan.popular
                      ? "bg-black text-white hover:bg-black"
                      : "bg-gray-100 text-black hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </button>

                {/* Gift Option */}
                {plan.id !== "free" && (
                  <button
                    onClick={() => handleGiftClick(plan.id)}
                    className="w-full mt-3 flex items-center justify-center gap-2 py-2 px-4 text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    <Gift className="h-4 w-4" />
                    Offrir {plan.name}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-600">
          <p>
            Questions ?{" "}
            <Link href="/help" className="text-black hover:underline">
              Consulte notre centre d'aide
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
