
import React, { useState, useEffect } from 'react';
import { harmonyService } from '../services/HarmonyService';
import { CheckIcon, TechIcon, CopyIcon, ResetIcon, HardwareIcon } from '../constants';

const EDGE_NODES = [
    { id: 'lon-1', name: 'London (LHR-01)', pos: { x: 48, y: 32 }, status: 'Healthy', load: 42, region: 'EU-WEST' },
    { id: 'nyc-1', name: 'New York (JFK-04)', pos: { x: 28, y: 38 }, status: 'Healthy', load: 68, region: 'US-EAST' },
    { id: 'tok-1', name: 'Tokyo (NRT-02)', pos: { x: 85, y: 40 }, status: 'Healthy', load: 15, region: 'AP-NORTHEAST' },
    { id: 'syd-1', name: 'Sydney (SYD-01)', pos: { x: 88, y: 82 }, status: 'Healthy', load: 8, region: 'AP-SOUTHEAST' },
    { id: 'fra-1', name: 'Frankfurt (FRA-02)', pos: { x: 52, y: 34 }, status: 'Healthy', load: 55, region: 'EU-CENTRAL' },
];

const DNS_RECORDS = [
    { type: 'NS', host: '@', value: 'ns-cloud-c1.googledomains.com', ttl: 'Auto' },
    { type: 'NS', host: '@', value: 'ns-cloud-c2.googledomains.com', ttl: 'Auto' },
    { type: 'A', host: '@', value: '34.102.11.89 (GCP LB)', ttl: '300' },
];

const InfrastructurePanel: React.FC = () => {
    const [networkTier, setNetworkTier] = useState<'STANDARD' | 'PREMIUM'>('STANDARD');
    const [propagationData, setPropagationData] = useState<any[]>([]);
    const [logs, setLogs] = useState<string[]>([]);
    const [stats, setStats] = useState({ throughput: 14200, lag: 4, capacity: 65 });
    const [activeNode, setActiveNode] = useState(EDGE_NODES[0]);
    const [ttl, setTtl] = useState(60);
    const [isStressTesting, setIsStressTesting] = useState(false);

    useEffect(() => {
        // Initialize propagation data
        setPropagationData([
            { region: 'North America', status: 'ACTIVE', latency: networkTier === 'PREMIUM' ? '12ms' : '45ms' },
            { region: 'Europe', status: 'ACTIVE', latency: networkTier === 'PREMIUM' ? '18ms' : '52ms' },
            { region: 'Asia Pacific', status: 'ACTIVE', latency: networkTier === 'PREMIUM' ? '85ms' : '140ms' },
        ]);
    }, [networkTier]);

    useEffect(() => {
        const interval = setInterval(() => {
            const baseLoad = networkTier === 'PREMIUM' ? 120000 : 14000;
            const variability = Math.random() * 5000;
            
            setStats(prev => ({
                ...prev,
                throughput: Math.floor(isStressTesting ? baseLoad * 2.5 : baseLoad + variability),
                lag: networkTier === 'PREMIUM' ? Math.floor(Math.random() * 15 + 5) : Math.floor(Math.random() * 60 + 30),
                capacity: isStressTesting ? 98 : (networkTier === 'PREMIUM' ? 40 : 85)
            }));
            setTtl(prev => (prev <= 1 ? 60 : prev - 1));
        }, 1000);

        const handlePulse = (pulse: any) => {
            if (Math.random() > 0.85) {
                const tierLabel = networkTier === 'PREMIUM' ? '[GCP-Fiber]' : '[Public-Net]';
                const msgs = [
                    `${tierLabel} Packet routed via ${activeNode.id} edge`,
                    `[Namecheap] Auth handshake validated (2ms)`,
                    `[Cloud DNS] Resolved costreamhorizon.live -> 34.102.11.89`,
                    `[Capacity] Current mesh load: ${stats.capacity}%`,
                    `[Security] DDoS Shield: Active (Cloud Armor)`
                ];
                setLogs(prev => [msgs[Math.floor(Math.random() * msgs.length)], ...prev].slice(0, 12));
            }
        };

        harmonyService.on('harmony_pulse', handlePulse);
        return () => {
            clearInterval(interval);
            harmonyService.off('harmony_pulse', handlePulse);
        };
    }, [activeNode, ttl, networkTier, isStressTesting, stats.capacity]);

    const toggleStressTest = () => {
        setIsStressTesting(!isStressTesting);
        setLogs(prev => [`[CMD] ${!isStressTesting ? 'INITIATING' : 'STOPPING'} CAPACITY STRESS TEST...`, ...prev]);
    };

    return (
        <div className="animate-portal space-y-8 pb-20 overflow-x-hidden">
            {/* NOC Command Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-10">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-teal-500 text-black text-[9px] font-black px-2 py-0.5 rounded italic">HYBRID CLOUD</span>
                        <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none italic">Edge Operations</h2>
                    </div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.4em] flex items-center">
                        <span className={`w-2 h-2 rounded-full mr-3 animate-pulse shadow-[0_0_12px_rgba(20,184,166,1)] ${networkTier === 'PREMIUM' ? 'bg-purple-500' : 'bg-teal-500'}`}></span>
                        {networkTier === 'PREMIUM' ? 'GCP PREMIUM TIER ACTIVE' : 'STANDARD ROUTING ACTIVE'}
                    </p>
                </div>
                
                <div className="flex items-center bg-gray-900 rounded-2xl p-1 border border-white/10">
                    <button 
                        onClick={() => setNetworkTier('STANDARD')}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${networkTier === 'STANDARD' ? 'bg-gray-700 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                    >
                        Standard DNS
                    </button>
                    <button 
                        onClick={() => setNetworkTier('PREMIUM')}
                        className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${networkTier === 'PREMIUM' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-gray-500 hover:text-white'}`}
                    >
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        GCP Premium
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cloud Convergence Engine (Visualizer) */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass-morphism p-8 rounded-[3rem] border border-white/5 overflow-hidden relative min-h-[450px] shadow-inner flex flex-col">
                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div>
                                <h3 className="text-xl font-black text-white tracking-tighter uppercase italic">Cloud Convergence Engine</h3>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Namecheap x Google Cloud Platform</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Est. Latency</p>
                                <p className={`text-2xl font-mono font-black tracking-tighter ${networkTier === 'PREMIUM' ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {stats.lag}ms
                                </p>
                            </div>
                        </div>

                        {/* Architecture Visualization */}
                        <div className="flex-grow relative flex items-center justify-between px-4 md:px-12 z-10">
                            {/* Node 1: Namecheap */}
                            <div className="flex flex-col items-center gap-4 z-20">
                                <div className="w-20 h-20 rounded-2xl bg-gray-800 border border-gray-600 flex items-center justify-center shadow-2xl relative">
                                    <span className="text-3xl">🏷️</span>
                                    <div className="absolute -top-2 -right-2 bg-green-500 text-black text-[8px] font-bold px-2 py-0.5 rounded-full">AUTH</div>
                                </div>
                                <div className="text-center">
                                    <p className="text-white font-bold text-xs">Namecheap</p>
                                    <p className="text-gray-500 text-[9px] uppercase tracking-wider">Registrar</p>
                                </div>
                            </div>

                            {/* Connection Lines */}
                            <div className="flex-grow h-px bg-gray-700 relative mx-4">
                                <div className={`absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-gradient-to-r from-gray-500 via-white to-gray-500 w-1/3 transition-all duration-1000 ${networkTier === 'PREMIUM' ? 'animate-shimmer-fast w-full opacity-100' : 'animate-pulse opacity-30'}`}></div>
                                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-black px-2 text-[8px] text-gray-500 font-mono">
                                    {networkTier === 'PREMIUM' ? 'Cloud DNS API' : 'Basic Resolution'}
                                </div>
                            </div>

                            {/* Node 2: Google Cloud DNS (The Bridge) */}
                            <div className={`flex flex-col items-center gap-4 z-20 transition-all duration-500 ${networkTier === 'PREMIUM' ? 'scale-110' : 'opacity-60 grayscale'}`}>
                                <div className="w-24 h-24 rounded-full bg-blue-600/20 border-2 border-blue-500 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.3)] relative">
                                    <div className="absolute inset-0 border-t-2 border-blue-400 rounded-full animate-spin"></div>
                                    <span className="text-3xl">☁️</span>
                                </div>
                                <div className="text-center">
                                    <p className="text-blue-400 font-bold text-xs">Cloud DNS</p>
                                    <p className="text-gray-500 text-[9px] uppercase tracking-wider">Intelligence</p>
                                </div>
                            </div>

                            {/* Connection Lines */}
                            <div className="flex-grow h-px bg-gray-700 relative mx-4">
                                <div className={`absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 w-full transition-all duration-700 ${networkTier === 'PREMIUM' ? 'animate-shimmer-superfast' : 'hidden'}`}></div>
                            </div>

                            {/* Node 3: GCP Edge */}
                            <div className="flex flex-col items-center gap-4 z-20">
                                <div className="w-20 h-20 rounded-2xl bg-gray-900 border border-purple-500/50 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.2)]">
                                    <span className="text-3xl">🚀</span>
                                    <div className="absolute -bottom-2 bg-purple-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-full">
                                        {stats.capacity}% LOAD
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="text-white font-bold text-xs">GCP Media CDN</p>
                                    <p className="text-gray-500 text-[9px] uppercase tracking-wider">Delivery</p>
                                </div>
                            </div>
                        </div>

                        {/* Background Grid */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
                    </div>
                </div>

                {/* Capacity Analysis & Stress Test */}
                <div className="flex flex-col gap-6">
                    <div className={`p-8 rounded-[2.5rem] border flex flex-col h-full shadow-2xl relative overflow-hidden transition-all duration-500 ${isStressTesting ? 'bg-red-900/20 border-red-500/50' : 'glass-morphism border-white/5'}`}>
                        <div className="mb-6 relative z-10">
                            <h3 className="text-lg font-black text-white tracking-tighter uppercase italic">Capacity Examine</h3>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">Throughput Stress Test</p>
                        </div>

                        <div className="flex-grow flex flex-col justify-end relative z-10">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-[9px] font-black text-gray-400 uppercase">Ingest Velocity</span>
                                <span className="text-2xl font-mono font-black text-white">{(stats.throughput / 1000).toFixed(1)}k <span className="text-xs text-gray-500">req/s</span></span>
                            </div>
                            
                            {/* Visual Bar Graph Simulation */}
                            <div className="flex items-end justify-between h-24 gap-1 mb-6">
                                {[...Array(10)].map((_, i) => (
                                    <div 
                                        key={i} 
                                        className={`w-full rounded-t-sm transition-all duration-300 ${isStressTesting ? 'bg-red-500' : 'bg-teal-500'}`} 
                                        style={{ 
                                            height: `${Math.min(100, (stats.throughput / 15000) * 10 * (i+1) * Math.random())}%`,
                                            opacity: 0.3 + (i/10)
                                        }}
                                    ></div>
                                ))}
                            </div>

                            <button 
                                onClick={toggleStressTest}
                                className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95 ${isStressTesting ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'}`}
                            >
                                {isStressTesting ? 'STOP STRESS TEST' : 'RUN CAPACITY TEST'}
                            </button>
                        </div>
                    </div>

                    {/* Regional Status List */}
                    <div className="glass-morphism p-6 rounded-[2.5rem] border border-white/5 flex-grow">
                        <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Regional Resolve</h4>
                        <div className="space-y-3">
                            {propagationData.map((node, i) => (
                                <div key={i} className="flex justify-between items-center text-xs border-b border-white/5 pb-2 last:border-0">
                                    <span className="text-gray-300">{node.region}</span>
                                    <span className={`font-mono font-bold ${parseInt(node.latency) < 20 ? 'text-green-400' : 'text-yellow-400'}`}>
                                        {node.latency}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* High-Tech Terminal / NOC Logs */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-morphism p-10 rounded-[3rem] border border-white/5 bg-gradient-to-br from-[#050505] to-[#0a0a0a] shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 blur-[120px] pointer-events-none group-hover:bg-purple-600/10 transition-all duration-1000"></div>
                     <div className="flex items-center justify-between mb-8 relative z-10">
                        <div>
                            <h3 className="text-xl font-black text-white tracking-tighter uppercase italic">DNS Configuration</h3>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Active Zone File</p>
                        </div>
                        <div className="flex items-center bg-blue-900/20 border border-blue-500/30 px-4 py-1.5 rounded-full shadow-lg">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
                            <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Managed by GCP</span>
                        </div>
                    </div>

                    <div className="space-y-4 relative z-10">
                        {DNS_RECORDS.map((rec, i) => (
                            <div key={i} className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/5">
                                <div>
                                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{rec.type} Record</p>
                                    <code className="text-xs font-mono text-teal-400">{rec.value}</code>
                                </div>
                                <span className="text-[9px] font-mono text-gray-600">TTL: {rec.ttl}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Live Console */}
                <div className="bg-black/50 rounded-[3rem] p-8 border border-white/5 font-mono text-[9px] h-full overflow-hidden relative shadow-inner flex flex-col">
                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
                        <span className="text-gray-500 font-black uppercase">SYSTEM_LOG_STREAM</span>
                        <div className="flex gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse delay-75"></span>
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-150"></span>
                        </div>
                    </div>
                    <div className="flex-grow overflow-y-auto custom-scrollbar space-y-2">
                        {logs.map((log, i) => (
                            <div key={i} className="text-gray-400 flex items-start animate-fade-in-fast">
                                <span className="text-purple-900 mr-3 shrink-0 select-none">[{new Date().toLocaleTimeString([], { hour12: false, second: '2-digit', fractionalSecondDigits: 3 } as any)}]</span>
                                <span className={log.includes('GCP') || log.includes('Cloud DNS') ? 'text-blue-400 font-bold' : log.includes('Capacity') ? 'text-red-400' : ''}>{log}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfrastructurePanel;
