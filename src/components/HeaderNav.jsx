import React from 'react';
import { Home, BookOpen, FlaskConical, Wrench, CreditCard, User } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const HeaderNav = ({ currentHash = '', onOpenIdCard, onOpenAbout }) => {
  const items = [
    { label: 'Home', hash: '#/', icon: Home },
    { label: 'Modules', hash: '#/modules', icon: BookOpen },
    { label: 'Experiments', hash: '#/exps', icon: FlaskConical },
    { label: 'Tools', hash: '#/tools', icon: Wrench },
    { label: 'ID Card', action: onOpenIdCard, icon: CreditCard },
    { label: 'About Me', action: onOpenAbout, icon: User }
  ];

  return (
    <div className="flex flex-wrap items-center gap-2.5 mt-3">
      <nav className="flex flex-wrap gap-2">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isActive = item.hash && (currentHash === item.hash || (item.hash !== '#/' && currentHash.startsWith(item.hash)));

          if (item.action) {
            return (
              <button
                key={idx}
                onClick={item.action}
                className="flex flex-col items-center gap-1 bg-white/85 hover:bg-slate-100 text-slate-700 hover:text-blue-600 border border-slate-200 hover:border-blue-400 dark:bg-[#071430]/80 dark:hover:bg-[#0c234e] dark:text-slate-200 dark:hover:text-cyanAccent dark:border-[rgba(125,190,255,0.20)] dark:hover:border-cyanAccent px-3 py-1.5 rounded-xl transition-all text-xs font-medium shadow-sm backdrop-blur-md cursor-pointer"
              >
                <Icon className="w-4 h-4 text-blue-600 dark:text-cyanAccent" />
                <span>{item.label}</span>
              </button>
            );
          }

          return (
            <a
              key={idx}
              href={item.hash}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl border transition-all text-xs font-medium shadow-sm backdrop-blur-md cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-blue-500 shadow-md ring-2 ring-blue-400/30'
                  : 'bg-white/85 hover:bg-slate-100 text-slate-700 hover:text-blue-600 border-slate-200 hover:border-blue-400 dark:bg-[#071430]/80 dark:hover:bg-[#0c234e] dark:text-slate-200 dark:hover:text-cyanAccent dark:border-[rgba(125,190,255,0.20)] dark:hover:border-cyanAccent'
              }`}
            >
              <Icon className="w-4 h-4 text-blue-600 dark:text-cyanAccent" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Prominent Theme Toggle Button */}
      <div className="flex items-center ml-auto">
        <ThemeToggle />
      </div>
    </div>
  );
};
