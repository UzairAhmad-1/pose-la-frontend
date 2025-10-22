// components/SensitiveWarningModal.tsx
import { Heart } from "lucide-react";

interface SensitiveWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccess: () => void;
}

export function SensitiveWarningModal({
  isOpen,
  onClose,
  onAccess,
}: SensitiveWarningModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-pink-600" />
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
            onClick={onAccess}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all font-semibold shadow-md"
          >
            Accéder
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
          >
            Pas maintenant
          </button>
        </div>
      </div>
    </div>
  );
}
