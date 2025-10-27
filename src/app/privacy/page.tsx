"use client";

import React from "react";
import Navbar from "../components/layout/Navbar";
import Link from "next/link";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-8 pb-6">
            <h1 className="text-3xl font-bold text-black mb-2">
              Politique de Confidentialité POSE-LÀ
            </h1>
            <p className="text-gray-600 text-lg">Version : 25/10/2025</p>
            <p className="text-gray-700 mt-2">
              Éditeur : "GNOUNE (la Société)"
            </p>
          </div>

          {/* Introduction */}
          <div className="p-4 rounded-lg mb-8 bg-gray-50">
            <p className="text-gray-800 leading-relaxed">
              La protection de votre vie privée constitue une priorité
              fondamentale pour notre organisation. La présente politique
              détaille les modalités de collecte, de traitement et de protection
              des données à caractère personnel, ainsi que l'étendue de vos
              droits en la matière.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-gray-700">
            {/* Section 1 */}
            <section className="rounded-lg p-6 bg-gray-50">
              <h2 className="text-xl font-semibold text-black mb-4">
                1. Responsable de traitement
              </h2>
              <div className="space-y-3">
                <p className="leading-relaxed">
                  <strong>GNOUNE</strong>, micro-entreprise immatriculée sous le
                  numéro SIREN 944 032 564 00014, dont le siège social est
                  établi au 22 rue de la Rigourdière, 35510 Cesson-Sévigné,
                  France, assume la qualité de responsable de traitement pour
                  l'ensemble des opérations de traitement de données
                  personnelles effectuées par l'intermédiaire de l'application
                  POSE-LÀ.
                </p>
                <div className="p-4 rounded bg-white">
                  <p className="font-semibold text-black mb-1">
                    Pour toute demande relative à la protection des données
                    personnelles :
                  </p>
                  <a
                    href="mailto:support@gnoune.com"
                    className="text-black hover:text-gray-700 underline"
                  >
                    support@gnoune.com
                  </a>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="rounded-lg p-6 bg-gray-50">
              <h2 className="text-xl font-semibold text-black mb-4">
                2. Nature des données collectées
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-black mb-2">
                    Données de compte :
                  </h3>
                  <p className="text-gray-600">
                    nom, prénom, adresse électronique, mot de passe (soumis à
                    hachage cryptographique), langue de préférence, pays de
                    résidence.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-black mb-2">
                    Données d'abonnement et de paiement :
                  </h3>
                  <p className="text-gray-600">
                    identifiants de transaction, statuts des paiements
                    effectués.
                  </p>
                  <div className="p-3 mt-2 rounded bg-white">
                    <p className="text-gray-700 text-sm">
                      <strong>Important :</strong> Les données bancaires sont
                      exclusivement traitées par nos prestataires de services de
                      paiement certifiés. La Société n'accède jamais directement
                      à ces informations sensibles.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-black mb-2">
                    Données d'utilisation de l'application :
                  </h3>
                  <p className="text-gray-600">
                    cartes consultées, modules utilisés, horodatage des
                    sessions, préférences utilisateur, journaux techniques
                    d'activité.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-black mb-2">
                    Données techniques :
                  </h3>
                  <p className="text-gray-600">
                    caractéristiques de l'appareil utilisé (smartphone,
                    tablette, ordinateur), système d'exploitation, version de
                    l'application, adresse IP (soumise à pseudonymisation à des
                    fins de sécurité), identifiants techniques (cookies ou
                    technologies équivalentes).
                  </p>
                </div>

                <div className="p-4 rounded bg-white">
                  <h3 className="font-semibold text-black mb-2">
                    Conversations avec l'assistant SOYA :
                  </h3>
                  <p className="text-gray-700">
                    L'application POSE-LÀ s'interdit de conserver le contenu des
                    échanges conversationnels. L'ensemble des communications
                    bénéficie d'un chiffrement de bout en bout garantissant leur
                    confidentialité absolue.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-black mb-2">
                    Données de support client :
                  </h3>
                  <p className="text-gray-600">
                    demandes d'assistance technique, correspondances
                    électroniques échangées.
                  </p>
                </div>

                <div className="p-4 rounded bg-white">
                  <h3 className="font-semibold text-black mb-2">
                    Prévention de fraude (essai gratuit) :
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Afin d'éviter la création répétée de comptes destinés à
                    contourner la période d'essai gratuite, l'application peut
                    enregistrer temporairement des marqueurs techniques
                    minimisés (par exemple : empreinte d'appareil, adresse
                    e-mail hachée ou adresse IP partiellement masquée).
                  </p>
                  <p className="text-gray-700 text-sm mt-2">
                    Ces informations servent uniquement à la détection d'abus et
                    ne permettent pas d'identifier directement l'utilisateur.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="rounded-lg p-6 bg-gray-50">
              <h2 className="text-xl font-semibold text-black mb-4">
                3. Pourquoi collectons-nous ces données ? (Finalités et bases
                légales)
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded bg-white">
                    <h4 className="font-semibold text-black mb-2">
                      Fourniture du service
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      création et gestion de compte, authentification, accès aux
                      modules, historique d'utilisation
                    </p>
                    <span className="inline-block bg-gray-200 text-black text-xs px-2 py-1 rounded">
                      Base légale : Exécution du contrat
                    </span>
                  </div>

                  <div className="p-4 rounded bg-white">
                    <h4 className="font-semibold text-black mb-2">
                      Facturation et gestion des abonnements
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      gestion des paiements et obligations comptables
                    </p>
                    <span className="inline-block bg-gray-200 text-black text-xs px-2 py-1 rounded">
                      Base légale : Exécution du contrat / Obligation légale
                    </span>
                  </div>

                  <div className="p-4 rounded bg-white">
                    <h4 className="font-semibold text-black mb-2">
                      Sécurisation de la plateforme
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      prévention de la fraude, protection contre les accès non
                      autorisés
                    </p>
                    <span className="inline-block bg-gray-200 text-black text-xs px-2 py-1 rounded">
                      Base légale : Intérêt légitime / Obligation légale
                    </span>
                  </div>

                  <div className="p-4 rounded bg-white">
                    <h4 className="font-semibold text-black mb-2">
                      Amélioration continue
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      analyses statistiques, correction des dysfonctionnements
                    </p>
                    <span className="inline-block bg-gray-200 text-black text-xs px-2 py-1 rounded">
                      Base légale : Intérêt légitime
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded bg-white">
                  <h4 className="font-semibold text-black mb-2">
                    Intelligence artificielle (SOYA)
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Les conversations ne sont jamais utilisées pour
                    l'entraînement de nos modèles sans votre consentement
                    explicite préalable. Des extraits anonymisés peuvent faire
                    l'objet d'analyses à des fins de sécurité (détection d'abus
                    et de contenus inappropriés).
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section className="rounded-lg p-6 bg-gray-50">
              <h2 className="text-xl font-semibold text-black mb-4">
                4. Cookies et technologies similaires
              </h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  Nous déployons des cookies et identifiants techniques aux fins
                  suivantes : gestion des sessions de connexion, renforcement de
                  la sécurité et mesure d'audience.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded bg-white">
                    <h4 className="font-semibold text-black mb-2">
                      Essentiels
                    </h4>
                    <p className="text-gray-700 text-sm">
                      nécessaires au fonctionnement - déposés sans consentement
                    </p>
                  </div>

                  <div className="p-4 rounded bg-white">
                    <h4 className="font-semibold text-black mb-2">
                      Mesure d'audience / Marketing
                    </h4>
                    <p className="text-gray-700 text-sm">
                      soumis à votre consentement via le bandeau de gestion des
                      préférences
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded bg-white">
                  <p className="text-gray-700">
                    <strong>
                      Vos choix sont modifiables à tout moment dans :
                    </strong>{" "}
                    <span className="text-black">
                      « Paramètres › Confidentialité › Cookies »
                    </span>
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section className="rounded-lg p-6 bg-gray-50">
              <h2 className="text-xl font-semibold text-black mb-4">
                5. Destinataires des données personnelles
              </h2>
              <div className="space-y-4">
                <div className="p-4 rounded bg-white">
                  <p className="text-gray-700 font-semibold">
                    La Société s'engage formellement à ne jamais procéder à la
                    vente de vos données personnelles.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-black mb-3">
                    Les données peuvent être communiquées exclusivement aux
                    destinataires suivants :
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                    <li>
                      <strong>Sous-traitants techniques</strong> (services
                      d'hébergement, processeurs de paiement, outils d'analyse)
                      liés par des contrats conformes au RGPD
                    </li>
                    <li>
                      <strong>Autorités judiciaires et administratives</strong>,
                      uniquement en cas d'obligation légale
                    </li>
                    <li>
                      <strong>
                        Conseils juridiques et compagnies d'assurance
                      </strong>{" "}
                      dans le cadre de la gestion de contentieux
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="rounded-lg p-6 bg-gray-50">
              <h2 className="text-xl font-semibold text-black mb-4">
                6. Localisation des traitements (Transferts hors UE)
              </h2>
              <div className="space-y-4">
                <p className="leading-relaxed">
                  Les données personnelles sont prioritairement hébergées au
                  sein de l'Union européenne. Dans l'hypothèse exceptionnelle
                  d'un transfert vers un pays situé hors de l'Espace Économique
                  Européen (EEE), nous mettons en œuvre les garanties
                  appropriées :
                </p>

                <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
                  <li>
                    Décisions d'adéquation adoptées par la Commission européenne
                  </li>
                  <li>
                    Clauses Contractuelles Types (CCT) approuvées par les
                    autorités européennes
                  </li>
                  <li>
                    Mesures techniques et organisationnelles renforcées
                    (chiffrement, pseudonymisation)
                  </li>
                </ul>

                <div className="p-4 rounded bg-white">
                  <p className="text-gray-700">
                    Pour toute question relative à la protection de vos données
                    personnelles :{" "}
                    <a
                      href="mailto:support@gnoune.com"
                      className="text-black hover:text-gray-700 underline font-semibold"
                    >
                      support@gnoune.com
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section className="rounded-lg p-6 bg-gray-50">
              <h2 className="text-xl font-semibold text-black mb-4">
                7. Durées de conservation des données
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded bg-white">
                    <h4 className="font-semibold text-black mb-2">
                      Données de compte utilisateur
                    </h4>
                    <p className="text-sm text-gray-600">
                      Effacement sous 30 jours suivant la suppression du compte
                    </p>
                  </div>

                  <div className="p-4 rounded bg-white">
                    <h4 className="font-semibold text-black mb-2">
                      Documents de facturation
                    </h4>
                    <p className="text-sm text-gray-600">
                      Conservation légale de 10 années
                    </p>
                  </div>

                  <div className="p-4 rounded bg-white">
                    <h4 className="font-semibold text-black mb-2">
                      Journaux techniques
                    </h4>
                    <p className="text-sm text-gray-600">
                      Conservation maximale de 12 mois
                    </p>
                  </div>

                  <div className="p-4 rounded bg-white">
                    <h4 className="font-semibold text-black mb-2">
                      Conversations
                    </h4>
                    <p className="text-sm text-gray-600">Aucune conservation</p>
                  </div>
                </div>

                <div className="p-4 rounded bg-white">
                  <h4 className="font-semibold text-black mb-2">
                    Prévention de la fraude (essai gratuit)
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Conservation des marqueurs techniques minimisés pour une
                    durée maximale de 6 mois, uniquement à des fins de sécurité
                    et prévention de fraude.
                  </p>
                  <p className="text-gray-700 text-sm mt-2">
                    <strong>Base légale :</strong> Intérêt légitime
                    (sécurisation du service)
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 - Rights */}
            <section className="rounded-lg p-6 bg-gray-50">
              <h2 className="text-xl font-semibold text-black mb-4">
                8. Vos droits fondamentaux (RGPD)
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded bg-white">
                    <h4 className="font-semibold text-black mb-2">
                      Droit d'accès
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Obtenir la confirmation du traitement de vos données et en
                      recevoir une copie
                    </p>
                  </div>

                  <div className="p-4 rounded bg-white">
                    <h4 className="font-semibold text-black mb-2">
                      Droit de portabilité
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Récupérer vos données dans un format structuré et
                      interopérable
                    </p>
                  </div>

                  <div className="p-4 rounded bg-white">
                    <h4 className="font-semibold text-black mb-2">
                      Droit de rectification
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Corriger les données inexactes ou incomplètes
                    </p>
                  </div>

                  <div className="p-4 rounded bg-white">
                    <h4 className="font-semibold text-black mb-2">
                      Droit à l'effacement
                    </h4>
                    <p className="text-gray-700 text-sm">
                      Obtenir la suppression de vos données (« droit à l'oubli
                      »)
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded bg-white">
                  <p className="text-gray-700 mb-2">
                    <strong>Exercice de vos droits :</strong>{" "}
                    <a
                      href="mailto:support@gnoune.com"
                      className="text-black hover:text-gray-700 underline"
                    >
                      support@gnoune.com
                    </a>{" "}
                    (une vérification d'identité peut être demandée)
                  </p>
                  <p className="text-gray-700 text-sm">
                    En cas de litige, vous pouvez saisir l'autorité de contrôle
                    de votre pays. En France : CNIL
                  </p>
                </div>
              </div>
            </section>

            {/* Section 16 - AI Specific */}
            <section className="rounded-lg p-6 bg-gray-50">
              <h2 className="text-xl font-semibold text-black mb-4">
                16. Avertissements spécifiques relatifs à l'intelligence
                artificielle (SOYA)
              </h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  <p className="text-gray-700">
                    Les contenus générés par l'IA sont un accompagnement, pas un
                    avis médical, psychologique ou juridique.
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  <p className="text-gray-700">
                    Ils peuvent être incomplets ou inexacts. Ne prenez pas de
                    décision critique sans consulter un professionnel.
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-black mr-2">•</span>
                  <p className="text-gray-700">
                    Vous pouvez signaler un contenu problématique en contactant
                    directement le{" "}
                    <a
                      href="mailto:support@gnoune.com"
                      className="text-black hover:text-gray-700 underline font-semibold"
                    >
                      support Gnoune
                    </a>
                    .
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Contact Footer */}
          <div className="mt-8 pt-6">
            <div className="p-4 rounded text-center bg-gray-50">
              <h3 className="font-semibold text-black mb-2">
                Coordonnées de contact
              </h3>
              <p className="text-gray-600">GNOUNE, POSE-LÀ</p>
              <p className="text-gray-600">
                22 rue de la Rigourdière, 35510 Cesson-Sévigné, France
              </p>
              <a
                href="mailto:support@gnoune.com"
                className="text-black hover:text-gray-700 underline font-semibold"
              >
                support@gnoune.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
