export interface MessagesStore {
    messages: Message[];
    addMessage: (message: Message) => void;
    delMessage: (messageId: symbol) => void;
    clearMessages: () => void;
}

export interface Message {
    id: symbol;
    type: 'success' | 'error' | 'warning' | 'info';
    title?: string;
    content: string;
}
