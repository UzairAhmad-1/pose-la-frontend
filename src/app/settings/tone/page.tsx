// app/settings/tone/page.tsx
"use client";

import { useState } from "react";

export default function TonePersonalizationPage() {
  const [formData, setFormData] = useState({
    preferredName: "",
    profession: "",
    tone: "",
    customPreferences: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle tone preferences save
    console.log("Tone preferences:", formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToneSelect = (tone: string) => {
    setFormData((prev) => ({
      ...prev,
      tone,
    }));
  };

  const toneOptions = [
    {
      id: "familiar",
      name: "Familier (tu)",
      description: "Je te tutoie, simple et directe",
    },
    {
      id: "modern",
      name: "Moderne et percutant (tu)",
      description: "Je vais droit au but, efficace et stylé.",
    },
    {
      id: "warm",
      name: "Complice",
      description:
        "Chaleureux, proche et motivant, avec une touche d'humour si le contexte s'y prête.",
    },
    {
      id: "classic",
      name: "Classique et posé",
      description:
        "Je m'exprime avec respect, professionnel mais bienveillant.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fc] py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            Comment préfères-tu que je m&apos;adresse à toi ?
          </h1>
          <p className="text-black text-lg">
            Je peux adapter mon ton à ta personnalité. Choisis l&apos;approche
            qui te correspond le mieux, tu pourras la modifier à tout moment.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Preferred Name */}
            <div>
              <label
                htmlFor="preferredName"
                className="block text-sm font-medium text-black mb-3"
              >
                Comment veux-tu que je t&apos;appelle ?
              </label>
              <input
                type="text"
                id="preferredName"
                name="preferredName"
                value={formData.preferredName}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                placeholder="Prénom ou surnom"
              />
            </div>

            {/* Profession/Passion */}
            <div>
              <label
                htmlFor="profession"
                className="block text-sm font-medium text-black mb-3"
              >
                Qu&apos;est-ce qui t&apos;anime professionnellement ?
              </label>
              <input
                type="text"
                id="profession"
                name="profession"
                value={formData.profession}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                placeholder="Métier, études, projet ou passion"
              />
            </div>

            {/* Tone Selection */}
            <div>
              <label className="block text-sm font-medium text-black mb-4">
                Style de communication
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {toneOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleToneSelect(option.id)}
                    className={`p-4 text-left border-2 rounded-lg transition-all duration-200 ${
                      formData.tone === option.id
                        ? "border-black bg-gray-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <h3 className="font-semibold text-black mb-2">
                      {option.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Preferences */}
            <div>
              <label
                htmlFor="customPreferences"
                className="block text-sm font-medium text-black mb-3"
              >
                Personnalise ton style de communication
              </label>
              <textarea
                id="customPreferences"
                name="customPreferences"
                value={formData.customPreferences}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-black focus:border-black"
                placeholder="Ajoute tes préférences pour que SOYA s'adapte encore mieux à toi"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!formData.tone}
              className="w-full bg-black text-white py-3 px-4 rounded-lg font-medium hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              C&apos;est parti
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
