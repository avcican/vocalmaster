import React, { useState } from 'react';
import { Word } from '../types';

interface QuizModeProps {
  words: Word[];
  onComplete: (score: number) => void;
}

const QuizMode: React.FC<QuizModeProps> = ({ words, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Safety check to prevent crash if words array is empty
  if (!words || words.length === 0) {
    return (
      <div className="flex flex-col h-full justify-center items-center text-slate-500">
        <i className="fas fa-spinner fa-spin text-3xl mb-2"></i>
        <p>Quiz yükleniyor...</p>
      </div>
    );
  }

  // Helper to generate options
  const currentWord = words[currentIndex];
  
  // Create mock options by shuffling other words
  const options = React.useMemo(() => {
    if (!currentWord) return [];
    
    const others = words.filter(w => w.id !== currentWord.id)
                        .sort(() => 0.5 - Math.random())
                        .slice(0, 3)
                        .map(w => w.turkish);
    
    return [...others, currentWord.turkish].sort(() => 0.5 - Math.random());
  }, [currentWord, words]);

  const handleSelect = (option: string) => {
    if (selectedOption) return; // Prevent changing answer
    
    setSelectedOption(option);
    const correct = option === currentWord.turkish;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(s => s + 1);
    }

    setTimeout(() => {
      if (currentIndex < Math.min(words.length - 1, 9)) { // Limit to 10 questions max or list length
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsCorrect(null);
      } else {
        onComplete(score + (correct ? 1 : 0));
      }
    }, 1500);
  };

  const progress = ((currentIndex) / Math.min(words.length, 10)) * 100;

  return (
    <div className="flex flex-col h-full justify-center">
      <div className="mb-8">
        <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
          <span>Soru {currentIndex + 1}</span>
          <span>Skor: {score}</span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 text-center mb-6">
        <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold mb-4">
          Kelime Anlamı
        </span>
        <h2 className="text-4xl font-bold text-slate-800 mb-2">{currentWord.german}</h2>
        <p className="text-slate-400 text-sm">Aşağıdakilerden hangisi doğrudur?</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {options.map((option, idx) => {
          let bgClass = "bg-white hover:bg-slate-50 border-slate-200";
          let iconClass = "hidden";

          if (selectedOption) {
            if (option === currentWord.turkish) {
              bgClass = "bg-green-100 border-green-300 text-green-800";
              iconClass = "fa-check text-green-600";
            } else if (option === selectedOption) {
              bgClass = "bg-red-100 border-red-300 text-red-800";
              iconClass = "fa-times text-red-600";
            } else {
              bgClass = "bg-slate-50 border-slate-100 opacity-50";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              className={`w-full p-4 rounded-xl border-2 font-semibold text-left transition-all relative ${bgClass}`}
              disabled={!!selectedOption}
            >
              {option}
              <i className={`fas ${iconClass} absolute right-4 top-1/2 transform -translate-y-1/2`}></i>
            </button>
          );
        })}
      </div>
      
      {isCorrect !== null && (
        <div className={`mt-6 text-center font-bold text-lg animate-bounce ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
          {isCorrect ? "Harika!" : "Doğru cevap: " + currentWord.turkish}
        </div>
      )}
    </div>
  );
};

export default QuizMode;