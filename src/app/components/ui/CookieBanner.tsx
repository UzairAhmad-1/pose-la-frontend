"use client";

import { useState, useEffect } from "react";

export const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    const consentTimestamp = localStorage.getItem("cookieConsentTimestamp");

    if (!cookieConsent) {
      setShowBanner(true);
    } else if (consentTimestamp) {
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      const consentDate = new Date(parseInt(consentTimestamp));

      if (consentDate < sixMonthsAgo) {
        setShowBanner(true);
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookieConsentTimestamp", Date.now().toString());
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    localStorage.setItem("cookieConsentTimestamp", Date.now().toString());
    setShowBanner(false);
  };

  const handleCustomize = () => setShowCustomize(true);

  const saveCustomPreferences = (preferences: any) => {
    localStorage.setItem("cookieConsent", "custom");
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    localStorage.setItem("cookieConsentTimestamp", Date.now().toString());
    setShowBanner(false);
    setShowCustomize(false);
  };

  if (!showBanner) return null;

  return (
    <>
      {/* --- Cookie Banner --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-50">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 text-left">
              <h3 className="text-lg font-semibold text-black mb-2">
                Gestion des cookies
              </h3>
              <p className="text-gray-700 text-sm">
                Nous utilisons des cookies pour améliorer votre expérience sur
                POSE-LÀ. Les cookies essentiels sont nécessaires au
                fonctionnement de l'application.
              </p>
            </div>

            {/* ✅ Responsive Buttons */}
            <div className="flex flex-row flex-wrap justify-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleCustomize}
                className="flex-1 sm:flex-none px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
              >
                Personnaliser
              </button>
              <button
                onClick={handleReject}
                className="flex-1 sm:flex-none px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
              >
                Refuser
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 sm:flex-none px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm"
              >
                Accepter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Customization Modal --- */}
      {showCustomize && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold text-black mb-4">
                Personnaliser mes préférences cookies
              </h3>

              <div className="space-y-6">
                {/* Essential Cookies */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-black">
                        Cookies essentiels
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Nécessaires au fonctionnement de l'application
                        (authentification, sécurité, préférences de langue). Ces
                        cookies ne peuvent pas être désactivés.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="essential-cookies"
                        type="checkbox"
                        checked
                        disabled
                        title="Cookies essentiels activés"
                        className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                      />
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-black">
                        Cookies d'analyse
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Nous aident à comprendre comment vous utilisez
                        l'application pour améliorer nos services.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="analytics-cookies"
                        type="checkbox"
                        defaultChecked
                        title="Autoriser les cookies d'analyse"
                        className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                      />
                    </div>
                  </div>
                </div>

                {/* Preference Cookies */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-black">
                        Cookies de préférences
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Mémorisent vos paramètres et choix pour personnaliser
                        votre expérience.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="preference-cookies"
                        type="checkbox"
                        defaultChecked
                        title="Autoriser les cookies de préférences"
                        className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={() => setShowCustomize(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() =>
                    saveCustomPreferences({
                      analytics: true,
                      preferences: true,
                    })
                  }
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Enregistrer mes préférences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
