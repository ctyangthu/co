import React, { useState } from 'react';
import {
  X,
  Cpu,
  Layers,
  HardDrive,
  Check,
  Zap,
  BarChart3,
  BookOpen,
  Award,
  Sparkles,
  Binary,
  GitBranch,
  Calculator,
  HelpCircle,
  LucideIcon,
} from 'lucide-react';
import { ProgressSummary, UnitProgress } from '../utils/progressAnalyzer';

interface ComputerOrgReferenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  summary: ProgressSummary;
  onAskTopic?: (topicPrompt: string) => void;
  defaultTab?: 'progress' | 'reference';
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

export const ComputerOrgReferenceDrawer: React.FC<ComputerOrgReferenceDrawerProps> = ({
  isOpen,
  onClose,
  summary,
  onAskTopic,
  defaultTab = 'progress',
}) => {
  const [activeTab, setActiveTab] = useState<'progress' | 'reference'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full sm:w-[460px] bg-white shadow-2xl border-l border-slate-200 flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="px-5 py-3.5 bg-[#0c2340] text-white flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {activeTab === 'progress' ? (
            <BarChart3 className="w-4 h-4 text-amber-300" />
          ) : (
            <Cpu className="w-4 h-4 text-amber-300" />
          )}
          <h3 className="text-sm font-bold font-serif">
            {activeTab === 'progress' ? '學習廣度與深度分析' : '計算機組織速查手冊'}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white rounded transition-colors"
          title="關閉側邊欄"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2">
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors -mb-px ${
            activeTab === 'progress'
              ? 'border-[#0c2340] text-[#0c2340] bg-white rounded-t'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>單元進度與深度</span>
          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-bold">
            {summary.coveredUnitsCount}/{summary.totalUnitsCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('reference')}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors -mb-px ${
            activeTab === 'reference'
              ? 'border-[#0c2340] text-[#0c2340] bg-white rounded-t'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>硬體架構速查</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-5 text-xs text-slate-700">
        {activeTab === 'progress' ? (
          /* Tab 1: Learning Progress & Mastery Analytics */
          <div className="space-y-4">
            {/* Overview Card */}
            <div className="bg-gradient-to-br from-[#0c2340] to-[#1c3f68] text-white p-4 rounded-xl shadow-xs border border-[#2a4d79]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold">
                  掌握度綜合評估
                </span>
                <span className="text-xs bg-amber-400/20 text-amber-200 border border-amber-300/30 px-2 py-0.5 rounded font-medium">
                  {summary.overallLevelTitle}
                </span>
              </div>

              {/* Progress Gauges */}
              <div className="grid grid-cols-2 gap-3 my-3">
                <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
                  <div className="text-[11px] text-slate-300 mb-1">學習廣度 (Breadth)</div>
                  <div className="text-xl font-bold font-serif text-white">
                    {summary.coveredUnitsCount}{' '}
                    <span className="text-xs font-normal text-slate-300">
                      / {summary.totalUnitsCount} 單元
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div
                      className="bg-amber-400 h-full transition-all duration-500"
                      style={{ width: `${summary.breadthPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white/10 p-2.5 rounded-lg border border-white/10">
                  <div className="text-[11px] text-slate-300 mb-1">平均深度 (Depth)</div>
                  <div className="text-xl font-bold font-serif text-amber-300">
                    {summary.averageDepthPercentage}
                    <span className="text-xs font-normal text-slate-300">%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-1.5 mt-2 overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full transition-all duration-500"
                      style={{ width: `${summary.averageDepthPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Advice */}
              <div className="text-[11px] text-slate-200 pt-1 flex items-start gap-1.5 border-t border-white/10">
                <Award className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                <span>{summary.studyAdvice}</span>
              </div>
            </div>

            {/* Units Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-900 font-serif">
                  計算機組織 7 大核心單元詳情
                </h4>
                <span className="text-[10px] text-slate-500">依據對話互動分析</span>
              </div>

              <div className="space-y-2.5">
                {summary.unitProgressList.map((unit) => {
                  const IconComponent = unitIcons[unit.iconName] || HelpCircle;
                  const isCovered = unit.depthLevel > 0;

                  return (
                    <div
                      key={unit.id}
                      className={`p-3 rounded-lg border transition-all ${
                        isCovered
                          ? 'bg-white border-slate-300 shadow-xs'
                          : 'bg-slate-50 border-slate-200 opacity-80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <div
                            className={`p-1.5 rounded ${
                              isCovered
                                ? 'bg-[#0c2340] text-amber-300'
                                : 'bg-slate-200 text-slate-500'
                            }`}
                          >
                            <IconComponent className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-bold text-slate-800 block text-xs">
                              {unit.name}
                            </span>
                            <span className="text-[10px] text-slate-500">{unit.nameEn}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded border inline-block ${
                              unit.depthLevel === 3
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : unit.depthLevel === 2
                                ? 'bg-indigo-100 text-indigo-900 border-indigo-200'
                                : unit.depthLevel === 1
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border-slate-200'
                            }`}
                          >
                            {unit.depthLevel === 3
                              ? '架構精通'
                              : unit.depthLevel === 2
                              ? '深入推導'
                              : unit.depthLevel === 1
                              ? '初步探討'
                              : '尚未涉獵'}
                          </span>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden my-2 border border-slate-200">
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

                      {/* Unlocked concepts */}
                      <div className="text-[11px] text-slate-600">
                        <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                          <span>
                            涉獵知識點 ({unit.unlockedConcepts.length}/{unit.totalConcepts.length})
                          </span>
                          <span>{unit.mentionsCount} 則相關討論</span>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-1">
                          {unit.totalConcepts.map((concept, idx) => {
                            const isUnlocked = unit.unlockedConcepts.includes(concept);
                            return (
                              <span
                                key={idx}
                                className={`text-[10px] px-1.5 py-0.5 rounded border ${
                                  isUnlocked
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-medium'
                                    : 'bg-slate-100 text-slate-400 border-slate-200'
                                }`}
                              >
                                {isUnlocked ? '✓ ' : ''}
                                {concept.split('(')[0].trim()}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Quick prompt trigger */}
                      {onAskTopic && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex justify-end">
                          <button
                            onClick={() => {
                              onAskTopic(
                                `學長姐好！我想深入研討【${unit.name}】的核心觀念與架構，請為我出一道具啟發性的典型考題並引導我思考！`
                              );
                            }}
                            className="inline-flex items-center gap-1 text-[11px] text-amber-700 hover:text-amber-900 font-medium hover:underline"
                          >
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            <span>請助教出題探討此單元 →</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Tab 2: Architecture Cheatsheet */
          <div className="space-y-5">
            {/* CPU Performance Formulas */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-[#0c2340] font-serif text-xs">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                CPU 效能核心方程式 (Performance Equation)
              </div>
              <div className="bg-white p-2.5 rounded border border-slate-200 text-center font-mono font-semibold text-slate-800 text-[12px] leading-relaxed">
                CPU Time = IC × CPI × Clock Cycle Time
                <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                  = (Instruction Count × CPI) / Clock Rate
                </div>
              </div>
              <div className="text-[11px] text-slate-600 leading-normal bg-amber-50/60 p-2 rounded border border-amber-200/50">
                <strong>Amdahl\'s Law (加速比定律)：</strong>
                <div className="font-mono mt-0.5 text-amber-950">
                  Speedup = 1 / [ (1 - f) + (f / s) ]
                </div>
                <span className="text-[10px] text-slate-500">
                  f 為可改善比例，s 為該部分之加速倍數
                </span>
              </div>
            </div>

            {/* 5-Stage Classic Pipeline */}
            <div>
              <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-2 font-serif">
                <Layers className="w-3.5 h-3.5 text-[#0c2340]" />
                經典 5 級管線架構 (Classic 5-Stage Pipeline)
              </div>
              <div className="border border-slate-200 rounded-lg overflow-hidden text-[11px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0c2340] text-white">
                      <th className="py-2 px-2.5 w-14">階段</th>
                      <th className="py-2 px-2.5">英文全名</th>
                      <th className="py-2 px-2.5">主要功能與硬體動作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr className="bg-slate-50/50">
                      <td className="py-1.5 px-2.5 font-mono font-bold text-indigo-700">IF</td>
                      <td className="py-1.5 px-2.5 font-medium">Instruction Fetch</td>
                      <td className="py-1.5 px-2.5 text-slate-600">從指令記憶體讀取指令，PC = PC + 4</td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2.5 font-mono font-bold text-blue-700">ID</td>
                      <td className="py-1.5 px-2.5 font-medium">Decode / Reg Read</td>
                      <td className="py-1.5 px-2.5 text-slate-600">
                        指令解碼，讀取暫存器堆 (RegFile)，符號擴展
                      </td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="py-1.5 px-2.5 font-mono font-bold text-emerald-700">EX</td>
                      <td className="py-1.5 px-2.5 font-medium">Execute / ALU</td>
                      <td className="py-1.5 px-2.5 text-slate-600">
                        ALU 運算、計算記憶體位址或分支目標位址
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1.5 px-2.5 font-mono font-bold text-amber-700">MEM</td>
                      <td className="py-1.5 px-2.5 font-medium">Memory Access</td>
                      <td className="py-1.5 px-2.5 text-slate-600">
                        資料記憶體讀取 (Load) 或寫入 (Store)
                      </td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="py-1.5 px-2.5 font-mono font-bold text-rose-700">WB</td>
                      <td className="py-1.5 px-2.5 font-medium">Write Back</td>
                      <td className="py-1.5 px-2.5 text-slate-600">
                        將運算或 Load 結果寫回目的暫存器
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cache Address Decomposition */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-[#0c2340] font-serif text-xs">
                <HardDrive className="w-3.5 h-3.5 text-amber-600" />
                快取位址切割公式 (Cache Address Split)
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[11px]">
                <div className="bg-indigo-50 border border-indigo-200 rounded p-1.5">
                  <span className="text-indigo-900 font-bold block">Tag</span>
                  <span className="text-[10px] text-slate-500">32 - Index - Offset</span>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded p-1.5">
                  <span className="text-blue-900 font-bold block">Index</span>
                  <span className="text-[10px] text-slate-500">log₂(Sets)</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded p-1.5">
                  <span className="text-emerald-900 font-bold block">Offset</span>
                  <span className="text-[10px] text-slate-500">log₂(Block Size)</span>
                </div>
              </div>
              <div className="text-[11px] text-slate-600 leading-normal space-y-1">
                <div>
                  • <strong>Direct Mapped：</strong>Sets = Cache Size / Block Size
                </div>
                <div>
                  • <strong>N-way Set Associative：</strong>Sets = Cache Size / (Block Size × N)
                </div>
                <div>
                  • <strong>Fully Associative：</strong>Index = 0 bits, 全部為 Tag
                </div>
              </div>
            </div>

            {/* Pipeline Hazards Summary */}
            <div className="bg-amber-50/60 border border-amber-200/70 rounded-lg p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 font-serif text-xs">
                <Check className="w-3.5 h-3.5 text-amber-700" />
                管線冒險 (Hazards) 自我診斷提示
              </div>
              <ul className="space-y-1.5 text-[11px] text-amber-950/80">
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-amber-900 shrink-0">結構冒險：</span>
                  <span>硬體資源競爭。對策：分立 Instruction/Data Cache、管線暫存器。</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-amber-900 shrink-0">資料冒險：</span>
                  <span>
                    RAW (Read After Write)。對策：Forwarding 單元；若是 Load-Use 則需 1 週期
                    Stall。
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-amber-900 shrink-0">控制冒險：</span>
                  <span>
                    分支目標與判斷未知。對策：提前在 ID 階段比對、2-bit 動態分支預測、延遲分支。
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
