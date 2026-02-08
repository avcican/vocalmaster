import React from 'react';
import { UserStats, ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  userStats: UserStats;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, userStats, currentView, onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-slate-200">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm z-10 flex justify-between items-center sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-red-500 rounded-lg flex items-center justify-center text-white font-bold">
            DE
          </div>
          <h1 className="font-bold text-lg tracking-tight">VocabMaster</h1>
        </div>
        
        <div className="flex items-center gap-3 text-sm font-medium">
          <div className="flex items-center gap-1 text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
            <i className="fas fa-fire"></i>
            <span>{userStats.streak}</span>
          </div>
          <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            <i className="fas fa-star"></i>
            <span>{userStats.xp}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto scrollbar-hide p-4 pb-24">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-20">
        <button 
          onClick={() => onNavigate('dashboard')}
          className={`flex flex-col items-center gap-1 ${currentView === 'dashboard' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <i className="fas fa-home text-xl"></i>
          <span className="text-xs font-medium">Home</span>
        </button>
        
        <button 
          onClick={() => onNavigate('practice')}
          className="flex flex-col items-center gap-1 -mt-8"
        >
          <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg text-white hover:bg-indigo-700 transition-colors border-4 border-slate-50">
             <i className="fas fa-layer-group text-2xl"></i>
          </div>
          <span className="text-xs font-medium text-indigo-600">Learn</span>
        </button>
        
        <button 
          onClick={() => onNavigate('quiz')}
          className={`flex flex-col items-center gap-1 ${currentView === 'quiz' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          <i className="fas fa-trophy text-xl"></i>
          <span className="text-xs font-medium">Quiz</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;