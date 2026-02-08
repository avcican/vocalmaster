import { CEFRLevel, Word, WordType } from './types';

export const LEVEL_COLORS: Record<CEFRLevel, string> = {
  [CEFRLevel.A1]: 'bg-green-500',
  [CEFRLevel.A2]: 'bg-teal-500',
  [CEFRLevel.B1]: 'bg-yellow-500',
  [CEFRLevel.B2]: 'bg-orange-500',
  [CEFRLevel.C1]: 'bg-red-500',
  [CEFRLevel.C2]: 'bg-purple-600',
};

export const INITIAL_STATS = {
  streak: 3,
  wordsLearned: 142,
  xp: 2450,
  levelProgress: {
    [CEFRLevel.A1]: 85,
    [CEFRLevel.A2]: 42,
    [CEFRLevel.B1]: 15,
    [CEFRLevel.B2]: 0,
    [CEFRLevel.C1]: 0,
    [CEFRLevel.C2]: 0,
  },
};

export const MOCK_WORDS: Word[] = [
  {
    id: '1',
    german: 'Haus',
    turkish: 'Ev',
    gender: 'das',
    plural: 'die Häuser',
    level: CEFRLevel.A1,
    category: 'Haus und Möbel',
    wordType: WordType.NOUN,
    examples: [
      { german: 'Ich wohne in einem großen Haus.', turkish: 'Büyük bir evde oturuyorum.' },
    ],
    pronunciation: '/haʊs/',
    difficultyScore: 10,
    nextReviewDate: Date.now(),
  },
  {
    id: '2',
    german: 'Apfel',
    turkish: 'Elma',
    gender: 'der',
    plural: 'die Äpfel',
    level: CEFRLevel.A1,
    category: 'Essen und Trinken',
    wordType: WordType.NOUN,
    examples: [
      { german: 'Der Apfel ist rot.', turkish: 'Elma kırmızıdır.' },
    ],
    pronunciation: '/ˈapfəl/',
    difficultyScore: 20,
    nextReviewDate: Date.now(),
  },
  {
    id: '3',
    german: 'laufen',
    turkish: 'yürumek, koşmak',
    level: CEFRLevel.A1,
    category: 'Aktivitäten',
    wordType: WordType.VERB,
    examples: [
      { german: 'Wir laufen im Park.', turkish: 'Parkta yürüyoruz.' },
    ],
    difficultyScore: 30,
    nextReviewDate: Date.now(),
  },
  {
    id: '4',
    german: 'Entscheidung',
    turkish: 'Karar',
    gender: 'die',
    plural: 'die Entscheidungen',
    level: CEFRLevel.B1,
    category: 'Beruf',
    wordType: WordType.NOUN,
    examples: [
      { german: 'Das war eine schwierige Entscheidung.', turkish: 'Bu zor bir karardı.' },
    ],
    difficultyScore: 60,
    nextReviewDate: Date.now(),
  },
  {
    id: '5',
    german: 'nachhaltig',
    turkish: 'sürdürülebilir',
    level: CEFRLevel.B2,
    category: 'Umwelt',
    wordType: WordType.ADJECTIVE,
    examples: [
      { german: 'Wir brauchen nachhaltige Lösungen.', turkish: 'Sürdürülebilir çözümlere ihtiyacımız var.' },
    ],
    difficultyScore: 70,
    nextReviewDate: Date.now(),
  },
   {
    id: '6',
    german: 'Freiheit',
    turkish: 'Özgürlük',
    gender: 'die',
    plural: 'n/a',
    level: CEFRLevel.A2,
    category: 'Allgemein',
    wordType: WordType.NOUN,
    examples: [
      { german: 'Freiheit ist wichtig.', turkish: 'Özgürlük önemlidir.' },
    ],
    difficultyScore: 40,
    nextReviewDate: Date.now(),
  },
];
