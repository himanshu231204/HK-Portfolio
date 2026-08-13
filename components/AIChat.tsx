'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MessageCircle, X, Send, Trash2, Clock3 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAI, type ChatMessage } from '@/hooks/useAI';

export default function AIChat() {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion();

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
      <button
        onClick={toggleChat}
        aria-label={isOpen ? 'Close assistant' : 'Open assistant'}
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--surface)] text-ink shadow-lg transition-colors hover:bg-[var(--surface-hover)]"
      >
        {isOpen ? <X size={19} /> : <MessageCircle size={19} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Portfolio assistant"
            className="fixed bottom-22 right-6 z-40 flex h-[520px] max-h-[calc(100vh-8rem)] w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
              <div className="min-w-0">
                <h3 className="text-sm font-medium">Portfolio assistant</h3>
                <p className="mono-meta mt-0.5 truncate">Projects, stack and contact details</p>
              </div>
              <div className="flex shrink-0 items-center gap-0.5">
                <button
                  onClick={clearChat}
                  aria-label="Clear conversation"
                  title="Clear conversation"
                  className="rounded-md p-2 text-ink-faint transition-colors hover:bg-[var(--surface)] hover:text-ink"
                >
                  <Trash2 size={15} />
                </button>
                <button
                  onClick={toggleChat}
                  aria-label="Close assistant"
                  className="rounded-md p-2 text-ink-faint transition-colors hover:bg-[var(--surface)] hover:text-ink"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((msg, index) => (
                <ChatMessageBubble key={index} message={msg} />
              ))}

              {isLoading && (
                <div className="flex gap-1.5 px-1 py-2">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--accent)]"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-3">
                {quickSuggestions.slice(0, 3).map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleQuickSuggestion(suggestion)}
                    className="tag transition-colors hover:border-[var(--accent-border)] hover:text-ink"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {/* Composer */}
            <div className="border-t border-[var(--border)] p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about projects, stack, links…"
                  disabled={isLoading}
                  aria-label="Message"
                  className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--bg-subtle)] px-3.5 py-2.5 text-sm text-ink transition-colors placeholder:text-ink-faint focus:border-[var(--accent-border)] focus:outline-none disabled:opacity-60"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send message"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ChatMessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className={isUser ? 'flex justify-end' : ''}>
      <div
        className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm ${
          isUser
            ? 'bg-[var(--accent)] text-[var(--accent-contrast)]'
            : 'border border-[var(--border)] bg-[var(--surface)] text-ink'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        ) : (
          <div className="space-y-2 leading-relaxed [&_li]:ml-4 [&_li]:list-disc [&_ol]:space-y-1 [&_ul]:space-y-1">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ ...props }) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--accent)] underline underline-offset-2"
                  />
                ),
                code: ({ className, children, ...props }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code
                        {...props}
                        className="rounded bg-[var(--bg-subtle)] px-1 py-0.5 font-mono text-xs"
                      >
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code {...props} className={`${className} font-mono text-xs`}>
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className="overflow-x-auto rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] p-3">
                    {children}
                  </pre>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}

        <div
          className={`mt-2 flex items-center gap-1 font-mono text-[10px] ${
            isUser ? 'justify-end opacity-70' : 'text-ink-faint'
          }`}
        >
          <Clock3 size={10} />
          {time}
        </div>
      </div>
    </div>
  );
}
