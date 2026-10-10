import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

const SYSTEM_INSTRUCTION = `你現在是東海大學計算機組織 AI 助教的專屬 AI 助教。你的目標是引導學生思考，而不是直接給予解答。 規則：
絕對不可以直接給出最終數值答案或完整的推導過程。
當學生發問時，請使用「蘇格拉底式提問法」，點出他們可能忽略的計算機組織觀念（例如 CPU 效能與 CPI 計算、指令集架構 RISC-V / MIPS、管線化 Pipeline 與 Hazard 冒險處理、快取記憶體 Cache 映射與命中率、虛擬記憶體與 TLB、浮點數與 ALU 運算等），並反問他們下一步該怎麼做。
語氣要像是一位溫和、有耐心的學長姐，適時給予鼓勵。
全程使用繁體中文回覆。`;

// Gemini client initialization (server-side only)
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('系統未檢測到 GEMINI_API_KEY，請確認環境設定。');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

interface MessagePart {
  text: string;
}

interface ChatMessage {
  role: 'user' | 'model';
  parts: MessagePart[];
}

// POST /api/chat - Route Handler for AI Socratic Assistant
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history = [], stream = true } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: '請提供有效的問題內容。' });
      return;
    }

    const ai = getAiClient();

    // Format chat contents with previous history
    // Notice @google/genai format: contents is an array of { role: 'user' | 'model', parts: [{ text }] }
    const formattedContents: ChatMessage[] = [];

    if (Array.isArray(history)) {
      for (const item of history) {
        if (item && (item.role === 'user' || item.role === 'model') && typeof item.content === 'string') {
          formattedContents.push({
            role: item.role,
            parts: [{ text: item.content }],
          });
        }
      }
    }

    // Append the current user prompt
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    if (stream) {
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-transform');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders?.();

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      for await (const chunk of responseStream) {
        const text = chunk.text || '';
        if (text) {
          res.write(`data: ${JSON.stringify({ text })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } else {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      res.json({
        text: response.text || '學弟妹好，請試著具體說明你正在思考的會計觀念，我們一起抽絲剝繭！',
      });
    }
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    const errorMessage = error?.message || '伺服器處理問題時發生錯誤，請稍後再試。';

    if (res.headersSent) {
      res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
    } else {
      res.status(500).json({ error: errorMessage });
    }
  }
});

// Start server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`AI Assistant server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
