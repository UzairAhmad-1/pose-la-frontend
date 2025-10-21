"use client";

import { useState } from "react";
import { Heart, Lock, Search, Filter } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import Image from "next/image";

// All 29 cards data with images
const allCards = [
  {
    id: 1,
    title: "Je ne veux plus supplier pour exister",
    subtitle: "Auto-respect et Libération émotionnelle",
    pitch:
      "Tu en as assez de tendre la main pour exister dans les yeux des autres. Tu t'oublies en croyant devoir prouver ta valeur pour être aimée. Aujourd'hui, tu refuses de mendier ta place, tu la prends, parce qu'elle t'appartient.",
    group: "Dignité",
    locked: false,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1573165662973-4ab3cf3d3508?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2069",
  },
  {
    id: 2,
    title: "Je veux retrouver ma dignité",
    subtitle: "Reconstruction & Force intérieure",
    pitch:
      "Tu as trop plié, trop accepté, trop laissé passer ce qui t'a abîmée. Retrouver ta dignité, ce n'est pas effacer ce que tu as vécu, c'est décider de relever la tête malgré les blessures. Ton respect commence par toi, et personne ne peut te l'enlever.",
    group: "Dignité",
    locked: true,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1675733428753-1b902a7e34bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
  },
  {
    id: 3,
    title: "J'ai besoin de me demander pardon",
    subtitle: "Pardon à soi et libération personnelle",
    pitch:
      "Tu te condamnes sans appel, comme si tes erreurs disaient toute ta valeur. Tu portes depuis trop longtemps le poids de la culpabilité. Te demander pardon à toi-même, c'est rouvrir un espace de douceur intérieure et accepter que tu as le droit de te relever.",
    group: "Pardon de soi",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1554902748-feaf536fc594?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
  },
  {
    id: 4,
    title: "Je n'ai plus envie d'aimer",
    subtitle: "Blessures émotionnelles",
    pitch:
      "Tu crois à l'amour, tu donnes, et chaque blessure laisse une trace. Ton cœur se ferme, non pas par manque d'envie mais par trop de fatigue. Tu ne rejettes pas l'amour, tu as juste besoin de repos avant de pouvoir y croire à nouveau.",
    group: "Blessures invisibles",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2076",
  },
  {
    id: 5,
    title: "J'ai encore des choses à lui dire mais je ne veux plus lui parler",
    subtitle: "Non-dits, tension intérieure / fermeture protectrice",
    pitch:
      "Les phrases coincées brûlent à l'intérieur comme des braises. Tu veux les sortir pour respirer mais tu refuses de les remettre entre ses mains. Ces mots ne sont plus pour lui, ils sont pour toi, pour alléger ton cœur et t'en libérer.",
    group: "L'entre-deux émotionnel",
    locked: false,
    sensitive: false,
    isGhost: true,
    hasPasserelle: true,
    hasMirror: true,
    image:
      "https://plus.unsplash.com/premium_photo-1661423910129-9c00490bd914?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 6,
    title: "Je ne suis plus celle d'avant",
    subtitle: "Transformation intérieure / Reconstruction invisible",
    pitch:
      "Tu ne reconnais plus celle que tu étais avant la tempête. Tes blessures laissent des marques, visibles ou invisibles, et tu sens que quelque chose en toi change. Apprendre à vivre avec cette nouvelle version de toi, ce n'est pas perdre ton identité. C'est découvrir une force qui naît de ce que tu as traversé.",
    group: "L'entre-deux émotionnel",
    locked: true,
    sensitive: true,
    isGhost: true,
    hasPasserelle: true,
    hasMirror: true,
    image:
      "https://images.unsplash.com/photo-1536010447069-d2c8af80c584?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 7,
    title: "Je veux qu'il m'aime comme je l'aime",
    subtitle: "Réciprocité affective / Déséquilibre amoureux",
    pitch:
      "Tu l'aimes fort, peut-être trop fort, et tu attends qu'il t'aime avec la même force. Chaque geste, chaque silence devient une mesure de ce décalage. Tu veux que l'amour soit réciproque, égal, que ton cœur trouve enfin son reflet dans le sien.",
    group: "Réciprocité affective",
    locked: false,
    sensitive: true,
    isGhost: false,
    hasPasserelle: true,
    hasMirror: true,
    image:
      "https://images.unsplash.com/photo-1573165662973-4ab3cf3d3508?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2069",
  },
  {
    id: 8,
    title: "Je veux nettoyer ce qu'il a laissé en moi",
    subtitle: "Résidus émotionnels / Empreintes invisibles",
    pitch:
      "Tu portes encore ses marques, comme une empreinte qui colle à ta peau et à ton esprit. Ce qu'il laisse influence tes pensées, tes émotions, tes choix. Tu veux te libérer de ce passé, retrouver un espace intérieur qui t'appartient vraiment.",
    group: "L'entre-deux émotionnel",
    locked: true,
    sensitive: true,
    isGhost: true,
    hasPasserelle: true,
    hasMirror: true,
    image:
      "https://plus.unsplash.com/premium_photo-1675733428753-1b902a7e34bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
  },
  {
    id: 9,
    title: "Je veux arrêter de justifier ce qu'il m'a fait",
    subtitle: "Pardon qui te blesse",
    pitch:
      "Tu cherches mille explications pour atténuer ses fautes. Tu couvres ses manquements de raisons, comme si ses blessures excusaient les tiennes. Mais à force de justifier, tu te trahis toi-même. Reconnaître la douleur sans la maquiller, c'est le premier pas vers la liberté.",
    group: "L'entre-deux émotionnel",
    locked: true,
    sensitive: true,
    isGhost: true,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1554902748-feaf536fc594?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
  },
  {
    id: 10,
    title: "Je crois qu'on est connectés, mais je rêve",
    subtitle: "Illusion de lien / Disparition / Fracture brutale",
    pitch:
      "Tu penses qu'il y a un fil invisible entre vous, une complicité unique. Chaque geste, chaque mot semble preuve de ce lien. Mais tu découvres que c'est peut-être toi seule qui y croit. Cette désillusion fait mal, mais elle t'invite aussi à voir la réalité en face.",
    group: "L'entre-deux émotionnel",
    locked: false,
    sensitive: false,
    isGhost: true,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2076",
  },
  {
    id: 11,
    title: "Quand tout s'effondre",
    subtitle: "Perte de repères / Bascule brutale / Ressenti de vide",
    pitch:
      "Un mot, un silence, une rupture, et tout s'écroule. Le sol se dérobe, tes repères volent en éclats, tu suffoques dans ce vide. C'est le vertige du plus rien, cette impression d'être englouti·e. Mais même dans cet effondrement, il reste une chose : toi, debout au milieu des débris.",
    group: "L'entre-deux émotionnel",
    locked: true,
    sensitive: true,
    isGhost: true,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1661423910129-9c00490bd914?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 12,
    title: "J'ai honte d'aimer encore un homme qui m'a tant blessée",
    subtitle: "Ambivalence / Trahison de soi",
    pitch:
      "Ton cœur s'accroche malgré les coups. Malgré tout ce qui prouve que tu devrais lâcher, tu ressens encore de l'amour. Et cette tendresse te brûle de honte, comme si aimer celui qui t'a blessé effaçait ta valeur. Mais ce paradoxe ne fait pas de toi une faiblesse.",
    group: "L'entre-deux émotionnel",
    locked: true,
    sensitive: true,
    isGhost: true,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1536010447069-d2c8af80c584?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 13,
    title: "Il ne m'a pas brisée mais je ne suis plus tout à fait intacte",
    subtitle: "Traces & cicatrices invisibles",
    pitch:
      "Tu avances debout, mais avec des fissures invisibles. Tu n'es pas détruite, mais tu n'es plus intacte non plus. Tes blessures laissent des marques qui changent ta manière d'aimer, de faire confiance, de croire à nouveau.",
    group: "L'entre-deux émotionnel",
    locked: true,
    sensitive: true,
    isGhost: true,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1573165662973-4ab3cf3d3508?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2069",
  },
  {
    id: 14,
    title: "J'attends un pardon qui n'arrivera jamais",
    subtitle: "Pardon qui n'arrive jamais",
    pitch:
      "Tu attends des mots qui ne viendront jamais. Un aveu, un pardon, une reconnaissance de la douleur infligée. Et plus tu attends, plus le silence pèse. Accepter qu'il ne s'excusera pas, c'est reprendre le pouvoir de guérir sans son accord.",
    group: "L'entre-deux émotionnel",
    locked: true,
    sensitive: true,
    isGhost: true,
    hasPasserelle: true,
    hasMirror: true,
    image:
      "https://plus.unsplash.com/premium_photo-1675733428753-1b902a7e34bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
  },
  {
    id: 15,
    title: "J'ai tout donné et j'ai l'impression de n'avoir rien reçu",
    subtitle: "Épuisement affectif / Don sans retour",
    pitch:
      "Tu donnes ton énergie, ton amour, ton temps, ton cœur entier. À force de tout offrir, tu t'effaces peu à peu. Et il ne te reste qu'un vide amer : celui d'avoir tout donné, sans jamais recevoir en retour.",
    group: "L'entre-deux émotionnel",
    locked: true,
    sensitive: true,
    isGhost: true,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1554902748-feaf536fc594?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
  },
  {
    id: 16,
    title: "Je retombe toujours sur le même genre d'hommes",
    subtitle: "Schémas répétitifs / Attraction toxique",
    pitch:
      "Les visages changent mais l'histoire reste la même. Tu crois que cette fois est différente, et pourtant tu retrouves les mêmes blessures. Comme si un fil invisible te ramenait vers le même genre d'hommes et de douleurs.",
    group: "L'entre-deux émotionnel",
    locked: false,
    sensitive: false,
    isGhost: true,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2076",
  },
  {
    id: 17,
    title: "Je suis vide mais j'ai pas le droit de craquer",
    subtitle: "Épuisement émotionnel / Charge invisible",
    pitch:
      "Tu avances comme une coquille vide, en serrant les dents pour ne rien laisser paraître. Tu crois que tu dois tenir, que tu n'as pas le droit de t'effondrer. Mais ce poids silencieux t'épuise et t'éloigne un peu plus de toi-même à chaque pas.",
    group: "L'entre-deux émotionnel",
    locked: false,
    sensitive: false,
    isGhost: true,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1661423910129-9c00490bd914?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 18,
    title: "Je ne suis plus triste mais je ne suis pas en paix",
    subtitle: "Inachèvement émotionnel / Paix intérieure absente",
    pitch:
      "Tu ne pleures plus, tu ne souffres plus comme avant. Mais au fond, quelque chose reste en suspens. Entre le passé et l'apaisement, tu vis dans un entre-deux où la paix n'arrive pas à s'installer.",
    group: "L'entre-deux émotionnel",
    locked: true,
    sensitive: true,
    isGhost: true,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1536010447069-d2c8af80c584?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 19,
    title: "Besoin de reconnaissance",
    subtitle: "Quête d'amour et validation",
    pitch:
      "Tu donnes, tu fais, tu es là, mais c'est comme si tout passait inaperçu. Ton cœur attend un signe, un regard qui dise : je te vois, tu comptes. Le besoin de reconnaissance n'est pas une faiblesse, c'est un désir profond de sentir que ta valeur existe vraiment.",
    group: "Blessures invisibles",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1573165662973-4ab3cf3d3508?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2069",
  },
  {
    id: 20,
    title: "Je n'ai dit à personne ce qu'il m'a fait",
    subtitle: "Silence imposé / Fardeau intérieur",
    pitch:
      "Tu portes en silence une vérité trop lourde. Les mots coincés brûlent à l'intérieur et t'isolent du monde. Ce secret te ronge parce qu'il reste enfermé. Mettre des mots, c'est briser le mur qui t'étouffe.",
    group: "Secrets lourds",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1675733428753-1b902a7e34bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
  },
  {
    id: 21,
    title: "J'ai pensé à me faire du mal je n'en ai parlé à personne",
    subtitle: "Idées suicidaires / Isolement",
    pitch:
      "Un jour, l'idée t'effleure, comme une ombre qui traverse l'esprit. Tu ne la dis à personne, par peur, par honte, ou pour ne pas inquiéter. Alors tu portes ce poids seule, en silence. Mais cette pensée ne te définit pas.",
    group: "Pensées sombres",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1554902748-feaf536fc594?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
  },
  {
    id: 22,
    title: "Fausse couche",
    subtitle: "Deuil invisible / Solitude silencieuse",
    pitch:
      "Tu portes une vie qui n'a pas vu le jour, et avec elle un espoir brisé. La fausse couche laisse un vide invisible aux autres mais immense en toi. C'est une douleur intime, souvent tue, que peu comprennent vraiment.",
    group: "Parentalité et épreuves intimes",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2076",
  },
  {
    id: 23,
    title: "Envie de bébé",
    subtitle: "Attente / Espoir / Pression intime",
    pitch:
      "Ce désir grandit en toi comme une évidence. Tu l'imagines, tu l'attends, tu le ressens dans ton corps et dans ton cœur. L'envie de bébé n'est pas seulement un projet, c'est un appel profond à transmettre, à aimer autrement.",
    group: "Parentalité et désirs profonds",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1661423910129-9c00490bd914?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 24,
    title: "L'arrivée de bébé",
    subtitle: "Joie / Adaptation / Fatigue",
    pitch:
      "Un bébé arrive et ton monde bascule. Joie immense et fatigue profonde se mêlent, entre émerveillement et vertige. Ce nouveau rôle chamboule tout ton quotidien et ton identité.",
    group: "Parentalité et bouleversements",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1536010447069-d2c8af80c584?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
  {
    id: 25,
    title: "Le baby blues",
    subtitle: "Tristesse passagère / Hormones / Épuisement",
    pitch:
      "Après la naissance, on attend de toi des sourires et de la joie. Mais à l'intérieur, tu ressens surtout une vague de tristesse et de fragilité. Le baby blues brouille les émotions : tu aimes ton bébé et pourtant tu te sens submergée.",
    group: "Parentalité et post-partum",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1573165662973-4ab3cf3d3508?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2069",
  },
  {
    id: 26,
    title: "Dépression post-partum",
    subtitle: "Vulnérabilité profonde / Isolement / Tabou",
    pitch:
      "Ce qui devrait être un moment de bonheur se transforme en cage invisible. Tu souris parfois, mais au fond tu suffoques sous le poids de la fatigue, de la solitude, de l'incompréhension. La dépression post-partum ne parle pas d'un manque d'amour.",
    group: "Parentalité et santé mentale",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1675733428753-1b902a7e34bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
  },
  {
    id: 27,
    title: "Je veux qu'il me regrette",
    subtitle: "Désir de revanche / Reconnaissance affective",
    pitch:
      "Tu veux qu'il ouvre les yeux, qu'il comprenne enfin ce qu'il a perdu. Qu'un jour, il ressente ce vide que son absence a laissé en toi. Ce n'est pas seulement de la revanche, c'est le cri de ta valeur ignorée.",
    group: "L'entre-deux émotionnel",
    locked: false,
    sensitive: true,
    isGhost: true,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://images.unsplash.com/photo-1554902748-feaf536fc594?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
  },
  {
    id: 28,
    title: "Je me sens tachée",
    subtitle: "Honte intime / Sentiment d'impureté / Marque intérieure",
    pitch:
      "Certains vécus laissent une empreinte qui semble impossible à effacer. Tu avances en croyant que cette tache est visible aux yeux du monde. Mais ton histoire ne te définit pas à jamais : elle raconte ce que tu as traversé, pas qui tu es.",
    group: "Blessures invisibles",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: true,
    hasMirror: true,
    image:
      "https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2076",
  },
  {
    id: 29,
    title: "Son silence me fait douter de sa présence",
    subtitle: "Besoin de clarté / Peur de distance",
    pitch:
      "Quand il ne parle pas, je me sens perdue. Son silence devient un vide qui m'éloigne. J'ai besoin de clarté, de mots, même imparfaits. Sans ça, j'ai l'impression qu'il me cache quelque chose ou qu'il s'éloigne déjà.",
    group: "Face à moi-même",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: false,
    image:
      "https://plus.unsplash.com/premium_photo-1661423910129-9c00490bd914?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
];

// Available images array for cycling
const imageUrls = [
  "https://images.unsplash.com/photo-1573165662973-4ab3cf3d3508?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2069",
  "https://plus.unsplash.com/premium_photo-1675733428753-1b902a7e34bf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
  "https://images.unsplash.com/photo-1554902748-feaf536fc594?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
  "https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2076",
  "https://plus.unsplash.com/premium_photo-1661423910129-9c00490bd914?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  "https://images.unsplash.com/photo-1536010447069-d2c8af80c584?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
];

// Assign images to all cards (cycling through the image URLs)
allCards.forEach((card, index) => {
  card.image = imageUrls[index % imageUrls.length];
});

// Extract unique groups - matching exactly from your image
const groups = [
  "Toutes les cartes",
  "Dignité",
  "Pardon de soi",
  "Blessures invisibles",
  "L'entre-deux émotionnel",
];

export default function WomenSpacePage() {
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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white text-gray-900 font-sans">
      <Navbar />

      {/* Sensitive Content Warning Modal */}
      {showSensitiveWarning && (
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
                onClick={handleAccessSensitive}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all font-semibold shadow-md"
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
      <div className="bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full mb-6 shadow-lg">
            <Heart className="w-10 h-10 text-white fill-white" />
          </div>
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            ESPACE FEMME
          </h1>
          <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
            Un accompagnement pensé spécifiquement pour les femmes, explorant
            les défis, les transitions et les forces uniques de l'expérience
            féminine. Trouve ici un espace de sororité et de compréhension
            profonde.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
            <span className="bg-white text-pink-600 px-4 py-2 rounded-full font-semibold shadow-sm">
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
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-pink-50 border border-gray-200"
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
                  className="w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-checked:bg-pink-500
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

                {/* Badges */}
                {/* <div className="absolute top-3 left-3 right-3 flex justify-between">
                  <div className="flex gap-2">
                    {card.isGhost && (
                      <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                        Carte fantôme
                      </span>
                    )}
                  </div>
                  <div>
                    {card.sensitive && (
                      <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                        Mode sensible
                      </span>
                    )}
                  </div>
                </div> */}
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-xs font-semibold text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
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
                      className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all font-semibold shadow-md flex items-center justify-center gap-2"
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
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-pink-400" />
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
        <div className="mt-16 bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8 border border-pink-100">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">
                {allCards.length}
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                Cartes disponibles
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">
                {allCards.filter((c) => !c.locked).length}
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                Cartes déverrouillées
              </div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">
                {groups.length - 1}
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                Groupes thématiques
              </div>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mt-12 bg-white rounded-2xl p-8 border border-pink-100 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Un espace pensé pour toi
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Chaque carte a été créée avec soin pour accompagner ton parcours
                émotionnel. Prends ton temps, explore à ton rythme, et n'hésite
                pas à revenir sur les cartes qui résonnent particulièrement avec
                toi. Tu n'es pas seule dans ce voyage.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gradient-to-r from-pink-100 to-rose-100 mt-20 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-md">
            <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Besoin d'accompagnement ?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            SOYA est là pour t'écouter, te guider et t'accompagner dans ton
            parcours. Chaque conversation est un pas vers ta reconstruction.
          </p>
          <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all font-semibold shadow-lg">
            Discuter avec SOYA
          </button>
        </div>
      </footer>
    </div>
  );
}
