import React, { useState } from 'react';
import {
  Zap,
  Binary,
  Cpu,
  GitBranch,
  HardDrive,
  Layers,
  Calculator,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles,
  BarChart3,
  HelpCircle,
  LucideIcon,
} from 'lucide-react';
import { ProgressSummary, UnitProgress } from '../utils/progressAnalyzer';

interface ProgressTrackerBannerProps {
  summary: ProgressSummary;
  onAskTopic?: (topicPrompt: string) => void;
  onOpenDetails?: () => void;
}

const unitIcons: Record<string, LucideIcon> = {
  Zap,
  Binary,
  Cpu,
  GitBranch,
  HardDrive,
  Layers,
  Calculator,
};

export const ProgressTrackerBanner: React.FC<ProgressTrackerBannerProps> = ({
  summary,
  onAskTopic,
  onOpenDetails,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<UnitProgress | null>(null);

  const getLevelBadge = (level: number) => {
    switch (level) {
      case 3:
        return {
          label: '架構精通',
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          dot: 'bg-amber-500',
        };
      case 2:
        return {
          label: '深入推導',
          bg: 'bg-indigo-100 text-indigo-900 border-indigo-200',
          dot: 'bg-indigo-600',
        };
      case 1:
        return {
          label: '初步探討',
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
          dot: 'bg-emerald-600',
        };
      default:
        return {
          label: '尚未涉及',
          bg: 'bg-slate-100 text-slate-500 border-slate-200',
          dot: 'bg-slate-300',
        };
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all">
      <div className="max-w-5xl mx-auto px-4 py-3">
        {/* Compact Header Summary Bar */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-md bg-[#0c2340] text-amber-300 flex items-center justify-center shrink-0 shadow-xs">
              <BarChart3 className="w-4 h-4" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-800 font-serif">
                  計算機組織學習進度追蹤
                </span>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <span className="text-[11px] text-slate-600 font-medium truncate">
                  {summary.overallLevelTitle}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics & Toggle */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Breadth Indicator */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[11px] text-slate-500">學習廣度：</span>
              <div className="w-20 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                <div
                  className="bg-[#0c2340] h-full transition-all duration-500"
                  style={{ width: `${summary.breadthPercentage}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-slate-700 min-w-[32px]">
                {summary.coveredUnitsCount}/{summary.totalUnitsCount}
              </span>
            </div>

            {/* Depth Indicator */}
            <div className="hidden md:flex items-center gap-2">
              <span className="text-[11px] text-slate-500">平均深度：</span>
              <div className="w-16 bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200">
                <div
                  className="bg-gradient-to-r from-amber-500 to-amber-600 h-full transition-all duration-500"
                  style={{ width: `${summary.averageDepthPercentage}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-amber-700 min-w-[30px]">
                {summary.averageDepthPercentage}%
              </span>
            </div>

            {/* Toggle Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-[#0c2340] font-medium py-1 px-2 rounded-md hover:bg-slate-100 transition-colors"
              title={isExpanded ? '收合進度看板' : '展開完整進度看板'}
            >
              <span className="hidden sm:inline">{isExpanded ? '收合' : '展開單元'}</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>
          </div>
        </div>

        {/* Expanded Detailed Grid of 7 Units */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-100">
            {/* Unit Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {summary.unitProgressList.map((unit) => {
                const IconComponent = unitIcons[unit.iconName] || HelpCircle;
                const badge = getLevelBadge(unit.depthLevel);
                const isSelected = selectedUnit?.id === unit.id;
                const isCovered = unit.depthLevel > 0;

                return (
                  <button
                    key={unit.id}
                    onClick={() => setSelectedUnit(isSelected ? null : unit)}
                    className={`p-2.5 rounded-lg text-left transition-all relative flex flex-col justify-between border ${
                      isSelected
                        ? 'bg-amber-50/50 border-amber-400 ring-2 ring-amber-300/40 shadow-xs'
                        : isCovered
                        ? 'bg-white border-slate-300 hover:border-slate-400 hover:shadow-xs'
                        : 'bg-slate-50/70 border-slate-200 hover:bg-white text-slate-400'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div
                          className={`w-6 h-6 rounded flex items-center justify-center ${
                            isCovered
                              ? 'bg-[#0c2340] text-amber-300'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <span
                          className={`w-2 h-2 rounded-full ${badge.dot}`}
                          title={badge.label}
                        />
                      </div>

                      <h4
                        className={`text-xs font-bold truncate ${
                          isCovered ? 'text-slate-900 font-serif' : 'text-slate-600'
                        }`}
                      >
                        {unit.name}
                      </h4>
                      <p className="text-[10px] text-slate-600 line-clamp-1 mb-2">
                        {unit.nameEn}
                      </p>
                    </div>

                    <div>
                      {/* Depth Bar */}
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mb-1 border border-slate-200/60">
                        <div
                          className={`h-full transition-all duration-300 ${
                            unit.depthLevel === 3
                              ? 'bg-amber-500'
                              : unit.depthLevel === 2
                              ? 'bg-indigo-600'
                              : unit.depthLevel === 1
                              ? 'bg-emerald-500'
                              : 'bg-transparent'
                          }`}
                          style={{ width: `${unit.depthPercentage}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-600 font-medium">{badge.label}</span>
                        {unit.mentionsCount > 0 && (
                          <span className="text-slate-600">{unit.mentionsCount} 則提及</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Unit Deep-Dive Drawer / Panel */}
            {selectedUnit && (
              <div className="mt-3 p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-[#0c2340] text-amber-300 rounded">
                      {React.createElement(unitIcons[selectedUnit.iconName] || HelpCircle, {
                        className: 'w-4 h-4',
                      })}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 font-serif text-sm">
                        {selectedUnit.name} ({selectedUnit.nameEn})
                      </h5>
                      <p className="text-slate-500 text-[11px]">{selectedUnit.description}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedUnit(null)}
                    className="text-slate-400 hover:text-slate-700 text-xs p-1"
                  >
                    關閉
                  </button>
                </div>

                {/* Concepts list */}
                <div className="mt-2.5">
                  <span className="text-[11px] font-semibold text-slate-700 block mb-1.5">
                    核心知識檢核點 (Concept Checkpoints)：
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
                    {selectedUnit.totalConcepts.map((concept, idx) => {
                      const isUnlocked = selectedUnit.unlockedConcepts.includes(concept);
                      return (
                        <div
                          key={idx}
                          className={`p-2 rounded text-[11px] border flex items-center justify-between gap-2 ${
                            isUnlocked
                              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900 font-medium'
                              : 'bg-white border-slate-200 text-slate-500'
                          }`}
                        >
                          <span className="truncate">{concept}</span>
                          <span
                            className={`text-[10px] shrink-0 ${
                              isUnlocked ? 'text-emerald-700 font-bold' : 'text-slate-400'
                            }`}
                          >
                            {isUnlocked ? '✓ 已涉獵' : '待探索'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Quick prompt generator for this unit */}
                {onAskTopic && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between flex-wrap gap-2">
                    <span className="text-slate-500 text-[11px]">
                      想進一步探索此單元嗎？點擊快速向助教請教：
                    </span>
                    <button
                      onClick={() => {
                        onAskTopic(`學長姐好！我想深入討論【${selectedUnit.name}】的觀念，請問在期中/期末考中最常出現的典型思考盲點是什麼？`);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-[#0c2340] hover:bg-[#16365f] text-amber-300 font-semibold rounded text-xs transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>請助教出題引導【{selectedUnit.name}】</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Study Advice Kicker */}
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 flex-wrap gap-1">
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="text-slate-700">{summary.studyAdvice}</span>
              </div>
              <span className="text-slate-400 hidden lg:inline">
                進度依據對話發問與助教互動即時動態運算
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
