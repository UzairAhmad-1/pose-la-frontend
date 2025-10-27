"use client";

import React from "react";
import Navbar from "../components/layout/Navbar";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">
              Conditions d'utilisation POSE-LÀ
            </h1>
            <p className="text-gray-600">
              Dernière mise à jour : 25 octobre 2025
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-gray-700">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                1. Présentation de GNOUNE
              </h2>
              <p className="leading-relaxed">
                L'application POSE-LÀ est éditée par GNOUNE, entreprise
                spécialisée dans la conception et l'architecture de solutions
                digitales innovantes. GNOUNE conçoit et coordonne des produits
                digitaux centrés sur l'expérience utilisateur et la qualité des
                services proposés.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                2. Objet de l'application
              </h2>
              <p className="leading-relaxed mb-4">
                POSE-LÀ est une application d'accompagnement émotionnel. Elle
                permet aux utilisateurs d'explorer et de mieux comprendre leurs
                émotions grâce à une intelligence artificielle
                conversationnelle.
              </p>
              <div className="p-4 bg-gray-50">
                <p className="text-gray-700 font-medium">
                  Limite d'usage : POSE-LÀ n'est pas un service médical,
                  psychologique ou thérapeutique. Elle ne remplace en aucun cas
                  l'avis ou le suivi d'un professionnel de santé.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                3. Accès et inscription
              </h2>
              <p className="leading-relaxed">
                L'application est accessible à toute personne majeure (18 ans
                révolus). La création d'un compte est nécessaire pour accéder
                aux fonctionnalités principales. Une période gratuite
                d'utilisation est proposée, après laquelle l'utilisateur peut
                choisir de souscrire à un abonnement payant pour continuer à
                bénéficier du service. Les informations transmises lors de
                l'inscription doivent être exactes et à jour.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                4. Produits et services
              </h2>
              <p className="leading-relaxed">
                POSE-LÀ propose des parcours émotionnels personnalisés, des
                cartes thématiques, des modules interactifs et d'autres outils
                d'accompagnement. L'intégralité de ces contenus est accessible
                durant la période d'essai gratuite. Les abonnements sont
                strictement personnels et non transférables.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                5. Utilisation autorisée
              </h2>
              <p className="leading-relaxed mb-4">
                L'utilisateur s'engage à utiliser l'application dans un cadre
                légal et respectueux.
              </p>
              <div className="p-4 mb-4 bg-gray-50">
                <p className="text-gray-700 font-medium mb-2">
                  Il est strictement interdit de :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>
                    Détourner l'application pour créer ou diffuser du contenu
                    illégal, haineux, diffamatoire, discriminatoire
                  </li>
                  <li>
                    Utiliser l'application à caractère médical ou thérapeutique
                  </li>
                  <li>
                    Utiliser l'application à des fins commerciales ou
                    sexuellement explicites
                  </li>
                  <li>
                    Utiliser l'application à des fins de harcèlement, fraude,
                    manipulation ou escroquerie
                  </li>
                  <li>
                    Tenter d'altérer le fonctionnement technique de
                    l'application
                  </li>
                  <li>Copier ou redistribuer son contenu sans autorisation</li>
                </ul>
              </div>
              <p className="leading-relaxed">
                Tout manquement pourra entraîner la suspension immédiate du
                compte, la perte d'accès à l'application sans remboursement, et
                le cas échéant, des poursuites judiciaires conformément aux lois
                en vigueur.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                6. Responsabilités et limites
              </h2>
              <p className="leading-relaxed">
                GNOUNE met en œuvre tous les moyens raisonnables pour maintenir
                la qualité et la disponibilité du service, sans toutefois
                garantir l'absence totale d'erreurs, une disponibilité continue
                et ininterrompue, ou l'adéquation parfaite aux besoins ou
                attentes spécifiques de chaque utilisateur. L'utilisation de
                l'application se fait sous la seule responsabilité de
                l'utilisateur.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                7. Limitations spécifiques à l'IA
              </h2>
              <p className="leading-relaxed">
                Les contenus générés par l'IA intégrée à l'application POSE-LÀ
                n'ont pas vocation à se substituer à un avis médical,
                psychologique, juridique ou professionnel. Ils peuvent être
                inexacts, incomplets ou inadaptés à certaines situations
                personnelles et doivent être compris comme un accompagnement
                personnel, et non comme une vérité absolue. GNOUNE ne saurait
                être tenue responsable des conséquences liées à une mauvaise
                interprétation ou utilisation des contenus générés par
                l'application.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                8. Tarifs et modalités de paiement
              </h2>
              <p className="leading-relaxed mb-4">
                Les abonnements sont payables par avance via :
              </p>
              <ul className="list-disc list-inside mb-4 ml-4">
                <li>Stripe (carte bancaire, Apple Pay, Google Pay)</li>
                <li>PayPal</li>
              </ul>
              <p className="leading-relaxed mb-4">
                Le paiement est automatiquement renouvelé selon la périodicité
                choisie (mensuelle ou annuelle), sauf résiliation. En cas
                d'échec de paiement, l'accès aux fonctionnalités premium sera
                suspendu après un délai de grâce de 3 jours.
              </p>
              <p className="leading-relaxed mb-4">
                Pour les abonnements annuels réglés via PayPal, l'option
                "Paiement en 4 fois" peut être proposée automatiquement par
                PayPal aux utilisateurs éligibles. Cette facilité de paiement
                est entièrement gérée par PayPal, sans intervention de GNOUNE.
              </p>
              <p className="leading-relaxed">
                Tous les prix sont indiqués hors taxes (HT). Les éventuelles
                taxes applicables (dont la TVA) sont ajoutées lors du paiement
                selon la législation en vigueur.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                9. Résiliation et remboursement
              </h2>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-black mb-3">
                  9.1 Résiliation par l'utilisateur
                </h3>
                <p className="leading-relaxed">
                  L'utilisateur peut résilier son abonnement à tout moment via
                  les paramètres de son compte. La résiliation prend effet à la
                  fin de la période de facturation en cours. Aucun remboursement
                  n'est accordé pour une période déjà entamée, sauf dispositions
                  impératives contraires applicables dans le pays de résidence
                  de l'utilisateur.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-black mb-3">
                  9.2 Droit de rétractation (Union Européenne)
                </h3>
                <p className="leading-relaxed mb-4">
                  Conformément à la législation européenne, les utilisateurs
                  résidant dans l'Union européenne disposent d'un délai légal de
                  14 jours à compter de la souscription pour exercer leur droit
                  de rétractation. En l'absence de toute utilisation des
                  services premium, l'utilisateur bénéficie d'un remboursement
                  intégral dans un délai maximum de 14 jours suivant la
                  validation de la demande.
                </p>
                <div className="p-4 bg-gray-50">
                  <p className="text-gray-700">
                    En cas d'accès immédiat aux services premium après
                    souscription, l'utilisateur reconnaît et accepte de perdre
                    son droit de rétractation, conformément à l'article L.221-28
                    du Code de la Consommation. Dans ce cas, aucun remboursement
                    ne sera effectué.
                  </p>
                </div>
                <p className="leading-relaxed mt-4">
                  Toutes les demandes de remboursement doivent être traitées via
                  le prestataire de paiement utilisé (Stripe ou PayPal).
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                10. Offres et codes cadeaux
              </h2>
              <p className="leading-relaxed mb-4">
                Certains abonnements incluent la possibilité d'offrir un code
                cadeau à un proche (par exemple un mois d'accès gratuit). Ces
                codes sont personnels, uniques, valables pour une durée limitée
                (généralement six mois à compter de leur émission).
              </p>
              <p className="leading-relaxed mb-4">
                Ils ne peuvent être ni revendus, ni échangés contre de l'argent.
                Le bénéficiaire doit créer un compte POSE-LÀ pour activer le
                code et accéder aux services pendant la durée indiquée.
              </p>
              <p className="leading-relaxed">
                Les offres cadeaux achetées sont soumises aux mêmes conditions
                de paiement et de remboursement que les abonnements standards.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                11. Disponibilité du service
              </h2>
              <p className="leading-relaxed mb-4">
                GNOUNE s'efforce d'assurer une disponibilité du service 24h/24
                et 7j/7, mais ne peut garantir une accessibilité permanente. Des
                interruptions programmées pour maintenance seront communiquées
                dans la mesure du possible. En cas d'interruption prolongée
                (plus de 48h), GNOUNE s'efforcera d'en informer les
                utilisateurs.
              </p>
              <p className="leading-relaxed mb-4">
                GNOUNE ne saurait être tenue responsable des interruptions dues
                à des causes extérieures (panne réseau, force majeure, etc.).
              </p>
              <p className="leading-relaxed">
                GNOUNE se réserve le droit de faire évoluer les fonctionnalités
                de POSE-LÀ. En cas d'arrêt définitif du service, les
                utilisateurs pourront, sur demande, récupérer leurs données
                personnelles dans un délai de 3 mois.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                12. Données personnelles
              </h2>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-black mb-3">
                  12.1 Données personnelles
                </h3>
                <p className="leading-relaxed">
                  Les données collectées sont traitées conformément à la
                  Politique de confidentialité accessible dans l'application.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-black mb-3">
                  12.2 Devenir des données en cas de suppression
                </h3>
                <p className="leading-relaxed mb-4">
                  Lors de la suppression d'un compte, les données personnelles
                  sont supprimées dans un délai maximum de 30 jours.
                  L'historique des conversations avec l'IA est définitivement
                  effacé. Certaines données anonymisées peuvent être conservées
                  à des fins statistiques et d'amélioration du service.
                </p>
                <p className="leading-relaxed">
                  Les données de facturation peuvent être conservées
                  conformément aux obligations légales. L'utilisateur peut
                  demander une copie de ses données avant suppression via le
                  service support.
                </p>
              </div>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                13. Propriété intellectuelle
              </h2>
              <p className="leading-relaxed">
                L'ensemble des contenus et éléments accessibles au sein de
                l'application POSE-LÀ, notamment, de manière non limitative, les
                textes, fonctionnalités, structures, interfaces, illustrations,
                concepts, marques, noms commerciaux, logos, design, ainsi que
                tout autre élément original, est protégé par les lois en vigueur
                relatives à la propriété intellectuelle. Toute reproduction,
                représentation, adaptation, diffusion ou modification, totale ou
                partielle, sans autorisation écrite préalable de GNOUNE, est
                strictement interdite et pourra donner lieu à des poursuites.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                14. Suspension, résiliation et suppression de compte
              </h2>
              <p className="leading-relaxed mb-4">
                En cas de non-respect des présentes Conditions, GNOUNE pourra
                suspendre ou supprimer le compte de l'utilisateur sans préavis
                et sans remboursement des sommes engagées.
              </p>
              <p className="leading-relaxed">
                La suppression d'un compte entraîne la perte immédiate et
                définitive de l'accès aux services et contenus associés.
                L'utilisateur peut à tout moment supprimer son compte via les
                paramètres de l'application ; cette suppression est définitive
                et entraîne la fin de l'accès aux services.
              </p>
            </section>

            {/* Section 15 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                15. Modifications des Conditions
              </h2>
              <p className="leading-relaxed">
                GNOUNE peut modifier les présentes Conditions pour s'adapter aux
                évolutions légales, techniques ou fonctionnelles. Les
                utilisateurs seront informés en cas de changements
                significatifs.
              </p>
            </section>

            {/* Section 16 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                16. Droit applicable et règlement des litiges
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">
                    16.1 Droit applicable
                  </h3>
                  <p className="leading-relaxed">
                    Les présentes Conditions sont régies par le droit français.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">
                    16.2 Compétence judiciaire
                  </h3>
                  <p className="leading-relaxed">
                    En cas de litige, les tribunaux français seront compétents,
                    sous réserve des dispositions légales impératives contraires
                    (notamment celles du pays de résidence de l'utilisateur ou
                    du droit européen en matière de consommation).
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">
                    16.3 Conformité locale
                  </h3>
                  <p className="leading-relaxed">
                    Les utilisateurs résidant hors de France doivent s'assurer
                    que l'utilisation de POSE-LÀ respecte les lois applicables
                    dans leur pays de résidence. En cas de conflit entre ces
                    Conditions et une loi locale impérative, la disposition la
                    plus protectrice pour l'utilisateur s'applique.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-black mb-2">
                    16.4 Résolution amiable des différends
                  </h3>
                  <p className="leading-relaxed">
                    Avant toute action judiciaire, les parties s'efforceront de
                    résoudre à l'amiable tout différend lié aux présentes
                    Conditions.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 17 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                17. Contact et support
              </h2>
              <div className="p-4 mb-4 bg-gray-50">
                <ul className="space-y-2">
                  <li>
                    <strong>Email support :</strong>{" "}
                    <a
                      href="mailto:support@pose-la.com"
                      className="text-black hover:underline"
                    >
                      support@pose-la.com
                    </a>
                  </li>
                  <li>
                    <strong>Email contact général :</strong>{" "}
                    <a
                      href="mailto:contact@pose-la.com"
                      className="text-black hover:underline"
                    >
                      contact@pose-la.com
                    </a>
                  </li>
                  <li>
                    <strong>Délai de réponse :</strong> en 2 jours ouvrés
                  </li>
                </ul>
              </div>
              <div className="p-4 mb-4 bg-gray-50">
                <p className="text-gray-700 font-medium">
                  Important : Le support ne traite pas les urgences médicales ni
                  psychologiques.
                </p>
              </div>
              <p className="leading-relaxed">
                Siège social : GNOUNE, 22 rue de la Rigourdière 35510
                Cesson-Sévigné (France)
              </p>
            </section>

            {/* Section 18 */}
            <section>
              <h2 className="text-xl font-semibold text-black mb-4">
                18. Cookies et données de navigation
              </h2>
              <p className="leading-relaxed">
                L'application peut utiliser des cookies et technologies
                similaires pour améliorer l'expérience utilisateur et analyser
                l'usage du service. L'utilisateur peut gérer ses préférences
                dans les paramètres de l'application. Pour plus d'informations,
                consultez la Politique de confidentialité.
              </p>
            </section>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 text-center text-gray-600">
            <p>
              En utilisant POSE-LÀ, vous acceptez les présentes conditions
              d'utilisation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
