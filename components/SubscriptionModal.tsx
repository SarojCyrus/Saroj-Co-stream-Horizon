
import React, { useState, useEffect } from 'react';
import { CheckIcon } from '../constants';

export type PlanType = 'General' | 'VIP' | 'Individual' | 'Team' | 'Trial' | null;

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  planType: PlanType;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, planType }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [duration, setDuration] = useState('1 Month');
  const [email, setEmail] = useState('');
  
  // Reset state when opening
  useEffect(() => {
      if (isOpen) {
          setStep('form');
          setDuration('1 Month');
          setEmail('');
      }
  }, [isOpen, planType]);

  if (!isOpen || !planType) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    // Simulate API call
    setTimeout(() => {
        setStep('success');
    }, 2000);
  };

  const getPlanDetails = () => {
      switch(planType) {
          case 'General': 
            return { 
                title: 'General Viewer Pass', 
                desc: 'Standard access to live streams.',
                price: duration === '12 Months' ? '$450' : duration === '6 Months' ? '$120' : duration === '3 Months' ? '$50' : '$10',
                color: 'text-white', 
                buttonColor: 'bg-teal-500 hover:bg-teal-600',
                hasDuration: true
            };
          case 'VIP': 
            return { 
                title: 'VIP Viewer Access', 
                desc: 'Premium access with AI Director & VR.',
                price: duration === '12 Months' ? '$1,350' : duration === '6 Months' ? '$360' : duration === '3 Months' ? '$150' : '$30',
                color: 'text-yellow-400', 
                buttonColor: 'bg-yellow-500 hover:bg-yellow-600 text-black',
                hasDuration: true
            };
          case 'Individual': 
            return { 
                title: 'Individual Broadcaster', 
                desc: 'License to stream and earn revenue.',
                price: '$450 / year',
                color: 'text-cyan-400', 
                buttonColor: 'bg-cyan-600 hover:bg-cyan-500',
                hasDuration: false
            };
          case 'Team': 
            return { 
                title: 'Professional Team Plan', 
                desc: 'Enterprise tools for 20+ members.',
                price: '$4,500 / year',
                color: 'text-cyan-400', 
                buttonColor: 'bg-cyan-500 hover:bg-cyan-400 text-black',
                hasDuration: false
            };
          case 'Trial':
            return {
                title: '7-Day Free Trial',
                desc: 'Full access to Co-Stream Horizon.',
                price: '$0.00',
                color: 'text-teal-400',
                buttonColor: 'bg-teal-500 hover:bg-teal-600',
                hasDuration: false
            };
          default: 
            return { title: '', desc: '', price: '', color: '', buttonColor: '', hasDuration: false };
      }
  };

  const details = getPlanDetails();

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] animate-fade-in-fast"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 border border-gray-700 rounded-xl max-w-md w-full m-4 overflow-hidden relative shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold">&times;</button>

        {step === 'form' && (
            <form onSubmit={handleSubscribe} className="p-8">
                <h2 className={`text-2xl font-bold mb-1 ${details.color}`}>{details.title}</h2>
                <p className="text-gray-400 text-sm mb-6">{details.desc}</p>

                {details.hasDuration && (
                    <div className="mb-4">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Duration</label>
                        <select 
                            value={duration} 
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
                        >
                            <option value="1 Month">1 Month Pass</option>
                            <option value="3 Months">3 Month Pass</option>
                            <option value="6 Months">6 Month Pass</option>
                            <option value="12 Months">12 Month Pass</option>
                        </select>
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
                    <input 
                        type="email" 
                        required 
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                </div>
                
                {planType !== 'Trial' && (
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Card Details (Simulated)</label>
                        <div className="flex space-x-2">
                            <input 
                                type="text" 
                                placeholder="0000 0000 0000 0000"
                                className="flex-grow bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
                                readOnly
                            />
                            <input 
                                type="text" 
                                placeholder="MM/YY"
                                className="w-24 bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
                                readOnly
                            />
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <span className="text-gray-400 font-semibold">Total Due:</span>
                    <span className={`text-xl font-bold ${details.color}`}>{details.price}</span>
                </div>

                <button 
                    type="submit"
                    className={`w-full py-3 rounded-lg font-bold transition-transform transform hover:scale-105 ${details.buttonColor}`}
                >
                    {planType === 'Trial' ? 'Start Free Trial' : 'Confirm & Pay'}
                </button>
            </form>
        )}

        {step === 'processing' && (
            <div className="p-12 text-center">
                <div className="w-16 h-16 border-4 border-gray-700 border-t-teal-500 rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-white mb-2">Processing...</h3>
                <p className="text-gray-400">Securing your spot in the stadium.</p>
            </div>
        )}

        {step === 'success' && (
             <div className="p-12 text-center animate-fade-in-fast">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">You're In!</h3>
                <p className="text-gray-400 mb-6">Your subscription to <span className={details.color}>{details.title}</span> is active.</p>
                <button 
                    onClick={onClose}
                    className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                >
                    Close
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionModal;
