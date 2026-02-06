import React, { useState, useEffect } from 'react';
import { EVENTS_DATABASE, ArrowLeftIcon, LocationMarkerIcon, SPORT_CATEGORIES } from '../constants';
import type { SportCategory, EventConfig } from '../types';
import TicketModal from './TicketModal';

interface LobbyProps {
  onJoinEvent: (eventId: string) => void;
  onBack: () => void;
}

const Lobby: React.FC<LobbyProps> = ({ onJoinEvent, onBack }) => {
  const featuredEvent = EVENTS_DATABASE[0];
  const [eventFilter, setEventFilter] = useState<'ALL' | 'LIVE' | 'UPCOMING'>('ALL');
  const [selectedTicketEvent, setSelectedTicketEvent] = useState<EventConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    setCurrentPage(1);
  }, [eventFilter]);

  const handleCategoryClick = (category: SportCategory) => {
    const event = EVENTS_DATABASE.find(e => e.details.category === category);
    if (event) handleEventClick(event);
  };

  const handleEventClick = (event: EventConfig) => {
    if (event.details.isCreatorEvent && event.details.ticketPrice) {
      setSelectedTicketEvent(event);
    } else {
      onJoinEvent(event.id);
    }
  };

  const getFilteredEvents = () => {
    const allEvents = EVENTS_DATABASE.slice(1);
    if (eventFilter === 'ALL') return allEvents;
    if (eventFilter === 'LIVE') return allEvents.filter(e => e.details.status === 'Live');
    if (eventFilter === 'UPCOMING') return allEvents.filter(e => e.details.status === 'Upcoming');
    return allEvents;
  };

  const filteredEvents = getFilteredEvents();
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const currentEvents = filteredEvents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const formatStartTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { weekday: 'short', hour: 'numeric', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans animate-portal">
      {/* Header with Spatial Blur */}
      <header className="glass-morphism border-b border-white/5 p-4 sticky top-0 z-50 backdrop-blur-3xl">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-gradient-to-br from-teal-400 to-teal-600 text-black font-black rounded-xl px-2.5 py-1 mr-4 text-xl shadow-lg shadow-teal-500/20">CS</div>
            <h1 className="text-xl font-black tracking-tighter">costreamhorizon<span className="text-teal-400">.live</span></h1>
          </div>
          <button onClick={onBack} className="flex items-center text-xs font-bold text-gray-500 hover:text-white transition-all uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl hover:bg-white/10 border border-white/5">
            <span className="mr-2 opacity-50">{ArrowLeftIcon}</span> <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 pb-32">
        {/* Featured Section: The "Hero Panel" */}
        <section className="mb-20">
          <div className="flex items-center mb-6">
            <span className="bg-teal-500/10 text-teal-400 text-[10px] font-black px-3 py-1 rounded-full border border-teal-500/20 tracking-widest uppercase">Global Premiere</span>
          </div>
          <div 
            className="relative rounded-[2.5rem] overflow-hidden bg-gray-900 border border-white/5 shadow-2xl group cursor-pointer spatial-float hologram-glow transition-all duration-700 hover:scale-[1.01]" 
            onClick={() => onJoinEvent(featuredEvent.id)}
          >
             <div className="absolute inset-0">
                <img 
                    src="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Stadium" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 blur-[2px] group-hover:blur-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
             </div>

             <div className="relative p-8 md:p-16 flex flex-col md:flex-row justify-between items-end md:items-center">
                <div className="max-w-2xl">
                    <div className="flex items-center space-x-3 mb-6">
                        <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-lg animate-pulse shadow-lg shadow-red-600/30">LIVE NOW</span>
                        <div className="h-4 w-px bg-white/20"></div>
                        <span className="text-teal-400 text-[10px] font-black uppercase tracking-widest">1,240,580 Viewers</span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black text-white mb-4 tracking-tighter leading-[0.85]">{featuredEvent.details.title}</h2>
                    <p className="text-xl md:text-2xl text-gray-400 mb-8 font-semibold tracking-tight">{featuredEvent.details.match}</p>
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        <span className="flex items-center bg-white/5 px-4 py-2 rounded-xl border border-white/5">{LocationMarkerIcon} {featuredEvent.details.stadium}</span>
                        <span className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 text-teal-400">{featuredEvent.details.category}</span>
                    </div>
                </div>
                <div className="mt-12 md:mt-0 relative group">
                  <div className="absolute -inset-4 bg-teal-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <button className="relative bg-teal-500 hover:bg-teal-400 text-black font-black py-6 px-14 rounded-3xl shadow-2xl shadow-teal-500/40 transition-all transform group-hover:scale-105 active:scale-95 uppercase tracking-[0.2em] text-sm">
                      Enter Stadium
                  </button>
                </div>
             </div>
          </div>
        </section>

        {/* Discovery Dock: Categories */}
        <section className="mb-20">
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-8 text-center">Discovery Modules</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2">
                {SPORT_CATEGORIES.map(cat => (
                    <button 
                        key={cat} 
                        onClick={() => handleCategoryClick(cat)}
                        className="glass-morphism hover:bg-white/10 text-white font-bold p-8 rounded-3xl transition-all border border-white/5 group text-center relative overflow-hidden"
                    >
                        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-teal-400/5 rounded-full blur-xl group-hover:bg-teal-400/20 transition-all"></div>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-black group-hover:text-teal-400 transition-colors">{cat}</p>
                    </button>
                ))}
            </div>
        </section>

        {/* Live Feeds Grid: The "Gallery of Realities" */}
        <section>
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
             <div className="flex flex-col">
                <h3 className="text-3xl font-black text-white tracking-tighter">Live Ingests</h3>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Direct feeds from the field</p>
             </div>
             <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
                 {['ALL', 'LIVE', 'UPCOMING'].map(f => (
                     <button 
                        key={f}
                        onClick={() => setEventFilter(f as any)}
                        className={`px-8 py-2.5 rounded-xl text-[10px] font-black tracking-[0.2em] transition-all ${eventFilter === f ? 'bg-white text-black shadow-xl shadow-white/10' : 'text-gray-500 hover:text-white'}`}
                     >
                         {f}
                     </button>
                 ))}
             </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {currentEvents.map(event => (
                <div 
                  key={event.id} 
                  className={`glass-morphism rounded-[2.5rem] overflow-hidden border transition-all duration-500 group cursor-pointer hover:hologram-glow hover:-translate-y-2 flex flex-col ${event.details.isCreatorEvent ? 'border-purple-500/30' : 'border-white/5'}`}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="h-64 relative overflow-hidden">
                      <img 
                          src={
                              event.details.category === 'Motorsport' ? "https://images.pexels.com/photos/12795/pexels-photo-12795.jpeg?auto=compress&cs=tinysrgb&w=800" :
                              event.details.category === 'Court Sport' ? "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800" :
                              event.details.category === 'Combat Sport' ? "https://images.pexels.com/photos/4761785/pexels-photo-4761785.jpeg?auto=compress&cs=tinysrgb&w=800" :
                              event.details.category === 'Action Sport' ? "https://images.pexels.com/photos/8408269/pexels-photo-8408269.jpeg?auto=compress&cs=tinysrgb&w=800" :
                              event.details.category === 'Esports' ? "https://images.pexels.com/photos/7862594/pexels-photo-7862594.jpeg?auto=compress&cs=tinysrgb&w=800" :
                              "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800" 
                          } 
                          alt={event.details.title} 
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-50 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute top-6 left-6 flex gap-2">
                        {event.details.isCreatorEvent && <span className="bg-purple-600 text-white text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-lg shadow-purple-600/30">Private</span>}
                        {event.details.status === 'Live' && <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest animate-pulse shadow-lg shadow-red-600/30">Live</span>}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  </div>
                  <div className="p-8 flex-grow flex flex-col">
                      <h4 className="text-3xl font-black text-white mb-2 tracking-tighter leading-none">{event.details.title}</h4>
                      <p className="text-sm text-gray-500 mb-8 font-bold uppercase tracking-widest">{event.details.match}</p>

                      <div className="mt-auto flex justify-between items-center">
                          <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                            {event.details.status === 'Upcoming' ? formatStartTime(event.details.startTime) : 'Active Feed'}
                          </span>
                          <button 
                            className={`text-[10px] font-black uppercase tracking-[0.2em] px-8 py-3.5 rounded-2xl transition-all shadow-xl ${
                                event.details.isCreatorEvent 
                                ? 'bg-purple-600 text-white shadow-purple-600/20' 
                                : 'bg-white/5 border border-white/10 group-hover:bg-teal-500 group-hover:text-black group-hover:shadow-teal-500/20 text-white'
                            }`}
                          >
                              {event.details.isCreatorEvent ? `Tickets $${event.details.ticketPrice}` : 'Connect'}
                          </button>
                      </div>
                  </div>
                </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center space-x-6">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 disabled:opacity-30 transition-all"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <span className="text-xs font-black tracking-widest text-gray-500">PAGE <span className="text-white">{currentPage}</span> / {totalPages}</span>
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 disabled:opacity-30 transition-all"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
          )}
        </section>
      </main>

      {/* Horizon Dock: Spatial navigation for Mobile */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md">
        <div className="glass-morphism rounded-3xl p-2 flex justify-around items-center border border-white/10 backdrop-blur-3xl shadow-2xl">
          <button className="flex flex-col items-center p-3 text-teal-400 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-[8px] font-black uppercase tracking-widest">Home</span>
          </button>
          <button className="flex flex-col items-center p-3 text-gray-500 hover:text-white transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span className="text-[8px] font-black uppercase tracking-widest">Search</span>
          </button>
          <button className="flex flex-col items-center p-3 text-gray-500 hover:text-white transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-[8px] font-black uppercase tracking-widest">Recents</span>
          </button>
          <button className="flex flex-col items-center p-3 text-gray-500 hover:text-white transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="text-[8px] font-black uppercase tracking-widest">Profile</span>
          </button>
        </div>
      </div>

      {selectedTicketEvent && (
        <TicketModal 
          isOpen={!!selectedTicketEvent}
          onClose={() => setSelectedTicketEvent(null)}
          onConfirm={() => {
            onJoinEvent(selectedTicketEvent.id);
            setSelectedTicketEvent(null);
          }}
          eventTitle={selectedTicketEvent.details.title}
          organizer={selectedTicketEvent.details.organizer || "Community Organizer"}
          price={selectedTicketEvent.details.ticketPrice || 0}
        />
      )}
    </div>
  );
};

export default Lobby;