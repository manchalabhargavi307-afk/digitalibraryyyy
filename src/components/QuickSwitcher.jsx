import React, { useState } from 'react';
import { Search, ChevronRight, X, FlaskConical, Hash } from 'lucide-react';
import { experimentsData } from '../data/experimentsData';

export const QuickSwitcher = ({ isOpen, onClose, currentExpId, onSelectExperiment }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = experimentsData.filter(exp => {
    const q = query.toLowerCase();
    return (
      exp.id.toLowerCase().includes(q) ||
      exp.title.toLowerCase().includes(q) ||
      `exp ${exp.expNumber}`.includes(q) ||
      exp.tags?.some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]">
        {/* Search header */}
        <div className="p-3.5 border-b border-slate-800 flex items-center gap-3 bg-[#0a0f1d]">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search experiments by number, title, or topic (e.g. 5, time series, matplotlib)..."
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results list */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-800/60">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-sm text-slate-500">
              No matching experiments found for "{query}".
            </div>
          ) : (
            filtered.map(exp => {
              const isCurrent = exp.id === currentExpId;
              return (
                <button
                  key={exp.id}
                  onClick={() => {
                    onSelectExperiment(exp.moduleId, exp.id);
                    onClose();
                  }}
                  className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all ${
                    isCurrent
                      ? 'bg-blue-600/20 border border-blue-500/40 text-blue-200'
                      : 'hover:bg-slate-800/70 text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-800 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center border border-slate-700">
                      {exp.id}
                    </span>
                    <div>
                      <div className="text-sm font-semibold flex items-center gap-2">
                        <span>Experiment {exp.id}</span>
                        <span className="text-slate-400 font-normal truncate max-w-xs sm:max-w-sm">
                          {exp.title}
                        </span>
                      </div>
                      <div className="flex gap-1.5 mt-1">
                        {exp.tags?.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
                </button>
              );
            })
          )}
        </div>

        <div className="p-2.5 bg-[#0a0f1d] border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between px-4">
          <span>{filtered.length} experiments available</span>
          <span>Tip: Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
