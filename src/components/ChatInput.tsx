import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, CornerDownLeft } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onSelectSuggestion?: (text: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading,
  onSelectSuggestion,
}) => {
  const [inputText, setInputText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [inputText]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText.trim());
      setInputText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const quickPills = [
    'Eligibility for C Certificate?',
    'Direct SSB Entry scheme',
    'RDC Selection procedure',
    'Bonus marks in Police & CAPF',
  ];

  return (
    <div className="w-full bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 p-3 sm:p-4 pb-4 sm:pb-6">
      <div className="max-w-4xl mx-auto space-y-2.5">
        {/* Quick follow-up pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 flex-shrink-0">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Quick Ask:
          </span>
          {quickPills.map((pill, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              onClick={() => onSelectSuggestion && onSelectSuggestion(pill)}
              className="flex-shrink-0 px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-amber-300 border border-slate-700/70 text-[11px] transition-colors disabled:opacity-50"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Input box form */}
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
          <div className="relative flex-1 bg-slate-950/80 rounded-2xl border border-slate-700/80 focus-within:border-blue-500/80 focus-within:ring-1 focus-within:ring-blue-500/50 transition-all shadow-inner">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              placeholder="Ask anything about NCC (eligibility, camps, ranks, certificates, defence benefits)..."
              className="w-full px-4 py-3 sm:py-3.5 bg-transparent text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:outline-none resize-none max-h-36 leading-relaxed"
            />
            <div className="flex items-center justify-between px-3.5 pb-2 text-[11px] text-slate-500 border-t border-slate-900/60 pt-1.5">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">Enter ↵</kbd> to send, <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">Shift+Enter</kbd> for new line</span>
              <span className="text-[10px] text-slate-400">DG NCC Regulations Grounded</span>
            </div>
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className={`h-12 w-12 sm:h-14 sm:w-14 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-md ${
              !inputText.trim() || isLoading
                ? 'bg-slate-800 text-slate-600 border border-slate-700/50 cursor-not-allowed'
                : 'bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-bold border border-amber-400/50 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95'
            }`}
            title="Send query"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-amber-300" />
            ) : (
              <Send className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
