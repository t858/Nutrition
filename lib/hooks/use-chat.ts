"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { useAuth } from './use-auth';

export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderRole: 'admin' | 'patient';
  timestamp: string;
  isRead: boolean;
}

interface DatabaseMessage {
  id: string;
  room_id: string;
  content: string;
  sender_id: string;
  sender_name: string;
  sender_role: string;
  timestamp: string;
  is_read: boolean;
}

export interface UseChatOptions {
  roomId: string;
  recipientName: string;
  recipientRole: 'admin' | 'patient';
}

export const useChat = ({ roomId }: UseChatOptions) => {
  const { user, role } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected] = useState(true); // Supabase is always connected
  const supabaseRef = useRef<SupabaseClient | null>(null);

  // Initialize Supabase client
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      return;
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    supabaseRef.current = supabase;

    console.log('Supabase client initialized for room:', roomId);
  }, [roomId]);

  // Load existing messages on mount and poll for new messages
  useEffect(() => {
    if (!supabaseRef.current || !roomId) return;

    const loadMessages = async () => {
      try {
        const { data, error } = await supabaseRef.current
          .from('chat_messages')
          .select('*')
          .eq('room_id', roomId)
          .order('timestamp', { ascending: true });

        if (error) {
          console.error('Error loading messages:', error);
          return;
        }

        const loadedMessages: ChatMessage[] = data.map((msg: DatabaseMessage) => ({
          id: msg.id,
          content: msg.content,
          senderId: msg.sender_id,
          senderName: msg.sender_name,
          senderRole: msg.sender_role,
          timestamp: msg.timestamp,
          isRead: msg.is_read,
        }));

        console.log('Loaded messages:', loadedMessages.length);
        setMessages(loadedMessages);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    // Load messages initially
    loadMessages();

    // Poll for new messages every 3 seconds
    const pollInterval = setInterval(loadMessages, 3000);

    return () => {
      clearInterval(pollInterval);
    };
  }, [roomId]);

  // Send message
  const sendMessage = useCallback(async (content: string) => {
    if (!supabaseRef.current || !user?.id || !content.trim()) return;

    // Create message object for immediate local display
    const newMessage: ChatMessage = {
      id: Date.now().toString(), // Temporary ID, will be replaced by real ID from DB
      content: content.trim(),
      senderId: user.id,
      senderName: user.name || 'User',
      senderRole: role === 'admin' ? 'admin' : 'patient',
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    // Add to local state immediately for instant UI feedback
    setMessages(prev => [...prev, newMessage]);

    try {
      console.log('Sending message:', { roomId, content: content.trim(), senderId: user.id });
      const { data, error } = await supabaseRef.current
        .from('chat_messages')
        .insert({
          room_id: roomId,
          content: content.trim(),
          sender_id: user.id,
          sender_name: user.name || 'User',
          sender_role: user.role === 'admin' ? 'admin' : 'patient',
          is_read: false,
        })
        .select();

      if (error) {
        console.error('Error sending message:', error);
        // Remove the message from local state if sending failed
        setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
      } else {
        console.log('Message sent successfully:', data);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove the message from local state if sending failed
      setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
    }
  }, [roomId, user, role]);

  return {
    messages,
    isConnected,
    sendMessage,
  };
};
