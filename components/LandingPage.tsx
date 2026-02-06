
import React, { useRef, useState } from 'react';
import { 
    TwitterIcon, FacebookIcon, WhatsappIcon, UserIcon, BillIcon, 
    TechIcon, SupportIcon, GuidelinesIcon, ContentIcon, HardwareIcon,
    MultiStreamIcon, VrIcon, ChatAiIcon, GiftIcon
} from '../constants';
import SubscriptionModal, { PlanType } from './SubscriptionModal';
import type { UserProfile } from '../types';
import HelpArticleModal from './HelpArticleModal';

const SPORT_OPPORTUNITIES = [
    {
        category: "Motorsport",
        image: "https://images.pexels.com/photos/12795/pexels-photo-12795.jpeg?auto=compress&cs=tinysrgb&w=800",
        headline: "Monetize The G-Force",
        desc: "Don't just drive. Broadcast your telemetry and helmet cam. Fans pay for your speed."
    },
    {
        category: "Combat Sports",
        image: "https://images.pexels.com/photos/7045748/pexels-photo-7045748.jpeg?auto=compress&cs=tinysrgb&w=800",
        headline: "Put Them In The Ring",
        desc: "Wear the ref-cam or corner-cam. Let VIPs pay to hear your corner's advice."
    },
    {
        category: "Extreme Action",
        image: "https://images.pexels.com/photos/8408269/pexels-photo-8408269.jpeg?auto=compress&cs=tinysrgb&w=800",
        headline: "Adrenaline = Income",
        desc: "Your risks, your rewards. Stream your run directly to VR headsets globally."
    },
    {
        category: "Field Sports",
        image: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800",
        headline: "You Are The Main Event",
        desc: "Body-cams are the future. Give fans the player's eye view they crave."
    }
];

const SPORT_FEATURES = [
    {
        title: "Field & Stadium Sports",
        subtitle: "The Tactical Tier",
        description: "Football (Soccer), Baseball, American Football, Rugby, Cricket. The pitch is massive, but you won't miss a pixel. Utilize our Stadium Map and Drone Fleets for tactical top-down analysis.",
        image: "https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800",
        video: "https://videos.pexels.com/video-files/8147333/8147333-hd_1920_1080_25fps.mp4",
        color: "from-green-500 to-teal-600"
    },
    {
        title: "Arena & Court Sports",
        subtitle: "The Immersive Tier",
        description: "Volleyball, Tennis, Snooker, Basketball, Ice Hockey. Fast-paced action demands immersion. Step onto the court with VR Box Seats and 360° replays that freeze time.",
        image: "https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800",
        video: "https://videos.pexels.com/video-files/4621926/4621926-uhd_2560_1440_25fps.mp4",
        color: "from-orange-500 to-red-600"
    },
    {
        title: "Motorsports & Racing",
        subtitle: "The Telemetry Tier",
        description: "F1 Grand Prix, MotoGP, Rally, NASCAR. Speed is nothing without data. Overlay real-time G-Force, speed, and gear metrics directly onto the driver's POV via our AR HUD.",
        image: "https://images.pexels.com/photos/12795/pexels-photo-12795.jpeg?auto=compress&cs=tinysrgb&w=800",
        video: "https://videos.pexels.com/video-files/7242150/7242150-hd_1920_1080_24fps.mp4",
        color: "from-blue-600 to-indigo-700"
    },
    {
        title: "Combat Sports",
        subtitle: "The Multi-Angle Tier",
        description: "Martial Arts, MMA, Boxing, Wrestling, Muay Thai. Two fighters, infinite angles. Switch between the Referee Cam, Corner Cam, and Ringside Cam to see every strike and takedown.",
        image: "https://images.pexels.com/photos/4761785/pexels-photo-4761785.jpeg?auto=compress&cs=tinysrgb&w=800",
        video: "https://videos.pexels.com/video-files/8064311/8064311-hd_1920_1080_25fps.mp4",
        color: "from-red-600 to-pink-700"
    },
    {
        title: "Action & Extreme",
        subtitle: "The Dynamic Tier",
        description: "Ski mountaineer Andrzej Bargiel becomes the first person to climb Mount Everest and ski back to Base Camp without supplementary oxygen. Witness the 16-hour climb and the treacherous descent through the Khumbu Icefall, guided by drone.",
        image: "https://images.pexels.com/photos/8408269/pexels-photo-8408269.jpeg?auto=compress&cs=tinysrgb&w=800",
        video: "https://videos.pexels.com/video-files/856172/856172-hd_1920_1080_30fps.mp4",
        color: "from-yellow-400 to-orange-500"
    },
    {
        title: "Esports",
        subtitle: "The Digital Tier",
        description: "MOBA, FPS, Battle Royale, RTS, Sports Sims. Direct feed integration from the game server. Watch player screens, see real-time gold/exp graphs, and toggle fog-of-war overlays.",
        image: "https://images.pexels.com/photos/7862594/pexels-photo-7862594.jpeg?auto=compress&cs=tinysrgb&w=800",
        video: "https://videos.pexels.com/video-files/7543885/7543885-hd_1920_1080_30fps.mp4",
        color: "from-purple-600 to-indigo-600"
    }
];

const HELP_TOPICS = [
    {
        title: "Getting Started",
        icon: UserIcon,
        questions: ["How do I create a viewer account?", "Setting up your first stream", "Compatible VR Headsets"]
    },
    {
        title: "Billing & Plans",
        icon: BillIcon,
        questions: ["Understanding the Team Plan", "Refund Policy", "Changing payment methods"]
    },
    {
        title: "Technical Support",
        icon: TechIcon,
        questions: ["Troubleshooting 4K buffering", "Connecting drone telemetry", "AR Glasses calibration"]
    },
    {
        title: "Streamer Revenue",
        icon: SupportIcon,
        questions: ["How the 50/50 split works", "Receiving payouts", "Sponsorship guidelines"]
    }
];

const GUIDELINE_TOPICS = [
    {
        title: "Technical Requirements",
        icon: TechIcon,
        desc: "Ensure your equipment meets the minimum specs for high-quality streaming.",
        points: ["Minimum 1080p60 output", "Bitrate: 6000 kbps (min)", "Stable 5G or Wi-Fi 6 connection", "SRT Protocol support recommended"]
    },
    {
        title: "Content Standards",
        icon: ContentIcon,
        desc: "Maintain platform integrity by adhering to our community guidelines.",
        points: ["No hate speech or harassment", "Respect copyright laws", "Adhere to sporting event regulations", "Safe conduct during extreme sports"]
    },
    {
        title: "Hardware Recommendations",
        icon: HardwareIcon,
        desc: "Recommended gear for optimal POV and telemetry integration.",
        points: ["Action Cams: GoPro Hero 10+, DJI Action 2", "Drones: DJI Mavic 3, Skydio 2+", "AR: Nreal Light, Vuzix Blade", "VR: Insta360 Pro 2 for 360° capture"]
    }
];

const COMPATIBILITY_DATA = [
    {
        type: "VR Headsets",
        icon: (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
             </svg>
        ),
        desc: "Full immersion with 180°/360° video support and spatial audio.",
        supported: ["Meta Quest 2, 3, Pro", "HTC Vive Series", "Apple Vision Pro", "Valve Index"],
        features: ["Virtual Box Seats", "Immersive Replays", "Social VR Watch Parties"]
    },
    {
        type: "AR Glasses",
        icon: (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
             </svg>
        ),
        desc: "Lightweight overlay for telemetry stats and second-screen experiences.",
        supported: ["XREAL Air 2", "Rokid Max", "RayNeo X2", "Vuzix Blade"],
        features: ["Live HUD Overlay", "Player Stats Tracking", "Mini-Map Projection"]
    },
    {
        type: "Mobile AR",
        icon: (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-3 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
             </svg>
        ),
        desc: "Accessible immersive features directly on your smartphone.",
        supported: ["iPhone 12 Pro & newer", "Samsung S21 & newer", "LiDAR-enabled devices"],
        features: ["360° Magic Window", "AR Tabletop Mode", "Portal Views"]
    }
];

const SYSTEM_STATUS_DATA = [
    { name: 'Platform Core', status: 'Operational', uptime: '99.99%', region: 'Global' },
    { name: 'Video Ingest Nodes', status: 'Operational', uptime: '99.95%', region: 'Multi-Region' },
    { name: 'Harmony Sync Engine', status: 'Operational', uptime: '100%', region: 'Global' },
    { name: 'AI Director Grid', status: 'Operational', uptime: '99.98%', region: 'Global' },
    { name: 'CDN Delivery', status: 'Operational', uptime: '99.99%', region: 'Global' },
    { name: 'Telemetry Processing', status: 'Operational', uptime: '99.99%', region: 'US-East / EU-West' },
];

const FeatureCard = ({ feature }: { feature: typeof SPORT_FEATURES[0] }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <div 
            className="group relative rounded-xl overflow-hidden h-[400px] shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-700 hover:border-teal-400"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Background Image (Static) */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Background Video (Dynamic) */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                <video 
                    ref={videoRef}
                    src={feature.video} 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <div className={`h-1 w-12 rounded mb-4 bg-gradient-to-r ${feature.color}`}></div>
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                    {feature.subtitle}
                </p>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:scale-105 transition-transform origin-left">
                    {feature.title}
                </h3>
                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 leading-relaxed">
                    {feature.description}
                </p>
            </div>
        </div>
    );
};

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SystemStatusModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-fast" onClick={onClose}>
            <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-4xl w-full m-4 p-8 overflow-hidden relative shadow-2xl" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold">&times;</button>
                
                <div className="text-center mb-8">
                     <h2 className="text-2xl font-bold text-white mb-2">System Status</h2>
                     <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-bold">
                         <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                         All Systems Operational
                     </div>
                 </div>

                 <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-700">
                         {SYSTEM_STATUS_DATA.map((status, idx) => (
                             <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-800 transition-colors">
                                 <div>
                                     <p className="text-sm font-bold text-gray-200">{status.name}</p>
                                     <p className="text-xs text-gray-500">{status.region}</p>
                                 </div>
                                 <div className="text-right">
                                     <div className="flex items-center justify-end text-green-400 text-xs font-bold mb-1">
                                         <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></span>
                                         {status.status}
                                     </div>
                                     <p className="text-[10px] text-gray-500 font-mono">{status.uptime}</p>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
                 
                 <div className="text-center mt-6">
                     <a href="#" className="text-xs text-gray-500 hover:text-teal-400 transition-colors underline">View Incident History</a>
                 </div>
            </div>
        </div>
    );
};

const PrivacyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-fast" onClick={onClose}>
            <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-4xl w-full m-4 p-8 overflow-y-auto max-h-[90vh] relative shadow-2xl" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold">&times;</button>
                <div className="prose prose-invert max-w-none">
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Privacy Policy</h2>
                    
                    <h3 className="text-xl font-semibold text-teal-400 mt-4">1. Introduction</h3>
                    <p className="text-gray-300 text-sm mb-4">
                        Co-Stream Horizon respects your privacy. This policy details how we collect, use, and protect your data, specifically regarding our co-streaming, AR/VR, and telemetry features.
                    </p>

                    <h3 className="text-xl font-semibold text-teal-400 mt-4">2. Data We Collect</h3>
                    <ul className="list-disc pl-5 text-gray-300 text-sm space-y-2 mb-4">
                        <li><strong className="text-white">Account Information:</strong> Name, email, billing details, and subscription preferences.</li>
                        <li><strong className="text-white">Telemetry Data:</strong> For streamers, we collect real-time location (GPS), speed, altitude, and biometric data (if enabled) to generate AR overlays.</li>
                        <li><strong className="text-white">Device Usage:</strong> Information about your AR glasses, VR headsets, and mobile devices to optimize stream compatibility.</li>
                        <li><strong className="text-white">Audio/Video:</strong> Live streams and recorded clips generated by users.</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-teal-400 mt-4">3. How We Use Your Data</h3>
                    <p className="text-gray-300 text-sm mb-4">
                        We use telemetry data solely to synchronize the "Harmony Sync Engine" and provide accurate AR HUD overlays for viewers. Location data from drones and athletes is displayed in real-time on the Stadium Map.
                    </p>

                    <h3 className="text-xl font-semibold text-teal-400 mt-4">4. Data Sharing</h3>
                    <p className="text-gray-300 text-sm mb-4">
                        We do not sell your personal data. Aggregated anonymized statistics may be shared with sports organizations to improve event coverage.
                    </p>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-700 text-right">
                    <button onClick={onClose} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded transition-colors">Close</button>
                </div>
            </div>
        </div>
    );
};

const TermsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-fast" onClick={onClose}>
            <div className="bg-gray-900 border border-gray-700 rounded-xl max-w-4xl w-full m-4 p-8 overflow-y-auto max-h-[90vh] relative shadow-2xl" onClick={e => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold">&times;</button>
                <div className="prose prose-invert max-w-none">
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-700 pb-2">Terms of Service</h2>
                    
                    <h3 className="text-xl font-semibold text-teal-400 mt-4">1. Acceptance of Terms</h3>
                    <p className="text-gray-300 text-sm mb-4">
                        By accessing Co-Stream Horizon, you agree to these terms. If you do not agree, you may not use the platform.
                    </p>

                    <h3 className="text-xl font-semibold text-teal-400 mt-4">2. 7-Day Free Trial</h3>
                    <p className="text-gray-300 text-sm mb-4">
                        New users are eligible for a one-time 7-day free trial. You may cancel at any time during this period without being charged. Failure to cancel before the trial ends will result in a charge for the selected subscription plan.
                    </p>

                    <h3 className="text-xl font-semibold text-teal-400 mt-4">3. Streamer Revenue Sharing</h3>
                    <p className="text-gray-300 text-sm mb-4">
                        Registered Broadcasters (Athletes, Teams, Freelancers) are entitled to a 50% revenue share of net subscription income attributed to their unique channel views, paid out monthly.
                    </p>

                    <h3 className="text-xl font-semibold text-teal-400 mt-4">4. Content Guidelines</h3>
                    <p className="text-gray-300 text-sm mb-4">
                        Streamers must adhere to our "Broadcaster Guidelines." Dangerous, illegal, or harassing content will result in immediate account termination and forfeiture of unpaid revenue.
                    </p>

                    <h3 className="text-xl font-semibold text-teal-400 mt-4">5. Liability</h3>
                    <p className="text-gray-300 text-sm mb-4">
                        Co-Stream Horizon is not liable for physical injuries sustained by athletes or streamers while capturing content for the platform.
                    </p>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-700 text-right">
                    <button onClick={onClose} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded transition-colors">I Agree</button>
                </div>
            </div>
        </div>
    );
};


interface LandingPageProps {
  onStart: () => void;
  isFadingOut: boolean;
  onOpenCookieSettings: () => void;
  user: UserProfile | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, isFadingOut, onOpenCookieSettings, user }) => {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(null);
  const [selectedHelpTopic, setSelectedHelpTopic] = useState<string | null>(null);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlanSelect = (type: PlanType) => {
      setSelectedPlan(type);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
      e.preventDefault();
      onStart();
  };

  const getButtonText = () => {
      if (!user) return "Login / Sign Up";
      if (user.role.includes('broadcaster')) return "Go to Dashboard";
      return "Enter The Stadium";
  };

  return (
    <div className={`min-h-screen bg-gray-900 text-gray-200 font-sans transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          src="https://videos.pexels.com/video-files/7242150/7242150-hd_1920_1080_24fps.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-4 flex justify-between items-center bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
            <a href="#" onClick={handleLogoClick} className="flex items-center group" title="Enter Lobby">
                <div className="bg-teal-500 text-gray-900 font-bold rounded-md px-2 py-1 mr-4 text-xl group-hover:bg-teal-400 transition-colors">
                    CS
                </div>
                <h1 className="text-xl font-bold text-white">Co-Stream Horizon</h1>
            </a>
            <div className="flex items-center space-x-6">
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <a href="#features" onClick={scrollToSection('features')} className="text-gray-300 hover:text-teal-400 transition-colors">Features</a>
                    <a href="#athletes" onClick={scrollToSection('athletes')} className="text-gray-300 hover:text-yellow-400 transition-colors">Athletes</a>
                    <a href="#pricing" onClick={scrollToSection('pricing')} className="text-gray-300 hover:text-teal-400 transition-colors">Pricing</a>
                </nav>
                <a href="#pricing" onClick={scrollToSection('pricing')} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-5 rounded-lg transition-colors text-sm">
                    Subscribe
                </a>
            </div>
        </header>

        {/* Hero Section */}
        <main className="flex-grow flex items-center justify-center text-center px-4 py-20">
          <div className="max-w-4xl animate-fade-in-fast">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
              The Future of <span className="text-teal-400">Live Sports</span> is Here.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Experience the game from every angle. Join fan-driven streamer teams, switch between live feeds, and immerse yourself in the action like never before.
            </p>
            <button
              onClick={onStart}
              className="bg-teal-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-teal-500/20"
            >
              {getButtonText()}
            </button>
          </div>
        </main>

        {/* Features Section (Redesigned) */}
        <section id="features" className="py-24 bg-gray-900 scroll-mt-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Redefining The Spectator Experience</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">One platform. Five distinct worlds. We've built tailored viewing technologies for every discipline.</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Featured Item 1 - Wide Card */}
                    <div className="lg:col-span-2">
                        <FeatureCard feature={SPORT_FEATURES[0]} />
                    </div>
                    {/* Featured Item 2 */}
                    <div className="lg:col-span-1">
                         <FeatureCard feature={SPORT_FEATURES[1]} />
                    </div>
                     {/* Row 2 */}
                    <div className="lg:col-span-1">
                         <FeatureCard feature={SPORT_FEATURES[2]} />
                    </div>
                    <div className="lg:col-span-1">
                         <FeatureCard feature={SPORT_FEATURES[3]} />
                    </div>
                    <div className="lg:col-span-1">
                         <FeatureCard feature={SPORT_FEATURES[4]} />
                    </div>
                    {/* Row 3 - Esports Full Width */}
                    <div className="lg:col-span-3">
                         <FeatureCard feature={SPORT_FEATURES[5]} />
                    </div>
                </div>
            </div>
        </section>

        {/* ATHLETES INVITATION SECTION */}
        <section id="athletes" className="relative py-24 overflow-hidden scroll-mt-20">
            {/* Vibrant Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black opacity-90"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <span className="bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Athlete Partner Program</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Don't Just Play The Game. <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">Own The Broadcast.</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        We are inviting athletes, drivers, and fighters to join Co-Stream Horizon. 
                        Wear a body cam, mount a rig, or stream from your smart glasses. 
                        <span className="font-bold text-white"> You keep 50% of all subscription revenue</span> generated from your unique camera angle.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SPORT_OPPORTUNITIES.map((item, idx) => (
                        <div key={idx} className="group relative rounded-xl overflow-hidden h-96 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-white/10 hover:border-yellow-400">
                            <img 
                                src={item.image} 
                                alt={item.category} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>
                            
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-2">{item.category}</p>
                                <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{item.headline}</h3>
                                <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button 
                        onClick={() => handlePlanSelect('Individual')}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-extrabold py-4 px-10 rounded-full text-lg shadow-[0_0_20px_rgba(234,179,8,0.5)] hover:shadow-[0_0_40px_rgba(234,179,8,0.7)] transition-all duration-300 transform hover:scale-105"
                    >
                        APPLY AS ATHLETE STREAMER
                    </button>
                    <p className="mt-4 text-sm text-gray-400">Join 500+ athletes already monetizing their POV.</p>
                </div>
            </div>
        </section>

        {/* CREATOR ARENA SECTION (New for Action/Extreme) */}
        <section className="py-20 bg-gray-900 border-t border-gray-800">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Special Feature: Action & Extreme</span>
                        <h2 className="text-4xl font-extrabold text-white mb-6">
                            The Creator Arena: <br/>
                            <span className="text-purple-400">Build Your Own Sport.</span>
                        </h2>
                        <p className="text-lg text-gray-300 mb-6">
                            For <span className="text-white font-bold">Adventure Streamers</span> and <span className="text-white font-bold">Extreme Teams</span>: Design your own private event. Set the rules, invite the players, pick the location, and define the prize.
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-start">
                                <div className="bg-purple-500/20 p-2 rounded-lg mr-4 text-purple-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Set Your Ticket Price</h4>
                                    <p className="text-sm text-gray-400">You control the gate. Charge $5 or $50 for access to your exclusive live event.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-purple-500/20 p-2 rounded-lg mr-4 text-purple-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">50/50 Revenue Split</h4>
                                    <p className="text-sm text-gray-400">We provide the platform, you provide the adrenaline. We split the ticket sales down the middle.</p>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <div className="bg-purple-500/20 p-2 rounded-lg mr-4 text-purple-400">
                                    <svg xmlns="http://www.getbootstrap.com/docs/5.0/assets/img/bootstrap-icons.svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Compliance Verified</h4>
                                    <p className="text-sm text-gray-400">We ensure all private events meet local and international safety laws before going live.</p>
                                </div>
                            </li>
                        </ul>
                        <button onClick={() => handlePlanSelect('Individual')} className="text-purple-400 font-bold hover:text-purple-300 flex items-center transition-colors">
                            Start Designing Your Event <span className="ml-2">→</span>
                        </button>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-purple-600/30 rounded-xl blur-xl"></div>
                        <img 
                            src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=800" 
                            alt="Adventure Streamer" 
                            className="relative rounded-xl shadow-2xl border border-purple-500/50"
                        />
                        <div className="absolute bottom-6 left-6 right-6 bg-gray-900/90 backdrop-blur p-4 rounded-lg border border-purple-500/50">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-purple-400 uppercase">Live Event Example</span>
                                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">LIVE</span>
                            </div>
                            <h4 className="font-bold text-white">Cliff Hanger: The Summit Scramble</h4>
                            <p className="text-xs text-gray-400 mb-2">Organized by Team Apex • Yosemite Park</p>
                            <div className="flex items-center justify-between">
                                <span className="text-white font-bold text-lg">$15.00 <span className="text-xs font-normal text-gray-400">/ Ticket</span></span>
                                <span className="text-xs text-green-400">You earn $7.50 per viewer</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gray-900/80 scroll-mt-20">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12 text-center text-white">Pricing & Plans</h2>
            
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              
              {/* VIEWERS COLUMN */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-teal-400 uppercase tracking-widest text-center border-b border-gray-700 pb-2">Viewer Access</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                    {/* General Viewers */}
                    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 flex flex-col hover:border-teal-500/50 transition-colors">
                        <h4 className="text-lg font-bold text-white mb-2">General Viewers</h4>
                        <p className="text-sm text-gray-400 mb-4">Standard access to all live events and streamer feeds.</p>
                        <div className="space-y-2 mb-6 flex-grow">
                            <div className="flex justify-between text-sm text-gray-300"><span>1 Month Pass</span> <span className="font-bold text-white">$10</span></div>
                            <div className="flex justify-between text-sm text-gray-300"><span>3 Month Pass</span> <span className="font-bold text-white">$50</span></div>
                            <div className="flex justify-between text-sm text-gray-300"><span>6 Month Pass</span> <span className="font-bold text-white">$120</span></div>
                            <div className="flex justify-between text-sm text-gray-300"><span>12 Month Pass</span> <span className="font-bold text-white">$450</span></div>
                        </div>
                         <div className="border-t border-gray-700 pt-4 mt-auto">
                             <p className="text-xs font-bold text-teal-400 mb-2">INCLUDED SERVICES:</p>
                             <ul className="text-xs text-gray-400 space-y-1">
                                 <li>• 1080p HD Streams</li>
                                 <li>• Standard Multi-View (2 Screens)</li>
                                 <li>• Live Chat Access</li>
                                 <li>• Basic AI Assistant</li>
                             </ul>
                        </div>
                        <button 
                            onClick={() => handlePlanSelect('General')}
                            className="mt-4 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 rounded transition-colors w-full text-sm"
                        >
                            Select Pass
                        </button>
                    </div>

                    {/* VIP Viewers */}
                    <div className="bg-gradient-to-b from-gray-800/80 to-yellow-900/20 rounded-lg p-6 border border-yellow-500/30 flex flex-col hover:border-yellow-400 transition-colors shadow-lg shadow-yellow-900/10">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-bold text-yellow-400">VIP Viewers</h4>
                            <span className="bg-yellow-500 text-black text-[10px] font-bold px-2 py-0.5 rounded">PREMIUM</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">The ultimate experience with exclusive AI controls.</p>
                        <div className="space-y-2 mb-6 flex-grow">
                            <div className="flex justify-between text-sm text-gray-300"><span>1 Month</span> <span className="font-bold text-yellow-400">$30</span></div>
                            <div className="flex justify-between text-sm text-gray-300"><span>3 Months</span> <span className="font-bold text-yellow-400">$150</span></div>
                            <div className="flex justify-between text-sm text-gray-300"><span>6 Months</span> <span className="font-bold text-yellow-400">$360</span></div>
                            <div className="flex justify-between text-sm text-gray-300"><span>12 Months</span> <span className="font-bold text-yellow-400">$1,350</span></div>
                        </div>
                        <div className="border-t border-gray-700 pt-4 mt-auto">
                             <p className="text-xs font-bold text-yellow-400 mb-2">VIP SERVICES:</p>
                             <ul className="text-xs text-gray-400 space-y-1">
                                 <li>• <strong className="text-white">Principal AI Director Feed</strong></li>
                                 <li>• 4K UHD & High Bitrate</li>
                                 <li>• Exclusive VR/AR Access</li>
                                 <li>• Advanced Telemetry Stats</li>
                                 <li>• Ad-Free Experience</li>
                             </ul>
                        </div>
                        <button 
                            onClick={() => handlePlanSelect('VIP')}
                            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 rounded transition-colors w-full text-sm"
                        >
                            Go VIP
                        </button>
                    </div>
                </div>
              </div>

              {/* BROADCASTER COLUMN */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-cyan-400 uppercase tracking-widest text-center border-b border-gray-700 pb-2">Broadcaster Zone</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                    {/* Individual Provider */}
                    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 flex flex-col hover:border-cyan-500/50 transition-colors">
                        <h4 className="text-lg font-bold text-white mb-2">Individual</h4>
                        <p className="text-sm text-gray-400 mb-4">For solo freelancers and influencers.</p>
                        
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-white">$450</span>
                            <span className="text-sm text-gray-400"> / year</span>
                        </div>

                        <div className="border-t border-gray-700 pt-4 mt-auto mb-6">
                             <p className="text-xs font-bold text-cyan-400 mb-2">PROVIDER SERVICES:</p>
                             <ul className="text-xs text-gray-400 space-y-1">
                                 <li>• Mobile, AR Glass, or VR Headset streaming</li>
                                 <li>• Global Map Listing</li>
                                 <li>• Basic Analytics Dashboard</li>
                                 <li>• Fan Tipping Enabled</li>
                                 <li>• 1080p Ingest Support</li>
                             </ul>
                        </div>
                        <button 
                            onClick={() => handlePlanSelect('Individual')}
                            className="mt-auto bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded transition-colors w-full text-sm"
                        >
                            Start Streaming
                        </button>
                    </div>

                    {/* Team Provider */}
                    <div className="bg-gradient-to-b from-gray-800/80 to-cyan-900/20 rounded-lg p-6 border border-cyan-500/30 flex flex-col hover:border-cyan-400 transition-colors shadow-lg shadow-cyan-900/10">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-bold text-cyan-400">Team Plan</h4>
                            <span className="bg-cyan-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">PROFESSIONAL</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">For professional broadcast teams (20+ members).</p>
                        
                        <div className="mb-6">
                            <span className="text-3xl font-bold text-white">$4,500</span>
                            <span className="text-sm text-gray-400"> / year</span>
                        </div>

                        <div className="border-t border-gray-700 pt-4 mt-auto mb-6">
                             <p className="text-xs font-bold text-cyan-400 mb-2">TEAM SERVICES:</p>
                             <ul className="text-xs text-gray-400 space-y-1">
                                 <li>• <strong className="text-white">Team AI Director System</strong></li>
                                 <li>• <strong className="text-white">Harmony Sync Engine</strong></li>
                                 <li>• Drone Fleet Integration</li>
                                 <li>• 20+ Concurrent Inputs</li>
                                 <li>• Advanced Revenue Split & Sponsorships</li>
                             </ul>
                        </div>
                        <button 
                            onClick={() => handlePlanSelect('Team')}
                            className="mt-auto bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 rounded transition-colors w-full text-sm"
                        >
                            Register Team
                        </button>
                    </div>
                </div>
              </div>

            </div>

            {/* 7-Day Trial Promo */}
            <div className="max-w-4xl mx-auto mt-12">
                <div className="bg-gradient-to-r from-teal-900/20 to-blue-900/20 border border-teal-500/30 rounded-xl p-8 text-center">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-gray-800 p-3 rounded-full border border-gray-700 shadow-lg">
                            {GiftIcon}
                        </div>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Special Invitation</h4>
                    <p className="text-lg text-gray-300 mb-4">
                        Interested in our streaming programs? Start with a <span className="text-teal-400 font-bold bg-teal-400/10 px-2 py-0.5 rounded">7-Day Free Trial</span>
                    </p>
                    <p className="text-sm text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
                        We invite all audiences to experience the full power of Co-Stream Horizon. You can unsubscribe or cancel your plan at any time during the 7-day testing period at absolutely no cost.
                    </p>
                    <button 
                        onClick={() => handlePlanSelect('Trial')}
                        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-10 rounded-full transition-all shadow-lg shadow-teal-500/20 transform hover:scale-105"
                    >
                        Start Free Trial
                    </button>
                </div>
            </div>
          </div>
        </section>

        {/* VR/AR Compatibility Section */}
        <section id="compatibility" className="py-20 bg-black scroll-mt-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Immersive Tech</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">VR/AR Compatibility</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Our platform is optimized for the latest immersive hardware. Experience sports like never before.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {COMPATIBILITY_DATA.map((item, idx) => (
                        <div key={idx} className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-indigo-500 transition-colors text-center group">
                            <div className="flex justify-center group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                            <h3 className="text-xl font-bold text-white mb-2">{item.type}</h3>
                            <p className="text-sm text-gray-400 mb-6">{item.desc}</p>
                            <div className="text-left bg-gray-800 p-4 rounded-lg">
                                <p className="text-xs font-bold text-indigo-400 uppercase mb-2">Supported Devices</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {item.supported.map((dev, i) => (
                                        <span key={i} className="text-[10px] bg-gray-700 text-gray-300 px-2 py-1 rounded border border-gray-600">{dev}</span>
                                    ))}
                                </div>
                                <p className="text-xs font-bold text-indigo-400 uppercase mb-2">Key Features</p>
                                <ul className="space-y-1">
                                    {item.features.map((feat, i) => (
                                        <li key={i} className="text-xs text-gray-400 flex items-center">
                                            <span className="w-1 h-1 bg-indigo-500 rounded-full mr-2"></span>{feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Broadcaster Guidelines Section */}
        <section id="guidelines" className="py-20 bg-gray-900 scroll-mt-20 border-t border-gray-800">
             <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">For Creators</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Broadcaster Guidelines</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to know about streaming on Co-Stream Horizon. Adhere to our standards to ensure the best experience for your viewers.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {GUIDELINE_TOPICS.map((topic, idx) => (
                        <div key={idx} className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-teal-500/50 transition-colors">
                            <div className="flex items-center mb-4 text-teal-400">
                                {/* Fixed TypeScript error: cast icon to React.ReactElement<any> to allow className prop in cloneElement */}
                                {React.cloneElement(topic.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{topic.title}</h3>
                            <p className="text-sm text-gray-400 mb-6">{topic.desc}</p>
                            <ul className="space-y-3">
                                {topic.points.map((point, i) => (
                                    <li key={i} className="flex items-start text-sm text-gray-300">
                                        <svg className="w-4 h-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
             </div>
        </section>

        {/* Help Center Section */}
        <section id="help" className="py-20 bg-gray-950 scroll-mt-20">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Help Center</h2>
                    <p className="text-gray-400 mb-8">Find answers to common questions about subscriptions, streaming setup, and platform compatibility.</p>
                    <div className="max-w-xl mx-auto relative">
                        <input 
                            type="text" 
                            placeholder="Search for help..." 
                            className="w-full bg-gray-800 border border-gray-700 text-white rounded-full py-3 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                        <svg className="w-5 h-5 text-gray-500 absolute left-4 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {HELP_TOPICS.map((topic, idx) => (
                        <div key={idx} className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors">
                            <div className="bg-gray-800 w-12 h-12 rounded-lg flex items-center justify-center text-teal-400 mb-4">
                                {/* Fixed TypeScript error: cast icon to React.ReactElement<any> to allow className prop in cloneElement */}
                                {React.cloneElement(topic.icon as React.ReactElement<any>, { className: "w-6 h-6" })}
                            </div>
                            <h4 className="text-lg font-bold text-white mb-4">{topic.title}</h4>
                            <ul className="space-y-2">
                                {topic.questions.map((q, i) => (
                                    <li key={i}>
                                        <button 
                                            onClick={(e) => { e.preventDefault(); setSelectedHelpTopic(q); }}
                                            className="text-sm text-gray-400 hover:text-teal-400 transition-colors flex items-center text-left w-full"
                                        >
                                            <span className="w-1 h-1 bg-gray-600 rounded-full mr-2 flex-shrink-0"></span>
                                            {q}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                
                <div className="text-center mt-12">
                    <p className="text-gray-400 text-sm mb-4">Can't find what you're looking for?</p>
                    <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg border border-gray-700 transition-colors flex items-center mx-auto">
                        {/* Fixed TypeScript error: cast SupportIcon to React.ReactElement<any> to allow className prop in cloneElement */}
                        {React.cloneElement(SupportIcon as React.ReactElement<any>, { className: "w-5 h-5 mr-2" })}
                        Contact Support
                    </button>
                </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-950 border-t border-gray-800 py-12">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center mb-4">
                            <div className="bg-teal-500 text-gray-900 font-bold rounded-md px-2 py-1 mr-3 text-lg">CS</div>
                            <h4 className="text-lg font-bold text-white">Co-Stream Horizon</h4>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">
                            Empowering the world to watch and stream sports from every perspective.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">{TwitterIcon}</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">{FacebookIcon}</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">{WhatsappIcon}</a>
                        </div>
                    </div>
                    
                    <div>
                        <h5 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-4">Platform</h5>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><button onClick={onStart} className="hover:text-teal-400 transition-colors">Live Events</button></li>
                            <li><a href="#features" onClick={scrollToSection('features')} className="hover:text-teal-400 transition-colors">Features</a></li>
                            <li><a href="#pricing" onClick={scrollToSection('pricing')} className="hover:text-teal-400 transition-colors">Pricing</a></li>
                            <li><button onClick={() => setIsStatusModalOpen(true)} className="hover:text-teal-400 transition-colors">System Status</button></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-4">Support</h5>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#help" onClick={scrollToSection('help')} className="hover:text-teal-400 transition-colors">Help Center</a></li>
                            <li><a href="#guidelines" onClick={scrollToSection('guidelines')} className="hover:text-teal-400 transition-colors">Broadcaster Guidelines</a></li>
                            <li><a href="#compatibility" onClick={scrollToSection('compatibility')} className="hover:text-teal-400 transition-colors">VR/AR Compatibility</a></li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-4">Stay Connected</h5>
                        <p className="text-xs text-gray-400 mb-4">Subscribe to our newsletter for event updates and new feature announcements.</p>
                        <div className="flex">
                            <input 
                                type="email" 
                                placeholder="Email Address" 
                                className="bg-gray-800 text-white text-sm rounded-l-lg px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-teal-500"
                            />
                            <button className="bg-teal-500 hover:bg-teal-600 text-white text-sm font-bold px-4 py-2 rounded-r-lg transition-colors">Go</button>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; 2024 Co-Stream Horizon. All Rights Reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <button onClick={() => setIsPrivacyOpen(true)} className="hover:text-white transition-colors">Privacy Policy</button>
                        <button onClick={() => setIsTermsOpen(true)} className="hover:text-white transition-colors">Terms of Service</button>
                        <button onClick={onOpenCookieSettings} className="hover:text-white transition-colors">Cookie Settings</button>
                    </div>
                </div>
            </div>
        </footer>

        {/* Modals */}
        <SubscriptionModal 
            isOpen={!!selectedPlan} 
            onClose={() => setSelectedPlan(null)} 
            planType={selectedPlan} 
        />
        <SystemStatusModal isOpen={isStatusModalOpen} onClose={() => setIsStatusModalOpen(false)} />
        <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
        <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
        
        {/* Help Article Modal */}
        <HelpArticleModal 
            isOpen={!!selectedHelpTopic} 
            onClose={() => setSelectedHelpTopic(null)} 
            title={selectedHelpTopic || ''} 
        />
      </div>
    </div>
  );
};
