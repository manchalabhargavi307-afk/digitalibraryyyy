import React from 'react';
import {
  ArrowLeft,
  Play,
  RotateCcw,
  Sparkles,
  Columns,
  Maximize2,
  Minimize2,
  ChevronDown,
  Layers,
  Terminal,
  BookOpen
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const WorkspaceHeader = ({
  experiment,
  pyodideStatus,
  onRun,
  onReset,
  onFormat,
  isRunning,
  onOpenSwitcher,
  showLeftPanel,
  onToggleLeftPanel,
  showConsolePanel,
  onToggleConsolePanel,
  isFullscreen,
  onToggleFullscreen
}) => {
  return (
    <header className="h-12 w-full bg-[#090d16] border-b border-slate-800 flex items-center justify-between px-3 flex-shrink-0 z-30 select-none">
      {/* LEFT SECTION: Back to Home, Subject, Breadcrumbs */}
      <div className="flex items-center gap-2.5 min-w-0">
        <a
          href="#/"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700/60 transition-colors shadow-sm cursor-pointer"
          title="Return to Home Dashboard"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Home</span>
        </a>

        <div className="h-4 w-px bg-slate-800 hidden sm:block" />

        <div className="flex items-center gap-1.5 truncate">
          <span className="hidden md:inline-block px-2 py-0.5 rounded bg-blue-950/70 border border-blue-800/50 text-blue-300 text-[10px] font-bold uppercase tracking-wider font-mono">
            {experiment.id === 'tools' ? 'PLAYGROUND' : '22DS102006'}
          </span>

          <span className="text-slate-400 text-xs hidden sm:inline">/</span>

          <span className="text-cyan-300 text-xs font-semibold font-mono">
            {experiment.id === 'tools' ? 'Tools Sandbox' : `Exp ${experiment.id}`}
          </span>

          <span className="text-slate-500 text-xs hidden lg:inline">•</span>

          <span className="text-slate-300 text-xs truncate max-w-[200px] lg:max-w-xs hidden sm:inline">
            {experiment.title}
          </span>
        </div>
      </div>

      {/* CENTER SECTION: Quick Switcher Dropdown */}
      <div className="flex items-center">
        <button
          onClick={onOpenSwitcher}
          className="flex items-center gap-2 px-3 py-1 rounded-lg bg-[#0f172a] hover:bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-200 hover:text-cyan-300 transition-all shadow-sm cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Switch Lab</span>
          <span className="sm:hidden font-mono font-bold text-cyan-400">{experiment.id}</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>
      </div>

      {/* RIGHT SECTION: Runtime Status, Action Buttons & Theme/Panel Toggles */}
      <div className="flex items-center gap-2">
        {/* Pyodide Runtime Status Pill */}
        <div
          title={pyodideStatus?.message || ''}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono border backdrop-blur-sm"
          style={{
            backgroundColor:
              pyodideStatus?.status === 'ready' ? 'rgba(6, 78, 59, 0.4)' :
              pyodideStatus?.status === 'loading' ? 'rgba(120, 53, 15, 0.4)' :
              pyodideStatus?.status === 'running' ? 'rgba(30, 58, 138, 0.4)' : 'rgba(30, 41, 59, 0.6)',
            borderColor:
              pyodideStatus?.status === 'ready' ? 'rgba(52, 211, 153, 0.3)' :
              pyodideStatus?.status === 'loading' ? 'rgba(251, 191, 36, 0.3)' :
              pyodideStatus?.status === 'running' ? 'rgba(96, 165, 250, 0.4)' : 'rgba(100, 116, 139, 0.4)',
            color:
              pyodideStatus?.status === 'ready' ? '#34d399' :
              pyodideStatus?.status === 'loading' ? '#fbbf24' :
              pyodideStatus?.status === 'running' ? '#60a5fa' : '#94a3b8'
          }}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              pyodideStatus?.status === 'ready' ? 'bg-emerald-400' :
              pyodideStatus?.status === 'loading' ? 'bg-amber-400 animate-ping' :
              pyodideStatus?.status === 'running' ? 'bg-blue-400 animate-pulse' : 'bg-slate-500'
            }`}
          />
          <span className="capitalize">
            {pyodideStatus?.status === 'ready' ? 'Pyodide Ready' :
             pyodideStatus?.status === 'loading' ? 'Initializing...' :
             pyodideStatus?.status === 'running' ? 'Executing...' : 'Python Ready'}
          </span>
        </div>

        {/* Format / Tidy Button */}
        <button
          onClick={onFormat}
          title="Auto-format / Indent Python Code"
          className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium border border-slate-700/60 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden xl:inline">Format</span>
        </button>

        {/* Primary RUN CODE button */}
        <button
          onClick={onRun}
          disabled={isRunning}
          title="Run Code (Ctrl + Enter)"
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-lg cursor-pointer ${
            isRunning
              ? 'bg-blue-600/80 text-white cursor-wait'
              : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold active:scale-95 shadow-emerald-500/20'
          }`}
        >
          <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : 'fill-current'}`} />
          <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          <span className="hidden lg:inline text-[10px] opacity-75 font-normal ml-0.5">
            (Ctrl+↵)
          </span>
        </button>

        <div className="h-4 w-px bg-slate-800 mx-0.5 hidden sm:block" />

        {/* Theme Toggle in Workspace Header */}
        <div className="hidden sm:flex items-center">
          <ThemeToggle />
        </div>

        {/* View / Panel Toggle Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={onToggleLeftPanel}
            title={showLeftPanel ? "Hide Theory Sidebar" : "Show Theory Sidebar"}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              showLeftPanel
                ? 'bg-slate-800 text-cyan-300 border-slate-700'
                : 'bg-transparent text-slate-500 hover:text-slate-300 border-transparent hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleConsolePanel}
            title={showConsolePanel ? "Hide Console Output" : "Show Console Output"}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              showConsolePanel
                ? 'bg-slate-800 text-cyan-300 border-slate-700'
                : 'bg-transparent text-slate-500 hover:text-slate-300 border-transparent hover:bg-slate-800/50'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onToggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen Editor" : "Fullscreen Editor"}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
