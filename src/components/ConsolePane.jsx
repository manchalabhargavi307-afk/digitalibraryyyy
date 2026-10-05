import React, { useState } from 'react';
import { Terminal, Image as ImageIcon, CheckCircle2, Trash2, Clock, AlertTriangle, Download, Maximize2 } from 'lucide-react';

export const ConsolePane = ({
  stdout = '',
  stderr = '',
  images = [],
  executionTimeMs = null,
  expectedOutput = '',
  isRunning = false,
  onClear
}) => {
  const [activeTab, setActiveTab] = useState(() => (images && images.length > 0 ? 'plots' : 'terminal'));
  const [selectedImage, setSelectedImage] = useState(null);

  // If new images arrive and we aren't already on plots, automatically offer it or switch
  React.useEffect(() => {
    if (images && images.length > 0) {
      setActiveTab('plots');
    }
  }, [images]);

  const handleDownloadPlot = (dataUrl, index) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `plot_output_${index + 1}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#020617] border border-slate-800/80 overflow-hidden select-none">
      {/* Console Tab Header */}
      <div className="h-9 px-2 bg-[#060a12] border-b border-slate-800/80 flex items-center justify-between flex-shrink-0 text-xs">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t font-medium transition-colors ${
              activeTab === 'terminal'
                ? 'bg-[#020617] text-cyan-400 border-t-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal</span>
            {stderr && (
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('plots')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t font-medium transition-colors ${
              activeTab === 'plots'
                ? 'bg-[#020617] text-cyan-400 border-t-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Plots</span>
            {images.length > 0 && (
              <span className="px-1.5 py-0.2 bg-cyan-900/80 text-cyan-300 text-[10px] font-bold rounded-full border border-cyan-700/50">
                {images.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('expected')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t font-medium transition-colors ${
              activeTab === 'expected'
                ? 'bg-[#020617] text-cyan-400 border-t-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Expected Output</span>
          </button>
        </div>

        <div className="flex items-center gap-3 pr-2">
          {executionTimeMs !== null && !isRunning && (
            <span className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
              <Clock className="w-3 h-3 text-cyan-400" />
              Ran in {executionTimeMs}ms
            </span>
          )}

          {isRunning && (
            <span className="flex items-center gap-1.5 text-[11px] text-amber-300 font-mono animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Executing script...
            </span>
          )}

          <button
            onClick={onClear}
            title="Clear Console Output"
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 min-h-0 overflow-auto p-3 text-slate-200 font-mono text-xs select-text">
        {/* TAB 1: TERMINAL */}
        {activeTab === 'terminal' && (
          <div className="space-y-2">
            {!stdout && !stderr && !isRunning && (
              <div className="text-slate-500 italic p-4 text-center">
                Console idle. Click &quot;▶ Run Code&quot; (or press Ctrl+Enter) to execute the Python script.
              </div>
            )}

            {stdout && (
              <pre className="whitespace-pre-wrap font-mono text-slate-200 leading-relaxed bg-[#0a0f1d]/50 p-2.5 rounded-lg border border-slate-800/60">
                {stdout}
              </pre>
            )}

            {stderr && (
              <div className="bg-rose-950/40 border border-rose-800/60 p-3 rounded-lg text-rose-300">
                <div className="flex items-center gap-1.5 font-bold mb-1 text-rose-400">
                  <AlertTriangle className="w-4 h-4" /> Python Error Output:
                </div>
                <pre className="whitespace-pre-wrap font-mono text-xs">{stderr}</pre>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PLOTS & VISUALIZATIONS */}
        {activeTab === 'plots' && (
          <div className="h-full flex flex-col">
            {images.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-500">
                <ImageIcon className="w-10 h-10 mb-2 stroke-[1.2] text-slate-600" />
                <p className="text-sm font-sans">No plot figures generated yet.</p>
                <p className="text-xs text-slate-600 mt-1 max-w-sm font-sans">
                  Plots generated using <code>matplotlib.pyplot</code> or <code>seaborn</code> will automatically appear here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    className="group relative bg-white rounded-xl p-2 shadow-lg border border-slate-700/60 overflow-hidden flex flex-col items-center"
                  >
                    <img
                      src={imgSrc}
                      alt={`Generated plot figure ${idx + 1}`}
                      className="max-h-72 object-contain w-full cursor-zoom-in"
                      onClick={() => setSelectedImage(imgSrc)}
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/80 p-1 rounded-lg backdrop-blur-sm">
                      <button
                        onClick={() => setSelectedImage(imgSrc)}
                        title="Enlarge Plot"
                        className="p-1 text-white hover:text-cyan-300"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDownloadPlot(imgSrc, idx)}
                        title="Download PNG"
                        className="p-1 text-white hover:text-cyan-300"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: EXPECTED OUTPUT */}
        {activeTab === 'expected' && (
          <div className="space-y-3">
            <div className="text-xs text-slate-400 font-sans bg-blue-950/30 p-2.5 rounded-lg border border-blue-900/40">
              Compare your runtime execution result with this reference output:
            </div>
            <pre className="whitespace-pre-wrap font-mono text-emerald-300 bg-[#0a0f1d] p-3 rounded-lg border border-emerald-900/30 leading-relaxed">
              {expectedOutput || 'No expected output defined for this script.'}
            </pre>
          </div>
        )}
      </div>

      {/* Lightbox for enlarged plot view */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white p-2 rounded-2xl shadow-2xl">
            <img src={selectedImage} alt="Enlarged Plot" className="max-w-full max-h-[85vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};
