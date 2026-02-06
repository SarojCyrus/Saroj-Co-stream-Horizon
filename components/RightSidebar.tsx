
import React, { useState } from 'react';
import type { ChatMessage } from '../types';
import ChatBox from './ChatBox';
import AiAssistant from './AiAssistant';
import { AiIcon } from '../constants';

interface RightSidebarProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onReactToMessage: (messageIndex: number, emoji: string) => void;
}

const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
    </svg>
);


const RightSidebar: React.FC<RightSidebarProps> = ({ messages, onSendMessage, onReactToMessage }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'ai'>('chat');

  const getTabClass = (tabName: 'chat' | 'ai') => {
    return `w-1/2 py-3 px-4 text-sm font-bold flex items-center justify-center transition-colors duration-300 focus:outline-none ${
      activeTab === tabName
        ? 'bg-gray-700 text-teal-400'
        : 'bg-gray-800 text-gray-400 hover:bg-gray-700/50'
    }`;
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-800/50">
      <div className="flex border-b border-gray-700">
        <button onClick={() => setActiveTab('chat')} className={getTabClass('chat')}>
            <ChatIcon /> Live Chat
        </button>
        <button onClick={() => setActiveTab('ai')} className={getTabClass('ai')}>
            <div className="mr-2">{AiIcon}</div> AI Assistant
        </button>
      </div>
      <div className="flex-grow overflow-hidden">
        {activeTab === 'chat' ? (
          <ChatBox
            messages={messages}
            onSendMessage={onSendMessage}
            onReactToMessage={onReactToMessage}
          />
        ) : (
          <AiAssistant />
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
