'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Trash2, Sparkles, Bot, User, Zap } from 'lucide-react';
import { useAI, type ChatMessage } from '@/hooks/useAI';

export default function AIChat() {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const {
    messages,
    isLoading,
    isOpen,
    toggleChat,
    sendMessage,
    clearChat,
    handleQuickSuggestion,
    messagesEndRef,
    quickSuggestions,
  } = useAI();

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow"
        aria-label="Open AI Chat"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageCircle size={24} className="text-white" />
        )}
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-40 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[calc(100vh-8rem)] rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Portfolio Assistant</h3>
                  <p className="text-slate-400 text-xs">AI-powered helper</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                  title="Clear chat"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={toggleChat}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg, index) => (
                <ChatMessageBubble key={index} message={msg} />
              ))}
              
              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-white/10 rounded-2xl rounded-tl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-3">
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions.slice(0, 3).map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleQuickSuggestion(suggestion)}
                      className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 text-xs rounded-full transition-colors flex items-center gap-1.5"
                    >
                      <Zap size={10} className="text-amber-400" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask me about Himanshu..."
                  disabled={isLoading}
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 disabled:opacity-50"
                />
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <Send size={16} className="text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Chat Message Bubble Component
function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-gradient-to-br from-cyan-500 to-blue-500' 
          : 'bg-gradient-to-br from-indigo-500 to-purple-500'
      }`}>
        {isUser ? (
          <User size={16} className="text-white" />
        ) : (
          <Bot size={16} className="text-white" />
        )}
      </div>

      {/* Message Bubble */}
      <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
        isUser 
          ? 'bg-indigo-600/80 text-white rounded-tr-md' 
          : 'bg-white/10 text-slate-200 rounded-tl-md'
      }`}>
        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
      </div>
    </motion.div>
  );
}