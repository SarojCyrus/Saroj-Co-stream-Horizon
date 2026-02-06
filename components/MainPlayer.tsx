
import React, { useState, useEffect, useRef, useMemo } from 'react';
import type { StreamingProvider, CameraAngle, StreamHealth, TelemetryData, DirectorCommand, HarmonyPulse } from '../types';
import { EyeIcon, LocationMarkerIcon, LiveIcon, ResetIcon, AiIcon, SettingsIcon, DroneIcon, ScissorsIcon, ShareIcon, PipIcon, ExpandIcon } from '../constants';
import { STREAMING_PROVIDERS as allProviders } from '../constants';
import { harmonyService } from '../services/HarmonyService';
import ShareModal from './ShareModal';
import StreamHealthMonitor from './StreamHealthMonitor';

interface StreamPlayerProps {
  provider: StreamingProvider;
  isSingleView: boolean;
  isMuted?: boolean;
  onMaximize?: () => void;
}

const QUALITY_LEVELS = ['Auto', '1080p', '720p', '480p'];
const QUALITY_DESC: { [key: string]: string } = {
  'Auto': 'Adapts to your network',
  '1080p': 'Best Quality',
  '720p': 'Good Quality',
  '480p': 'Standard Definition',
};

const AR_COLORS = [
  { name: 'Teal', value: '20, 184, 166' },
  { name: 'Purple', value: '147, 51, 234' },
  { name: 'Red', value: '220, 38, 38' },
  { name: 'Blue', value: '59, 130, 246' },
];

const SpeakerWaveIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

const SpeakerXMarkIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (value: number) => void;
  onToggleMute: () => void;
  compact?: boolean;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, isMuted, onVolumeChange, onToggleMute, compact }) => {
  return (
    <div className={`flex items-center bg-gray-700/50 rounded-md ${compact ? 'px-2 py-1' : 'px-3 py-1'} transition-all duration-300 group/volume`}>
      <button 
        onClick={(e) => { e.stopPropagation(); onToggleMute(); }}
        className="text-gray-300 hover:text-white focus:outline-none mr-2"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted || volume === 0 ? SpeakerXMarkIcon : SpeakerWaveIcon}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${compact ? 'w-0 group-hover/volume:w-16' : 'w-16 sm:w-20'}`}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={(e) => { e.stopPropagation(); onVolumeChange(parseFloat(e.target.value)); }}
          className="w-full h-1 bg-gray-500 rounded-lg appearance-none cursor-pointer accent-teal-500"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

const StreamPlayer: React.FC<StreamPlayerProps> = ({ provider, isSingleView, isMuted = false, onMaximize }) => {
  const [zoom, setZoom] = useState(1);
  const [tilt, setTilt] = useState(0);
  const [pan, setPan] = useState(0);
  const [roll, setRoll] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  
  // Audio State
  const [volume, setVolume] = useState(1);
  const [isLocalMuted, setIsLocalMuted] = useState(isMuted);

  const [alternativeAngles, setAlternativeAngles] = useState<CameraAngle[]>([]);
  const [isAiDirectorActive, setIsAiDirectorActive] = useState(true);
  const [aiHudStatus, setAiHudStatus] = useState('OPTIMIZING COMPOSITION');
  const [aiHarmony, setAiHarmony] = useState(98);
  const [kafkaStats, setKafkaStats] = useState({ offset: 0, partition: 0 });
  
  // Sharing State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareType, setShareType] = useState<'clip' | 'event' | null>(null);
  
  // Health & Telemetry State (From Backend Service)
  const [streamHealth, setStreamHealth] = useState<StreamHealth>({
    bitrate: 8.5,
    latency: 100,
    fps: 60,
    packetLoss: 0.1,
    jitter: 15,
    resolution: '1080p',
    codec: 'H.264'
  });
  
  const [telemetry, setTelemetry] = useState<TelemetryData>({
      providerId: provider.id,
      latitude: provider.mapPosition.x,
      longitude: provider.mapPosition.y,
      altitude: provider.deviceType === 'Drone' ? 45 : 0,
      speed: 0,
      heading: 0,
      batteryVoltage: 12.4
  });

  const allAvailableAngles = useMemo(() => {
    if (provider.id === 0) { // Principal AI Director
      return allProviders
        .filter(p => p.id !== 0)
        .map(p => ({
          id: p.id,
          name: p.name,
          url: p.streamUrl
        }));
    }
    return provider.cameraAngles || [{ id: provider.id, name: 'Main View', url: provider.streamUrl }];
  }, [provider]);

  const [currentAngle, setCurrentAngle] = useState<CameraAngle>({ id: provider.id, name: provider.name, url: provider.streamUrl });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [streamQuality, setStreamQuality] = useState('Auto');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [viewerCount, setViewerCount] = useState(provider.viewers);

  const [isArOverlayActive, setIsArOverlayActive] = useState(false);
  const [arTransparency, setArTransparency] = useState(0.3);
  const [arColor, setArColor] = useState(AR_COLORS[0].value);

  // --- Backend Integration ---

  useEffect(() => {
      const handleDirectorCommand = (cmd: DirectorCommand) => {
          if (!isAiDirectorActive) return;

          if (cmd.targetProviderId === provider.id) {
              setKafkaStats(prev => ({ ...prev, partition: cmd.kafkaPartition || 0 }));
              const targetAngle = allAvailableAngles.find(a => a.id === cmd.cameraAngleId);
              if (targetAngle && targetAngle.id !== currentAngle.id) {
                  setAiHudStatus(`KAFKA EVENT: ${cmd.reason.toUpperCase()}`);
                  setTimeout(() => {
                      setCurrentAngle(targetAngle);
                      setAiHudStatus('DIRECTOR SYNCED');
                      setToastMessage(`Confluent: ${cmd.reason}`);
                      setTimeout(() => setToastMessage(null), 2000);
                  }, 200); 
              }
          }
      };

      const handleTelemetryUpdate = (data: {[key:number]: TelemetryData}) => {
          if (data[provider.id]) {
              setTelemetry(data[provider.id]);
          }
      };
      
      const handlePulse = (pulse: HarmonyPulse) => {
           setKafkaStats(prev => ({ ...prev, offset: pulse.kafkaOffset || 0 }));
           setStreamHealth(prev => ({
              ...prev,
              latency: Math.max(40, Math.min(400, prev.latency + (Math.random() * 20 - 10))),
              bitrate: Math.max(4, Math.min(12, prev.bitrate + (Math.random() * 1 - 0.5))),
          }));
      };

      harmonyService.on('director_command', handleDirectorCommand);
      harmonyService.on('telemetry_update', handleTelemetryUpdate);
      harmonyService.on('harmony_pulse', handlePulse);

      return () => {
          harmonyService.off('director_command', handleDirectorCommand);
          harmonyService.off('telemetry_update', handleTelemetryUpdate);
          harmonyService.off('harmony_pulse', handlePulse);
      };
  }, [provider.id, isAiDirectorActive, allAvailableAngles, currentAngle.id]);


  useEffect(() => {
    setZoom(1);
    setTilt(0);
    setPan(0);
    setRoll(0);
    
    const mainAngleForProvider = allAvailableAngles.find(a => a.url === provider.streamUrl) || allAvailableAngles[0];
    setCurrentAngle(mainAngleForProvider);
    
    setIsSettingsOpen(false);
    setViewerCount(provider.viewers);
    
    if (provider.deviceType === 'AR') {
      setIsArOverlayActive(true);
      setArTransparency(0.3);
      setArColor(AR_COLORS[0].value);
    } else {
      setIsArOverlayActive(false);
    }

  }, [provider]);

  useEffect(() => {
    const alts: CameraAngle[] = [];
    const currentIndex = allAvailableAngles.findIndex(a => a.id === currentAngle.id);
    const usedIndexes = new Set([currentIndex]);
    
    while (alts.length < 5 && usedIndexes.size < allAvailableAngles.length) {
      const altIndex = Math.floor(Math.random() * allAvailableAngles.length);
      if (!usedIndexes.has(altIndex)) {
        alts.push(allAvailableAngles[altIndex]);
        usedIndexes.add(altIndex);
      }
    }
    setAlternativeAngles(alts);
  }, [currentAngle, allAvailableAngles]);
  
  useEffect(() => {
    setIsLocalMuted(isMuted);
  }, [isMuted]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isLocalMuted;
    }
  }, [volume, isLocalMuted]);


  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);

    videoElement.addEventListener('waiting', handleWaiting);
    videoElement.addEventListener('playing', handlePlaying);

    return () => {
      videoElement.removeEventListener('waiting', handleWaiting);
      videoElement.removeEventListener('playing', handlePlaying);
    };
  }, [currentAngle.url]);


  const handleSelectAngle = (angle: CameraAngle) => {
    setCurrentAngle(angle);
    setIsAiDirectorActive(false); 
    const angleLabel = angle.name || `Camera #${angle.id}`;
    setToastMessage(`Switched to ${angleLabel} (AI Paused)`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleResetControls = () => {
    setZoom(1);
    setTilt(0);
    setPan(0);
    setRoll(0);
  };
  
  const handleToggleSettings = () => {
    setIsSettingsOpen(prev => !prev);
  };
  
  const handleQualityChange = (quality: string) => {
    setStreamQuality(quality);
    setIsSettingsOpen(false);
    setToastMessage(`Stream quality set to ${quality}`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };
  
  const handleVolumeChange = (val: number) => {
    setVolume(val);
    if (val > 0 && isLocalMuted) {
      setIsLocalMuted(false);
    }
  };

  const toggleMute = () => {
    setIsLocalMuted(prev => !prev);
  };
  
  const handleCaptureClip = () => {
      setShareType('clip');
      setIsShareModalOpen(true);
  };

  const handleShareStream = () => {
      setShareType('event');
      setIsShareModalOpen(true);
  };

  const togglePiP = async () => {
    if (!videoRef.current) return;
    if (videoRef.current.readyState === 0) {
      setToastMessage("Wait for stream to load...");
      setTimeout(() => setToastMessage(null), 2000);
      return;
    }
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (error) {
      console.error("Failed to toggle PiP:", error);
    }
  };

  const toggleFullscreen = async () => {
    if (!playerContainerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await playerContainerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  const isDroneAngle = currentAngle.name === 'Drone View' || currentAngle.id === 4;

  return (
    <div ref={playerContainerRef} className="h-full w-full bg-black flex flex-col group">
      <div className="relative flex-grow overflow-hidden" style={{ perspective: '1000px' }}>
        {isBuffering && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10" aria-label="Loading stream...">
            <div className="w-12 h-12 border-4 border-t-teal-400 border-gray-600 rounded-full animate-spin"></div>
          </div>
        )}
        <video
            ref={videoRef}
            src={currentAngle.url} 
            key={currentAngle.id}
            autoPlay
            muted={isLocalMuted}
            loop
            playsInline
            className="w-full h-full object-cover transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${pan}%) scale(${zoom}) rotateX(${tilt}deg) rotate(${roll}deg)` }}
        />

        {!isSingleView && onMaximize && (
           <button 
             onClick={onMaximize}
             className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded hover:bg-teal-500 transition-colors z-30"
           >
             {ExpandIcon}
           </button>
        )}
        
        {isSingleView && (
            <StreamHealthMonitor 
                health={streamHealth} 
                telemetry={provider.deviceType === 'Platform' ? undefined : telemetry}
                deviceType={provider.deviceType}
            />
        )}

        {/* AI Director HUD - Enhanced for Confluent */}
        {isAiDirectorActive && (
            <div className={`absolute top-16 left-4 z-20 pointer-events-none transition-all duration-300 ${!isSingleView ? 'scale-75 origin-top-left' : ''}`}>
                <div className="bg-black/60 backdrop-blur-md border border-teal-500/30 p-3 rounded-xl text-xs font-mono text-teal-400 shadow-[0_16px_32px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center justify-between mb-2 border-b border-teal-500/20 pb-2">
                        <div className="flex items-center space-x-2">
                            <span className="animate-pulse text-green-500">●</span>
                            <span className="font-black tracking-tighter uppercase">Confluent Ingest Plane</span>
                        </div>
                        <span className="bg-teal-500/10 px-2 py-0.5 rounded-full text-[8px] border border-teal-500/30">LOCKED</span>
                    </div>
                    <div className="space-y-1.5 text-[9px] text-teal-200/80">
                        <div className="flex justify-between space-x-6">
                            <span>KAFKA OFFSET:</span>
                            <span className="text-white font-bold">{kafkaStats.offset.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between space-x-6">
                            <span>PARTITION:</span>
                            <span className="text-white font-bold">{kafkaStats.partition}</span>
                        </div>
                        <div className="flex justify-between space-x-6">
                            <span>SYNC STATUS:</span>
                            <span className={aiHudStatus.startsWith('KAFKA') ? 'text-yellow-400 font-black' : 'text-teal-400'}>{aiHudStatus}</span>
                        </div>
                        <div className="flex justify-between space-x-6 pt-1">
                            <span>HARMONY:</span>
                            <div className="flex items-center w-24">
                                <div className="h-1 bg-gray-800 flex-grow rounded-full overflow-hidden">
                                    <div className="h-full bg-teal-400 transition-all duration-500" style={{ width: `${aiHarmony}%` }}></div>
                                </div>
                                <span className="ml-1.5">{aiHarmony.toFixed(0)}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Shared Drone Feed Indicator */}
        {isDroneAngle && provider.deviceType !== 'Drone' && (
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none border-2 border-green-500/50 rounded-lg w-[90%] h-[90%] flex items-start justify-center ${!isSingleView ? 'scale-75' : ''}`}>
                <div className="bg-green-500/80 text-black font-bold px-3 py-1 rounded-b-lg text-sm flex items-center animate-pulse">
                    {DroneIcon} <span className="ml-2">SHARED AERIAL FEED (KAFKA)</span>
                </div>
             </div>
        )}

        {provider.deviceType === 'AR' && isArOverlayActive && (
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{ 
              transform: `translateX(${pan}%) scale(${zoom}) rotateX(${tilt}deg) rotate(${roll}deg)` 
            }}
            aria-hidden="true"
          >
            <div 
              className="w-full h-full transition-colors duration-300" 
              style={{ backgroundColor: `rgba(${arColor}, ${arTransparency})` }}
            />
          </div>
        )}
        
        <div className="absolute top-4 left-4 flex items-center bg-black/50 p-2 rounded-lg">
          {LiveIcon}
          <span className="ml-2 font-semibold text-lg">LIVE</span>
        </div>

        {isSingleView && (
            <div className="absolute top-4 right-4 z-20">
            <button 
                onClick={handleToggleSettings}
                className="p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors mr-12" 
            >
                {SettingsIcon}
            </button>
            
            {isSettingsOpen && (
                <div className="absolute top-12 right-0 w-64 bg-gray-800/90 backdrop-blur-md rounded-lg shadow-2xl p-3 animate-fade-in-fast z-30">
                <p className="text-sm font-semibold text-gray-300 pb-2 border-b border-gray-600">Stream Quality</p>
                <div className="mt-2 space-y-1">
                    {QUALITY_LEVELS.map(level => (
                    <button 
                        key={level}
                        onClick={() => handleQualityChange(level)}
                        className={`w-full text-left p-2 rounded-md transition-colors ${
                        streamQuality === level 
                            ? 'bg-teal-500 text-white font-bold' 
                            : 'hover:bg-gray-700/80'
                        }`}
                    >
                        <span className="block text-sm">{level}</span>
                    </button>
                    ))}
                </div>
                </div>
            )}
            </div>
        )}
        
        {toastMessage && isSingleView && (
          <div className="absolute bottom-24 left-1/2 -translate-x-1/2 bg-black/80 text-white text-sm px-4 py-2 rounded-lg animate-fade-in-out z-20 whitespace-nowrap">
            {toastMessage}
          </div>
        )}

        {isSingleView && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[95%] bg-black/60 backdrop-blur-sm p-3 rounded-lg flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <h4 className="text-sm font-bold text-teal-400 mr-2 whitespace-nowrap">KAFKA SOURCE MAPPING</h4>
            {alternativeAngles.map(angle => (
                <div key={angle.id} className="relative group/angle w-24 h-14 flex-shrink-0 cursor-pointer" onClick={() => handleSelectAngle(angle)}>
                <video 
                    src={angle.url} 
                    className="w-full h-full object-cover rounded-md opacity-70 group-hover/angle:opacity-100 transition-opacity" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    preload="metadata" 
                />
                </div>
            ))}
            </div>
        )}

        {isSingleView && (
            <div className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/60 backdrop-blur-sm p-4 rounded-lg space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-48 z-20">
             <div className="grid grid-cols-2 gap-2 mb-2 border-b border-gray-600 pb-4">
                <button 
                    onClick={handleCaptureClip}
                    className="flex flex-col items-center justify-center bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-lg transition-colors"
                >
                    {ScissorsIcon}
                    <span className="text-[10px] mt-1">Capture</span>
                </button>
                <button 
                    onClick={handleShareStream}
                    className="flex flex-col items-center justify-center bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-lg transition-colors"
                >
                    {ShareIcon}
                    <span className="text-[10px] mt-1">Share</span>
                </button>
             </div>

            <div>
                <div className="flex justify-between items-center mb-1">
                <label htmlFor="zoom" className="block text-sm font-medium text-gray-200">Zoom</label>
                <span className="text-xs font-mono text-teal-400">{zoom.toFixed(1)}x</span>
                </div>
                <input id="zoom" type="range" min="1" max="3" step="0.1" value={zoom} onChange={(e) => setZoom(parseFloat(e.target.value))} className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-teal-500" />
            </div>
            <button onClick={handleResetControls} className="w-full flex items-center justify-center bg-gray-700/50 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition-colors duration-200 text-sm mt-2">
                {ResetIcon}
                <span className="ml-2">Reset</span>
            </button>
            </div>
        )}
      </div>
      
      <ShareModal 
         isOpen={isShareModalOpen}
         onClose={() => setIsShareModalOpen(false)}
         type={shareType}
         providerName={provider.name}
         streamUrl={currentAngle.url}
         angleName={currentAngle.name}
      />

      <div className={`bg-gray-800 border-t border-gray-700 ${isSingleView ? 'p-4' : 'p-2'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center overflow-hidden mr-2">
            <img src={provider.logoUrl} alt={provider.name} className={`${isSingleView ? 'w-12 h-12' : 'w-8 h-8'} rounded-md mr-3 bg-white p-1 flex-shrink-0`}/>
            <div className="overflow-hidden">
              <h2 className={`${isSingleView ? 'text-xl' : 'text-sm'} font-bold truncate`}>{provider.name}</h2>
              {isSingleView && <p className="text-sm text-gray-400 flex items-center truncate">{LocationMarkerIcon} {provider.location}</p>}
            </div>
          </div>
          {isSingleView ? (
             <div className="flex items-center space-x-2 flex-shrink-0">
                <VolumeControl 
                    volume={volume} 
                    isMuted={isLocalMuted} 
                    onVolumeChange={handleVolumeChange} 
                    onToggleMute={toggleMute} 
                />
                <div className="flex items-center bg-gray-700/50 px-3 py-1 rounded-md">
                    {EyeIcon}
                    <span className="font-semibold">{viewerCount.toLocaleString()}</span>
                </div>
                <button 
                    onClick={togglePiP}
                    className="p-2 rounded-md bg-gray-700/50 hover:bg-teal-500/20 text-gray-300 hover:text-teal-400 transition-colors ml-1"
                >
                    {PipIcon}
                </button>
                <button 
                    onClick={toggleFullscreen}
                    className="p-2 rounded-md bg-gray-700/50 hover:bg-teal-500/20 text-gray-300 hover:text-teal-400 transition-colors ml-1"
                >
                    {ExpandIcon}
                </button>
            </div>
          ) : (
               <div className="flex items-center space-x-2 flex-shrink-0">
                 <VolumeControl 
                    volume={volume} 
                    isMuted={isLocalMuted} 
                    onVolumeChange={handleVolumeChange} 
                    onToggleMute={toggleMute}
                    compact={true}
                />
               </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface MainPlayerProps {
    providers: StreamingProvider[];
    onMaximize: (provider: StreamingProvider) => void;
}

const MainPlayer: React.FC<MainPlayerProps> = ({ providers, onMaximize }) => {
    if (providers.length === 0) {
        return (
            <div className="w-full h-full bg-gray-900 flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                <p className="text-xl font-semibold">No streams selected</p>
                <p className="text-sm mt-2">Select up to 4 streams from the list to start watching.</p>
            </div>
        );
    }
    if (providers.length === 1) {
        return <StreamPlayer provider={providers[0]} isSingleView={true} onMaximize={() => {}} />;
    }
    return (
        <div className="w-full h-full bg-black grid grid-cols-2 grid-rows-2 gap-0.5">
           {providers.map((p, idx) => (
             <div key={p.id} className="relative w-full h-full overflow-hidden bg-gray-900">
                <StreamPlayer 
                    provider={p} 
                    isSingleView={false} 
                    isMuted={idx !== 0} 
                    onMaximize={() => onMaximize(p)}
                />
             </div>
           ))}
        </div>
      );
};

export default MainPlayer;
