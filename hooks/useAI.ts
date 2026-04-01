'use client';

import { useState, useRef, useEffect } from 'react';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const WELCOME_MESSAGE: ChatMessage = {
  role: 'assistant',
  content:
    "Hi! I can help you explore Himanshu's profile quickly.\n\n- Ask about **projects** and tech stack\n- Request **all profile links**\n- Get a short **internship-ready summary**",
  timestamp: Date.now(),
};

// Quick suggestion prompts
const QUICK_SUGGESTIONS = [
  'Give me a 30-second profile summary',
  'Show top projects with GitHub links',
  'List AI/ML skills and tools',
  'Show certifications with dates',
  'How can I contact Himanshu quickly?',
];

export function useAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Toggle chat window
  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  // Send a message via API (server-side, API key hidden)
  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Add user message
    const userMessage: ChatMessage = {
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call API route (server-side)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          history: messages
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API request failed');
      }

      const data = await response.json();

      // Add AI response
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response || 'I apologize, but I could not generate a response.',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      // Handle error
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: `Sorry, I encountered an error. ${error instanceof Error ? error.message : 'Please try again.'}`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([WELCOME_MESSAGE]);
  };

  // Quick suggestion handler
  const handleQuickSuggestion = (suggestion: string) => {
    sendMessage(suggestion);
  };

  return {
    messages,
    isLoading,
    isOpen,
    toggleChat,
    sendMessage,
    clearChat,
    handleQuickSuggestion,
    messagesEndRef,
    quickSuggestions: QUICK_SUGGESTIONS,
  };
}