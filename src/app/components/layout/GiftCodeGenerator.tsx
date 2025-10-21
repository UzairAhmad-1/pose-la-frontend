// components/GiftCodeGenerator.tsx
"use client";

import { useState } from "react";
import { Copy, Gift } from "lucide-react";

export default function GiftCodeGenerator() {
  const [giftCode, setGiftCode] = useState<string | null>(null);
  const [isUsed, setIsUsed] = useState(false);

  const generateGiftCode = () => {
    // Generate a unique gift code
    const code = `PL-GIFT-${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}-2026`;
    setGiftCode(code);
  };

  const copyToClipboard = async () => {
    if (giftCode) {
      await navigator.clipboard.writeText(giftCode);
      // You can show a toast notification here
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-4">
        <Gift className="h-6 w-6 text-black" />
        <h3 className="text-lg font-semibold text-black">
          Bonus inclus : 1 mois à offrir
        </h3>
      </div>

      {isUsed ? (
        <div className="text-center py-4">
          <p className="text-gray-600">Bonus utilisé le 15/12/2024</p>
        </div>
      ) : giftCode ? (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Ton code cadeau :</p>
            <div className="flex items-center justify-between">
              <code className="text-lg font-mono text-black">{giftCode}</code>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-black text-white rounded hover:bg-black transition-colors"
              >
                <Copy className="h-4 w-4" />
                Copier
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Valide pendant 6 mois</p>
          </div>
          <p className="text-sm text-gray-600">
            Partage ce code avec la personne à qui tu souhaites offrir 1 mois
            d'abonnement Pro.
          </p>
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={generateGiftCode}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-black transition-colors"
          >
            Générer mon code cadeau
          </button>
        </div>
      )}
    </div>
  );
}
