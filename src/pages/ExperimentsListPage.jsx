import React, { useState } from 'react';
import { experimentsData } from '../data/experimentsData';
import { DataStreamBackground } from '../components/DataStreamBackground';
import { ThemeToggle } from '../components/ThemeToggle';
import { ArrowLeft, Search, ChevronRight } from 'lucide-react';

export const ExperimentsListPage = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Group by experiment number
  const grouped = {};
  for (let i = 1; i <= 10; i++) {
    grouped[i] = experimentsData.filter(e => e.expNumber === i);
  }

  const matchesSearch = (exp) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      exp.id.toLowerCase().includes(q) ||
      exp.title.toLowerCase().includes(q) ||
      exp.aim.toLowerCase().includes(q) ||
      exp.tags?.some(t => t.toLowerCase().includes(q))
    );
  };

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-100 font-sans pb-16 transition-colors duration-300">
      <DataStreamBackground />

      <div className="relative z-10 max-w-[1100px] mx-auto px-4 py-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <a
              href="#/"
              className="p-2 rounded-xl bg-white/90 hover:bg-slate-100 text-slate-700 hover:text-slate-900 dark:bg-slate-800/80 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            </a>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400">LABORATORY EXPERIMENTS</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">DATA SCIENCE (22DS102006)</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                Data Science Practical Curriculum
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search labs by topic or tag..."
                className="w-full bg-white dark:bg-[#071430]/90 border border-slate-300 dark:border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-400 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Experiment Groups 1 to 10 */}
        <div className="mt-6 space-y-5">
          {Array.from({ length: 10 }, (_, i) => i + 1).map(num => {
            const parts = grouped[num] || [];
            const filteredParts = parts.filter(matchesSearch);

            if (searchQuery && filteredParts.length === 0) return null;

            return (
              <div
                key={num}
                className="bg-white/90 dark:bg-[#071430]/85 border border-slate-200/90 dark:border-[rgba(125,190,255,0.22)] rounded-2xl p-5 shadow-lg dark:shadow-xl backdrop-blur-xl transition-all"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700/60 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-600/30 text-blue-700 dark:text-cyan-300 font-mono font-bold flex items-center justify-center border border-blue-300 dark:border-blue-500/40 text-sm">
                      {num}
                    </span>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      Experiment {num}
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {parts.length} {parts.length === 1 ? 'part' : 'sub-experiments'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredParts.map(exp => (
                    <div
                      key={exp.id}
                      onClick={() => onNavigate(exp.moduleId, exp.id)}
                      className="group p-3.5 rounded-xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-400 dark:bg-[#030817]/70 dark:hover:bg-[#0c234e]/80 dark:border-slate-800 dark:hover:border-cyan-400/60 transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-mono text-xs font-bold text-blue-600 dark:text-cyan-400 group-hover:text-blue-700 dark:group-hover:text-cyan-300">
                            Part {exp.partLetter.toUpperCase()} ({exp.id})
                          </span>
                          <span className="text-[11px] font-sans text-slate-500 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors flex items-center gap-1 font-semibold">
                            Launch Lab <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-900 dark:text-slate-100 dark:group-hover:text-white line-clamp-1 mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {exp.aim}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                        {exp.tags?.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
