export interface Scene {
  id: number;
  title_fr: string;
  title_ar: string;
  summary_fr: string;
  summary_ar: string;
  characters: string[];
  key_quotes: { text: string; speaker: string }[];
}

export const antigoneScenes: Scene[] = [
  {
    id: 1,
    title_fr: "Le Prologue",
    title_ar: "المقدمة (Prologue)",
    summary_fr: "Le Chœur présente les personnages et explique le mécanisme de la tragédie qui va se jouer.",
    summary_ar: "يقدم 'الجوقة' الشخصيات ويشرح آلية المأساة التي ستحدث.",
    characters: ["Le Chœur"],
    key_quotes: [
      { text: "C'est propre, la tragédie. C'est reposant, c'est certain...", speaker: "Le Chœur" }
    ]
  },
  {
    id: 2,
    title_fr: "Antigone et la Nourrice",
    title_ar: "أنتيجون والمربية",
    summary_fr: "Antigone rentre au palais à l'aube. La nourrice la soupçonne d'avoir un amoureux.",
    summary_ar: "تعود أنتيجون إلى القصر في الفجر. تشك المربية في أن لديها حبيبًا.",
    characters: ["Antigone", "La Nourrice"],
    key_quotes: [
      { text: "D'où viens-tu ? - De me promener, nourrice. C'était beau.", speaker: "Antigone" }
    ]
  },
  {
    id: 3,
    title_fr: "Antigone et Ismène",
    title_ar: "أنتيجون وإيسمين",
    summary_fr: "Ismène tente de convaincre Antigone de ne pas enterrer leur frère Polynice.",
    summary_ar: "تحاول إيسمين إقناع أنتيجون بعدم دفن شقيقهما بولينيس.",
    characters: ["Antigone", "Ismène"],
    key_quotes: [
      { text: "Il est le roi, Antigone. Et ils sont tous contre nous.", speaker: "Ismène" }
    ]
  },
  {
    id: 4,
    title_fr: "Antigone et Hémon",
    title_ar: "أنتيجون وهيمون",
    summary_fr: "Antigone demande à Hémon s'il l'aime vraiment, puis lui demande de partir sans explication.",
    summary_ar: "تسأل أنتيجون هيمون عما إذا كان يحبها حقًا، ثم تطلب منه المغادرة دون تفسير.",
    characters: ["Antigone", "Hémon"],
    key_quotes: [
      { text: "Tu m'aimes, Hémon ? Tu m'aimes pour de vrai ?", speaker: "Antigone" }
    ]
  },
  {
    id: 5,
    title_fr: "Le Garde et Créon",
    title_ar: "الحارس وكريون",
    summary_fr: "Le garde Jonas vient annoncer à Créon que quelqu'un a tenté de recouvrir le corps de Polynice.",
    summary_ar: "يأتي الحارس جوناس لإبلاغ كريون أن شخصًا ما حاول تغطية جثة بولينيس.",
    characters: ["Créon", "Le Garde"],
    key_quotes: [
      { text: "On a gratté la terre... c'était un enfant, peut-être.", speaker: "Le Garde" }
    ]
  },
  {
    id: 6,
    title_fr: "Le Face-à-face : Antigone et Créon",
    title_ar: "المواجهة الكبرى: أنتيجون وكريون",
    summary_fr: "Le débat central. Créon essaie de sauver Antigone en lui expliquant les raisons d'État, mais elle refuse tout compromis.",
    summary_ar: "النقاش المركزي. يحاول كريون إنقاذ أنتيجون من خلال شرح أسباب الدولة، لكنها ترفض أي حل وسط.",
    characters: ["Antigone", "Créon"],
    key_quotes: [
      { text: "Moi, je ne veux pas comprendre. Je suis là pour vous dire non et pour mourir.", speaker: "Antigone" }
    ]
  },
  {
    id: 7,
    title_fr: "Le Messager et le Dénouement",
    title_ar: "المخبر والنهاية",
    summary_fr: "L'annonce des morts tragiques d'Antigone, d'Hémon et d'Eurydice. Créon reste seul.",
    summary_ar: "إعلان الوفيات المأساوية لأنتيجون وهيمون ويوريديس. يبقى كريون وحيدًا.",
    characters: ["Le Messager", "Le Chœur", "Créon"],
    key_quotes: [
      { text: "Une terrible nouvelle... Antigone s'est pendue.", speaker: "Le Messager" }
    ]
  }
];
