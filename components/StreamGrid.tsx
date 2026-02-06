
import React from 'react';
import type { StreamingProvider } from '../types';
import StreamerCard from './StreamerCard';

interface StreamGridProps {
  providers: StreamingProvider[];
  activeProviderId: number;
  onSelectProvider: (provider: StreamingProvider) => void;
  isSplitViewMode: boolean;
  selectedProviderIds: number[];
  onToggleSplitView: () => void;
  onToggleProviderSelection: (provider: StreamingProvider) => void;
}

const StreamGrid: React.FC<StreamGridProps> = ({ 
  providers, 
  activeProviderId, 
  onSelectProvider,
  isSplitViewMode,
  selectedProviderIds,
  onToggleSplitView,
  onToggleProviderSelection
}) => {
  const vipProvider = providers.find(p => p.id === 0);
  const regularProviders = providers.filter(p => p.id !== 0);

  return (
    <div className="flex-grow">
      <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-lg font-semibold text-teal-400">Live Channels</h3>
          <div className="flex items-center">
              <span className={`text-xs font-bold mr-2 ${isSplitViewMode ? 'text-white' : 'text-gray-400'}`}>Multi-View</span>
              <button 
                  onClick={onToggleSplitView}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${isSplitViewMode ? 'bg-teal-500' : 'bg-gray-600'}`}
              >
                  <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${isSplitViewMode ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
          </div>
      </div>

      {vipProvider && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold mb-2 px-1 text-yellow-400 uppercase tracking-wider">VIP Access</h4>
          <StreamerCard
            provider={vipProvider}
            isActive={isSplitViewMode ? false : vipProvider.id === activeProviderId}
            onSelect={isSplitViewMode ? () => onToggleProviderSelection(vipProvider) : onSelectProvider}
            isSplitViewMode={isSplitViewMode}
            isSelected={selectedProviderIds.includes(vipProvider.id)}
          />
        </div>
      )}
      
      <h4 className="text-xs font-semibold mb-2 px-1 text-gray-400 uppercase tracking-wider">Team Feeds</h4>
      <div className="space-y-2">
        {regularProviders.map(provider => (
          <StreamerCard
            key={provider.id}
            provider={provider}
            isActive={isSplitViewMode ? false : provider.id === activeProviderId}
            onSelect={isSplitViewMode ? () => onToggleProviderSelection(provider) : onSelectProvider}
            isSplitViewMode={isSplitViewMode}
            isSelected={selectedProviderIds.includes(provider.id)}
          />
        ))}
      </div>
      
      {isSplitViewMode && (
          <div className="mt-4 p-2 bg-gray-800/80 rounded text-center">
              <p className="text-xs text-gray-400">Select up to 4 streams ({selectedProviderIds.length}/4)</p>
          </div>
      )}
    </div>
  );
};

export default StreamGrid;
