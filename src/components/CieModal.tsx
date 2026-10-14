import React from 'react';
import { X, GraduationCap, Server, Shield, Cpu, Lock, CheckCircle2, BookOpen, Layers, Terminal, Sparkles } from 'lucide-react';

interface CieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CieModal: React.FC<CieModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>College AI CIE Project Overview</span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 font-mono">
                  3rd Year Comp Engg
                </span>
              </h2>
              <p className="text-xs text-slate-400">Continuous Internal Evaluation (CIE) Demonstration Document</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300">
          {/* Executive Summary */}
          <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/40">
            <h3 className="text-sm font-semibold text-blue-300 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Project Title & Objective
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              <strong>“NCC Information Agent”</strong> is a specialized conversational AI assistant engineered to help Indian school and college students navigate the National Cadet Corps (NCC). The assistant answers queries regarding enrollment, training syllabi, camps (RDC, TSC, CATC), certificates (A, B, C), rank structures, and lucrative defence benefits (Direct SSB Interview via NCC Special Entry Scheme) with strict factual grounding.
            </p>
          </div>

          {/* AI Architecture Grid */}
          <div>
            <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4" />
              Technical Stack & AI Architecture
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs mb-1.5">
                  <Cpu className="w-4 h-4" />
                  Large Language Model (LLM)
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Powered by <strong>Google Gemini 3.8 Flash</strong> via the official <code className="text-amber-300">@google/genai</code> TypeScript SDK, providing sub-second latency and high contextual reasoning.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1.5">
                  <Lock className="w-4 h-4" />
                  Security & Key Isolation
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Implements <strong>Server-Side Proxy Architecture</strong> in <code className="text-amber-300">server.ts</code>. API keys are strictly accessed via environment variables and never exposed to the client.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1.5">
                  <Shield className="w-4 h-4" />
                  Anti-Hallucination & Grounding
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Rigorous System Prompt engineering grounded on the <em>National Cadet Corps Act of 1948</em> and DG NCC manuals with temperature set to 0.4 for deterministic accuracy.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="flex items-center gap-2 text-purple-400 font-semibold text-xs mb-1.5">
                  <Server className="w-4 h-4" />
                  High-Availability Fallback
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Includes an in-memory NCC regulatory fallback engine so the CIE demonstration remains 100% operational even in offline/demo conditions.
                </p>
              </div>
            </div>
          </div>

          {/* Academic CIE Criteria & Evaluation Highlights */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              CIE Demonstration Checklist
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80">
                <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  ✓
                </span>
                <p className="text-xs leading-relaxed">
                  <strong>Conversational Flow:</strong> Multi-turn conversation capability retaining context with clean user-assistant separation.
                </p>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80">
                <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  ✓
                </span>
                <p className="text-xs leading-relaxed">
                  <strong>Official Tri-Wing Representation:</strong> Dedicated knowledge on Army, Navy, and Air Force Wings along with JD/JW and SD/SW divisions.
                </p>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/80">
                <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  ✓
                </span>
                <p className="text-xs leading-relaxed">
                  <strong>Accessibility & UX:</strong> Integrated Web Speech API (Text-to-Speech) for voice answers, one-click copy, and responsive mobile-first UI.
                </p>
              </div>
            </div>
          </div>

          {/* How to Run & Test Instructions */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-amber-400" />
              Execution & Deployment Notes
            </h4>
            <div className="bg-slate-900 p-3 rounded-lg font-mono text-xs text-slate-300 space-y-1">
              <p className="text-emerald-400"># Development Server (Port 3000)</p>
              <p>npm run dev</p>
              <p className="text-emerald-400 mt-2"># Production Build & Launch</p>
              <p>npm run build</p>
              <p>npm start</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <span className="text-xs text-slate-500">Department of Computer Engineering • AI Project</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors"
          >
            Got it / Return to Chat
          </button>
        </div>
      </div>
    </div>
  );
};
