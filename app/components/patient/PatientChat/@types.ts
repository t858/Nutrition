export interface TPatientChatProps {
  // Add props as needed
}

export interface TConversation {
  id: string;
  nutritionistName: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

export interface TMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

