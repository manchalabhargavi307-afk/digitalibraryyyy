import React, { useState, useEffect } from 'react';
import { BookOpen, ListTree, StickyNote, CheckCircle, Search, Save, RotateCcw, ChevronDown, ChevronRight, Bookmark } from 'lucide-react';
import { experimentsData } from '../data/experimentsData';

export const ProblemSidebar = ({
  experiment,
  onSelectExperiment
}) => {
  const [activeTab, setActiveTab] = useState('description');
  const [filterTree, setFilterTree] = useState('');
  const [expandedModules, setExpandedModules] = useState({ 1: true, 2: true, 3: true, 4: true, 5: true });

  // Notes state with localStorage persistence
  const notesKey = `notes_${experiment.id}`;
  const [notes, setNotes] = useState(() => {
    try {
      return localStorage.getItem(notesKey) || experiment.aim || '';
    } catch {
      return experiment.aim || '';
    }
  });
  const [savedStatus, setSavedStatus] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(notesKey);
      setNotes(saved !== null ? saved : experiment.aim);
    } catch {
      setNotes(experiment.aim);
    }
  }, [experiment.id, notesKey, experiment.aim]);

  const handleSaveNotes = () => {
    try {
      localStorage.setItem(notesKey, notes);
      setSavedStatus('Saved!');
      setTimeout(() => setSavedStatus(''), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetNotes = () => {
    setNotes(experiment.aim);
    try {
      localStorage.removeItem(notesKey);
      setSavedStatus('Reset to default');
      setTimeout(() => setSavedStatus(''), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // Group experiments for the syllabus tree
  const moduleGroups = [
    { num: 1, title: 'Module 1: Foundations & Arrays (NumPy, Pandas)' },
    { num: 2, title: 'Module 2: Data Extraction & Preprocessing' },
    { num: 3, title: 'Module 3: Advanced Data Manipulation' },
    { num: 4, title: 'Module 4: Visualization & Time-Series Analytics' },
    { num: 5, title: 'Module 5: Machine Learning & Classification' }
  ];

  const toggleModule = (num) => {
    setExpandedModules(prev => ({ ...prev, [num]: !prev[num] }));
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#0b1120] border-r border-slate-800 text-slate-200 select-none overflow-hidden">
      {/* Sidebar Header Tabs */}
      <div className="h-9 px-2 bg-[#060a12] border-b border-slate-800/80 flex items-center justify-between flex-shrink-0 text-xs">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('description')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t font-medium transition-colors ${
              activeTab === 'description'
                ? 'bg-[#0b1120] text-cyan-400 border-t-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Description</span>
          </button>

          <button
            onClick={() => setActiveTab('syllabus')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t font-medium transition-colors ${
              activeTab === 'syllabus'
                ? 'bg-[#0b1120] text-cyan-400 border-t-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <ListTree className="w-3.5 h-3.5" />
            <span>Experiments</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t font-medium transition-colors ${
              activeTab === 'notes'
                ? 'bg-[#0b1120] text-cyan-400 border-t-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <StickyNote className="w-3.5 h-3.5" />
            <span>Notes</span>
          </button>
        </div>
      </div>

      {/* Panel Content */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 select-text">
        {/* TAB 1: DESCRIPTION & THEORY */}
        {activeTab === 'description' && (
          <div className="space-y-5 text-sm leading-relaxed">
            {/* Header / Title */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 font-mono text-xs font-bold">
                  Experiment {experiment.id}
                </span>
                <span className="text-xs text-slate-400">Course Code: 22DS102006</span>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                {experiment.title}
              </h2>
            </div>

            {/* AIM */}
            <div className="bg-[#0f172a] border border-cyan-900/40 rounded-xl p-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1.5 flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5" /> Aim
              </h3>
              <p className="text-slate-200 text-xs leading-relaxed font-sans">
                {experiment.aim}
              </p>
            </div>

            {/* CORE CONCEPTS */}
            {experiment.coreConcepts && experiment.coreConcepts.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Core Concepts
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {experiment.coreConcepts.map((concept, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* SYNTAX REFERENCE */}
            {experiment.syntax && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Syntax Reference
                </h3>
                <div className="bg-[#020617] border border-slate-800 rounded-xl p-3 font-mono text-xs text-cyan-300 overflow-x-auto leading-relaxed">
                  <pre className="whitespace-pre-wrap">{experiment.syntax}</pre>
                </div>
              </div>
            )}

            {/* DETAILED EXPLANATION / LAB PROCEDURE */}
            {experiment.html && (
              <div className="pt-2 border-t border-slate-800/80">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Detailed Explanation & Background
                </h3>
                <div
                  className="prose prose-invert prose-xs text-slate-300 max-w-none space-y-2 [&_h3]:text-cyan-400 [&_h3]:text-xs [&_h3]:font-bold [&_h3]:uppercase [&_h3]:mt-3 [&_code]:bg-slate-900 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-cyan-300 [&_code]:border [&_code]:border-slate-800 [&_ol]:list-decimal [&_ol]:pl-4 [&_ul]:list-disc [&_ul]:pl-4 text-xs"
                  dangerouslySetInnerHTML={{ __html: experiment.html }}
                />
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SYLLABUS / EXPERIMENT TREE */}
        {activeTab === 'syllabus' && (
          <div className="space-y-3">
            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={filterTree}
                onChange={e => setFilterTree(e.target.value)}
                placeholder="Filter lab syllabus..."
                className="w-full bg-[#020617] border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Tree listing */}
            <div className="space-y-2">
              {moduleGroups.map(mod => {
                const modExps = experimentsData.filter(e => {
                  const matchesMod = (e.moduleId === mod.num || Math.ceil(e.expNumber / 2) === mod.num);
                  if (!filterTree) return matchesMod;
                  const q = filterTree.toLowerCase();
                  return matchesMod && (
                    e.title.toLowerCase().includes(q) ||
                    e.id.toLowerCase().includes(q) ||
                    e.aim.toLowerCase().includes(q)
                  );
                });

                if (modExps.length === 0) return null;

                const isExpanded = expandedModules[mod.num] || filterTree.length > 0;

                return (
                  <div key={mod.num} className="border border-slate-800/80 rounded-xl overflow-hidden bg-[#070b16]/60">
                    <button
                      onClick={() => toggleModule(mod.num)}
                      className="w-full flex items-center justify-between p-2.5 bg-[#0a0f1d] hover:bg-slate-800/50 text-left text-xs font-semibold text-slate-300 transition-colors"
                    >
                      <span className="truncate pr-2">{mod.title}</span>
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-1 space-y-0.5">
                        {modExps.map(e => {
                          const isCurrent = e.id === experiment.id;
                          return (
                            <button
                              key={e.id}
                              onClick={() => onSelectExperiment(e.moduleId, e.id)}
                              className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between text-xs transition-colors ${
                                isCurrent
                                  ? 'bg-blue-600/20 text-cyan-300 font-medium border border-blue-500/40'
                                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span className="font-mono text-[11px] font-bold text-cyan-400">
                                  {e.id}
                                </span>
                                <span className="truncate">{e.title}</span>
                              </div>
                              {isCurrent && (
                                <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: OVERVIEW & NOTES */}
        {activeTab === 'notes' && (
          <div className="h-full flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Personal lab notes & observation log:
              </span>
              {savedStatus && (
                <span className="text-xs font-semibold text-emerald-400 animate-pulse">
                  {savedStatus}
                </span>
              )}
            </div>

            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Record your lab observations, answers to viva questions, or formula notes here..."
              className="flex-1 w-full min-h-[350px] p-3 bg-[#020617] border border-slate-800 rounded-xl text-xs text-slate-200 font-mono resize-none focus:outline-none focus:border-cyan-500 leading-relaxed"
            />

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={handleSaveNotes}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md transition-colors"
              >
                <Save className="w-3.5 h-3.5" /> Save Notes
              </button>
              <button
                onClick={handleResetNotes}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
