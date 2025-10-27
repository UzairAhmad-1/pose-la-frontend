"use client";

import React from "react";
import Navbar from "../components/layout/Navbar";
import Link from "next/link";

const LegalNotice: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">
              MENTIONS LÉGALES
            </h1>
            <p className="text-gray-600">Mise à jour le 22 octobre 2025</p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-gray-700">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                1. Éditeur de l'application
              </h2>
              <div className="p-4 rounded bg-gray-50">
                <p className="leading-relaxed mb-2">
                  L'application POSE-LÀ est éditée par :{" "}
                  <strong>Madame Khady DIOUF</strong>, entrepreneure
                  individuelle, exerçant sous le nom commercial{" "}
                  <strong>GNOUNE</strong>.
                </p>
                <p className="leading-relaxed mb-2">
                  Immatriculée au RCS de Rennes sous le numéro{" "}
                  <strong>944 032 564</strong>
                </p>
                <p className="leading-relaxed mb-2">
                  Activité principale : vente en ligne et exploitation
                  d'applications numériques utilisant l'intelligence
                  artificielle
                </p>
                <p className="leading-relaxed mb-2">
                  <strong>Siège social :</strong> 3 rue du Lin, 35510
                  Cesson-Sévigné, France
                </p>
                <div className="mt-3 space-y-1">
                  <p>
                    <strong>Adresse e-mail de contact :</strong>{" "}
                    <a
                      href="mailto:contact@pose-la.com"
                      className="text-black hover:text-gray-700 underline"
                    >
                      contact@pose-la.com
                    </a>
                  </p>
                  <p>
                    <strong>Support utilisateur :</strong>{" "}
                    <a
                      href="mailto:support@pose-la.com"
                      className="text-black hover:text-gray-700 underline"
                    >
                      support@pose-la.com
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                2. Hébergement
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded bg-gray-50">
                  <h3 className="font-semibold text-black mb-2">Site web</h3>
                  <p className="leading-relaxed mb-2">
                    Hébergé par <strong>o2switch</strong>
                  </p>
                  <p className="leading-relaxed mb-2">
                    Chemin de Pardiaux, 63000 Clermont-Ferrand, France
                  </p>
                  <a
                    href="https://www.o2switch.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-gray-700 underline"
                  >
                    www.o2switch.fr
                  </a>
                </div>

                <div className="p-4 rounded bg-gray-50">
                  <h3 className="font-semibold text-black mb-2">Application</h3>
                  <p className="leading-relaxed mb-2">
                    Hébergée sur <strong>SCALEWAY</strong> (Iliad Group)
                  </p>
                  <p className="leading-relaxed mb-2">
                    8 rue de la Ville-l'Évêque, 75008 Paris, France
                  </p>
                  <a
                    href="https://www.scaleway.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-gray-700 underline"
                  >
                    www.scaleway.com
                  </a>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                3. Propriété intellectuelle
              </h2>
              <p className="leading-relaxed">
                L'ensemble des contenus présents sur l'application et le site
                POSE-LÀ (textes, visuels, logo, interface, architecture,
                modules, etc.) est protégé par le Code de la propriété
                intellectuelle. Toute reproduction, diffusion ou utilisation
                sans autorisation préalable écrite de GNOUNE est interdite.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                4. Responsabilité
              </h2>
              <div className="p-4 rounded bg-gray-50">
                <p className="leading-relaxed mb-4">
                  L'application POSE-LÀ propose un accompagnement émotionnel et
                  réflexif, mais ne remplace en aucun cas un suivi psychologique
                  ou médical.
                </p>
                <p className="font-semibold">
                  En cas de détresse ou de crise, l'utilisateur est invité à
                  contacter les services d'urgence ou un professionnel de santé.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                5. Données personnelles
              </h2>
              <p className="leading-relaxed">
                Les informations concernant la collecte et le traitement des
                données personnelles sont détaillées dans la{" "}
                <Link
                  href="/privacy-policy"
                  className="text-black hover:text-gray-700 underline"
                >
                  Politique de confidentialité
                </Link>{" "}
                disponible dans l'application.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                6. Contact et support
              </h2>
              <div className="p-4 rounded bg-gray-50 space-y-3">
                <div>
                  <p className="font-semibold text-black mb-1">
                    Contact général / presse / partenariat :
                  </p>
                  <a
                    href="mailto:contact@pose-la.com"
                    className="text-black hover:text-gray-700 underline"
                  >
                    contact@pose-la.com
                  </a>
                </div>

                <div>
                  <p className="font-semibold text-black mb-1">
                    Assistance utilisateur (connexion, abonnement, bug) :
                  </p>
                  <a
                    href="mailto:support@pose-la.com"
                    className="text-black hover:text-gray-700 underline"
                  >
                    support@pose-la.com
                  </a>
                </div>

                <div>
                  <p className="font-semibold text-black mb-1">
                    Demandes liées aux paiements ou remboursements :
                  </p>
                  <a
                    href="mailto:commande@gnoune.com"
                    className="text-black hover:text-gray-700 underline"
                  >
                    commande@gnoune.com
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 text-center text-gray-600">
            <p>
              Pour toute question concernant ces mentions légales, veuillez nous
              contacter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;
