import React, { useState, useEffect, useRef } from 'react';
import type { EventDetails, StreamingProvider } from '../types';
import { LiveIcon, ArGlassIcon, VrHeadsetIcon, BellIcon, ShareIcon, ArrowLeftIcon } from '../constants';
import MatchTimer from './MatchTimer';
import ShareModal from './ShareModal';

interface HeaderProps {
  eventDetails: EventDetails;
  onJoinARStream: () => void;
  onJoinVRStream: () => void;
  onToggleVrMode: () => void;
  isVrModeActive: boolean;
  subscriptions: number[];
  providers: StreamingProvider[];
  activeProvider: StreamingProvider;
  onExit: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  eventDetails, 
  onJoinARStream, 
  onJoinVRStream,
  onToggleVrMode,
  isVrModeActive,
  subscriptions,
  providers,
  activeProvider,
  onExit,
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const subscribedProviders = providers.filter(provider => 
    subscriptions.includes(provider.id) && provider.scheduledStream
  ).sort((a, b) => a.scheduledStream!.startTime.getTime() - b.scheduledStream!.startTime.getTime());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };


  return (
    <header className="glass-morphism text-white p-2 md:p-4 flex justify-between items-center h-16 border-b border-white/5 shadow-2xl relative z-50">
      {/* LEFT SECTION: Logo & Title */}
      <div className="flex items-center flex-1 md:flex-none md:w-1/4 overflow-hidden">
        <button 
            onClick={onExit}
            className="mr-2 md:mr-4 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all flex items-center group flex-shrink-0"
            title="Back to Home"
        >
            <div className="group-hover:-translate-x-1 transition-transform">
                {ArrowLeftIcon}
            </div>
        </button>
        <div className="bg-gradient-to-br from-teal-400 to-teal-600 text-gray-900 font-black rounded-xl px-3 py-1 mr-3 text-lg flex-shrink-0 shadow-lg shadow-teal-500/20">
          CS
        </div>
        <div className="hidden md:block truncate">
          <h1 className="text-sm font-black tracking-tighter text-white truncate">
            costreamhorizon<span className="text-teal-400">.live</span>
          </h1>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest truncate">{eventDetails.match}</p>
        </div>
      </div>

      {/* CENTER SECTION: Timer */}
      <div className="flex-1 flex justify-center md:w-1/2">
        <div className="px-6 py-1 rounded-full bg-white/5 border border-white/5">
            <MatchTimer />
        </div>
      </div>

      {/* RIGHT SECTION: Controls */}
      <div className="flex items-center justify-end space-x-1 md:space-x-3 flex-1 md:flex-none md:w-auto">
         <button
            onClick={() => setIsShareModalOpen(true)}
            className="p-2 text-gray-400 hover:text-teal-400 transition-colors"
            aria-label="Share Event"
          >
            {ShareIcon}
          </button>
          
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsNotificationsOpen(prev => !prev)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {BellIcon}
            {subscriptions.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white ring-2 ring-gray-900">
                {subscribedProviders.length}
              </span>
            )}
          </button>
          {isNotificationsOpen && (
            <div className="absolute top-14 right-0 w-80 glass-morphism rounded-2xl shadow-2xl p-4 animate-fade-in-fast z-30">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest pb-3 border-b border-white/5">My Schedule</p>
              {subscribedProviders.length > 0 ? (
                <div className="mt-2 space-y-2 max-h-80 overflow-y-auto">
                  {subscribedProviders.map(provider => (
                    <div key={provider.id} className="text-left p-3 rounded-xl hover:bg-white/5 transition-colors">
                      <p className="text-sm font-bold text-white">{provider.scheduledStream!.title}</p>
                      <p className="text-[10px] text-gray-500 mt-1 uppercase">{provider.name} • {formatTime(provider.scheduledStream!.startTime)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 text-center py-6 italic">No streams scheduled.</p>
              )}
            </div>
          )}
        </div>

        <div className="h-6 w-px bg-white/10 mx-2 hidden md:block"></div>

        <button 
          onClick={onToggleVrMode}
          className={`font-black p-2.5 rounded-xl transition-all flex items-center ${isVrModeActive ? 'bg-white text-black' : 'bg-white/5 text-white hover:bg-white/10'}`}
          title={isVrModeActive ? 'Exit VR Mode' : 'Enter VR Mode'}
        >
          {VrHeadsetIcon}
          <span className="hidden xl:inline ml-2 text-xs uppercase tracking-widest">VR Mode</span>
        </button>
      </div>
      
      <ShareModal 
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        type="event"
      />
    </header>
  );
};

export default Header;