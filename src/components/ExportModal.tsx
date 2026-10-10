import React, { useState } from 'react';
import { Download, Copy, Check, FileText, Code2, X } from 'lucide-react';
import { Message, ExportFormat } from '../types';
import { formatConversationForExport, downloadFile } from '../utils/exportUtils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, messages }) => {
  const [format, setFormat] = useState<ExportFormat>('md');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const exportedText = formatConversationForExport(messages, format);

  const handleDownload = () => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(
      now.getDate()
    ).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(
      now.getMinutes()
    ).padStart(2, '0')}`;
    const filename = `東海大學計算機組織_AI助教問答紀錄_${dateStr}.${format}`;
    const mimeType = format === 'md' ? 'text/markdown' : 'text/plain';
    downloadFile(exportedText, filename, mimeType);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#0c2340] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-amber-400/20 rounded-lg text-amber-300">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold font-serif">下載問答紀錄</h3>
              <p className="text-xs text-slate-300">
                匯出目前研習對話，包含完整問題、學長姐啟發引導與複習備忘
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

        {/* Format Selector */}
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-700">選擇匯出格式：</span>
            <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5">
              <button
                onClick={() => setFormat('md')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  format === 'md'
                    ? 'bg-[#0c2340] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Markdown (.md)</span>
              </button>
              <button
                onClick={() => setFormat('txt')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  format === 'txt'
                    ? 'bg-[#0c2340] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>純文字檔 (.txt)</span>
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-500">
            共 <strong className="text-slate-800">{messages.length}</strong> 則問答對話
          </div>
        </div>

        {/* Content Preview */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              檔案內容預覽
            </span>
            <span className="text-[11px] text-slate-400">
              {format === 'md' ? '支援 Notion、Obsidian、HackMD 等筆記軟體' : '通用純文字格式，支援記事本與 Word'}
            </span>
          </div>
          <div className="bg-slate-900 text-slate-200 font-mono text-xs rounded-lg p-4 overflow-x-auto max-h-72 border border-slate-800 leading-relaxed whitespace-pre-wrap select-all">
            {exportedText}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-md transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">已複製全部內容</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>一鍵複製內容</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 transition-colors"
            >
              關閉
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#0c2340] bg-gradient-to-r from-[#c5a059] to-[#b38a3d] hover:from-[#d1ad65] hover:to-[#be9445] rounded-md shadow-sm border border-amber-300 transition-all active:scale-95"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>立即下載檔案 (.{format})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
