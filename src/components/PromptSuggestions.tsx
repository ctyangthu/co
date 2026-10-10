import React from 'react';
import {
  Cpu,
  GitBranch,
  HardDrive,
  Binary,
  GitFork,
  HelpCircle,
  LucideIcon,
  Layers,
} from 'lucide-react';
import { PROMPT_TOPICS } from '../data/topics';
import { PromptTopic } from '../types';

interface PromptSuggestionsProps {
  onSelectTopic: (topic: PromptTopic) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Cpu,
  GitBranch,
  HardDrive,
  Binary,
  GitFork,
  HelpCircle,
};

export const PromptSuggestions: React.FC<PromptSuggestionsProps> = ({ onSelectTopic }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-[#0c2340] to-[#17375e] text-white rounded-xl p-6 sm:p-7 shadow-sm border border-[#22446d] mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-amber-400/20 border border-amber-300/40 text-amber-300 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                Socratic Teaching Mode
              </span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-xs text-slate-300">啟發思考 · 破除硬體盲點</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-serif mb-2 text-white">
              歡迎來到東海大學計算機組織 AI 助教
            </h2>
            <p className="text-sm text-slate-200 leading-relaxed max-w-2xl">
              我是專屬於你的計算機組織學長姐助教。在我們的討論中，我
              <strong className="text-amber-200 font-medium">不會直接提供最終數值答案或完整推導</strong>
              ，而是運用蘇格拉底反詰法，引導你抽絲剝繭理清 CPU 效能、管線化冒險、快取映射與指令集架構原理，建立扎實的計算機系統底層思維！
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Topics Heading */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider font-serif">
            熱門研討主題與核心硬體架構
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            點選下方任何一個主題即可開始探討，或於下方輸入框直接提出你的題目或推導草稿
          </p>
        </div>
      </div>

      {/* Grid of topic cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {PROMPT_TOPICS.map((topic, index) => {
          const Icon = iconMap[topic.iconName] || HelpCircle;
          return (
            <button
              key={index}
              onClick={() => onSelectTopic(topic)}
              className="group text-left p-4 bg-white hover:bg-slate-50/90 border border-slate-200 hover:border-amber-300 rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-150 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-medium text-slate-500 group-hover:text-amber-700 transition-colors">
                    {topic.category}
                  </span>
                  <div className="w-6 h-6 rounded-md bg-slate-100 group-hover:bg-amber-100/70 text-slate-600 group-hover:text-amber-700 flex items-center justify-center transition-colors">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#0c2340] mb-1.5 transition-colors line-clamp-1">
                  {topic.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {topic.question}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-400 group-hover:text-amber-700/80 transition-colors flex items-center justify-between">
                <span className="truncate">{topic.conceptHint}</span>
                <span className="shrink-0 text-amber-600 ml-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  開始探討 →
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
