import React, { useRef, useEffect } from 'react';
import { useChat } from '../contexts/ChatContext';
import { LuBotMessageSquare } from 'react-icons/lu';
import ChatInput from './ChatInput';

const ChatBubble = () => {
  const { messages, loading, error, isTyping } = useChat();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="dark:bg-black dark:text-white p-4">
      <div className="max-w-4xl mx-auto p-4 font-poppins h-[80vh] bg-white dark:bg-black border border-gray-200 rounded-2xl flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <LuBotMessageSquare className="text-6xl font-bold dark:text-white" />
              <div className="flex flex-col items-center justify-center text-center space-y-2">
                <h1 className="text-2xl font-bold">
                  Welcome to UPSHD Molino Chatbot!
                </h1>
                <p className="text-sm text-gray-400">
                  I will help you answer your inquiries such as academic,
                  tuition fees, resources, programs offered, and many more.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'text-black dark:bg-gray-200 dark:text-black shadow-md'
                        : 'bg-gray-100 dark:bg-gray-800 shadow-md'
                    }`}>
                    {message.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[70%] p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                    Typing...
                  </div>
                </div>
              )}
              {error && <div className="text-red-500 text-center">{error}</div>}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>
      <ChatInput />
    </div>
  );
};

export default ChatBubble;
