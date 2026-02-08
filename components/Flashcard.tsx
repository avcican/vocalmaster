import React, { useState, useEffect } from 'react';
import { Word } from '../types';
import { LEVEL_COLORS } from '../constants';
import { generateAIExplanation, generateNewSentence } from '../services/geminiService';

interface FlashcardProps {
  word: Word;
  onResult: (quality: number) => void; // 0=Hard, 1=Good, 2=Easy
}

const Flashcard: React.FC<FlashcardProps> = ({ word, onResult }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAiContent, setShowAiContent] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiText, setAiText] = useState<string>('');
  const [currentExamples, setCurrentExamples] = useState(word.examples);

  useEffect(() => {
    // Reset state when word changes
    setIsFlipped(false);
    setShowAiContent(false);
    setAiText('');
    setCurrentExamples(word.examples);
  }, [word]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(word.german);
    utterance.lang = 'de-DE';
    window.speechSynthesis.speak(utterance);
  };

  const handleAIExplain = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (aiText) {
      setShowAiContent(!showAiContent);
      return;
    }
    
    setAiLoading(true);
    const text = await generateAIExplanation(word);
    setAiText(text);
    setAiLoading(false);
    setShowAiContent(true);
  };

  const handleNewExample = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setAiLoading(true);
    const newEx = await generateNewSentence(word);
    setCurrentExamples([...currentExamples, newEx]);
    setAiLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-4">
      {/* Card Container */}
      <div 
        className="relative w-full max-w-sm h-96 perspective-1000 cursor-pointer group"
        onClick={handleFlip}
      >
        <div 
          className={`relative w-full h-full text-center transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          {/* Front Side */}
          <div className="absolute w-full h-full backface-hidden bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center justify-center p-8">
            <span className={`absolute top-6 left-6 text-xs font-bold text-white px-2 py-1 rounded ${LEVEL_COLORS[word.level]}`}>
              {word.level}
            </span>
            <span className="absolute top-6 right-6 text-xs font-medium text-slate-400 uppercase tracking-wider">
              {word.category}
            </span>
            
            <div className="flex flex-col items-center gap-4">
               {word.gender && (
                 <span className={`text-sm font-semibold uppercase ${
                   word.gender === 'der' ? 'text-blue-500' : 
                   word.gender === 'die' ? 'text-pink-500' : 'text-green-500'
                 }`}>
                   {word.gender}
                 </span>
               )}
               <h2 className="text-5xl font-bold text-slate-800 mb-2">{word.german}</h2>
               {word.pronunciation && (
                 <span className="text-slate-400 font-mono text-sm">{word.pronunciation}</span>
               )}
            </div>

            <button 
              onClick={handleSpeak}
              className="mt-8 w-12 h-12 rounded-full bg-slate-50 text-indigo-600 hover:bg-indigo-50 flex items-center justify-center transition-colors"
            >
              <i className="fas fa-volume-up text-xl"></i>
            </button>
            
            <p className="absolute bottom-6 text-xs text-slate-400">
              Dokun ve çevir
            </p>
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-slate-800 text-white rounded-3xl shadow-xl flex flex-col p-8 overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
               <div className="text-left">
                 <h3 className="text-3xl font-bold mb-1">{word.turkish}</h3>
                 <p className="text-slate-400 text-sm italic">{word.wordType}</p>
                 {word.plural && <p className="text-slate-400 text-sm mt-1">Plural: {word.plural}</p>}
               </div>
               <button onClick={handleSpeak} className="text-slate-400 hover:text-white">
                 <i className="fas fa-volume-up"></i>
               </button>
            </div>

            <div className="space-y-4 mb-6 text-left flex-1">
              {currentExamples.map((ex, idx) => (
                <div key={idx} className="bg-slate-700/50 p-3 rounded-lg border-l-2 border-indigo-400">
                  <p className="text-sm font-medium mb-1">{ex.german}</p>
                  <p className="text-xs text-slate-400">{ex.turkish}</p>
                </div>
              ))}
              
              <div className="flex gap-2 mt-2">
                 <button 
                  onClick={handleNewExample}
                  disabled={aiLoading}
                  className="text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                >
                  {aiLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-magic"></i>}
                  Yeni Örnek
                </button>
              </div>

            </div>

            {/* AI Explanation Section */}
            {showAiContent && (
               <div className="bg-indigo-900/40 p-3 rounded-lg text-xs text-left mb-4 animate-fadeIn border border-indigo-500/30">
                 <div className="flex items-center gap-2 mb-1 text-indigo-300 font-bold">
                   <i className="fas fa-robot"></i> AI Koç
                 </div>
                 <p className="text-indigo-100 leading-relaxed">{aiText}</p>
               </div>
            )}

            <div className="mt-auto flex justify-center w-full">
               <button 
                 onClick={handleAIExplain}
                 className="text-xs text-indigo-300 hover:text-indigo-100 flex items-center gap-1"
               >
                 {showAiContent ? 'Gizle' : 'Bu kelimeyi açıkla'} <i className="fas fa-chevron-right"></i>
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      {isFlipped && (
        <div className="flex gap-4 w-full max-w-sm mt-8 animate-slideUp">
          <button 
            onClick={() => onResult(0)}
            className="flex-1 py-4 bg-red-100 text-red-600 rounded-2xl font-bold hover:bg-red-200 transition-colors flex flex-col items-center gap-1"
          >
            <i className="fas fa-times text-xl"></i>
            <span className="text-xs">Zor</span>
          </button>
           <button 
            onClick={() => onResult(1)}
            className="flex-1 py-4 bg-blue-100 text-blue-600 rounded-2xl font-bold hover:bg-blue-200 transition-colors flex flex-col items-center gap-1"
          >
            <i className="fas fa-check text-xl"></i>
            <span className="text-xs">İyi</span>
          </button>
          <button 
            onClick={() => onResult(2)}
            className="flex-1 py-4 bg-green-100 text-green-600 rounded-2xl font-bold hover:bg-green-200 transition-colors flex flex-col items-center gap-1"
          >
            <i className="fas fa-check-double text-xl"></i>
            <span className="text-xs">Kolay</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Flashcard;