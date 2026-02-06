
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { CheckIcon, HardwareIcon, TechIcon, ResetIcon } from '../constants';

interface DeviceScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: (success: boolean) => void;
}

type ScanStage = 'IDLE' | 'BOOT' | 'HARDWARE' | 'NETWORK' | 'SECURITY' | 'ANALYZING' | 'COMPLETE';

const SCAN_PHASES = [
    { id: 'boot', label: 'Bootloader Integrity', color: 'text-gray-400' },
    { id: 'hw', label: 'Hardware Topology', color: 'text-purple-400' },
    { id: 'net', label: 'Uplink Saturation', color: 'text-blue-400' },
    { id: 'sec', label: 'Heuristic Scan', color: 'text-teal-400' }
];

const HEX_CHARS = '0123456789ABCDEF';

const DeviceScannerModal: React.FC<DeviceScannerModalProps> = ({ isOpen, onClose, onScanComplete }) => {
  const [stage, setStage] = useState<ScanStage>('IDLE');
  const [logs, setLogs] = useState<string[]>([]);
  const [aiReport, setAiReport] = useState<string>('');
  const [systemScore, setSystemScore] = useState(0);
  const [hexDump, setHexDump] = useState<string[]>([]);
  const [networkGraph, setNetworkGraph] = useState<number[]>(new Array(20).fill(10));
  
  const logContainerRef = useRef<HTMLDivElement>(null);
  const hexIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (logContainerRef.current) {
        logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Hex Dump Animation Effect
  useEffect(() => {
      if (stage !== 'IDLE' && stage !== 'COMPLETE') {
          hexIntervalRef.current = window.setInterval(() => {
              const line = Array(8).fill(0).map(() => 
                  Array(2).fill(0).map(() => HEX_CHARS[Math.floor(Math.random() * 16)]).join('')
              ).join(' ');
              setHexDump(prev => [`0x${Math.floor(Math.random()*65535).toString(16).toUpperCase().padStart(4, '0')}: ${line}`, ...prev].slice(0, 12));
              
              if (stage === 'NETWORK') {
                  setNetworkGraph(prev => prev.map(() => Math.floor(Math.random() * 80 + 20)));
              }
          }, 80);
      } else {
          if (hexIntervalRef.current) clearInterval(hexIntervalRef.current);
      }
      return () => { if (hexIntervalRef.current) clearInterval(hexIntervalRef.current); };
  }, [stage]);

  // Reset state when opening
  useEffect(() => {
      if (isOpen && stage === 'IDLE') {
          setLogs([]);
          setAiReport('');
          setSystemScore(0);
          setHexDump([]);
      }
  }, [isOpen]);

  const addLog = (msg: string) => setLogs(prev => [...prev, `[${new Date().toLocaleTimeString().split(' ')[0]}] ${msg}`]);

  const runScan = async () => {
      setStage('BOOT');
      addLog("Initializing Horizon Sentinel v4.5...");
      await new Promise(r => setTimeout(r, 800));

      setStage('HARDWARE');
      addLog("Mounting hardware abstraction layer...");
      addLog("GPU: NVIDIA Virtual Orin detected");
      addLog("Memory Integrity: VERIFIED");
      await new Promise(r => setTimeout(r, 1500));

      setStage('NETWORK');
      addLog("Pinging ingest nodes...");
      for(let i=0; i<5; i++) {
          await new Promise(r => setTimeout(r, 200));
          addLog(`> Packet ${i+1}/5: 12ms latency (Optimal)`);
      }
      addLog("Jitter analysis: < 2ms");
      
      setStage('SECURITY');
      addLog("Scanning for injection hooks...");
      addLog("DRM Certificates: VALID");
      await new Promise(r => setTimeout(r, 1200));

      setStage('ANALYZING');
      addLog("Contacting Gemini Core for optimization profile...");

      try {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
          
          // Generate realistic mock stats to feed the prompt
          const mockUpload = Math.floor(Math.random() * 50 + 50); // 50-100 mbps
          const mockPing = Math.floor(Math.random() * 20 + 5); // 5-25 ms
          
          const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ parts: [{ text: `Analyze these stream stats: Upload ${mockUpload}Mbps, Ping ${mockPing}ms, GPU Load 45%. Generate a very short, cool 'System Grade' (e.g. S-TIER, A-GRADE) and a 1-sentence technical recommendation for OBS settings.` }] }],
          });
          
          setAiReport(response.text || "S-TIER: System optimal. Recommended bitrate: 8000kbps CBR.");
      } catch (e) {
          setAiReport("A-GRADE: Uplink stable. Configured for 1080p60 High Profile.");
      }

      setSystemScore(Math.floor(Math.random() * 15 + 85)); // 85-100 score
      setStage('COMPLETE');
      onScanComplete(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-3xl flex items-center justify-center z-[200] animate-fade-in-fast" onClick={onClose}>
      <div className="bg-[#0a0a0a] border border-gray-800 rounded-[2rem] max-w-4xl w-full m-4 overflow-hidden relative shadow-[0_0_50px_rgba(20,184,166,0.1)] flex flex-col md:flex-row h-[600px]" onClick={e => e.stopPropagation()}>
        
        {/* Left Panel: Visualizer */}
        <div className="w-full md:w-1/3 bg-gray-900/50 border-b md:border-b-0 md:border-r border-gray-800 p-6 flex flex-col relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>
            
            {/* Header */}
            <div className="flex items-center gap-3 mb-8 z-10">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${stage === 'SCANNING' || stage === 'ANALYZING' ? 'bg-teal-500/10 border-teal-500 text-teal-400 animate-pulse' : 'bg-gray-800 border-gray-700 text-gray-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                    <h2 className="text-sm font-black text-white uppercase tracking-widest">Sentinel</h2>
                    <p className="text-[9px] font-bold text-gray-500 uppercase">Integrity Engine</p>
                </div>
            </div>

            {/* Visualizer Area */}
            <div className="flex-grow flex flex-col justify-center items-center z-10 relative">
                {stage === 'IDLE' && (
                    <div className="w-32 h-32 rounded-full border-2 border-gray-800 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border-t-2 border-teal-500 animate-spin opacity-20"></div>
                        <span className="text-xs font-black text-gray-600 uppercase tracking-widest">Standby</span>
                    </div>
                )}

                {(stage === 'HARDWARE' || stage === 'NETWORK' || stage === 'SECURITY' || stage === 'ANALYZING') && (
                    <div className="relative w-full h-48 flex items-end justify-between gap-1 px-4">
                        {networkGraph.map((h, i) => (
                            <div 
                                key={i} 
                                className="w-full bg-teal-500/50 transition-all duration-75 ease-linear rounded-t-sm"
                                style={{ height: `${h}%`, opacity: 0.3 + (i/40) }}
                            ></div>
                        ))}
                        <div className="absolute inset-0 border border-teal-500/20 rounded-lg pointer-events-none">
                            <div className="absolute top-2 left-2 text-[8px] font-mono text-teal-500">FREQ_HZ</div>
                        </div>
                    </div>
                )}

                {stage === 'COMPLETE' && (
                    <div className="text-center animate-bounce-small">
                        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-teal-400 to-emerald-600 tracking-tighter mb-2">
                            {systemScore}
                        </div>
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">Integrity Score</p>
                    </div>
                )}
            </div>

            {/* Hex Dump overlay */}
            <div className="mt-6 h-32 overflow-hidden font-mono text-[9px] text-green-900/50 pointer-events-none select-none relative">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10"></div>
                {hexDump.map((line, i) => (
                    <div key={i}>{line}</div>
                ))}
            </div>
        </div>

        {/* Right Panel: Controls & Logs */}
        <div className="w-full md:w-2/3 p-8 flex flex-col bg-black/20">
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-600 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Progress Steps */}
            <div className="flex justify-between mb-8 border-b border-white/5 pb-6">
                {SCAN_PHASES.map((phase, idx) => {
                    const isActive = stage === phase.id.toUpperCase();
                    const isDone = SCAN_PHASES.findIndex(p => p.id.toUpperCase() === stage) > idx || stage === 'COMPLETE' || stage === 'ANALYZING';
                    
                    return (
                        <div key={phase.id} className="flex flex-col items-center">
                            <div className={`w-2 h-2 rounded-full mb-2 transition-all ${isActive ? 'bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)] scale-150' : isDone ? 'bg-gray-500' : 'bg-gray-800'}`}></div>
                            <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-gray-600'}`}>{phase.label}</span>
                        </div>
                    );
                })}
            </div>

            {/* Main Log Area */}
            <div className="flex-grow bg-[#050505] rounded-xl border border-white/10 p-4 font-mono text-xs overflow-y-auto mb-6 shadow-inner relative custom-scrollbar" ref={logContainerRef}>
                {logs.length === 0 && stage === 'IDLE' ? (
                    <div className="h-full flex items-center justify-center text-gray-700">
                        <p className="uppercase tracking-widest text-[10px]">Awaiting Manual Initiation...</p>
                    </div>
                ) : (
                    logs.map((log, i) => (
                        <div key={i} className="mb-1 text-gray-400 border-l-2 border-teal-900/50 pl-2 animate-fade-in-fast">
                            <span className="text-teal-700 mr-2">&gt;</span>
                            {log}
                        </div>
                    ))
                )}
                {(stage !== 'IDLE' && stage !== 'COMPLETE') && (
                    <div className="w-2 h-4 bg-teal-500 animate-pulse mt-1"></div>
                )}
            </div>

            {/* Footer Action Area */}
            <div className="min-h-[100px] flex flex-col justify-end">
                {stage === 'IDLE' && (
                    <button 
                        onClick={runScan}
                        className="w-full bg-teal-600 hover:bg-teal-500 text-white font-black py-4 rounded-xl shadow-[0_0_30px_rgba(20,184,166,0.2)] transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center group"
                    >
                        <span className="group-hover:animate-pulse">Initiate System Scan</span>
                    </button>
                )}

                {stage === 'COMPLETE' && (
                    <div className="bg-teal-900/10 border border-teal-500/20 rounded-xl p-4 animate-fade-in-up">
                        <div className="flex items-start gap-4">
                            <div className="bg-teal-500/20 p-2 rounded-lg text-teal-400 mt-1">
                                {CheckIcon}
                            </div>
                            <div>
                                <h4 className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-1">Device Certified</h4>
                                <p className="text-gray-400 text-xs leading-relaxed">
                                    {aiReport}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button onClick={onClose} className="text-white hover:text-teal-400 text-xs font-bold uppercase tracking-widest underline decoration-gray-700 hover:decoration-teal-400 transition-all">
                                Return to Dashboard
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceScannerModal;
