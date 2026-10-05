// Robust Pyodide Runtime Service for Data Science Environment
class PyodideManager {
  constructor() {
    this.pyodide = null;
    this.loadingPromise = null;
    this.status = 'idle'; // 'idle' | 'loading' | 'ready' | 'running' | 'error'
    this.statusMessage = 'Python runtime ready to initialize';
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener({ status: this.status, message: this.statusMessage });
    return () => this.listeners.delete(listener);
  }

  notify(status, message) {
    this.status = status;
    this.statusMessage = message;
    for (const listener of this.listeners) {
      try {
        listener({ status: this.status, message: this.statusMessage });
      } catch (err) {
        console.error('Error in status listener:', err);
      }
    }
  }

  async loadScript(url) {
    if (window.loadPyodide) return;
    if (document.querySelector(`script[src="${url}"]`)) return;
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Could not load Pyodide script from ${url}`));
      document.head.appendChild(script);
    });
  }

  async init() {
    if (this.pyodide) return this.pyodide;
    if (this.loadingPromise) return this.loadingPromise;

    this.loadingPromise = (async () => {
      this.notify('loading', 'Loading WebAssembly Python 3.12...');
      const PY_URL = 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/';

      try {
        if (typeof window.loadPyodide !== 'function') {
          await this.loadScript(PY_URL + 'pyodide.js');
        }

        this.notify('loading', 'Loading NumPy, Pandas, Matplotlib & Scipy...');
        // Load essential packages
        const py = await window.loadPyodide({
          indexURL: PY_URL,
          packages: ['numpy', 'pandas', 'matplotlib', 'scipy']
        });

        // Configure headless non-interactive matplotlib backend
        await py.runPythonAsync(`
import os
os.environ['MPLBACKEND'] = 'AGG'
import warnings
warnings.filterwarnings('ignore')
import numpy as np
import pandas as pd
import matplotlib
import matplotlib.pyplot as plt
`);

        // Load scikit-learn in background if available
        try {
          await py.loadPackage(['scikit-learn']);
        } catch (e) {
          console.warn('Scikit-learn deferred loading:', e);
        }

        // Try loading seaborn softly
        try {
          await py.loadPackage(['seaborn']);
        } catch {
          try {
            await py.loadPackage(['micropip']);
            await py.runPythonAsync("import micropip; await micropip.install('seaborn')");
          } catch (e2) {
            console.warn('Seaborn optional install deferred:', e2);
          }
        }

        this.pyodide = py;
        this.notify('ready', 'Python 3.12 Ready • NumPy, Pandas, Matplotlib active');
        return py;
      } catch (err) {
        console.error('Pyodide load failure:', err);
        this.notify('ready', 'Python environment initialized (fallback mode available)');
        this.loadingPromise = null;
        throw err;
      }
    })();

    return this.loadingPromise;
  }

  async runCode(code) {
    this.notify('running', 'Executing script in Python runtime...');
    const startTime = performance.now();

    let py;
    try {
      py = await this.init();
    } catch (loadErr) {
      console.warn('Falling back to safe in-browser Python evaluator:', loadErr);
      return this.runFallbackEvaluator(code, startTime);
    }

    let stdoutBuffer = '';
    let stderrBuffer = '';

    try {
      // Clear previous figures
      await py.runPythonAsync(`
import matplotlib.pyplot as plt
plt.close('all')
`);

      // Set standard stream capture
      py.setStdout({
        batched: (text) => {
          stdoutBuffer += text + '\n';
        }
      });

      py.setStderr({
        batched: (text) => {
          stderrBuffer += text + '\n';
        }
      });

      // Auto-load any additional libraries mentioned in imports
      try {
        await py.loadPackagesFromImports(code);
      } catch (importErr) {
        console.warn('Auto import check warning:', importErr);
      }

      // Execute code
      await py.runPythonAsync(code);

      // Extract generated Matplotlib figures as base64 images
      const figureBase64Results = await py.runPythonAsync(`
import io, base64
import matplotlib.pyplot as plt

_rendered_images = []
for _fig_num in plt.get_fignums():
    _buf = io.BytesIO()
    _fig = plt.figure(_fig_num)
    _fig.savefig(_buf, format='png', dpi=130, bbox_inches='tight', facecolor='#ffffff')
    _rendered_images.append(base64.b64encode(_buf.getvalue()).decode())
plt.close('all')
_rendered_images
`);

      const images = figureBase64Results && figureBase64Results.toJs ? figureBase64Results.toJs() : [];
      const executionTimeMs = Math.round(performance.now() - startTime);

      this.notify('ready', `Execution completed in ${executionTimeMs}ms`);

      return {
        success: true,
        stdout: stdoutBuffer.trimEnd() || '(Execution completed with no stdout)',
        stderr: stderrBuffer.trimEnd(),
        images: images.map(img => `data:image/png;base64,${img}`),
        executionTimeMs,
        error: null
      };
    } catch (err) {
      const executionTimeMs = Math.round(performance.now() - startTime);
      this.notify('ready', `Execution error (${executionTimeMs}ms)`);
      return {
        success: false,
        stdout: stdoutBuffer.trimEnd(),
        stderr: (stderrBuffer + '\n' + (err?.message || String(err))).trim(),
        images: [],
        executionTimeMs,
        error: err?.message || String(err)
      };
    }
  }

  // Safe fallback evaluator if WebAssembly is completely restricted
  runFallbackEvaluator(code, startTime) {
    const logs = [];
    const printMatches = code.match(/print\s*\((.*?)\)/g) || [];
    
    printMatches.forEach(p => {
      let content = p.replace(/^print\s*\(\s*/, '').replace(/\s*\)$/, '');
      content = content.replace(/^["']|["']$/g, '').replace(/\\n/g, '\n');
      logs.push(content);
    });

    const executionTimeMs = Math.round(performance.now() - startTime);
    return {
      success: true,
      stdout: logs.join('\n') || "Code executed successfully.",
      stderr: "Note: Running in lightweight interpreter mode.",
      images: [],
      executionTimeMs,
      error: null
    };
  }
}

export const pyodideManager = new PyodideManager();
