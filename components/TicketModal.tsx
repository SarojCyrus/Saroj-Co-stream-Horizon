
import React, { useState, useEffect } from 'react';
import { TicketIcon } from '../constants';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  eventTitle: string;
  organizer: string;
  price: number;
}

const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose, onConfirm, eventTitle, organizer, price }) => {
  const [step, setStep] = useState<'details' | 'processing' | 'success'>('details');

  useEffect(() => {
    if (isOpen) {
      setStep('details');
    }
  }, [isOpen]);

  const handlePurchase = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[70] animate-fade-in-fast"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 border border-purple-500/50 rounded-xl max-w-md w-full m-4 overflow-hidden relative shadow-2xl shadow-purple-900/20"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold">&times;</button>

        {step === 'details' && (
          <div className="p-8">
            <div className="flex items-center mb-4 text-purple-400">
                {TicketIcon} <span className="font-bold text-sm uppercase tracking-wider ml-2">Creator Event Pass</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{eventTitle}</h2>
            <p className="text-sm text-gray-400 mb-6">Organized by <span className="text-white font-semibold">{organizer}</span></p>

            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 mb-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Ticket Price</span>
                    <span className="text-xl font-bold text-white">${price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500 border-t border-gray-700 pt-2 mt-2">
                    <span>Platform Fee (Included)</span>
                    <span>$0.00</span>
                </div>
                <div className="mt-4 text-xs text-purple-300 bg-purple-900/30 p-2 rounded border border-purple-500/20">
                    ★ 50% of this ticket goes directly to the creator.
                </div>
            </div>

            <div className="flex space-x-3">
                <button 
                    onClick={onClose}
                    className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-lg transition-colors"
                >
                    Cancel
                </button>
                <button 
                    onClick={handlePurchase}
                    className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors shadow-lg shadow-purple-600/20"
                >
                    Purchase Access
                </button>
            </div>
          </div>
        )}

        {step === 'processing' && (
            <div className="p-12 text-center">
                <div className="w-16 h-16 border-4 border-gray-700 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-white mb-2">Processing Payment...</h3>
                <p className="text-gray-400 text-sm">Verifying availability with {organizer}.</p>
            </div>
        )}

        {step === 'success' && (
             <div className="p-12 text-center animate-fade-in-fast">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Ticket Confirmed!</h3>
                <p className="text-gray-400 mb-6 text-sm">Your access pass for <span className="text-white">{eventTitle}</span> is ready.</p>
                <button 
                    onClick={onConfirm}
                    className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-8 rounded-lg transition-colors w-full"
                >
                    Enter Event
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default TicketModal;
