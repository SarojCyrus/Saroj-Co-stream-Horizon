
import React, { useState, useEffect } from 'react';
import type { StreamingProvider, ChatMessage, TelemetryData, BackendState, EventConfig } from '../types';
import { INITIAL_CHAT_MESSAGES } from '../constants';
import { harmonyService } from '../services/HarmonyService';
import Header from './Header';
import MainPlayer from './MainPlayer';
import StreamGrid from './StreamGrid';
import StadiumMap from './StadiumMap';
import RightSidebar from './RightSidebar';
import Schedule from './Schedule';
import ConfirmationDialog from './ConfirmationDialog';

interface StreamingExperienceProps {
  onExit: () => void;
  eventConfig: EventConfig;
}

const StreamingExperience: React.FC<StreamingExperienceProps> = ({ onExit, eventConfig }) => {
  const [streamingProviders, setStreamingProviders] = useState<StreamingProvider[]>(eventConfig.providers);
  const [activeProvider, setActiveProvider] = useState<StreamingProvider>(eventConfig.providers[0]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [isVrModeActive, setIsVrModeActive] = useState(false);
  const [isAppVisible, setIsAppVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Split View State
  const [isSplitView, setIsSplitView] = useState(false);
  const [selectedProviders, setSelectedProviders] = useState<StreamingProvider[]>([]);

  const [subscriptions, setSubscriptions] = useState<number[]>([]);
  const [leftSidebarTab, setLeftSidebarTab] = useState<'live' | 'schedule'>('live');
  
  // Backend State
  const [globalTelemetry, setGlobalTelemetry] = useState<{[key: number]: TelemetryData}>({});
  const [backendState, setBackendState] = useState<BackendState>({
      isConnected: false,
      confluentStatus: 'DISCONNECTED',
      serverTime: Date.now(),
      harmonyHealth: 100
  });

  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    type: 'ar' | 'vr' | null;
    title: string;
    content: React.ReactNode;
  }>({
    isOpen: false,
    type: null,
    title: '',
    content: null,
  });

  useEffect(() => {
    setStreamingProviders(eventConfig.providers);
    setActiveProvider(eventConfig.providers[0]);
    harmonyService.loadEvent(eventConfig.providers);
  }, [eventConfig]);

  useEffect(() => {
    harmonyService.connect();
    setIsAppVisible(true);

    const handleTelemetry = (data: {[key: number]: TelemetryData}) => {
        setGlobalTelemetry(data);
    };

    const handlePulse = (pulse: any) => {
        setBackendState(prev => ({
            ...prev,
            serverTime: pulse.serverTime,
            isConnected: true
        }));
    };
    
    const handleStatus = (status: boolean) => {
         setBackendState(prev => ({ ...prev, isConnected: status }));
    };

    const handleConfluentStatus = (status: any) => {
        setBackendState(prev => ({ ...prev, confluentStatus: status }));
    };

    harmonyService.on('telemetry_update', handleTelemetry);
    harmonyService.on('harmony_pulse', handlePulse);
    harmonyService.on('connection_status', handleStatus);
    harmonyService.on('confluent_status', handleConfluentStatus);

    return () => {
        harmonyService.off('telemetry_update', handleTelemetry);
        harmonyService.off('harmony_pulse', handlePulse);
        harmonyService.off('connection_status', handleStatus);
        harmonyService.off('confluent_status', handleConfluentStatus);
        harmonyService.disconnect();
    };
  }, []);
  
  useEffect(() => {
    const chatInterval = setInterval(() => {
      const randomUser = `User${Math.floor(Math.random() * 1000)}`;
      const randomMessage = [
        'What a play!',
        'Incredible angle!',
        'This is intense!',
        'Look at that speed!',
        'Can you see the drone view?',
        'This is better than TV!',
      ][Math.floor(Math.random() * 6)];
      
      setChatMessages(prevMessages => [
        ...prevMessages,
        { user: randomUser, message: randomMessage, timestamp: new Date() },
      ]);
    }, 5000);

    return () => clearInterval(chatInterval);
  }, []);
  
  const handleToggleSubscription = (providerId: number) => {
    setSubscriptions(prev => 
        prev.includes(providerId)
            ? prev.filter(id => id !== providerId)
            : [...prev, providerId]
    );
  };
  
  const handleSelectProvider = (provider: StreamingProvider) => {
    setActiveProvider(provider);
    if (isSplitView) {
       setIsSplitView(false);
    }
  };

  const handleToggleSplitView = () => {
    if (!isSplitView) {
      setSelectedProviders([activeProvider]);
    }
    setIsSplitView(prev => !prev);
  };

  const handleToggleProviderSelection = (provider: StreamingProvider) => {
    const isSelected = selectedProviders.some(p => p.id === provider.id);
    
    if (isSelected) {
      if (selectedProviders.length > 1) {
        setSelectedProviders(prev => prev.filter(p => p.id !== provider.id));
      }
    } else {
      if (selectedProviders.length < 4) {
        setSelectedProviders(prev => [...prev, provider]);
      }
    }
  };

  const handleMaximizeProvider = (provider: StreamingProvider) => {
    setActiveProvider(provider);
    setIsSplitView(false);
  };

  const handleSendMessage = (message: string) => {
    setChatMessages(prev => [...prev, { user: 'You', message, timestamp: new Date() }]);
  };

  const handleReactToMessage = (messageIndex: number, emoji: string) => {
    setChatMessages(prevMessages => {
      const newMessages = [...prevMessages];
      const message = { ...newMessages[messageIndex] };
      if (!message.reactions) {
        message.reactions = {};
      }
      message.reactions[emoji] = (message.reactions[emoji] || 0) + 1;
      newMessages[messageIndex] = message;
      return newMessages;
    });
  };

  const handleJoinARStream = () => {
    setDialogState({
      isOpen: true,
      type: 'ar',
      title: 'Join with Augmented Reality?',
      content: (
        <>
          <p>Switching to AR simulated feed.</p>
          <p className="font-bold text-yellow-400 mt-2">Features:</p>
          <ul className="list-disc list-inside text-gray-400">
            <li>Heads-up Display (HUD)</li>
            <li>Real-time data overlay</li>
          </ul>
        </>
      ),
    });
  };

  const handleJoinVRStream = () => {
    setDialogState({
      isOpen: true,
      type: 'vr',
      title: 'Join with VR/MR Headset?',
      content: (
        <>
          <p>Switching to Immersive View.</p>
          <p className="font-bold text-yellow-400 mt-2">Features:</p>
          <ul className="list-disc list-inside text-gray-400">
            <li>180° / 360° Field of View</li>
            <li>Spatial Audio</li>
          </ul>
        </>
      ),
    });
  };

  const closeDialog = () => {
    setDialogState({ isOpen: false, type: null, title: '', content: null });
  };

  const handleConfirmJoin = () => {
    if (dialogState.type === 'ar') {
      const arProvider = streamingProviders.find(p => p.deviceType === 'AR');
      if (arProvider) {
          setActiveProvider(arProvider);
          setIsSplitView(false);
      }
    } else if (dialogState.type === 'vr') {
      const vrProvider = streamingProviders.find(p => p.deviceType === 'VR/MR');
      if (vrProvider) {
          setActiveProvider(vrProvider);
          setIsSplitView(false);
      }
    }
    closeDialog();
  };

  const handleToggleVrMode = () => {
    setIsVrModeActive(prev => !prev);
  };

  const activeProviders = isSplitView ? selectedProviders : [activeProvider];

  return (
    <div className={`relative min-h-screen bg-black text-gray-200 font-sans overflow-x-hidden transition-opacity duration-700 ${isAppVisible ? 'opacity-100' : 'opacity-0'} animate-portal`}>
      <Header 
        eventDetails={eventConfig.details} 
        onJoinARStream={handleJoinARStream}
        onJoinVRStream={handleJoinVRStream}
        onToggleVrMode={handleToggleVrMode}
        isVrModeActive={isVrModeActive}
        subscriptions={subscriptions}
        providers={streamingProviders}
        activeProvider={activeProvider}
        onExit={onExit}
      />
      
      <main className="flex flex-col lg:flex-row h-[calc(100vh-64px)] relative">
        {/* Left Sidebar: Data Panel */}
        <div className={`w-full lg:flex-shrink-0 flex flex-col bg-gray-900/50 backdrop-blur-xl transition-all duration-500 ease-in-out z-40 ${isVrModeActive || !isSidebarOpen ? 'lg:w-0 overflow-hidden' : 'lg:w-1/4 xl:w-1/5 border-r border-white/5'}`}>
          <div className="h-full flex flex-col">
            {/* Confluent Status Bar */}
            <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center">
                    <div className={`w-1.5 h-1.5 rounded-full mr-2 ${backendState.confluentStatus === 'CONNECTED' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-yellow-500 animate-pulse'}`}></div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-500">Confluent Data Plane</span>
                </div>
                <span className={`text-[8px] font-mono ${backendState.confluentStatus === 'CONNECTED' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {backendState.confluentStatus}
                </span>
            </div>

            <div className="flex-shrink-0 p-4">
              <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
                <button
                  onClick={() => setLeftSidebarTab('live')}
                  className={`w-1/2 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${leftSidebarTab === 'live' ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-gray-500 hover:text-white'}`}
                >
                  Live Feeds
                </button>
                <button
                  onClick={() => setLeftSidebarTab('schedule')}
                  className={`w-1/2 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${leftSidebarTab === 'schedule' ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-gray-500 hover:text-white'}`}
                >
                  Schedule
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto px-4 pb-32 custom-scrollbar">
              {leftSidebarTab === 'live' ? (
                <div className="space-y-6">
                  {!isSplitView && (
                      <StadiumMap 
                        providers={streamingProviders} 
                        activeProviderId={activeProvider.id} 
                        onSelectProvider={handleSelectProvider}
                        liveTelemetry={globalTelemetry}
                        sportCategory={eventConfig.details.category}
                      />
                  )}
                  <StreamGrid 
                    providers={streamingProviders} 
                    activeProviderId={activeProvider.id} 
                    onSelectProvider={handleSelectProvider}
                    isSplitViewMode={isSplitView}
                    selectedProviderIds={selectedProviders.map(p => p.id)}
                    onToggleSplitView={handleToggleSplitView}
                    onToggleProviderSelection={handleToggleProviderSelection}
                  />
                </div>
              ) : (
                <Schedule 
                  providers={streamingProviders}
                  subscriptions={subscriptions}
                  onToggleSubscription={handleToggleSubscription}
                />
              )}
            </div>
          </div>
        </div>

        {/* Center: Main Player Area */}
        <div className={`relative flex-grow transition-all duration-700 ease-in-out bg-black ${isVrModeActive ? 'lg:w-full' : ''}`}>
          <MainPlayer 
            providers={activeProviders} 
            onMaximize={handleMaximizeProvider}
          />
          {isVrModeActive && (
            <div className="absolute inset-0 pointer-events-none z-10 animate-fade-in-fast" aria-hidden="true">
              <div className="absolute inset-0" style={{ boxShadow: 'inset 0px 0px 100px 25px rgba(0, 0, 0, 0.7)' }}></div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Interaction Panel */}
        <div className={`w-full lg:flex-shrink-0 flex flex-col bg-gray-900/50 backdrop-blur-xl transition-all duration-500 ease-in-out z-40 ${isVrModeActive || !isSidebarOpen ? 'lg:w-0 overflow-hidden' : 'lg:w-1/4 xl:w-1/5 border-l border-white/5'}`}>
           <div className="h-full flex flex-col">
            <RightSidebar
              messages={chatMessages} 
              onSendMessage={handleSendMessage}
              onReactToMessage={handleReactToMessage}
            />
          </div>
        </div>

        {/* Horizon Dock: Spatial Streaming Controls */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-lg hidden lg:block">
           <div className="glass-morphism rounded-[2rem] p-3 flex justify-around items-center border border-white/10 backdrop-blur-3xl shadow-[0_32px_64px_rgba(0,0,0,0.8)]">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`p-4 rounded-2xl transition-all ${isSidebarOpen ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                title="Toggle UI Panels"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h7" /></svg>
              </button>
              <div className="h-8 w-px bg-white/10"></div>
              <button 
                onClick={handleToggleSplitView}
                className={`p-4 rounded-2xl transition-all ${isSplitView ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                title="Toggle Multi-View"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </button>
              <button className="bg-red-600 hover:bg-red-500 text-white font-black py-4 px-8 rounded-2xl transition-all uppercase tracking-widest text-[10px] shadow-lg shadow-red-600/20 active:scale-95">
                 Watch Live
              </button>
              <div className="h-8 w-px bg-white/10"></div>
              <button 
                onClick={handleToggleVrMode}
                className={`p-4 rounded-2xl transition-all ${isVrModeActive ? 'bg-white text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                title="Toggle VR Mode"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 2a4 4 0 00-4 4v2a1 1 0 001 1h6a1 1 0 001-1V6a4 4 0 00-4-4zM6 6v2h8V6a2 2 0 00-2-2H8a2 2 0 00-2 2z" /><path d="M3 10a1 1 0 011-1h12a1 1 0 011 1v1a4 4 0 01-4 4H8a4 4 0 01-4-4v-1zM8 13a2 2 0 100-4 2 2 0 000 4z" /></svg>
              </button>
           </div>
        </div>
      </main>
      
      <ConfirmationDialog
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        onConfirm={handleConfirmJoin}
        title={dialogState.title}
      >
        {dialogState.content}
      </ConfirmationDialog>
    </div>
  );
};

export default StreamingExperience;
