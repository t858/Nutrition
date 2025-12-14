"use client";
import { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Check,
  CheckCheck,
  FileText,
  Image,
  X,
  Wifi,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/Avatar";
import type { TAdminChatProps } from "./@types";
import { useChat } from "@/lib/hooks/use-chat";

interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

export default function AdminChat({}: TAdminChatProps) {
  const [newMessage, setNewMessage] = useState("");
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use the same room ID as patient for real-time communication
  const roomId = "patient-admin-chat";

  // Use the chat hook for real-time messaging
  const { messages, isConnected, sendMessage } = useChat({
    roomId,
    recipientName: "Patient",
    recipientRole: "patient",
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() && attachments.length === 0) return;

    sendMessage(newMessage.trim());
    setNewMessage("");
    setAttachments([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newAttachments: FileAttachment[] = files.map(file => ({
      id: Date.now() + Math.random().toString(),
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setAttachments(prev => [...prev, ...newAttachments]);
    e.target.value = ""; // Reset input
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const formatTime = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateObj.toDateString() === today.toDateString()) {
      return "Today";
    } else if (dateObj.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return dateObj.toLocaleDateString();
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-4 h-4" alt="Image file" />;
    return <FileText className="w-4 h-4" alt="Document file" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      <Card className="flex-1 flex flex-col border border-gray-200">
        {/* Chat Header */}
        <CardHeader className="border-b border-gray-200 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="" />
                <AvatarFallback className="bg-green-100 text-green-700">
                  A
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Patient Support
                </h3>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <p className="text-sm text-gray-500">
                    {isConnected ? "Connected" : "Connecting..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-gray-500">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Messages Area */}
        <CardContent className="flex-1 flex flex-col p-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center">
                  <Wifi className={`w-16 h-16 mx-auto mb-4 ${isConnected ? 'text-green-300' : 'text-gray-300'}`} />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {isConnected ? "Waiting for messages" : "Connecting to chat..."}
                  </h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    {isConnected
                      ? "Messages between you and patients will appear here in real-time."
                      : "Please wait while we establish the connection."
                    }
                  </p>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => {
                  const isOwnMessage = message.senderRole === "admin";
                  const showDateSeparator = index === 0 ||
                    formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);

                  return (
                    <div key={message.id}>
                      {showDateSeparator && (
                        <div className="flex items-center justify-center my-4">
                          <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                            {formatDate(message.timestamp)}
                          </div>
                        </div>
                      )}

                      <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2`}>
                        <div className={`flex gap-2 max-w-[70%] ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                          {!isOwnMessage && (
                            <Avatar className="w-8 h-8 mt-1">
                              <AvatarImage src="" />
                              <AvatarFallback className="bg-green-100 text-green-700 text-xs">
                                P
                              </AvatarFallback>
                            </Avatar>
                          )}

                          <div className={`max-w-full ${isOwnMessage ? 'bg-green-500 text-white' : 'bg-green-100 text-green-900'} rounded-2xl px-4 py-2`}>
                            <p className="text-sm break-words">{message.content}</p>
                            <div className={`flex items-center gap-1 mt-1 ${
                              isOwnMessage ? 'justify-end' : 'justify-start'
                            }`}>
                              <span className={`text-xs ${
                                isOwnMessage ? 'text-green-100' : 'text-green-700'
                              }`}>
                                {formatTime(message.timestamp)}
                              </span>
                              {isOwnMessage && (
                                message.isRead ? (
                                  <CheckCheck className="w-3 h-3 text-green-100" />
                                ) : (
                                  <Check className="w-3 h-3 text-green-100" />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

              </>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* File Attachments Preview */}
          {attachments.length > 0 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2"
                  >
                    {getFileIcon(attachment.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {attachment.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(attachment.size)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(attachment.id)}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-end gap-2">
              {/* File Upload Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <Paperclip className="w-4 h-4" />
              </Button>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* Message Input */}
              <div className="flex-1">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full resize-none border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={1}
                  style={{ minHeight: '40px', maxHeight: '120px' }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                  }}
                />
              </div>

              {/* Send Button */}
              <Button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() && attachments.length === 0}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* File Upload Hint */}
            <p className="text-xs text-gray-500 mt-2">
              You can attach images, PDFs, and documents up to 10MB each.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

