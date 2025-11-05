// app/subscriptions/gift/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Gift, Heart } from "lucide-react";
import GiftCodeGenerator from "../../components/layout/GiftCodeGenerator";

function GiftSubscriptionContent() {
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientEmail: "",
    personalMessage: "",
    duration: "monthly",
    giftCode: "",
    selectedPlan: "pro",
  });

  const searchParams = useSearchParams();

  useEffect(() => {
    // Get plan from URL query parameters
    const planFromParams = searchParams.get("plan");
    if (
      planFromParams &&
      (planFromParams === "pro" || planFromParams === "plus")
    ) {
      setFormData((prev) => ({
        ...prev,
        selectedPlan: planFromParams,
      }));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle gift subscription logic
    console.log("Gift subscription:", formData);
    // Redirect to payment or confirmation page
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlanChange = (plan: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedPlan: plan,
    }));
  };

  return (
    <div className="min-h-screen bg-[#f4f6fc] py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-3 rounded-full shadow-lg">
              <Gift className="h-8 w-8 text-black" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Offrir POSE-LÀ à un proche
          </h1>
          <p className="text-black text-lg leading-relaxed max-w-3xl mx-auto">
            Parfois, le plus beau cadeau qu&apos;on puisse offrir, c&apos;est du
            temps pour soi. Un espace où déposer ses pensées, comprendre ses
            émotions, et avancer à son rythme.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gift Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              {/* How it works */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4">
                  Comment offrir cet accompagnement :
                </h2>
                <div className="space-y-3 text-black">
                  <p>
                    • Choisis la personne que tu souhaites offrir ce cadeau,
                    personnalise son message : écris-lui quelques mots sincères
                    : par exemple, &quot;je t&apos;offre ce moment, prendre ce
                    temps pour toi&quot;.
                  </p>
                  <p>
                    • Offre instantanée : ton cadeau est activable
                    immédiatement, sans attente.
                  </p>
                </div>
              </div>

              {/* Plan Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-black mb-3">
                  Formule à offrir
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handlePlanChange("pro")}
                    className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                      formData.selectedPlan === "pro"
                        ? "border-black bg-gray-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <h3 className="font-semibold text-black">Pro</h3>
                    <p className="text-sm text-gray-600">19,99€/mois</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePlanChange("plus")}
                    className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                      formData.selectedPlan === "plus"
                        ? "border-black bg-gray-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <h3 className="font-semibold text-black">Plus</h3>
                    <p className="text-sm text-gray-600">23,99€/mois</p>
                  </button>
                </div>
              </div>

              {/* Gift Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Recipient Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="recipientName"
                      className="block text-sm font-medium text-black mb-2"
                    >
                      Prénom du destinataire (optionnel)
                    </label>
                    <input
                      type="text"
                      id="recipientName"
                      name="recipientName"
                      value={formData.recipientName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                      placeholder="Prénom"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="recipientEmail"
                      className="block text-sm font-medium text-black mb-2"
                    >
                      Email du destinataire *
                    </label>
                    <input
                      type="email"
                      id="recipientEmail"
                      name="recipientEmail"
                      value={formData.recipientEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                      placeholder="email@exemple.com"
                    />
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-black mb-2">
                    Durée de l&apos;abonnement
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="duration"
                        value="monthly"
                        checked={formData.duration === "monthly"}
                        onChange={handleInputChange}
                        className="text-black focus:ring-black"
                      />
                      <span className="ml-3 text-black">Mensuel</span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="duration"
                        value="annual"
                        checked={formData.duration === "annual"}
                        onChange={handleInputChange}
                        className="text-black focus:ring-black"
                      />
                      <span className="ml-3 text-black">Annuel</span>
                    </label>
                  </div>
                </div>

                {/* Personal Message */}
                <div>
                  <label
                    htmlFor="personalMessage"
                    className="block text-sm font-medium text-black mb-2"
                  >
                    Message personnel
                  </label>
                  <textarea
                    id="personalMessage"
                    name="personalMessage"
                    value={formData.personalMessage}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                    placeholder="Écris un message personnalisé pour ton proche..."
                  />
                </div>

                {/* Gift Code (for premium subscribers) */}
                <div>
                  <label
                    htmlFor="giftCode"
                    className="block text-sm font-medium text-black mb-2"
                  >
                    Code cadeau premium (optionnel)
                  </label>
                  <input
                    type="text"
                    id="giftCode"
                    name="giftCode"
                    value={formData.giftCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                    placeholder="PL-GIFT-XXXX-XXXX"
                  />
                  <p className="text-sm text-gray-600 mt-1">
                    Si tu as un code cadeau de ton abonnement premium annuel
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  <Heart className="h-5 w-5" />
                  Offrir {formData.selectedPlan === "pro" ? "Pro" : "Plus"}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar with Experience Description and Gift Code Generator */}
          <div className="space-y-6">
            {/* Experience Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-black mb-3">
                L&apos;expérience qu&apos;elle va recevoir :
              </h3>
              <ul className="text-black text-sm space-y-2">
                <li>
                  • Un email d&apos;accueil chaleureux l&apos;attend :
                  &quot;Quelqu&apos;un pense à toi.&quot;
                </li>
                <li>• Un espace personnel où ses mots trouvent leur place</li>
                <li>
                  • SOYA l&apos;accompagne avec bienveillance, sans jugement
                </li>
                <li>
                  • Aucune contrainte : pas de carte bancaire, pas
                  d&apos;engagement
                </li>
                <li>• Juste un espace de liberté émotionnelle</li>
              </ul>
            </div>

            {/* Gift Code Generator for Premium Subscribers */}
            <GiftCodeGenerator />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GiftSubscriptionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f4f6fc] py-8 px-4 sm:py-12 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      }
    >
      <GiftSubscriptionContent />
    </Suspense>
  );
}
