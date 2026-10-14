/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { ChatMessage } from './components/ChatMessage';
import { SuggestedQuestions } from './components/SuggestedQuestions';
import { ChatInput } from './components/ChatInput';
import { CieModal } from './components/CieModal';
import { QuickReferenceModal } from './components/QuickReferenceModal';
import { ChatMessage as ChatMessageType } from './types/chat';
import { Shield, Sparkles, Loader2, Award, Flag, AlertCircle, Compass, Users } from 'lucide-react';

const INITIAL_WELCOME_MESSAGE: ChatMessageType = {
  id: 'welcome-msg',
  role: 'model',
  content: `Hello! Welcome to NCC Information Agent. Ask me anything about the National Cadet Corps.

I can guide you through:
- **NCC Background & Wings**: Army, Naval, and Air Force Wings, history, and official motto (*"Unity and Discipline"*).
- **Enrollment & Eligibility**: How to join Junior Division (JD/JW) in schools or Senior Division (SD/SW) in colleges.
- **Certificates (A, B, and C)**: Eligibility criteria, syllabus, grading, and examination format.
- **Career & Defence Benefits**: Direct SSB interview without written CDS exam (OTA Chennai Special Entry), CAPF bonus marks, and state police advantages.
- **Camps & Training**: Republic Day Camp (RDC), Thal Sainik Camp (TSC), Vayu/Nau Sainik Camps, and Youth Exchange Programmes (YEP).

Feel free to choose one of the suggested questions below or type your question in the input box!`,
  timestamp: 'Just now',
  source: 'gemini-3.8-flash',
};

export default function App() {
  const [messages, setMessages] = useState<ChatMessageType[]>([INITIAL_WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [isCieModalOpen, setIsCieModalOpen] = useState<boolean>(false);
  const [isReferenceModalOpen, setIsReferenceModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle Speech Synthesis
  const handleSpeak = (text: string, messageId: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    if (speakingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown symbols for cleaner speech
    const cleanText = text
      .replace(/###\s/g, '')
      .replace(/##\s/g, '')
      .replace(/\*\*/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/[-*]\s/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setSpeakingMessageId(null);
    };

    utterance.onerror = () => {
      setSpeakingMessageId(null);
    };

    setSpeakingMessageId(messageId);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    setErrorMessage(null);

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMsg: ChatMessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setIsLoading(true);

    try {
      // Build history for conversational continuity
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userText,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      const aiReply = data.reply || 'No response received from agent.';

      const newAiMsg: ChatMessageType = {
        id: `ai-${Date.now()}`,
        role: 'model',
        content: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source || 'gemini-3.8-flash',
      };

      setMessages((prev) => [...prev, newAiMsg]);

      // If voice enabled, speak the answer automatically
      if (isAudioEnabled) {
        handleSpeak(aiReply, newAiMsg.id);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMessage(
        'Unable to reach server. Please check your network connection or verify that the local server is running.'
      );

      const errorAiMsg: ChatMessageType = {
        id: `err-${Date.now()}`,
        role: 'model',
        content: `I apologize, but I encountered an error communicating with the NCC knowledge server. Please retry in a moment, or visit the official National Cadet Corps portal at [nccindia.gov.in](https://nccindia.gov.in) for critical inquiries.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'knowledge-fallback',
      };

      setMessages((prev) => [...prev, errorAiMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMessageId(null);
    setMessages([INITIAL_WELCOME_MESSAGE]);
    setErrorMessage(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        onOpenCieModal={() => setIsCieModalOpen(true)}
        onOpenReferenceModal={() => setIsReferenceModalOpen(true)}
        onClearChat={handleClearChat}
        isAudioEnabled={isAudioEnabled}
        onToggleAudio={() => {
          if (isAudioEnabled && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setSpeakingMessageId(null);
          }
          setIsAudioEnabled(!isAudioEnabled);
        }}
        hasMessages={messages.length > 1}
      />

      {/* Main Chat Workspace */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col">
        {/* Error notification banner if any */}
        {errorMessage && (
          <div className="mb-4 p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs sm:text-sm flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="px-2 py-0.5 rounded bg-red-900/60 hover:bg-red-800 text-xs text-red-200"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Hero Banner when only welcome message is present */}
        {messages.length === 1 && (
          <div className="mb-4 sm:mb-6 p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-blue-950/40 via-slate-900 to-amber-950/20 border border-slate-800 shadow-xl relative overflow-hidden">
            {/* Background crest watermark decoration */}
            <div className="absolute right-[-20px] bottom-[-20px] opacity-5 pointer-events-none">
              <Shield className="w-56 h-56 text-white" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-800/80">
                  Army Wing
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-950 text-sky-300 border border-blue-800/80">
                  Naval Wing
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-sky-950 text-sky-200 border border-sky-800/80">
                  Air Force Wing
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800/80 ml-auto">
                  17 Directorates
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                National Cadet Corps (NCC) AI Knowledge Assistant
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Developed for the <strong>AI Subject Continuous Internal Evaluation (CIE) Project</strong>.
                Ask natural questions regarding eligibility, camps, certificates, SSB waivers, and training routines.
              </p>

              {/* Quick Suggestion Cards */}
              <SuggestedQuestions onSelectPrompt={(prompt) => handleSendMessage(prompt)} />
            </div>
          </div>
        )}

        {/* Messages Container */}
        <div className="flex-1 space-y-1">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onSpeak={(text) => handleSpeak(text, msg.id)}
              isSpeaking={speakingMessageId === msg.id}
            />
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex items-start gap-3 my-4 animate-fadeIn">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-900 border border-amber-500/40 flex items-center justify-center">
                <Shield className="w-4 h-4 text-amber-400" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 rounded-tl-sm flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span className="text-xs sm:text-sm text-slate-300 font-medium">
                  Consulting NCC regulations and generating answer...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Chat Input Bar */}
      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        onSelectSuggestion={(suggestion) => handleSendMessage(suggestion)}
      />

      {/* CIE Academic Evaluation Modal */}
      <CieModal isOpen={isCieModalOpen} onClose={() => setIsCieModalOpen(false)} />

      {/* Quick Reference Modal */}
      <QuickReferenceModal
        isOpen={isReferenceModalOpen}
        onClose={() => setIsReferenceModalOpen(false)}
        onAskAboutItem={(query) => handleSendMessage(query)}
      />
    </div>
  );
}
