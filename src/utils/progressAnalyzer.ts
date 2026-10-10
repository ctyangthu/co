import { Message } from '../types';

export interface UnitProgress {
  id: string;
  name: string;
  nameEn: string;
  iconName: string;
  description: string;
  color: string;
  keywords: string[];
  mentionsCount: number;
  depthLevel: 0 | 1 | 2 | 3; // 0: 未涉及, 1: 概念發問, 2: 深入探討, 3: 架構綜合
  depthPercentage: number;
  unlockedConcepts: string[];
  totalConcepts: string[];
}

export interface ProgressSummary {
  coveredUnitsCount: number;
  totalUnitsCount: number;
  breadthPercentage: number;
  averageDepthPercentage: number;
  overallLevelTitle: string;
  unitProgressList: UnitProgress[];
  recentFocusedUnit: string | null;
  studyAdvice: string;
}

export const CO_UNITS_CONFIG = [
  {
    id: 'perf',
    name: 'CPU 效能度量',
    nameEn: 'Performance & Metrics',
    iconName: 'Zap',
    color: 'emerald',
    description: 'CPU Time、CPI、時脈週期與 Amdahl\'s Law 加速比評估',
    totalConcepts: [
      'CPU 執行時間公式 (CPU Time)',
      '時脈頻率與週期 (Clock Rate / Cycle)',
      '每指令週期數 (CPI)',
      '阿姆達爾定律 (Amdahl\'s Law)',
      'MIPS / 基準測試 (Benchmarks)',
    ],
    keywords: [
      'cpi', 'cpu time', 'clock', '時脈', '頻率', '週期', 'amdahl', '阿姆達爾',
      'mips', '效能', '執行時間', 'cycle time', 'benchmark', 'spec', '加速比', 'speedup',
      'ic', 'instruction count'
    ],
  },
  {
    id: 'isa',
    name: '指令集架構',
    nameEn: 'Instruction Set (ISA)',
    iconName: 'Binary',
    color: 'blue',
    description: 'RISC-V / MIPS 指令格式、定址模式與暫存器操作哲學',
    totalConcepts: [
      'RISC vs CISC 設計哲學',
      'Load-Store 架構原則',
      'MIPS / RISC-V 指令格式 (R/I/S/J-Type)',
      '定址模式 (Addressing Modes)',
      '暫存器慣例與呼叫約定 (ABI)',
    ],
    keywords: [
      'isa', '指令集', 'risc', 'cisc', 'mips', 'risc-v', '暫存器', 'register',
      'load-store', 'r-type', 'i-type', 's-type', 'j-type', '定址', 'addressing',
      'opcode', 'funct', 'immediate', '立即值', 'pc-relative', 'lw', 'sw', 'add', 'sub'
    ],
  },
  {
    id: 'datapath',
    name: '處理器資料路徑',
    nameEn: 'Datapath & Control',
    iconName: 'Cpu',
    color: 'indigo',
    description: 'ALU、多工器、暫存器堆與單週期/多週期控制單元設計',
    totalConcepts: [
      'ALU 算術邏輯單元運作',
      '程式計數器 (PC) 與更新邏輯',
      '多工器 (MUX) 與訊號路由',
      '控制單元訊號 (RegWrite, ALUSrc, MemToReg)',
      '單週期 vs 多週期時鐘瓶頸',
    ],
    keywords: [
      'datapath', '資料路徑', 'alu', '控制單元', 'control unit', 'mux', '多工器',
      'regfile', '暫存器堆', '單週期', 'single cycle', '多週期', 'multi cycle',
      'regwrite', 'alusrc', 'memtoreg', 'memread', 'memwrite', 'branch', 'pc', '硬體電路'
    ],
  },
  {
    id: 'pipeline',
    name: '管線化與冒險處理',
    nameEn: 'Pipelining & Hazards',
    iconName: 'GitBranch',
    color: 'amber',
    description: '5 級管線 (IF/ID/EX/MEM/WB)、轉發單元與結構/資料/控制冒險',
    totalConcepts: [
      '5-Stage Pipeline 職責切割',
      '結構冒險 (Structural Hazard)',
      '資料冒險與 RAW (Data Hazard)',
      '轉發機制 (Forwarding / Bypassing)',
      'Load-Use 冒險與 Stall (Bubble)',
      '控制冒險與動態分支預測 (Branch Prediction)',
    ],
    keywords: [
      'pipeline', '管線', 'hazard', '冒險', 'forwarding', '轉發', 'bypass',
      'stall', 'bubble', '氣泡', 'raw', 'war', 'waw', 'load-use', '結構冒險',
      '資料冒險', '控制冒險', 'structural', 'data hazard', 'control hazard',
      '分支預測', 'branch prediction', 'if', 'id', 'ex', 'mem', 'wb', '飽和計數器'
    ],
  },
  {
    id: 'cache',
    name: '記憶體階層與快取',
    nameEn: 'Memory Hierarchy & Cache',
    iconName: 'HardDrive',
    color: 'teal',
    description: 'Tag/Index/Offset 位址切割、相聯度、命中/缺失率與寫入策略',
    totalConcepts: [
      '時間局部性與空間局部性 (Locality)',
      'Direct-Mapped 快取映射',
      'N-Way Set-Associative 組相聯',
      'Tag / Index / Offset 位址切分計算',
      '快取缺失類型 (3C Misses: Compulsory, Capacity, Conflict)',
      '寫入策略 (Write-Through vs Write-Back)',
    ],
    keywords: [
      'cache', '快取', 'memory hierarchy', '記憶體階層', 'tag', 'index', 'offset',
      'direct-mapped', 'direct mapped', 'set associative', '組相聯', 'fully associative',
      'hit', 'miss', '命中率', '缺失率', 'miss rate', 'write-through', 'write-back',
      'dirty bit', 'valid bit', 'block size', 'locality', '局部性', 'lru'
    ],
  },
  {
    id: 'virtual_mem',
    name: '虛擬記憶體與 TLB',
    nameEn: 'Virtual Memory & TLB',
    iconName: 'Layers',
    color: 'violet',
    description: '虛擬位址轉譯、分頁表 (Page Table)、TLB 快取與 Page Fault 處理',
    totalConcepts: [
      '虛擬位址 (VA) 到實體位址 (PA) 映射',
      '分頁表 (Page Table) 與頁表項 (PTE)',
      '轉譯後備緩衝區 (TLB) 加速',
      '缺頁中斷處理 (Page Fault)',
      '多層分頁與記憶體保護機制',
    ],
    keywords: [
      'virtual memory', '虛擬記憶體', 'tlb', 'page table', '頁表', 'page fault',
      '缺頁', '分頁', 'page', 'frame', '頁框', 'virtual address', 'physical address',
      'pte', '頁表項', 'swap', '置換', 'mmu'
    ],
  },
  {
    id: 'arithmetic',
    name: '算術邏輯與浮點數',
    nameEn: 'Computer Arithmetic',
    iconName: 'Calculator',
    color: 'rose',
    description: '二補數溢位、乘除法硬體、Booth 演算法與 IEEE 754 浮點數規範',
    totalConcepts: [
      '二補數 (2\'s Complement) 表示法與溢位 (Overflow)',
      '加法器與超前進位 (Carry Lookahead Adder)',
      'Booth 乘法演算法 (Booth\'s Algorithm)',
      'IEEE 754 浮點數格式 (Sign, Exponent, Mantissa)',
      '正規化、非正規數與特殊值 (NaN, Infinity)',
    ],
    keywords: [
      'arithmetic', '算術', '二補數', '2\'s complement', 'overflow', '溢位',
      'booth', '乘法', '除法', 'ieee 754', '浮點數', 'floating point',
      'exponent', 'mantissa', '假數', '指數', 'bias', '加法器', 'cla'
    ],
  },
];

export function analyzeProgressFromMessages(messages: Message[]): ProgressSummary {
  // Combine all messages into normalized text
  const combinedText = messages.map((m) => m.content.toLowerCase()).join(' ');

  let coveredUnitsCount = 0;
  let totalDepthScore = 0;
  let mostRecentUnitId: string | null = null;
  let maxMentions = 0;

  const unitProgressList: UnitProgress[] = CO_UNITS_CONFIG.map((config) => {
    let mentionsCount = 0;
    const unlockedConceptsSet = new Set<string>();

    // Count keyword occurrences
    for (const kw of config.keywords) {
      if (combinedText.includes(kw.toLowerCase())) {
        mentionsCount += 1;
      }
    }

    // Check concept unlock
    config.totalConcepts.forEach((concept) => {
      // If any specific word from concept is in text
      const parts = concept.split(/[\s(、)]+/).filter((p) => p.length > 2);
      const isUnlocked = parts.some((part) => combinedText.includes(part.toLowerCase()));
      if (isUnlocked) {
        unlockedConceptsSet.add(concept);
      }
    });

    // Also look at the latest user message to see which unit is currently in focus
    const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
    if (lastUserMsg) {
      const lastText = lastUserMsg.content.toLowerCase();
      const matchInLast = config.keywords.some((kw) => lastText.includes(kw.toLowerCase()));
      if (matchInLast && mentionsCount > maxMentions) {
        maxMentions = mentionsCount;
        mostRecentUnitId = config.id;
      }
    }

    // Determine depth level
    let depthLevel: 0 | 1 | 2 | 3 = 0;
    let depthPercentage = 0;

    if (mentionsCount === 0) {
      depthLevel = 0;
      depthPercentage = 0;
    } else if (mentionsCount <= 2 && unlockedConceptsSet.size <= 1) {
      depthLevel = 1; // 概念發問
      depthPercentage = 35;
      coveredUnitsCount += 1;
    } else if (mentionsCount <= 5 || unlockedConceptsSet.size <= 3) {
      depthLevel = 2; // 深入探討
      depthPercentage = 70;
      coveredUnitsCount += 1;
    } else {
      depthLevel = 3; // 架構綜合
      depthPercentage = 100;
      coveredUnitsCount += 1;
    }

    totalDepthScore += depthPercentage;

    return {
      id: config.id,
      name: config.name,
      nameEn: config.nameEn,
      iconName: config.iconName,
      description: config.description,
      color: config.color,
      keywords: config.keywords,
      mentionsCount,
      depthLevel,
      depthPercentage,
      unlockedConcepts: Array.from(unlockedConceptsSet),
      totalConcepts: config.totalConcepts,
    };
  });

  const totalUnitsCount = CO_UNITS_CONFIG.length;
  const breadthPercentage = Math.round((coveredUnitsCount / totalUnitsCount) * 100);
  const averageDepthPercentage =
    coveredUnitsCount > 0 ? Math.round(totalDepthScore / (totalUnitsCount * 100) * 100) : 0;

  // Derive overall title and feedback
  let overallLevelTitle = '初階啟航 · 尚未涉及核心單元';
  let studyAdvice = '點選熱門題目或主動提出你的計組疑難，助教將陪你一同抽絲剝繭！';

  if (coveredUnitsCount >= 5 && averageDepthPercentage >= 50) {
    overallLevelTitle = '系統大師 · 廣度與深度兼具';
    studyAdvice = '太棒了！你已橫跨多數核心單元，建議持續針對管線化與快取衝突進行跨層級整合推理！';
  } else if (coveredUnitsCount >= 3) {
    overallLevelTitle = '進階探索 · 多元架構開展中';
    studyAdvice = '已經涉獵數個重要單元！可以試著在對話中探討硬體權衡（如 CPI vs 時脈、快取大小 vs 命中時間）。';
  } else if (coveredUnitsCount >= 1) {
    overallLevelTitle = '概念專注 · 正在深究單一主題';
    studyAdvice = '很好，持續把當前單元的資料流向與時鐘週期釐清，隨後可以延伸至下一個相鄰單元！';
  }

  return {
    coveredUnitsCount,
    totalUnitsCount,
    breadthPercentage,
    averageDepthPercentage,
    overallLevelTitle,
    unitProgressList,
    recentFocusedUnit: mostRecentUnitId,
    studyAdvice,
  };
}
