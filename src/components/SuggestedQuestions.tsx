import React, { useState } from 'react';
import { SUGGESTED_PROMPTS } from '../data/nccData';
import { Shield, UserPlus, Award, Briefcase, Flag, Target, ChevronUp, Users, ArrowUpRight } from 'lucide-react';

interface SuggestedQuestionsProps {
  onSelectPrompt: (promptText: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-4 h-4 text-amber-400" />,
  UserPlus: <UserPlus className="w-4 h-4 text-sky-400" />,
  Award: <Award className="w-4 h-4 text-amber-400" />,
  Briefcase: <Briefcase className="w-4 h-4 text-emerald-400" />,
  Flag: <Flag className="w-4 h-4 text-red-400" />,
  Target: <Target className="w-4 h-4 text-sky-400" />,
  ChevronUp: <ChevronUp className="w-4 h-4 text-amber-400" />,
  Users: <Users className="w-4 h-4 text-purple-400" />,
};

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({ onSelectPrompt }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Enrollment', 'Certificates', 'Benefits', 'Camps'];

  const filtered = selectedCategory === 'All'
    ? SUGGESTED_PROMPTS
    : SUGGESTED_PROMPTS.filter((item) => item.category === selectedCategory);

  return (
    <div className="w-full my-4 sm:my-6">
      {/* Category pills */}
      <div className="flex items-center justify-between mb-3 px-1">
        <span className="text-xs font-semibold tracking-wider uppercase text-slate-400 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
          Explore Frequent Cadet Questions:
        </span>
        <div className="hidden sm:flex items-center gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-900/80 text-amber-300 border border-blue-700/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Suggested question grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {filtered.map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(item.prompt)}
            className="group text-left p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-blue-500/50 shadow-sm hover:shadow-md hover:shadow-blue-950/40 transition-all duration-200 flex flex-col justify-between active:scale-[0.98]"
          >
            <div className="flex items-start justify-between w-full mb-2">
              <div className="p-1.5 rounded-lg bg-slate-800/80 group-hover:bg-slate-800 transition-colors">
                {iconMap[item.icon] || <Shield className="w-4 h-4 text-amber-400" />}
              </div>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-850 text-slate-400 border border-slate-800 group-hover:text-amber-300 transition-colors">
                {item.category}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors leading-snug">
                {item.title}
              </p>
              <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 ml-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
