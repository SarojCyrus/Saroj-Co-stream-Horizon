
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';

interface ChatBoxProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onReactToMessage: (messageIndex: number, emoji: string) => void;
}

const EMOJI_REACTIONS = ['👍', '❤️', '😂', '😮'];

const ChatBox: React.FC<ChatBoxProps> = ({ messages, onSendMessage, onReactToMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <h3 className="text-lg font-semibold p-4 border-b border-gray-700 text-teal-400">Live Chat</h3>
      <div ref={chatContainerRef} className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="group">
            <div className="flex items-baseline space-x-2 mb-1">
              <span className="font-bold text-sm text-teal-400">{msg.user}</span>
              <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
            </div>
            <div className="relative">
                <p className="text-gray-200 bg-gray-700/50 rounded-lg p-2 text-sm w-fit max-w-full break-words">
                    {msg.message}
                </p>
                <div className="absolute top-[-12px] right-0 flex items-center bg-gray-600 rounded-full px-2 py-0.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    {EMOJI_REACTIONS.map(emoji => (
                        <button
                            key={emoji}
                            onClick={() => onReactToMessage(index, emoji)}
                            className="text-lg hover:scale-125 transition-transform p-1"
                            aria-label={`React with ${emoji}`}
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            </div>
            
            {msg.reactions && Object.keys(msg.reactions).length > 0 && (
              <div className="flex items-center space-x-1 mt-1">
                {Object.entries(msg.reactions).map(([emoji, count]) => (
                  <div key={emoji} className="flex items-center bg-teal-500/20 text-teal-300 text-xs px-2 py-0.5 rounded-full">
                    <span>{emoji}</span>
                    <span className="ml-1 font-semibold">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Say something..."
            className="w-full bg-gray-700 text-white rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold p-2 rounded-r-lg transition-colors duration-300"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;