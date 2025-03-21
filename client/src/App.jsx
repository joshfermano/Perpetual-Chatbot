import React from 'react';
import { ChatProvider } from './contexts/ChatContext';
import MainLayout from './layouts/MainLayout';

const App = () => {
  return (
    <ChatProvider>
      <MainLayout />
    </ChatProvider>
  );
};

export default App;
