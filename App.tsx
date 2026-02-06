
import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import StreamingExperience from './components/StreamingExperience';
import Lobby from './components/Lobby';
import BroadcasterDashboard from './components/BroadcasterDashboard';
import CookieManager from './components/CookieManager';
import LoginModal from './components/LoginModal';
import { EVENTS_DATABASE } from './constants';
import { authService } from './services/AuthService';
import type { EventConfig, UserProfile } from './types';

type AppView = 'landing' | 'lobby' | 'broadcaster_dashboard' | 'streaming';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('landing');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  
  // Track the currently selected event data
  const [selectedEvent, setSelectedEvent] = useState<EventConfig>(EVENTS_DATABASE[0]);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleStartApp = () => {
    // Instead of going straight to Lobby, open Login
    if (currentUser) {
       routeUser(currentUser);
    } else {
       setIsLoginModalOpen(true);
    }
  };

  const routeUser = (user: UserProfile) => {
      setIsFadingOut(true);
      setTimeout(() => {
        if (user.role.includes('broadcaster')) {
            setView('broadcaster_dashboard');
        } else {
            setView('lobby');
        }
        setIsFadingOut(false);
      }, 500);
  };

  const handleLoginSuccess = () => {
      const user = authService.getCurrentUser();
      if (user) routeUser(user);
  };

  const handleJoinEvent = (eventId: string) => {
    const event = EVENTS_DATABASE.find(e => e.id === eventId);
    if (event) {
        setSelectedEvent(event);
        setView('streaming');
    }
  };

  const handleExitStreaming = () => {
    setView('lobby');
  };

  const handleLogout = async () => {
    await authService.logout();
    setView('landing');
    setIsFadingOut(false);
  };

  return (
    <>
      {/* Global Cookie Manager */}
      <CookieManager 
        isSettingsOpen={isCookieSettingsOpen} 
        onOpenSettings={() => setIsCookieSettingsOpen(true)}
        onCloseSettings={() => setIsCookieSettingsOpen(false)}
      />

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {view === 'landing' && (
        <LandingPage 
            onStart={handleStartApp} 
            isFadingOut={isFadingOut} 
            onOpenCookieSettings={() => setIsCookieSettingsOpen(true)}
            user={currentUser}
        />
      )}
      
      {view === 'lobby' && (
        <Lobby onJoinEvent={handleJoinEvent} onBack={handleLogout} />
      )}

      {view === 'broadcaster_dashboard' && currentUser && (
          <BroadcasterDashboard user={currentUser} onLogout={handleLogout} />
      )}

      {view === 'streaming' && (
        <StreamingExperience onExit={handleExitStreaming} eventConfig={selectedEvent} />
      )}
    </>
  );
};

export default App;
