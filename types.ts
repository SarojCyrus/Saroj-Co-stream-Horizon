
export interface ScheduledStream {
  title: string;
  startTime: Date;
  description: string;
}

export interface StreamHealth {
  bitrate: number; // Mbps
  latency: number; // ms
  fps: number;
  packetLoss: number; // %
  jitter: number; // ms
  resolution: string;
  codec: string;
}

export interface TelemetryData {
  providerId: number;
  latitude: number; // Mapped to 0-100 x
  longitude: number; // Mapped to 0-100 y
  altitude?: number; // meters (for Drones)
  speed?: number; // km/h
  heading?: number; // degrees
  batteryVoltage?: number;
}

export interface CameraAngle {
  id: number;
  name?: string;
  url: string;
}

export interface StreamingProvider {
  id: number;
  name: string;
  location: string;
  logoUrl: string;
  streamUrl: string;
  viewers: number;
  followers: number;
  mapPosition: {
    x: number;
    y: number;
  };
  description: string;
  streamerCount: number;
  narrator: string;
  hasSubtitles: boolean;
  batteryLevel: number;
  deviceType: 'Mobile' | 'AR' | 'VR/MR' | 'Drone' | 'Platform';
  providerType: 'Team' | 'Individual';
  scheduledStream?: ScheduledStream;
  cameraAngles?: CameraAngle[];
}

export interface ChatMessage {
  user: string;
  message: string;
  timestamp: Date;
  reactions?: { [emoji: string]: number };
}

export type SportCategory = 'Field Sport' | 'Court Sport' | 'Motorsport' | 'Combat Sport' | 'Action Sport' | 'Esports';

export interface EventDetails {
  title: string;
  match: string;
  stadium: string;
  category: SportCategory;
  status: 'Live' | 'Upcoming';
  startTime: Date;
  isCreatorEvent?: boolean; 
  organizer?: string;       
  ticketPrice?: number;     
  prizePool?: string;       
}

export interface EventConfig {
  id: string;
  details: EventDetails;
  providers: StreamingProvider[];
}

// --- Confluent / Kafka Integration Interfaces ---

export interface HarmonyPulse {
  serverTime: number; 
  tick: number; 
  kafkaOffset?: number; // Added: Mock Kafka topic offset
}

export interface DirectorCommand {
  type: 'DIRECTOR_CUT';
  targetProviderId: number; 
  cameraAngleId: number; 
  transitionDuration: number;
  reason: string; 
  kafkaPartition?: number; // Added: Kafka partition metadata
}

export interface BackendState {
  isConnected: boolean;
  confluentStatus: 'CONNECTED' | 'DISCONNECTED' | 'RECONNECTING'; // New: Data Plane status
  serverTime: number;
  harmonyHealth: number; 
  throughput?: number; // msg/sec
}

// --- Authentication & User Roles ---

export type UserRole = 'viewer' | 'vip' | 'broadcaster_individual' | 'broadcaster_team';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
  teamName?: string; 
  balance?: number;  
}
