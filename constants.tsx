
import type { EventConfig, ChatMessage, CameraAngle, SportCategory, StreamingProvider, EventDetails } from './types';
import React from 'react';

export const SPORT_CATEGORIES: SportCategory[] = [
  'Field Sport',
  'Court Sport',
  'Motorsport',
  'Combat Sport',
  'Action Sport',
  'Esports'
];

// --- ICONS ---
export const ArrowLeftIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

export const ChevronLeftIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

export const ChevronRightIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);

export const EyeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
  </svg>
);

export const FollowersIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0115 11a5 5 0 015 5v2H1a1 1 0 01-1-1v-4a1 1 0 011-1 5 5 0 014-2.83A6.97 6.97 0 005 16a6.97 6.97 0 00-1.5-4.33A5 5 0 017 11a5 5 0 015 5v2h2.93z" />
  </svg>
);

export const CameraIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H4zm10 3a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

export const DroneIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2.5a.5.5 0 01.5.5v3.165a5.522 5.522 0 012.221.72l1.962-.98a.5.5 0 01.69.447l.5 2.5a.5.5 0 01-.152.53L14.5 10l1.221 1.118a.5.5 0 01.152.53l-.5 2.5a.5.5 0 01-.69.447l-1.962-.98a5.522 5.522 0 01-2.221.72V17a.5.5 0 01-1 0v-3.165a5.522 5.522 0 01-2.221-.72l-1.962.98a.5.5 0 01-.69-.447l-.5-2.5a.5.5 0 01.152-.53L5.5 10 4.279 8.882a.5.5 0 01-.152-.53l.5-2.5a.5.5 0 01.69-.447l1.962.98A5.522 5.522 0 019.5 6.165V3a.5.5 0 01.5-.5zM10 8a2 2 0 100 4 2 2 0 000 4z" />
    </svg>
);

export const ArGlassIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a8 8 0 00-8 8c0 2.21 1.79 4 4 4h1v1a1 1 0 001.707.707l3.586-3.586A1 1 0 0012 11.5V10a4 4 0 118 0v.01a1 1 0 00.993.883A1.001 1.001 0 0020 10a8 8 0 00-8-8h-2zM4 10a2 2 0 114 0 2 2 0 01-4 0zm10.5 1.5a1 1 0 01-1.414-1.414L14.5 8.672a3.985 3.985 0 01-2.083.778 4 4 0 110-2.9A3.985 3.985 0 0114.5 7.328l-1.414-1.414a1 1 0 011.414-1.414L16 6.086V10c0 .828.672 1.5 1.5 1.5z" clipRule="evenodd" />
  </svg>
);

export const VrHeadsetIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2a1 1 0 001 1h6a1 1 0 001-1V6a4 4 0 00-4-4zM6 6v2h8V6a2 2 0 00-2-2H8a2 2 0 00-2 2z" clipRule="evenodd" />
    <path d="M3 10a1 1 0 011-1h12a1 1 0 011 1v1a4 4 0 01-4 4H8a4 4 0 01-4-4v-1zM8 13a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);

export const BatteryIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0h10v10H5V5zm8 1a1 1 0 011-1h.5a1 1 0 011 1v.5a1 1 0 01-1 1h-.5a1 1 0 01-1-1V6z" clipRule="evenodd" />
    </svg>
);

export const AiIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379-1.561 2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
  </svg>
);

export const VipIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.332a.5.5 0 00.724.447l1.794-.9a1 1 0 011.352 1.352l-.9 1.794a.5.5 0 00.447.724H16a1 1 0 110 2h-1.332a.5.5 0 00-.447.724l.9 1.794a1 1 0 01-1.352 1.352l-1.794-.9a.5.5 0 00-.724.447V17a1 1 0 11-2 0v-1.332a.5.5 0 00-.724-.447l-1.794.9a1 1 0 01-1.352-1.352l.9-1.794a.5.5 0 00-.447-.724H4a1 1 0 110-2h1.332a.5.5 0 00.447-.724l-.9-1.794a1 1 0 011.352-1.352l1.794.9a.5.5 0 00.724-.447V3a1 1 0 011-1zm0 5a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd" />
  </svg>
);

export const LocationMarkerIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline text-teal-400" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 20l-4.95-6.05a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  </svg>
);

export const LiveIcon = (
    <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
    </span>
);

export const ResetIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm1 14a1 1 0 011-1h3.001a5.002 5.002 0 004.001-7.899 1 1 0 111.885-.666A7.002 7.002 0 015.899 15.899V18a1 1 0 11-2 0v-5a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

export const SettingsIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const BellIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

export const ShareIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
    </svg>
);

export const ScissorsIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.5 2a3.5 3.5 0 101.665 6.58L8.585 10l-1.42 1.42a3.5 3.5 0 101.414 1.414l8.128-8.127a1 1 0 00-1.414-1.414L10 8.586l-1.42-1.42A3.5 3.5 0 005.5 2zM4 5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 9a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
        <path d="M12.828 11.414a1 1 0 010 1.415l-3.293 3.292a1 1 0 01-1.414-1.414l3.293-3.293a1 1 0 011.414 0z" />
    </svg>
);

export const CopyIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
    </svg>
);

export const CheckIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

export const TwitterIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export const FacebookIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
    </svg>
);

export const WhatsappIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M18.403 5.633A8.919 8.919 0 0012.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 004.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 00-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 01-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 01-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 015.275 2.188 7.42 7.42 0 012.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112-.15.224-.587.731-.718.881-.131.15-.262.169-.486.056-.224-.113-.945-.348-1.801-1.113-.667-.593-1.117-1.329-1.248-1.553-.131-.225-.014-.347.099-.458.1-.1.224-.261.336-.393.112-.131.149-.224.224-.374.075-.149.037-.28-.019-.393-.056-.113-.504-1.217-.69-1.666-.181-.435-.366-.377-.504-.383-.13-.006-.28-.006-.429-.006-.15 0-.393.056-.6.28-.206.225-.787.769-.787 1.876 0 1.106.805 2.174.917 2.324.112.15 1.586 2.415 3.832 3.387.534.231.951.37 1.279.474.55.176 1.051.151 1.448.092.44-.066 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.066-.056-.094-.206-.15-.43-.263" clipRule="evenodd" />
    </svg>
);

export const PipIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z"/>
  </svg>
);

export const CookieIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887.454 3.665 1.257 5.234a.5.5 0 01.444.276l.504 1.008a1 1 0 00.896.552h3.915a1 1 0 00.894-.553l.505-1.01a.5.5 0 01.447-.275A6 6 0 0010 2zm0 8a1 1 0 100-2 1 1 0 000 2zm-2-2a1 1 0 100-2 1 1 0 000 2zm2 5a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
  </svg>
);

export const ExpandIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
    </svg>
);

export const TicketIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
    </svg>
);

export const GiftIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clipRule="evenodd" />
        <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
    </svg>
);

export const MultiStreamIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);

export const VrIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2a1 1 0 001 1h6a1 1 0 001-1V6a4 4 0 00-4-4zM6 6v2h8V6a2 2 0 00-2-2H8a2 2 0 00-2 2z" clipRule="evenodd" />
      <path d="M3 10a1 1 0 011-1h12a1 1 0 011 1v1a4 4 0 01-4 4H8a4 4 0 01-4-4v-1zM8 13a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
);

export const ChatAiIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 16v-2m4.95-12.95l-1.414 1.414M5.464 18.536l-1.414-1.414m12.95-.001l-1.414-1.414M5.464 5.464L4.05 4.05" />
    </svg>
);

export const UserIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

export const SupportIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

export const BillIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

export const TechIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

export const GuidelinesIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

export const ContentIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
);

export const HardwareIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
);

export const CalendarIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

export const PlusIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

export const CurrencyIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const VideoSparkIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.414.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 11l.5.5L9.5 12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4l-1 3 3 1-3 1 1 3-3-1-1 3-1-3-3-1 3-1-1-3 3 1 1-3z" />
    </svg>
);

export const EVENT_DETAILS: EventDetails = {
  title: 'Premier League LIVE',
  match: 'Liverpool vs. Manchester United',
  stadium: 'Wembley Stadium',
  category: 'Field Sport',
  status: 'Live',
  startTime: new Date()
};

export const STREAMING_PROVIDERS: StreamingProvider[] = [
  {
    id: 0,
    name: 'Principal AI Director',
    location: 'Master Control Room',
    logoUrl: 'https://ui-avatars.com/api/?name=AI&background=EAB308&color=000',
    streamUrl: 'https://videos.pexels.com/video-files/3621104/3621104-hd_1920_1080_25fps.mp4', // Main Feed (Placeholder)
    viewers: 98750,
    followers: 1250000,
    mapPosition: { x: 50, y: 35 },
    description: 'VIP ACCESS: The master AI feed curated from all available angles for the ultimate viewing experience.',
    streamerCount: 0,
    narrator: 'AI Commentary',
    hasSubtitles: true,
    batteryLevel: 100,
    deviceType: 'Platform',
    providerType: 'Team',
    cameraAngles: [] // Populated dynamically
  },
  {
    id: 1,
    name: 'The Kop Cams',
    location: 'Home End - Upper Tier',
    logoUrl: 'https://ui-avatars.com/api/?name=The+Kop&background=0D8ABC&color=fff',
    streamUrl: 'https://videos.pexels.com/video-files/3621104/3621104-hd_1920_1080_25fps.mp4',
    viewers: 12340,
    followers: 185800,
    mapPosition: { x: 90, y: 35 },
    description: 'Die-hard fan view from the heart of the stand.',
    streamerCount: 25,
    narrator: 'Steve McManaman',
    hasSubtitles: true,
    batteryLevel: 95,
    deviceType: 'Mobile',
    providerType: 'Team',
    scheduledStream: {
        title: 'Post-Match Fan Reactions',
        startTime: new Date(Date.now() + 7200000), // +2 hours
        description: 'Live interviews with fans outside the stadium.'
    },
    cameraAngles: [
        { id: 101, name: 'Wide Fan View', url: 'https://videos.pexels.com/video-files/3621104/3621104-hd_1920_1080_25fps.mp4' },
        { id: 102, name: 'Chant Cam', url: 'https://videos.pexels.com/video-files/8147333/8147333-hd_1920_1080_25fps.mp4' },
        { id: 103, name: 'Goal Line Zoom', url: 'https://videos.pexels.com/video-files/4621926/4621926-uhd_2560_1440_25fps.mp4' },
        { id: 4, name: 'Drone View', url: 'https://videos.pexels.com/video-files/2871909/2871909-hd_1920_1080_24fps.mp4' }, // Shared Drone
    ]
  },
  {
    id: 2,
    name: 'Red Devils TV',
    location: 'Away End - Fan Zone',
    logoUrl: 'https://ui-avatars.com/api/?name=Red+Devils&background=ef4444&color=fff',
    streamUrl: 'https://videos.pexels.com/video-files/8147333/8147333-hd_1920_1080_25fps.mp4',
    viewers: 10550,
    followers: 158900,
    mapPosition: { x: 10, y: 35 },
    description: 'Passionate commentary from the away end.',
    streamerCount: 22,
    narrator: 'Gary Neville (Fan Cast)',
    hasSubtitles: false,
    batteryLevel: 88,
    deviceType: 'Mobile',
    providerType: 'Team',
    cameraAngles: [
        { id: 201, name: 'Away Stand', url: 'https://videos.pexels.com/video-files/8147333/8147333-hd_1920_1080_25fps.mp4' },
        { id: 202, name: 'Pitch Level', url: 'https://videos.pexels.com/video-files/3621104/3621104-hd_1920_1080_25fps.mp4' },
        { id: 4, name: 'Drone View', url: 'https://videos.pexels.com/video-files/2871909/2871909-hd_1920_1080_24fps.mp4' }, // Shared Drone
    ]
  },
  {
    id: 3,
    name: 'Pitchside Pundits',
    location: 'Sideline - East Stand',
    logoUrl: 'https://ui-avatars.com/api/?name=Pitchside&background=10b981&color=fff',
    streamUrl: 'https://videos.pexels.com/video-files/4621926/4621926-uhd_2560_1440_25fps.mp4',
    viewers: 8900,
    followers: 92000,
    mapPosition: { x: 50, y: 85 },
    description: 'Tactical analysis and close-up player cams.',
    streamerCount: 15,
    narrator: 'Tactical Tim',
    hasSubtitles: true,
    batteryLevel: 42,
    deviceType: 'Mobile',
    providerType: 'Team',
    cameraAngles: [
        { id: 301, name: 'Tactical Wide', url: 'https://videos.pexels.com/video-files/4621926/4621926-uhd_2560_1440_25fps.mp4' },
        { id: 302, name: 'Manager Cam', url: 'https://videos.pexels.com/video-files/8147333/8147333-hd_1920_1080_25fps.mp4' },
        { id: 4, name: 'Drone View', url: 'https://videos.pexels.com/video-files/2871909/2871909-hd_1920_1080_24fps.mp4' }, // Shared Drone
    ]
  },
  {
    id: 4,
    name: 'Drone Division',
    location: 'Aerial Coverage',
    logoUrl: 'https://ui-avatars.com/api/?name=Drone&background=6366f1&color=fff',
    streamUrl: 'https://videos.pexels.com/video-files/2871909/2871909-hd_1920_1080_24fps.mp4',
    viewers: 15000,
    followers: 9000,
    mapPosition: { x: 50, y: 50 },
    description: 'Tactical Top-Down',
    streamerCount: 5,
    narrator: 'Pilot 1',
    hasSubtitles: false,
    batteryLevel: 88,
    deviceType: 'Drone',
    providerType: 'Team',
    cameraAngles: [
        { id: 401, name: 'High Altitude', url: 'https://videos.pexels.com/video-files/2871909/2871909-hd_1920_1080_24fps.mp4' },
        { id: 402, name: 'Low Tracking', url: 'https://videos.pexels.com/video-files/3621104/3621104-hd_1920_1080_25fps.mp4' },
    ]
  },
  {
    id: 5,
    name: 'VR Experience',
    location: 'VIP Box',
    logoUrl: 'https://ui-avatars.com/api/?name=VR&background=8b5cf6&color=fff',
    streamUrl: 'https://videos.pexels.com/video-files/3621104/3621104-hd_1920_1080_25fps.mp4',
    viewers: 5000,
    followers: 2000,
    mapPosition: { x: 50, y: 10 },
    description: 'Immersive 180',
    streamerCount: 1,
    narrator: 'None',
    hasSubtitles: false,
    batteryLevel: 100,
    deviceType: 'VR/MR',
    providerType: 'Individual',
    cameraAngles: [
        { id: 501, name: 'VR Box Seat', url: 'https://videos.pexels.com/video-files/3621104/3621104-hd_1920_1080_25fps.mp4' },
    ]
  },
  {
    id: 6,
    name: 'AR Ref Cam',
    location: 'Pitch Level',
    logoUrl: 'https://ui-avatars.com/api/?name=Ref&background=ec4899&color=fff',
    streamUrl: 'https://videos.pexels.com/video-files/4621926/4621926-uhd_2560_1440_25fps.mp4',
    viewers: 8000,
    followers: 12000,
    mapPosition: { x: 70, y: 70 },
    description: 'Ref POV',
    streamerCount: 1,
    narrator: 'Ref Mic',
    hasSubtitles: false,
    batteryLevel: 75,
    deviceType: 'AR',
    providerType: 'Individual',
    cameraAngles: [
        { id: 601, name: 'Ref BodyCam', url: 'https://videos.pexels.com/video-files/4621926/4621926-uhd_2560_1440_25fps.mp4' },
    ]
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  { user: 'StreamBot', message: 'Welcome to the Co-Stream Horizon!', timestamp: new Date(), reactions: { '👋': 5 } },
];

// --- Motorsport Providers ---
const MOTORSPORT_PROVIDERS: StreamingProvider[] = [
    { ...STREAMING_PROVIDERS[0], name: 'Principal AI Director', description: 'VIP ACCESS: Race Control Feed', streamUrl: 'https://videos.pexels.com/video-files/7242150/7242150-hd_1920_1080_24fps.mp4' }, // F1 AI
    {
        id: 7,
        name: 'Max VER - Cockpit',
        location: 'Car #1',
        logoUrl: 'https://ui-avatars.com/api/?name=MV&background=1e3a8a&color=fff',
        streamUrl: 'https://videos.pexels.com/video-files/7242150/7242150-hd_1920_1080_24fps.mp4',
        viewers: 85000,
        followers: 1200000,
        mapPosition: { x: 30, y: 60 },
        description: 'Driver POV & Telemetry',
        streamerCount: 3,
        narrator: 'Team Radio',
        hasSubtitles: true,
        batteryLevel: 100,
        deviceType: 'Mobile',
        providerType: 'Individual',
        cameraAngles: [
            { id: 701, name: 'T-Cam', url: 'https://videos.pexels.com/video-files/7242150/7242150-hd_1920_1080_24fps.mp4' },
            { id: 702, name: 'Helmet Cam', url: 'https://videos.pexels.com/video-files/7242150/7242150-hd_1920_1080_24fps.mp4' },
        ]
    },
    {
        id: 8,
        name: 'Turn 6 Fan Cam',
        location: 'Grandstand B',
        logoUrl: 'https://ui-avatars.com/api/?name=T6&background=f97316&color=fff',
        streamUrl: 'https://videos.pexels.com/video-files/6329835/6329835-hd_1920_1080_25fps.mp4',
        viewers: 4000,
        followers: 1000,
        mapPosition: { x: 80, y: 20 },
        description: 'Fan view of the hairpin',
        streamerCount: 10,
        narrator: 'Fan',
        hasSubtitles: false,
        batteryLevel: 60,
        deviceType: 'Mobile',
        providerType: 'Team',
        cameraAngles: [
            { id: 801, name: 'Grandstand', url: 'https://videos.pexels.com/video-files/6329835/6329835-hd_1920_1080_25fps.mp4' }
        ]
    },
    {
        id: 9,
        name: 'Heli-Cam 1',
        location: 'Aerial',
        logoUrl: 'https://ui-avatars.com/api/?name=H1&background=64748b&color=fff',
        streamUrl: 'https://videos.pexels.com/video-files/6329835/6329835-hd_1920_1080_25fps.mp4',
        viewers: 12000,
        followers: 5000,
        mapPosition: { x: 50, y: 50 },
        description: 'Cinematic Overhead',
        streamerCount: 1,
        narrator: 'None',
        hasSubtitles: false,
        batteryLevel: 100,
        deviceType: 'Drone',
        providerType: 'Individual',
        cameraAngles: [
            { id: 901, name: 'Cineflex', url: 'https://videos.pexels.com/video-files/6329835/6329835-hd_1920_1080_25fps.mp4' }
        ]
    }
];

// --- Combat Sports Providers ---
const COMBAT_PROVIDERS: StreamingProvider[] = [
    { ...STREAMING_PROVIDERS[0], name: 'Principal AI Director', description: 'VIP ACCESS: Octagon Control', streamUrl: 'https://videos.pexels.com/video-files/8064311/8064311-hd_1920_1080_25fps.mp4' },
    {
        id: 10,
        name: 'Ref Cam Live',
        location: 'In-Ring',
        logoUrl: 'https://ui-avatars.com/api/?name=RC&background=000000&color=fff',
        streamUrl: 'https://videos.pexels.com/video-files/8064311/8064311-hd_1920_1080_25fps.mp4',
        viewers: 45000,
        followers: 20000,
        mapPosition: { x: 50, y: 50 },
        description: 'Referee Bodycam POV',
        streamerCount: 1,
        narrator: 'Live Mic',
        hasSubtitles: false,
        batteryLevel: 90,
        deviceType: 'AR',
        providerType: 'Individual',
        cameraAngles: [{ id: 1001, name: 'Ref Body', url: 'https://videos.pexels.com/video-files/8064311/8064311-hd_1920_1080_25fps.mp4' }]
    },
    {
        id: 11,
        name: 'Red Corner Cam',
        location: 'Red Corner',
        logoUrl: 'https://ui-avatars.com/api/?name=RD&background=dc2626&color=fff',
        streamUrl: 'https://videos.pexels.com/video-files/4761785/4761785-hd_1920_1080_25fps.mp4',
        viewers: 12000,
        followers: 5000,
        mapPosition: { x: 20, y: 20 },
        description: 'Coach & Fighter Cam',
        streamerCount: 2,
        narrator: 'Coach',
        hasSubtitles: true,
        batteryLevel: 100,
        deviceType: 'Mobile',
        providerType: 'Team',
        cameraAngles: [{ id: 1101, name: 'Corner View', url: 'https://videos.pexels.com/video-files/4761785/4761785-hd_1920_1080_25fps.mp4' }]
    },
    {
        id: 12,
        name: 'Blue Corner Cam',
        location: 'Blue Corner',
        logoUrl: 'https://ui-avatars.com/api/?name=BL&background=2563eb&color=fff',
        streamUrl: 'https://videos.pexels.com/video-files/4761785/4761785-hd_1920_1080_25fps.mp4',
        viewers: 11500,
        followers: 4800,
        mapPosition: { x: 80, y: 80 },
        description: 'Coach & Fighter Cam',
        streamerCount: 2,
        narrator: 'Coach',
        hasSubtitles: true,
        batteryLevel: 100,
        deviceType: 'Mobile',
        providerType: 'Team',
        cameraAngles: [{ id: 1201, name: 'Corner View', url: 'https://videos.pexels.com/video-files/4761785/4761785-hd_1920_1080_25fps.mp4' }]
    }
];

// --- Action Sports Providers (UPDATED) ---
const ACTION_PROVIDERS: StreamingProvider[] = [
    { ...STREAMING_PROVIDERS[0], name: 'Principal AI Director', description: 'VIP ACCESS: Summit Overview', streamUrl: 'https://videos.pexels.com/video-files/856172/856172-hd_1920_1080_30fps.mp4' },
    {
        id: 13,
        name: 'Andrzej Bargiel (Helmet)',
        location: 'Khumbu Icefall',
        logoUrl: 'https://ui-avatars.com/api/?name=AB&background=eab308&color=fff',
        streamUrl: 'https://videos.pexels.com/video-files/856172/856172-hd_1920_1080_30fps.mp4', // Skiing in snow
        viewers: 125000,
        followers: 500000,
        mapPosition: { x: 40, y: 30 },
        description: 'First descent without O2',
        streamerCount: 1,
        narrator: 'Andrzej',
        hasSubtitles: false,
        batteryLevel: 65,
        deviceType: 'Mobile',
        providerType: 'Individual',
        cameraAngles: [{ id: 1301, name: 'GoPro Hero 10', url: 'https://videos.pexels.com/video-files/856172/856172-hd_1920_1080_30fps.mp4' }]
    },
    {
        id: 14,
        name: 'Drone Pilot: Bartek',
        location: 'Base Camp Control',
        logoUrl: 'https://ui-avatars.com/api/?name=BB&background=14b8a6&color=fff',
        streamUrl: 'https://videos.pexels.com/video-files/856172/856172-hd_1920_1080_30fps.mp4',
        viewers: 95000,
        followers: 120000,
        mapPosition: { x: 45, y: 35 },
        description: 'Guiding through the Icefall',
        streamerCount: 1,
        narrator: 'Bartek (Radio)',
        hasSubtitles: true,
        batteryLevel: 40,
        deviceType: 'Drone',
        providerType: 'Individual',
        cameraAngles: [{ id: 1401, name: 'Mavic 3 Cine', url: 'https://videos.pexels.com/video-files/856172/856172-hd_1920_1080_30fps.mp4' }]
    }
];

// --- Esports Providers ---
const ESPORTS_PROVIDERS: StreamingProvider[] = [
    { ...STREAMING_PROVIDERS[0], name: 'Principal AI Director', description: 'VIP ACCESS: Observer Feed', streamUrl: 'https://videos.pexels.com/video-files/7862594/7862594-hd_1920_1080_30fps.mp4' },
    {
        id: 15,
        name: 'Mid Lane Player',
        location: 'Player Booth',
        logoUrl: 'https://ui-avatars.com/api/?name=ML&background=7c3aed&color=fff',
        streamUrl: 'https://videos.pexels.com/video-files/7543885/7543885-hd_1920_1080_30fps.mp4',
        viewers: 35000,
        followers: 150000,
        mapPosition: { x: 50, y: 50 },
        description: 'Player Screen & Facecam',
        streamerCount: 1,
        narrator: 'Player Mic',
        hasSubtitles: false,
        batteryLevel: 100,
        deviceType: 'Mobile',
        providerType: 'Individual',
        cameraAngles: [{ id: 1501, name: 'Screen', url: 'https://videos.pexels.com/video-files/7543885/7543885-hd_1920_1080_30fps.mp4' }]
    }
];

export const EVENTS_DATABASE: EventConfig[] = [
  {
    id: 'event-001',
    details: EVENT_DETAILS, // Field Sport (Football)
    providers: STREAMING_PROVIDERS
  },
  {
    id: 'event-002',
    details: {
      title: 'Formula 1 Grand Prix',
      match: 'Monaco GP - Race Day',
      stadium: 'Circuit de Monaco',
      category: 'Motorsport',
      status: 'Live',
      startTime: new Date()
    },
    providers: MOTORSPORT_PROVIDERS
  },
  {
    id: 'event-003',
    details: {
      title: 'NBA Finals Game 4',
      match: 'Lakers vs. Warriors',
      stadium: 'Crypto.com Arena',
      category: 'Court Sport',
      status: 'Live',
      startTime: new Date()
    },
    providers: STREAMING_PROVIDERS // Using default for now, would customize
  },
  {
    id: 'event-004',
    details: {
      title: 'UFC 300',
      match: 'McGregor vs. Chandler',
      stadium: 'T-Mobile Arena',
      category: 'Combat Sport',
      status: 'Live',
      startTime: new Date(Date.now() + 86400000) // Tomorrow
    },
    providers: COMBAT_PROVIDERS
  },
  {
    id: 'event-005',
    details: {
      title: 'Everest Ski Descent',
      match: 'History Made: First Descent',
      stadium: 'Mount Everest, Nepal',
      category: 'Action Sport',
      status: 'Live',
      startTime: new Date()
    },
    providers: ACTION_PROVIDERS
  },
  {
    id: 'event-006',
    details: {
      title: 'LoL World Championship',
      match: 'T1 vs. JDG',
      stadium: 'Gocheok Sky Dome',
      category: 'Esports',
      status: 'Live',
      startTime: new Date()
    },
    providers: ESPORTS_PROVIDERS
  },
  // --- Creator Event ---
  {
      id: 'event-creator-001',
      details: {
          title: 'Project: Skyfall',
          match: 'Wingsuit Proximity Challenge',
          stadium: 'Swiss Alps (Secret Location)',
          category: 'Action Sport',
          status: 'Upcoming',
          startTime: new Date(Date.now() + 604800000), // +1 Week
          isCreatorEvent: true,
          organizer: 'RedBull Air Force',
          ticketPrice: 15.00,
          prizePool: '$50,000'
      },
      providers: ACTION_PROVIDERS // Reusing action providers for demo
  }
];
