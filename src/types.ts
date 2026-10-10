export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface PromptTopic {
  category: string;
  title: string;
  question: string;
  conceptHint: string;
  iconName: string;
}

export type ExportFormat = 'md' | 'txt';
