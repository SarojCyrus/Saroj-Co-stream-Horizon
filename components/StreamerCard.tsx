
import React, { useState, useEffect } from 'react';
import type { StreamingProvider } from '../types';
import { EyeIcon, LiveIcon, FollowersIcon, CameraIcon, BatteryIcon, DroneIcon, ArGlassIcon, VrHeadsetIcon, VipIcon } from '../constants';
import { harmonyService } from '../services/HarmonyService';

interface StreamerCardProps {
  provider: StreamingProvider;
  isActive: boolean;
  onSelect: (provider: StreamingProvider) => void;
  isSplitViewMode?: boolean;
  isSelected?: boolean;
}

const StreamerCard: React.FC<StreamerCardProps> = ({ provider, isActive, onSelect, isSplitViewMode = false, isSelected = false }) => {
  const isVip = provider.id === 0;
  const [isSyncing, setIsSyncing] = useState(false);

  // Listen for Harmony pulse to animate connection
  useEffect(() => {
      const handlePulse = () => {
          setIsSyncing(true);
          setTimeout(() => setIsSyncing(false), 200);
      };
      harmonyService.on('harmony_pulse', handlePulse);
      return () => harmonyService.off('harmony_pulse', handlePulse);
  }, []);

  // Determine styling based on mode and selection
  let baseClasses = "flex items-center p-2 rounded-lg cursor-pointer transition-all duration-200 relative overflow-hidden ";
  
  if (isSplitViewMode) {
      baseClasses += isSelected 
          ? "bg-teal-900/40 ring-2 ring-teal-500 " 
          : "bg-gray-700/30 hover:bg-gray-700/50 border border-transparent hover:border-gray-600 ";
  } else {
      baseClasses += isActive
        ? isVip ? 'bg-yellow-500/20 ring-2 ring-yellow-400 shadow-lg shadow-yellow-500/20 ' : 'bg-teal-500/20 ring-2 ring-teal-500 '
        : isVip ? 'bg-gray-700/80 hover:bg-gray-700 border-l-4 border-yellow-500 ' : 'bg-gray-700/50 hover:bg-gray-700/80 ';
  }

  const getBatteryColor = (level: number) => {
    if (level <= 20) return 'text-red-500';
    if (level <= 50) return 'text-yellow-500';
    return 'text-gray-300';
  };
  
  const getDeviceIcon = () => {
    switch(provider.deviceType) {
      case 'Platform': return VipIcon;
      case 'AR': return ArGlassIcon;
      case 'VR/MR': return VrHeadsetIcon;
      case 'Drone': return DroneIcon;
      case 'Mobile':
      default:
        return CameraIcon;
    }
  };
  
  const getDeviceTitle = () => {
    switch(provider.deviceType) {
      case 'Platform': return "VIP Master Feed";
      case 'AR': return "AR Streamer";
      case 'VR/MR': return "VR/MR Streamer";
      case 'Drone': return "Active Drones";
      case 'Mobile':
      default:
        return "Active Cameras";
    }
  };

  return (
    <div className={baseClasses} onClick={() => onSelect(provider)}>
      
      {/* Selection Checkbox (Multi-View Mode) */}
      {isSplitViewMode && (
        <div className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-teal-500 border-teal-500' : 'bg-black/50 border-gray-400'}`}>
            {isSelected && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            )}
        </div>
      )}

      <div className={`relative w-24 h-14 mr-3 rounded-md overflow-hidden flex-shrink-0 bg-black ${isSplitViewMode ? 'ml-8' : ''}`}>
        <video 
          src={provider.streamUrl} 
          className="w-full h-full object-cover" 
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="metadata"
          aria-label={provider.name}
        />
        <div className={`absolute top-1 left-1 flex items-center px-1.5 py-0.5 rounded-md text-xs transition-colors duration-100 ${isSyncing ? 'bg-green-500/80 text-white' : 'bg-black/50 text-white'}`}>
            {LiveIcon}
        </div>
         {isVip && (
          <div className="absolute top-1 right-1 flex items-center bg-yellow-500 text-black px-1.5 py-0.5 rounded-md text-xs font-bold">
            VIP
          </div>
        )}
      </div>
      <div className="flex-grow overflow-hidden">
        <p className={`font-semibold text-sm truncate ${isVip ? 'text-yellow-400' : 'text-white'}`}>{provider.name}</p>
        <p className="text-xs text-gray-400 truncate">{provider.location}</p>
        {!isSplitViewMode && <p className="text-xs text-gray-300 truncate">{provider.description}</p>}
        <div className="flex items-center text-xs text-gray-300 mt-1 space-x-3">
          <div className="flex items-center" title="Viewers">
            {EyeIcon}
            {provider.viewers.toLocaleString()}
          </div>
          {!isSplitViewMode && (
              <>
                <div className="flex items-center" title="Followers">
                    {FollowersIcon}
                    {provider.followers.toLocaleString()}
                </div>
                <div className="flex items-center" title={getDeviceTitle()}>
                    {getDeviceIcon()}
                    {provider.streamerCount > 0 ? provider.streamerCount : ''}
                </div>
                <div className={`flex items-center font-semibold ${getBatteryColor(provider.batteryLevel)}`} title="Team Battery Level">
                    {BatteryIcon}
                    {provider.batteryLevel}%
                </div>
              </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StreamerCard;
