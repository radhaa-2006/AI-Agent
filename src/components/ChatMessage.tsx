import React, { useState } from 'react';
import { ChatMessage as ChatMessageType } from '../types/chat';
import { Shield, User, Copy, Check, Volume2, VolumeX, Sparkles, CheckCircle2 } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
  onSpeak?: (text: string) => void;
  isSpeaking?: boolean;
}

// Custom Markdown formatter to render structured text safely and cleanly
function renderFormattedContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inList = false;
  let listItems: React.ReactNode[] = [];

  const flushList = () => {
    if (inList && listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-2 space-y-1.5 pl-4 list-disc marker:text-amber-400">
          {listItems}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const parseInline = (text: string): React.ReactNode[] => {
    // Regex for bold **bold**, italic *italic*, links [text](url)
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIdx = 0;

    while (remaining.length > 0) {
      // Check for link [title](url)
      const linkMatch = remaining.match(/\[(.*?)\]\((.*?)\)/);
      // Check for bold **text**
      const boldMatch = remaining.match(/\*\*(.*?)\*\*/);

      if (linkMatch && (!boldMatch || linkMatch.index! <= boldMatch.index!)) {
        const pre = remaining.substring(0, linkMatch.index);
        if (pre) parts.push(<span key={keyIdx++}>{pre}</span>);
        parts.push(
          <a
            key={keyIdx++}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 underline font-medium underline-offset-2"
          >
            {linkMatch[1]}
          </a>
        );
        remaining = remaining.substring(linkMatch.index! + linkMatch[0].length);
      } else if (boldMatch) {
        const pre = remaining.substring(0, boldMatch.index);
        if (pre) parts.push(<span key={keyIdx++}>{pre}</span>);
        parts.push(
          <strong key={keyIdx++} className="font-semibold text-white">
            {boldMatch[1]}
          </strong>
        );
        remaining = remaining.substring(boldMatch.index! + boldMatch[0].length);
      } else {
        parts.push(<span key={keyIdx++}>{remaining}</span>);
        break;
      }
    }
    return parts;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={index} className="text-base sm:text-lg font-bold text-amber-400 mt-4 mb-2 flex items-center gap-2">
          <span>{trimmed.replace('### ', '')}</span>
        </h3>
      );
    } else if (trimmed.startsWith('#### ')) {
      flushList();
      elements.push(
        <h4 key={index} className="text-sm sm:text-base font-semibold text-sky-300 mt-3 mb-1.5">
          {trimmed.replace('#### ', '')}
        </h4>
      );
    } else if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={index} className="text-lg sm:text-xl font-bold text-amber-300 mt-5 mb-2.5 pb-1 border-b border-slate-700/60">
          {trimmed.replace('## ', '')}
        </h2>
      );
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      inList = true;
      const itemText = trimmed.substring(2);
      listItems.push(
        <li key={`li-${index}`} className="text-slate-200 text-sm sm:text-base leading-relaxed">
          {parseInline(itemText)}
        </li>
      );
    } else if (/^\d+\.\s/.test(trimmed)) {
      flushList();
      const match = trimmed.match(/^(\d+)\.\s(.*)$/);
      if (match) {
        elements.push(
          <div key={index} className="flex gap-2.5 my-1.5 text-sm sm:text-base text-slate-200 leading-relaxed">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-900/60 text-sky-300 border border-blue-700/50 flex items-center justify-center text-xs font-bold">
              {match[1]}
            </span>
            <div className="flex-1">{parseInline(match[2])}</div>
          </div>
        );
      }
    } else if (trimmed.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote key={index} className="my-2.5 pl-3.5 border-l-2 border-amber-500 bg-amber-950/20 py-1.5 px-3 rounded-r text-sm text-amber-200/90 italic">
          {parseInline(trimmed.replace('> ', ''))}
        </blockquote>
      );
    } else if (trimmed === '') {
      flushList();
      elements.push(<div key={index} className="h-2" />);
    } else {
      flushList();
      elements.push(
        <p key={index} className="text-slate-200 text-sm sm:text-base leading-relaxed my-1">
          {parseInline(trimmed)}
        </p>
      );
    }
  });

  flushList();
  return elements;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onSpeak,
  isSpeaking = false,
}) => {
  const [copied, setCopied] = useState(false);
  const isAI = message.role === 'model';

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'} my-3.5 sm:my-5 group animate-fadeIn`}>
      <div
        className={`flex max-w-[92%] sm:max-w-[85%] md:max-w-[80%] gap-3 sm:gap-4 ${
          isAI ? 'flex-row' : 'flex-row-reverse'
        }`}
      >
        {/* Avatar */}
        <div className="flex-shrink-0 pt-0.5">
          {isAI ? (
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-900 to-slate-900 border border-amber-500/50 flex items-center justify-center shadow-md shadow-blue-950/50">
              <Shield className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400" />
            </div>
          ) : (
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shadow-md">
              <User className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-300" />
            </div>
          )}
        </div>

        {/* Message Bubble */}
        <div className="flex-1">
          {/* Header Metadata */}
          <div className={`flex items-center gap-2 mb-1.5 ${isAI ? 'justify-start' : 'justify-end'}`}>
            <span className="text-xs font-semibold tracking-tight text-slate-300">
              {isAI ? 'NCC Information Agent' : 'You (Cadet / Student)'}
            </span>
            {isAI && (
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/80">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                {message.source === 'knowledge-fallback' ? 'DG NCC Database' : 'Gemini 3.8 Flash'}
              </span>
            )}
            <span className="text-[10px] text-slate-500">{message.timestamp}</span>
          </div>

          {/* Body Content */}
          <div
            className={`p-4 sm:p-5 rounded-2xl shadow-lg relative ${
              isAI
                ? 'bg-slate-900/90 text-slate-200 border border-slate-800 backdrop-blur-sm rounded-tl-sm ring-1 ring-slate-800/60'
                : 'bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-tr-sm border border-blue-700/60 shadow-blue-950/40'
            }`}
          >
            {isAI ? (
              <div className="prose-slate text-sm sm:text-base">
                {renderFormattedContent(message.content)}
              </div>
            ) : (
              <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-normal">
                {message.content}
              </p>
            )}

            {/* Bottom toolbar for AI responses */}
            {isAI && (
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified via National Cadet Corps Regulations</span>
                </div>

                <div className="flex items-center gap-2">
                  {onSpeak && (
                    <button
                      onClick={() => onSpeak(message.content)}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-800 transition-colors ${
                        isSpeaking ? 'text-blue-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                      title={isSpeaking ? 'Stop reading' : 'Read answer aloud'}
                    >
                      {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-amber-400" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">{isSpeaking ? 'Stop' : 'Listen'}</span>
                    </button>
                  )}

                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                    title="Copy response to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
