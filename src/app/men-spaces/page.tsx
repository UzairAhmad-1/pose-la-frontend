"use client";

import { useState } from "react";
import { Heart, Lock, Search, Filter } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import Image from "next/image";

// All 21 cards data with images
const allCards = [
  {
    id: 1,
    title: "J'ai appris à séduire, pas à aimer",
    subtitle: "Construction relationnelle & Authenticité",
    pitch:
      "Ils m'ont montré comment plaire mais pas comment construire un vrai lien. Ils t'enseignent les codes pour séduire, pour impressionner, pour conquérir. Mais pour vraiment aimer — personne ne te montre comment. Alors tu sais attirer, mais tu te perds quand il s'agit de rester. Tu découvres que séduire est facile, aimer demande un autre langage",
    group: "Face à moi-même",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1706498943643-857af4af33d9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 2,
    title: "Je scanne tout pour éviter les conflits",
    subtitle: "Hypervigilance & Évitement",
    pitch:
      "Je surveille chaque geste et chaque mot pour éviter de déclencher une tempête. Tes yeux scrutent, tes oreilles captent le moindre signe. Tu anticipes chaque réaction comme si tu devais toujours prévenir l'orage. Scanner tout autour de toi est ta manière de survivre. Mais vivre en alerte constante finit par t'épuiser de l'intérieur",
    group: "Face à moi-même",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1644390756677-3a0b2604d621?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 3,
    title: "J'ai grandi sans tendresse, l'intimité me met mal à l'aise",
    subtitle: "Manque affectif & Apprentissage relationnel",
    pitch:
      "Le manque d'affection me rend maladroit face à la proximité. Tu n'as pas grandi dans les bras ou les gestes tendres. Alors aujourd'hui, l'intimité te déstabilise. Tu veux donner, tu veux recevoir, mais ton corps hésite, tes gestes se figent. Comme si la tendresse parlait une langue étrangère que tu dois encore apprendre",
    group: "Face à moi-même",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1646670478892-25df80ab7228?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 4,
    title: "Je suis épuisé, mais je n'ai pas le droit de craquer",
    subtitle: "Charge mentale & Attentes sociales",
    pitch:
      "Je porte tout sur mes épaules et me retiens de montrer ma fatigue. Tu continues d'avancer comme si tu n'avais pas le choix. Tu portes des responsabilités pour toi et pour les autres, sans jamais montrer ta fatigue. Mais ce rôle de force constante t'épuise, et ton corps finit par trahir ce que tu caches. Craquer ne signifie pas être faible — c'est être vivant",
    group: "Face à moi-même",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1746010387928-dcfb525bd56e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1331",
  },
  {
    id: 5,
    title: "Je connais la théorie mais je rate dans la vraie vie",
    subtitle: "Écart théorie-pratique & Apprentissage",
    pitch:
      "Je sais en parler mais je n'arrive pas à l'appliquer quand ça compte vraiment. Tu apprends les règles, tu sais ce qu'il faudrait faire, et tout semble clair en théorie. Mais quand la situation arrive, tes réflexes prennent le dessus et tout se brouille. Entre ce que tu sais et ce que tu vis, l'écart fait mal. Et peut-être que la vraie force n'est pas de tout savoir, mais d'apprendre pas à pas à incarner ce que tu comprends",
    group: "Face à moi-même",
    locked: true,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1726812026300-16435d2afc46?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1243",
  },
  {
    id: 6,
    title: "J'ai déjà eu l'impression d'être un monstre",
    subtitle: "Culpabilité & Reconstruction identitaire",
    pitch:
      "Je ne me reconnais plus dans certaines de mes actions ou pensées. Tu as blessé des gens — parfois sans le vouloir, parfois en pleine conscience. Et ça reste là, comme un film que tu repasses dans ta tête. Les mots, les gestes, les silences que tu ne peux plus effacer. Il y a des jours où tu te demandes si tu mérites encore d'être aimé. Et dans ces moments, tu te vois comme un monstre. Mais même dans ce reflet, une partie de toi cherche encore à comprendre et à changer",
    group: "Face à moi-même",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1683880731734-6a52e5f27ca7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 7,
    title: "Je porte des fardeaux que personne ne voit",
    subtitle: "Poids invisible & Masque social",
    pitch:
      "Je cache un poids intérieur derrière un visage qui semble parfaitement normal. Tu souris, tu avances, et personne n'imagine ce que tu portes en toi. Tes responsabilités, ta peine, tes secrets — ils sont invisibles, pourtant ils t'écrasent en silence. Ce poids invisible t'épuise, comme si tu vivais deux vies à la fois. Et si, derrière ce masque, tu t'autorisais à déposer une partie de ce fardeau",
    group: "Face à moi-même",
    locked: false,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1682430659002-65262fdcd3f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1213",
  },
  {
    id: 8,
    title:
      "J'ai toujours voulu être à la hauteur, mais je me suis perdu en chemin",
    subtitle: "Quête de validation & Identité",
    pitch:
      "En essayant de prouver ma valeur, j'ai fini par oublier qui je suis. Tu cours après l'idéal, toujours à essayer de prouver que tu es assez bien. Chaque effort, chaque victoire, chaque masque que tu portes pour paraître irréprochable. Mais en essayant tellement d'être parfait, tu disparais. Et peut-être que retrouver ta valeur commence par te retrouver toi-même",
    group: "Face à moi-même",
    locked: true,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1706498943643-857af4af33d9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 9,
    title: "On m'a appris à dominer, pas à aimer",
    subtitle: "Éducation masculine & Émotions",
    pitch:
      "On m'a montré la force et le contrôle, mais jamais la tendresse. On t'a répété sans cesse qu'un homme doit être fort, cacher ses émotions, ne jamais montrer de faiblesse. Alors tu as appris à endurer, à contrôler, à garder la façade. Mais derrière cette armure, personne ne t'a jamais appris à vraiment aimer. Maintenant tu découvres que la tendresse est un langage que tu dois encore apprendre",
    group: "Face à moi-même",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1644390756677-3a0b2604d621?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 10,
    title: "L'engagement me fait peur",
    subtitle: "Peur de l'abandon & Autonomie",
    pitch:
      "J'ai peur de me perdre si je m'attache trop profondément. Tu veux aimer — tu en as même besoin. Mais au moment où ça se creuse, la panique monte. Ton cœur veut rester, mais ta tête crie danger. Alors tu trouves des excuses, tu crées de la distance. Ce n'est pas l'amour qui t'effraie — c'est la peur de te perdre dedans, de ne plus être toi. Alors tu fuis, tu sabotes, tu te retranches. Et pourtant au fond, tu veux juste apprendre à rester sans disparaître",
    group: "Face à moi-même",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1646670478892-25df80ab7228?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 11,
    title: "Je suis là, mais pas vraiment présent",
    subtitle: "Déconnexion & Identité",
    pitch:
      "J'ai l'air d'être là, mais à l'intérieur je ne sais plus qui je suis. De l'extérieur, tu joues ton rôle — tu parles, tu agis, comme si tout allait bien. Mais à l'intérieur, quelque chose s'efface. Tu te sens déconnecté de toi-même, comme si tu vivais ta vie en spectateur. Tu es là physiquement, mais ton esprit et ton cœur semblent ailleurs, perdus dans ce que tu traverses",
    group: "Face à moi-même",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1746010387928-dcfb525bd56e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1331",
  },
  {
    id: 12,
    title: "Je retiens mes mots pour ne pas rouvrir la plaie",
    subtitle: "Silence & Protection",
    pitch:
      "Je me tais pour éviter que la douleur ne se ravive. Tu avales tes mots pour éviter de remuer le couteau dans la plaie. Tu choisis le silence, pensant protéger l'autre — ou toi-même. Mais ces mots non dits pèsent lourd, et ce qui n'est pas dit devient une nouvelle cicatrice. Tu veux parler, mais tu as peur que la vérité blesse encore plus",
    group: "Face à moi-même",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1726812026300-16435d2afc46?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1243",
  },
  {
    id: 13,
    title: "Je porte encore ses traces en moi",
    subtitle: "Empreinte affective & Deuil relationnel",
    pitch:
      "Elle a laissé une marque que je n'arrive pas à effacer. Même après la rupture, elle est toujours là. Dans tes souvenirs, dans ton corps, dans tes gestes du quotidien. Comme si une partie d'elle était restée incrustée en toi, malgré ta volonté de tourner la page. Tu veux tourner la page, mais ses traces te suivent partout",
    group: "Face à moi-même",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1683880731734-6a52e5f27ca7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 14,
    title: "Le pardon que je n'arrive pas à dire",
    subtitle: "Culpabilité & Réconciliation",
    pitch:
      "Je veux dire désolé, mais les mots restent coincés en moi. Tu sais que tu as blessé quelqu'un, et tu portes ce poids en silence. Tu veux dire pardon, mais chaque tentative s'étouffe avant de sortir. Alors tu gardes ton erreur comme une cicatrice muette. Et ce silence te condamne plus que la faute elle-même",
    group: "Face à moi-même",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1682430659002-65262fdcd3f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1213",
  },
  {
    id: 15,
    title: "J'ai peur de tout lâcher un jour",
    subtitle: "Contrôle & Émotions refoulées",
    pitch:
      "Je retiens trop, et j'ai peur d'exploser. Tu encaisses, tu avales, tu serres les dents. Mais chaque silence, chaque tension non dite s'accumule en toi comme une bombe à retardement. Tu as peur du jour où tout va sortir — trop fort, trop violemment. Et cette peur d'exploser t'épuise autant que ce que tu retiens",
    group: "Face à moi-même",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1706498943643-857af4af33d9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 16,
    title: "L'ombre de mon père me suit encore",
    subtitle: "Héritage paternel & Transmission",
    pitch:
      "Tornade entre la peur de répéter ses erreurs et la peur d'échouer, son influence pèse encore sur ma manière d'être homme et père. Tu as juré que tu ne ferais pas les mêmes erreurs que lui. Et pourtant, parfois tu retrouves ses gestes, sa colère, ses absences dans ton propre comportement. Tu veux être un homme différent, un meilleur père, mais l'absence ou la dureté de ton modèle te hante encore. Tu avances avec cette peur d'échouer, de blesser à ton tour. Mais derrière cette peur se cache ton vrai désir : briser le cycle et transmettre autrement",
    group: "Face à moi-même",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1644390756677-3a0b2604d621?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 17,
    title: "Je me perds dans le travail pour oublier le reste",
    subtitle: "Évitement & Performance",
    pitch:
      "Je m'enterre dans le travail pour oublier ma peine. Tu remplis tes journées — et parfois tes nuits — de dossiers, de tâches, d'objectifs. Le travail devient ton armure, ton excuse, ton refuge. C'est plus facile de courir après des deadlines que d'écouter ce qui fait mal à l'intérieur. Mais en te perdant dedans, tu risques d'oublier que tu n'es pas qu'un rôle ou une fonction — tu es aussi un être humain qui a besoin d'exister au-delà de la performance",
    group: "Face à moi-même",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1646670478892-25df80ab7228?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 18,
    title: "J'ai peur de ne pas être assez comme homme",
    subtitle: "Masculinité & Attentes sociales",
    pitch:
      "J'ai peur de ne pas être à la hauteur de ce qu'on attend de moi comme homme. Depuis l'enfance, on te dit qu'être un homme, c'est être fort, efficace, protecteur. Tu avances avec ce modèle en tête, comme une règle invisible qui juge chacun de tes pas. Et parfois tu trembles : et si je ne suis pas assez ? Et si je déçois, si je ne suis pas assez fort, assez masculin, assez solide ? Cette peur ne montre pas ta faiblesse — elle révèle le poids immense des attentes placées sur tes épaules",
    group: "Face à moi-même",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1746010387928-dcfb525bd56e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1331",
  },
  {
    id: 19,
    title: "Je crois que montrer ma vulnérabilité, c'est être faible",
    subtitle: "Vulnérabilité & Force intérieure",
    pitch:
      "On m'a appris à cacher mes failles, comme si elles me rendaient moins homme. Toute ta vie tu as entendu : « Un homme ne pleure pas. Il tient. Il encaisse. » Alors tu caches tes larmes, tes doutes, ta fragilité. Tu crois que montrer ta vulnérabilité, c'est perdre le respect — devenir petit, faible. Mais en gardant tout à l'intérieur, tu t'éloignes de toi-même et des autres. La vraie force ne vient pas de l'armure — elle vient de la liberté d'être entier, avec tes forces et tes failles",
    group: "Face à moi-même",
    locked: true,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1726812026300-16435d2afc46?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1243",
  },
  {
    id: 20,
    title: "Je préfère me taire que de m'exposer",
    subtitle: "Protection & Authenticité",
    pitch:
      "Je me tais parce que j'ai peur de m'exposer. Parler, c'est comme enlever mon armure. J'ai peur que mes mots soient mal compris, jugés, ou utilisés contre moi. Alors je me tais. Mais ce silence — je le sais — devient un mur qui nous sépare encore plus",
    group: "Face à moi-même",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1683880731734-6a52e5f27ca7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 21,
    title: "Peur de décevoir",
    subtitle: "Attentes & Relation",
    pitch:
      "Je me tais parce que j'ai peur de décevoir. Chaque mot semble risqué — comme si je pouvais dire la mauvaise chose, blesser quelqu'un, ou le perdre. Alors je me tais, pensant éviter le pire. Mais ce silence ne fait que creuser la distance, comme si j'échouais d'avance dans la relation même que je veux protéger",
    group: "Face à moi-même",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1682430659002-65262fdcd3f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1213",
  },
];

// Available images array for cycling
const imageUrls = [
  "https://plus.unsplash.com/premium_photo-1706498943643-857af4af33d9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1644390756677-3a0b2604d621?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1646670478892-25df80ab7228?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1746010387928-dcfb525bd56e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1331",
  "https://plus.unsplash.com/premium_photo-1726812026300-16435d2afc46?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1243",
  "https://plus.unsplash.com/premium_photo-1683880731734-6a52e5f27ca7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://plus.unsplash.com/premium_photo-1682430659002-65262fdcd3f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1213",
];

// Assign images to all cards (cycling through the image URLs)
allCards.forEach((card, index) => {
  card.image = imageUrls[index % imageUrls.length];
});

// Extract unique groups
const groups = ["Toutes les cartes", "Face à moi-même"];

export default function MenSpacePage() {
  const [selectedGroup, setSelectedGroup] = useState("Toutes les cartes");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSensitiveWarning, setShowSensitiveWarning] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [sensitiveMode, setSensitiveMode] = useState(false);

  // Filter cards based on selected group and search query
  const filteredCards = allCards.filter((card) => {
    const matchesGroup =
      selectedGroup === "Toutes les cartes" || card.group === selectedGroup;
    const matchesSearch =
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.subtitle.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter sensitive cards if sensitive mode is off
    const matchesSensitiveMode = sensitiveMode || !card.sensitive;

    return matchesGroup && matchesSearch && matchesSensitiveMode;
  });

  const handleCardClick = (card: any) => {
    if (card.sensitive && !sensitiveMode) {
      setSelectedCard(card);
      setShowSensitiveWarning(true);
    } else if (!card.locked) {
      console.log("Navigate to card:", card.id);
    }
  };

  const handleAccessSensitive = () => {
    setSensitiveMode(true);
    setShowSensitiveWarning(false);
    console.log("Access sensitive card:", selectedCard?.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 text-gray-900 font-sans">
      <Navbar />

      {/* Sensitive Content Warning Modal */}
      {showSensitiveWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-blue-600" />
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
                onClick={handleAccessSensitive}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all font-semibold shadow-md"
              >
                Accéder
              </button>
              <button
                onClick={() => setShowSensitiveWarning(false)}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
              >
                Pas maintenant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-100 via-indigo-50 to-blue-100 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-white fill-white" />
          </div>
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            ESPACE HOMME
          </h1>
          <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
            Un accompagnement pensé spécifiquement pour les hommes, explorant
            les défis, les transitions et les forces uniques de l'expérience
            masculine. Trouve ici un espace de fraternité et de compréhension
            profonde.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
            <span className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold shadow-sm">
              {allCards.length} cartes disponibles
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-600">
              Parcours émotionnel personnalisé
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="mb-5">
          {/* Filter Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-semibold text-gray-600">
                Filtrer par groupe :
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3 mb-4">
              {groups.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                    selectedGroup === group
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-blue-50 border border-gray-200"
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>

            {/* Sensitive Mode Toggle */}
            <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-200">
              {/* Non-clickable label text */}
              <span
                id="sensitiveModeLabel"
                className="text-sm font-semibold text-gray-600"
              >
                Mode sensible
              </span>

              {/* Toggle switch */}
              <label
                className="relative inline-flex items-center cursor-pointer"
                aria-labelledby="sensitiveModeLabel"
              >
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={sensitiveMode}
                  onChange={(e) => setSensitiveMode(e.target.checked)}
                  title="Activer ou désactiver le mode sensible"
                />
                <div
                  className="w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-checked:bg-blue-500
      after:content-[''] after:absolute after:top-[2px] after:left-[2px]
      after:bg-white after:border-gray-300 after:border after:rounded-full
      after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"
                ></div>
              </label>

              <span className="text-xs text-gray-500 ml-2">
                {sensitiveMode ? "Activé" : "Désactivé"}
              </span>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 ${
                card.locked ? "opacity-75" : "cursor-pointer"
              }`}
              onClick={() => handleCardClick(card)}
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
                {card.locked && (
                  <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center">
                    <Lock className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {card.group}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900 line-clamp-2 min-h-[3.5rem]">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {card.subtitle}
                </p>

                {/* Action Buttons */}
                {card.locked ? (
                  <div className="text-center py-2">
                    <p className="text-sm text-gray-500 mb-3">
                      Cette carte est verrouillée
                    </p>
                    <button
                      className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-colors text-sm font-semibold"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Déverrouiller
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all font-semibold shadow-md flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(card);
                      }}
                    >
                      Explorer
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    {/* Special Buttons for Ghost Cards */}
                    {(card.hasPasserelle || card.hasMirror) && (
                      <div className="flex gap-2">
                        {card.hasPasserelle && (
                          <button
                            className="flex-1 bg-purple-50 text-purple-700 px-4 py-2 rounded-xl hover:bg-purple-100 transition-colors text-sm font-semibold border border-purple-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            ☞ Passerelle
                          </button>
                        )}
                        {card.hasMirror && (
                          <button
                            className="flex-1 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors text-sm font-semibold border border-blue-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            ☐ Miroir
                          </button>
                        )}
                      </div>
                    )}

                    {card.isGhost && (
                      <p className="text-xs text-center text-gray-500 italic">
                        Carte fantôme - Contenu en exploration
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCards.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Aucune carte trouvée
            </h3>
            <p className="text-gray-600">
              Essaie de modifier tes filtres ou ta recherche
            </p>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {allCards.length}
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                Cartes disponibles
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {allCards.filter((c) => !c.locked).length}
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                Cartes déverrouillées
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {groups.length - 1}
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                Groupes thématiques
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-blue-100 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Un espace pensé pour toi
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Chaque carte a été créée avec soin pour accompagner ton parcours
                émotionnel. Prends ton temps, explore à ton rythme, et n'hésite
                pas à revenir sur les cartes qui résonnent particulièrement avec
                toi. Tu n'es pas seul dans ce voyage.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-blue-100 to-indigo-100 mt-20 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-md">
            <Heart className="w-8 h-8 text-blue-500 fill-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Besoin d'accompagnement ?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            SOYA est là pour t'écouter, te guider et t'accompagner dans ton
            parcours. Chaque conversation est un pas vers ta reconstruction.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all font-semibold shadow-lg">
            Discuter avec SOYA
          </button>
        </div>
      </footer>
    </div>
  );
}
