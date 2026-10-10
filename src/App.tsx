import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Send, Sparkles, RefreshCw, AlertCircle, ArrowDown } from 'lucide-react';
import { Header } from './components/Header';
import { ChatMessageItem } from './components/ChatMessageItem';
import { PromptSuggestions } from './components/PromptSuggestions';
import { ExportModal } from './components/ExportModal';
import { SocraticGuideModal } from './components/SocraticGuideModal';
import { ComputerOrgReferenceDrawer } from './components/ComputerOrgReferenceDrawer';
import { ProgressTrackerBanner } from './components/ProgressTrackerBanner';
import { analyzeProgressFromMessages } from './utils/progressAnalyzer';
import { Message, PromptTopic } from './types';

const STORAGE_KEY = 'thu_computer_org_ai_chat_v1';

export default function App() {
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modals & Drawers
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isReferenceOpen, setIsReferenceOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'progress' | 'reference'>('progress');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Compute Learning Progress & Depth Summary in real time
  const progressSummary = useMemo(() => {
    return analyzeProgressFromMessages(messages);
  }, [messages]);

  // Persist messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn('Failed to save chat to localStorage:', e);
    }
  }, [messages]);

  // Auto-scroll when messages update
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom('smooth');
  }, [messages, isStreaming]);

  // Adjust textarea height automatically
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  };

  // Submit message
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    setError(null);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    const nowStr = new Date().toLocaleTimeString('zh-TW', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: nowStr,
    };

    const assistantPlaceholderId = `assistant-${Date.now()}`;
    const assistantMessage: Message = {
      id: assistantPlaceholderId,
      role: 'model',
      content: '',
      timestamp: nowStr,
    };

    const newHistory = [...messages, userMessage];
    setMessages([...newHistory, assistantMessage]);
    setIsLoading(true);
    setIsStreaming(true);

    try {
      abortControllerRef.current = new AbortController();

      const payloadHistory = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: payloadHistory,
          stream: true,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `伺服器回應錯誤 (${res.status})`);
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      let fullText = '';

      if (reader) {
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith('data:')) continue;

            const dataStr = trimmed.replace(/^data:\s*/, '').trim();
            if (dataStr === '[DONE]') continue;

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.error) {
                throw new Error(parsed.error);
              }
              if (parsed.text) {
                fullText += parsed.text;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantPlaceholderId ? { ...m, content: fullText } : m
                  )
                );
              }
            } catch (err: any) {
              if (err.message && !dataStr.startsWith('{')) {
                // Ignore raw SSE non-json text
              } else {
                console.error('Failed to parse SSE line:', err);
              }
            }
          }
        }
      }

      if (!fullText) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantPlaceholderId
              ? {
                  ...m,
                  content:
                    '學弟妹好，請問你針對這道計算機組織題目的思考切入點是什麼呢？試著先列出涉及的硬體單元或指令週期，我們一起來推敲！',
                }
              : m
          )
        );
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Chat request aborted by user');
      } else {
        console.error('Chat error:', err);
        setError(err.message || '連線異常，請稍後重試。');
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantPlaceholderId
              ? {
                  ...m,
                  content:
                    m.content ||
                    '抱歉，助教端剛才連線稍有不穩。請再試一次或重新整理網頁，我們繼續探討！',
                }
              : m
          )
        );
      }
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectTopic = (topic: PromptTopic) => {
    handleSendMessage(topic.question);
  };

  const handleClearChat = () => {
    if (window.confirm('確定要清空目前的所有問答紀錄嗎？建議清空前先點選「下載問答紀錄」備份存檔。')) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      setMessages([]);
      localStorage.removeItem(STORAGE_KEY);
      setError(null);
    }
  };

  const insertTemplatePhrase = (phrase: string) => {
    setInput((prev) => (prev ? `${prev} ${phrase}` : phrase));
    textareaRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      {/* Top Academic Header */}
      <Header
        onOpenExport={() => setIsExportOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onToggleReference={() => {
          setDrawerTab('reference');
          setIsReferenceOpen((prev) => !prev);
        }}
        onOpenProgress={() => {
          setDrawerTab('progress');
          setIsReferenceOpen(true);
        }}
        onClearChat={handleClearChat}
        messageCount={messages.length}
        isReferenceOpen={isReferenceOpen}
        coveredUnitsCount={progressSummary.coveredUnitsCount}
        totalUnitsCount={progressSummary.totalUnitsCount}
      />

      {/* Visual Learning Progress Tracker Banner (Top of Chat Area) */}
      <ProgressTrackerBanner
        summary={progressSummary}
        onAskTopic={(prompt) => handleSendMessage(prompt)}
      />

      {/* Main Conversation Container */}
      <main className="flex-1 flex flex-col max-w-5xl w-full mx-auto relative overflow-hidden">
        {/* Error notification banner */}
        {error && (
          <div className="mx-4 mt-3 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-xs text-rose-600 underline font-medium hover:text-rose-800 ml-3"
            >
              關閉
            </button>
          </div>
        )}

        {/* Chat message display area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <PromptSuggestions onSelectTopic={handleSelectTopic} />
          ) : (
            <div className="divide-y divide-slate-100 pb-28">
              {messages.map((msg, index) => (
                <ChatMessageItem
                  key={msg.id}
                  message={msg}
                  isStreaming={isStreaming && index === messages.length - 1}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Floating Scroll to Bottom if needed */}
        {messages.length > 3 && (
          <button
            onClick={() => scrollToBottom('smooth')}
            className="absolute right-4 bottom-28 z-20 p-2 bg-white/90 hover:bg-white text-slate-600 rounded-full shadow-md border border-slate-200 transition-all hover:scale-105 active:scale-95"
            title="滾動至最新訊息"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        )}

        {/* Bottom Input Area */}
        <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] px-4 py-3">
          <div className="max-w-4xl mx-auto">
            {/* Quick Helper Chips for Computer Organization */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-[11px] text-slate-600 no-scrollbar">
              <span className="shrink-0 text-slate-400 font-medium">快速開頭：</span>
              <button
                type="button"
                onClick={() => insertTemplatePhrase('我推測這題的 CPI 計算是...，但不確定時脈週期的影響？')}
                className="shrink-0 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
              >
                ⚡ CPI 與時脈週期
              </button>
              <button
                type="button"
                onClick={() => insertTemplatePhrase('這兩條指令之間會發生 Load-Use Data Hazard 嗎？需要插入幾個 stall？')}
                className="shrink-0 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
              >
                🔄 Data Hazard 與 Stall
              </button>
              <button
                type="button"
                onClick={() => insertTemplatePhrase('請問這道 Cache 題目的 Tag、Index、Offset 位元數該如何推導？')}
                className="shrink-0 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
              >
                💾 快取位址切割
              </button>
              <button
                type="button"
                onClick={() => insertTemplatePhrase('在 5 級管線中，Forwarding 轉發單元需要檢查哪些控制訊號？')}
                className="shrink-0 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 transition-colors"
              >
                ⚙️ Forwarding 控制邏輯
              </button>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-end gap-2 bg-slate-50 border border-slate-300 focus-within:border-[#0c2340] focus-within:ring-2 focus-within:ring-[#0c2340]/15 rounded-xl p-1.5 transition-all shadow-inner"
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="請輸入你的問題、題型或推導邏輯... (Enter 送出，Shift + Enter 換行)"
                rows={1}
                disabled={isLoading}
                className="flex-1 bg-transparent border-0 resize-none px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none max-h-44 leading-relaxed"
              />

              <div className="flex items-center gap-1 shrink-0 pb-1 pr-1">
                {isLoading ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 text-amber-800 text-xs font-medium rounded-lg">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
                    <span className="hidden sm:inline">助教思考引導中...</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className={`p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                      input.trim()
                        ? 'bg-[#0c2340] hover:bg-[#16365f] text-amber-300 shadow-sm active:scale-95'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                    title="送出問題"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>

            {/* Disclaimer & Policy footnote */}
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>助教依循蘇格拉底教學法引導思考，不直接提供數值解答</span>
              </span>
              <span>東海大學資訊工程 · 計算機組織研習</span>
            </div>
          </div>
        </div>
      </main>

      {/* Computer Organization Reference & Progress Drawer */}
      <ComputerOrgReferenceDrawer
        isOpen={isReferenceOpen}
        onClose={() => setIsReferenceOpen(false)}
        summary={progressSummary}
        onAskTopic={(prompt) => handleSendMessage(prompt)}
        defaultTab={drawerTab}
      />

      {/* Socratic Guide Modal */}
      <SocraticGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      {/* Export Q&A Record Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        messages={messages}
      />
    </div>
  );
}
