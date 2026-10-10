import React from 'react';
import { Download, BookOpen, Trash2, HelpCircle, BarChart3 } from 'lucide-react';

interface HeaderProps {
  onOpenExport: () => void;
  onOpenGuide: () => void;
  onToggleReference: () => void;
  onOpenProgress: () => void;
  onClearChat: () => void;
  messageCount: number;
  isReferenceOpen: boolean;
  coveredUnitsCount: number;
  totalUnitsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenExport,
  onOpenGuide,
  onToggleReference,
  onOpenProgress,
  onClearChat,
  messageCount,
  isReferenceOpen,
  coveredUnitsCount,
  totalUnitsCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#0c2340] border-b border-[#1e3a5f] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Logo */}
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c5a059] to-[#997328] flex items-center justify-center shadow-inner text-[#0c2340] font-serif font-bold text-lg select-none ring-1 ring-amber-300/40">
              東
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white font-serif">
                  東海大學計算機組織 AI 助教
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 text-[11px] font-medium bg-[#1e3a5f] text-amber-200 rounded border border-[#2d5584]">
                  蘇格拉底啟發模式
                </span>
              </div>
              <p className="text-xs text-slate-300 hidden md:block">
                東海大學資訊工程 · 計算機組織研習專屬 · 引導思考深入破除架構盲點
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            {/* Visual Learning Progress Tracker Button */}
            <button
              onClick={onOpenProgress}
              className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-amber-200 bg-[#16365f] hover:bg-[#1e467a] border border-[#2d588c] rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
              title="查看當前對話涉獵之計組單元廣度與深度分析"
            >
              <BarChart3 className="w-3.5 h-3.5 mr-1 text-amber-300" />
              <span className="hidden sm:inline">學習進度</span>
              <span className="ml-1.5 px-1.5 py-0.2 bg-amber-400/20 text-amber-300 text-[10px] rounded-full font-bold">
                {coveredUnitsCount}/{totalUnitsCount}
              </span>
            </button>

            {/* Socratic Guide Button */}
            <button
              onClick={onOpenGuide}
              className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium text-slate-200 bg-[#152e4d] hover:bg-[#1e3e68] border border-[#264a77] rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
              title="查看助教引導原則與提問技巧"
            >
              <HelpCircle className="w-3.5 h-3.5 mr-1 text-amber-400" />
              <span className="hidden sm:inline">助教指引</span>
            </button>

            {/* Quick Reference Toggle */}
            <button
              onClick={onToggleReference}
              className={`inline-flex items-center px-2.5 py-1.5 text-xs font-medium border rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                isReferenceOpen
                  ? 'bg-amber-500/20 text-amber-200 border-amber-400/50'
                  : 'text-slate-200 bg-[#152e4d] hover:bg-[#1e3e68] border-[#264a77]'
              }`}
              title="查閱 CPU 公式與 5 級管線速查手冊"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1 text-amber-300" />
              <span className="hidden sm:inline">計組速查</span>
            </button>

            {/* Download Q&A Record Button */}
            <button
              onClick={onOpenExport}
              disabled={messageCount === 0}
              className={`inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-md shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                messageCount === 0
                  ? 'bg-slate-700/50 text-slate-400 border border-slate-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#c5a059] to-[#b38a3d] hover:from-[#d1ad65] hover:to-[#be9445] text-[#0c2340] border border-amber-300/60 active:scale-95'
              }`}
              title={messageCount === 0 ? '目前尚無對話紀錄可供下載' : '下載目前問答紀錄 (.txt / .md)'}
            >
              <Download className="w-3.5 h-3.5 mr-1.5 stroke-[2.5]" />
              <span className="hidden md:inline">下載問答紀錄</span>
              <span className="md:hidden">匯出</span>
              {messageCount > 0 && (
                <span className="ml-1.5 bg-[#0c2340]/25 text-[#0c2340] text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  {messageCount}
                </span>
              )}
            </button>

            {/* Clear Chat */}
            {messageCount > 0 && (
              <button
                onClick={onClearChat}
                className="p-1.5 text-slate-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-md transition-colors focus:outline-none focus:ring-1 focus:ring-rose-400"
                title="重新開始新對話"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
