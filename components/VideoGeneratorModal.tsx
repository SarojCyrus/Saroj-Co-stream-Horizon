import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { VideoSparkIcon, CheckIcon, ResetIcon, ShareIcon, TwitterIcon, WhatsappIcon, CopyIcon } from '../constants';

interface VideoGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SCENE_DURATION = 9; 
const TOTAL_SCENES = 20;
const PRESENTATION_DURATION = SCENE_DURATION * TOTAL_SCENES; // 180 Seconds

const STORYBOARD_SCENES = [
    { id: 1, title: 'Scene 01: The Awakening', img: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "Can you feel it? The stadium pulse is rising. The Horizon is no longer a vision—it is your new home." },
    { id: 2, title: 'Scene 02: Legacy Broken', img: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "Legacy broadcasts are dead. One camera, one voice? Never again. Today, we shatter the frame." },
    { id: 3, title: 'Scene 03: Massive Ingest', img: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "A thousand feeds. One ecosystem. We've built the world's most powerful live ingest plane for the fans." },
    { id: 4, title: 'Scene 04: Your Command', img: 'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "You are the director now. This is your command center. Every goal, every strike, every impact—on your terms." },
    { id: 5, title: 'Scene 05: Zero Latency', img: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "Speed is everything. Our edge fabric delivers the action at the speed of thought. Zero lag. Total presence." },
    { id: 6, title: 'Scene 06: Data Flow', img: 'https://images.pexels.com/photos/408503/pexels-photo-408503.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "Telemetry mapping translates raw energy into tactical intelligence. Watch the play unfold before it even happens." },
    { id: 7, title: 'Scene 07: Multi-View Power', img: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "Switch between four perspectives instantly. Don't just watch the game—experience the competition from the inside." },
    { id: 8, title: 'Scene 08: Sky Superiority', img: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "Our autonomous drones own the sky. Angles you’ve only ever dreamed of are now your standard view." },
    { id: 9, title: 'Scene 09: Perfect Sync', img: 'https://images.pexels.com/photos/6329434/pexels-photo-6329434.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "The Harmony Engine locks every millisecond. Sound, sight, and data—all moving as one single heartbeat." },
    { id: 10, title: 'Scene 10: Pure Emotion', img: 'https://images.pexels.com/photos/1470168/pexels-photo-1470168.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "Feel the impact! When the athlete moves, you move. This is the raw physical intensity of the sport." },
    { id: 11, title: 'Scene 11: Virtual Front Row', img: 'https://images.pexels.com/photos/3761118/pexels-photo-3761118.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "Teleport to the VIP box seats. VR immersion that puts you inches away from the victory." },
    { id: 12, title: 'Scene 12: AR Reality', img: 'https://images.pexels.com/photos/6498301/pexels-photo-6498301.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "Your vision, enhanced. Our AR HUD overlays stats and telemetry directly onto the field of play." },
    { id: 13, title: 'Scene 13: Sonic Boom', img: 'https://images.pexels.com/photos/159469/speakers-sound-system-audio-music-159469.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "Hear the roar of the crowd in 3D spatial audio. The stadium isn't just visible—it's audible everywhere." },
    { id: 14, title: 'Scene 14: Social Fabric', img: 'https://images.pexels.com/photos/2034851/pexels-photo-2034851.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "Connect with the collective energy of millions. The global conversation happens here, in the Horizon." },
    { id: 15, title: 'Scene 15: Party Mode', img: 'https://images.pexels.com/photos/1587036/pexels-photo-1587036.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "Your own private watch party. Share the glory with friends across the world in real-time." },
    { id: 16, title: 'Scene 16: Empowered Creators', img: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "We give athletes the tools to build empires. Your perspective is your currency. Own your broadcast." },
    { id: 17, title: 'Scene 17: Revenue Revolution', img: 'https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "A fair partnership for a new era. 50/50 split. You create the adrenaline, you keep half the gain." },
    { id: 18, title: 'Scene 18: Elite Access', img: 'https://images.pexels.com/photos/2361135/pexels-photo-2361135.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "Design your own arena. Control the gate, build your community, and set your own rules." },
    { id: 19, title: 'Scene 19: The Momentum', img: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "This isn't just watching. This is participation. This is the evolution of the human experience." },
    { id: 20, title: 'Scene 20: Horizon Bound', img: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260', narrator: "The stadium is yours. The game is live. Welcome to Co-Stream Horizon. Play your way." }
];

const VideoGeneratorModal: React.FC<VideoGeneratorModalProps> = ({ isOpen, onClose }) => {
  const [activeScene, setActiveScene] = useState(0);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisProgress, setSynthesisProgress] = useState(0);
  const [sceneAudio, setSceneAudio] = useState<Record<number, AudioBuffer>>({});
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [isExportReady, setIsExportReady] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(0); 
  const [errorLog, setErrorLog] = useState<string | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const voiceGainRef = useRef<GainNode | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const currentNarratorRef = useRef<AudioBufferSourceNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const isCanceledRef = useRef(false);

  const initAudioSystem = () => {
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        voiceGainRef.current = audioContextRef.current.createGain();
        voiceGainRef.current.gain.value = 2.4; 
        voiceGainRef.current.connect(audioContextRef.current.destination);
    }
    if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
    }
  };

  const decodePcmData = async (data: Uint8Array): Promise<AudioBuffer> => {
    const ctx = audioContextRef.current!;
    const dataInt16 = new Int16Array(data.buffer);
    const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) {
        channelData[i] = dataInt16[i] / 32768.0;
    }
    return buffer;
  };

  const throttle = (ms: number) => new Promise(res => setTimeout(res, ms));

  const synthesizeFullKeynote = async () => {
    initAudioSystem();
    setIsSynthesizing(true);
    setErrorLog(null);
    isCanceledRef.current = false;
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
    for (let i = 0; i < STORYBOARD_SCENES.length; i++) {
      if (isCanceledRef.current) break;
      if (sceneAudio[i]) {
          setSynthesisProgress(i + 1);
          continue;
      }

      let retries = 3;
      let success = false;

      while (retries > 0 && !success && !isCanceledRef.current) {
        try {
          const margin = i > 12 ? 7000 : 5000;
          await throttle(margin); 

          const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [{ parts: [{ text: `High-excitement professional male announcer, sportscaster style: ${STORYBOARD_SCENES[i].narrator}` }] }],
            config: {
              responseModalities: [Modality.AUDIO],
              speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } },
              },
            },
          });

          const base64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
          if (base64) {
              const binary = atob(base64);
              const bytes = new Uint8Array(binary.length);
              for (let j = 0; j < binary.length; j++) bytes[j] = binary.charCodeAt(j);
              const buffer = await decodePcmData(bytes);
              setSceneAudio(prev => ({ ...prev, [i]: buffer }));
              success = true;
          }
        } catch (err: any) {
          if (err.message?.includes('quota') || err.message?.includes('429')) {
             setErrorLog(`QUOTA EXCEEDED AT SCENE ${i+1}. COOLING DOWN 45s...`);
             await throttle(45000); 
          } else {
             await throttle(5000);
          }
          retries--;
        }
      }

      if (!success && !isCanceledRef.current) {
        const ctx = audioContextRef.current!;
        const silent = ctx.createBuffer(1, ctx.sampleRate * 8, ctx.sampleRate);
        setSceneAudio(prev => ({ ...prev, [i]: silent }));
      }

      setSynthesisProgress(i + 1);
      setErrorLog(null);
    }
    setIsSynthesizing(false);
  };

  const startPresentation = async () => {
    initAudioSystem();
    if (Object.keys(sceneAudio).length < STORYBOARD_SCENES.length) {
        await synthesizeFullKeynote();
    }
    if (isCanceledRef.current) return;

    setIsExportReady(false);
    setIsPresentationMode(true);
    setPlaybackTime(0);
    setActiveScene(0);
    
    musicRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3');
    musicRef.current.volume = 0.08;
    musicRef.current.loop = true;
    musicRef.current.play().catch(() => {});

    startTimeRef.current = performance.now();
    
    const updateLoop = (now: number) => {
        if (isCanceledRef.current) return;
        const elapsed = (now - startTimeRef.current) / 1000;
        setPlaybackTime(elapsed);
        
        const currentSceneIdx = Math.floor(elapsed / SCENE_DURATION);
        if (currentSceneIdx >= TOTAL_SCENES) {
            finishPresentation();
            return;
        }
        
        if (currentSceneIdx !== activeScene) {
            setActiveScene(currentSceneIdx);
        }
        
        rafRef.current = requestAnimationFrame(updateLoop);
    };
    
    rafRef.current = requestAnimationFrame(updateLoop);
  };

  const finishPresentation = () => {
    setIsExportReady(true);
    setIsPresentationMode(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (musicRef.current) musicRef.current.pause();
    if (currentNarratorRef.current) {
        try { currentNarratorRef.current.stop(); } catch(e) {}
    }
  };

  useEffect(() => {
    if (!isPresentationMode || isCanceledRef.current || !audioContextRef.current) return;
    
    if (currentNarratorRef.current) {
        try { currentNarratorRef.current.stop(); } catch(e) {}
    }

    const buffer = sceneAudio[activeScene];
    if (buffer) {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = buffer;
        source.connect(voiceGainRef.current!);
        source.start(0);
        currentNarratorRef.current = source;
    }
  }, [activeScene, isPresentationMode]);

  const stopPlayback = () => {
    setIsPresentationMode(false);
    setIsExportReady(false);
    isCanceledRef.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current = null;
    }
    if (currentNarratorRef.current) {
        try { currentNarratorRef.current.stop(); } catch(e) {}
        currentNarratorRef.current = null;
    }
    setPlaybackTime(0);
    setActiveScene(0);
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 3000);
    }).catch(err => {
        console.error("Copy failed", err);
    });
  };

  const handleSocialShare = (platform: 'twitter' | 'whatsapp') => {
      const shareUrl = `${window.location.origin}/reels/master_${Math.floor(Math.random() * 10000)}`;
      const text = "Check out my 180s Master Reel on Co-Stream Horizon! ";
      
      if (platform === 'twitter') {
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
      } else {
          window.open(`https://wa.me/?text=${encodeURIComponent(text + shareUrl)}`, '_blank');
      }
      handleCopyLink(shareUrl); // Still copy to clipboard as fallback
  };

  useEffect(() => {
    return () => {
        isCanceledRef.current = true;
        stopPlayback();
    };
  }, []);

  if (!isOpen) return null;

  const currentProgressPercent = (playbackTime / PRESENTATION_DURATION) * 100;

  return (
    <div className="fixed inset-0 bg-black/98 backdrop-blur-3xl flex items-center justify-center z-[70] animate-fade-in-fast" onClick={onClose}>
        <div className="bg-gray-900 border border-purple-500/30 rounded-[4rem] max-w-7xl w-full m-4 overflow-hidden relative shadow-[0_0_150px_rgba(168,85,247,0.3)] flex h-[85vh]" onClick={e => e.stopPropagation()}>
          
          {/* Copy Confirmation Toast */}
          {copyFeedback && (
              <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[300] bg-teal-500 text-black font-black px-8 py-3 rounded-full shadow-2xl animate-bounce uppercase tracking-widest text-xs">
                  Reel Link Copied to Clipboard
              </div>
          )}

          {!isPresentationMode && !isExportReady && (
            <div className="w-80 bg-gray-950/60 border-r border-white/5 flex flex-col shrink-0">
                <div className="p-8 border-b border-white/5 bg-gray-900/40">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="bg-purple-600 text-white text-[9px] font-black px-2 py-0.5 rounded italic uppercase tracking-widest">Master Cinema V3</span>
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tighter italic uppercase leading-none">Media Orchestrator</h2>
                    <div className="mt-8">
                        <div className="flex justify-between text-[10px] text-gray-500 mb-2 font-black uppercase tracking-widest">
                            <span>Ready to Direct</span>
                            <span>{Object.keys(sceneAudio).length}/20 SYNCED</span>
                        </div>
                        <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden ring-1 ring-white/5">
                            <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 h-full transition-all duration-1000 shadow-[0_0_15px_rgba(168,85,247,0.5)]" style={{ width: `${(Object.keys(sceneAudio).length/TOTAL_SCENES)*100}%` }}></div>
                        </div>
                    </div>
                </div>
                
                <div className="flex-grow overflow-y-auto p-4 space-y-1 custom-scrollbar bg-gray-900/20">
                    {STORYBOARD_SCENES.map((scene, index) => (
                        <button
                            key={scene.id}
                            onClick={() => { setActiveScene(index); }}
                            className={`w-full text-left p-4 rounded-3xl border transition-all flex items-center justify-between group ${
                                activeScene === index 
                                ? 'bg-purple-600/20 border-purple-500/40 text-white shadow-2xl' 
                                : 'bg-transparent border-transparent text-gray-600 hover:bg-white/5'
                            }`}
                        >
                            <div className="flex flex-col">
                                <span className={`text-[10px] font-black uppercase tracking-widest ${activeScene === index ? 'text-purple-400' : 'text-gray-500'}`}>SCENE_{String(index+1).padStart(2, '0')}</span>
                                <span className={`text-xs font-bold ${activeScene === index ? 'text-white' : 'text-gray-700'}`}>{scene.title.split(': ')[1] || scene.title}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {sceneAudio[index] ? <span className="text-teal-400 text-[10px] animate-pulse">🎙️</span> : <span className="text-gray-800 text-[10px]">🎙️</span>}
                                {sceneAudio[index] ? <span className="text-green-500">{CheckIcon}</span> : <span className="text-[10px] opacity-20 font-mono tracking-tighter">WAIT</span>}
                            </div>
                        </button>
                    ))}
                </div>

                <div className="p-8 border-t border-white/5 bg-gray-950/40 flex flex-col gap-4">
                    <button 
                      onClick={startPresentation}
                      disabled={isSynthesizing}
                      className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-black py-4 px-10 rounded-2xl transition-all shadow-xl shadow-purple-600/20 uppercase tracking-widest text-[10px]"
                    >
                      {isSynthesizing ? 'Buffering Reel...' : 'Generate 180s Master Reel'}
                    </button>
                    <button 
                      onClick={() => { setSceneAudio({}); synthesizeFullKeynote(); }}
                      disabled={isSynthesizing}
                      className="text-[10px] font-black text-gray-600 hover:text-white flex items-center justify-center gap-2 uppercase transition-colors"
                    >
                        {ResetIcon} Full Cinematic Resync
                    </button>
                </div>
            </div>
          )}

          <div className="flex-grow flex flex-col bg-gray-950 relative">
            
            <div className="absolute top-10 left-10 z-50 flex items-center gap-6 pointer-events-none transition-all duration-700">
                <div className="bg-black/80 backdrop-blur-3xl border border-white/10 px-5 py-2.5 rounded-2xl flex items-center gap-5 shadow-2xl">
                    <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${isPresentationMode ? 'bg-red-500 animate-pulse' : 'bg-purple-500'}`}></div>
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{isPresentationMode ? 'KEYNOTE_BROADCAST' : 'CINEMA_STUDIO'}</span>
                    </div>
                    <div className="h-4 w-px bg-white/10"></div>
                    <span className="text-[10px] font-mono text-purple-400 uppercase tracking-tighter">T: {playbackTime.toFixed(1)}s</span>
                </div>
            </div>

            {!isPresentationMode && !isExportReady && (
                <button onClick={onClose} className="absolute top-10 right-10 z-50 text-gray-500 hover:text-white text-5xl leading-none transition-all hover:rotate-90">&times;</button>
            )}

            <div className={`flex-grow relative flex flex-col items-center justify-center transition-all duration-1000 ${isPresentationMode || isExportReady ? 'p-0' : 'p-20'}`}>
                
                <div className={`relative w-full aspect-video rounded-[3.5rem] overflow-hidden shadow-[0_60px_200px_rgba(0,0,0,1)] border border-white/5 bg-black transition-all duration-1000 ${isPresentationMode || isExportReady ? 'rounded-none scale-100' : 'scale-95'}`}>
                    
                    {STORYBOARD_SCENES.map((scene, idx) => (
                        <div 
                            key={idx}
                            className={`absolute inset-0 transition-opacity duration-1000 overflow-hidden ${activeScene === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <img 
                                src={scene.img}
                                className={`w-full h-full object-cover transition-transform ease-linear transform ${activeScene === idx ? 'duration-[11000ms] scale-150 translate-x-3 translate-y-3 rotate-1' : 'duration-[0ms] scale-100 translate-x-0'}`}
                                alt=""
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                        </div>
                    ))}

                    {isPresentationMode && (
                        <div className="absolute bottom-16 left-0 right-0 z-30 px-32 flex flex-col items-center pointer-events-none animate-fade-in">
                            
                            <div className="mb-10 flex items-center gap-6">
                                <div className="relative w-14 h-14">
                                    <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-30"></div>
                                    <div className="absolute inset-0 scale-75 bg-purple-400/20 rounded-full animate-ping delay-75"></div>
                                    <div className="absolute inset-0 bg-purple-600 rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(168,85,247,0.9)]">
                                        <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                                    </div>
                                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 h-8 w-1 bg-purple-400/40 rounded-full animate-pulse"></div>
                                    <div className="absolute -right-10 top-1/2 -translate-y-1/2 h-8 w-1 bg-purple-400/40 rounded-full animate-pulse delay-150"></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.5em] drop-shadow-2xl">CHARON_VO MASTER</span>
                                    <span className="text-[8px] font-mono text-gray-500 uppercase tracking-[0.3em]">DIRECT_STREAM_ACTIVE</span>
                                </div>
                            </div>

                            <div className="bg-black/80 backdrop-blur-3xl border border-white/5 rounded-3xl px-12 py-6 max-w-5xl text-center shadow-2xl transition-all duration-500 border-b-[6px] border-b-purple-600/80">
                                <p className="text-white text-lg md:text-xl lg:text-2xl font-serif italic drop-shadow-2xl leading-relaxed tracking-tight">
                                    "{STORYBOARD_SCENES[activeScene].narrator}"
                                </p>
                            </div>
                        </div>
                    )}

                    {isExportReady && (
                        <div className="absolute inset-0 bg-black/95 z-[200] flex flex-col items-center justify-center animate-fade-in-fast backdrop-blur-3xl">
                             <div className="w-36 h-36 bg-teal-500 rounded-full flex items-center justify-center mb-10 shadow-[0_0_80px_rgba(20,184,166,0.7)] animate-bounce">
                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                 </svg>
                             </div>
                             <h2 className="text-6xl font-black italic text-white tracking-tighter uppercase mb-2">Master Reel Finalized</h2>
                             <p className="text-teal-400 text-sm font-bold uppercase tracking-[0.6em] mb-16">180 SECONDS • 4K HIGH ENERGY BROADCAST</p>
                             
                             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl px-12">
                                 <button onClick={() => handleSocialShare('twitter')} className="bg-white/5 hover:bg-white/10 p-10 rounded-[3rem] border border-white/5 flex flex-col items-center group transition-all shadow-xl active:scale-95">
                                     <div className="text-teal-400 mb-5 group-hover:scale-110 transition-transform scale-150">{TwitterIcon}</div>
                                     <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">Post X</span>
                                 </button>
                                 <button onClick={() => handleSocialShare('whatsapp')} className="bg-white/5 hover:bg-white/10 p-10 rounded-[3rem] border border-white/5 flex flex-col items-center group transition-all shadow-xl active:scale-95">
                                     <div className="text-green-400 mb-5 group-hover:scale-110 transition-transform scale-150">{WhatsappIcon}</div>
                                     <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">WhatsApp</span>
                                 </button>
                                 <button onClick={() => handleCopyLink(`${window.location.origin}/reels/share_${Date.now()}`)} className="bg-white/5 hover:bg-white/10 p-10 rounded-[3rem] border border-white/5 flex flex-col items-center group transition-all shadow-xl active:scale-95">
                                     <div className="text-purple-400 mb-5 group-hover:scale-110 transition-transform scale-150">{CopyIcon}</div>
                                     <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">Copy URL</span>
                                 </button>
                                 <button onClick={stopPlayback} className="bg-white/5 hover:bg-white/10 p-10 rounded-[3rem] border border-white/5 flex flex-col items-center group transition-all shadow-xl active:scale-95">
                                     <div className="text-gray-400 mb-5 group-hover:scale-110 transition-transform scale-150">{ResetIcon}</div>
                                     <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">Remaster</span>
                                 </button>
                             </div>
                             
                             <button 
                                onClick={onClose}
                                className="mt-20 bg-purple-600 hover:bg-purple-500 text-white font-black py-7 px-20 rounded-full transition-all shadow-2xl active:scale-95 uppercase tracking-[0.4em] text-xs border border-white/10"
                             >
                                 Exit to Studio
                             </button>
                        </div>
                    )}

                    {isSynthesizing && (
                        <div className="absolute inset-0 bg-black/98 flex flex-col items-center justify-center z-[100] backdrop-blur-3xl animate-fade-in-fast">
                            <div className="relative">
                                <div className="w-56 h-56 border-[16px] border-t-purple-600 border-gray-900 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center scale-[3.0]">{VideoSparkIcon}</div>
                            </div>
                            <h3 className="text-white text-5xl font-black italic tracking-tighter mt-24 animate-pulse uppercase text-center">Building Your Sport Story</h3>
                            <div className="w-96 bg-gray-800 h-3 rounded-full mt-12 overflow-hidden border border-white/5 shadow-inner">
                                <div className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300 shadow-[0_0_25px_rgba(168,85,247,0.9)]" style={{ width: `${(synthesisProgress/TOTAL_SCENES)*100}%` }}></div>
                            </div>
                            <p className="text-gray-500 font-mono text-[13px] mt-8 tracking-[0.6em] uppercase text-center max-w-3xl px-12 leading-loose">
                                {errorLog ? <span className="text-amber-500 font-black animate-pulse">{errorLog}</span> : `HARMONIZING SCENE ${synthesisProgress} OF 20`}
                            </p>
                        </div>
                    )}
                    
                    {isPresentationMode && (
                        <div className="absolute bottom-0 left-0 right-0 h-5 bg-white/5 z-50 overflow-hidden">
                            <div 
                                className="h-full bg-gradient-to-r from-purple-600 via-teal-400 to-indigo-600 transition-all duration-100 shadow-[0_0_40px_rgba(168,85,247,1)]" 
                                style={{ width: `${currentProgressPercent}%` }}
                            ></div>
                        </div>
                    )}
                </div>

                {!isPresentationMode && !isExportReady && (
                    <div className="mt-14 w-full max-w-6xl grid grid-cols-2 gap-14 animate-fade-in-fast">
                         <div className="space-y-5">
                            <label className="text-[11px] font-black text-gray-500 uppercase tracking-[0.5em] px-3">Visual Directing Engine</label>
                            <div className="bg-gray-900/60 p-12 rounded-[3.5rem] border border-white/10 min-h-[180px] flex items-center shadow-inner relative overflow-hidden group">
                                <div className="absolute top-4 right-6 text-[9px] text-gray-700 font-bold uppercase tracking-widest">GEMINI_IMAGE_V3</div>
                                <p className="text-2xl text-gray-300 italic leading-relaxed">Preview: "{STORYBOARD_SCENES[activeScene].title}"</p>
                            </div>
                        </div>
                        <div className="space-y-5">
                            <label className="text-[11px] font-black text-gray-500 uppercase tracking-[0.5em] px-3">Master VO Stream</label>
                            <div className="bg-purple-950/20 p-12 rounded-[3.5rem] border border-purple-500/20 flex flex-col justify-between min-h-[180px] shadow-inner relative overflow-hidden">
                                <div className="absolute top-4 right-6 text-[9px] text-purple-900 font-bold uppercase tracking-widest">TTS_HI_FIDELITY</div>
                                <p className="text-2xl text-purple-100 font-serif leading-relaxed italic">"{STORYBOARD_SCENES[activeScene].narrator}"</p>
                                <div className="flex justify-between items-center mt-10 pt-8 border-t border-purple-500/10">
                                    <span className="text-[12px] font-black text-purple-400 uppercase flex items-center gap-4">
                                        <span className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></span> READY
                                    </span>
                                    <span className="text-[11px] font-mono text-gray-600 tracking-tighter">SLOT_PCM_0{activeScene+1}.raw</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {isPresentationMode && (
                <div className="fixed bottom-14 right-14 flex items-center gap-8 animate-fade-in-fast">
                    <button 
                        onClick={finishPresentation}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-3xl text-white font-black py-7 px-20 rounded-[2.5rem] border border-white/10 transition-all uppercase tracking-widest text-[12px] shadow-2xl active:scale-95"
                    >
                        Skip to Final Reel
                    </button>
                    <button 
                        onClick={stopPlayback}
                        className="bg-red-600/20 hover:bg-red-600/40 backdrop-blur-3xl text-red-500 font-black py-7 px-12 rounded-[2.5rem] border border-red-500/20 transition-all uppercase tracking-widest text-[12px] active:scale-95"
                    >
                        Abort
                    </button>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default VideoGeneratorModal;
