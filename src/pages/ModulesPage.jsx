import React, { useState } from 'react';
import { modulesData } from '../data/modulesData';
import { DataStreamBackground } from '../components/DataStreamBackground';
import { ThemeToggle } from '../components/ThemeToggle';
import { ArrowLeft, BookOpen, Edit3, Check, RotateCcw, Search, ChevronRight } from 'lucide-react';

export const ModulesPage = ({ moduleId = 1, onOpenIdCard, onOpenAbout }) => {
  const currentModIndex = Math.max(0, Math.min(modulesData.length - 1, (parseInt(moduleId, 10) || 1) - 1));
  const currentModule = modulesData[currentModIndex];

  const storageKey = `module_content_${currentModule.id}`;
  const [content, setContent] = useState(() => {
    try {
      return localStorage.getItem(storageKey) || currentModule.html;
    } catch {
      return currentModule.html;
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedHtml, setEditedHtml] = useState(content);

  const handleSave = () => {
    setContent(editedHtml);
    try {
      localStorage.setItem(storageKey, editedHtml);
    } catch (e) {
      console.error(e);
    }
    setIsEditing(false);
  };

  const handleReset = () => {
    if (window.confirm('Reset this module back to original syllabus notes?')) {
      setContent(currentModule.html);
      setEditedHtml(currentModule.html);
      try {
        localStorage.removeItem(storageKey);
      } catch (e) {}
      setIsEditing(false);
    }
  };

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-slate-100 font-sans pb-12 transition-colors duration-300">
      <DataStreamBackground />

      <div className="relative z-10 max-w-[1100px] mx-auto px-4 py-5">
        {/* Header Bar */}
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
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-cyan-400">MODULE {currentModule.id}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">DATA SCIENCE (22DS102006)</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                {currentModule.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-xs font-semibold shadow-md cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" /> Save Content
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              </>
            ) : (
              <button
                onClick={() => { setEditedHtml(content); setIsEditing(true); }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 hover:text-blue-600 border border-slate-300 dark:bg-[#071430] dark:hover:bg-[#0c234e] dark:text-slate-200 dark:hover:text-cyan-300 dark:border-cyan-500/30 rounded-lg text-xs font-medium transition-colors shadow-sm cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Content
              </button>
            )}
          </div>
        </div>

        {/* Module Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-3 my-2 scrollbar-none">
          {modulesData.map((m) => (
            <a
              key={m.id}
              href={`#/module/${m.id}`}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                m.id === currentModule.id
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-blue-500 shadow-md'
                  : 'bg-white/85 text-slate-700 hover:text-slate-900 border-slate-200 hover:border-slate-300 dark:bg-[#071430]/70 dark:text-slate-300 dark:hover:text-white dark:border-slate-800 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              Module {m.id}
            </a>
          ))}
        </div>

        {/* Content Viewer / Editor */}
        <div className="bg-white/95 dark:bg-[#071430]/85 border border-slate-200/90 dark:border-[rgba(125,190,255,0.22)] rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-xl">
          {isEditing ? (
            <textarea
              value={editedHtml}
              onChange={e => setEditedHtml(e.target.value)}
              className="w-full min-h-[550px] p-4 bg-slate-50 dark:bg-[#030817] border border-slate-300 dark:border-cyan-500/40 rounded-xl text-slate-900 dark:text-slate-100 font-mono text-xs leading-relaxed focus:outline-none"
            />
          ) : (
            <div
              className="max-w-none text-slate-800 dark:text-slate-200 text-sm leading-relaxed
                [&_h3]:text-blue-700 dark:[&_h3]:text-cyan-300 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:border-b [&_h3]:border-slate-200 dark:[&_h3]:border-slate-800 [&_h3]:pb-1.5
                [&_p]:my-3 [&_p]:text-slate-700 dark:[&_p]:text-slate-300
                [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_ul]:text-slate-700 dark:[&_ul]:text-slate-300
                [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1 [&_ol]:text-slate-700 dark:[&_ol]:text-slate-300
                [&_table]:w-full [&_table]:border-collapse [&_table]:my-4
                [&_th]:bg-slate-100 dark:[&_th]:bg-slate-800/80 [&_th]:p-2.5 [&_th]:text-left [&_th]:text-blue-700 dark:[&_th]:text-cyan-300 [&_th]:text-xs [&_th]:border [&_th]:border-slate-300 dark:[&_th]:border-slate-700
                [&_td]:p-2.5 [&_td]:border [&_td]:border-slate-200 dark:[&_td]:border-slate-800 [&_td]:text-xs"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
