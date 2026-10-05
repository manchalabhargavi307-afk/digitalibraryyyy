import React, { useState, useEffect, useCallback } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { WorkspaceHeader } from '../components/WorkspaceHeader';
import { ProblemSidebar } from '../components/ProblemSidebar';
import { MonacoEditorPane } from '../components/MonacoEditorPane';
import { ConsolePane } from '../components/ConsolePane';
import { QuickSwitcher } from '../components/QuickSwitcher';
import { pyodideManager } from '../services/pyodideService';
import { getExperimentById } from '../data/experimentsData';

export const WorkspacePage = ({
  expId = '4a',
  moduleId = 2,
  onNavigate
}) => {
  const experiment = getExperimentById(expId);

  // Storage key for user's code edits
  const codeStorageKey = `user_code_${experiment.id}`;

  // State
  const [code, setCode] = useState(() => {
    try {
      const saved = localStorage.getItem(codeStorageKey);
      return saved !== null ? saved : experiment.initialCode;
    } catch {
      return experiment.initialCode;
    }
  });

  const [stdout, setStdout] = useState('');
  const [stderr, setStderr] = useState('');
  const [images, setImages] = useState([]);
  const [executionTimeMs, setExecutionTimeMs] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const [pyodideStatus, setPyodideStatus] = useState({
    status: pyodideManager.status,
    message: pyodideManager.statusMessage
  });

  // Panel visibility states
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showConsolePanel, setShowConsolePanel] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  // When experiment changes, reload initial or saved code
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`user_code_${experiment.id}`);
      setCode(saved !== null ? saved : experiment.initialCode);
    } catch {
      setCode(experiment.initialCode);
    }
    setStdout('');
    setStderr('');
    setImages([]);
    setExecutionTimeMs(null);
  }, [experiment.id, experiment.initialCode]);

  // Subscribe to Pyodide status
  useEffect(() => {
    const unsubscribe = pyodideManager.subscribe(status => {
      setPyodideStatus(status);
    });

    // Start background preload
    pyodideManager.init().catch(err => {
      console.warn('Pyodide background preload:', err);
    });

    return unsubscribe;
  }, []);

  // Save code changes to localStorage
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    try {
      localStorage.setItem(codeStorageKey, newCode);
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetCode = () => {
    if (window.confirm('Reset code to original starter template for this experiment?')) {
      setCode(experiment.initialCode);
      try {
        localStorage.removeItem(codeStorageKey);
      } catch (e) {}
    }
  };

  const handleRunCode = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    setStdout('');
    setStderr('');
    if (!showConsolePanel) setShowConsolePanel(true);

    try {
      const result = await pyodideManager.runCode(code);
      setStdout(result.stdout || '');
      setStderr(result.stderr || '');
      setImages(result.images || []);
      setExecutionTimeMs(result.executionTimeMs);
    } catch (err) {
      setStderr(String(err?.message || err));
    } finally {
      setIsRunning(false);
    }
  }, [code, isRunning, showConsolePanel]);

  const handleClearConsole = () => {
    setStdout('');
    setStderr('');
    setImages([]);
    setExecutionTimeMs(null);
  };

  const handleFormatCode = () => {
    try {
      const cleaned = code
        .split('\n')
        .map(line => line.trimEnd())
        .join('\n');
      handleCodeChange(cleaned);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(prev => {
      const next = !prev;
      if (next) {
        setShowLeftPanel(false);
        setShowConsolePanel(false);
      } else {
        setShowLeftPanel(true);
        setShowConsolePanel(true);
      }
      return next;
    });
  };

  const handleSelectExperiment = (mod, exp) => {
    if (onNavigate) {
      onNavigate(mod, exp);
    } else {
      window.location.hash = `#/exp/${mod}/${exp}`;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#0f172a] text-slate-100 select-none">
      {/* 48px Fixed Workspace Header */}
      <WorkspaceHeader
        experiment={experiment}
        pyodideStatus={pyodideStatus}
        onRun={handleRunCode}
        onReset={handleResetCode}
        onFormat={handleFormatCode}
        isRunning={isRunning}
        onOpenSwitcher={() => setIsSwitcherOpen(true)}
        showLeftPanel={showLeftPanel}
        onToggleLeftPanel={() => setShowLeftPanel(p => !p)}
        showConsolePanel={showConsolePanel}
        onToggleConsolePanel={() => setShowConsolePanel(p => !p)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Main Workspace Body Split Panels */}
      <div className="flex-1 min-h-0 relative flex">
        <PanelGroup direction="horizontal">
          {/* LEFT: Problem & Context Sidebar */}
          {showLeftPanel && (
            <>
              <Panel defaultSize={28} minSize={18} maxSize={45} id="panel-problem">
                <ProblemSidebar
                  experiment={experiment}
                  onSelectExperiment={handleSelectExperiment}
                />
              </Panel>

              <PanelResizeHandle className="w-1.5 bg-[#090d16] hover:bg-cyan-500/70 active:bg-cyan-500 transition-colors cursor-col-resize flex items-center justify-center group z-10">
                <div className="w-0.5 h-7 bg-slate-700 group-hover:bg-cyan-300 rounded-full" />
              </PanelResizeHandle>
            </>
          )}

          {/* CENTER & BOTTOM/RIGHT: Code Editor + Console Panels */}
          <Panel defaultSize={showLeftPanel ? 72 : 100} minSize={30} id="panel-editor-console">
            <PanelGroup direction="vertical">
              {/* TOP: Monaco Code Editor */}
              <Panel defaultSize={showConsolePanel ? 58 : 100} minSize={25} id="panel-editor">
                <MonacoEditorPane
                  code={code}
                  onChange={handleCodeChange}
                  onRun={handleRunCode}
                  onReset={handleResetCode}
                  isRunning={isRunning}
                  fileName={experiment.id === 'tools' ? 'playground.py' : `exp_${experiment.id}.py`}
                />
              </Panel>

              {/* BOTTOM: Output Console & Visualizations */}
              {showConsolePanel && (
                <>
                  <PanelResizeHandle className="h-1.5 bg-[#090d16] hover:bg-cyan-500/70 active:bg-cyan-500 transition-colors cursor-row-resize flex items-center justify-center group z-10">
                    <div className="h-0.5 w-7 bg-slate-700 group-hover:bg-cyan-300 rounded-full" />
                  </PanelResizeHandle>

                  <Panel defaultSize={42} minSize={18} maxSize={80} id="panel-console">
                    <ConsolePane
                      stdout={stdout}
                      stderr={stderr}
                      images={images}
                      executionTimeMs={executionTimeMs}
                      expectedOutput={experiment.expectedOutput}
                      isRunning={isRunning}
                      onClear={handleClearConsole}
                    />
                  </Panel>
                </>
              )}
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>

      {/* Quick Experiment Switcher Modal */}
      <QuickSwitcher
        isOpen={isSwitcherOpen}
        onClose={() => setIsSwitcherOpen(false)}
        currentExpId={experiment.id}
        onSelectExperiment={handleSelectExperiment}
      />
    </div>
  );
};
