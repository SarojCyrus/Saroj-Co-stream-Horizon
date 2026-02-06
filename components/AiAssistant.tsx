
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { AiIcon } from '../constants';

interface AiMessage {
  role: 'user' | 'model';
  text: string;
}

const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<AiMessage[]>([
    { role: 'model', text: 'Hello! I am your sports rules expert. Ask me anything about the rules of any sport!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: AiMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: input,
        config: {
          systemInstruction: "You are a world-class expert on the rules of all sports. Provide clear, concise, and accurate answers to user questions about sports rules. Format your answers for easy readability, using paragraphs and bullet points where appropriate.",
        }
      });
      
      const modelMessage: AiMessage = { role: 'model', text: response.text };
      setMessages(prev => [...prev, modelMessage]);

    } catch (error) {
      console.error('Error calling Gemini API:', error);
      const errorMessage: AiMessage = { role: 'model', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => <p key={i}>{line}</p>);
  };

  return (
    <div className="flex flex-col h-full bg-gray-800">
      <h3 className="text-lg font-semibold p-4 border-b border-gray-700 text-teal-400 flex items-center">
        <div className="mr-2">{AiIcon}</div> Sports Rules AI
      </h3>
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-lg text-sm ${msg.role === 'user' ? 'bg-teal-500 text-white' : 'bg-gray-700/50 text-gray-200'}`}>
              {formatText(msg.text)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700/50 text-gray-200 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="h-2 w-2 bg-teal-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 bg-teal-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 bg-teal-400 rounded-full animate-pulse"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a sports rule..."
            disabled={isLoading}
            className="w-full bg-gray-700 text-white rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold p-2 rounded-r-lg transition-colors duration-300 disabled:bg-teal-500/50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default AiAssistant;
