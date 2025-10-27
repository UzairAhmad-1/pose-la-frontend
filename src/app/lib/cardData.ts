export interface Card {
  id: number;
  title: string;
  subtitle: string;
  pitch: string;
  group: string;
  locked: boolean;
  sensitive: boolean;
  isGhost: boolean;
  hasPasserelle: boolean;
  hasMirror: boolean;
  mirrorCardId?: number; // ID of the corresponding mirror card
  image: string;
  examples?: string[];
  emotionalFocus?: string[];
  cardType?: "standard" | "sensitive" | "ghost" | "bridge" | "mirror";
  requiresSensitiveMode?: boolean;
}

export const allCards: Card[] = [
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
    hasMirror: true,
    mirrorCardId: 101,
    image:
      "https://images.unsplash.com/photo-1573165662973-4ab3cf3d3508?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2069",
    examples: [
      "Tu as souvent eu l'impression de devoir te justifier pour être aimée",
      "Tu as répété tes besoins sans qu'ils soient entendus",
      "Tu as ressenti un manque constant, même en couple",
    ],
    emotionalFocus: [
      "Comprendre l'origine de ce besoin de validation",
      "Retrouver une position intérieure forte et autonome",
      "Mettre fin aux dynamiques de dépendance affective",
    ],
    cardType: "sensitive",
    requiresSensitiveMode: true,
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
      "https://plus.unsplash.com/premium_photo-1675733428753-1b902a7e34bf?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    cardType: "standard",
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
      "https://images.unsplash.com/photo-1554902748-feaf536fc594?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    cardType: "sensitive",
    requiresSensitiveMode: true,
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
      "https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2076",
    cardType: "sensitive",
    requiresSensitiveMode: true,
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
    mirrorCardId: 105,
    image:
      "https://plus.unsplash.com/premium_photo-1661423910129-9c00490bd914?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    examples: [
      "Tu parles seule dans ta tête comme si tu t'adressais encore à lui",
      "Tu écris des messages sans les envoyer",
      "Tu ressens une colère ou une tendresse que tu n'arrives pas à exprimer",
      "Tu ne veux pas rouvrir la porte... mais tu veux vider ton cœur",
    ],
    cardType: "ghost",
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
    mirrorCardId: 106,
    image:
      "https://images.unsplash.com/photo-1536010447069-d2c8af80c584?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "ghost",
    requiresSensitiveMode: true,
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
    mirrorCardId: 107,
    image:
      "https://images.unsplash.com/photo-1573165662973-4ab3cf3d3508?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2069",
    cardType: "sensitive",
    requiresSensitiveMode: true,
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
    mirrorCardId: 108,
    image:
      "https://plus.unsplash.com/premium_photo-1675733428753-1b902a7e34bf?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    cardType: "ghost",
    requiresSensitiveMode: true,
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
      "https://images.unsplash.com/photo-1554902748-feaf536fc594?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    cardType: "ghost",
    requiresSensitiveMode: true,
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
      "https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2076",
    cardType: "ghost",
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
      "https://plus.unsplash.com/premium_photo-1661423910129-9c00490bd914?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "ghost",
    requiresSensitiveMode: true,
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
      "https://images.unsplash.com/photo-1536010447069-d2c8af80c584?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "ghost",
    requiresSensitiveMode: true,
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
      "https://images.unsplash.com/photo-1573165662973-4ab3cf3d3508?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2069",
    cardType: "ghost",
    requiresSensitiveMode: true,
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
    mirrorCardId: 114,
    image:
      "https://plus.unsplash.com/premium_photo-1675733428753-1b902a7e34bf?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    cardType: "ghost",
    requiresSensitiveMode: true,
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
      "https://images.unsplash.com/photo-1554902748-feaf536fc594?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    cardType: "ghost",
    requiresSensitiveMode: true,
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
      "https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2076",
    cardType: "ghost",
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
      "https://plus.unsplash.com/premium_photo-1661423910129-9c00490bd914?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "ghost",
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
      "https://images.unsplash.com/photo-1536010447069-d2c8af80c584?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "ghost",
    requiresSensitiveMode: true,
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
      "https://images.unsplash.com/photo-1573165662973-4ab3cf3d3508?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2069",
    cardType: "sensitive",
    requiresSensitiveMode: true,
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
      "https://plus.unsplash.com/premium_photo-1675733428753-1b902a7e34bf?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    cardType: "sensitive",
    requiresSensitiveMode: true,
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
      "https://images.unsplash.com/photo-1554902748-feaf536fc594?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    cardType: "sensitive",
    requiresSensitiveMode: true,
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
      "https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2076",
    cardType: "sensitive",
    requiresSensitiveMode: true,
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
      "https://plus.unsplash.com/premium_photo-1661423910129-9c00490bd914?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "standard",
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
      "https://images.unsplash.com/photo-1536010447069-d2c8af80c584?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "standard",
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
      "https://images.unsplash.com/photo-1573165662973-4ab3cf3d3508?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2069",
    cardType: "sensitive",
    requiresSensitiveMode: true,
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
      "https://plus.unsplash.com/premium_photo-1675733428753-1b902a7e34bf?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    cardType: "sensitive",
    requiresSensitiveMode: true,
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
      "https://images.unsplash.com/photo-1554902748-feaf536fc594?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    cardType: "ghost",
    requiresSensitiveMode: true,
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
    mirrorCardId: 128,
    image:
      "https://images.unsplash.com/photo-1505483531331-fc3cf89fd382?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2076",
    cardType: "sensitive",
    requiresSensitiveMode: true,
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
      "https://plus.unsplash.com/premium_photo-1661423910129-9c00490bd914?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "standard",
  },
];

// Mirror Cards (Male versions)
export const mirrorCards: Card[] = [
  {
    id: 101,
    title: "Je retiens mes mots pour ne pas rouvrir la plaie",
    subtitle: "Blocage émotionnel ou silence protecteur",
    pitch:
      "Les mots sont là, coincés dans ma gorge. Je pourrais parler, mais je choisis le silence pour ne pas raviver la douleur. Ce n'est pas de l'indifférence, c'est une protection. Mes émotions sont présentes, mais je les garde pour moi pour préserver ce qui reste de paix.",
    group: "Communication masculine",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 1,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    examples: [
      "Je préfère me taire plutôt que de dire ce qui pourrait blesser",
      "Je garde mes émotions pour moi pour éviter les conflits",
      "J'ai peur que mes mots soient mal interprétés",
      "Je me protège en maintenant une distance émotionnelle",
    ],
    cardType: "standard",
  },
  {
    id: 105,
    title: "Je garde le silence pour protéger ce qui reste",
    subtitle: "Protection émotionnelle / Retrait masculin",
    pitch:
      "Parfois, le silence n'est pas une absence, mais une présence différente. Je me retire pour ne pas amplifier la douleur, pour laisser le temps faire son travail. Ce n'est pas de l'abandon, c'est une manière de préserver l'essentiel en attendant que les blessures se referment.",
    group: "Retrait émotionnel",
    locked: false,
    sensitive: false,
    isGhost: true,
    hasPasserelle: true,
    hasMirror: true,
    mirrorCardId: 5,
    image:
      "https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    examples: [
      "Je me retire pour éviter d'empirer la situation",
      "Je préserve l'énergie émotionnelle en gardant le silence",
      "J'attends que le temps apaise les tensions",
      "Je protège l'autre de mes propres émotions brutes",
    ],
    cardType: "ghost",
  },
  {
    id: 106,
    title: "Je ne suis plus celui d'avant",
    subtitle: "Transformation masculine / Reconstruction silencieuse",
    pitch:
      "Les épreuves m'ont changé, sculpté différemment. L'homme que j'étais semble lointain, remplacé par une version plus réservée, plus prudente. Ce n'est pas un recul, mais une évolution nécessaire. J'apprends à accepter cet homme nouveau, avec ses cicatrices et sa sagesse gagnée dans la douleur.",
    group: "Transformation personnelle",
    locked: true,
    sensitive: true,
    isGhost: true,
    hasPasserelle: true,
    hasMirror: true,
    mirrorCardId: 6,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    cardType: "ghost",
    requiresSensitiveMode: true,
  },
  {
    id: 107,
    title: "Je veux qu'elle m'aime comme je suis",
    subtitle: "Authenticité masculine / Acceptation",
    pitch:
      "J'ai arrêté de jouer un rôle, de porter le masque de l'homme parfait. Maintenant, je veux être aimé pour qui je suis vraiment, avec mes forces et mes fragilités. Pas pour ce que je peux donner ou représenter, mais pour l'homme authentique que je suis devenu.",
    group: "Réciprocité affective",
    locked: false,
    sensitive: true,
    isGhost: false,
    hasPasserelle: true,
    hasMirror: true,
    mirrorCardId: 7,
    image:
      "https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    cardType: "sensitive",
    requiresSensitiveMode: true,
  },
  {
    id: 108,
    title: "Je veux effacer ce qu'elle a laissé en moi",
    subtitle: "Nettoyage émotionnel / Empreintes féminines",
    pitch:
      "Ses mots, ses regards, ses silences ont laissé des marques profondes. Je porte encore l'écho de sa présence dans mes habitudes, mes peurs, mes attentes. Effacer son empreinte, ce n'est pas l'oublier, c'est me redonner à moi-même l'espace qu'elle occupait.",
    group: "Reconstruction personnelle",
    locked: true,
    sensitive: true,
    isGhost: true,
    hasPasserelle: true,
    hasMirror: true,
    mirrorCardId: 8,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    cardType: "ghost",
    requiresSensitiveMode: true,
  },
  {
    id: 114,
    title: "J'attends un pardon que je ne donnerai peut-être jamais",
    subtitle: "Pardon retenu / Protection masculine",
    pitch:
      "Je sais qu'elle attend des mots de réconciliation, une reconnaissance de sa douleur. Mais certaines blessures sont trop profondes pour être apaisées par des excuses. Mon silence n'est pas de la rancune, c'est la distance nécessaire pour protéger ce qui reste de moi.",
    group: "Pardon et reconstruction",
    locked: true,
    sensitive: true,
    isGhost: true,
    hasPasserelle: true,
    hasMirror: true,
    mirrorCardId: 14,
    image:
      "https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    cardType: "ghost",
    requiresSensitiveMode: true,
  },
  {
    id: 128,
    title: "Je me sens marqué à jamais",
    subtitle: "Cicatrices invisibles / Honte masculine",
    pitch:
      "Certaines expériences laissent des traces qui semblent indélébiles. Je me sens différent, comme si j'avais perdu une part de mon intégrité. Ces marques invisibles pèsent sur ma confiance, sur ma manière d'être en relation. Guérir, c'est apprendre à vivre avec ces cicatrices sans qu'elles définissent qui je suis.",
    group: "Blessures invisibles",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: true,
    hasMirror: true,
    mirrorCardId: 28,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    cardType: "sensitive",
    requiresSensitiveMode: true,
  },
  {
    id: 129,
    title: "Mon silence la fait douter de ma présence",
    subtitle: "Communication non-verbale / Distance émotionnelle",
    pitch:
      "Quand je me tais, ce n'est pas que je suis absent. C'est que je cherche mes mots, que je pèse ce qui doit être dit. Mon silence peut paraître froid, mais il est souvent le signe que je suis profondément présent, en train de réfléchir à comment mieux être là pour elle.",
    group: "Communication masculine",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 29,
    image:
      "https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    cardType: "standard",
  },
];

// Function to get mirror card
export const getMirrorCard = (cardId: number): Card | undefined => {
  const card = allCards.find((c) => c.id === cardId);
  if (card && card.mirrorCardId) {
    return mirrorCards.find((mc) => mc.id === card.mirrorCardId);
  }
  return undefined;
};

// Function to get all groups
export const groups = [
  "Toutes les cartes",
  "Dignité",
  "Pardon de soi",
  "Blessures invisibles",
  "L'entre-deux émotionnel",
  "Réciprocité affective",
  "Secrets lourds",
  "Pensées sombres",
  "Parentalité et épreuves intimes",
  "Parentalité et désirs profonds",
  "Parentalité et bouleversements",
  "Parentalité et post-partum",
  "Parentalité et santé mentale",
  "Face à moi-même",
];
// Men's Cards
export const menCards: Card[] = [
  {
    id: 101,
    title: "J'ai appris à séduire, pas à aimer",
    subtitle: "Construction relationnelle & Authenticité",
    pitch:
      "Ils m'ont montré comment plaire mais pas comment construire un vrai lien. Ils t'enseignent les codes pour séduire, pour impressionner, pour conquérir. Mais pour vraiment aimer — personne ne te montre comment. Alors tu sais attirer, mais tu te perds quand il s'agit de rester. Tu découvres que séduire est facile, aimer demande un autre langage",
    group: "Face à moi-même",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 1,
    image:
      "https://plus.unsplash.com/premium_photo-1706498943643-857af4af33d9?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "standard",
  },
  {
    id: 102,
    title: "Je scanne tout pour éviter les conflits",
    subtitle: "Hypervigilance & Évitement",
    pitch:
      "Je surveille chaque geste et chaque mot pour éviter de déclencher une tempête. Tes yeux scrutent, tes oreilles captent le moindre signe. Tu anticipes chaque réaction comme si tu devais toujours prévenir l'orage. Scanner tout autour de toi est ta manière de survivre. Mais vivre en alerte constante finit par t'épuiser de l'intérieur",
    group: "Face à moi-même",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 2,
    image:
      "https://images.unsplash.com/photo-1644390756677-3a0b2604d621?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "standard",
  },
  {
    id: 103,
    title: "J'ai grandi sans tendresse, l'intimité me met mal à l'aise",
    subtitle: "Manque affectif & Apprentissage relationnel",
    pitch:
      "Le manque d'affection me rend maladroit face à la proximité. Tu n'as pas grandi dans les bras ou les gestes tendres. Alors aujourd'hui, l'intimité te déstabilise. Tu veux donner, tu veux recevoir, mais ton corps hésite, tes gestes se figent. Comme si la tendresse parlait une langue étrangère que tu dois encore apprendre",
    group: "Face à moi-même",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 3,
    image:
      "https://images.unsplash.com/photo-1646670478892-25df80ab7228?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "sensitive",
    requiresSensitiveMode: true,
  },
  {
    id: 104,
    title: "Je suis épuisé, mais je n'ai pas le droit de craquer",
    subtitle: "Charge mentale & Attentes sociales",
    pitch:
      "Je porte tout sur mes épaules et me retiens de montrer ma fatigue. Tu continues d'avancer comme si tu n'avais pas le choix. Tu portes des responsabilités pour toi et pour les autres, sans jamais montrer ta fatigue. Mais ce rôle de force constante t'épuise, et ton corps finit par trahir ce que tu caches. Craquer ne signifie pas être faible — c'est être vivant",
    group: "Face à moi-même",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 4,
    image:
      "https://images.unsplash.com/photo-1746010387928-dcfb525bd56e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1331",
    cardType: "standard",
  },
  {
    id: 105,
    title: "Je connais la théorie mais je rate dans la vraie vie",
    subtitle: "Écart théorie-pratique & Apprentissage",
    pitch:
      "Je sais en parler mais je n'arrive pas à l'appliquer quand ça compte vraiment. Tu apprends les règles, tu sais ce qu'il faudrait faire, et tout semble clair en théorie. Mais quand la situation arrive, tes réflexes prennent le dessus et tout se brouille. Entre ce que tu sais et ce que tu vis, l'écart fait mal. Et peut-être que la vraie force n'est pas de tout savoir, mais d'apprendre pas à pas à incarner ce que tu comprends",
    group: "Face à moi-même",
    locked: true,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 5,
    image:
      "https://plus.unsplash.com/premium_photo-1726812026300-16435d2afc46?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1243",
    cardType: "standard",
  },
  {
    id: 106,
    title: "J'ai déjà eu l'impression d'être un monstre",
    subtitle: "Culpabilité & Reconstruction identitaire",
    pitch:
      "Je ne me reconnais plus dans certaines de mes actions ou pensées. Tu as blessé des gens — parfois sans le vouloir, parfois en pleine conscience. Et ça reste là, comme un film que tu repasses dans ta tête. Les mots, les gestes, les silences que tu ne peux plus effacer. Il y a des jours où tu te demandes si tu mérites encore d'être aimé. Et dans ces moments, tu te vois comme un monstre. Mais même dans ce reflet, une partie de toi cherche encore à comprendre et à changer",
    group: "Face à moi-même",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 6,
    image:
      "https://plus.unsplash.com/premium_photo-1683880731734-6a52e5f27ca7?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "sensitive",
    requiresSensitiveMode: true,
  },
  {
    id: 107,
    title: "Je porte des fardeaux que personne ne voit",
    subtitle: "Poids invisible & Masque social",
    pitch:
      "Je cache un poids intérieur derrière un visage qui semble parfaitement normal. Tu souris, tu avances, et personne n'imagine ce que tu portes en toi. Tes responsabilités, ta peine, tes secrets — ils sont invisibles, pourtant ils t'écrasent en silence. Ce poids invisible t'épuise, comme si tu vivais deux vies à la fois. Et si, derrière ce masque, tu t'autorisais à déposer une partie de ce fardeau",
    group: "Face à moi-même",
    locked: false,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 7,
    image:
      "https://plus.unsplash.com/premium_photo-1682430659002-65262fdcd3f7?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1213",
    cardType: "sensitive",
    requiresSensitiveMode: true,
  },
  {
    id: 108,
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
    hasMirror: true,
    mirrorCardId: 8,
    image:
      "https://plus.unsplash.com/premium_photo-1706498943643-857af4af33d9?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "standard",
  },
  {
    id: 109,
    title: "On m'a appris à dominer, pas à aimer",
    subtitle: "Éducation masculine & Émotions",
    pitch:
      "On m'a montré la force et le contrôle, mais jamais la tendresse. On t'a répété sans cesse qu'un homme doit être fort, cacher ses émotions, ne jamais montrer de faiblesse. Alors tu as appris à endurer, à contrôler, à garder la façade. Mais derrière cette armure, personne ne t'a jamais appris à vraiment aimer. Maintenant tu découvres que la tendresse est un langage que tu dois encore apprendre",
    group: "Face à moi-même",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 9,
    image:
      "https://images.unsplash.com/photo-1644390756677-3a0b2604d621?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "sensitive",
    requiresSensitiveMode: true,
  },
  {
    id: 110,
    title: "L'engagement me fait peur",
    subtitle: "Peur de l'abandon & Autonomie",
    pitch:
      "J'ai peur de me perdre si je m'attache trop profondément. Tu veux aimer — tu en as même besoin. Mais au moment où ça se creuse, la panique monte. Ton cœur veut rester, mais ta tête crie danger. Alors tu trouves des excuses, tu crées de la distance. Ce n'est pas l'amour qui t'effraie — c'est la peur de te perdre dedans, de ne plus être toi. Alors tu fuis, tu sabotes, tu te retranches. Et pourtant au fond, tu veux juste apprendre à rester sans disparaître",
    group: "Face à moi-même",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 10,
    image:
      "https://images.unsplash.com/photo-1646670478892-25df80ab7228?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "standard",
  },
  {
    id: 111,
    title: "Je suis là, mais pas vraiment présent",
    subtitle: "Déconnexion & Identité",
    pitch:
      "J'ai l'air d'être là, mais à l'intérieur je ne sais plus qui je suis. De l'extérieur, tu joues ton rôle — tu parles, tu agis, comme si tout allait bien. Mais à l'intérieur, quelque chose s'efface. Tu te sens déconnecté de toi-même, comme si tu vivais ta vie en spectateur. Tu es là physiquement, mais ton esprit et ton cœur semblent ailleurs, perdus dans ce que tu traverses",
    group: "Face à moi-même",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 11,
    image:
      "https://images.unsplash.com/photo-1746010387928-dcfb525bd56e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1331",
    cardType: "sensitive",
    requiresSensitiveMode: true,
  },
  {
    id: 112,
    title: "Je retiens mes mots pour ne pas rouvrir la plaie",
    subtitle: "Silence & Protection",
    pitch:
      "Je me tais pour éviter que la douleur ne se ravive. Tu avales tes mots pour éviter de remuer le couteau dans la plaie. Tu choisis le silence, pensant protéger l'autre — ou toi-même. Mais ces mots non dits pèsent lourd, et ce qui n'est pas dit devient une nouvelle cicatrice. Tu veux parler, mais tu as peur que la vérité blesse encore plus",
    group: "Face à moi-même",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 12,
    image:
      "https://plus.unsplash.com/premium_photo-1726812026300-16435d2afc46?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1243",
    cardType: "standard",
  },
  {
    id: 113,
    title: "Je porte encore ses traces en moi",
    subtitle: "Empreinte affective & Deuil relationnel",
    pitch:
      "Elle a laissé une marque que je n'arrive pas à effacer. Même après la rupture, elle est toujours là. Dans tes souvenirs, dans ton corps, dans tes gestes du quotidien. Comme si une partie d'elle était restée incrustée en toi, malgré ta volonté de tourner la page. Tu veux tourner la page, mais ses traces te suivent partout",
    group: "Face à moi-même",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 13,
    image:
      "https://plus.unsplash.com/premium_photo-1683880731734-6a52e5f27ca7?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "sensitive",
    requiresSensitiveMode: true,
  },
  {
    id: 114,
    title: "Le pardon que je n'arrive pas à dire",
    subtitle: "Culpabilité & Réconciliation",
    pitch:
      "Je veux dire désolé, mais les mots restent coincés en moi. Tu sais que tu as blessé quelqu'un, et tu portes ce poids en silence. Tu veux dire pardon, mais chaque tentative s'étouffe avant de sortir. Alors tu gardes ton erreur comme une cicatrice muette. Et ce silence te condamne plus que la faute elle-même",
    group: "Face à moi-même",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 14,
    image:
      "https://plus.unsplash.com/premium_photo-1682430659002-65262fdcd3f7?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1213",
    cardType: "sensitive",
    requiresSensitiveMode: true,
  },
  {
    id: 115,
    title: "J'ai peur de tout lâcher un jour",
    subtitle: "Contrôle & Émotions refoulées",
    pitch:
      "Je retiens trop, et j'ai peur d'exploser. Tu encaisses, tu avales, tu serres les dents. Mais chaque silence, chaque tension non dite s'accumule en toi comme une bombe à retardement. Tu as peur du jour où tout va sortir — trop fort, trop violemment. Et cette peur d'exploser t'épuise autant que ce que tu retiens",
    group: "Face à moi-même",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 15,
    image:
      "https://plus.unsplash.com/premium_photo-1706498943643-857af4af33d9?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "standard",
  },
  {
    id: 116,
    title: "L'ombre de mon père me suit encore",
    subtitle: "Héritage paternel & Transmission",
    pitch:
      "Tornade entre la peur de répéter ses erreurs et la peur d'échouer, son influence pèse encore sur ma manière d'être homme et père. Tu as juré que tu ne ferais pas les mêmes erreurs que lui. Et pourtant, parfois tu retrouves ses gestes, sa colère, ses absences dans ton propre comportement. Tu veux être un homme différent, un meilleur père, mais l'absence ou la dureté de ton modèle te hante encore. Tu avances avec cette peur d'échouer, de blesser à ton tour. Mais derrière cette peur se cache ton vrai désir : briser le cycle et transmettre autrement",
    group: "Face à moi-même",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 16,
    image:
      "https://images.unsplash.com/photo-1644390756677-3a0b2604d621?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "sensitive",
    requiresSensitiveMode: true,
  },
  {
    id: 117,
    title: "Je me perds dans le travail pour oublier le reste",
    subtitle: "Évitement & Performance",
    pitch:
      "Je m'enterre dans le travail pour oublier ma peine. Tu remplis tes journées — et parfois tes nuits — de dossiers, de tâches, d'objectifs. Le travail devient ton armure, ton excuse, ton refuge. C'est plus facile de courir après des deadlines que d'écouter ce qui fait mal à l'intérieur. Mais en te perdant dedans, tu risques d'oublier que tu n'es pas qu'un rôle ou une fonction — tu es aussi un être humain qui a besoin d'exister au-delà de la performance",
    group: "Face à moi-même",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 17,
    image:
      "https://images.unsplash.com/photo-1646670478892-25df80ab7228?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "standard",
  },
  {
    id: 118,
    title: "J'ai peur de ne pas être assez comme homme",
    subtitle: "Masculinité & Attentes sociales",
    pitch:
      "J'ai peur de ne pas être à la hauteur de ce qu'on attend de moi comme homme. Depuis l'enfance, on te dit qu'être un homme, c'est être fort, efficace, protecteur. Tu avances avec ce modèle en tête, comme une règle invisible qui juge chacun de tes pas. Et parfois tu trembles : et si je ne suis pas assez ? Et si je déçois, si je ne suis pas assez fort, assez masculin, assez solide ? Cette peur ne montre pas ta faiblesse — elle révèle le poids immense des attentes placées sur tes épaules",
    group: "Face à moi-même",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 18,
    image:
      "https://images.unsplash.com/photo-1746010387928-dcfb525bd56e?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1331",
    cardType: "sensitive",
    requiresSensitiveMode: true,
  },
  {
    id: 119,
    title: "Je crois que montrer ma vulnérabilité, c'est être faible",
    subtitle: "Vulnérabilité & Force intérieure",
    pitch:
      "On m'a appris à cacher mes failles, comme si elles me rendaient moins homme. Toute ta vie tu as entendu : « Un homme ne pleure pas. Il tient. Il encaisse. » Alors tu caches tes larmes, tes doutes, ta fragilité. Tu crois que montrer ta vulnérabilité, c'est perdre le respect — devenir petit, faible. Mais en gardant tout à l'intérieur, tu t'éloignes de toi-même et des autres. La vraie force ne vient pas de l'armure — elle vient de la liberté d'être entier, avec tes forces et tes failles",
    group: "Face à moi-même",
    locked: true,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 19,
    image:
      "https://plus.unsplash.com/premium_photo-1726812026300-16435d2afc46?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1243",
    cardType: "standard",
  },
  {
    id: 120,
    title: "Je préfère me taire que de m'exposer",
    subtitle: "Protection & Authenticité",
    pitch:
      "Je me tais parce que j'ai peur de m'exposer. Parler, c'est comme enlever mon armure. J'ai peur que mes mots soient mal compris, jugés, ou utilisés contre moi. Alors je me tais. Mais ce silence — je le sais — devient un mur qui nous sépare encore plus",
    group: "Face à moi-même",
    locked: false,
    sensitive: false,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 20,
    image:
      "https://plus.unsplash.com/premium_photo-1683880731734-6a52e5f27ca7?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
    cardType: "standard",
  },
  {
    id: 121,
    title: "Peur de décevoir",
    subtitle: "Attentes & Relation",
    pitch:
      "Je me tais parce que j'ai peur de décevoir. Chaque mot semble risqué — comme si je pouvais dire la mauvaise chose, blesser quelqu'un, ou le perdre. Alors je me tais, pensant éviter le pire. Mais ce silence ne fait que creuser la distance, comme si j'échouais d'avance dans la relation même que je veux protéger",
    group: "Face à moi-même",
    locked: true,
    sensitive: true,
    isGhost: false,
    hasPasserelle: false,
    hasMirror: true,
    mirrorCardId: 21,
    image:
      "https://plus.unsplash.com/premium_photo-1682430659002-65262fdcd3f7?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1213",
    cardType: "sensitive",
    requiresSensitiveMode: true,
  },
];

// Men's groups
export const menGroups = ["Toutes les cartes", "Face à moi-même"];

// Function to get men's mirror card
export const getMensMirrorCard = (cardId: number): Card | undefined => {
  const card = menCards.find((c) => c.id === cardId);
  if (card && card.mirrorCardId) {
    return allCards.find((mc) => mc.id === card.mirrorCardId);
  }
  return undefined;
};
