
import React, { useState } from 'react';
import type { StreamingProvider, TelemetryData, SportCategory } from '../types';
import { ExpandIcon } from '../constants';

interface StadiumMapProps {
  providers: StreamingProvider[];
  activeProviderId: number;
  onSelectProvider: (provider: StreamingProvider) => void;
  liveTelemetry?: { [key: number]: TelemetryData };
  sportCategory?: SportCategory;
}

const StadiumMap: React.FC<StadiumMapProps> = ({ providers, activeProviderId, onSelectProvider, liveTelemetry, sportCategory = 'Field Sport' }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Render the SVG content based on the sport category
  const renderMapContent = () => {
    if (sportCategory === 'Motorsport') {
        // Continuous Loop Circuit (Grand Prix Style)
        const trackPath = "M 50 60 L 30 60 C 15 60 15 45 30 45 L 35 45 C 40 45 40 30 30 30 C 20 30 20 10 40 10 L 70 10 C 90 10 90 30 70 30 L 65 30 C 60 30 60 45 70 45 L 80 45 C 95 45 95 60 80 60 L 50 60 Z";
        
        return (
            <g>
                 {/* Track Surface (Border/Gravel) */}
                 <path
                    d={trackPath}
                    fill="none"
                    stroke="#1a1a1a"
                    strokeWidth="14"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                 />
                 {/* Track Asphalt */}
                 <path
                    d={trackPath}
                    fill="none"
                    stroke="#333"
                    strokeWidth="10"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                 />
                 {/* Center Line (Dashed) */}
                 <path
                    d={trackPath}
                    fill="none"
                    stroke="#fff"
                    strokeWidth="0.4"
                    strokeDasharray="3 3"
                    strokeOpacity="0.4"
                 />
                  {/* Start/Finish Line */}
                 <g transform="translate(50, 60)">
                    <line x1="0" y1="-5" x2="0" y2="5" stroke="white" strokeWidth="2" />
                    <rect x="-1" y="-5" width="2" height="2" fill="black" />
                    <rect x="-1" y="-1" width="2" height="2" fill="black" />
                    <rect x="-1" y="3" width="2" height="2" fill="black" />
                 </g>
                 
                 {/* Sector Markers */}
                 <text x="55" y="18" fill="#666" fontSize="3" fontWeight="bold" textAnchor="middle" style={{ letterSpacing: '0.1em' }}>SECTOR 1</text>
                 <text x="85" y="38" fill="#666" fontSize="3" fontWeight="bold" textAnchor="middle" style={{ letterSpacing: '0.1em' }}>SECTOR 2</text>
                 <text x="30" y="52" fill="#666" fontSize="3" fontWeight="bold" textAnchor="middle" style={{ letterSpacing: '0.1em' }}>SECTOR 3</text>

                 {/* Direction Arrow */}
                 <path d="M 52 60 L 54 60 L 53 59 M 54 60 L 53 61" stroke="#F59E0B" strokeWidth="0.5" fill="none" />
            </g>
        );
    }

    // Default Football Pitch
    return (
        <g>
            {/* 360 Coverage Indicator */}
            <ellipse cx="50" cy="35" rx="49" ry="34" fill="none" stroke="#14b8a6" strokeWidth="0.2" strokeDasharray="2 2" opacity="0.5" />
            
            {/* Pitch Outline */}
            <rect x="2.5" y="2.5" width="95" height="65" fill="#059669" stroke="#fff" strokeWidth="0.5" rx="2" />
            {/* Center Line */}
            <line x1="50" y1="2.5" x2="50" y2="67.5" stroke="#fff" strokeWidth="0.5" strokeDasharray="1 1" />
            {/* Center Circle */}
            <circle cx="50" cy="35" r="10" stroke="#fff" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="35" r="0.75" fill="#fff" />
            {/* Penalty Areas */}
            <rect x="2.5" y="15" width="15" height="40" stroke="#fff" strokeWidth="0.5" fill="none" />
            <rect x="82.5" y="15" width="15" height="40" stroke="#fff"strokeWidth="0.5" fill="none" />
            {/* Goal Areas */}
            <rect x="2.5" y="25" width="7" height="20" stroke="#fff" strokeWidth="0.5" fill="none" />
            <rect x="90.5" y="25" width="7" height="20" stroke="#fff" strokeWidth="0.5" fill="none" />
        </g>
    );
  };

  return (
    <>
        <div className="mb-4">
        <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-lg font-semibold text-teal-400">
                {sportCategory === 'Motorsport' ? 'Race Telemetry' : 'Live Map'}
            </h3>
            <button 
                onClick={() => setIsExpanded(true)} 
                className="text-xs text-gray-400 hover:text-white flex items-center"
                title="Expand Map"
            >
                {ExpandIcon}
                <span className="ml-1">Expand</span>
            </button>
        </div>
        <div className="relative bg-gray-700/50 p-4 rounded-lg aspect-[10/7] overflow-hidden border border-gray-700 hover:border-teal-500/30 transition-colors cursor-pointer" onClick={() => setIsExpanded(true)}>
            <svg viewBox="0 0 100 70" className="w-full h-full">
            {renderMapContent()}
            {/* Provider Pins */}
            {providers.map(provider => {
                // Use live telemetry if available, else fallback to static
                const pos = liveTelemetry && liveTelemetry[provider.id] 
                    ? { x: liveTelemetry[provider.id].latitude, y: liveTelemetry[provider.id].longitude }
                    : provider.mapPosition;

                return (
                    <g 
                    key={provider.id} 
                    onClick={(e) => { e.stopPropagation(); onSelectProvider(provider); }}
                    className="cursor-pointer group transition-all duration-1000 ease-linear" // Smooth movement
                    >
                    {provider.id === 0 ? (
                        // Principal AI Director Pin (Center)
                        <g>
                        {/* Pulsing effect */}
                        <circle cx={pos.x} cy={pos.y} r={8} fill="#EAB308" opacity="0.3">
                            <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
                        </circle>
                        {/* Main Pin */}
                        <circle 
                            cx={pos.x} 
                            cy={pos.y} 
                            r={activeProviderId === 0 ? 5 : 4} 
                            fill="#EAB308" 
                            stroke="#fff" 
                            strokeWidth="0.8" 
                            className="transition-all duration-200"
                        />
                        <text x={pos.x} y={pos.y + 1.5} textAnchor="middle" fontSize="3" fill="black" fontWeight="bold">AI</text>
                        </g>
                    ) : (
                        // Regular Team Pins
                        <g>
                            {/* Drone or AR Indicator Ring */}
                            {(provider.deviceType === 'Drone' || provider.deviceType === 'AR') && (
                                <circle 
                                    cx={pos.x} 
                                    cy={pos.y} 
                                    r={provider.deviceType === 'Drone' ? 7 : 5} 
                                    fill="none" 
                                    stroke={provider.deviceType === 'Drone' ? '#4ADE80' : '#A855F7'} 
                                    strokeWidth="0.2" 
                                    strokeDasharray="1 1"
                                    opacity="0.6"
                                >
                                    <animateTransform attributeName="transform" type="rotate" from={`0 ${pos.x} ${pos.y}`} to={`360 ${pos.x} ${pos.y}`} dur="10s" repeatCount="indefinite"/>
                                </circle>
                            )}
                            <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={provider.id === activeProviderId ? 4 : 3}
                            fill={provider.id === activeProviderId ? '#14b8a6' : '#fff'}
                            stroke={provider.id === activeProviderId ? '#fff' : '#14b8a6'}
                            strokeWidth="0.8"
                            className="transition-all duration-200 group-hover:r-4"
                            />
                            {/* Direction Heading Indicator */}
                            {liveTelemetry && liveTelemetry[provider.id]?.heading !== undefined && (
                                <line 
                                    x1={pos.x} 
                                    y1={pos.y} 
                                    x2={pos.x} 
                                    y2={pos.y - 6} 
                                    stroke="white" 
                                    strokeWidth="0.5"
                                    transform={`rotate(${liveTelemetry[provider.id].heading}, ${pos.x}, ${pos.y})`}
                                />
                            )}
                        </g>
                    )}

                    <text
                        x={pos.x}
                        y={pos.y - 6}
                        textAnchor="middle"
                        fontSize="4"
                        fill="#fff"
                        className="font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg"
                        style={{ filter: "drop-shadow(0px 0px 1px black)" }}
                    >
                        {provider.name}
                    </text>
                    </g>
                );
            })}
            </svg>
            {/* Legend Overlay */}
            <div className="absolute bottom-2 left-2 flex flex-col text-[8px] text-gray-400 space-y-1 pointer-events-none">
                <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-teal-500 border border-white mr-1"></div> Live Unit</div>
                <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-yellow-500 border border-white mr-1"></div> AI Core</div>
                <div className="flex items-center"><div className="w-2 h-2 border border-green-400 border-dashed rounded-full mr-1"></div> Drone Coverage</div>
            </div>
        </div>
        </div>

        {/* Expansion Modal */}
        {isExpanded && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in-fast" onClick={() => setIsExpanded(false)}>
                 <div className="w-full h-full max-w-6xl max-h-[90vh] bg-gray-800 rounded-xl p-6 relative shadow-2xl" onClick={e => e.stopPropagation()}>
                     <div className="absolute top-4 right-4 flex items-center space-x-4 z-10">
                        <div className="flex items-center space-x-4 text-sm text-gray-400 bg-black/50 px-4 py-2 rounded-full">
                             <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-teal-500 border border-white mr-2"></div> Streamer</div>
                             <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-yellow-500 border border-white mr-2"></div> Principal AI</div>
                             <div className="flex items-center"><div className="w-3 h-3 border border-green-400 border-dashed rounded-full mr-2"></div> Drone</div>
                        </div>
                        <button onClick={() => setIsExpanded(false)} className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-bold">
                            Close Map
                        </button>
                     </div>
                     
                     <h2 className="text-2xl font-bold text-white mb-4 absolute top-6 left-6 pointer-events-none z-10">
                        {sportCategory === 'Motorsport' ? 'Track Telemetry' : 'Stadium Overview'}
                     </h2>

                     <div className="w-full h-full">
                        <svg viewBox="0 0 100 70" className="w-full h-full">
                            {renderMapContent()}
                            {/* Duplicate Pins for expanded view */}
                            {providers.map(provider => {
                                const pos = liveTelemetry && liveTelemetry[provider.id] 
                                    ? { x: liveTelemetry[provider.id].latitude, y: liveTelemetry[provider.id].longitude }
                                    : provider.mapPosition;
                                
                                return (
                                    <g key={provider.id} onClick={() => { onSelectProvider(provider); setIsExpanded(false); }} className="cursor-pointer hover:opacity-80 transition-opacity">
                                        {provider.id === 0 ? (
                                            <circle cx={pos.x} cy={pos.y} r={3} fill="#EAB308" stroke="white" strokeWidth="0.5" />
                                        ) : (
                                            <circle cx={pos.x} cy={pos.y} r={2} fill={provider.id === activeProviderId ? '#14b8a6' : '#fff'} stroke="black" strokeWidth="0.5" />
                                        )}
                                        <text x={pos.x} y={pos.y - 3} textAnchor="middle" fontSize="2" fill="white" fontWeight="bold">{provider.name}</text>
                                    </g>
                                )
                            })}
                        </svg>
                     </div>
                 </div>
            </div>
        )}
    </>
  );
};

export default StadiumMap;
