import React from 'react';
import { Shield, Info, BookOpen, Trash2, Volume2, VolumeX, Sparkles, GraduationCap } from 'lucide-react';

interface NavbarProps {
  onOpenCieModal: () => void;
  onOpenReferenceModal: () => void;
  onClearChat: () => void;
  isAudioEnabled: boolean;
  onToggleAudio: () => void;
  hasMessages: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCieModal,
  onOpenReferenceModal,
  onClearChat,
  isAudioEnabled,
  onToggleAudio,
  hasMessages,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      {/* NCC Tri-color Accent Bar: Red (Army), Deep Navy Blue (Navy), Sky Blue (Air Force) */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-red-600 shadow-sm" title="Army Wing" />
        <div className="h-full w-1/3 bg-blue-900 shadow-sm" title="Naval Wing" />
        <div className="h-full w-1/3 bg-sky-400 shadow-sm" title="Air Force Wing" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="relative group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-900 via-slate-900 to-amber-950/70 p-0.5 border border-amber-500/40 shadow-lg shadow-blue-950/50 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-blue-900/20 to-sky-400/20" />
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 relative z-10 transition-transform group-hover:scale-110" />
                </div>
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500 border border-slate-900"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  <span>NCC Information Agent</span>
                  <span className="hidden md:inline-flex items-center text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                    AI Subject CIE
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                <span className="text-amber-400 font-medium">Unity & Discipline</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 hidden sm:inline">एकता और अनुशासन</span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-slate-400">DG NCC Knowledge Base</span>
              </p>
            </div>
          </div>

          {/* Action Navigation */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Reference Button */}
            <button
              onClick={onOpenReferenceModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 transition-all hover:border-slate-600 active:scale-95"
              title="NCC Camps, Ranks & Certificates Cheat Sheet"
            >
              <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
              <span className="hidden md:inline">Quick Guide</span>
              <span className="md:hidden">Guide</span>
            </button>

            {/* Academic CIE Info Button */}
            <button
              onClick={onOpenCieModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-amber-300 bg-amber-950/40 hover:bg-amber-900/40 border border-amber-600/40 transition-all hover:border-amber-500/60 active:scale-95 shadow-sm"
              title="About Project: AI CIE Demonstration Details"
            >
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span className="hidden sm:inline">About Project</span>
              <span className="sm:hidden">About</span>
            </button>

            {/* Audio Read-Aloud Toggle */}
            <button
              onClick={onToggleAudio}
              className={`p-2 rounded-lg border text-xs sm:text-sm transition-all active:scale-95 ${
                isAudioEnabled
                  ? 'bg-blue-950/60 border-blue-500/40 text-blue-300 hover:bg-blue-900/60'
                  : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-700/60'
              }`}
              title={isAudioEnabled ? 'Voice playback enabled' : 'Voice playback disabled'}
            >
              {isAudioEnabled ? (
                <Volume2 className="w-4 h-4 text-blue-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Clear Chat Button */}
            {hasMessages && (
              <button
                onClick={onClearChat}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-red-300 bg-red-950/30 hover:bg-red-900/40 border border-red-800/40 transition-all active:scale-95"
                title="Clear current chat messages"
              >
                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" />
                <span className="hidden lg:inline">Clear Chat</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
