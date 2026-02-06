
import React from 'react';

interface HelpArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const HELP_CONTENT: Record<string, string> = {
  // Getting Started
  "How do I create a viewer account?": "To create a viewer account, navigate to the top right corner of the homepage and click the 'Login / Sign Up' button. In the modal that appears, ensure the 'VIEWER' tab is selected. You can then sign up by entering your email address and creating a password. Alternatively, you can browse as a guest, but an account is required to subscribe to premium channels or use interactive features like chat and voting.",
  "Setting up your first stream": "Once registered as a Broadcaster (Individual or Team), navigate to your Creator Studio Dashboard. Click on the 'Stream Health' widget to reveal your unique RTMP Ingest URL and Stream Key. Input these credentials into your streaming software (OBS, vMix, or mobile app). Ensure your output settings match our recommended bitrate of 6000 kbps for 1080p60.",
  "Compatible VR Headsets": "Co-Stream Horizon supports WebXR-enabled headsets for our immersive mode. Fully supported devices include Meta Quest 2, 3, and Pro, HTC Vive Series, Valve Index, and Apple Vision Pro. For the best experience, access the platform via the native browser on your headset and click 'Enter VR Mode'.",

  // Billing & Plans
  "Understanding the Team Plan": "The Team Plan ($4,500/year) is an enterprise-grade solution designed for professional broadcast organizations with 20+ members. It grants access to the Harmony Sync Engine for millisecond-precise multi-cam synchronization, the Team AI Director system for automated switching, and a shared revenue dashboard with advanced analytics.",
  "Refund Policy": "We offer a risk-free 7-day trial for all new subscribers. If you cancel before the trial ends, you will not be charged. Monthly subscriptions are non-refundable once billed, except in cases of persistent technical platform failures lasting longer than 48 hours, verified by our support team.",
  "Changing payment methods": "You can update your payment details at any time. Navigate to your Profile > Billing settings. We accept major credit cards (Visa, Mastercard, Amex), PayPal, and select cryptocurrencies. Changes will take effect immediately for your next billing cycle.",

  // Technical Support
  "Troubleshooting 4K buffering": "Streaming in 4K requires a steady internet connection with a download speed of at least 25 Mbps. If you experience buffering, check your local network stability and ensure no other bandwidth-heavy applications are running. You can manually lower the quality to 1440p or 1080p using the settings icon in the player controls if instability persists.",
  "Connecting drone telemetry": "To sync your drone's telemetry with our Live Map, go to your Broadcaster Dashboard > Hardware Integration. We support API keys for DJI and Skydio drones. Enter your drone's API credential to enable real-time synchronization of GPS, altitude, and speed data.",
  "AR Glasses calibration": "Connect your compatible AR glasses (XREAL, Rokid, Vuzix) via USB-C or Bluetooth. In the Co-Stream Horizon app, open the menu and select 'Settings' > 'AR Overlay' > 'Calibrate'. Follow the on-screen prompts to look at the four corners of your display to align the HUD overlay with your field of view.",

  // Streamer Revenue
  "How the 50/50 split works": "We believe in a fair partnership. For every 'Ticketed Event' you organize and sell, you keep 50% of the net ticket revenue. For general subscription revenue, we allocate 50% of the platform's net profit pool to streamers, distributed pro-rata based on the total minutes paid subscribers spent watching your unique camera feeds.",
  "Receiving payouts": "Payouts are processed on the 5th of every month for the previous month's earnings. You must have a minimum balance of $50 to trigger a payout. We currently support automatic transfers via Stripe Connect and PayPal. Ensure your banking details are set up in the Dashboard.",
  "Sponsorship guidelines": "Broadcasters are free to display sponsors on their stream overlays, provided the logos do not obscure more than 15% of the screen area. Prohibited categories include illegal substances, unregulated gambling, hate speech, and adult content. All sponsors must comply with international advertising standards."
};

const HelpArticleModal: React.FC<HelpArticleModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  const content = HELP_CONTENT[title] || "Sorry, we couldn't find detailed information for this topic. Please contact our support team for further assistance.";

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[80] animate-fade-in-fast"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 border border-teal-500/30 rounded-xl max-w-lg w-full m-4 overflow-hidden relative shadow-2xl shadow-teal-900/20"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold">&times;</button>

        <div className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 pr-8">{title}</h2>
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                <p className="text-gray-300 leading-relaxed text-sm">
                    {content}
                </p>
            </div>
            
            <div className="mt-8 flex justify-end">
                <button 
                    onClick={onClose}
                    className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg shadow-teal-500/20"
                >
                    Close
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HelpArticleModal;
