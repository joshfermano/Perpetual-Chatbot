import React from 'react';
import { useChat } from '../contexts/ChatContext';
import { IoClose } from 'react-icons/io5';
import { RiChatNewLine } from 'react-icons/ri';
import { FaTrash } from 'react-icons/fa';

const SideBar = ({ showMenu, onClose }) => {
  const { messages, clearChat } = useChat();

  const getConversationTitle = (messages) => {
    if (messages.length > 0) {
      const firstMessage = messages[0].content;
      return (
        firstMessage.slice(0, 30) + (firstMessage.length > 30 ? '...' : '')
      );
    }
    return 'New Conversation';
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-30 w-64 h-full bg-white text-black dark:text-white dark:bg-black shadow-lg transform transition-transform duration-300 ease-in-out ${
        showMenu ? 'translate-x-0' : '-translate-x-full'
      }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold dark:text-white">Conversations</h2>
        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white cursor-pointer">
          <IoClose size={24} />
        </button>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button
          onClick={clearChat}
          className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-black dark:text-white bg-maroon-800 rounded-lg hover:bg-maroon-900">
          <RiChatNewLine />
          New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="p-4 space-y-2">
        {messages.length > 0 ? (
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 group">
            <span className="text-sm text-gray-800 dark:text-gray-200">
              {getConversationTitle(messages)}
            </span>
            <button
              onClick={clearChat}
              className="hidden group-hover:block text-gray-500 hover:text-red-500 dark:text-gray-400">
              <FaTrash size={16} />
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            No conversations yet
          </p>
        )}
      </div>
    </aside>
  );
};

export default SideBar;
