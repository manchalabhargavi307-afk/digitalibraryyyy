import React, { useState } from 'react';
import { MBU_LOGO } from '../data/assets';
import { HeaderNav } from '../components/HeaderNav';
import { StudentCard } from '../components/StudentCard';
import { IdCardModal } from '../components/IdCardModal';
import { AboutModal } from '../components/AboutModal';
import { DataStreamBackground } from '../components/DataStreamBackground';
import { experimentsData } from '../data/experimentsData';
import { BookOpen, FlaskConical, Wrench, ChevronRight, X } from 'lucide-react';

export const HomePage = ({ onNavigate, onOpenTools }) => {
  const [isIdCardOpen, setIsIdCardOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [activeExpModal, setActiveExpModal] = useState(null);

  // Group experiments by number (1 to 10)
  const expNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleExpClick = (num) => {
    const matching = experimentsData.filter(e => e.expNumber === num);
    if (matching.length === 1) {
      const exp = matching[0];
      onNavigate(exp.moduleId, exp.id);
    } else if (matching.length > 1) {
      setActiveExpModal({ num, parts: matching });
    } else {
      onNavigate(1, `${num}a`);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-100 font-sans overflow-x-hidden transition-colors duration-300">
      {/* Brand New Interactive Neural Constellation & Data Stream Canvas */}
      <DataStreamBackground />

      <div className="relative z-10 max-w-[1180px] mx-auto px-4 py-4 md:py-6">
        {/* University Crest Header */}
        <div className="flex justify-center mb-4">
          <div className="bg-white/95 dark:bg-gradient-to-r dark:from-white dark:via-cyan-50 dark:to-white px-6 py-2 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_0_30px_rgba(65,183,255,0.35)] border border-slate-200/80 dark:border-cyan-200/50 transform hover:scale-[1.02] transition-transform">
            <img src={MBU_LOGO} alt="Mohan Babu University" className="h-12 md:h-14 object-contain" />
          </div>
        </div>

        {/* Top Hero Section */}
        <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
          {/* Left Brand Header & Nav */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white text-2xl shadow-lg flex-shrink-0">
                🏠
              </div>
              <div>
                <span className="block text-[11px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                  HOME
                </span>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-600 dark:from-cyan-300 dark:via-cyan-400 dark:to-blue-400 leading-tight drop-shadow-sm">
                  DATA SCIENCE
                </h1>
                <p className="text-xs md:text-sm font-semibold tracking-widest text-slate-600 dark:text-slate-400 uppercase mt-0.5">
                  SUBJECT: DIGITAL LIBRARY
                </p>
              </div>
            </div>

            {/* Navigation Pills with Theme Toggle */}
            <HeaderNav
              currentHash="#/"
              onOpenIdCard={() => setIsIdCardOpen(true)}
              onOpenAbout={() => setIsAboutOpen(true)}
            />
          </div>

          {/* Right Student Profile Card */}
          <StudentCard
            onOpenIdCard={() => setIsIdCardOpen(true)}
            onOpenAbout={() => setIsAboutOpen(true)}
            onZoomAvatar={(src) => setZoomedImage(src)}
          />
        </div>

        {/* Dashboard Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7">
          {/* Card 1: MODULES */}
          <div className="bg-white/90 dark:bg-gradient-to-br dark:from-[#0c234e]/85 dark:to-[#040f25]/85 border border-slate-200/90 dark:border-[rgba(125,190,255,0.22)] rounded-2xl p-5 shadow-xl backdrop-blur-xl hover:border-blue-400 dark:hover:border-cyan-400/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-lg">📚</span> MODULES
                </h2>
                <span className="text-xs text-blue-600 dark:text-cyan-300 font-mono font-medium">5 Modules</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                Comprehensive lecture notes, 3Vs of data, preprocessing, and statistical analytics.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {[1, 2, 3, 4, 5].map(num => (
                  <a
                    key={num}
                    href={`#/module/${num}`}
                    className="min-w-[54px] px-4 py-2.5 text-center font-bold text-lg rounded-xl bg-slate-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 text-slate-800 hover:text-white border border-slate-200 hover:border-blue-400 dark:bg-[#030817] dark:hover:bg-gradient-to-r dark:hover:from-blue-600 dark:hover:to-cyan-500 dark:text-slate-200 dark:hover:text-white dark:border-[rgba(125,190,255,0.20)] dark:hover:border-cyan-400 transition-all shadow-sm cursor-pointer"
                  >
                    {num}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-700/40">
              <a
                href="#/modules"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-cyan-300 dark:hover:text-cyan-200"
              >
                <span>Browse All Syllabus Notes</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: LAB EXPERIMENTS */}
          <div className="bg-white/90 dark:bg-gradient-to-br dark:from-[#0c234e]/85 dark:to-[#040f25]/85 border border-slate-200/90 dark:border-[rgba(125,190,255,0.22)] rounded-2xl p-5 shadow-xl backdrop-blur-xl hover:border-blue-400 dark:hover:border-cyan-400/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-lg">🧪</span> LAB EXPERIMENTS
                </h2>
                <span className="text-xs text-blue-600 dark:text-cyan-300 font-mono font-medium">10 Labs (25 Parts)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                Interactive Python lab codes with real-time compilation, plots, and expected outputs.
              </p>
              <div className="flex flex-wrap gap-2">
                {expNumbers.map(num => {
                  const parts = experimentsData.filter(e => e.expNumber === num);
                  const hasSub = parts.length > 1;
                  return (
                    <button
                      key={num}
                      onClick={() => handleExpClick(num)}
                      className="min-w-[48px] px-3.5 py-2 text-center font-bold text-base rounded-xl bg-slate-100 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 text-slate-800 hover:text-white border border-slate-200 hover:border-blue-400 dark:bg-[#030817] dark:hover:bg-gradient-to-r dark:hover:from-blue-600 dark:hover:to-cyan-500 dark:text-slate-200 dark:hover:text-white dark:border-[rgba(125,190,255,0.20)] dark:hover:border-cyan-400 transition-all relative group shadow-sm cursor-pointer"
                    >
                      {num}
                      {hasSub && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-cyan-400 ring-2 ring-white dark:ring-[#030817]"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-700/40">
              <a
                href="#/exps"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-cyan-300 dark:hover:text-cyan-200"
              >
                <span>View Full Lab Directory</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 3: TOOLS / PYTHON PLAYGROUND */}
          <div className="bg-white/90 dark:bg-gradient-to-br dark:from-[#0c234e]/85 dark:to-[#040f25]/85 border border-slate-200/90 dark:border-[rgba(125,190,255,0.22)] rounded-2xl p-5 shadow-xl backdrop-blur-xl hover:border-blue-400 dark:hover:border-cyan-400/50 transition-all flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="text-lg">🛠️</span> TOOLS & PLAYGROUND
                </h2>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-medium">Pyodide Wasm</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
                Run real Data Science experiments directly in the browser with Pyodide without installing Python locally.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-[#030817]/80 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1.5 font-mono">
                <div>✓ NumPy, Pandas, Scipy</div>
                <div>✓ Matplotlib & Seaborn Graphics</div>
                <div>✓ Scikit-Learn ML Models</div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-700/40">
              <button
                onClick={() => {
                  if (onOpenTools) onOpenTools();
                  else window.location.hash = '#/tools';
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 dark:shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <Wrench className="w-4 h-4" />
                <span>Launch Interactive Playground</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <footer className="mt-12 text-center text-xs text-slate-500 dark:text-slate-500 border-t border-slate-200 dark:border-slate-800/80 pt-6 pb-4">
          <p>Mohan Babu University · Department of Computer Science & Engineering (Data Science)</p>
          <p className="mt-1 font-mono text-[11px] text-slate-500 dark:text-slate-600">Course Code: 22DS102006 • Student Portal v2.0</p>
        </footer>
      </div>

      {/* Sub-experiment Picker Modal */}
      {activeExpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white dark:bg-[#0f172a] border border-slate-200 dark:border-cyan-500/40 rounded-2xl p-5 shadow-2xl">
            <button
              onClick={() => setActiveExpModal(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <span className="text-blue-600 dark:text-cyan-400 font-mono">Exp {activeExpModal.num}</span>
              <span>Select Sub-Experiment</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              This laboratory exercise contains {activeExpModal.parts.length} distinct parts:
            </p>
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {activeExpModal.parts.map(part => (
                <button
                  key={part.id}
                  onClick={() => {
                    const mId = part.moduleId;
                    const pId = part.id;
                    setActiveExpModal(null);
                    onNavigate(mId, pId);
                  }}
                  className="w-full text-left p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-400 dark:bg-[#090e1a] dark:hover:bg-blue-900/30 dark:border-slate-800 dark:hover:border-cyan-500/50 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="min-w-0 pr-3">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400 block mb-0.5">
                      Part {part.partLetter.toUpperCase()} ({part.id})
                    </span>
                    <p className="text-xs text-slate-800 group-hover:text-blue-900 dark:text-slate-200 dark:group-hover:text-white font-medium truncate">
                      {part.title}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:text-slate-500 dark:group-hover:text-cyan-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox for Zoomed Image */}
      {zoomedImage && (
        <div
          onClick={() => setZoomedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-zoom-out animate-fadeIn"
        >
          <img
            src={zoomedImage}
            alt="Enlarged view"
            className="max-w-[90vw] max-h-[85vh] rounded-2xl border-2 border-cyan-400 shadow-2xl object-contain"
          />
        </div>
      )}

      {/* ID Card Modal */}
      <IdCardModal
        isOpen={isIdCardOpen}
        onClose={() => setIsIdCardOpen(false)}
        onZoomAvatar={(src) => setZoomedImage(src)}
      />

      {/* About Me Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
};
