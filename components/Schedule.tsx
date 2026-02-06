
import React, { useState, useEffect } from 'react';
import type { StreamingProvider } from '../types';

interface ScheduleProps {
    providers: StreamingProvider[];
    subscriptions: number[];
    onToggleSubscription: (providerId: number) => void;
}

const Schedule: React.FC<ScheduleProps> = ({ providers, subscriptions, onToggleSubscription }) => {
    const scheduledProviders = providers
      .filter(provider => provider.scheduledStream)
      .sort((a, b) => a.scheduledStream!.startTime.getTime() - b.scheduledStream!.startTime.getTime());

    if (scheduledProviders.length === 0) {
        return (
            <div className="p-4 text-center text-gray-400">
                <p>No upcoming streams scheduled.</p>
                <p className="text-sm">Check back later!</p>
            </div>
        );
    }
    
    return (
        <div className="flex-grow space-y-2">
            <h3 className="text-lg font-semibold mb-2 px-1 text-teal-400">Upcoming Streams</h3>
            {scheduledProviders.map(provider => (
                <ScheduleCard 
                    key={provider.id}
                    provider={provider}
                    isSubscribed={subscriptions.includes(provider.id)}
                    onToggleSubscription={() => onToggleSubscription(provider.id)}
                />
            ))}
        </div>
    );
};

interface ScheduleCardProps {
    provider: StreamingProvider;
    isSubscribed: boolean;
    onToggleSubscription: () => void;
}

const CountdownTimer: React.FC<{targetDate: Date}> = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState(targetDate.getTime() - Date.now());

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setTimeout(() => {
            setTimeLeft(targetDate.getTime() - Date.now());
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, targetDate]);

    if (timeLeft <= 0) {
        return <span className="font-bold text-red-500">LIVE NOW</span>;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return (
        <span className="font-mono tracking-wider">
            {days > 0 && `${days}d `}
            {hours > 0 && `${String(hours).padStart(2, '0')}:`}
            {`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
        </span>
    );
};

const ScheduleCard: React.FC<ScheduleCardProps> = ({ provider, isSubscribed, onToggleSubscription }) => {
    if (!provider.scheduledStream) return null;

    return (
        <div className="bg-gray-700/50 p-3 rounded-lg">
            <div className="flex items-center mb-2">
                <img src={provider.logoUrl} alt={provider.name} className="w-10 h-10 rounded-md mr-3 bg-white p-1 flex-shrink-0"/>
                <div className="overflow-hidden">
                    <p className="font-semibold text-white truncate">{provider.scheduledStream.title}</p>
                    <p className="text-sm text-gray-400 truncate">{provider.name}</p>
                </div>
            </div>
            <p className="text-xs text-gray-300 mb-3">{provider.scheduledStream.description}</p>
            <div className="flex items-center justify-between">
                <div className="text-sm text-teal-400">
                    <CountdownTimer targetDate={provider.scheduledStream.startTime} />
                </div>
                <button
                    onClick={onToggleSubscription}
                    className={`flex items-center text-xs font-bold py-1 px-3 rounded-md transition-colors ${
                        isSubscribed 
                        ? 'bg-teal-500 text-white' 
                        : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                    }`}
                >
                    <div className="w-4 h-4 mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                           <path d="M10 2a6 6 0 00-6 6v3.586l-1.707 1.707A1 1 0 003.586 15h12.828a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                    </div>
                    {isSubscribed ? 'Subscribed' : 'Notify Me'}
                </button>
            </div>
        </div>
    );
};


export default Schedule;
