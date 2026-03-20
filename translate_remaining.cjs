const fs = require('fs');

const arRaw = fs.readFileSync('src/locales/ar/translation.json', 'utf-8');
const arData = JSON.parse(arRaw);

// Boite a Merveilles - Glossary, Mindmaps, Examen
if(!arData.boite.glossary) arData.boite.glossary = {};
arData.boite.glossary.title = 'معجم المصطلحات';
arData.boite.glossary.subtitle = 'أهم المصطلحات الثقافية في صندوق العجائب';
arData.boite.glossary.terms = [
  { term: 'Msid (المسيد)', definition: 'الكتّاب القرآني حيث يتعلم الأطفال حفظ القرآن الكريم.' },
  { term: 'Chouafa (الشوافة)', definition: 'العرافة أو الساحرة، امرأة تدعي معرفة الغيب وتمارس طقوساً تقليدية.' },
  { term: 'Fqih (الفقيه)', definition: 'معلم الصبيان في المسيد، يتميز بصرامته وعصاه الطويلة.' },
  { term: 'Haïk (الحايك)', definition: 'لباس تقليدي مغربي تلبسه النساء عند الخروج لتغطية أجسادهن.' },
  { term: 'Zellij (الزليج)', definition: 'الفسيفساء المغربية الأصيلة لتزيين الجدران والأرضيات.' },
  { term: 'Djellaba (الجلابة)', definition: 'لباس تقليدي فضفاض ومقنّع يلبسه الرجال والنساء.' }
];

if(!arData.boite.mindmaps) arData.boite.mindmaps = {};
arData.boite.mindmaps.title = 'خرائط ذهنية';
arData.boite.mindmaps.maps = [
  {
    title: 'خريطة الشخصيات',
    description: 'العلاقات بين الشخصيات الرئيسية في دار الشوافة.',
    items: ['سيدي محمد (بطل الرواية)', 'الوالدان (لالة زبيدة والمعلم عبد السلام)', 'الجيران (كنزة، رحمة، فاطمة)، الأصدقاء (إدريس العواد، مولاي العربي)'],
    icon: 'characters'
  },
  {
    title: 'الخرافات والمعتقدات',
    description: 'أهم مظاهر الخرافة في المجتمع آنذاك.',
    items: ['زيارة الأضرحة (سيدي علي بوغالب)', 'استشارة العرافات (كنزة الشوافة)', 'التمائم وطقوس الشفاء'],
    icon: 'themes'
  },
  {
    title: 'تطور السرد',
    description: 'الأحداث مقسمة حسب الفصول',
    items: ['الشتاء (الفصول 1-3): المسيد والشوافة', 'الربيع (الفصول 4-7): التحضير لعاشوراء', 'الصيف (الفصول 8-12): ضياع الأموال وسفر الأب، ثم عودته'],
    icon: 'structure'
  }
];

if(!arData.boite.examen) arData.boite.examen = {};
arData.boite.examen.title = 'محاكي الامتحان الجهوي (قريباً)';
arData.boite.examen.description = 'لم يتم تفعيل هذه الميزة بعد لصندوق العجائب.';
arData.boite.examen.comprehension_questions = [];
arData.boite.examen.analysis_questions = [];
arData.boite.examen.writing_prompts = [];
arData.boite.examen.show_answer_points = 'عرص الإجابة';

// Condamne - Glossary, Mindmaps, Examen
if(!arData.condamne.glossary) arData.condamne.glossary = {};
arData.condamne.glossary.title = 'معجم المصطلحات';
arData.condamne.glossary.subtitle = 'مصطلحات السجن والعدالة في آخر يوم لمحكوم بالإعدام';
arData.condamne.glossary.terms = [
  { term: 'Bicêtre (سجن بيسيتر)', definition: 'سجن ومستشفى قديم بباريس، محطته الأولى بعد الحكم.' },
  { term: 'La Conciergerie (الكونسيرجيري)', definition: 'السجن المركزي بباريس، المحطة الأخيرة قبل الإعدام.' },
  { term: 'La Guillotine (المقصلة)', definition: 'آلة الإعدام المستعملة في فرنسا، ترمز للموت البارد والسريع.' },
  { term: 'Les Forçats (سجناء الأشغال الشاقة)', definition: 'المساجين المحكوم عليهم بالأشغال الشاقة (Le Bagne) في مدينة تولون.' },
  { term: 'Le Pourvoi en cassation (الطعن بالنقض)', definition: 'محاولة قانونية أخيرة لرفض الحكم ومراجعته.' },
  { term: 'Place de Grève (ساحة الإعدام)', definition: 'الساحة العامة التي تُنفذ فيها أحكام الإعدام أمام الجمهور.' }
];

if(!arData.condamne.mindmaps) arData.condamne.mindmaps = {};
arData.condamne.mindmaps.title = 'خرائط ذهنية';
arData.condamne.mindmaps.maps = [
  {
    title: 'الأبعاد النفسية للسجين',
    description: 'تطور حالة السجين من صدمة الحكم إلى لحظة التنفيذ.',
    items: ['الأمل في العفو', 'الخوف والفزع', 'الهلوسة والذكريات', 'اليأس والاستسلام التام'],
    icon: 'characters'
  },
  {
    title: 'أطروحة الرواية',
    description: 'لماذا يعارض فيكتور هوغو الإعدام؟',
    items: ['العقاب يجب أن يصلح لا أن يقتل', 'ألم الإعدام النفسي أسوأ من الموت الجسدي', 'العدالة لا يجب أن تساوي الجريمة'],
    icon: 'themes'
  },
  {
    title: 'أماكن الاعتقال',
    description: 'رحلة العذاب نحو المقصلة',
    items: ['Bicêtre (صدمة الحكم ورؤية زملاء السجن)', 'La Conciergerie (اليأس والوداع الخاطئ مع ماري)', 'Place de Grève (النهاية أمام الحشود الجاهلة)'],
    icon: 'structure'
  }
];

if(!arData.condamne.examen) arData.condamne.examen = {};
arData.condamne.examen.title = 'محاكي الامتحان الجهوي (قريباً)';
arData.condamne.examen.description = 'لم يتم تفعيل هذه الميزة بعد لفيكتور هوغو.';
arData.condamne.examen.comprehension_questions = [];
arData.condamne.examen.analysis_questions = [];
arData.condamne.examen.writing_prompts = [];
arData.boite.examen.show_answer_points = 'عرص الإجابة';

fs.writeFileSync('src/locales/ar/translation.json', JSON.stringify(arData, null, 2));


const frRaw = fs.readFileSync('src/locales/fr/translation.json', 'utf-8');
const frData = JSON.parse(frRaw);

// Boite a Merveilles - Glossary, Mindmaps, Examen
if(!frData.boite.glossary) frData.boite.glossary = {};
frData.boite.glossary.title = 'Glossaire';
frData.boite.glossary.subtitle = 'Termes culturels clés dans La Boîte à Merveilles';
frData.boite.glossary.terms = [
  { term: 'Msid', definition: 'École coranique traditionnelle où les enfants mémorisent le Coran.' },
  { term: 'Chouafa', definition: 'Voyante ou sorcière, femme qui prétend lire l\'avenir.' },
  { term: 'Fqih', definition: 'Maître de l\'école coranique, souvent caractérisé par sa sévérité et sa baguette.' },
  { term: 'Haïk', definition: 'Long vêtement traditionnel porté par les femmes pour se couvrir à l\'extérieur.' },
  { term: 'Zellij', definition: 'Mosaïque marocaine traditionnelle utilisée pour décorer murs et sols.' },
  { term: 'Djellaba', definition: 'Longue robe à manches longues et capuchon, portée par hommes et femmes.' }
];

if(!frData.boite.mindmaps) frData.boite.mindmaps = {};
frData.boite.mindmaps.title = 'Cartes Mentales';
frData.boite.mindmaps.maps = [
  {
    title: 'Réseau des Personnages',
    description: 'Relations entre les personnages à Dar Chouafa.',
    items: ['Sidi Mohammed (Le héros)', 'Les parents (Lalla Zoubida, M. Abdeslam)', 'Les voisins (Kenza, Rahma, Fatma), Les amis (Driss, Moulay Larbi)'],
    icon: 'characters'
  },
  {
    title: 'Superstitions et Croyances',
    description: 'Manifestations de la superstition dans la société.',
    items: ['Visite des Sanctuaires (Sidi Ali Boughaleb)', 'Consultation de la Voyante (Chouafa)', 'Amulettes et talismans'],
    icon: 'themes'
  },
  {
    title: 'Évolution Narrative',
    description: 'Structure du récit selon les saisons.',
    items: ['Hiver (Ch. 1-3) : Le Msid et Dar Chouafa', 'Printemps (Ch. 4-7) : Préparatifs d\'Achoura', 'Été (Ch. 8-12) : Ruine du père, son départ et son retour'],
    icon: 'structure'
  }
];

if(!frData.boite.examen) frData.boite.examen = {};
frData.boite.examen.title = 'Simulateur d\'Examen (Bientôt)';
frData.boite.examen.description = 'Cette fonctionnalité n\'est pas encore disponible pour la Boîte à Merveilles.';
frData.boite.examen.comprehension_questions = [];
frData.boite.examen.analysis_questions = [];
frData.boite.examen.writing_prompts = [];
frData.boite.examen.show_answer_points = 'Voir la réponse';

// Condamne - Glossary, Mindmaps, Examen
if(!frData.condamne.glossary) frData.condamne.glossary = {};
frData.condamne.glossary.title = 'Glossaire';
frData.condamne.glossary.subtitle = 'Vocabulaire judiciaire et carcéral dans Le Dernier Jour d\'un Condamné';
frData.condamne.glossary.terms = [
  { term: 'Bicêtre', definition: 'Prison et hospice parisien, première étape après la condamnation.' },
  { term: 'La Conciergerie', definition: 'Prison centrale de Paris, dernière étape avant la guillotine.' },
  { term: 'La Guillotine', definition: 'Machine à décapiter, symbole d\'une mort froide et mécanique.' },
  { term: 'Les Forçats', definition: 'Criminels condamnés aux travaux forcés (le Bagne) à Toulon.' },
  { term: 'Le Pourvoi en cassation', definition: 'Dernier recours judiciaire pour annuler un jugement.' },
  { term: 'La Place de Grève', definition: 'Place publique où se déroulaient les exécutions sous les yeux de la foule.' }
];

if(!frData.condamne.mindmaps) frData.condamne.mindmaps = {};
frData.condamne.mindmaps.title = 'Cartes Mentales';
frData.condamne.mindmaps.maps = [
  {
    title: 'Évolution Psychologique',
    description: 'L\'état d\'esprit du condamné face à la mort.',
    items: ['L\'espoir du pourvoi ou de la grâce', 'La terreur viscérale', 'Refuge dans le passé', 'Résignation et désespoir'],
    icon: 'characters'
  },
  {
    title: 'Plaidoyer Contre la Peine de Mort',
    description: 'Les arguments de Victor Hugo.',
    items: ['Punition irréversible (erreur judiciaire fatale)', 'Torture morale aveugle', 'Création d\'orphelins (Marie)'],
    icon: 'themes'
  },
  {
    title: 'L\'Espace Carcéral',
    description: 'Le voyage tragique du condamné.',
    items: ['Bicêtre : La foule des forçats', 'La Conciergerie : L\'isolement et la visite de Marie', 'L\'Hôtel de Ville / Place de Grève : La fin sanglante'],
    icon: 'structure'
  }
];

if(!frData.condamne.examen) frData.condamne.examen = {};
frData.condamne.examen.title = 'Simulateur d\'Examen (Bientôt)';
frData.condamne.examen.description = 'Cette fonctionnalité n\'est pas encore disponible pour Victor Hugo.';
frData.condamne.examen.comprehension_questions = [];
frData.condamne.examen.analysis_questions = [];
frData.condamne.examen.writing_prompts = [];
frData.condamne.examen.show_answer_points = 'Voir la réponse';

fs.writeFileSync('src/locales/fr/translation.json', JSON.stringify(frData, null, 2));

console.log('Successfully completed remaining translations!');
