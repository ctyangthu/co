import { Message, ExportFormat } from '../types';

export function formatConversationForExport(messages: Message[], format: ExportFormat): string {
  const exportDate = new Date().toLocaleString('zh-TW', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  if (format === 'md') {
    let md = `# 東海大學計算機組織 AI 助教 - 問答研習紀錄\n\n`;
    md += `> **匯出時間**：${exportDate}  \n`;
    md += `> **導引模式**：蘇格拉底式提問法（啟發式引導、破除計算機架構盲點）  \n`;
    md += `> **對話總數**：共 ${messages.length} 則問答對話  \n\n`;
    md += `---\n\n`;
    md += `## 💻 對話歷程紀錄\n\n`;

    messages.forEach((msg, idx) => {
      const roleLabel = msg.role === 'user' ? '👤 學生發問' : '🎓 東海計組 AI 助教';
      const order = Math.floor(idx / 2) + 1;
      const subOrder = msg.role === 'user' ? '【問題】' : '【引導與啟發】';

      md += `### 第 ${order} 題 ${subOrder} (${roleLabel}) · ${msg.timestamp}\n\n`;
      md += `${msg.content}\n\n`;
      md += `---\n\n`;
    });

    md += `\n## 📝 課後複習思考備忘錄 (Computer Organization Self-Check)\n\n`;
    md += `- [ ] 是否掌握 CPU Performance 公式 ($CPU\\ Time = IC \\times CPI \\times Clock\\ Cycle\\ Time$)？\n`;
    md += `- [ ] 是否能清楚畫出 5-stage Pipeline 各階段 (IF, ID, EX, MEM, WB) 之資料流向？\n`;
    md += `- [ ] 是否能準確辨識 Structural, Data, Control Hazard 並說明解決對策？\n`;
    md += `- [ ] 是否能自主推導 Cache 位址切割 (Tag, Index, Offset) 與缺失率分析？\n`;
    md += `- [ ] 若有任何架構觀念疑義，建議與授課教師或助教群進一步研討。\n\n`;
    md += `*本檔案由「東海大學計算機組織 AI 助教」自動產生，供學生個人課堂複習與學術研討使用。*\n`;
    return md;
  } else {
    // Plain text format (.txt)
    let txt = `=======================================================\n`;
    txt += `  東海大學計算機組織 AI 助教 - 問答研習紀錄\n`;
    txt += `=======================================================\n`;
    txt += `匯出時間：${exportDate}\n`;
    txt += `導引模式：蘇格拉底式提問法（不直接給予數值答案，引導深度思考）\n`;
    txt += `對話總數：共 ${messages.length} 則紀錄\n`;
    txt += `-------------------------------------------------------\n\n`;

    messages.forEach((msg, idx) => {
      const roleLabel = msg.role === 'user' ? '【學生發問】' : '【AI 助教學長姐引導】';
      txt += `${roleLabel}  (${msg.timestamp})\n`;
      txt += `${msg.content}\n`;
      txt += `\n-------------------------------------------------------\n\n`;
    });

    txt += `【課後複習自我檢核】\n`;
    txt += `1. 是否已掌握本題核心之計算機組織硬體原理與公式定義？\n`;
    txt += `2. 是否能獨立推導管線流向或 Cache 位址，並清楚說明每一步的硬體意義？\n`;
    txt += `3. 能否向其他同學清楚闡述本題推導邏輯與設計權衡 (Trade-offs)？\n\n`;
    txt += `(本檔案由 東海大學計算機組織 AI 助教 產生)\n`;
    return txt;
  }
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
