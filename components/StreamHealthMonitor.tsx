
import React, { useState, useEffect } from 'react';
import type { StreamHealth, TelemetryData } from '../types';
import { harmonyService } from '../services/HarmonyService';

interface StreamHealthMonitorProps {
  health: StreamHealth;
  telemetry?: TelemetryData;
  deviceType: string;
}

const StreamHealthMonitor: React.FC<StreamHealthMonitorProps> = ({ health, telemetry, deviceType }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [networkCondition, setNetworkCondition] = useState<'GOOD' | 'POOR'>('GOOD');
  const [serverTime, setServerTime] = useState<number>(Date.now());

  useEffect(() => {
     const handlePulse = (data: any) => {
         setServerTime(data.serverTime);
     };
     harmonyService.on('harmony_pulse', handlePulse);
     return () => harmonyService.off('harmony_pulse', handlePulse);
  }, []);

  const toggleNetwork = () => {
      const newCondition = networkCondition === 'GOOD' ? 'POOR' : 'GOOD';
      setNetworkCondition(newCondition);
      harmonyService.setNetworkCondition(newCondition);
  };

  // Determine health color
  const getHealthColor = (val: number, type: 'latency' | 'loss' | 'fps') => {
    if (type === 'latency') return val < 100 ? 'text-green-400' : val < 300 ? 'text-yellow-400' : 'text-red-400';
    if (type === 'loss') return val < 1 ? 'text-green-400' : val < 5 ? 'text-yellow-400' : 'text-red-400';
    if (type === 'fps') return val > 55 ? 'text-green-400' : val > 24 ? 'text-yellow-400' : 'text-red-400';
    return 'text-white';
  };

  if (!isExpanded) {
    return (
      <button 
        onClick={() => setIsExpanded(true)}
        className={`absolute top-16 right-4 backdrop-blur-md border border-gray-700 text-xs px-2 py-1 rounded hover:bg-black/80 transition-colors z-40 font-mono ${networkCondition === 'POOR' ? 'bg-red-900/80 text-red-200' : 'bg-black/60 text-gray-400'}`}
      >
        STATS {networkCondition === 'POOR' && '(!)'}
      </button>
    );
  }

  return (
    <div className="absolute top-16 right-4 bg-black/90 backdrop-blur-md border border-gray-700 p-3 rounded-lg w-64 z-40 text-xs font-mono shadow-2xl animate-fade-in-fast">
      <div className="flex justify-between items-center mb-2 border-b border-gray-700 pb-1">
        <span className="font-bold text-teal-400">SYSTEM DIAGNOSTICS</span>
        <button onClick={() => setIsExpanded(false)} className="text-gray-400 hover:text-white">&times;</button>
      </div>
      
      {/* Network Sim Controls */}
      <div className="mb-3 flex items-center justify-between bg-gray-800 p-1 rounded">
          <span className="text-[10px] text-gray-400 ml-1">NET SIM:</span>
          <button 
            onClick={toggleNetwork}
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${networkCondition === 'GOOD' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
          >
              {networkCondition}
          </button>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-500">RES/CODEC</span>
          <span className="text-gray-200">{health.resolution} / {health.codec}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">BITRATE</span>
          <span className="text-gray-200">{health.bitrate.toFixed(2)} Mbps</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">FPS</span>
          <span className={getHealthColor(health.fps, 'fps')}>{health.fps}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">LATENCY</span>
          <span className={getHealthColor(health.latency, 'latency')}>{health.latency} ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">PACKET LOSS</span>
          <span className={getHealthColor(health.packetLoss, 'loss')}>{health.packetLoss}%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">JITTER</span>
          <span className="text-gray-200">{health.jitter} ms</span>
        </div>
      </div>

      {telemetry && (
        <>
          <div className="mt-2 mb-1 border-b border-gray-700 pb-1">
             <span className="font-bold text-yellow-400">REAL-TIME TELEMETRY</span>
          </div>
          <div className="space-y-1">
             {deviceType === 'Drone' && (
                 <>
                    <div className="flex justify-between">
                        <span className="text-gray-500">ALTITUDE</span>
                        <span className="text-cyan-400">{telemetry.altitude?.toFixed(1)}m</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">SPEED</span>
                        <span className="text-cyan-400">{telemetry.speed?.toFixed(1)} km/h</span>
                    </div>
                 </>
             )}
             <div className="flex justify-between">
                <span className="text-gray-500">GPS</span>
                <span className="text-gray-200">{telemetry.latitude.toFixed(4)}, {telemetry.longitude.toFixed(4)}</span>
            </div>
             <div className="flex justify-between">
                <span className="text-gray-500">HEADING</span>
                <span className="text-gray-200">{telemetry.heading?.toFixed(0)}°</span>
            </div>
          </div>
        </>
      )}

      <div className="mt-2 text-[10px] text-gray-500 text-center italic border-t border-gray-700 pt-1">
        <div className="flex justify-between text-gray-400">
            <span>HARMONY CLOCK:</span>
            <span className="font-mono">{serverTime.toString().slice(-6)}</span>
        </div>
        <span className="text-green-400">LOCKED (NTP)</span>
      </div>
    </div>
  );
};

export default StreamHealthMonitor;
