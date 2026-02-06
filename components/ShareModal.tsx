
import React, { useState, useEffect } from 'react';
import { CopyIcon, CheckIcon, TwitterIcon, FacebookIcon, WhatsappIcon, ScissorsIcon, ShareIcon } from '../constants';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'event' | 'clip' | null;
  providerName?: string;
  streamUrl?: string;
  angleName?: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, type, providerName, streamUrl, angleName }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isGeneratingClip, setIsGeneratingClip] = useState(false);
  const [clipProgress, setClipProgress] = useState(0);

  useEffect(() => {
    if (isOpen && type === 'clip') {
      setIsGeneratingClip(true);
      setClipProgress(0);
      const interval = setInterval(() => {
        setClipProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsGeneratingClip(false);
            return 100;
          }
          return prev + 5; // Simulate progress
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isOpen, type]);

  if (!isOpen) return null;

  const shareUrl = `https://co-stream-horizon.app/live/event-123${type === 'clip' ? `?provider=${encodeURIComponent(providerName || '')}&highlight=true` : ''}`;
  
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-fast"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-md m-4 border border-gray-700 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
          <div className="flex items-center space-x-2">
             <div className={`p-2 rounded-lg ${type === 'clip' ? 'bg-pink-500/20 text-pink-500' : 'bg-teal-500/20 text-teal-500'}`}>
                {type === 'clip' ? ScissorsIcon : ShareIcon}
             </div>
             <h2 className="text-xl font-bold text-white">{type === 'clip' ? 'Share Highlight' : 'Share Event'}</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-2xl leading-none">&times;</button>
        </div>

        {/* Clip Generation State */}
        {type === 'clip' && isGeneratingClip && (
           <div className="mb-6 text-center py-4">
               <p className="text-pink-400 font-bold mb-2 animate-pulse">Capturing Moment...</p>
               <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-pink-500 h-2.5 rounded-full transition-all duration-100" style={{ width: `${clipProgress}%` }}></div>
               </div>
               <p className="text-xs text-gray-500 mt-2">grabbing last 30 seconds from buffer</p>
           </div>
        )}

        {/* Content */}
        {(!isGeneratingClip || type === 'event') && (
            <div className="space-y-6 animate-fade-in-fast">
                {type === 'clip' && (
                    <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-gray-600 group cursor-pointer shadow-lg">
                        {streamUrl && (
                            <video 
                                src={streamUrl} 
                                className="w-full h-full object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-40" 
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center">
                             <div className="bg-pink-500 rounded-full p-3 shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white ml-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                             </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded font-mono border border-gray-700">00:30</div>
                        <div className="absolute top-2 left-2 bg-pink-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            {providerName} • {angleName}
                        </div>
                    </div>
                )}

                <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
                    <label className="block text-xs font-bold text-gray-400 mb-1 uppercase">Share Link</label>
                    <div className="flex items-center space-x-2">
                        <input 
                            type="text" 
                            readOnly 
                            value={shareUrl} 
                            className="bg-gray-900 text-gray-300 text-sm rounded px-3 py-2 w-full focus:outline-none border border-transparent focus:border-teal-500 transition-colors"
                            onClick={(e) => e.currentTarget.select()}
                        />
                        <button 
                            onClick={handleCopy}
                            className={`p-2 rounded-lg transition-all duration-200 flex-shrink-0 ${isCopied ? 'bg-green-500 text-white' : 'bg-gray-600 hover:bg-gray-500 text-gray-200'}`}
                            title="Copy to Clipboard"
                        >
                            {isCopied ? CheckIcon : CopyIcon}
                        </button>
                    </div>
                </div>
                
                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Share via</label>
                    <div className="grid grid-cols-3 gap-3">
                        <button className="flex items-center justify-center space-x-2 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] py-2 rounded-lg transition-colors border border-[#1DA1F2]/20">
                            {TwitterIcon} <span className="font-bold text-sm">Post</span>
                        </button>
                        <button className="flex items-center justify-center space-x-2 bg-[#4267B2]/10 hover:bg-[#4267B2]/20 text-[#4267B2] py-2 rounded-lg transition-colors border border-[#4267B2]/20">
                            {FacebookIcon} <span className="font-bold text-sm">Share</span>
                        </button>
                        <button className="flex items-center justify-center space-x-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] py-2 rounded-lg transition-colors border border-[#25D366]/20">
                            {WhatsappIcon} <span className="font-bold text-sm">Send</span>
                        </button>
                    </div>
                </div>
            </div>
        )}
        
        {/* Footer text */}
         {type === 'clip' && !isGeneratingClip && (
             <p className="text-center text-xs text-gray-500 mt-4">Clip generated from {providerName} • {angleName}</p>
         )}
         {type === 'event' && (
             <p className="text-center text-xs text-gray-500 mt-4">Invite friends to join the event stream.</p>
         )}
      </div>
    </div>
  );
};

export default ShareModal;
