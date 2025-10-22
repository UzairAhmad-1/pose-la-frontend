"use client";

import { useState, useEffect } from "react";

// Cookie types
interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
}

export const CookieBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    preferences: false,
  });

  useEffect(() => {
    checkCookieConsent();
    initializeCookies();
  }, []);

  const checkCookieConsent = () => {
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
        // Reset consent to show banner again
        localStorage.removeItem("cookieConsent");
        localStorage.removeItem("cookiePreferences");
      }
    }
  };

  const initializeCookies = () => {
    const savedPreferences = localStorage.getItem("cookiePreferences");
    if (savedPreferences) {
      const parsedPrefs: CookiePreferences = JSON.parse(savedPreferences);
      setPreferences(parsedPrefs);
      applyCookiePreferences(parsedPrefs);
    }
  };

  // Cookie management functions
  const setCookie = (name: string, value: string, days: number = 365) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie =
      name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
  };

  const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const deleteCookie = (name: string) => {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // Always set essential cookies (they're required for the site to function)
    setCookie("essential_cookie", "true", 365);

    // Analytics cookies
    if (prefs.analytics) {
      setCookie("google_analytics", "enabled", 365);
      setCookie("user_behavior", "tracking_enabled", 365);
      // Initialize analytics scripts here
      initializeAnalytics();
    } else {
      deleteCookie("google_analytics");
      deleteCookie("user_behavior");
      // Disable analytics scripts here
      disableAnalytics();
    }

    // Preference cookies
    if (prefs.preferences) {
      setCookie("user_preferences", "saved", 365);
      setCookie("language", "fr", 365);
      setCookie("theme", "light", 365);
    } else {
      deleteCookie("user_preferences");
      deleteCookie("language");
      deleteCookie("theme");
    }

    console.log("Cookie preferences applied:", prefs);
  };

  const initializeAnalytics = () => {
    // Mock analytics initialization
    console.log("Analytics initialized");
    // In a real implementation, you would load Google Analytics, Facebook Pixel, etc.
    // Example: window.gtag('config', 'GA_MEASUREMENT_ID');
  };

  const disableAnalytics = () => {
    // Mock analytics disable
    console.log("Analytics disabled");
    // In a real implementation, you would disable tracking scripts
  };

  const handleAccept = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      preferences: true,
    };

    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookieConsentTimestamp", Date.now().toString());
    localStorage.setItem("cookiePreferences", JSON.stringify(allAccepted));

    applyCookiePreferences(allAccepted);
    setShowBanner(false);
  };

  const handleReject = () => {
    const onlyEssential: CookiePreferences = {
      essential: true, // Essential cookies cannot be rejected
      analytics: false,
      preferences: false,
    };

    localStorage.setItem("cookieConsent", "rejected");
    localStorage.setItem("cookieConsentTimestamp", Date.now().toString());
    localStorage.setItem("cookiePreferences", JSON.stringify(onlyEssential));

    applyCookiePreferences(onlyEssential);
    setShowBanner(false);
  };

  const handleCustomize = () => {
    const savedPreferences = localStorage.getItem("cookiePreferences");
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
    setShowCustomize(true);
  };

  const handlePreferenceChange = (cookieType: keyof CookiePreferences) => {
    if (cookieType === "essential") return; // Essential cookies cannot be changed

    setPreferences((prev) => ({
      ...prev,
      [cookieType]: !prev[cookieType],
    }));
  };

  const saveCustomPreferences = () => {
    localStorage.setItem("cookieConsent", "custom");
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    localStorage.setItem("cookieConsentTimestamp", Date.now().toString());

    applyCookiePreferences(preferences);
    setShowBanner(false);
    setShowCustomize(false);
  };

  const getCurrentCookieStatus = () => {
    const essential = getCookie("essential_cookie");
    const analytics = getCookie("google_analytics");
    const userPrefs = getCookie("user_preferences");

    return {
      essential: !!essential,
      analytics: !!analytics,
      preferences: !!userPrefs,
    };
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
                fonctionnement de l'application. Vous pouvez personnaliser vos
                préférences à tout moment.
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
                Accepter tout
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
                    <div className="flex-1">
                      <h4 className="font-semibold text-black">
                        Cookies essentiels
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Nécessaires au fonctionnement de l'application
                        (authentification, sécurité, préférences de langue). Ces
                        cookies ne peuvent pas être désactivés.
                      </p>
                    </div>
                    <div className="flex items-center ml-4">
                      <input
                        id="essential-cookies"
                        type="checkbox"
                        checked={preferences.essential}
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
                    <div className="flex-1">
                      <h4 className="font-semibold text-black">
                        Cookies d'analyse
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Nous aident à comprendre comment vous utilisez
                        l'application pour améliorer nos services. Ces cookies
                        collectent des données anonymisées.
                      </p>
                    </div>
                    <div className="flex items-center ml-4">
                      <input
                        id="analytics-cookies"
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => handlePreferenceChange("analytics")}
                        title="Autoriser les cookies d'analyse"
                        className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                {/* Preference Cookies */}
                <div className="border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-black">
                        Cookies de préférences
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Mémorisent vos paramètres et choix pour personnaliser
                        votre expérience (langue, thème, paramètres
                        d'affichage).
                      </p>
                    </div>
                    <div className="flex items-center ml-4">
                      <input
                        id="preference-cookies"
                        type="checkbox"
                        checked={preferences.preferences}
                        onChange={() => handlePreferenceChange("preferences")}
                        title="Autoriser les cookies de préférences"
                        className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Status */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-black mb-2">
                  Statut actuel des cookies :
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>
                    • Cookies essentiels:{" "}
                    {getCookie("essential_cookie")
                      ? "✅ Activés"
                      : "❌ Désactivés"}
                  </div>
                  <div>
                    • Cookies d'analyse:{" "}
                    {getCookie("google_analytics")
                      ? "✅ Activés"
                      : "❌ Désactivés"}
                  </div>
                  <div>
                    • Cookies de préférences:{" "}
                    {getCookie("user_preferences")
                      ? "✅ Activés"
                      : "❌ Désactivés"}
                  </div>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-8">
                <button
                  onClick={() => setShowCustomize(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleReject}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Tout refuser
                </button>
                <button
                  onClick={saveCustomPreferences}
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

// Export cookie utility functions for use in other components
export const cookieUtils = {
  setCookie: (name: string, value: string, days: number = 365) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "expires=" + date.toUTCString();
    document.cookie =
      name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
  },

  getCookie: (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },

  deleteCookie: (name: string) => {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  },

  checkConsent: (): boolean => {
    return localStorage.getItem("cookieConsent") !== null;
  },

  getPreferences: (): CookiePreferences | null => {
    const prefs = localStorage.getItem("cookiePreferences");
    return prefs ? JSON.parse(prefs) : null;
  },
};
