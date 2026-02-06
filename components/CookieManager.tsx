
import React, { useState, useEffect } from 'react';
import { CookieIcon, CheckIcon } from '../constants';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true, // Always true
  analytics: true,
  functional: true,
  marketing: false,
};

interface CookieManagerProps {
    isSettingsOpen: boolean;
    onOpenSettings: () => void;
    onCloseSettings: () => void;
}

const CookieManager: React.FC<CookieManagerProps> = ({ isSettingsOpen, onOpenSettings, onCloseSettings }) => {
    const [hasConsented, setHasConsented] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
    const [tempPreferences, setTempPreferences] = useState<CookiePreferences>(DEFAULT_PREFERENCES);
    const [showBanner, setShowBanner] = useState(false);
  
    useEffect(() => {
      const storedConsent = localStorage.getItem('co_stream_cookie_consent');
      if (storedConsent) {
        setHasConsented(true);
        setPreferences(JSON.parse(storedConsent));
        setTempPreferences(JSON.parse(storedConsent));
      } else {
        // Delay banner slightly for better UX
        const timer = setTimeout(() => setShowBanner(true), 1000);
        return () => clearTimeout(timer);
      }
    }, []);
  
    const savePreferences = (prefs: CookiePreferences) => {
      localStorage.setItem('co_stream_cookie_consent', JSON.stringify(prefs));
      setPreferences(prefs);
      setHasConsented(true);
      setShowBanner(false);
      onCloseSettings();
    };
    
    // Sync temp prefs when modal opens
    useEffect(() => {
        if(isSettingsOpen) setTempPreferences(preferences);
    }, [isSettingsOpen, preferences]);

    const handleToggle = (key: keyof CookiePreferences) => {
        if (key === 'essential') return;
        setTempPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <>
            {/* Banner */}
            {!hasConsented && showBanner && !isSettingsOpen && (
                <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in-fast">
                    <div className="max-w-6xl mx-auto bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center mb-2">
                                <div className="text-teal-400 mr-2">{CookieIcon}</div>
                                <h3 className="text-lg font-bold text-white">Privacy Preference Center</h3>
                            </div>
                            <p className="text-sm text-gray-300">
                                We use cookies to optimize site functionality, analyze performance, and ensure you get the best co-streaming experience. 
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={onOpenSettings}
                                className="px-4 py-2 border border-gray-600 hover:bg-gray-800 text-gray-300 rounded-lg text-sm font-bold transition-colors"
                            >
                                Manage Preferences
                            </button>
                            <button 
                                onClick={() => savePreferences({ essential: true, analytics: true, functional: true, marketing: true })}
                                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg text-sm transition-colors"
                            >
                                Accept All
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal */}
            {isSettingsOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] animate-fade-in-fast" onClick={onCloseSettings}>
                    <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-2xl w-full m-4 p-0 shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white flex items-center">
                                {CookieIcon} <span className="ml-2">Cookie Preferences</span>
                            </h2>
                            <button onClick={onCloseSettings} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                        </div>
                        
                        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
                            <p className="text-sm text-gray-400">
                                Customize your cookie preferences below. Essential cookies are required for the website to function properly and cannot be disabled.
                            </p>

                            {/* Essential */}
                            <div className="flex items-start justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                <div>
                                    <div className="flex items-center mb-1">
                                        <h4 className="font-bold text-white">Essential Cookies</h4>
                                        <span className="ml-2 text-[10px] bg-teal-500/20 text-teal-400 px-2 py-0.5 rounded border border-teal-500/30">REQUIRED</span>
                                    </div>
                                    <p className="text-xs text-gray-400">Necessary for authentication, security, and ensuring the platform works.</p>
                                </div>
                                <div className="relative inline-flex items-center cursor-not-allowed opacity-50">
                                    <input type="checkbox" checked={true} readOnly className="sr-only peer" />
                                    <div className="w-11 h-6 bg-teal-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-teal-800"></div>
                                    <div className="absolute top-0.5 left-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-all translate-x-full border-white"></div>
                                </div>
                            </div>

                            {/* Analytics */}
                            <div className="flex items-start justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                <div>
                                    <h4 className="font-bold text-white mb-1">Performance & Analytics</h4>
                                    <p className="text-xs text-gray-400">Help us understand how you use the site so we can improve streaming latency and UI.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={tempPreferences.analytics} 
                                        onChange={() => handleToggle('analytics')}
                                        className="sr-only peer" 
                                    />
                                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                                </label>
                            </div>

                            {/* Functional */}
                            <div className="flex items-start justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                <div>
                                    <h4 className="font-bold text-white mb-1">Functional Cookies</h4>
                                    <p className="text-xs text-gray-400">Enable advanced features like personalized layouts, VR settings retention, and region selection.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={tempPreferences.functional} 
                                        onChange={() => handleToggle('functional')}
                                        className="sr-only peer" 
                                    />
                                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                                </label>
                            </div>

                            {/* Marketing */}
                            <div className="flex items-start justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                                <div>
                                    <h4 className="font-bold text-white mb-1">Marketing Cookies</h4>
                                    <p className="text-xs text-gray-400">Used to deliver relevant sports promotions and measure campaign performance.</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={tempPreferences.marketing} 
                                        onChange={() => handleToggle('marketing')}
                                        className="sr-only peer" 
                                    />
                                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                                </label>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-700 bg-gray-800 flex justify-end gap-3">
                            <button 
                                onClick={onCloseSettings}
                                className="px-6 py-2 border border-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={() => savePreferences(tempPreferences)}
                                className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition-colors flex items-center"
                            >
                                {CheckIcon} <span className="ml-2">Save Preferences</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CookieManager;
