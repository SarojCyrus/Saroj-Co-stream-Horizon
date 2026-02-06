
import type { UserProfile, UserRole } from '../types';

// This service simulates Firebase Auth. 
// In the future, replace these mock methods with `signInWithEmailAndPassword`, etc.

class AuthService {
  private currentUser: UserProfile | null = null;
  private listeners: ((user: UserProfile | null) => void)[] = [];

  constructor() {
    // Check local storage for persisted session
    const savedUser = localStorage.getItem('cs_horizon_user');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  // Mock Login
  public async login(email: string, role: UserRole): Promise<UserProfile> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: UserProfile = {
          uid: 'user_' + Math.random().toString(36).substr(2, 9),
          email: email,
          displayName: email.split('@')[0],
          role: role,
          avatarUrl: `https://i.pravatar.cc/150?u=${email}`,
          balance: role.includes('broadcaster') ? 1250.00 : 0,
          teamName: role === 'broadcaster_team' ? 'Team Horizon' : undefined
        };

        this.currentUser = mockUser;
        this.persistUser();
        this.notifyListeners();
        resolve(mockUser);
      }, 800); // Simulate network delay
    });
  }

  // Mock Logout
  public async logout(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentUser = null;
        localStorage.removeItem('cs_horizon_user');
        this.notifyListeners();
        resolve();
      }, 500);
    });
  }

  public getCurrentUser(): UserProfile | null {
    return this.currentUser;
  }

  public onAuthStateChanged(callback: (user: UserProfile | null) => void) {
    this.listeners.push(callback);
    // Immediately fire with current state
    callback(this.currentUser);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(cb => cb(this.currentUser));
  }

  private persistUser() {
    if (this.currentUser) {
      localStorage.setItem('cs_horizon_user', JSON.stringify(this.currentUser));
    }
  }
}

export const authService = new AuthService();
