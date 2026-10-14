import React, { useState } from 'react';
import { X, Award, Tent, ChevronUp, ExternalLink, Shield, CheckCircle2 } from 'lucide-react';
import { NCC_CAMPS, NCC_CERTIFICATES, NCC_RANKS } from '../data/nccData';

interface QuickReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskAboutItem: (query: string) => void;
}

export const QuickReferenceModal: React.FC<QuickReferenceModalProps> = ({
  isOpen,
  onClose,
  onAskAboutItem,
}) => {
  const [activeTab, setActiveTab] = useState<'certificates' | 'camps' | 'ranks' | 'portals'>('certificates');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-900/40 border border-blue-700/50 text-sky-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                NCC Quick Reference Guide & Cheat Sheet
              </h2>
              <p className="text-xs text-slate-400">
                Authoritative overview of Certificates, Camps, Ranks & Official Portals
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/40 px-4 sm:px-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('certificates')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
              activeTab === 'certificates'
                ? 'border-amber-400 text-amber-300 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="w-4 h-4" />
            Certificates (A, B, C)
          </button>

          <button
            onClick={() => setActiveTab('camps')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
              activeTab === 'camps'
                ? 'border-amber-400 text-amber-300 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tent className="w-4 h-4" />
            Camps (RDC, TSC, CATC)
          </button>

          <button
            onClick={() => setActiveTab('ranks')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
              activeTab === 'ranks'
                ? 'border-amber-400 text-amber-300 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ChevronUp className="w-4 h-4" />
            Ranks & Structure
          </button>

          <button
            onClick={() => setActiveTab('portals')}
            className={`flex items-center gap-2 py-3 px-4 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
              activeTab === 'portals'
                ? 'border-amber-400 text-amber-300 bg-amber-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            Official Portals
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* TAB 1: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {NCC_CERTIFICATES.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {cert.level}
                        </span>
                        <Award className="w-4 h-4 text-amber-400" />
                      </div>
                      <h3 className="font-semibold text-white text-sm mb-1">{cert.division}</h3>
                      <p className="text-xs text-slate-400 mb-3"><strong>Tenure:</strong> {cert.duration}</p>

                      <div className="space-y-2 mb-4 text-xs">
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-slate-400 font-medium block text-[11px]">Prerequisites:</span>
                          <span className="text-slate-200">{cert.prerequisites}</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800">
                          <span className="text-emerald-400 font-medium block text-[11px]">Career & Defence Value:</span>
                          <span className="text-slate-300">{cert.defenceBenefit}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onAskAboutItem(`Explain detailed syllabus, exam format and SSB benefits of ${cert.level}`);
                      }}
                      className="w-full mt-2 py-1.5 px-3 rounded-lg bg-blue-900/60 hover:bg-blue-800/60 border border-blue-700/60 text-xs font-medium text-sky-300 transition-colors"
                    >
                      Ask AI about {cert.level} →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CAMPS */}
          {activeTab === 'camps' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {NCC_CAMPS.map((camp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-blue-900/80 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-amber-400 text-sm">
                        {camp.shortName} - {camp.name}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-850 text-slate-300 border border-slate-700">
                        {camp.wing} Wing
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {camp.description}
                    </p>
                    <p className="text-[11px] text-slate-500 mb-2">
                      <strong className="text-slate-400">Venue / Scope:</strong> {camp.location}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onAskAboutItem(`How can a cadet qualify and get selected for ${camp.name} (${camp.shortName})?`);
                    }}
                    className="mt-2 py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-amber-300 transition-colors text-left"
                  >
                    Ask selection process for {camp.shortName} →
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: RANKS */}
          {activeTab === 'ranks' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400 mb-2">
                Ranks in NCC Senior Division / Wing are awarded based on seniority, attendance, passing certificate examinations, leadership, and conduct:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {NCC_RANKS.map((rk, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-950/50 border border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-950 text-amber-400 font-mono text-xs font-bold flex items-center justify-center border border-blue-800">
                        {rk.abbreviation}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-200">{rk.rank}</h4>
                        <p className="text-[11px] text-slate-400">{rk.level}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{rk.wing}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: OFFICIAL PORTALS */}
          {activeTab === 'portals' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-600/30 text-xs text-amber-200/90 leading-relaxed">
                <strong>Official Verification Note:</strong> While this AI assistant provides accurate guidance from NCC regulations, always verify the latest recruitment notices, physical cut-offs, and dates directly with your institutional ANO or the official portals below.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://indiancc.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/50 transition-all group flex items-start justify-between"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                      DG NCC Official Portal (NIC)
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Official portal of the Directorate General NCC for all administrative directives, manuals, and circulars.
                    </p>
                    <span className="text-[11px] text-sky-400 mt-2 inline-block font-mono">
                      indiancc.nic.in
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 flex-shrink-0" />
                </a>

                <a
                  href="https://joinindianarmy.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/50 transition-all group flex items-start justify-between"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                      Join Indian Army (NCC Special Entry)
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Check live notification dates for OTA Chennai 50-vacancy Direct SSB course for NCC 'C' Certificate holders.
                    </p>
                    <span className="text-[11px] text-sky-400 mt-2 inline-block font-mono">
                      joinindianarmy.nic.in
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 flex-shrink-0" />
                </a>

                <a
                  href="https://www.joinindiannavy.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/50 transition-all group flex items-start justify-between"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                      Join Indian Navy
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Explore special cadet entries for Naval Academy Ezhimala and executive/technical branches.
                    </p>
                    <span className="text-[11px] text-sky-400 mt-2 inline-block font-mono">
                      joinindiannavy.gov.in
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 flex-shrink-0" />
                </a>

                <a
                  href="https://careerindianairforce.cdac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/50 transition-all group flex items-start justify-between"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                      Career Indian Air Force (Air Wing)
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Direct entries into Flying Branch via NCC Special Entry for male and female cadets with Air Wing 'C' certificate.
                    </p>
                    <span className="text-[11px] text-sky-400 mt-2 inline-block font-mono">
                      careerindianairforce.cdac.in
                    </span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 flex-shrink-0" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <span className="text-xs text-slate-500">DG NCC Handbook & Ministry of Defence Regulations</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
