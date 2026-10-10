import React, { useState, useMemo } from 'react';
import { Copy, Check, User, Sparkles, Quote } from 'lucide-react';
import { marked } from 'marked';
import { Message } from '../types';

interface ChatMessageItemProps {
  message: Message;
  isStreaming?: boolean;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message, isStreaming = false }) => {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const htmlContent = useMemo(() => {
    if (isUser) return '';
    try {
      return marked.parse(message.content || '', {
        breaks: true,
        gfm: true,
      }) as string;
    } catch {
      return message.content;
    }
  }, [message.content, isUser]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div
      className={`py-4 px-3 sm:px-6 transition-colors ${
        isUser ? 'bg-slate-50/70' : 'bg-white border-y border-slate-100'
      }`}
    >
      <div className="max-w-4xl mx-auto flex items-start gap-3 sm:gap-4">
        {/* Avatar */}
        <div className="shrink-0 mt-0.5">
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center font-medium shadow-sm">
              <User className="w-4 h-4 text-slate-100" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0c2340] to-[#1c3f68] text-amber-300 border border-amber-400/40 flex items-center justify-center font-serif font-bold text-xs shadow-sm">
              東海
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-800">
                {isUser ? '我 (發問學生)' : '東海 AI 助教學長姐'}
              </span>
              {!isUser && (
                <span className="inline-flex items-center text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200/60 font-medium">
                  <Sparkles className="w-2.5 h-2.5 mr-1 text-amber-600" />
                  蘇格拉底啟發思維
                </span>
              )}
              <span className="text-[11px] text-slate-400">{message.timestamp}</span>
            </div>

            {/* Action buttons */}
            {!isStreaming && message.content && (
              <div className="flex items-center gap-1">
                <button
                  onClick={handleCopy}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors text-xs flex items-center gap-1"
                  title="複製文字內容"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-[10px] text-emerald-600 font-medium">已複製</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[10px] hidden sm:inline text-slate-500">複製</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Message Content */}
          {isUser ? (
            <div className="text-slate-800 text-[15px] leading-relaxed whitespace-pre-wrap font-normal">
              {message.content}
            </div>
          ) : (
            <div className="relative">
              <div
                className="markdown-body text-slate-800 leading-relaxed text-[15px]"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
              {isStreaming && (
                <span className="inline-block w-2 h-4 ml-1 bg-amber-600 animate-pulse align-middle" />
              )}
            </div>
          )}

          {/* Socratic gentle reflection cue */}
          {!isUser && !isStreaming && (
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500">
              <Quote className="w-3.5 h-3.5 text-amber-600/70 shrink-0" />
              <span className="text-[12px] italic text-slate-500">
                學弟妹可以試著把推導步驟或心中的判斷回覆給我，我們一步一步驗證！
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
