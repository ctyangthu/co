import React from 'react';
import { X, Sparkles, Cpu, Lightbulb, CheckCircle2, AlertCircle } from 'lucide-react';

interface SocraticGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SocraticGuideModal: React.FC<SocraticGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0c2340] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-amber-400/20 rounded-lg text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif">助教教學指引 · 蘇格拉底反詰法</h3>
              <p className="text-xs text-slate-300">
                東海大學計算機組織 AI 助教的引導理念與互動法則
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700 text-sm">
          {/* Mission */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-lg p-4">
            <h4 className="font-semibold text-amber-900 flex items-center gap-1.5 mb-1.5 font-serif">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              為什麼 AI 助教不直接提供最後數值或答案？
            </h4>
            <p className="text-amber-950/80 leading-relaxed text-xs sm:text-sm">
              計算機組織（Computer Organization）探討的是軟硬體交界的精妙架構與權衡取捨（Trade-offs）。直接抄寫答案無法讓你在面對複雜的管線化冒險、快取衝突或 CPI 計算時融會貫通。助教學長姐會像一位溫和有耐心的同儕，陪伴你從硬體訊號與時鐘週期逐步推理，建立真正的系統架構洞察力！
            </p>
          </div>

          {/* Socratic Four Steps */}
          <div>
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-1.5 font-serif">
              <Cpu className="w-4 h-4 text-[#0c2340]" />
              計算機組織思考引導四部曲
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <span className="font-bold text-[#0c2340] block mb-1">
                  1. 辨別硬體元件與時鐘週期
                </span>
                當前運算涉及哪些硬體單元（ALU、Register File、Data Memory、PC）？資料何時產出與就緒？
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <span className="font-bold text-[#0c2340] block mb-1">
                  2. 分析冒險類型 (Hazards)
                </span>
                是否有結構冒險 (Structural)、資料相依 (Data Hazard) 還是分支預測失誤 (Control Hazard)？
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <span className="font-bold text-[#0c2340] block mb-1">
                  3. 評估硬體解決策略
                </span>
                該採用 Forwarding (Bypassing)、Pipeline Stall (Bubble) 還是 Branch Delay Slot 解決？
              </div>
              <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <span className="font-bold text-[#0c2340] block mb-1">
                  4. 量化效能指標 (Metrics)
                </span>
                此架構決策對整體 CPU Time、CPI (Cycles Per Instruction) 與記憶體頻寬有何實質影響？
              </div>
            </div>
          </div>

          {/* Student Best Practice */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 font-serif">
              學弟妹如何發問能獲得最佳收穫？
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>貼上你的推導思路或草稿：</strong>例如「我認為這兩條指令會有 RAW 相依，在 CC4 可以轉發，但不確定是不是需要插入 stall？」助教能立即針對你的盲點點撥。
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>主動回答助教的反問：</strong>助教會拋出思考問題，請試著說出你的推論，助教會持續為你驗證修正。
                </span>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>善用「下載問答紀錄」：</strong>討論結束後點擊右上角下載紀錄，存檔為 Markdown 筆記，方便期中考與期末考複習！
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#0c2340] hover:bg-[#16365f] rounded-md transition-colors"
          >
            我瞭解了，開始提問
          </button>
        </div>
      </div>
    </div>
  );
};
