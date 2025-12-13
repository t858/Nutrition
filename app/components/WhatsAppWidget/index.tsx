"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/app/components/ui/Button";
import { Textarea } from "@/app/components/ui/TextArea";
export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  // WhatsApp business number (format: country code + number without + or spaces)
  const whatsappNumber = "15551234567"; // Replace with actual number

  const defaultMessages = [
    "Hi! I'd like to book a consultation",
    "I have questions about your services",
    "I need help with my nutrition plan",
    "Can you tell me about pricing?",
  ];

  const sendWhatsAppMessage = (text: string) => {
    const encodedMessage = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
    setMessage("");
  };

  const handleCustomMessage = () => {
    if (message.trim()) {
      sendWhatsAppMessage(message);
    }
  };

  return (
    <>
      {/* WhatsApp Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-lg hover:shadow-xl transition-all"
        >
          {isOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <FaWhatsapp className="w-10 h-10 text-white" />
          )}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-emerald-100">
              {/* Header */}
              <div className="bg-[#25D366] text-white p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <FaWhatsapp className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">NutriWell Support</h3>
                    <p className="text-xs text-white/80">
                      Typically replies instantly
                    </p>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 bg-emerald-50 max-h-96 overflow-y-auto">
                <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
                  <p className="text-sm text-gray-700 mb-2">
                    👋 Hello! How can we help you today?
                  </p>
                  <p className="text-xs text-gray-500">
                    Choose a quick message or type your own:
                  </p>
                </div>

                {/* Quick Messages */}
                <div className="space-y-2 mb-4">
                  {defaultMessages.map((msg, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => sendWhatsAppMessage(msg)}
                      className="w-full text-left p-3 bg-white hover:bg-emerald-50 rounded-lg border-2 border-emerald-100 transition-colors text-sm"
                    >
                      {msg}
                    </motion.button>
                  ))}
                </div>

                {/* Custom Message */}
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your custom message..."
                    rows={3}
                    className="border-emerald-200 focus:border-emerald-600 text-sm mb-2"
                  />
                  <Button
                    onClick={handleCustomMessage}
                    disabled={!message.trim()}
                    className="w-full bg-[#25D366] hover:bg-[#128C7E]"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send on WhatsApp
                  </Button>
                </div>
              </div>

              {/* Footer */}
              <div className="bg-gray-50 p-3 text-center">
                <p className="text-xs text-gray-500">
                  We'll respond on WhatsApp
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
