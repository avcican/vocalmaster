import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Flashcard from './components/Flashcard';
import QuizMode from './components/QuizMode';
import { UserStats, ViewState, Word, CEFRLevel } from './types';
import { MOCK_WORDS, INITIAL_STATS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('dashboard');
  const [stats, setStats] = useState<UserStats>(INITIAL_STATS);
  const [sessionWords, setSessionWords] = useState<Word[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>(CEFRLevel.A1);

  // Setup practice session
  const startPractice = (level: CEFRLevel = CEFRLevel.A1) => {
    // In a real app, filtering logic would be more complex based on spaced repetition
    const filtered = MOCK_WORDS.filter(w => w.level === level || level === CEFRLevel.A1); 
    setSessionWords(filtered.length > 0 ? filtered : MOCK_WORDS);
    setCurrentCardIndex(0);
    setView('practice');
    setSelectedLevel(level);
  };

  const startQuiz = () => {
     // Simple quiz logic: take random 5 words
     const quizSet = [...MOCK_WORDS].sort(() => 0.5 - Math.random()).slice(0, 5);
     setSessionWords(quizSet);
     setView('quiz');
  };

  const handleCardResult = (quality: number) => {
    // 0: Hard, 1: Good, 2: Easy
    // Simulate updating stats
    if (quality > 0) {
      setStats(prev => ({
        ...prev,
        wordsLearned: prev.wordsLearned + 1,
        xp: prev.xp + (quality * 10),
      }));
    }

    if (currentCardIndex < sessionWords.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      // Session Complete
      alert("Seans tamamlandı! +50 XP");
      setStats(prev => ({ ...prev, streak: prev.streak, xp: prev.xp + 50 }));
      setView('dashboard');
    }
  };

  const handleQuizComplete = (score: number) => {
    alert(`Quiz bitti! Skorun: ${score}/${sessionWords.length}`);
    setStats(prev => ({ ...prev, xp: prev.xp + (score * 20) }));
    setView('dashboard');
  };

  const renderContent = () => {
    switch (view) {
      case 'dashboard':
        return (
          <Dashboard 
            stats={stats} 
            onStartPractice={() => startPractice(CEFRLevel.A1)}
          />
        );
      case 'practice':
        if (!sessionWords || sessionWords.length === 0) {
            return (
                <div className="h-full flex flex-col justify-center items-center text-slate-500">
                    <i className="fas fa-spinner fa-spin text-2xl mb-2"></i>
                    <span>Veriler yükleniyor...</span>
                </div>
            );
        }
        
        const currentWord = sessionWords[currentCardIndex];
        
        // Critical safety check to prevent crash if index is out of bounds
        if (!currentWord) {
            return (
                 <div className="h-full flex flex-col justify-center items-center text-red-500">
                    <i className="fas fa-exclamation-circle text-2xl mb-2"></i>
                    <span>Bir hata oluştu. Lütfen ana sayfaya dönün.</span>
                    <button 
                        onClick={() => setView('dashboard')}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                    >
                        Ana Sayfa
                    </button>
                </div>
            );
        }

        return (
          <div className="h-full flex flex-col">
             <div className="mb-2 flex justify-between items-center text-xs text-slate-400">
               <span>Kart {currentCardIndex + 1} / {sessionWords.length}</span>
               <span>{selectedLevel}</span>
             </div>
             <div className="h-1 bg-slate-100 rounded-full mb-4">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${((currentCardIndex + 1) / sessionWords.length) * 100}%` }}
                ></div>
             </div>
             <div className="flex-1">
               <Flashcard 
                 word={currentWord} 
                 onResult={handleCardResult} 
               />
             </div>
          </div>
        );
      case 'quiz':
        return (
          <QuizMode 
            words={sessionWords}
            onComplete={handleQuizComplete}
          />
        );
      default:
        return <div>Sayfa bulunamadı</div>;
    }
  };

  return (
    <Layout 
      userStats={stats} 
      currentView={view} 
      onNavigate={(v) => {
        if (v === 'quiz') startQuiz();
        else if (v === 'practice') startPractice(selectedLevel);
        else setView(v);
      }}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;