import React, { useState } from 'react';
import { useChat } from '../contexts/ChatContext';
import { IoSend } from 'react-icons/io5';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const { sendMessage, loading } = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim() && !loading) {
      await sendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto flex items-center gap-2 p-4 border border-gray-200 rounded-2xl mt-4 dark:border-gray-700">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        className="flex-1 p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:border-maroon-800 dark:focus:border-maroon-800"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={!message.trim() || loading}
        className={`p-2 rounded-lg ${
          message.trim() && !loading
            ? 'bg-maroon-800 text-white hover:bg-maroon-900'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
        }`}>
        <IoSend className="text-xl" />
      </button>
    </form>
  );
};

export default ChatInput;
