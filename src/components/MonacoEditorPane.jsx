import React, { useRef, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Copy, Check, RotateCcw, FileCode, Map, Code2, AlertCircle } from 'lucide-react';

export const MonacoEditorPane = ({
  code,
  onChange,
  onRun,
  onReset,
  isRunning = false,
  fileName = 'solution.py'
}) => {
  const [copied, setCopied] = useState(false);
  const [showMinimap, setShowMinimap] = useState(false);
  const [useSimpleEditor, setUseSimpleEditor] = useState(false);
  const [monacoLoaded, setMonacoLoaded] = useState(false);
  const editorRef = useRef(null);

  // If Monaco doesn't load within 4 seconds, provide simple editor fallback option automatically
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!monacoLoaded) {
        // Just inform, keep editor accessible
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [monacoLoaded]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    setMonacoLoaded(true);

    try {
      monaco.editor.defineTheme('ds-dark-theme', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
          { token: 'keyword', foreground: '38bdf8', fontStyle: 'bold' },
          { token: 'string', foreground: 'a7f3d0' },
          { token: 'number', foreground: 'fcd34d' },
          { token: 'identifier', foreground: 'f1f5f9' },
        ],
        colors: {
          'editor.background': '#0f172a',
          'editor.foreground': '#f1f5f9',
          'editor.lineHighlightBackground': '#1e293b40',
          'editorLineNumber.foreground': '#475569',
          'editorLineNumber.activeForeground': '#38bdf8',
          'editorIndentGuide.background1': '#1e293b',
          'editorIndentGuide.activeBackground1': '#334155',
          'editorCursor.foreground': '#38bdf8',
        }
      });
      monaco.editor.setTheme('ds-dark-theme');

      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        onRun?.();
      });
    } catch (e) {
      console.warn('Monaco theme init warning:', e);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard shortcut listener for simple editor
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onRun?.();
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#0f172a] border border-slate-800/80 overflow-hidden">
      {/* Editor Sub-header */}
      <div className="h-9 px-3 bg-[#090d16] border-b border-slate-800/80 flex items-center justify-between flex-shrink-0 select-none text-xs">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[#0f172a] text-cyan-300 rounded border border-slate-700/60 font-mono text-[11px] font-semibold">
            <FileCode className="w-3.5 h-3.5 text-cyan-400" />
            {fileName}
          </span>
          <span className="hidden sm:inline text-[11px] text-slate-500 font-mono">
            {useSimpleEditor ? 'Simple Editor' : 'Monaco VS Code'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Toggle between Monaco and Simple Textarea */}
          <button
            onClick={() => setUseSimpleEditor(prev => !prev)}
            title={useSimpleEditor ? "Switch to Monaco VS Code" : "Switch to Simple Editor"}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition-colors text-[11px]"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{useSimpleEditor ? 'Monaco Mode' : 'Simple Mode'}</span>
          </button>

          {!useSimpleEditor && (
            <button
              onClick={() => setShowMinimap(prev => !prev)}
              title="Toggle Minimap"
              className={`p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors ${
                showMinimap ? 'bg-slate-800 text-cyan-300' : ''
              }`}
            >
              <Map className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={handleCopy}
            title="Copy Code"
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors text-[11px]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={onReset}
            title="Reset to starter template"
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors text-[11px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 min-h-0 relative bg-[#0f172a]">
        {useSimpleEditor ? (
          <textarea
            value={code}
            onChange={(e) => onChange?.(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            placeholder="# Write Python code here..."
            className="w-full h-full p-3 bg-[#0f172a] text-slate-100 font-mono text-[13.5px] leading-relaxed resize-none focus:outline-none border-none select-text"
          />
        ) : (
          <Editor
            height="100%"
            defaultLanguage="python"
            value={code}
            onChange={(val) => onChange?.(val || '')}
            onMount={handleEditorDidMount}
            theme="vs-dark"
            loading={
              <div className="h-full w-full flex flex-col items-center justify-center text-xs text-slate-400 font-mono gap-2 bg-[#0f172a]">
                <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <span>Initializing Monaco Editor...</span>
                <button
                  onClick={() => setUseSimpleEditor(true)}
                  className="mt-2 text-cyan-400 underline text-xs"
                >
                  Click here for Simple Fast Editor
                </button>
              </div>
            }
            options={{
              fontSize: 13.5,
              fontFamily: "'Fira Code', 'JetBrains Mono', Consolas, 'Courier New', monospace",
              fontLigatures: true,
              tabSize: 4,
              insertSpaces: true,
              minimap: { enabled: showMinimap },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              bracketPairColorization: { enabled: true },
              wordWrap: 'on',
              lineNumbers: 'on',
              renderWhitespace: 'selection',
              smoothScrolling: true,
              padding: { top: 8, bottom: 8 }
            }}
          />
        )}
      </div>
    </div>
  );
};
