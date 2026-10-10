import { PromptTopic } from '../types';

export const PROMPT_TOPICS: PromptTopic[] = [
  {
    category: '效能評估 · CPU Performance',
    title: '時脈頻率加倍，執行時間一定減半嗎？',
    question: '學長姐好！如果我們把 CPU 的時脈頻率 (Clock Rate) 從 2 GHz 提升到 4 GHz，程式的執行時間一定會縮短為原本的一半嗎？背後有什麼容易被忽略的關鍵變數？',
    conceptHint: '核心觀念：CPU Time = IC × CPI × Clock Cycle Time、記憶體牆 (Memory Wall)、Amdahl\'s Law',
    iconName: 'Cpu',
  },
  {
    category: '管線化架構 · Pipeline Hazards',
    title: 'Load-Use 資料冒險與轉發機制',
    question: '在 5-stage MIPS/RISC-V 管線中，為什麼發生 Load-Use Data Hazard 時，單靠 Forwarding (Bypassing) 無法完全消除延遲，仍然需要插入一個 Stall (Bubble)？',
    conceptHint: '核心觀念：MEM 階段資料產出時間點 vs EX 階段運算需求時間點',
    iconName: 'GitBranch',
  },
  {
    category: '快取記憶體 · Cache Mapping',
    title: 'Direct-Mapped vs 組相聯快取位址切割',
    question: '在一個 32-bit 位址系統中，若 Cache 大小為 16 KB、Block 大小為 32 Bytes，採用 2-way Set Associative，位址該如何切分成 Tag、Index 與 Offset？',
    conceptHint: '核心觀念：Byte-addressable、Block Offset = log2(Block Size)、Index = log2(Sets)',
    iconName: 'HardDrive',
  },
  {
    category: '指令集架構 · ISA 設計哲學',
    title: '為什麼 RISC 堅持 Load-Store 架構？',
    question: '請問為什麼 RISC (如 RISC-V、MIPS) 堅持只能透過 Load/Store 指令存取記憶體，而不像 x86 (CISC) 允許運算指令 (如 ADD) 直接操作記憶體運算元？',
    conceptHint: '核心觀念：簡化硬體控制、固定指令長度、時鐘週期一致性與管線化效率',
    iconName: 'Binary',
  },
  {
    category: '控制冒險 · Branch Prediction',
    title: '2-bit 動態分支預測如何避免震盪？',
    question: '在深層管線處理器中，為什麼 2-bit 飽和計數器 (Saturating Counter) 的動態分支預測效果，會顯著優於 1-bit 預測器？在迴圈 (Loop) 結尾時有何差別？',
    conceptHint: '核心觀念：連續兩次預測失誤才切換狀態、避免巢狀迴圈出口的雙重懲罰 (Double Penalty)',
    iconName: 'GitFork',
  },
  {
    category: '自主解題 · 邏輯診斷',
    title: '請幫我診斷這題 Forwarding 條件式',
    question: '我在寫 Forwarding Unit 的控制邏輯：當 EX/MEM.RegisterRd == ID/EX.RegisterRs 時進行轉發。學長姐，請問我漏掉了哪些限制條件？（例如 $zero 暫存器或 RegWrite 訊號）',
    conceptHint: '核心觀念：RegWrite 是否啟用、目的暫存器是否為 $0、MEM/WB 與 EX/MEM 之優先順序',
    iconName: 'HelpCircle',
  },
];
