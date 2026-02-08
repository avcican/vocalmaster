export enum CEFRLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1 = 'C1',
  C2 = 'C2',
}

export enum WordType {
  NOUN = 'noun',
  VERB = 'verb',
  ADJECTIVE = 'adjective',
  ADVERB = 'adverb',
  PHRASE = 'phrase',
}

export interface ExampleSentence {
  german: string;
  turkish: string;
}

export interface Word {
  id: string;
  german: string;
  turkish: string;
  gender?: 'der' | 'die' | 'das';
  plural?: string;
  level: CEFRLevel;
  category: string;
  wordType: WordType;
  examples: ExampleSentence[];
  pronunciation?: string; // IPA or simple phonetic
  difficultyScore: number; // 0-100
  nextReviewDate: number; // timestamp
}

export interface UserStats {
  streak: number;
  wordsLearned: number;
  xp: number;
  levelProgress: Record<CEFRLevel, number>; // Percentage 0-100
}

export type ViewState = 'onboarding' | 'dashboard' | 'practice' | 'quiz' | 'settings';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  type: 'multiple-choice' | 'fill-blank';
}