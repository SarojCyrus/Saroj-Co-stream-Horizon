
import React, { useState } from 'react';
import { ArrowLeftIcon, TicketIcon, SupportIcon, CalendarIcon, PlusIcon, CurrencyIcon, CheckIcon, VideoSparkIcon, TechIcon } from '../constants';
import type { UserProfile, SportCategory } from '../types';
import VideoGeneratorModal from './VideoGeneratorModal';
import InfrastructurePanel from './InfrastructurePanel';
import DeviceScannerModal from './DeviceScannerModal';

interface BroadcasterDashboardProps {
  user: UserProfile;
  onLogout: () => void;
}

const BroadcasterDashboard: React.FC<BroadcasterDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'studio' | 'infra'>('studio');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isDeviceVerified, setIsDeviceVerified] = useState(false);
  const [lastScanTime, setLastScanTime] = useState<string | null>(null);
  
  const [eventForm, setEventForm] = useState({
      title: '',
      date: '',
      category: 'Action Sport' as SportCategory,
      price: 10
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCreateEvent = (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setTimeout(() => {
          setIsSubmitting(false);
          setShowSuccess(true);
          setTimeout(() => {
              setShowSuccess(false);
              setIsCreateModalOpen(false);
              setEventForm({ title: '', date: '', category: 'Action Sport', price: 10 });
          }, 2000);
      }, 1500);
  };

  const handleScanComplete = (success: boolean) => {
      setIsDeviceVerified(success);
      if(success) {
          setLastScanTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
      }
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans animate-fade-in-fast">
      <header className="glass-morphism border-b border-white/5 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-purple-600 text-white font-black rounded-xl px-2.5 py-1 mr-4 text-xl shadow-lg shadow-purple-500/20">CS</div>
            <h1 className="text-xl font-black tracking-tighter">Creator Studio <span className="text-gray-500 font-normal ml-2 opacity-50">| {user.role === 'broadcaster_team' ? 'Team' : 'Individual'}</span></h1>
          </div>
          <div className="flex items-center space-x-6">
             <div className="text-right hidden md:block">
                 <p className="text-xs font-black text-white uppercase tracking-widest">{user.displayName}</p>
                 <p className="text-[10px] text-green-400 font-bold">Balance: ${user.balance?.toFixed(2)}</p>
             </div>
             <img src={user.avatarUrl} alt="Profile" className="w-10 h-10 rounded-full border-2 border-purple-500/50 shadow-lg" />
             <button 
                onClick={onLogout}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
            >
                {ArrowLeftIcon}
            </button>
          </div>
        </div>
      </header>

      {/* Internal Navigation */}
      <nav className="border-b border-white/5 bg-gray-900/20">
          <div className="container mx-auto flex px-6">
              <button 
                onClick={() => setActiveTab('studio')}
                className={`py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] border-b-2 transition-all ${activeTab === 'studio' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-500 hover:text-white'}`}
              >
                  Studio Home
              </button>
              <button 
                onClick={() => setActiveTab('infra')}
                className={`py-4 px-6 text-[10px] font-black uppercase tracking-[0.2em] border-b-2 transition-all ${activeTab === 'infra' ? 'border-teal-500 text-teal-400' : 'border-transparent text-gray-500 hover:text-white'}`}
              >
                  Infrastructure & Data Plane
              </button>
          </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        {activeTab === 'studio' ? (
            <>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    {/* Quick Stats */}
                    <div className="glass-morphism p-8 rounded-[2rem] border border-white/5">
                        <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Total Earnings</h3>
                        <p className="text-4xl font-black text-white tracking-tighter">${user.balance?.toLocaleString()}</p>
                        <p className="text-[10px] text-green-400 font-bold mt-2">+12% from last cycle</p>
                    </div>
                    <div className="glass-morphism p-8 rounded-[2rem] border border-white/5">
                        <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Active Viewers</h3>
                        <p className="text-4xl font-black text-white tracking-tighter">142,502</p>
                        <p className="text-[10px] text-gray-500 font-bold mt-2">Peak: 1.2M during Final</p>
                    </div>
                    <div className="glass-morphism p-8 rounded-[2rem] border border-white/5">
                        <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">Data Ingest Status</h3>
                        <div className="flex items-center text-teal-400 font-black text-xl tracking-tighter">
                            <span className="w-2 h-2 rounded-full bg-teal-500 mr-3 animate-pulse shadow-[0_0_10px_rgba(20,184,166,0.8)]"></span>
                            PROVISIONED
                        </div>
                        <p className="text-[10px] text-gray-500 font-bold mt-2">Kafka Topic: live-event-stream-01</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Actions */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="relative rounded-[2.5rem] p-10 overflow-hidden bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/20 group">
                            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                <svg className="w-32 h-32 text-purple-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                            </div>
                            <div className="relative z-10 max-w-md">
                                <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">Initialize Horizon Premiere</h2>
                                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Broadcast to the global audience. Our AI Director will automatically aggregate your team's angles via Confluent Kafka.</p>
                                <button 
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="bg-purple-600 hover:bg-purple-500 text-white font-black py-4 px-10 rounded-2xl transition-all shadow-xl shadow-purple-600/20 flex items-center uppercase tracking-widest text-[10px]"
                                >
                                    {TicketIcon} <span className="ml-3">Draft Premiere Event</span>
                                </button>
                            </div>
                        </div>

                        <div className="glass-morphism rounded-[2.5rem] p-10 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
                            <div>
                                <div className="flex items-center mb-3">
                                    <h2 className="text-2xl font-black text-white tracking-tighter">AI Content Studio</h2>
                                    <span className="ml-4 bg-teal-500/10 text-teal-400 text-[8px] font-black px-2 py-0.5 rounded-lg border border-teal-500/20 tracking-widest">VE-3 READY</span>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed max-w-sm">Generate cinematic promo reels directly from your stream highlights using high-performance synthesis.</p>
                            </div>
                            <button 
                                onClick={() => setIsVideoModalOpen(true)}
                                className="bg-white/5 hover:bg-white/10 text-white font-black py-4 px-8 rounded-2xl transition-all border border-white/10 flex items-center uppercase tracking-widest text-[10px] shadow-2xl"
                            >
                                {VideoSparkIcon} <span className="ml-3">Open Keynote Generator</span>
                            </button>
                        </div>
                    </div>

                    {/* Sidebar Tools */}
                    <div className="space-y-8">
                        {/* Device Verification Card - Redesigned */}
                        <div className={`p-8 rounded-[2rem] border transition-all duration-500 overflow-hidden relative ${isDeviceVerified ? 'bg-gradient-to-br from-green-900/30 to-black border-green-500/40 shadow-[0_0_30px_rgba(34,197,94,0.1)]' : 'bg-gradient-to-br from-red-900/20 to-black border-red-500/30'}`}>
                            {/* Background Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] -mr-16 -mt-16 pointer-events-none"></div>
                            
                            <div className="relative z-10">
                                <h3 className="text-sm font-black text-white mb-4 uppercase tracking-widest flex items-center justify-between">
                                    Device Integrity
                                    <span className={`flex items-center justify-center w-6 h-6 rounded-full border ${isDeviceVerified ? 'border-green-500 text-green-500 bg-green-500/20' : 'border-red-500 text-red-500 bg-red-500/20 animate-pulse'}`}>
                                        {isDeviceVerified ? CheckIcon : '!'}
                                    </span>
                                </h3>
                                
                                {isDeviceVerified ? (
                                    <div className="animate-fade-in-fast">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Sentinel Active</p>
                                                <p className="text-[9px] text-gray-500 font-mono">Last Scan: {lastScanTime}</p>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-400 leading-relaxed mb-6">Device certified for 4K ingest. Anti-cheat heuristics actively monitoring stream telemetry.</p>
                                        <button 
                                            onClick={() => setIsScannerOpen(true)}
                                            className="w-full py-3 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest border border-green-500/20 transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                                        >
                                            View Report
                                        </button>
                                    </div>
                                ) : (
                                    <div className="animate-fade-in-fast">
                                        <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest mb-4 flex items-center">
                                            <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-ping"></span> Action Required
                                        </p>
                                        <p className="text-xs text-gray-400 leading-relaxed mb-6">
                                            Your broadcast node is unverified. Stream quality may be capped at 720p until security checks pass.
                                        </p>
                                        <button 
                                            onClick={() => setIsScannerOpen(true)}
                                            className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-[10px] font-black uppercase tracking-[0.1em] shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all animate-pulse hover:animate-none"
                                        >
                                            Initiate Scan
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="glass-morphism p-8 rounded-[2rem] border border-white/5">
                            <h3 className="text-sm font-black text-white mb-6 uppercase tracking-widest flex items-center">
                                <span className="text-purple-400 mr-3">{SupportIcon}</span> Resources
                            </h3>
                            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gray-700 mr-3"></span> OBS / Kafka Plugin</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gray-700 mr-3"></span> Telemetry SDK v4.2</a></li>
                                <li><a href="#" className="hover:text-purple-400 transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-gray-700 mr-3"></span> Asset Portal</a></li>
                            </ul>
                        </div>
                        
                        <div className="glass-morphism p-8 rounded-[2rem] border border-white/5 relative overflow-hidden group">
                             <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/10 transition-all"></div>
                             <h3 className="text-[10px] font-black text-teal-400 uppercase tracking-widest mb-4">Edge Health</h3>
                             <p className="text-xs text-gray-400 leading-relaxed mb-6">Global propagation is currently at <span className="text-white font-bold">100%</span>. All Namecheap records are healthy.</p>
                             <button onClick={() => setActiveTab('infra')} className="text-teal-400 text-[10px] font-black hover:underline tracking-widest">MANAGE DNS →</button>
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <InfrastructurePanel />
        )}
      </main>

      {/* Modals */}
      {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-2xl flex items-center justify-center z-[100] animate-fade-in-fast" onClick={() => setIsCreateModalOpen(false)}>
              <div className="glass-morphism border border-white/10 rounded-[3rem] max-w-lg w-full m-4 p-10 shadow-2xl" onClick={e => e.stopPropagation()}>
                  {showSuccess ? (
                      <div className="text-center py-10">
                          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/20">
                              {CheckIcon}
                          </div>
                          <h2 className="text-3xl font-black text-white mb-3 tracking-tighter">Stream Logic Dispatched</h2>
                          <p className="text-gray-500 text-sm font-medium">Your event parameters have been written to the Kafka orchestration layer.</p>
                      </div>
                  ) : (
                      <form onSubmit={handleCreateEvent}>
                          <div className="flex justify-between items-center mb-8">
                              <h2 className="text-2xl font-black text-white tracking-tighter text-teal-400">Initialize Event Feed</h2>
                              <button type="button" onClick={() => setIsCreateModalOpen(false)} className="text-gray-500 hover:text-white text-3xl leading-none">&times;</button>
                          </div>
                          
                          <div className="space-y-6">
                              <div>
                                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Event Descriptor</label>
                                  <input 
                                      type="text" 
                                      required
                                      className="w-full bg-white/5 border border-white/10 text-white rounded-2xl p-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                      placeholder="e.g. Monaco Grand Prix Premiere"
                                      value={eventForm.title}
                                      onChange={e => setEventForm({...eventForm, title: e.target.value})}
                                  />
                              </div>
                              
                              <div className="grid grid-cols-2 gap-6">
                                  <div>
                                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Ingest Date</label>
                                      <input 
                                          type="date" 
                                          required
                                          className="w-full bg-white/5 border border-white/10 text-white rounded-2xl p-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                          value={eventForm.date}
                                          onChange={e => setEventForm({...eventForm, date: e.target.value})}
                                      />
                                  </div>
                                  <div>
                                      <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Sport Category</label>
                                      <select 
                                          className="w-full bg-white/5 border border-white/10 text-white rounded-2xl p-4 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                                          value={eventForm.category}
                                          onChange={e => setEventForm({...eventForm, category: e.target.value as SportCategory})}
                                      >
                                          <option value="Action Sport">Action Sport</option>
                                          <option value="Motorsport">Motorsport</option>
                                          <option value="Esports">Esports</option>
                                      </select>
                                  </div>
                              </div>

                              <div>
                                  <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Ticket Valuation ($)</label>
                                  <div className="relative">
                                      <input 
                                          type="number" 
                                          min="0"
                                          step="0.50"
                                          required
                                          className="w-full bg-white/5 border border-white/10 text-white rounded-2xl p-4 pl-10 focus:ring-2 focus:ring-purple-500 outline-none transition-all font-bold"
                                          value={eventForm.price}
                                          onChange={e => setEventForm({...eventForm, price: parseFloat(e.target.value)})}
                                      />
                                  </div>
                                  <p className="text-[10px] text-purple-400 font-bold mt-2">ESTIMATED YIELD: ${((eventForm.price || 0) * 0.5).toFixed(2)} per seat.</p>
                              </div>
                          </div>

                          <div className="mt-10 flex gap-4">
                              <button 
                                  type="button"
                                  onClick={() => setIsCreateModalOpen(false)}
                                  className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-gray-400 font-bold rounded-2xl transition-all"
                              >
                                  Discard
                              </button>
                              <button 
                                  type="submit"
                                  disabled={isSubmitting}
                                  className="flex-1 py-4 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-purple-600/20 uppercase tracking-widest text-[10px]"
                              >
                                  {isSubmitting ? 'Syncing...' : 'Provision Event'}
                              </button>
                          </div>
                      </form>
                  )}
              </div>
          </div>
      )}

      {/* Video Generator Modal */}
      <VideoGeneratorModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />

      {/* Device Scanner Modal */}
      <DeviceScannerModal 
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanComplete={handleScanComplete}
      />
    </div>
  );
};

export default BroadcasterDashboard;
