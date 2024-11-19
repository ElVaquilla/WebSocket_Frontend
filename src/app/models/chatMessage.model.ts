export interface ChatMessage {
    text: string;
    type: 'sent' | 'received'; // Solo estos dos tipos
    username: string,
    timestamp: string,
  }