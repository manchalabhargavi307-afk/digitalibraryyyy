import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all duration-300 shadow-sm cursor-pointer select-none text-xs font-semibold backdrop-blur-md ${
        isDark
          ? 'bg-[#0b152d]/90 hover:bg-[#122246] text-amber-300 border-amber-500/30 hover:border-amber-400/60 shadow-[0_0_12px_rgba(251,191,36,0.15)]'
          : 'bg-white/90 hover:bg-slate-100 text-blue-600 border-slate-300/80 hover:border-blue-400 shadow-[0_2px_10px_rgba(0,0,0,0.06)]'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-300 animate-spin-slow transition-transform" />
        ) : (
          <Moon className="w-4 h-4 text-indigo-600 transition-transform" />
        )}
      </div>
      <span className={isDark ? "text-slate-200" : "text-slate-700"}>
        {isDark ? "Light" : "Dark"}
      </span>
    </button>
  );
};
