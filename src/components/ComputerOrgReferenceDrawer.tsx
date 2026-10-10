import React from 'react';
import { X, Cpu, Layers, HardDrive, Check, Zap } from 'lucide-react';

interface ComputerOrgReferenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComputerOrgReferenceDrawer: React.FC<ComputerOrgReferenceDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full sm:w-[420px] bg-white shadow-2xl border-l border-slate-200 flex flex-col transition-all duration-200">
      {/* Header */}
      <div className="px-5 py-4 bg-[#0c2340] text-white flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-amber-300" />
          <h3 className="text-sm font-bold font-serif">計算機組織架構速查手冊</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-white rounded transition-colors"
          title="關閉速查手冊"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-slate-700">
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
            <span className="text-[10px] text-slate-500">f 為可改進比例，s 為該部分之加速倍數</span>
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
                  <td className="py-1.5 px-2.5 text-slate-600">指令解碼，讀取暫存器堆 (RegFile)，符號擴展</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="py-1.5 px-2.5 font-mono font-bold text-emerald-700">EX</td>
                  <td className="py-1.5 px-2.5 font-medium">Execute / ALU</td>
                  <td className="py-1.5 px-2.5 text-slate-600">ALU 運算、計算記憶體位址或分支目標位址</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2.5 font-mono font-bold text-amber-700">MEM</td>
                  <td className="py-1.5 px-2.5 font-medium">Memory Access</td>
                  <td className="py-1.5 px-2.5 text-slate-600">資料記憶體讀取 (Load) 或寫入 (Store)</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="py-1.5 px-2.5 font-mono font-bold text-rose-700">WB</td>
                  <td className="py-1.5 px-2.5 font-medium">Write Back</td>
                  <td className="py-1.5 px-2.5 text-slate-600">將運算或 Load 結果寫回目的暫存器</td>
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
            <div>• <strong>Direct Mapped：</strong>Sets = Cache Size / Block Size</div>
            <div>• <strong>N-way Set Associative：</strong>Sets = Cache Size / (Block Size × N)</div>
            <div>• <strong>Fully Associative：</strong>Index = 0 bits, 全部為 Tag</div>
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
              <span>RAW (Read After Write)。對策：Forwarding 單元；若是 Load-Use 則需 1 週期 Stall。</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="font-bold text-amber-900 shrink-0">控制冒險：</span>
              <span>分支目標與判斷未知。對策：提前在 ID 階段比對、2-bit 動態分支預測、延遲分支。</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
