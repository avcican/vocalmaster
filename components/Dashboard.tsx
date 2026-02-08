import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { UserStats, CEFRLevel } from '../types';
import { LEVEL_COLORS } from '../constants';

interface DashboardProps {
  stats: UserStats;
  onStartPractice: () => void;
}

const data = [
  { name: 'Mon', words: 12 },
  { name: 'Tue', words: 18 },
  { name: 'Wed', words: 15 },
  { name: 'Thu', words: 24 },
  { name: 'Fri', words: 10 },
  { name: 'Sat', words: 30 },
  { name: 'Sun', words: 20 },
];

const Dashboard: React.FC<DashboardProps> = ({ stats, onStartPractice }) => {
  return (
    <div className="space-y-6">
      {/* Daily Goal Card */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <i className="fas fa-brain text-9xl transform rotate-12"></i>
        </div>
        <h2 className="text-xl font-bold mb-2">Günlük Hedef</h2>
        <p className="text-indigo-100 text-sm mb-4">20 yeni kelime öğrenmek için harika bir gün!</p>
        
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-white">
                İlerleme
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-white">
                60%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-800 bg-opacity-30">
            <div style={{ width: "60%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"></div>
          </div>
        </div>

        <button 
          onClick={onStartPractice}
          className="w-full py-3 bg-white text-indigo-600 font-bold rounded-xl shadow-md hover:bg-indigo-50 transition-colors"
        >
          Pratiğe Başla
        </button>
      </div>

      {/* Level Progress */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-3">Seviye İlerlemesi</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(stats.levelProgress).map(([level, progress]) => (
            <div key={level} className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm flex items-center gap-3">
               <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${LEVEL_COLORS[level as CEFRLevel]}`}>
                 {level}
               </div>
               <div className="flex-1">
                 <div className="flex justify-between text-xs mb-1">
                   <span className="font-medium text-slate-600">Mastery</span>
                   <span className="text-slate-400">{progress}%</span>
                 </div>
                 <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div 
                    className={`h-full ${LEVEL_COLORS[level as CEFRLevel]}`} 
                    style={{ width: `${progress}%` }}
                   ></div>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Haftalık Aktivite</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#94a3b8' }} 
              />
              <Tooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="words" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 5 ? '#6366f1' : '#cbd5e1'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;