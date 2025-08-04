// Session persistence utilities

export interface SessionData {
  userId: string;
  email: string;
  role: string;
  lastActivity: number;
  preferences?: Record<string, unknown>;
}

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'auto';
  language?: string;
  notifications?: boolean;
  autoRefresh?: boolean;
}

// Session storage keys
const SESSION_KEY = 'hostelhub_session';
const PREFERENCES_KEY = 'hostelhub_preferences';
const REDIRECT_KEY = 'auth_redirect';

// Session expiry time (24 hours)
const SESSION_EXPIRY = 24 * 60 * 60 * 1000;

/**
 * Save session data to localStorage
 */
export const saveSession = (data: SessionData): void => {
  try {
    const sessionData = {
      ...data,
      lastActivity: Date.now(),
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  } catch (error) {
    console.error('Failed to save session:', error);
  }
};

/**
 * Get session data from localStorage
 */
export const getSession = (): SessionData | null => {
  try {
    const sessionStr = localStorage.getItem(SESSION_KEY);
    if (!sessionStr) return null;

    const session = JSON.parse(sessionStr) as SessionData;
    
    // Check if session has expired
    if (Date.now() - session.lastActivity > SESSION_EXPIRY) {
      clearSession();
      return null;
    }

    // Update last activity
    session.lastActivity = Date.now();
    saveSession(session);
    
    return session;
  } catch (error) {
    console.error('Failed to get session:', error);
    return null;
  }
};

/**
 * Clear session data
 */
export const clearSession = (): void => {
  try {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(REDIRECT_KEY);
    sessionStorage.removeItem('selectedRole');
  } catch (error) {
    console.error('Failed to clear session:', error);
  }
};

/**
 * Save user preferences
 */
export const savePreferences = (preferences: UserPreferences): void => {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error('Failed to save preferences:', error);
  }
};

/**
 * Get user preferences
 */
export const getPreferences = (): UserPreferences => {
  try {
    const prefsStr = localStorage.getItem(PREFERENCES_KEY);
    if (!prefsStr) return {};
    
    return JSON.parse(prefsStr) as UserPreferences;
  } catch (error) {
    console.error('Failed to get preferences:', error);
    return {};
  }
};

/**
 * Save redirect path
 */
export const saveRedirectPath = (path: string): void => {
  try {
    localStorage.setItem(REDIRECT_KEY, path);
  } catch (error) {
    console.error('Failed to save redirect path:', error);
  }
};

/**
 * Get and clear redirect path
 */
export const getAndClearRedirectPath = (): string | null => {
  try {
    const path = localStorage.getItem(REDIRECT_KEY);
    if (path) {
      localStorage.removeItem(REDIRECT_KEY);
      return path;
    }
    return null;
  } catch (error) {
    console.error('Failed to get redirect path:', error);
    return null;
  }
};

/**
 * Check if session is valid
 */
export const isSessionValid = (): boolean => {
  const session = getSession();
  return session !== null;
};

/**
 * Update session activity
 */
export const updateSessionActivity = (): void => {
  const session = getSession();
  if (session) {
    saveSession(session);
  }
};

/**
 * Get session age in minutes
 */
export const getSessionAge = (): number => {
  const session = getSession();
  if (!session) return 0;
  
  return Math.floor((Date.now() - session.lastActivity) / (1000 * 60));
};

/**
 * Check if session is about to expire (within 30 minutes)
 */
export const isSessionExpiringSoon = (): boolean => {
  const sessionAge = getSessionAge();
  const sessionExpiryMinutes = SESSION_EXPIRY / (1000 * 60);
  return sessionAge > (sessionExpiryMinutes - 30);
};

/**
 * Clear all app data
 */
export const clearAllData = (): void => {
  try {
    // Clear all localStorage items that start with 'hostelhub_'
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('hostelhub_')) {
        localStorage.removeItem(key);
      }
    });
    
    // Clear sessionStorage
    sessionStorage.clear();
  } catch (error) {
    console.error('Failed to clear all data:', error);
  }
}; 