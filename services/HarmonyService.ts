
import { EVENTS_DATABASE } from '../constants';
import type { TelemetryData, DirectorCommand, HarmonyPulse, StreamingProvider } from '../types';

type Listener<T> = (data: T) => void;

class HarmonyService {
  private listeners: { [key: string]: Listener<any>[] } = {};
  private intervalId: number | null = null;
  private telemetryIntervalId: number | null = null;
  private directorIntervalId: number | null = null;
  
  // Dynamic State
  private providers: StreamingProvider[] = [];
  private currentTelemetry: { [key: number]: TelemetryData } = {};
  private tickCount = 0;
  private kafkaOffset = 42984120; // Simulated Kafka starting offset
  private networkCondition: 'GOOD' | 'POOR' = 'GOOD';
  private confluentStatus: 'CONNECTED' | 'DISCONNECTED' | 'RECONNECTING' = 'DISCONNECTED';

  constructor() {
    this.loadEvent(EVENTS_DATABASE[0].providers);
  }

  public loadEvent(providers: StreamingProvider[]) {
      this.providers = [...providers];
      this.currentTelemetry = {};
      this.initializeTelemetry();
  }

  private initializeTelemetry() {
    this.providers.forEach(p => {
      this.currentTelemetry[p.id] = {
        providerId: p.id,
        latitude: p.mapPosition.x,
        longitude: p.mapPosition.y,
        altitude: p.deviceType === 'Drone' ? 45 : 0,
        speed: 0,
        heading: Math.floor(Math.random() * 360),
        batteryVoltage: 12.0
      };
    });
  }

  public connect() {
    console.log('[Confluent Integration] Initializing Kafka Data Plane...');
    this.confluentStatus = 'RECONNECTING';
    this.emit('confluent_status', 'RECONNECTING');

    setTimeout(() => {
        this.confluentStatus = 'CONNECTED';
        this.startHeartbeat();
        this.startTelemetryStream();
        this.startAiDirector();
        this.emit('confluent_status', 'CONNECTED');
        this.emit('connection_status', true);
    }, 1200);
  }

  public disconnect() {
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.telemetryIntervalId) clearInterval(this.telemetryIntervalId);
    if (this.directorIntervalId) clearInterval(this.directorIntervalId);
    this.confluentStatus = 'DISCONNECTED';
    this.emit('confluent_status', 'DISCONNECTED');
    this.emit('connection_status', false);
  }

  public setNetworkCondition(condition: 'GOOD' | 'POOR') {
    this.networkCondition = condition;
  }

  // --- Event Bus ---

  public on(event: string, callback: Listener<any>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  public off(event: string, callback: Listener<any>) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  private emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
  }

  // --- Simulation Logic: Stream Processing (Kafka Mock) ---

  private startHeartbeat() {
    this.intervalId = window.setInterval(() => {
      this.tickCount++;
      this.kafkaOffset += Math.floor(Math.random() * 5); // Consuming messages
      
      const pulse: HarmonyPulse = {
        serverTime: Date.now(),
        tick: this.tickCount,
        kafkaOffset: this.kafkaOffset
      };
      this.emit('harmony_pulse', pulse);
    }, 100);
  }

  private startTelemetryStream() {
    this.telemetryIntervalId = window.setInterval(() => {
      const newTelemetry: { [key: number]: TelemetryData } = {};
      
      this.providers.forEach(p => {
        if (p.id === 0) return; 

        const prev = this.currentTelemetry[p.id] || {
            providerId: p.id,
            latitude: p.mapPosition.x,
            longitude: p.mapPosition.y,
            heading: 0
        };
        
        let speed = 0;
        let latChange = 0;
        let lngChange = 0;

        if (p.deviceType === 'Drone') {
            const time = Date.now() / 2000;
            latChange = Math.sin(time) * 0.2;
            lngChange = Math.cos(time) * 0.2;
            speed = 25 + Math.random() * 5;
        } else {
            latChange = (Math.random() - 0.5) * 0.05;
            lngChange = (Math.random() - 0.5) * 0.05;
            speed = Math.random() * 2;
        }

        const newLat = Math.max(5, Math.min(95, prev.latitude + latChange));
        const newLng = Math.max(5, Math.min(95, prev.longitude + lngChange));

        newTelemetry[p.id] = {
          ...prev,
          latitude: newLat,
          longitude: newLng,
          speed: speed,
          heading: (prev.heading! + (Math.random() * 4 - 2)) % 360,
          altitude: p.deviceType === 'Drone' ? 45 + Math.sin(Date.now()/1000)*2 : 0
        };
      });

      this.currentTelemetry = newTelemetry;
      
      if (this.networkCondition === 'POOR' && Math.random() > 0.7) {
        return;
      }

      this.emit('telemetry_update', newTelemetry);
    }, 100);
  }

  private startAiDirector() {
    this.directorIntervalId = window.setInterval(() => {
        if (Math.random() > 0.8) {
             this.triggerDirectorCut(0, this.providers.filter(p => p.id !== 0));
        }

        this.providers.forEach(p => {
            if (p.id !== 0 && p.cameraAngles && p.cameraAngles.length > 1) {
                 if (Math.random() > 0.9) {
                     this.triggerDirectorCut(p.id, p.cameraAngles);
                 }
            }
        });
    }, 1000);
  }

  private triggerDirectorCut(providerId: number, availableSources: any[]) {
     if (!availableSources || availableSources.length === 0) return;

     const targetIndex = Math.floor(Math.random() * availableSources.length);
     const targetSource = availableSources[targetIndex];
     const angleId = targetSource.id;
     
     const reasons = ["Ball Action", "Crowd Reaction", "Tactical Shift", "Player Focus", "Replay Analysis"];
     const randomReason = reasons[Math.floor(Math.random() * reasons.length)];

     const command: DirectorCommand = {
         type: 'DIRECTOR_CUT',
         targetProviderId: providerId,
         cameraAngleId: angleId,
         transitionDuration: 0.5,
         reason: randomReason,
         kafkaPartition: Math.floor(Math.random() * 3) // Mock partition
     };

     this.emit('director_command', command);
  }
}

export const harmonyService = new HarmonyService();
