import React, { useState, useEffect, createContext, useContext } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Error parsing saved messages:', e);
      }
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Function to send message to API
  const sendMessage = async (message) => {
    try {
      setLoading(true);
      setIsTyping(true);
      setError(null);

      // Add user message to chat
      const userMessage = { role: 'user', content: message };
      setMessages((prev) => [...prev, userMessage]);

      // Make API call
      // const response = await fetch('http://localhost:5000/api/chat', {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          sessionId: 'default',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      if (data.success) {
        const botMessage = { role: 'assistant', content: data.message };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
    localStorage.removeItem('chatMessages');
  };

  const value = {
    messages,
    loading,
    isTyping,
    error,
    sendMessage,
    clearChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
