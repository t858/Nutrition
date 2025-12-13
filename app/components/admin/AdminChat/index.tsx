"use client";
import { MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/Card";
import { Button } from "@/app/components/ui/Button";
import type { TAdminChatProps } from "./@types";

export default function AdminChat({}: TAdminChatProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Conversations Panel */}
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Conversations
          </h3>
          <div className="flex flex-col items-center justify-center h-96">
            <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-400 text-sm">No conversations yet</p>
          </div>
        </CardContent>
      </Card>

      {/* Chat Detail Panel */}
      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Select a conversation
          </h3>
          <div className="flex flex-col items-center justify-center h-96">
            <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-400 text-sm">
              Select a patient to start chatting
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg z-50 flex items-center justify-center"
        size="lg"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  );
}

